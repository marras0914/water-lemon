# Project Plan: Hyper-Local Real Estate Data API

## The Concept

A "set it and forget it" micro-SaaS providing live, hyper-local real estate market statistics. It replaces expensive, clunky all-in-one platforms with a simple, embeddable data feed for independent real estate agents in highly competitive markets.

## Target Audience & Problem

- **Audience:** The 11,000+ real estate agents in Collin County (McKinney, Frisco, Plano) and the broader DFW metroplex.
- **Problem:** Agents need to prove local expertise on their personal websites but lack an affordable, automated way to display live neighborhood stats (median price, days on market, active inventory).
- **Solution:** A $15/month subscription for a copy-and-paste JavaScript widget or REST API endpoint that auto-updates daily.

## Tech Stack

| Component          | Technology      | Purpose                                                        |
| :----------------- | :-------------- | :------------------------------------------------------------- |
| **Language**       | TypeScript      | Core logic for scraping and data formatting                    |
| **Scraper**        | Cheerio + Axios | Fast, lightweight HTML parsing                                 |
| **Automation**     | GitHub Actions  | Free cron jobs to run the scraper daily                        |
| **Database & API** | Supabase        | PostgreSQL storage and automatic REST API via PostgREST        |
| **Billing**        | Lemon Squeezy   | Merchant of Record to handle subscriptions and local sales tax |

## Database Schema

The core `market_stats` table in Supabase tracks daily metrics to build historical trends over time.

```sql
CREATE TABLE market_stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  zip_code text NOT NULL,
  neighborhood_name text,
  median_list_price numeric,
  active_listings integer,
  avg_days_on_market integer,
  data_source text
);

CREATE INDEX idx_zip_code ON market_stats(zip_code);
```

Phase 1: Data Acquisition (MVP)
Identify a reliable, public-facing real estate search site with HTML-rendered results.

Write the scraper.ts function to extract median list price, active listings, and average days on market for target zip codes (e.g., 75071, 75070).

Test the script locally to ensure clean insertion into the Supabase database.

Deploy a .github/workflows/scrape.yml file to run the script automatically every night at 2:00 AM.

Phase 2: Distribution & Integration
Utilize Supabase's built-in PostgREST API to securely expose read-only endpoints.

Build a lightweight, vanilla JavaScript widget that fetches this endpoint and renders a clean, styled HTML stat block.

Document the simple <script> tag installation process for agents using Webflow, WordPress, or Squarespace.

Phase 3: Monetization & Launch
Set up a Lemon Squeezy storefront with a $15/month subscription tier.

Build a simple landing page showcasing a live demo of the widget using local McKinney data.

Reach out to local brokerages or run targeted social ads to DFW agents emphasizing "Hyper-Local Market Authority."
