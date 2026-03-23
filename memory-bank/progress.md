# Progress

## Done

- [x] Concept + ROADMAP defined
- [x] Data source decision: Redfin public S3 data (free, stable URL, no scraping)
- [x] Target zip codes identified (17 zips: McKinney, Frisco, Plano, Allen, Prosper)
- [x] TypeScript project scaffolded (ESM, tsx, Node 24)
- [x] Redfin stream ingest working end-to-end (17 zip codes, upserted to Supabase)
- [x] Supabase schema migration (market_stats + api_keys tables)
- [x] GitHub Actions cron live (secrets set, runs every Monday 10:00 UTC)
- [x] `market-stats` Edge Function live — gated by API key, CORS enabled
- [x] `ls-webhook` Edge Function — provisions/revokes/reactivates keys on LS events
- [x] `get-key` Edge Function — post-checkout key delivery page
- [x] Lemon Squeezy webhook test succeeded
- [x] `widget/widget.js` — stats card, live via jsDelivr CDN
- [x] `widget/badge.js` — market temperature badge (Hot/Warm/Cool), live via jsDelivr CDN
- [x] `homes_sold` + `months_of_supply` added to schema + ingest
- [x] Landing page at waterlemon.live (DNS propagating)
- [x] Custom domain waterlemon.live (Squarespace registrar)
- [x] Permanent demo key (wl_demo_live) on landing page
- [x] Repo at github.com/marras0914/water-lemon

## Pending

- [ ] waterlemon.live DNS fully propagated + HTTPS enforced
- [ ] Lemon Squeezy store approval for live payments
- [ ] Redeploy ls-webhook with reactivate-on-resubscribe fix

## Post-launch / Roadmap

- [ ] Trend chart widget (6-month sparkline, pure SVG)
- [ ] DFW agent Facebook groups outreach
- [ ] ActiveRain posts
- [ ] Collin County Association of Realtors vendor program
