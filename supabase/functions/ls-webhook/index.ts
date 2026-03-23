import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Lemon Squeezy signs webhooks with HMAC-SHA256 over the raw request body
async function verifySignature(secret: string, body: string, sig: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  const hex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hex === sig;
}

function generateApiKey(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return 'wl_' + Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req: Request) => {
  const secret = Deno.env.get('LEMON_SQUEEZY_WEBHOOK_SECRET');
  if (!secret) return new Response('Webhook secret not configured', { status: 500 });

  const sig = req.headers.get('x-signature');
  if (!sig) return new Response('Missing signature', { status: 401 });

  const body = await req.text();

  const valid = await verifySignature(secret, body, sig);
  if (!valid) return new Response('Invalid signature', { status: 401 });

  const event = JSON.parse(body);
  const eventName: string = event.meta?.event_name;
  const subscriptionId = String(event.data?.id);

  if (eventName === 'subscription_created') {
    // Reactivate existing key if one exists (e.g. resubscribe after pause/cancel)
    // so the agent doesn't need to update their embed code
    const { data: existing } = await supabase
      .from('api_keys')
      .select('id')
      .eq('subscriber_id', subscriptionId)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('api_keys')
        .update({ active: true })
        .eq('subscriber_id', subscriptionId);

      if (error) {
        console.error('Failed to reactivate api_key:', error);
        return new Response('DB error', { status: 500 });
      }
      console.log(`Reactivated key for subscription ${subscriptionId}`);
    } else {
      const key = generateApiKey();
      const { error } = await supabase
        .from('api_keys')
        .insert({ key, subscriber_id: subscriptionId, active: true });

      if (error) {
        console.error('Failed to insert api_key:', error);
        return new Response('DB error', { status: 500 });
      }
      console.log(`Provisioned key for subscription ${subscriptionId}`);
    }
  }

  if (
    eventName === 'subscription_cancelled' ||
    eventName === 'subscription_expired' ||
    eventName === 'subscription_paused'
  ) {
    const { error } = await supabase
      .from('api_keys')
      .update({ active: false })
      .eq('subscriber_id', subscriptionId);

    if (error) {
      console.error('Failed to deactivate api_key:', error);
      return new Response('DB error', { status: 500 });
    }

    console.log(`Deactivated key for subscription ${subscriptionId}`);
  }

  return new Response('OK', { status: 200 });
});
