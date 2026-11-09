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
