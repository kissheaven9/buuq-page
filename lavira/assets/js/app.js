/* Лавира — бета-превью. Без библиотек. Данные: window.LAVIRA_DATA (data.js). */
(function () {
  'use strict';
  var D = window.LAVIRA_DATA || [];
  var $ = function (id) { return document.getElementById(id); };
  var el = function (tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var IMG = 'assets/img/p/';
  var SEASON = { spring: 'Весна 2026', summer: 'Лето 2026', party: 'Праздничная коллекция', sale: 'Всё по 600', new: 'Новинки', basic: 'Круглый год' };
  var byId = {}; D.forEach(function (m) { byId[m.id] = m; });

  /* ---------- типографика: короткие слова не остаются в конце строки ---------- */
  var SHORT = 'в|во|на|к|ко|с|со|у|о|об|от|до|из|за|по|не|ни|и|а|но|да|же|бы|ли|под|над|при|для|без|или|как|что|то|это|№';
  var TYPO_RE = new RegExp('(^|[\\s(«„])(' + SHORT + ')\\s+', 'gi');
  function typo(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function (n) { var p = n.parentNode && n.parentNode.nodeName; if (p === 'SCRIPT' || p === 'STYLE' || p === 'TEXTAREA' || p === 'OPTION' || p === 'INPUT') return NodeFilter.FILTER_REJECT; return /\S\s+\S/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP; } });
    var n, list = []; while ((n = walker.nextNode())) list.push(n);
    list.forEach(function (t) { var s = t.nodeValue, prev, pass = 0; do { prev = s; s = s.replace(TYPO_RE, '$1$2 '); pass++; } while (s !== prev && pass < 3); s = s.replace(/(\d)\s+(см|шт|%|₽|руб)/g, '$1 $2'); if (s !== t.nodeValue) t.nodeValue = s; });
  }

  /* ---------- размеры ---------- */
  function sizeList(str) { // "46-60" | "46, 50-60" → [46,48,...]
    var out = []; String(str || '').split(',').forEach(function (part) { var m = part.trim().match(/^(\d+)(?:-(\d+))?$/); if (!m) return; var a = +m[1], b = m[2] ? +m[2] : a; for (var i = a; i <= b; i += 2) if (out.indexOf(i) < 0) out.push(i); }); return out.sort(function (a, b) { return a - b; });
  }
  function modelSizes(m) { var set = {}; m.variants.forEach(function (v) { sizeList(v.sizes || m.sizes).forEach(function (s) { set[s] = 1; }); }); return Object.keys(set).map(Number).sort(function (a, b) { return a - b; }); }
  function sizeLabel(m) { var l = modelSizes(m); return l.length ? l[0] + '–' + l[l.length - 1] : 'размеры уточняются'; }
  function plural(n, f) { var a = Math.abs(n) % 100, b = a % 10; return n + ' ' + (a > 10 && a < 20 ? f[2] : b > 1 && b < 5 ? f[1] : b === 1 ? f[0] : f[2]); }
  var COLORS = ['цвет', 'цвета', 'цветов'], UNITS = ['единица', 'единицы', 'единиц'], MODELS = ['модель', 'модели', 'моделей'];

  function picture(base, cls, alt, lazy, big) {
    var p = el('picture'); var s = el('source'); s.type = 'image/webp'; s.srcset = IMG + base + (big ? '-800' : '-480') + '.webp'; p.appendChild(s);
    var i = el('img'); i.src = IMG + base + '-480.jpg'; i.width = big ? 800 : 480; i.height = big ? 1200 : 720; i.alt = alt; if (lazy) i.loading = 'lazy'; i.decoding = 'async'; if (cls) i.className = cls; p.appendChild(i); return p;
  }
  function nameOf(m) { return m.type + ' «' + m.model + '»'; }

  /* ---------- первый экран: палитра ---------- */
  (function hero() {
    var m = byId.m01, pal = $('heroPalette'), pic = $('heroPic'), tag = $('heroTag'); if (!m || !pal) return;
    var cur = 6, imgs = {};
    imgs[6] = pic.querySelector('img');
    m.variants.forEach(function (v, i) {
      var b = el('button', 'sw'); b.type = 'button'; b.style.background = v.sw; b.setAttribute('aria-label', v.color); b.setAttribute('aria-pressed', i === cur ? 'true' : 'false'); b.title = v.color;
      b.addEventListener('click', function () { show(i); }); pal.appendChild(b);
    });
    pal.appendChild(el('span', 'palette__cap', plural(m.variants.length, COLORS)));
    function show(i) {
      if (i === cur) return;
      var v = m.variants[i], img = imgs[i];
      if (!img) { img = el('img'); img.src = IMG + v.img + '-800.webp'; img.width = 800; img.height = 1200; img.alt = nameOf(m) + ', цвет ' + v.color; pic.insertBefore(img, tag); imgs[i] = img; }
      var done = function () { Object.keys(imgs).forEach(function (k) { imgs[k].classList.toggle('on', +k === i); }); };
      if (img.complete) done(); else img.onload = done;
      pal.querySelectorAll('.sw').forEach(function (b, k) { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      tag.textContent = nameOf(m) + ' · ' + v.color; cur = i;
    }
  })();

  /* ---------- каталог ---------- */
  var F = { season: '', cat: '', size: '' }, PAGE = 12, shown = PAGE;
  function matches(m) {
    if (F.season && m.seasons.indexOf(F.season) < 0 && !(F.season === 'new' && m.new)) return false;
    if (F.cat && m.cat !== F.cat) return false;
    if (F.size && modelSizes(m).indexOf(+F.size) < 0) return false;
    return true;
  }
  function card(m) {
    var c = el('button', 'card'); c.type = 'button'; c.setAttribute('data-id', m.id);
    var pic = el('div', 'card__pic'); pic.appendChild(picture(m.variants[0].img, '', nameOf(m) + ', цвет ' + m.variants[0].color, true));
    if (m.new) pic.appendChild(el('span', 'card__new', 'Новинка')); c.appendChild(pic);
    var sw = el('div', 'card__sw'); m.variants.slice(0, 7).forEach(function (v) { var i = el('i'); i.style.background = v.sw; sw.appendChild(i); });
    sw.appendChild(el('span', '', plural(m.variants.length, COLORS))); c.appendChild(sw);
    c.appendChild(el('h3', '', nameOf(m)));
    c.appendChild(el('p', '', 'Размеры ' + sizeLabel(m) + (m.sostav ? ' · ' + m.sostav.split(',')[0].replace(' - ', ' ') : '')));
    c.addEventListener('click', function () { openQV(m.id); });
    return c;
  }
  function paintGrid() {
    var g = $('grid'), list = D.filter(matches); g.textContent = '';
    list.slice(0, shown).forEach(function (m) { g.appendChild(card(m)); });
    $('gridEmpty').hidden = list.length > 0; $('moreWrap').hidden = list.length <= shown;
    $('count').textContent = list.length ? plural(list.length, MODELS) + ' · ' + plural(list.reduce(function (s, m) { return s + m.variants.length; }, 0), ['расцветка', 'расцветки', 'расцветок']) : '';
    typo(g);
  }
  function chips(groupId, key) {
    var g = $(groupId); g.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (!b) return; g.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); F[key] = b.getAttribute('data-v'); shown = PAGE; paintGrid(); });
  }
  chips('fSeason', 'season'); chips('fCat', 'cat');
  $('fSize').addEventListener('change', function () { F.size = this.value; shown = PAGE; paintGrid(); });
  $('more').addEventListener('click', function () { shown += PAGE; paintGrid(); });
  document.querySelectorAll('[data-season]').forEach(function (a) { a.addEventListener('click', function () { var v = a.getAttribute('data-season'); var b = $('fSeason').querySelector('[data-v="' + v + '"]'); if (b) b.click(); }); });
  paintGrid();

  /* ---------- модалки ---------- */
  var ov = $('ov'), lastFocus = null, onClose = null;
  function openOv(node, right) {
    lastFocus = document.activeElement; ov.textContent = ''; ov.className = 'ov' + (right ? ' ov--right' : ''); ov.appendChild(node); ov.hidden = false; document.body.classList.add('lock');
    var f = node.querySelector('input:not([type=checkbox]), button.btn, [data-close]'); if (f) setTimeout(function () { f.focus(); }, 30);
    typo(node);
  }
  function closeOv() { if (ov.hidden) return; ov.hidden = true; ov.textContent = ''; document.body.classList.remove('lock'); if (onClose) { onClose(); onClose = null; } if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  ov.addEventListener('click', function (e) { if (e.target === ov || e.target.closest('[data-close]')) closeOv(); });
  document.addEventListener('keydown', function (e) {
    if (ov.hidden) return;
    if (e.key === 'Escape') { closeOv(); return; }
    if (e.key === 'Tab') { var f = ov.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'); if (!f.length) return; var a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { z.focus(); e.preventDefault(); } else if (!e.shiftKey && document.activeElement === z) { a.focus(); e.preventDefault(); } }
  });
  var toastT; function toast(msg) { var t = document.querySelector('.toast'); if (t) t.remove(); t = el('div', 'toast', msg); t.setAttribute('role', 'status'); document.body.appendChild(t); clearTimeout(toastT); toastT = setTimeout(function () { t.remove(); }, 2600); }

  /* ---------- быстрый просмотр + размерная сетка ---------- */
  function openQV(id) {
    var m = byId[id]; if (!m) return; var vi = 0, qty = {};
    var dlg = el('div', 'dlg'); dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true'); dlg.setAttribute('aria-label', nameOf(m));
    var x = el('button', 'dlg__x'); x.type = 'button'; x.setAttribute('data-close', ''); x.setAttribute('aria-label', 'Закрыть'); dlg.appendChild(x);
    var qv = el('div', 'qv'), media = el('div', 'qv__media'), big = el('div', 'qv__big'), thumbs = el('div', 'qv__thumbs'); media.appendChild(big); media.appendChild(thumbs);
    var body = el('div', 'qv__body'); qv.appendChild(media); qv.appendChild(body); dlg.appendChild(qv);
    body.appendChild(el('h2', '', nameOf(m)));
    var color = el('p', 'qv__color'); body.appendChild(color);
    var dl = el('dl', 'qv__meta');
    function row(k, v) { if (!v) return; dl.appendChild(el('dt', '', k)); dl.appendChild(el('dd', '', v)); }
    row('Размеры', sizeLabel(m)); row('Состав', m.sostav ? m.sostav.replace(/ - /g, ' ') : ''); row('Сезон', m.sezon ? m.sezon.charAt(0).toUpperCase() + m.sezon.slice(1) : m.seasons.map(function (s) { return SEASON[s]; }).join(', ')); row('На фото', m.kit ? 'в комплекте с: ' + m.kit : '');
    body.appendChild(dl);
    body.appendChild(el('p', 'cap', 'Количество по размерам'));
    var grid = el('div', 'sizegrid'); body.appendChild(grid);
    var sum = el('div', 'qv__sum'); var add = el('button', 'btn btn--accent'); add.type = 'button'; add.textContent = 'В заявку'; add.disabled = true; var sumT = el('span', '', 'Выберите количество'); sum.appendChild(add); sum.appendChild(sumT); body.appendChild(sum);
    body.appendChild(el('p', 'hint', 'Цены — в прайс-листе. Заявка без обязательств: менеджер подтвердит наличие по размерам и сумму.'));
    function paintSizes() {
      grid.textContent = ''; qty = {};
      sizeList(m.variants[vi].sizes || m.sizes).forEach(function (s) {
        var b = el('div', 'sz'); b.appendChild(el('b', '', String(s)));
        var ctl = el('div'); var minus = el('button', '', '−'); minus.type = 'button'; minus.setAttribute('aria-label', 'Меньше, размер ' + s); var inp = el('input'); inp.type = 'number'; inp.min = '0'; inp.max = '999'; inp.value = '0'; inp.setAttribute('aria-label', 'Количество, размер ' + s); var plus = el('button', '', '+'); plus.type = 'button'; plus.setAttribute('aria-label', 'Больше, размер ' + s);
        function set(n) { n = Math.max(0, Math.min(999, n | 0)); inp.value = n; if (n) qty[s] = n; else delete qty[s]; upd(); }
        minus.addEventListener('click', function () { set(+inp.value - 1); }); plus.addEventListener('click', function () { set(+inp.value + 1); }); inp.addEventListener('input', function () { set(+inp.value); });
        ctl.appendChild(minus); ctl.appendChild(inp); ctl.appendChild(plus); b.appendChild(ctl); grid.appendChild(b);
      });
      upd();
    }
    function total() { return Object.keys(qty).reduce(function (a, k) { return a + qty[k]; }, 0); }
    function upd() { var t = total(); add.disabled = !t; sumT.textContent = t ? plural(t, UNITS) + ' · ' + Object.keys(qty).length + ' разм.' : 'Выберите количество'; }
    function showV(i) {
      vi = i; var v = m.variants[i]; big.textContent = ''; big.appendChild(picture(v.img, '', nameOf(m) + ', цвет ' + v.color, false, true));
      color.innerHTML = 'Цвет: <b>' + esc(v.color) + '</b> · ' + (i + 1) + ' из ' + m.variants.length;
      thumbs.querySelectorAll('button').forEach(function (b, k) { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      paintSizes();
    }
    m.variants.forEach(function (v, i) { var b = el('button'); b.type = 'button'; b.setAttribute('aria-label', 'Цвет ' + v.color); var im = el('img'); im.src = IMG + v.img + '-480.webp'; im.alt = ''; im.loading = 'lazy'; im.width = 54; im.height = 81; b.appendChild(im); b.addEventListener('click', function () { showV(i); }); thumbs.appendChild(b); });
    add.addEventListener('click', function () { addLine(m.id, vi, qty); closeOv(); toast(nameOf(m) + ' добавлено в заявку'); });
    showV(0); openOv(dlg);
  }
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-qv]'); if (b) openQV(b.getAttribute('data-qv')); });

  /* ---------- заявка (без цен) ---------- */
  var CART = []; try { CART = JSON.parse(localStorage.getItem('lavira-zayavka') || '[]'); if (!Array.isArray(CART)) CART = []; } catch (e) { CART = []; }
  function save() { try { localStorage.setItem('lavira-zayavka', JSON.stringify(CART)); } catch (e) {} paintCartN(); }
  function cartUnits() { return CART.reduce(function (a, l) { return a + Object.keys(l.qty).reduce(function (b, k) { return b + l.qty[k]; }, 0); }, 0); }
  function paintCartN() { var n = cartUnits(); $('cartN').textContent = n; }
  function addLine(id, vi, qty) {
    var ex = CART.filter(function (l) { return l.id === id && l.vi === vi; })[0];
    if (ex) Object.keys(qty).forEach(function (k) { ex.qty[k] = (ex.qty[k] || 0) + qty[k]; }); else CART.push({ id: id, vi: vi, qty: JSON.parse(JSON.stringify(qty)) });
    save();
  }
  paintCartN();
  function openCart() {
    var p = el('div', 'panel'); p.setAttribute('role', 'dialog'); p.setAttribute('aria-modal', 'true'); p.setAttribute('aria-labelledby', 'cartTitle');
    var head = el('div', 'panel__head'); head.appendChild(el('h2', '', 'Заявка')); head.firstChild.id = 'cartTitle'; var x = el('button', 'dlg__x'); x.type = 'button'; x.style.position = 'static'; x.setAttribute('data-close', ''); x.setAttribute('aria-label', 'Закрыть'); head.appendChild(x); p.appendChild(head);
    var body = el('div', 'panel__body'), foot = el('div', 'panel__foot'); p.appendChild(body); p.appendChild(foot);
    function paint() {
      body.textContent = ''; foot.textContent = '';
      if (!CART.length) { var e = el('div', 'panel__empty'); e.appendChild(el('p', '', 'В заявке пока ничего нет. Откройте модель в каталоге и укажите количество по размерам.')); var b = el('button', 'btn btn--line btn--sm', 'В каталог'); b.type = 'button'; b.addEventListener('click', function () { closeOv(); location.hash = '#katalog'; }); e.appendChild(b); body.appendChild(e); return; }
      CART.forEach(function (l, idx) {
        var m = byId[l.id]; if (!m) return; var v = m.variants[l.vi] || m.variants[0];
        var row = el('div', 'line'); var im = el('img'); im.src = IMG + v.img + '-480.webp'; im.alt = ''; im.width = 56; im.height = 84; row.appendChild(im);
        var t = el('div'); t.appendChild(el('h4', '', nameOf(m))); t.appendChild(el('p', '', 'Цвет: ' + v.color)); var sz = el('div', 'line__sz'); Object.keys(l.qty).sort(function (a, b) { return a - b; }).forEach(function (k) { sz.appendChild(el('span', '', k + ' × ' + l.qty[k])); }); t.appendChild(sz); row.appendChild(t);
        var del = el('button', 'line__del', '×'); del.type = 'button'; del.setAttribute('aria-label', 'Убрать ' + nameOf(m)); del.addEventListener('click', function () { CART.splice(idx, 1); save(); paint(); }); row.appendChild(del);
        body.appendChild(row);
      });
      var tot = el('div', 'totals'); tot.innerHTML = '<span>Итого: <b>' + plural(cartUnits(), UNITS) + '</b> · ' + plural(CART.length, ['позиция', 'позиции', 'позиций']) + '</span><span>цены — по прайсу</span>'; body.appendChild(tot);
      var form = el('form', 'form'); form.noValidate = true; form.style.marginTop = '20px';
      form.innerHTML = '<p class="cap">Данные для заявки</p>' +
        '<div class="form__row"><div class="field"><label for="zOrg">Организация или ИП</label><input id="zOrg" name="org" autocomplete="organization" required><span class="msg"></span></div><div class="field"><label for="zName">Контактное лицо</label><input id="zName" name="name" autocomplete="name" required><span class="msg"></span></div></div>' +
        '<div class="form__row"><div class="field"><label for="zCity">Город</label><input id="zCity" name="city" autocomplete="address-level2" required><span class="msg"></span></div><div class="field"><label for="zPhone">Телефон</label><input id="zPhone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required><span class="msg"></span></div></div>' +
        '<div class="field"><label for="zMail">E-mail</label><input id="zMail" name="email" type="email" inputmode="email" autocomplete="email" required><span class="msg"></span></div>' +
        '<div class="field"><label for="zNote">Комментарий</label><textarea id="zNote" name="note" placeholder="Например: нужен счёт на юрлицо, отправка ТК в Казань"></textarea></div>' +
        '<label class="check"><input type="checkbox" name="agree" required><span>Согласен(на) на обработку персональных данных по <a href="prototyp/politika.html" target="_blank">политике</a></span></label>';
      body.appendChild(form);
      var send = el('button', 'btn btn--accent btn--full', 'Отправить заявку'); send.type = 'submit'; send.setAttribute('form', 'zForm'); form.id = 'zForm'; foot.appendChild(send); foot.appendChild(el('p', 'hint', 'Превью: заявка никуда не отправляется. На рабочем сайте она уйдёт менеджеру и копией на ваш e-mail.'));
      form.addEventListener('submit', function (e) { e.preventDefault(); if (!validate(form)) return; var data = formData(form); var units = cartUnits(), lines = CART.length; CART = []; save(); done('Заявка сформирована', 'Спасибо, ' + esc(data.name) + '! В заявке ' + plural(units, UNITS) + ' в ' + plural(lines, ['позиции', 'позициях', 'позициях']) + '. Менеджер подтвердит наличие и сумму и пришлёт счёт на ' + esc(data.email) + ' в рабочее время, пн–пт 9:00–18:00.'); });
      typo(body);
    }
    paint(); openOv(p, true);
  }
  $('cartBtn').addEventListener('click', openCart);

  /* ---------- формы ---------- */
  function formData(f) { var o = {}; Array.prototype.forEach.call(f.elements, function (i) { if (i.name) o[i.name] = i.type === 'checkbox' ? i.checked : i.value.trim(); }); return o; }
  function validate(f) {
    var ok = true, first = null;
    Array.prototype.forEach.call(f.querySelectorAll('[required]'), function (i) {
      var v = i.value.trim(), msg = '';
      if (i.type === 'checkbox') { if (!i.checked) msg = 'Нужно согласие'; }
      else if (!v) msg = 'Заполните поле';
      else if (i.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = 'Проверьте e-mail';
      else if (i.type === 'tel' && v.replace(/\D/g, '').length < 10) msg = 'Номер из 10–11 цифр';
      else if (v.length < 2) msg = 'Слишком коротко';
      var box = i.closest('.field, .check'); if (box) { box.classList.toggle('err', !!msg); var m = box.querySelector('.msg'); if (m) m.textContent = msg; }
      if (msg) { ok = false; if (!first) first = i; }
    });
    if (first) first.focus();
    return ok;
  }
  document.addEventListener('input', function (e) { var box = e.target.closest && e.target.closest('.field.err, .check.err'); if (box) { box.classList.remove('err'); var m = box.querySelector('.msg'); if (m) m.textContent = ''; } });
  function done(title, text) {
    var d = el('div', 'dlg'); d.style.width = 'min(600px,100%)'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.setAttribute('aria-label', title);
    var x = el('button', 'dlg__x'); x.type = 'button'; x.setAttribute('data-close', ''); x.setAttribute('aria-label', 'Закрыть'); d.appendChild(x);
    var b = el('div', 'done'); b.style.margin = '0 auto'; b.innerHTML = '<span class="ok" aria-hidden="true">✓</span><h2>' + esc(title) + '</h2><p>' + text + '</p><p class="note">Это бета-превью: ничего не отправлено и не сохранено на сервере. На рабочем сайте письмо уходит менеджеру и клиенту автоматически.</p>';
    var c = el('button', 'btn btn--line btn--sm', 'Закрыть'); c.type = 'button'; c.setAttribute('data-close', ''); b.appendChild(c); d.appendChild(b);
    openOv(d);
  }
  document.querySelectorAll('[data-open="price"]').forEach(function (b) {
    b.addEventListener('click', function () {
      var node = $('tplPrice').content.firstElementChild.cloneNode(true); openOv(node);
      node.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); var f = e.target; if (!validate(f)) return; var d = formData(f); done('Прайс-лист отправлен', 'Прайс по коллекциям Весна и Лето 2026 уйдёт на <b>' + esc(d.email) + '</b>. Менеджер свяжется по телефону в рабочее время, пн–пт 9:00–18:00.'); });
    });
  });

  /* ---------- меню на телефоне ---------- */
  var burger = $('burger'), mnav = $('mnav');
  burger.addEventListener('click', function () { var on = burger.getAttribute('aria-expanded') !== 'true'; burger.setAttribute('aria-expanded', on ? 'true' : 'false'); mnav.classList.toggle('on', on); document.body.classList.toggle('lock', on); });
  mnav.addEventListener('click', function (e) { if (e.target.closest('a')) { burger.setAttribute('aria-expanded', 'false'); mnav.classList.remove('on'); document.body.classList.remove('lock'); } });

  /* ---------- карта по клику ---------- */
  $('mapBtn').addEventListener('click', function () {
    var box = $('map'), ph = $('mapPh'); ph.hidden = true; box.hidden = false;
    var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'assets/vendor/leaflet/leaflet.css'; document.head.appendChild(css);
    var js = document.createElement('script'); js.src = 'assets/vendor/leaflet/leaflet.js';
    js.onload = function () {
      var Lf = window.L; Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('map', { scrollWheelZoom: false }).setView([55.65518, 37.72852], 16);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      Lf.marker([55.65518, 37.72852]).addTo(map).bindPopup('<b>ТД «Лавира»</b><br>ул. Перерва, 11с3, пом. 5<br>пн–пт 9:00–18:00').openPopup();
    };
    document.body.appendChild(js);
  });

  typo(document.body);
})();
