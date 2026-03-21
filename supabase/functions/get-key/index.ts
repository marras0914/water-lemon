import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Called after Lemon Squeezy checkout redirect.
// URL: /functions/v1/get-key?subscription_id=<ls_subscription_id>
//
// LS passes {subscription_id} via the checkout redirect URL you configure:
// https://your-project.supabase.co/functions/v1/get-key?subscription_id={subscription_id}
Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const subscriptionId = url.searchParams.get('subscription_id');

  if (!subscriptionId) {
    return html('<p>Missing subscription_id.</p>', 400);
  }

  const { data, error } = await supabase
    .from('api_keys')
    .select('key, active')
    .eq('subscriber_id', subscriptionId)
    .single();

  if (error || !data) {
    // Key may not be provisioned yet if webhook is delayed — tell them to wait
    return html(
      `<p>Your API key isn't ready yet. Wait 30 seconds and refresh this page.</p>
       <script>setTimeout(() => location.reload(), 10000);</script>`,
      202
    );
  }

  if (!data.active) {
    return html('<p>Your subscription is inactive. Please contact support.</p>', 403);
  }

  return html(`
    <h2>Your API Key</h2>
    <p>Keep this secret — it grants access to your market stats feed.</p>
    <pre style="background:#f4f4f4;padding:16px;border-radius:6px;font-size:14px">${data.key}</pre>
    <h3>Quick start</h3>
    <pre style="background:#f4f4f4;padding:16px;border-radius:6px;font-size:13px">curl "https://${url.hostname}/functions/v1/market-stats?zip=75070" \\
  -H "x-api-key: ${data.key}"</pre>
  `);
});

function html(body: string, status: number): Response {
  return new Response(
    `<!DOCTYPE html><html><head><meta charset="utf-8">
     <style>body{font-family:sans-serif;max-width:640px;margin:60px auto;padding:0 20px}</style>
     </head><body>${body}</body></html>`,
    { status, headers: { 'Content-Type': 'text/html' } }
  );
}
