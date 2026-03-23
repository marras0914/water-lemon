export const REDFIN_URL =
  'https://redfin-public-data.s3.us-west-2.amazonaws.com/redfin_market_tracker/zip_code_market_tracker.tsv000.gz';

export const PROPERTY_TYPE = 'All Residential';

export const TARGET_ZIPS = new Set([
  // --- Collin County ---
  // McKinney
  '75069', '75070', '75071', '75072',
  // Frisco
  '75033', '75034', '75035', '75036',
  // Plano
  '75023', '75024', '75025', '75074', '75075', '75093',
  // Allen
  '75002', '75013',
  // Prosper
  '75078',

  // --- Dallas County (Dallas proper) ---
  '75205', // Highland Park
  '75225', // University Park
  '75229', // Preston Hollow (west)
  '75230', // Preston Hollow (east) / North Dallas
  '75219', // Uptown / Oak Lawn
  '75209', // Bluffview / Greenway Parks
  '75206', // Lower Greenville / M Streets
  '75214', // Lakewood / White Rock Lake
  '75218', // Casa Linda / East Dallas
  '75238', // Lake Highlands (north)
  '75243', // Lake Highlands (south)
  '75248', // Far North Dallas / Prestonwood
  '75240', // Far North Dallas / Spring Valley
  '75220', // Northwest Dallas / Briargrove

  // --- Denton County ---
  '75022', // Flower Mound (established/lakeside)
  '75028', // Flower Mound (master-planned)
  '75077', // Highland Village / south Lewisville
  '75056', // The Colony
  '75068', // Little Elm
  '75067', // Lewisville
  '75065', // Lake Dallas / north Lewisville
  '75010', // Carrollton / Lewisville border
  '76226', // Argyle / south Flower Mound

  // --- Tarrant County ---
  '76092', // Southlake
  '76034', // Colleyville
  '76248', // Keller
  '76262', // Westlake / Trophy Club / Roanoke
  '76244', // Keller (north)
  '76051', // Grapevine
  '76021', // Bedford
  '76054', // Hurst / NRH border
  '76182', // North Richland Hills (Keller ISD)
  '76039', // Euless
]);
