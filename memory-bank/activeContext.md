# Active Context

Last updated: 2026-03-22

## Current state

Product is live. DNS propagating for waterlemon.live. Lemon Squeezy store pending review.
Post-launch additions in progress: market temperature badge + trend chart planned.

## What just shipped

- Market temperature badge (`widget/badge.js`) — Hot/Warm/Cool based on days on market
- `homes_sold` + `months_of_supply` added to schema and ingest
- Badge added to landing page demo section
- `ls-webhook` updated: reactivates existing key on resubscribe (so agents don't need to update embed code after pause/cancel/resubscribe)
- Redfin column names confirmed uppercase (e.g. `REGION`, `PROPERTY_TYPE`)
- REGION format confirmed as "Zip Code: 75070" — stripped in ingest

## Immediate TODOs

- [ ] Redeploy `ls-webhook` in Supabase dashboard (reactivate-on-resubscribe fix)
- [ ] Confirm waterlemon.live + HTTPS once DNS fully propagates
- [ ] Wait for Lemon Squeezy store approval
- [ ] Build trend chart widget (6-month sparkline, pure SVG)
- [ ] Post in DFW agent Facebook groups once domain + HTTPS live
