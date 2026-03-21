# water-lemon

Hyper-local real estate market stats micro-SaaS for DFW/Collin County agents.

## What it does

Ingests Redfin public data weekly, stores zip-code-level market stats in Supabase, and exposes them via API + embeddable widget for agents to put on their websites. $15/month subscription via Lemon Squeezy.

## Stack

| Layer | Tech |
|---|---|
| Language | TypeScript (ESM, Node 24) |
| Data source | Redfin public S3 data (zip_code_market_tracker.tsv000.gz) |
| Automation | GitHub Actions cron (weekly, Mondays 10:00 UTC) |
| Database + API | Supabase (PostgreSQL + PostgREST) |
| Billing | Lemon Squeezy |
| Widget CDN | jsDelivr (via GitHub) |

## Running locally

```bash
npm install
# copy .env.example → .env and fill in Supabase credentials
npm run ingest
```

## Project structure

```
src/
  config.ts                        # target zip codes + constants
  index.ts                         # ingest entry point
  db/client.ts                     # Supabase client
  ingest/redfin.ts                 # stream downloader + TSV parser
  keys/generate.ts                 # API key generator utility
supabase/
  migrations/
    0001_initial_schema.sql        # market_stats table
    0002_api_keys.sql              # api_keys table
  functions/
    market-stats/index.ts          # gated data API (x-api-key header)
    ls-webhook/index.ts            # Lemon Squeezy webhook handler
    get-key/index.ts               # post-checkout key delivery page
widget/
  widget.js                        # embeddable vanilla JS stats card
  test.html                        # local test page
.github/workflows/
  ingest.yml                       # weekly cron + manual trigger
```

## Database

Run migrations in order in the Supabase SQL editor:
1. `supabase/migrations/0001_initial_schema.sql`
2. `supabase/migrations/0002_api_keys.sql`

Key constraint: `UNIQUE (zip_code, period_date)` — ingest uses upsert against this.

## GitHub Actions secrets required

- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY` (service role key, starts with `eyJ`)

## Supabase Edge Function secrets required

- `LEMON_SQUEEZY_WEBHOOK_SECRET`

## Widget embed code

```html
<div id="market-stats-widget"></div>
<script>
  window.MarketStats = { apiKey: 'wl_their_key', zip: '75070' };
</script>
<script src="https://cdn.jsdelivr.net/gh/marras0914/water-lemon@main/widget/widget.js"></script>
```

Widget is served via jsDelivr CDN — updates on next CDN cache flush after pushing to `main`.

## Target market

17 zip codes across McKinney, Frisco, Plano, Allen, Prosper (Collin County, TX).
See `src/config.ts` for the full list.

## Build phases

- [x] Phase 1 — Data pipeline (ingest working, 17 zips)
- [x] Phase 2 — API + auth (market-stats Edge Function, API key gate)
- [x] Phase 3 — Billing (Lemon Squeezy webhooks, key provisioning/revocation)
- [x] Phase 4 — Embeddable widget (widget.js, hosted via jsDelivr)
- [ ] Phase 5 — Launch (landing page, DFW agent communities)
