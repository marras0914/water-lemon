# water-lemon

Hyper-local real estate market stats micro-SaaS for DFW/Collin County agents.

## What it does

Ingests Redfin public data weekly, stores zip-code-level market stats in Supabase, and will expose them via API + embeddable widget for agents to put on their websites. $15/month subscription via Lemon Squeezy.

## Stack

| Layer | Tech |
|---|---|
| Language | TypeScript (ESM, Node 24) |
| Data source | Redfin public S3 data (zip_code_market_tracker.tsv000.gz) |
| Automation | GitHub Actions cron (weekly, Mondays 10:00 UTC) |
| Database + API | Supabase (PostgreSQL + PostgREST) |
| Billing | Lemon Squeezy |

## Running locally

```bash
npm install
# copy .env.example → .env and fill in Supabase credentials
npm run ingest
```

## Project structure

```
src/
  config.ts          # target zip codes + constants
  index.ts           # ingest entry point
  db/client.ts       # Supabase client
  ingest/redfin.ts   # stream downloader + TSV parser
supabase/
  migrations/
    0001_initial_schema.sql
.github/workflows/
  ingest.yml         # weekly cron + manual trigger
```

## Database

Run `supabase/migrations/0001_initial_schema.sql` in the Supabase SQL editor to initialize.

Key constraint: `UNIQUE (zip_code, period_date)` — ingest uses upsert against this.

## GitHub Actions secrets required

- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY` (service role key, starts with `eyJ`)

## Target market

17 zip codes across McKinney, Frisco, Plano, Allen, Prosper (Collin County, TX).
See `src/config.ts` for the full list.

## Build phases

- [x] Phase 1 — Data pipeline (ingest working)
- [ ] Phase 2 — API + auth (Supabase RLS + API key table)
- [ ] Phase 3 — Billing (Lemon Squeezy webhooks → provision/revoke keys)
- [ ] Phase 4 — Embeddable widget (vanilla JS, ~50 lines)
- [ ] Phase 5 — Launch (landing page, DFW agent communities)
