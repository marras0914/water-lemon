CREATE TABLE api_keys (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  key text UNIQUE NOT NULL,
  subscriber_id text NOT NULL,  -- Lemon Squeezy subscription ID
  active boolean DEFAULT true NOT NULL
);

CREATE INDEX idx_api_keys_key ON api_keys(key);
