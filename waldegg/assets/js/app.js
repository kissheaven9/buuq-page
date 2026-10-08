/* Pension Waldegg — Beta-Vorschau. Ohne Backend: Verfügbarkeit und Buchung werden im Browser simuliert.
   Preise pro Person und Nacht laut Preisliste pensionwaldegg.com (bis / ab 18.12.2026), Kurtaxe nach Saison. */
(function () {
  'use strict';

  var D = window.WALDEGG;
  var ROOMS = D.ROOMS, P = D.PRICES;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Sprache ---------- */
  var lang = 'de';
  var memStore = {};
  function store(key, val) {
    try {
      if (val === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, val);
    } catch (e) {
      if (val === undefined) return memStore[key] || null;
      memStore[key] = val;
    }
    return val;
  }
  function t(key) { return D.UI[lang][key] !== undefined ? D.UI[lang][key] : key; }
  function L(room) { return room[lang]; }

  var META = {
    de: { title: document.title, desc: ($('meta[name="description"]') || {}).content },
    en: {
      title: 'Pension Waldegg Zermeiggern · Saas-Almagell · Ski slope, trail and hiking path at the door',
      desc: 'Guesthouse and restaurant at the end of the Saas Valley, 1,710 m, right on the river. Ski slope, ' +
        'cross-country trail and hiking paths at the house. Rooms from CHF 52.50 per person with breakfast, ' +
        'half board with a three-course dinner. 9.2 out of 10 from 350 reviews.'
    }
  };

  function rememberGerman() {
    $$('[data-i18n]').forEach(function (el) { el._de = el.innerHTML; });
    $$('[data-i18n-alt]').forEach(function (el) { el._deAlt = el.alt; });
    $$('[data-i18n-aria]').forEach(function (el) { el._deAria = el.getAttribute('aria-label'); });
  }
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (el) {
      var v = lang === 'de' ? el._de : D.EN[el.getAttribute('data-i18n')];
      if (v !== undefined) el.innerHTML = v;
    });
    $$('[data-i18n-alt]').forEach(function (el) {
      var v = lang === 'de' ? el._deAlt : D.EN[el.getAttribute('data-i18n-alt')];
      if (v !== undefined) el.alt = v;
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      var v = lang === 'de' ? el._deAria : D.EN[el.getAttribute('data-i18n-aria')];
      if (v !== undefined) el.setAttribute('aria-label', v);
    });
    $$('[data-lang]').forEach(function (b) {
      if (b.getAttribute('data-lang') === lang) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    document.title = META[lang].title;
    var md = $('meta[name="description"]');
    if (md) md.content = META[lang].desc;
    renderRooms();
    renderWidgets();
    if (!$('#bookModal').hidden) renderBook();
    typo(document.body);
  }
  function setLang(l) {
    lang = l === 'en' ? 'en' : 'de';
    store('waldegg-lang', lang);
    applyLang();
  }

  /* ---------- Typografie: kurze Wörter und Zahlen nicht am Zeilenende hängen lassen ---------- */
  var TYPO_WORDS = 'der|die|das|den|dem|des|ein|und|mit|von|vom|bis|für|auf|aus|bei|zum|zur|vor|als|wie|pro|' +
    'the|and|for|but|not|per';
  var TYPO_RE = new RegExp('(^|[\\s\\u00a0(„“"])([A-Za-zÄÖÜäöü]{1,2}|' + TYPO_WORDS +
    '|\\d[\\d.,’–]*)[ \\t\\n]+(?=\\S)', 'gi');
  function typo(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        if (p === 'SCRIPT' || p === 'STYLE' || p === 'TEXTAREA' || p === 'OPTION') return NodeFilter.FILTER_REJECT;
        return /\S\s+\S/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      var s = n.nodeValue, prev, pass = 0;
      do { prev = s; s = s.replace(TYPO_RE, '$1$2\u00a0'); pass++; } while (s !== prev && pass < 3);
      if (s !== n.nodeValue) n.nodeValue = s;
    }
  }

  /* ---------- Datum, Geld ---------- */
  function ymd(d) {
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function parseYmd(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function dayIdx(d) { return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); }
  function nightsBetween(a, b) { return dayIdx(b) - dayIdx(a); }
  function fmtDate(d, long) {
    var o = long ? { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }
      : { weekday: 'short', day: '2-digit', month: '2-digit' };
    return new Intl.DateTimeFormat(lang === 'de' ? 'de-CH' : 'en-GB', o).format(d);
  }
  function fmtMoney(n) {
    var s = (Math.round(n * 20) / 20).toFixed(2);
    var parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '’');
    return 'CHF\u00a0' + parts[0] + '.' + parts[1];
  }
  var TODAY = (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();

  /* ---------- Demo-Verfügbarkeit (deterministisch, ohne Backend) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function houseFull(d) { return hash(Math.floor(dayIdx(d) / 4) + 57) % 11 === 0; }
  function roomBusy(room, d) {
    if (houseFull(d)) return true;
    var i = ROOMS.indexOf(room);
    return hash(Math.floor((dayIdx(d) + i * 4) / 6) + i * 101) % 7 < room.busy;
  }
  function roomFree(room, from, to) {
    for (var d = from; d < to; d = addDays(d, 1)) if (roomBusy(room, d)) return false;
    return true;
  }
  function rangeHasFull(from, to) {
    for (var d = from; d < to; d = addDays(d, 1)) if (houseFull(d)) return true;
    return false;
  }

  /* ---------- Belegung und Preis ---------- */
  var state = { from: null, to: null, adults: 2, kids: [], board: 'bf', room: null, step: 1, month: null, form: {} };

  /* Kinder ab 13 zählen als Erwachsene (Preisliste: Kinder 4–12). */
  function occupancy() {
    var a = state.adults, k = 0, inf = 0;
    state.kids.forEach(function (age) { if (age >= 13) a++; else if (age >= 4) k++; else inf++; });
    return { adults: a, kids: k, infants: inf, beds: a + k };
  }
  function fits(room) {
    var o = occupancy();
    if (o.beds > room.max) return 'small';
    if (o.beds < room.min) return 'big';
    return 'ok';
  }
  function listFor(date) { return ymd(date) < P.until ? P.a : P.b; }
  function taxFor(date) { var m = date.getMonth() + 1; return (m >= 6 && m <= 10) ? P.tax.summer : P.tax.winter; }

  /* Preis Nacht für Nacht: Personenpreis nach Belegung (1 / 2 / 3–4 Personen), Kinder 4–12 zum Kindertarif,
     0–3 gratis; Kurtaxe für Erwachsene und Kinder ab 6 (Preisliste: 6–16). */
  function priceParts(room, from, to) {
    var o = occupancy(), lodging = 0, tax = 0;
    var kidsTaxed = state.kids.filter(function (age) { return age >= 6 && age <= 16; }).length;
    var adultsTaxed = state.adults + state.kids.filter(function (age) { return age > 16; }).length;
    for (var d = from; d < to; d = addDays(d, 1)) {
      var pl = listFor(d)[state.board];
      var tier = o.beds >= 3 ? pl.multi : (o.beds === 2 ? pl.dbl : pl.single);
      lodging += o.adults * tier + o.kids * pl.kid;
      var tx = taxFor(d);
      tax += adultsTaxed * tx.adult + kidsTaxed * tx.kid;
    }
    return { lodging: lodging, tax: tax, total: lodging + tax };
  }
  /* „ab“-Preis: Einzelzimmer = Einzelpreis, Doppelzimmer = 2 Personen, Vierbettzimmer = 3–4 Personen (Rabatt) */
  function fromPrice(room) { return room.max === 1 ? P.a.bf.single : (room.max >= 3 ? P.a.bf.multi : P.a.bf.dbl); }
  function guestsLabel() {
    var a = state.adults + '\u00a0' + (state.adults === 1 ? t('adult1') : t('adultN'));
    var k = state.kids.length;
    return k ? a + ', ' + k + '\u00a0' + (k === 1 ? t('kid1') : t('kidN')) : a;
  }
  function nightsLabel(n) { return n + '\u00a0' + (n === 1 ? t('night1') : t('nightN')); }

  /* ---------- Zimmerliste auf der Seite ---------- */
  function renderRooms() {
    $('#rooms').innerHTML = ROOMS.map(function (r) {
      var l = L(r);
      return '<article class="room">' +
        '<div><h3>' + esc(l.name) + '</h3><p class="room__meta">' + esc(l.meta) + '</p></div>' +
        '<p class="room__price"><b>' + t('room.from') + ' ' + fmtMoney(fromPrice(r)) + '</b><span>' + t('room.pp') + '</span></p>' +
        '<button class="btn btn--ghost btn--small" type="button" data-book data-room="' + r.id + '">' + t('room.book') + '</button>' +
        '</article>';
    }).join('');
  }

  /* ---------- Buchungszeile ---------- */
  function renderWidgets() {
    var html =
      '<button class="bw__field" type="button" data-book><span class="bw__label">' + t('bw.in') + '</span>' +
      '<span class="bw__value' + (state.from ? '' : ' is-empty') + '">' +
      (state.from ? fmtDate(state.from, true) : t('bw.pick')) + '</span></button>' +
      '<button class="bw__field" type="button" data-book><span class="bw__label">' + t('bw.out') + '</span>' +
      '<span class="bw__value' + (state.to ? '' : ' is-empty') + '">' +
      (state.to ? fmtDate(state.to, true) : t('bw.pick')) + '</span></button>' +
      '<button class="bw__field" type="button" data-book><span class="bw__label">' + t('bw.guests') + '</span>' +
      '<span class="bw__value">' + guestsLabel() + '</span></button>' +
      '<button class="btn btn--primary bw__btn" type="button" data-book>' + t('bw.btn') + '</button>';
    $$('[data-bw]').forEach(function (el) { el.innerHTML = html; });
  }

  /* ---------- Modal ---------- */
  var lastFocus = null;
  function openModal(m) {
    if (!document.body.classList.contains('is-locked')) lastFocus = document.activeElement;
    m.hidden = false;
    document.body.classList.add('is-locked');
    var dlg = $('.modal__dialog', m);
    dlg.scrollTop = 0;
    dlg.focus();
  }
  function closeModals() {
    $$('.modal').forEach(function (x) { x.hidden = true; });
    document.body.classList.remove('is-locked');
    if (lastFocus && lastFocus !== document.body && lastFocus.focus) lastFocus.focus();
    else if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }
  function trapFocus(e) {
    var m = $$('.modal').filter(function (x) { return !x.hidden; })[0];
    if (!m || e.key !== 'Tab') return;
    var f = $$('a[href], button:not([disabled]), input, select, textarea', m).filter(function (el) {
      return el.offsetParent !== null;
    });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === $('.modal__dialog', m))) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  /* ---------- Buchung ---------- */
  function openBooking(preferId) {
    state.prefer = preferId || null;
    state.step = 1;
    state.room = null;
    if (!state.month) state.month = new Date((state.from || TODAY).getFullYear(), (state.from || TODAY).getMonth(), 1);
    renderBook();
    openModal($('#bookModal'));
  }
  function renderBook() {
    $$('#bookSteps li').forEach(function (li, i) {
      li.classList.toggle('is-active', i + 1 === state.step);
      li.classList.toggle('is-done', i + 1 < state.step);
      if (i + 1 === state.step) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    var body = $('#bookBody');
    if (state.step === 1) {
      body.innerHTML = '<div class="bk"><div class="bk__left"><div class="cal" id="cal"></div>' +
        '<div class="guests" id="guests"></div></div><div class="bk__right"><div class="board" id="board"></div><div id="bkRooms"></div></div></div>';
      renderCal(); renderGuests(); renderBoard(); renderRoomList();
    } else if (state.step === 2) {
      body.innerHTML = step2Html();
    } else {
      body.innerHTML = step3Html();
    }
    typo(body);
  }

  function renderCal() {
    var m = state.month, y = m.getFullYear(), mo = m.getMonth();
    var loc = lang === 'de' ? 'de-CH' : 'en-GB';
    var title = new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric' }).format(m);
    var minMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    var maxMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 12, 1);
    var wd = [];
    for (var i = 0; i < 7; i++) {
      wd.push('<span>' + new Intl.DateTimeFormat(loc, { weekday: 'short' }).format(new Date(2024, 0, 1 + i)).slice(0, 2) + '</span>');
    }
    var lead = (new Date(y, mo, 1).getDay() + 6) % 7;
    var days = new Date(y, mo + 1, 0).getDate();
    var cells = '';
    for (i = 0; i < lead; i++) cells += '<span></span>';
    for (var d = 1; d <= days; d++) {
      var date = new Date(y, mo, d), cls = 'cal__day', dis = false;
      if (date < TODAY) { dis = true; cls += ' is-past'; }
      else if (houseFull(date)) {
        var okAsEnd = state.from && !state.to && date > state.from && !rangeHasFull(state.from, date);
        if (!okAsEnd) dis = true;
        cls += ' is-busy';
      }
      if (state.from && +date === +state.from) cls += ' is-start';
      if (state.to && +date === +state.to) cls += ' is-end';
      if (state.from && state.to && date > state.from && date < state.to) cls += ' is-in';
      if (+date === +TODAY) cls += ' is-today';
      cells += '<button type="button" class="' + cls + '" data-day="' + ymd(date) + '"' + (dis ? ' disabled' : '') +
        ' aria-label="' + fmtDate(date, true) + '">' + d + '</button>';
    }
    var hint = !state.from ? t('cal.hintIn') : (!state.to ? t('cal.hintOut')
      : fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nightsBetween(state.from, state.to)));
    $('#cal').innerHTML =
      '<div class="cal__head">' +
      '<button type="button" class="cal__nav" data-cal="-1" aria-label="' + t('cal.prev') + '"' +
      (m <= minMonth ? ' disabled' : '') + '><svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<p class="cal__title" aria-live="polite">' + title + '</p>' +
      '<button type="button" class="cal__nav" data-cal="1" aria-label="' + t('cal.next') + '"' +
      (m >= maxMonth ? ' disabled' : '') + '><svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
      '</div><div class="cal__wd">' + wd.join('') + '</div><div class="cal__grid">' + cells + '</div>' +
      '<p class="cal__hint" aria-live="polite">' + hint +
      (state.from ? ' <button type="button" class="link" data-cal-reset>' + t('cal.reset') + '</button>' : '') + '</p>' +
      '<ul class="cal__legend"><li class="lg-free">' + t('cal.free') + '</li><li class="lg-busy">' + t('cal.busy') +
      '</li><li class="lg-sel">' + t('cal.sel') + '</li></ul>';
  }
  function pickDay(s) {
    var d = parseYmd(s);
    if (!state.from || state.to || d <= state.from || rangeHasFull(state.from, d)) {
      if (houseFull(d)) return;
      state.from = d; state.to = null;
    } else {
      state.to = d;
    }
    renderCal(); renderRoomList(); renderWidgets();
    typo($('#bookBody'));
    refocus('[data-day="' + s + '"]');
  }
  function refocus(sel) {
    var el = $(sel, $('#bookBody'));
    if (el && !el.disabled) el.focus();
  }
  function stepper(key, val, min, max, label) {
    return '<div class="stepper"><span class="stepper__label">' + label + '</span>' +
      '<span class="stepper__ctl"><button type="button" data-step="' + key + '" data-d="-1" aria-label="' + label + ': ' +
      t('bk.less') + '"' + (val <= min ? ' disabled' : '') + '>−</button><output>' + val + '</output>' +
      '<button type="button" data-step="' + key + '" data-d="1" aria-label="' + label + ': ' + t('bk.more') + '"' +
      (val >= max ? ' disabled' : '') + '>+</button></span></div>';
  }
  function renderGuests() {
    var ages = state.kids.map(function (age, i) {
      var opts = '';
      for (var a = 0; a <= 16; a++) opts += '<option value="' + a + '"' + (a === age ? ' selected' : '') + '>' + a + '</option>';
      return '<label class="age"><span>' + t('bk.age') + ' ' + (i + 1) + '</span><select data-age="' + i + '">' + opts + '</select></label>';
    }).join('');
    $('#guests').innerHTML = '<h3 class="bk__h">' + t('bk.guests') + '</h3>' +
      stepper('adults', state.adults, 1, 4, t('bk.adults')) +
      stepper('kids', state.kids.length, 0, 3, t('bk.kids')) +
      (ages ? '<div class="ages">' + ages + '</div>' : '');
  }
  function renderBoard() {
    var pl = listFor(state.from || TODAY);
    $('#board').innerHTML = '<h3 class="bk__h">' + t('bk.board') + '</h3>' +
      '<label class="board__opt"><input type="radio" name="board" value="bf"' + (state.board === 'bf' ? ' checked' : '') + '>' +
      '<span><b>' + t('bk.bf') + '</b><small>' + fmtMoney(pl.bf.dbl) + ' ' + t('room.pp').replace(/ mit Frühstück| with breakfast/, '') + '</small></span></label>' +
      '<label class="board__opt"><input type="radio" name="board" value="hp"' + (state.board === 'hp' ? ' checked' : '') + '>' +
      '<span><b>' + t('bk.hp') + '</b><small>' + t('bk.hpS') + ' · ' + fmtMoney(pl.hp.dbl) + '</small></span></label>';
  }
  function renderRoomList() {
    var box = $('#bkRooms');
    if (!box) return;
    var ready = state.from && state.to;
    var nights = ready ? nightsBetween(state.from, state.to) : 0;
    var list = ROOMS.slice().sort(function (a, b) { return (b.id === state.prefer) - (a.id === state.prefer); });
    var anyFree = false;
    var rows = list.map(function (r) {
      var l = L(r), fit = fits(r), free = ready && fit === 'ok' && roomFree(r, state.from, state.to);
      if (free) anyFree = true;
      var right;
      if (fit !== 'ok') right = '<p class="bkr__state">' + t(fit === 'small' ? 'bk.small' : 'bk.big') + '</p>';
      else if (!ready) right = '<p class="bkr__price">' + t('room.from') + ' <b>' + fmtMoney(fromPrice(r)) + '</b><span>' + t('room.pp') + '</span></p>';
      else if (!free) right = '<p class="bkr__state">' + t('bk.busy') + '</p>';
      else right = '<p class="bkr__price"><b>' + fmtMoney(priceParts(r, state.from, state.to).total) + '</b><span>' +
        t('bk.total') + ' · ' + nightsLabel(nights) + '</span></p>' +
        '<button class="btn btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
      return '<li class="bkr' + (fit !== 'ok' || (ready && !free) ? ' is-off' : '') + '">' +
        '<div class="bkr__info"><h4>' + esc(l.name) + '</h4><p>' + esc(l.meta) + '</p></div>' +
        '<div class="bkr__right">' + right + '</div></li>';
    }).join('');
    var sub = ready
      ? fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + guestsLabel() + ' · ' + t(state.board === 'bf' ? 'bk.bf' : 'bk.hp')
      : t('bk.pickDates');
    box.innerHTML = '<h3 class="bk__h">' + t('bk.rooms') + '</h3><p class="bk__sub">' + sub + '</p>' +
      '<ul class="bkr-list">' + rows + '</ul>' +
      (ready && !anyFree ? '<p class="bk__none" role="status">' + t('bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.incl') + '. ' + t('bk.group') + '</p>';
  }

  function summaryHtml() {
    var r = state.room, nights = nightsBetween(state.from, state.to), p = priceParts(r, state.from, state.to);
    return '<aside class="sum"><h3 class="bk__h">' + t('bk.summary') + '</h3>' +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(L(r).name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + guestsLabel() + '</dd></div>' +
      '<div><dt>' + t('bk.boardL') + '</dt><dd>' + t(state.board === 'bf' ? 'bk.bf' : 'bk.hp') + '</dd></div>' +
      '<div><dt>' + t('bk.lodging') + '</dt><dd>' + fmtMoney(p.lodging) + '</dd></div>' +
      '<div><dt>' + t('bk.tax') + '</dt><dd>' + fmtMoney(p.tax) + '</dd></div>' +
      '<div class="sum__total"><dt>' + t('bk.price') + '</dt><dd>' + fmtMoney(p.total) + '</dd></div></dl>' +
      '<p class="bk__fine">' + t('bk.incl') + '. ' + t('bk.pay') + '</p></aside>';
  }
  function field(name, type, label, auto, required) {
    var v = state.form[name] || '';
    var tag = type === 'textarea'
      ? '<textarea id="f-' + name + '" name="' + name + '" rows="3">' + esc(v) + '</textarea>'
      : '<input id="f-' + name + '" name="' + name + '" type="' + type + '" value="' + esc(v) + '" autocomplete="' + auto +
        '"' + (required ? ' required aria-describedby="e-' + name + '"' : '') + '>';
    return '<div class="field"><label for="f-' + name + '">' + label + (required ? ' *' : '') + '</label>' + tag +
      (required ? '<p class="field__err" id="e-' + name + '" hidden></p>' : '') + '</div>';
  }
  function step2Html() {
    return '<div class="bk bk--form"><form class="form" id="bookForm" novalidate>' +
      field('name', 'text', t('f.name'), 'name', true) +
      field('email', 'email', t('f.email'), 'email', true) +
      field('phone', 'tel', t('f.phone'), 'tel', true) +
      field('msg', 'textarea', t('f.msg'), 'off', false) +
      '<div class="field field--check"><input id="f-consent" name="consent" type="checkbox" aria-describedby="e-consent">' +
      '<label for="f-consent">' + t('f.consent') + '</label><p class="field__err" id="e-consent" hidden></p></div>' +
      '<div class="form__actions"><button class="link" type="button" data-back>' + t('bk.back') + '</button>' +
      '<button class="btn btn--primary" type="submit">' + t('f.submit') + '</button></div></form>' +
      summaryHtml() + '</div>';
  }
  function step3Html() {
    var no = 'WA-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + state.adults) % 9000);
    return '<div class="ok">' +
      '<h3 class="ok__title">' + esc(t('ok.title').replace('{name}', state.form.name.split(' ')[0])) + '</h3>' +
      '<p>' + esc(t('ok.text').replace('{email}', state.form.email)) + '</p>' +
      '<p>' + t('ok.no') + ': <b>' + no + '</b></p>' + summaryHtml() +
      '<p class="ok__demo">' + t('ok.demo') + '</p>' +
      '<button class="btn" type="button" data-close>' + t('ok.close') + '</button></div>';
  }
  function validate(form) {
    var ok = true, first = null;
    function check(name, valid, msg) {
      var el = form.elements[name], err = $('#e-' + name, form);
      err.hidden = valid;
      err.textContent = valid ? '' : msg;
      el.setAttribute('aria-invalid', valid ? 'false' : 'true');
      if (!valid) { ok = false; if (!first) first = el; }
    }
    var v = form.elements;
    check('name', v.name.value.trim().length >= 3 && /\s/.test(v.name.value.trim()), t('e.name'));
    check('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.value.trim()), t('e.email'));
    check('phone', v.phone.value.replace(/[^\d]/g, '').length >= 6, t('e.phone'));
    check('consent', v.consent.checked, t('e.consent'));
    if (first) first.focus();
    return ok;
  }
  function saveForm() {
    var form = $('#bookForm');
    if (!form) return;
    ['name', 'email', 'phone', 'msg'].forEach(function (n) { state.form[n] = form.elements[n].value.trim(); });
  }

  /* ---------- Karte (erst nach Klick) ---------- */
  function loadMap() {
    var box = $('#map');
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'assets/vendor/leaflet/leaflet.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = 'assets/vendor/leaflet/leaflet.js';
    js.onload = function () {
      var Lf = window.L, pos = [46.08648, 7.95852];
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" ' +
        'href="https://www.openstreetmap.org/?mlat=46.08648&mlon=7.95852#map=15/46.08648/7.95852">' + t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(pos, 14);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      Lf.marker(pos).addTo(map).bindPopup('<b>Pension Waldegg</b><br>Talstrasse 205, Saas-Almagell');
    };
    document.head.appendChild(js);
  }

  /* ---------- Menü ---------- */
  function toggleMenu(open) {
    var menu = $('#menu'), btn = $('#menuBtn');
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    $('use', btn).setAttribute('href', open ? '#i-close' : '#i-menu');
    document.body.classList.toggle('menu-open', open);
  }

  /* ---------- Ereignisse ---------- */
  document.addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-lang]'))) { setLang(el.getAttribute('data-lang')); return; }
    if ((el = e.target.closest('[data-book]'))) { toggleMenu(false); openBooking(el.getAttribute('data-room')); return; }
    if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) { closeModals(); return; }
    if ((el = e.target.closest('[data-day]'))) { pickDay(el.getAttribute('data-day')); return; }
    if ((el = e.target.closest('[data-cal]'))) {
      state.month = new Date(state.month.getFullYear(), state.month.getMonth() + (+el.getAttribute('data-cal')), 1);
      renderCal();
      refocus('[data-cal="' + el.getAttribute('data-cal') + '"]');
      return;
    }
    if (e.target.closest('[data-cal-reset]')) {
      state.from = state.to = null;
      renderCal(); renderRoomList(); renderWidgets(); typo($('#bookBody')); return;
    }
    if ((el = e.target.closest('[data-step]'))) {
      var d = +el.getAttribute('data-d');
      if (el.getAttribute('data-step') === 'adults') state.adults = Math.min(4, Math.max(1, state.adults + d));
      else if (d > 0 && state.kids.length < 3) state.kids.push(8);
      else if (d < 0) state.kids.pop();
      renderGuests(); renderRoomList(); renderWidgets(); typo($('#bookBody'));
      refocus('[data-step="' + el.getAttribute('data-step') + '"][data-d="' + d + '"]');
      return;
    }
    if ((el = e.target.closest('[data-pick]'))) {
      state.room = ROOMS.filter(function (r) { return r.id === el.getAttribute('data-pick'); })[0];
      state.step = 2; renderBook();
      $('#bookModal .modal__dialog').scrollTop = 0;
      var f = $('#f-name'); if (f) f.focus();
      return;
    }
    if (e.target.closest('[data-back]')) { saveForm(); state.step = 1; renderBook(); return; }
    if (e.target.closest('#menuBtn')) { toggleMenu($('#menu').hidden); return; }
    if (e.target.closest('#menu a')) { toggleMenu(false); return; }
    if (e.target.closest('#mapLoad')) { loadMap(); return; }
  });
  document.addEventListener('change', function (e) {
    var el;
    if ((el = e.target.closest('[data-age]'))) {
      state.kids[+el.getAttribute('data-age')] = +el.value;
      renderRoomList(); typo($('#bookBody')); return;
    }
    if ((el = e.target.closest('input[name="board"]'))) {
      state.board = el.value === 'hp' ? 'hp' : 'bf';
      renderRoomList(); typo($('#bookBody'));
    }
  });
  document.addEventListener('submit', function (e) {
    if (e.target.id !== 'bookForm') return;
    e.preventDefault();
    if (!validate(e.target)) return;
    saveForm();
    state.step = 3;
    renderBook();
    $('#bookModal .modal__dialog').scrollTop = 0;
    $('#bookModal .modal__dialog').focus();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if ($$('.modal').some(function (m) { return !m.hidden; })) closeModals();
      else if (!$('#menu').hidden) { toggleMenu(false); $('#menuBtn').focus(); }
    }
    trapFocus(e);
  });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1100) toggleMenu(false); });

  /* ---------- Start ---------- */
  rememberGerman();
  var q = /[?&]lang=(de|en)/.exec(window.location.search);
  lang = q ? q[1] : (store('waldegg-lang') === 'en' ? 'en' : 'de');
  if (q) store('waldegg-lang', lang);
  applyLang();
})();
