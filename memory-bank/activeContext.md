# Active Context

Last updated: 2026-03-21

## Current state

Phases 1–3 are working. Lemon Squeezy test webhook succeeded. Store is pending LS review for live payments (1-3 days).

## What just shipped

- `ls-webhook` Edge Function — provisions/revokes API keys on LS subscription events
- `get-key` Edge Function — post-checkout page that shows the customer their key
- `widget/widget.js` — embeddable vanilla JS stats card
- CORS headers added to `market-stats` Edge Function (needed for browser widget)

## Immediate TODOs

- [ ] Redeploy `market-stats` in Supabase dashboard (CORS update)
- [ ] Create public `widget` bucket in Supabase Storage, upload widget.js
- [ ] Test full widget embed in a local HTML file
- [ ] Landing page (Phase 5)
- [ ] Wait for Lemon Squeezy store review to go live
