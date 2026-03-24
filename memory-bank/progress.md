# Progress

## Done

- [x] Concept + ROADMAP defined
- [x] Data source: Redfin public S3 (free, stable, weekly)
- [x] 50 DFW zip codes (Collin County, Dallas, Denton, Tarrant)
- [x] ZIP_NAMES lookup — city names for all zips
- [x] TypeScript project scaffolded (ESM, tsx, Node 24)
- [x] Redfin stream ingest — 50 zips, all fields including homes_sold + months_of_supply
- [x] Supabase schema (market_stats + api_keys with trial + notes columns)
- [x] GitHub Actions cron live (secrets set, runs every Monday 10:00 UTC)
- [x] Ingest alerting: silent failure guard + job summary table
- [x] market-stats Edge Function — API key gate, CORS
- [x] ls-webhook Edge Function — provisions/reactivates/revokes keys
- [x] get-key Edge Function — post-checkout key delivery
- [x] Lemon Squeezy webhook test succeeded
- [x] widget.js — stats card
- [x] badge.js — market temperature (Hot/Warm/Cool)
- [x] chart.js — 6-month trend sparkline (SVG)
- [x] Landing page at waterlemon.live
- [x] Free trial keys: wl_matt_free, wl_steve_free
- [x] Outreach drafts: Matt (text), Steve McCoy (email), Facebook, ActiveRain
- [x] Landing page CTAs updated to "Try Free for 30 Days" + 30-day trial messaging
- [x] Demo key wl_demo_live inserted in api_keys (subscriber_id='demo')
- [x] Code snippet on landing page uses wl_demo_live — functional for any visitor

## Pending

- [x] Sent outreach to Matt (text) + Steve McCoy (email) — 2026-03-23
- [ ] Post Facebook groups + ActiveRain (Tuesday 2026-03-24, 7-9am CST)
- [x] waterlemon.live HTTPS confirmed and live
- [ ] Lemon Squeezy store approval
- [ ] Push index.html changes to main (CDN pick-up)

## Roadmap

- [ ] Formal trial flow with expiry date + subscribe prompt
- [ ] Trend chart on landing page (after 3+ months data)
- [ ] Monthly PDF report tier ($49/month)
- [ ] Neighborhood comparison widget
- [ ] Collin County AR vendor program
- [ ] RentCast as secondary data source for sparse zips
