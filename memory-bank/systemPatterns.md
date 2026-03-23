# System Patterns

## Data ingestion pattern

1. GitHub Actions cron (Monday 10:00 UTC) triggers `npm run ingest`
2. Axios streams the gzipped TSV from Redfin S3 (~200MB uncompressed)
3. Node `zlib.createGunzip()` decompresses inline
4. `csv-parse` streaming parser filters rows as they arrive — memory stays flat at 17 entries max
5. Supabase upsert on `(zip_code, period_date)` — idempotent, safe to re-run

## Redfin data quirks

- Column names are ALL CAPS (e.g. `REGION`, `PROPERTY_TYPE`, `MEDIAN_DOM`)
- `REGION` format is `"Zip Code: 75069"` — strip `"Zip Code: "` prefix before comparing
- `MONTHS_OF_SUPPLY` is often null for individual zip codes — badge handles this gracefully
- `IS_SEASONALLY_ADJUSTED` = `'true'/'false'` strings — filter to `'false'` for raw figures
- `PROPERTY_TYPE` filter value: `'All Residential'`

## Env loading

- Local: `--env-file=.env` flag on tsx (Node 24 built-in, no dotenv)
- CI: GitHub Actions `env:` block with repository secrets

## Database conventions

- UUID primary keys (`gen_random_uuid()`)
- `created_at` = when row was inserted; `period_date` = what month the stats represent
- Unique constraint on `(zip_code, period_date)` enables safe upserts
- Supabase service role key used for server-side writes (bypasses RLS)
- Anon/publishable key (`sb_publishable_U...`) reserved for future client-side use

## Auth pattern

- `api_keys` table: `(id, key, subscriber_id, active)`
- `market-stats` Edge Function validates `x-api-key` header against `api_keys` table
- JWT verification disabled on all Edge Functions — custom key auth only
- On `subscription_created`: reactivate existing key if subscriber_id exists, else insert new
- On `subscription_cancelled/expired/paused`: set `active = false` (never delete rows)

## Widget CDN

- Hosted via jsDelivr: `https://cdn.jsdelivr.net/gh/marras0914/water-lemon@main/widget/*.js`
- Push to `main` branch → jsDelivr serves updated file after cache flush
- GitHub Pages serves `index.html` at waterlemon.live

## Module system

- `"type": "module"` in package.json — all imports must use `.js` extensions in source
- `moduleResolution: NodeNext` in tsconfig
