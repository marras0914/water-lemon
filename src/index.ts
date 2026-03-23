import { fetchRedfinStats } from './ingest/redfin.js';
import { supabase } from './db/client.js';

const EXPECTED_ZIPS = 50; // Collin (17) + Dallas (14) + Denton (9) + Tarrant (10)

async function main() {
  console.log('Fetching Redfin data...');
  const stats = await fetchRedfinStats();
  console.log(`Parsed ${stats.length} zip codes`);

  if (stats.length === 0) {
    throw new Error('Parsed 0 zip codes — Redfin file format may have changed');
  }

  if (stats.length < EXPECTED_ZIPS) {
    console.warn(`Warning: expected ${EXPECTED_ZIPS} zip codes, got ${stats.length}`);
  }

  const { error } = await supabase
    .from('market_stats')
    .upsert(stats, { onConflict: 'zip_code,period_date' });

  if (error) throw error;
  console.log(`Upserted ${stats.length} rows`);

  // Write summary for GitHub Actions job summary
  const summary = stats
    .map((s) => `| ${s.zip_code} | ${s.neighborhood_name} | ${s.period_date} | $${s.median_list_price?.toLocaleString() ?? '—'} |`)
    .join('\n');

  process.stdout.write(
    `\n### Ingest Summary\n| Zip | City | Period | Median List |\n|---|---|---|---|\n${summary}\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
