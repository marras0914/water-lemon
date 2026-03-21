CREATE TABLE market_stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  zip_code text NOT NULL,
  neighborhood_name text,
  period_date date NOT NULL,
  median_list_price numeric,
  median_sale_price numeric,
  active_listings integer,
  avg_days_on_market integer,
  data_source text,

  CONSTRAINT uq_zip_period UNIQUE (zip_code, period_date)
);

CREATE INDEX idx_zip_code ON market_stats(zip_code);
CREATE INDEX idx_period_date ON market_stats(period_date);
