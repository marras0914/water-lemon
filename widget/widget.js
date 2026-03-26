(function () {
  var config = window.MarketStats || {};
  var apiKey = config.apiKey;
  var zip = config.zip;
  var containerId = config.containerId || 'market-stats-widget';
  var API = 'https://zhpnbplzyxvzeakxebzk.supabase.co/functions/v1/market-stats';

  if (!apiKey || !zip) {
    console.error('MarketStats: apiKey and zip are required');
    return;
  }

  function fmt(n) {
    if (n == null) return '—';
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return '$' + Math.round(n / 1000) + 'K';
    return '$' + n;
  }

  function render(data) {
    var d = data[0];
    var el = document.getElementById(containerId);
    if (!d || !el) return;

    var period = d.period_date ? d.period_date.slice(0, 7) : '';

    el.innerHTML =
      '<div class="msw">' +
        '<div class="msw-header">' +
          '<span class="msw-location">' + d.neighborhood_name + ' ' + d.zip_code + '</span>' +
          '<span class="msw-period">' + period + '</span>' +
        '</div>' +
        '<div class="msw-grid">' +
          stat(fmt(d.median_list_price), 'Median List Price') +
          stat(fmt(d.median_sale_price), 'Median Sale Price') +
          stat(d.active_listings != null ? d.active_listings : '—', 'Active Listings') +
          stat(d.avg_days_on_market != null ? d.avg_days_on_market + ' days' : '—', 'Days on Market') +
        '</div>' +
        '<div class="msw-footer">Powered by <a href="https://redfin.com" target="_blank" rel="noopener">Redfin Data</a></div>' +
      '</div>';
  }

  function stat(val, label) {
    return '<div class="msw-stat"><div class="msw-val">' + val + '</div><div class="msw-label">' + label + '</div></div>';
  }

  var style = document.createElement('style');
  style.textContent = [
    '.msw{font-family:sans-serif;background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:20px;max-width:440px;box-sizing:border-box}',
    '.msw-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px}',
    '.msw-location{font-weight:700;font-size:15px;color:#111827}',
    '.msw-period{font-size:12px;color:#9ca3af}',
    '.msw-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.msw-stat{background:#f9fafb;border-radius:8px;padding:14px}',
    '.msw-val{font-size:22px;font-weight:700;color:#111827}',
    '.msw-label{font-size:11px;color:#6b7280;margin-top:3px;text-transform:uppercase;letter-spacing:.05em}',
    '.msw-footer{margin-top:14px;font-size:11px;color:#9ca3af;text-align:right}',
    '.msw-footer a{color:#9ca3af;text-decoration:none}',
  ].join('');
  document.head.appendChild(style);

  fetch(API + '?zip=' + zip, { headers: { 'x-api-key': apiKey } })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function (e) { console.error('MarketStats widget error:', e); });
})();
