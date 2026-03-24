# Active Context

Last updated: 2026-03-22

## Current state

Product is live at waterlemon.live. 50 DFW zip codes ingesting cleanly with city names.
Lemon Squeezy store pending review. DNS + HTTPS on waterlemon.live propagating.

## What just shipped (2026-03-23)

- Expanded to 50 zip codes (Collin County, Dallas, Denton, Tarrant)
- ZIP_NAMES lookup map — fixes empty neighborhood_name from Redfin
- Ingest alerting: silent failure guard, job summary table in GitHub Actions
- Market temperature badge (Hot/Warm/Cool) live on landing page
- homes_sold + months_of_supply added to schema and ingest
- ls-webhook: reactivates existing key on resubscribe (no embed code change needed)
- Free trial keys for Matt (wl_matt_free) and Steve McCoy (wl_steve_free)
- chart.js trend chart widget written (needs 3+ months of data to look great)
- ROADMAP.md updated with completed items + full roadmap
- Outreach drafts saved in marketing/ folder

## What just shipped (2026-03-24)

- Landing page CTAs updated to "Try Free for 30 Days" (nav, hero, pricing card)
- Pricing desc: "30-day free trial. Then $15/month. Cancel anytime."
- Code snippet on landing page now uses wl_demo_live — any visitor can copy and get a working widget
- wl_demo_live inserted into api_keys in Supabase (subscriber_id='demo', active=true)
- Facebook + ActiveRain posts finalized with tags + meta description

## Immediate TODOs

- [x] Sent text to Matt (neighbor) — 2026-03-23
- [x] Sent email to Steve McCoy — 2026-03-23
- [ ] Push index.html to main (CDN pick-up)
- [ ] Post in DFW Facebook groups Tuesday 2026-03-24 7-9am CST
- [ ] Post on ActiveRain Tuesday 2026-03-24 7-9am CST
- [x] waterlemon.live HTTPS confirmed and live
- [ ] Wait for Lemon Squeezy store approval
