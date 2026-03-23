-- Add trial support to api_keys
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS trial boolean DEFAULT false;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS notes text;

-- Free passes for early outreach contacts
-- Run these manually, replace keys with real generated values
INSERT INTO api_keys (key, subscriber_id, active, trial, notes)
VALUES
  ('wl_matt_free', 'matt-neighbor', true, true, 'Neighbor Matt — free pass'),
  ('wl_steve_free', 'steve-mccoy', true, true, 'Steve McCoy — sold our house, free pass');
