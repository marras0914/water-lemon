import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'x-api-key, content-type',
};

Deno.serve(async (req: Request) => {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  // Validate API key from header
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey) {
    return json({ error: 'Missing x-api-key header' }, 401);
  }

  const { data: keyRow } = await supabase
    .from('api_keys')
    .select('active')
    .eq('key', apiKey)
    .single();

  if (!keyRow?.active) {
    return json({ error: 'Invalid or inactive API key' }, 401);
  }

  // Parse optional ?zip= query param (can be comma-separated for multi-zip)
  const url = new URL(req.url);
  const zipParam = url.searchParams.get('zip');
  const zips = zipParam ? zipParam.split(',').map((z) => z.trim()) : null;

  let query = supabase
    .from('market_stats')
    .select(
      'zip_code, neighborhood_name, period_date, median_list_price, median_sale_price, active_listings, avg_days_on_market'
    )
    .order('period_date', { ascending: false });

  if (zips?.length === 1) {
    query = query.eq('zip_code', zips[0]);
  } else if (zips && zips.length > 1) {
    query = query.in('zip_code', zips);
  }

  const { data, error } = await query;
  if (error) return json({ error: error.message }, 500);

  return json(data, 200);
});

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
