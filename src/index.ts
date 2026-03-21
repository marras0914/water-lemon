import { fetchRedfinStats } from './ingest/redfin.js';
import { supabase } from './db/client.js';

async function main() {
  console.log('Fetching Redfin data...');
  const stats = await fetchRedfinStats();
  console.log(`Parsed ${stats.length} zip codes`);

  const { error } = await supabase
    .from('market_stats')
    .upsert(stats, { onConflict: 'zip_code,period_date' });

  if (error) throw error;
  console.log(`Upserted ${stats.length} rows`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
