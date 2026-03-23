# Project Roadmap: waterlemon.live

## The Concept

A "set it and forget it" micro-SaaS providing live, hyper-local real estate market statistics. Replaces expensive all-in-one platforms with a simple, embeddable data feed for independent real estate agents in highly competitive DFW markets.

## Target Audience & Problem

- **Audience:** Real estate agents across the DFW metroplex (Collin County, Dallas, Denton County, Tarrant County)
- **Problem:** Agents need to prove local expertise on their personal websites but lack an affordable, automated way to display live neighborhood stats
- **Solution:** $15/month for a copy-and-paste JavaScript widget or REST API that auto-updates weekly

## Tech Stack

| Component | Technology | Purpose |
|:---|:---|:---|
| **Language** | TypeScript (ESM, Node 24) | Ingest + key generation |
| **Data Source** | Redfin public S3 data | Free, stable, 50 DFW zip codes |
| **Automation** | GitHub Actions | Weekly cron ingest |
| **Database + API** | Supabase | PostgreSQL + Edge Functions |
| **Billing** | Lemon Squeezy | Subscriptions + Merchant of Record |
| **Widget CDN** | jsDelivr (via GitHub) | widget.js, badge.js, chart.js |

## Completed

- [x] Phase 1 — Data pipeline (Redfin stream ingest, 50 DFW zips, weekly cron)
- [x] Phase 2 — API + auth (market-stats Edge Function, API key gate, CORS)
- [x] Phase 3 — Billing (Lemon Squeezy webhooks, key provisioning/revocation/reactivation)
- [x] Phase 4 — Widgets (stats card, temperature badge, trend chart)
- [x] Phase 5 — Launch (landing page at waterlemon.live, GitHub Pages + custom domain)
- [x] Ingest alerting (job summary, silent failure guard)
- [x] Free trial keys (trial + notes columns on api_keys)

## Roadmap

### Near-term
- [ ] **Free trial flow** — formal trial system with expiry date, auto-prompt to subscribe
- [ ] **Trend chart on landing page** — once 3+ months of data accumulate
- [ ] **Warm outreach** — Matt (neighbor), Steve McCoy (our agent), Facebook groups, ActiveRain
- [ ] **Collin County AR vendor program** — apply once first paying customers confirmed

### Medium-term
- [ ] **Monthly PDF report** — auto-generated, agent-branded, email-ready ($49/month tier)
- [ ] **Neighborhood comparison widget** — side-by-side stats for 2-3 zips
- [ ] **RentCast API** — secondary data source for zips Redfin doesn't cover well (~$50/month at scale)

### Long-term
- [ ] **NTREIS data license** — MLS-accurate data, premium tier positioning
- [ ] **Expand coverage** — Houston, Austin, San Antonio agent markets
