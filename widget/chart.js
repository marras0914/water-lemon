(function () {
  var config = window.MarketStatsChart || {};
  var apiKey = config.apiKey;
  var zip = config.zip;
  var containerId = config.containerId || 'market-stats-chart';
  var PERIODS = config.periods || 6;
  var API = 'https://zhpnbplzyxvzeakxebzk.supabase.co/functions/v1/market-stats';

  if (!apiKey || !zip) {
    console.error('MarketStatsChart: apiKey and zip are required');
    return;
  }

  function fmt(n) {
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M';
    return '$' + Math.round(n / 1000) + 'K';
  }

  function render(data) {
    // API returns newest first — take up to PERIODS, reverse to chronological
    var points = data
      .slice(0, PERIODS)
      .reverse()
      .filter(function (d) { return d.median_list_price != null; });

    var el = document.getElementById(containerId);
    if (!points.length || !el) return;

    var W = 440, H = 120;
    var PAD = { top: 16, right: 16, bottom: 28, left: 52 };
    var iW = W - PAD.left - PAD.right;
    var iH = H - PAD.top - PAD.bottom;

    var prices = points.map(function (d) { return d.median_list_price; });
    var minP = Math.min.apply(null, prices);
    var maxP = Math.max.apply(null, prices);
    var range = maxP - minP || 1;

    function px(i) { return PAD.left + (points.length > 1 ? (i / (points.length - 1)) * iW : iW / 2); }
    function py(v) { return PAD.top + iH - ((v - minP) / range) * iH; }

    var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var linePts = points.map(function (d, i) { return px(i) + ',' + py(d.median_list_price); }).join(' ');
    var areaPts = linePts + ' ' + px(points.length - 1) + ',' + (PAD.top + iH) + ' ' + px(0) + ',' + (PAD.top + iH);

    var dots = points.map(function (d, i) {
      return '<circle cx="' + px(i) + '" cy="' + py(d.median_list_price) + '" r="3" fill="#2563eb"/>';
    }).join('');

    var xLabels = points.map(function (d, i) {
      var m = parseInt(d.period_date.slice(5, 7), 10) - 1;
      return '<text x="' + px(i) + '" y="' + (H - 4) + '" text-anchor="middle" font-size="10" fill="#9ca3af">' + MONTHS[m] + '</text>';
    }).join('');

    var yLabels =
      '<text x="' + (PAD.left - 6) + '" y="' + (PAD.top + 4) + '" text-anchor="end" font-size="10" fill="#9ca3af">' + fmt(maxP) + '</text>' +
      '<text x="' + (PAD.left - 6) + '" y="' + (PAD.top + iH + 4) + '" text-anchor="end" font-size="10" fill="#9ca3af">' + fmt(minP) + '</text>';

    el.innerHTML =
      '<div class="msc">' +
        '<div class="msc-header">' +
          '<span class="msc-title">' + (points[0].neighborhood_name || zip) + ' ' + zip + ' &nbsp;·&nbsp; Median List Price</span>' +
          '<span class="msc-label">' + PERIODS + '-month trend</span>' +
        '</div>' +
        '<svg width="100%" viewBox="0 0 ' + W + ' ' + H + '" style="overflow:visible;display:block">' +
          '<line x1="' + PAD.left + '" y1="' + PAD.top + '" x2="' + PAD.left + '" y2="' + (PAD.top + iH) + '" stroke="#e5e7eb" stroke-width="1"/>' +
          '<line x1="' + PAD.left + '" y1="' + (PAD.top + iH) + '" x2="' + (W - PAD.right) + '" y2="' + (PAD.top + iH) + '" stroke="#e5e7eb" stroke-width="1"/>' +
          '<polygon points="' + areaPts + '" fill="#2563eb" fill-opacity="0.08"/>' +
          '<polyline points="' + linePts + '" fill="none" stroke="#2563eb" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
          dots + xLabels + yLabels +
        '</svg>' +
        '<div class="msc-footer">Powered by <a href="https://redfin.com" target="_blank" rel="noopener">Redfin Data</a></div>' +
      '</div>';
  }

  var style = document.createElement('style');
  style.textContent = [
    '.msc{font-family:sans-serif;border:1px solid #e5e7eb;border-radius:10px;padding:20px;max-width:440px;box-sizing:border-box}',
    '.msc-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px}',
    '.msc-title{font-weight:700;font-size:14px;color:#111827}',
    '.msc-label{font-size:12px;color:#9ca3af}',
    '.msc-footer{margin-top:10px;font-size:11px;color:#9ca3af;text-align:right}',
    '.msc-footer a{color:#9ca3af;text-decoration:none}',
  ].join('');
  document.head.appendChild(style);

  fetch(API + '?zip=' + zip, { headers: { 'x-api-key': apiKey } })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function (e) { console.error('MarketStatsChart error:', e); });
})();
