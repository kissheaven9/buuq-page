/* DE/RU-Umschalter — nur für die Vorschau (vor dem Launch entfernen) */
(function () {
  var KEY = 'rg-lang';
  function apply(l) {
    document.body.classList.toggle('ru', l === 'ru');
    document.querySelectorAll('.lang-sw').forEach(function (b) { b.textContent = l === 'ru' ? 'DE' : 'RU'; });
  }
  var saved = 'de';
  try { saved = localStorage.getItem(KEY) || 'de'; } catch (e) {}
  apply(saved);
  document.querySelectorAll('.lang-sw').forEach(function (b) {
    b.addEventListener('click', function () {
      var l = document.body.classList.contains('ru') ? 'de' : 'ru';
      try { localStorage.setItem(KEY, l); } catch (e) {}
      apply(l);
    });
  });
})();

/* анимированные столбики: рост при появлении + бегущие цифры */
(function () {
  var charts = document.querySelectorAll('.vchart');
  if (!charts.length) return;
  function countUp(el) {
    var n = parseInt(el.getAttribute('data-n'), 10) || 0, t0 = null, dur = 1100;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { el.firstChild.nodeValue = n; return; }
    function tick(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur); k = 1 - Math.pow(1 - k, 3);
      el.firstChild.nodeValue = Math.round(n * k);
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (!('IntersectionObserver' in window)) { charts.forEach(function (c) { c.classList.add('go'); c.querySelectorAll('[data-n]').forEach(function (e) { e.firstChild.nodeValue = e.getAttribute('data-n'); }); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('go');
      e.target.querySelectorAll('[data-n]').forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.35 });
  charts.forEach(function (c) { io.observe(c); });
})();

/* «показать ещё» для рядов карточек */
(function () {
  document.querySelectorAll('.more-toggle').forEach(function (b) {
    var host = b.closest('.more') || b.closest('.rg-sec') || b.parentElement;
    var grid = host && host.querySelector('.rg-cards');
    if (!grid || !grid.querySelector('.hid')) { b.hidden = true; return; }
    b.addEventListener('click', function () { grid.classList.add('open'); b.hidden = true; });
  });
})();

/* анимация 2D-схем при появлении */
(function () {
  var figs = document.querySelectorAll('.fig');
  if (!figs.length) return;
  if (!('IntersectionObserver' in window)) { figs.forEach(function (f) { f.classList.add('go'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('go'); io.unobserve(e.target); } });
  }, { threshold: 0.3 });
  figs.forEach(function (f) { io.observe(f); });
})();
