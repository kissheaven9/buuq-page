/* Gasthof Hirsch — Beta-Vorschau. Ohne Backend: Verfügbarkeit, Zimmeranfrage und Tischanfrage werden im Browser simuliert. */
(function () {
  'use strict';

  var D = window.HIRSCH;
  var ROOMS = D.ROOMS;
  var MAX_PERSONS = 2;
  var TEL = '08381 7601';
  /* Öffnungszeiten laut gasthaushirsch-heimenkirch.de (Stand 5.10.2026), Index = Wochentag (0 = Sonntag), Minuten ab Mitternacht */
  var HOURS = [
    [[570, 840]], [], [], [[570, 840], [1050, 1320]], [[570, 840]], [[570, 840], [1050, 1440]], [[570, 840], [1050, 1440]]
  ];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Sprache ---------- */
  var LANGS = ['de', 'en'];
  var LOCALE = { de: 'de-DE', en: 'en-GB' };
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

  var META_DE = { title: document.title, desc: ($('meta[name="description"]') || {}).content };

  function rememberGerman() {
    $$('[data-i18n]').forEach(function (el) { el._de = el.innerHTML; });
    $$('[data-i18n-alt]').forEach(function (el) { el._deAlt = el.alt; });
    $$('[data-i18n-aria]').forEach(function (el) { el._deAria = el.getAttribute('aria-label'); });
  }

  function applyLang() {
    var dict = D.T[lang] || {};
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (el) {
      var v = lang === 'de' ? el._de : dict[el.getAttribute('data-i18n')];
      if (v !== undefined) el.innerHTML = v;
    });
    $$('[data-i18n-alt]').forEach(function (el) {
      var v = lang === 'de' ? el._deAlt : dict[el.getAttribute('data-i18n-alt')];
      if (v !== undefined) el.alt = v;
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      var v = lang === 'de' ? el._deAria : dict[el.getAttribute('data-i18n-aria')];
      if (v !== undefined) el.setAttribute('aria-label', v);
    });
    $$('[data-lang]').forEach(function (b) {
      if (b.getAttribute('data-lang') === lang) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    var meta = lang === 'de' ? META_DE : D.META[lang];
    document.title = meta.title;
    var md = $('meta[name="description"]');
    if (md) md.content = meta.desc;
    renderRooms();
    renderOpen();
    if (!$('#bookModal').hidden) renderBook();
    if (!$('#tableModal').hidden) renderTable();
    typo(document.body);
  }

  function setLang(l) {
    lang = LANGS.indexOf(l) >= 0 ? l : 'de';
    store('hirsch-lang', lang);
    applyLang();
  }

  /* ---------- Typografie: kurze Funktionswörter und Zahlen nicht am Zeilenende hängen lassen ---------- */
  var TYPO_WORDS = 'der|die|das|den|dem|des|ein|und|mit|von|vom|bis|für|auf|aus|bei|zum|zur|vor|als|wie|pro|ab|' +
    'the|and|for|but|not|per|from';
  var TYPO_RE = new RegExp('(^|[\\s\\u00a0(«“"])([A-Za-zÀ-ÿ]{1,2}|' + TYPO_WORDS +
    '|\\d[\\d.,–’]*)[ \\t\\n]+(?=\\S)', 'gi');
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

  /* ---------- Datum ---------- */
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
    return new Intl.DateTimeFormat(LOCALE[lang], o).format(d);
  }
  var NOW = new Date();
  var TODAY = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());

  /* ---------- Heute geöffnet? ---------- */
  function hm(min) {
    if (min === 1440) return lang === 'de' ? '24:00' : 'midnight';
    var h = Math.floor(min / 60), m = min % 60;
    return h + ':' + ('0' + m).slice(-2);
  }
  function slotText(slots) {
    return slots.map(function (s) { return hm(s[0]) + '–' + hm(s[1]); }).join(t('open.and'));
  }
  function renderOpen() {
    var el = $('#openText'), dot = $('#openDot'), line = $('#openHours');
    if (!el) return;
    var wd = NOW.getDay(), min = NOW.getHours() * 60 + NOW.getMinutes(), slots = HOURS[wd];
    var cur = slots.filter(function (s) { return min >= s[0] && min < s[1]; })[0];
    var next = slots.filter(function (s) { return min < s[0]; })[0];
    var txt, on;
    if (cur) { txt = t('open.now').replace('{t}', hm(cur[1])); on = true; }
    else if (next) { txt = t('open.later').replace('{t}', hm(next[0])); on = null; }
    else if (slots.length) { txt = t('open.done'); on = false; }
    else { txt = t('open.rest'); on = false; }
    el.textContent = txt;
    dot.className = 'dot' + (on === true ? ' is-on' : on === false ? ' is-off' : '');
    if (slots.length && (cur || next)) line.textContent = t('open.h').replace('{h}', slotText(slots));
    else {
      var d = 1; while (!HOURS[(wd + d) % 7].length) d++;
      var name = new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'long' }).format(addDays(TODAY, d));
      line.textContent = t('open.next').replace('{d}', name);
    }
  }

  /* ---------- Demo-Verfügbarkeit (deterministisch, ohne Backend) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function houseFull(d) { return hash(Math.floor(dayIdx(d) / 4) + 31) % 9 === 0; }
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

  /* ---------- Zustand ---------- */
  var state = { from: null, to: null, persons: 2, prefer: null, room: null, step: 1, month: null, form: {} };
  var table = { step: 1, feier: false, form: {} };

  function fits(room, persons) { return persons <= room.max; }
  function personsLabel(n) { return n + '\u00a0' + (n === 1 ? t('person1') : t('personN')); }
  function nightsLabel(n) { return n + '\u00a0' + (n === 1 ? t('night1') : t('nightN')); }
  function roomById(id) { return ROOMS.filter(function (r) { return r.id === id; })[0]; }

  /* ---------- Zimmer: zwei Zeilen (ohne Fotos und ohne Preise: beides hat das Haus nicht veröffentlicht) ---------- */
  function renderRooms() {
    var box = $('#rooms');
    if (!box) return;
    box.innerHTML = '<ul class="rooms">' + ROOMS.map(function (r) {
      var l = L(r);
      return '<li class="room"><div><h3 class="room__name">' + esc(l.name) + '</h3><p class="room__cap">' + esc(l.cap) + ' · ' + esc(l.points.join(' · ')) + '</p></div>' +
        '<div><p class="room__text">' + esc(l.short) + '</p><div class="room__right"><p class="room__price">' + t('room.price') + '</p>' +
        '<button class="btn btn--ghost-dark btn--small" type="button" data-book data-room="' + r.id + '" aria-label="' +
        esc(l.name + ': ' + t('bw.btn')) + '">' + t('room.ask') + '</button></div></div></li>';
    }).join('') + '</ul>';
  }

  /* ---------- Modale Fenster ---------- */
  var lastFocus = null;
  function openModal(m) {
    $$('.modal').forEach(function (x) { if (x !== m) x.hidden = true; });
    if (!document.body.classList.contains('is-locked')) lastFocus = document.activeElement;
    m.hidden = false;
    document.body.classList.add('is-locked');
    $('.modal__dialog', m).focus({ preventScroll: true });
    m.scrollTop = 0;
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
  function refocusIn(box, sel) {
    var el = $(sel, $(box));
    if (el && !el.disabled) el.focus();
  }

  /* ---------- Buchung ---------- */
  function openBooking(preferId) {
    state.prefer = preferId || null;
    state.step = 1;
    state.room = null;
    if (state.prefer) {
      var pr = roomById(state.prefer);
      if (pr && !fits(pr, state.persons)) state.persons = pr.max;
    }
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
        '<div class="guests" id="guests"></div></div><div class="bk__right" id="bkRooms"></div></div>';
      renderCal(); renderGuests(); renderRoomList();
    } else if (state.step === 2) {
      body.innerHTML = step2Html();
    } else {
      body.innerHTML = step3Html();
    }
    typo(body);
  }

  function renderCal() {
    var m = state.month, y = m.getFullYear(), mo = m.getMonth();
    var loc = LOCALE[lang];
    var title = new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric' }).format(m);
    var minMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    var maxMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 12, 1);
    var wd = [];
    for (var i = 0; i < 7; i++) {
      wd.push('<span>' + new Intl.DateTimeFormat(loc, { weekday: 'short' }).format(new Date(2024, 0, 1 + i)).slice(0, 2) +
        '</span>');
    }
    var lead = (new Date(y, mo, 1).getDay() + 6) % 7;
    var days = new Date(y, mo + 1, 0).getDate();
    var cells = '';
    for (i = 0; i < lead; i++) cells += '<span></span>';
    for (var d = 1; d <= days; d++) {
      var date = new Date(y, mo, d), cls = 'cal__day', dis = false;
      if (date < TODAY) { dis = true; cls += ' is-past'; }
      else if (houseFull(date)) {
        /* ein belegter Tag darf Abreisetag sein, wenn die Nächte davor frei sind */
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
      '</div><div class="cal__wd" aria-hidden="true">' + wd.join('') + '</div><div class="cal__grid">' + cells + '</div>' +
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
    renderCal(); renderRoomList();
    typo($('#bookBody'));
    refocusIn('#bookBody', '[data-day="' + s + '"]');
  }

  function renderGuests() {
    var label = t('bk.persons'), val = state.persons;
    $('#guests').innerHTML = '<h3 class="bk__h">' + t('bk.guests') + '</h3>' +
      '<div class="stepper"><span class="stepper__label">' + label + '</span>' +
      '<span class="stepper__ctl"><button type="button" data-step="-1" aria-label="' + label + ': ' + t('bk.less') + '"' +
      (val <= 1 ? ' disabled' : '') + '>−</button><output aria-live="polite">' + val + '</output>' +
      '<button type="button" data-step="1" aria-label="' + label + ': ' + t('bk.more') + '"' +
      (val >= MAX_PERSONS ? ' disabled' : '') + '>+</button></span></div>';
  }

  function renderRoomList() {
    var box = $('#bkRooms');
    if (!box) return;
    var ready = state.from && state.to;
    var nights = ready ? nightsBetween(state.from, state.to) : 0;
    var list = ROOMS.slice().sort(function (a, b) {
      return fits(b, state.persons) - fits(a, state.persons) || (b.id === state.prefer) - (a.id === state.prefer);
    });
    var anyFree = false;
    var rows = list.map(function (r) {
      var l = L(r), ok = fits(r, state.persons);
      var free = ready && ok && roomFree(r, state.from, state.to);
      var right, off = false;
      if (!ok) { right = '<p class="bkr__state">' + t('bk.small') + '</p>'; off = true; }
      else if (!ready) right = '<p class="bkr__price"><b>' + t('room.price') + '</b></p>';
      else if (!free) { right = '<p class="bkr__state">' + t('bk.busy') + '</p>'; off = true; }
      else {
        anyFree = true;
        right = '<p class="bkr__price"><b>' + t('bk.free') + '</b><span>' + nightsLabel(nights) + ' · ' + t('room.price') + '</span></p>' +
          '<button class="btn btn--dark btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
      }
      return '<li class="bkr' + (off ? ' is-off' : '') + '">' +
        '<div class="bkr__info"><h4>' + esc(l.name) + '</h4><p>' + esc(l.cap) + '</p></div>' +
        '<div class="bkr__right">' + right + '</div></li>';
    }).join('');
    var sub = ready
      ? fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + personsLabel(state.persons)
      : t('bk.pickDates');
    box.innerHTML = '<h3 class="bk__h">' + t('bk.rooms') + '</h3><p class="bk__sub">' + sub + '</p>' +
      '<ul class="bkr-list">' + rows + '</ul>' +
      (ready && !anyFree ? '<p class="bk__none" role="status">' + t('bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.fine') + '</p>';
  }

  function summaryHtml() {
    var r = state.room, nights = nightsBetween(state.from, state.to);
    return '<aside class="sum"><h3 class="bk__h">' + t('bk.summary') + '</h3>' +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(L(r).name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' +
      nightsLabel(nights) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + personsLabel(state.persons) + '</dd></div>' +
      '<div class="sum__total"><dt>' + t('bk.price') + '</dt><dd>' + t('bk.priceV') + '</dd></div></dl>' +
      (state.form.firma ? '<p class="sum__flag">' + t('ok.firma') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.fine') + '</p></aside>';
  }

  function field(pfx, src, name, type, label, auto, required) {
    var v = src[name] || '';
    var id = pfx + '-' + name;
    var tag = type === 'textarea'
      ? '<textarea id="' + id + '" name="' + name + '" rows="3">' + esc(v) + '</textarea>'
      : '<input id="' + id + '" name="' + name + '" type="' + type + '" value="' + esc(v) + '" autocomplete="' + auto +
        '"' + (required ? ' required aria-describedby="e' + id + '"' : '') + '>';
    return '<div class="field"><label for="' + id + '">' + label + (required ? ' *' : '') + '</label>' + tag +
      (required ? '<p class="field__err" id="e' + id + '" hidden></p>' : '') + '</div>';
  }
  function checkbox(pfx, name, label, checked, note, err) {
    var id = pfx + '-' + name;
    return '<div class="field field--check"><input id="' + id + '" name="' + name + '" type="checkbox"' + (checked ? ' checked' : '') +
      (err ? ' aria-describedby="e' + id + '"' : '') + '><label for="' + id + '">' + label + (note ? '<small>' + note + '</small>' : '') +
      '</label>' + (err ? '<p class="field__err" id="e' + id + '" hidden></p>' : '') + '</div>';
  }
  function step2Html() {
    return '<div class="bk bk--form"><form class="form" id="bookForm" novalidate>' +
      field('f', state.form, 'name', 'text', t('f.name'), 'name', true) +
      field('f', state.form, 'email', 'email', t('f.email'), 'email', true) +
      field('f', state.form, 'phone', 'tel', t('f.phone'), 'tel', true) +
      checkbox('f', 'firma', t('f.firma'), state.form.firma) +
      field('f', state.form, 'msg', 'textarea', t('f.msg'), 'off', false) +
      checkbox('f', 'consent', t('f.consent'), false, '', true) +
      '<div class="form__actions"><button class="link" type="button" data-back>' + t('bk.back') + '</button>' +
      '<button class="btn btn--dark" type="submit">' + t('f.submit') + '</button></div></form>' +
      summaryHtml() + '</div>';
  }
  function step3Html() {
    var no = 'HI-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + state.persons) % 9000);
    return '<div class="ok"><span class="ok__ico"><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg></span>' +
      '<h3 class="ok__title">' + esc(t('ok.title').replace('{name}', state.form.name.split(' ')[0])) + '</h3>' +
      '<p>' + esc(t('ok.text').replace('{email}', state.form.email)) + '</p>' +
      '<p class="ok__no">' + t('ok.no') + ': <b>' + no + '</b></p>' + summaryHtml() +
      '<p class="ok__demo">' + t('ok.demo') + '</p>' +
      '<button class="btn btn--dark" type="button" data-close>' + t('ok.close') + '</button></div>';
  }

  function checker(form, pfx) {
    var api = { ok: true, first: null };
    api.check = function (name, valid, msg) {
      var el = form.elements[name], err = $('#e' + pfx + '-' + name, form);
      err.hidden = valid;
      err.textContent = valid ? '' : msg;
      el.setAttribute('aria-invalid', valid ? 'false' : 'true');
      if (!valid) { api.ok = false; if (!api.first) api.first = el; }
    };
    return api;
  }
  function validate(form) {
    var c = checker(form, 'f'), v = form.elements;
    c.check('name', v.name.value.trim().length >= 3 && /\s/.test(v.name.value.trim()), t('e.name'));
    c.check('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.value.trim()), t('e.email'));
    c.check('phone', v.phone.value.replace(/[^\d]/g, '').length >= 6, t('e.phone'));
    c.check('consent', v.consent.checked, t('e.consent'));
    if (c.first) c.first.focus();
    return c.ok;
  }
  function saveForm() {
    var form = $('#bookForm');
    if (!form) return;
    ['name', 'email', 'phone', 'msg'].forEach(function (n) { state.form[n] = form.elements[n].value.trim(); });
    state.form.firma = form.elements.firma.checked;
  }

  /* ---------- Tisch anfragen ---------- */
  function openTable() {
    table.step = 1;
    renderTable();
    openModal($('#tableModal'));
  }
  function renderTable() {
    var body = $('#tableBody'), f = table.form;
    if (table.step === 2) {
      var d = parseYmd(f.date);
      body.innerHTML = '<div class="ok"><span class="ok__ico"><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg></span>' +
        '<h3 class="ok__title">' + esc(t('tok.title').replace('{name}', f.name.split(' ')[0])) + '</h3>' +
        '<p>' + esc(t('tok.text').replace('{persons}', personsLabel(+f.persons)).replace('{date}', fmtDate(d, true)).replace('{time}', f.time)) + '</p>' +
        '<p class="ok__demo">' + t('tok.demo') + '</p>' +
        '<button class="btn btn--dark" type="button" data-close>' + t('ok.close') + '</button></div>';
      typo(body);
      return;
    }
    var times = '';
    for (var m = 570; m <= 1290; m += 30) {
      if (m > 810 && m < 1050) continue; /* 9:30–13:30 und 17:30–21:30 */
      var v = ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + m % 60).slice(-2);
      times += '<option' + ((f.time || '12:00') === v ? ' selected' : '') + '>' + v + '</option>';
    }
    var pers = '';
    for (var p = 1; p <= 12; p++) pers += '<option' + (+(f.persons || 2) === p ? ' selected' : '') + '>' + p + '</option>';
    body.innerHTML = '<form class="form form--table" id="tableForm" novalidate>' +
      '<div class="form__row">' +
      '<div class="field"><label for="t-date">' + t('t.date') + ' *</label><input id="t-date" name="date" type="date" min="' + ymd(TODAY) +
      '" value="' + esc(f.date || '') + '" required aria-describedby="et-date"><p class="field__err" id="et-date" hidden></p></div>' +
      '<div class="field"><label for="t-time">' + t('t.time') + '</label><select id="t-time" name="time" aria-describedby="et-time">' + times + '</select><p class="field__err" id="et-time" hidden></p></div>' +
      '<div class="field"><label for="t-persons">' + t('t.persons') + '</label><select id="t-persons" name="persons">' + pers + '</select></div>' +
      '</div>' +
      field('t', f, 'name', 'text', t('t.name'), 'name', true) +
      field('t', f, 'phone', 'tel', t('t.phone'), 'tel', true) +
      checkbox('t', 'feier', t('t.feier'), table.feier) +
      field('t', f, 'msg', 'textarea', t('t.msg'), 'off', false) +
      '<p class="form__note">' + t('t.note') + '</p>' +
      '<div class="form__actions"><a class="link" href="tel:+4983817601">' + TEL + '</a>' +
      '<button class="btn btn--dark" type="submit">' + t('t.submit') + '</button></div></form>';
    typo(body);
  }
  function validateTable(form) {
    var c = checker(form, 't'), v = form.elements;
    var ds = v.date.value, d = ds ? parseYmd(ds) : null;
    var msg = !d || isNaN(+d) ? t('te.date') : d < TODAY ? t('te.past') : !HOURS[d.getDay()].length ? t('te.rest') : '';
    c.check('date', !msg, msg);
    var tm = v.time.value.split(':'), mins = +tm[0] * 60 + +tm[1];
    var okTime = !d || isNaN(+d) || !HOURS[d.getDay()].length || HOURS[d.getDay()].some(function (s) { return mins >= s[0] && mins < s[1]; });
    c.check('time', okTime, t('te.time'));
    c.check('name', v.name.value.trim().length >= 2, t('te.name'));
    c.check('phone', v.phone.value.replace(/[^\d]/g, '').length >= 6, t('te.phone'));
    if (c.first) c.first.focus();
    return c.ok;
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
      var Lf = window.L, pos = [47.62948, 9.90274];
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" ' +
        'href="https://www.openstreetmap.org/?mlat=47.62948&mlon=9.90274#map=15/47.62948/9.90274">' +
        t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(pos, 16);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      Lf.marker(pos).addTo(map).bindPopup('<b>Gasthof Hirsch</b><br>Lindauer Straße 1, Heimenkirch');
    };
    document.head.appendChild(js);
  }

  /* ---------- Menü und Kopfzeile ---------- */
  function toggleMenu(open) {
    var menu = $('#menu'), btn = $('#menuBtn');
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    $('use', btn).setAttribute('href', open ? '#i-close' : '#i-menu');
    document.body.classList.toggle('menu-open', open);
  }
  function onScroll() {
    $('#header').classList.toggle('is-scrolled', window.scrollY > 8);
  }

  /* ---------- Ereignisse ---------- */
  document.addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-lang]'))) { setLang(el.getAttribute('data-lang')); return; }
    if ((el = e.target.closest('[data-book]'))) { toggleMenu(false); openBooking(el.getAttribute('data-room')); return; }
    if ((el = e.target.closest('[data-table]'))) { toggleMenu(false); openTable(); return; }
    if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) { closeModals(); return; }
    if ((el = e.target.closest('[data-day]'))) { pickDay(el.getAttribute('data-day')); return; }
    if ((el = e.target.closest('[data-cal]'))) {
      state.month = new Date(state.month.getFullYear(), state.month.getMonth() + (+el.getAttribute('data-cal')), 1);
      renderCal();
      refocusIn('#bookBody', '[data-cal="' + el.getAttribute('data-cal') + '"]');
      return;
    }
    if (e.target.closest('[data-cal-reset]')) {
      state.from = state.to = null;
      renderCal(); renderRoomList(); typo($('#bookBody')); return;
    }
    if ((el = e.target.closest('[data-step]'))) {
      var d = +el.getAttribute('data-step');
      state.persons = Math.min(MAX_PERSONS, Math.max(1, state.persons + d));
      renderGuests(); renderRoomList(); typo($('#bookBody'));
      refocusIn('#bookBody', '[data-step="' + d + '"]');
      return;
    }
    if ((el = e.target.closest('[data-pick]'))) {
      state.room = roomById(el.getAttribute('data-pick'));
      state.step = 2; renderBook();
      var f = $('#f-name'); if (f) f.focus({ preventScroll: true });
      $('#bookModal').scrollTop = 0;
      return;
    }
    if (e.target.closest('[data-back]')) {
      saveForm(); state.step = 1; renderBook(); $('#bookModal').scrollTop = 0; return;
    }
    if (e.target.closest('#menuBtn')) { toggleMenu($('#menu').hidden); return; }
    if (e.target.closest('#menu a')) { toggleMenu(false); return; }
    if (e.target.closest('#mapLoad')) { loadMap(); return; }
  });

  document.addEventListener('submit', function (e) {
    if (e.target.id === 'bookForm') {
      e.preventDefault();
      if (!validate(e.target)) return;
      saveForm();
      state.step = 3;
      renderBook();
      $('#bookModal .modal__dialog').focus({ preventScroll: true });
      $('#bookModal').scrollTop = 0;
    }
    if (e.target.id === 'tableForm') {
      e.preventDefault();
      var v = e.target.elements;
      ['date', 'time', 'persons', 'name', 'phone', 'msg'].forEach(function (n) { table.form[n] = v[n].value.trim(); });
      table.feier = v.feier.checked;
      if (!validateTable(e.target)) return;
      table.step = 2;
      renderTable();
      $('#tableModal .modal__dialog').focus({ preventScroll: true });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if ($$('.modal').some(function (m) { return !m.hidden; })) closeModals();
      else if (!$('#menu').hidden) { toggleMenu(false); $('#menuBtn').focus(); }
    }
    trapFocus(e);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1100) toggleMenu(false); });

  /* ---------- Start ---------- */
  rememberGerman();
  var q = /[?&]lang=(de|en)\b/.exec(window.location.search);
  var saved = store('hirsch-lang');
  lang = q ? q[1] : (LANGS.indexOf(saved) >= 0 ? saved : 'de');
  if (q) store('hirsch-lang', lang);
  applyLang();
  onScroll();
})();
