# Progress

## Done

- [x] Concept + ROADMAP defined
- [x] Data source decision: Redfin public S3 data (free, stable URL, no scraping)
- [x] Target zip codes identified (17 zips: McKinney, Frisco, Plano, Allen, Prosper)
- [x] TypeScript project scaffolded (ESM, tsx, Node 24)
- [x] Redfin stream ingest working end-to-end (17 zip codes, upserted to Supabase)
- [x] Supabase schema migration (market_stats + api_keys tables)
- [x] GitHub Actions cron live (secrets set, runs every Monday 10:00 UTC)
- [x] `market-stats` Edge Function live and gated by API key (with CORS)
- [x] `ls-webhook` Edge Function deployed — provisions/revokes keys on LS events
- [x] `get-key` Edge Function deployed — post-checkout key delivery page
- [x] Lemon Squeezy webhook test succeeded
- [x] `widget/widget.js` live via jsDelivr CDN
- [x] Landing page at marras0914.github.io/water-lemon
- [x] Custom domain waterlemon.live registered + configured
- [x] Permanent demo key (wl_demo_live) on landing page
- [x] Repo pushed to github.com/marras0914/water-lemon

## Pending

- [ ] DNS propagation for waterlemon.live
- [ ] Lemon Squeezy store approval for live payments

## Post-launch

- [ ] DFW agent Facebook groups outreach
- [ ] ActiveRain posts
- [ ] Collin County Association of Realtors
