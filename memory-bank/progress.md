# Progress

## Done

- [x] Concept + ROADMAP defined
- [x] Data source decision: Redfin public S3 data (free, stable URL, no scraping)
- [x] Target zip codes identified (17 zips: McKinney, Frisco, Plano, Allen, Prosper)
- [x] TypeScript project scaffolded (ESM, tsx, Node 24)
- [x] Redfin stream ingest working end-to-end (17 zip codes, upserted to Supabase)
- [x] Supabase schema migration (market_stats + api_keys tables)
- [x] GitHub Actions cron workflow written
- [x] `market-stats` Edge Function live and gated by API key
- [x] `ls-webhook` Edge Function deployed — provisions/revokes keys on LS events
- [x] `get-key` Edge Function deployed — post-checkout key delivery page
- [x] Lemon Squeezy webhook test succeeded
- [x] `widget/widget.js` written

## In Progress — Phase 4 (Widget)

- [ ] Redeploy `market-stats` with CORS headers
- [ ] Supabase Storage bucket `widget` (public) — upload widget.js
- [ ] Test embed in local HTML file

## TODO — Phase 5 (Launch)

- [ ] Landing page
- [ ] DFW agent community outreach (Facebook groups, ActiveRain)
- [ ] Wait for Lemon Squeezy store approval for live payments
