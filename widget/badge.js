(function () {
  var config = window.MarketStatsBadge || {};
  var apiKey = config.apiKey;
  var zip = config.zip;
  var containerId = config.containerId || 'market-stats-badge';
  var API = 'https://zhpnbplzyxvzeakxebzk.supabase.co/functions/v1/market-stats';

  if (!apiKey || !zip) {
    console.error('MarketStatsBadge: apiKey and zip are required');
    return;
  }

  function getTemp(dom, mos) {
    if (dom == null) return { label: 'Active', emoji: '📊', color: '#6b7280', bg: '#f3f4f6' };
    // Use months_of_supply as secondary signal only when available
    var mosHot  = mos == null || mos <= 2;
    var mosWarm = mos == null || mos <= 4;
    if (dom <= 30 && mosHot)  return { label: 'Hot Market',  emoji: '🔥', color: '#b91c1c', bg: '#fef2f2' };
    if (dom <= 60 && mosWarm) return { label: 'Warm Market', emoji: '☀️', color: '#b45309', bg: '#fffbeb' };
    return                           { label: 'Cool Market', emoji: '❄️', color: '#1d4ed8', bg: '#eff6ff' };
  }

  function render(data) {
    var d = data[0];
    var el = document.getElementById(containerId);
    if (!d || !el) return;

    var t = getTemp(d.avg_days_on_market, d.months_of_supply);
    var period = d.period_date ? d.period_date.slice(0, 7) : '';

    el.innerHTML =
      '<span class="msb" style="background:' + t.bg + ';color:' + t.color + '">' +
        t.emoji + ' ' + d.neighborhood_name + ' ' + d.zip_code + ' &nbsp;·&nbsp; ' + t.label +
        '<span class="msb-period">' + period + '</span>' +
      '</span>';
  }

  var style = document.createElement('style');
  style.textContent =
    '.msb{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;font-family:sans-serif;font-size:14px;font-weight:600;white-space:nowrap}' +
    '.msb-period{font-weight:400;font-size:11px;opacity:.7;margin-left:4px}';
  document.head.appendChild(style);

  fetch(API + '?zip=' + zip, { headers: { 'x-api-key': apiKey } })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function (e) { console.error('MarketStatsBadge error:', e); });
})();
