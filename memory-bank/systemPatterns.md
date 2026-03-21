# System Patterns

## Data ingestion pattern

1. GitHub Actions cron (Monday 10:00 UTC) triggers `npm run ingest`
2. Axios streams the gzipped TSV from Redfin S3 (~200MB uncompressed)
3. Node `zlib.createGunzip()` decompresses inline
4. `csv-parse` streaming parser filters rows as they arrive — memory stays flat at 17 entries max
5. Supabase upsert on `(zip_code, period_date)` — idempotent, safe to re-run

## Env loading

- Local: `--env-file=.env` flag on tsx (Node 24 built-in, no dotenv)
- CI: GitHub Actions `env:` block with repository secrets

## Database conventions

- UUID primary keys (`gen_random_uuid()`)
- `created_at` = when row was inserted; `period_date` = what month the stats represent
- Unique constraint on `(zip_code, period_date)` enables safe upserts
- Supabase service role key used for server-side writes (bypasses RLS)
- Anon/publishable key (`sb_publishable_U...`) reserved for future client-side widget

## Module system

- `"type": "module"` in package.json — all imports must use `.js` extensions in source
- `moduleResolution: NodeNext` in tsconfig

## Planned auth pattern (Phase 2)

- `api_keys` table with subscriber_id + active flag
- Supabase RLS policy gates `market_stats` reads by valid API key header
- Thin Edge Function or Supabase PostgREST used as the subscriber-facing endpoint
