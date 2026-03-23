import axios from 'axios';
import { createGunzip } from 'zlib';
import { parse } from 'csv-parse';
import { TARGET_ZIPS, REDFIN_URL, PROPERTY_TYPE, ZIP_NAMES } from '../config.js';

interface RedfinRow {
  PERIOD_END: string;
  REGION: string;
  CITY: string;
  PROPERTY_TYPE: string;
  IS_SEASONALLY_ADJUSTED: string;
  MEDIAN_LIST_PRICE: string;
  MEDIAN_SALE_PRICE: string;
  INVENTORY: string;
  MEDIAN_DOM: string;
  HOMES_SOLD: string;
  MONTHS_OF_SUPPLY: string;
  [key: string]: string;
}

export interface MarketStat {
  zip_code: string;
  neighborhood_name: string;
  period_date: string;
  median_list_price: number | null;
  median_sale_price: number | null;
  active_listings: number | null;
  avg_days_on_market: number | null;
  homes_sold: number | null;
  months_of_supply: number | null;
  data_source: string;
}

function toFloat(val: string): number | null {
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

function toInt(val: string): number | null {
  const n = parseInt(val, 10);
  return isNaN(n) ? null : n;
}

export async function fetchRedfinStats(): Promise<MarketStat[]> {
  const response = await axios.get<NodeJS.ReadableStream>(REDFIN_URL, {
    responseType: 'stream',
  });

  // Holds the most recent period seen per zip code.
  // Max 17 entries — never grows large regardless of file size.
  const latest = new Map<string, MarketStat>();

  await new Promise<void>((resolve, reject) => {
    response.data
      .pipe(createGunzip())
      .pipe(parse({ delimiter: '\t', columns: true, skip_empty_lines: true }))
      .on('data', (row: RedfinRow) => {
        // REGION is formatted as "Zip Code: 75069"
        const zip = row.REGION.replace('Zip Code: ', '').trim();

        if (!TARGET_ZIPS.has(zip)) return;
        if (row.PROPERTY_TYPE !== PROPERTY_TYPE) return;
        // Use non-seasonally-adjusted figures for raw market accuracy
        if (row.IS_SEASONALLY_ADJUSTED === 'true') return;

        const periodDate = row.PERIOD_END.substring(0, 10); // YYYY-MM-DD
        const existing = latest.get(zip);
        if (existing && existing.period_date >= periodDate) return;

        latest.set(zip, {
          zip_code: zip,
          neighborhood_name: row.CITY || ZIP_NAMES[zip] || zip,
          period_date: periodDate,
          median_list_price: toFloat(row.MEDIAN_LIST_PRICE),
          median_sale_price: toFloat(row.MEDIAN_SALE_PRICE),
          active_listings: toInt(row.INVENTORY),
          avg_days_on_market: toInt(row.MEDIAN_DOM),
          homes_sold: toInt(row.HOMES_SOLD),
          months_of_supply: toFloat(row.MONTHS_OF_SUPPLY),
          data_source: 'redfin',
        });
      })
      .on('end', resolve)
      .on('error', reject);
  });

  return Array.from(latest.values());
}
