/* Hotel Garni Alpenruh, Lenk — Beta-Vorschau. Ohne Backend: Verfügbarkeit und Buchung werden im Browser simuliert. */
(function () {
  'use strict';

  var D = window.ALPENRUH;
  var ROOMS = D.ROOMS;
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
      title: 'Hotel Garni Alpenruh · Lenk im Simmental · 90 m from the station, cable cars included in summer',
      desc: 'Family-run bed and breakfast in Lenk, Bernese Oberland: 16 rooms, 90 m from the railway station, Betelberg and ' +
        'Metsch cable cars included in summer. Rooms from CHF 60 per person with breakfast. 8.9/10 on Booking.com.'
    }
  };

  function rememberGerman() {
    $$('[data-i18n]').forEach(function (el) { el._de = el.innerHTML; });
    $$('[data-i18n-alt]').forEach(function (el) { el._deAlt = el.alt; });
    $$('[data-i18n-aria]').forEach(function (el) { el._deAria = el.getAttribute('aria-label'); });
  }

  function applyLang() {
    document.documentElement.lang = lang === 'de' ? 'de-CH' : 'en';
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
    if (!$('#bookModal').hidden) renderBook();
    if (!$('#roomModal').hidden && roomOpen) renderRoomModal();
    typo(document.body);
  }

  function setLang(l) {
    lang = l === 'en' ? 'en' : 'de';
    store('alpenruh-lang', lang);
    applyLang();
  }

  /* ---------- Typografie: kurze Wörter und Zahlen nicht am Zeilenende hängen lassen ---------- */
  var TYPO_WORDS = 'der|die|das|den|dem|des|ein|und|mit|von|vom|bis|für|auf|aus|bei|zum|zur|vor|als|wie|pro|' +
    'the|and|for|but|not|per';
  var TYPO_RE = new RegExp('(^|[\\s\\u00a0(„“"«])([A-Za-zÄÖÜäöü]{1,2}|' + TYPO_WORDS +
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
      var s = n.nodeValue, prev;
      var pass = 0;
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
    return new Intl.DateTimeFormat(lang === 'de' ? 'de-CH' : 'en-GB', o).format(d);
  }
  function fmtMoney(n) {
    var s = new Intl.NumberFormat('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
    return 'CHF\u00a0' + s;
  }
  var TODAY = (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();

  /* ---------- Saison laut alpenruh-lenk.ch/kontakt-buchen: Winter 12.12.2026–04.04.2027, Sommer 21.06.–17.10.2027.
     Ausserhalb der Saison ist das Haus geschlossen. ---------- */
  var OPEN = [['2026-12-12', '2027-04-04'], ['2027-06-21', '2027-10-17'], ['2027-12-11', '2028-04-09']];
  function inRange(d, a, b) { return d >= parseYmd(a) && d <= parseYmd(b); }
  function houseClosed(d) {
    for (var i = 0; i < OPEN.length; i++) if (inRange(d, OPEN[i][0], OPEN[i][1])) return false;
    return true;
  }

  /* ---------- Demo-Verfügbarkeit (deterministisch, ohne Backend) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function houseFull(d) { return houseClosed(d) || hash(Math.floor(dayIdx(d) / 5) + 37) % 17 === 0; }
  function roomBusy(room, d) {
    if (houseFull(d)) return true;
    var i = ROOMS.indexOf(room);
    return hash(Math.floor((dayIdx(d) + i * 3) / 6) + i * 97) % 7 < room.busy - 1;
  }
  function roomFree(room, from, to) {
    for (var d = from; d < to; d = addDays(d, 1)) if (roomBusy(room, d)) return false;
    return true;
  }
  function rangeHasFull(from, to) {
    for (var d = from; d < to; d = addDays(d, 1)) if (houseFull(d)) return true;
    return false;
  }
  function rangeHasClosed(from, to) {
    for (var d = from; d < to; d = addDays(d, 1)) if (houseClosed(d)) return true;
    return false;
  }

  /* ---------- Belegung und Preis (pro Person und Nacht, Kinder 7–12: −20 %, bis 6: −50 %) ---------- */
  var state = { from: null, to: null, adults: 2, kids7: 0, kids6: 0, prefer: null, room: null, step: 1, month: null, form: {} };

  function priceParts(room, from, to) {
    var nights = nightsBetween(from, to);
    var pA = room.from, pK7 = Math.round(room.from * 0.8 * 100) / 100, pK6 = Math.round(room.from * 0.5 * 100) / 100;
    var a = pA * state.adults * nights, k7 = pK7 * state.kids7 * nights, k6 = pK6 * state.kids6 * nights;
    return { nights: nights, pA: pA, pK7: pK7, pK6: pK6, a: a, k7: k7, k6: k6, total: a + k7 + k6 };
  }
  function guestsLabel() {
    var s = state.adults + '\u00a0' + (state.adults === 1 ? t('adult1') : t('adultN'));
    var k = state.kids7 + state.kids6;
    if (k) s += ', ' + k + '\u00a0' + (k === 1 ? t('kid1') : t('kidN'));
    return s;
  }
  function nightsLabel(n) { return n + '\u00a0' + (n === 1 ? t('night1') : t('nightN')); }

  /* ---------- Bilder ---------- */
  function pic(name, w, alt, cls, eager) {
    return '<picture' + (cls ? ' class="' + cls + '"' : '') + '>' +
      '<source type="image/webp" srcset="assets/img/' + name + '-' + w + '.webp">' +
      '<img src="assets/img/' + name + '-' + w + '.jpg" alt="' + esc(alt) + '"' +
      (eager ? '' : ' loading="lazy"') + '></picture>';
  }
  function roomPicWidth(name) { return /^(zimmer-sued|zimmer-nord|budget)$/.test(name) ? 800 : 600; }

  /* ---------- Modale Fenster ---------- */
  var lastFocus = null;
  function openModal(m) {
    $$('.modal').forEach(function (x) { if (x !== m) x.hidden = true; });
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
    roomOpen = null;
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

  /* ---------- Zimmerdetails ---------- */
  var roomOpen = null, galIdx = 0;
  function openRoom(id) {
    roomOpen = ROOMS.filter(function (r) { return r.id === id; })[0];
    galIdx = 0;
    renderRoomModal();
    openModal($('#roomModal'));
  }
  function renderRoomModal() {
    var r = roomOpen, l = L(r);
    var thumbs = r.imgs.map(function (n, i) {
      return '<button type="button" class="gal__thumb' + (i === galIdx ? ' is-active' : '') + '" data-gal="' + i +
        '" aria-label="' + t('room.photo') + ' ' + (i + 1) + '">' + pic(n, roomPicWidth(n) === 800 ? 800 : 600, '') + '</button>';
    }).join('');
    var main = r.imgs[galIdx], mw = roomPicWidth(main) === 800 ? (main === 'budget' ? 800 : 1400) : 600;
    $('#roomBody').innerHTML =
      '<div class="rd">' +
      '<div class="gal">' +
      '<div class="gal__main' + (main === 'budget' ? ' gal__main--tall' : '') + '">' + pic(main, mw, l.alts[galIdx], '', true) +
      '<button type="button" class="gal__nav gal__nav--prev" data-gal-step="-1" aria-label="' + t('gal.prev') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<button type="button" class="gal__nav gal__nav--next" data-gal-step="1" aria-label="' + t('gal.next') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
      '<span class="gal__count">' + (galIdx + 1) + ' / ' + r.imgs.length + '</span></div>' +
      '<div class="gal__thumbs">' + thumbs + '</div></div>' +
      '<div class="rd__info">' +
      '<h2 class="modal__title" id="roomTitle">' + esc(l.name) + '</h2>' +
      '<p>' + esc(l.text) + '</p>' +
      '<h3 class="rd__sub">' + t('room.equip') + '</h3>' +
      '<ul class="rd__equip">' + l.equip.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>' +
      '<p class="rd__price"><b>CHF\u00a0' + r.from + '–' + r.to + '</b> <span>' + t('room.priceNote') + '</span></p>' +
      '<button class="btn btn--primary" type="button" data-book data-room="' + r.id + '">' + t('room.bookThis') +
      '</button></div></div>';
    typo($('#roomBody'));
  }
  function galStep(n) {
    if (!roomOpen) return;
    galIdx = (galIdx + n + roomOpen.imgs.length) % roomOpen.imgs.length;
    renderRoomModal();
  }

  /* ---------- Buchung ---------- */
  function openBooking(preferId) {
    state.prefer = preferId || null;
    roomOpen = null;
    state.step = 1;
    state.room = null;
    if (!state.month) {
      var base = state.from || TODAY;
      if (!state.from && houseClosed(TODAY)) base = parseYmd(OPEN.filter(function (o) { return parseYmd(o[0]) > TODAY; })[0][0]);
      state.month = new Date(base.getFullYear(), base.getMonth(), 1);
    }
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
    var loc = lang === 'de' ? 'de-CH' : 'en-GB';
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
        var okAsEnd = state.from && !state.to && date > state.from && !rangeHasFull(state.from, date);
        if (!okAsEnd) dis = true;
        cls += houseClosed(date) ? ' is-closed' : ' is-busy';
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
      '</li><li class="lg-closed">' + t('cal.closed') + '</li><li class="lg-sel">' + t('cal.sel') + '</li></ul>';
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
    $('#guests').innerHTML = '<h3 class="bk__h">' + t('bk.guests') + '</h3>' +
      stepper('adults', state.adults, 1, 2, t('bk.adults')) +
      stepper('kids7', state.kids7, 0, 2, t('bk.kids7')) +
      stepper('kids6', state.kids6, 0, 2, t('bk.kids6')) +
      '<p class="guests__kids">' + t('bk.kidsNote') + '</p>';
  }

  function renderRoomList() {
    var box = $('#bkRooms');
    if (!box) return;
    var ready = state.from && state.to;
    var nights = ready ? nightsBetween(state.from, state.to) : 0;
    var list = ROOMS.slice().sort(function (a, b) {
      return (b.id === state.prefer) - (a.id === state.prefer);
    });
    var anyFree = false;
    var rows = list.map(function (r) {
      var l = L(r), free = ready && roomFree(r, state.from, state.to);
      if (free) anyFree = true;
      var right;
      if (!ready) right = '<p class="bkr__price"><b>CHF\u00a0' + r.from + '–' + r.to + '</b><span>' + t('pp') + '</span></p>';
      else if (!free) right = '<p class="bkr__state">' + t('bk.busy') + '</p>';
      else right = '<p class="bkr__price"><b>' + fmtMoney(priceParts(r, state.from, state.to).total) + '</b><span>' +
        t('bk.total') + ' · ' + nightsLabel(nights) + '</span></p>' +
        '<button class="btn btn--primary btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
      return '<li class="bkr' + (ready && !free ? ' is-off' : '') + '">' +
        pic(r.imgs[0], roomPicWidth(r.imgs[0]), '', 'bkr__img') +
        '<div class="bkr__info"><h4>' + esc(l.name) + '</h4><p>' + esc(l.short) + '</p></div>' +
        '<div class="bkr__right">' + right + '</div></li>';
    }).join('');
    var sub = ready
      ? fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + guestsLabel()
      : t('bk.pickDates');
    box.innerHTML = '<h3 class="bk__h">' + t('bk.rooms') + '</h3><p class="bk__sub">' + sub + '</p>' +
      '<ul class="bkr-list">' + rows + '</ul>' +
      (ready && !anyFree ? '<p class="bk__none" role="status">' + t(rangeHasClosed(state.from, state.to) ? 'bk.closed' : 'bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.incl') + '. ' + t('bk.range') + '</p>';
  }

  function line(label, n, p, sum) {
    return '<div><dt>' + label + ' · ' + t('bk.line').replace('{n}', n).replace('{p}', fmtMoney(p)) + '</dt><dd>' + fmtMoney(sum) + '</dd></div>';
  }
  function summaryHtml() {
    var r = state.room, p = priceParts(r, state.from, state.to);
    return '<aside class="sum"><h3 class="bk__h">' + t('bk.summary') + '</h3>' +
      pic(r.imgs[0], roomPicWidth(r.imgs[0]), '', 'sum__img') +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(L(r).name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' +
      nightsLabel(p.nights) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + guestsLabel() + '</dd></div>' +
      line(t('bk.adults'), state.adults + ' × ' + nightsLabel(p.nights), p.pA, p.a) +
      (state.kids7 ? line(t('bk.kids7'), state.kids7 + ' × ' + nightsLabel(p.nights), p.pK7, p.k7) : '') +
      (state.kids6 ? line(t('bk.kids6'), state.kids6 + ' × ' + nightsLabel(p.nights), p.pK6, p.k6) : '') +
      '<div class="sum__total"><dt>' + t('bk.price') + '</dt><dd>' + fmtMoney(p.total) + '</dd></div></dl>' +
      '<p class="bk__fine">' + t('bk.incl') + '. ' + t('bk.range') + '</p></aside>';
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
  function consentField() {
    return '<div class="field field--check"><input id="f-consent" name="consent" type="checkbox" aria-describedby="e-consent">' +
      '<label for="f-consent">' + t('f.consent') + '</label><p class="field__err" id="e-consent" hidden></p></div>';
  }
  function step2Html() {
    return '<div class="bk bk--form"><form class="form" id="bookForm" novalidate>' +
      field('name', 'text', t('f.name'), 'name', true) +
      field('email', 'email', t('f.email'), 'email', true) +
      field('phone', 'tel', t('f.phone'), 'tel', true) +
      field('arrival', 'text', t('f.arrival'), 'off', false) +
      field('msg', 'textarea', t('f.msg'), 'off', false) +
      consentField() +
      '<div class="form__actions"><button class="link" type="button" data-back>' + t('bk.back') + '</button>' +
      '<button class="btn btn--primary" type="submit">' + t('f.submit') + '</button></div></form>' +
      summaryHtml() + '</div>';
  }
  function step3Html() {
    var no = 'AR-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + state.adults) % 9000);
    return '<div class="ok"><span class="ok__ico"><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg></span>' +
      '<h3 class="ok__title">' + esc(t('ok.title').replace('{name}', state.form.name.split(' ')[0])) + '</h3>' +
      '<p>' + esc(t('ok.text').replace('{email}', state.form.email)) + '</p>' +
      '<p class="ok__no">' + t('ok.no') + ': <b>' + no + '</b></p>' + summaryHtml() +
      '<p class="ok__demo">' + t('ok.demo') + '</p>' +
      '<button class="btn btn--primary" type="button" data-close>' + t('ok.close') + '</button></div>';
  }

  function check(form, name, valid, msg, acc) {
    var el = form.elements[name], err = $('#e-' + name, form);
    err.hidden = valid;
    err.textContent = valid ? '' : msg;
    el.setAttribute('aria-invalid', valid ? 'false' : 'true');
    if (!valid) { acc.ok = false; if (!acc.first) acc.first = el; }
  }
  function validate(form) {
    var acc = { ok: true, first: null }, v = form.elements;
    check(form, 'name', v.name.value.trim().length >= 3 && /\s/.test(v.name.value.trim()), t('e.name'), acc);
    check(form, 'email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.value.trim()), t('e.email'), acc);
    check(form, 'phone', v.phone.value.replace(/[^\d]/g, '').length >= 6, t('e.phone'), acc);
    check(form, 'consent', v.consent.checked, t('e.consent'), acc);
    if (acc.first) acc.first.focus();
    return acc.ok;
  }

  /* ---------- Karte (erst nach Klick) ---------- */
  var POS = [46.4584507, 7.4427862];
  function loadMap() {
    var box = $('#map');
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'assets/vendor/leaflet/leaflet.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = 'assets/vendor/leaflet/leaflet.js';
    js.onload = function () {
      var Lf = window.L;
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" ' +
        'href="https://www.openstreetmap.org/?mlat=' + POS[0] + '&mlon=' + POS[1] + '#map=17/' + POS[0] + '/' + POS[1] + '">' +
        t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(POS, 16);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      Lf.marker(POS).addTo(map).bindPopup('<b>Hotel Garni Alpenruh</b><br>Gässli 2, 3775 Lenk').openPopup();
      Lf.marker([46.45797, 7.44373]).addTo(map).bindPopup('Bahnhof Lenk im Simmental');
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
  function onScroll() { $('#header').classList.toggle('is-solid', window.scrollY > 10); }

  /* ---------- Ereignisse ---------- */
  document.addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-lang]'))) { setLang(el.getAttribute('data-lang')); return; }
    if ((el = e.target.closest('[data-book]'))) {
      toggleMenu(false);
      openBooking(el.getAttribute('data-room'));
      return;
    }
    if ((el = e.target.closest('[data-room-open]'))) { openRoom(el.getAttribute('data-room-open')); return; }
    if ((el = e.target.closest('[data-gal]'))) { galIdx = +el.getAttribute('data-gal'); renderRoomModal(); return; }
    if ((el = e.target.closest('[data-gal-step]'))) { galStep(+el.getAttribute('data-gal-step')); return; }
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
      renderCal(); renderRoomList(); typo($('#bookBody')); return;
    }
    if ((el = e.target.closest('[data-step]'))) {
      var key = el.getAttribute('data-step'), d = +el.getAttribute('data-d');
      var lim = key === 'adults' ? [1, 2] : [0, 2];
      state[key] = Math.min(lim[1], Math.max(lim[0], state[key] + d));
      renderGuests(); renderRoomList(); typo($('#bookBody'));
      refocus('[data-step="' + key + '"][data-d="' + d + '"]');
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

  function saveForm() {
    var form = $('#bookForm');
    if (!form) return;
    ['name', 'email', 'phone', 'arrival', 'msg'].forEach(function (n) { state.form[n] = form.elements[n].value.trim(); });
  }

  document.addEventListener('submit', function (e) {
    if (e.target.id === 'bookForm') {
      e.preventDefault();
      if (!validate(e.target)) return;
      saveForm();
      state.step = 3;
      renderBook();
      $('#bookModal .modal__dialog').scrollTop = 0;
      $('#bookModal .modal__dialog').focus();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if ($$('.modal').some(function (m) { return !m.hidden; })) closeModals();
      else if (!$('#menu').hidden) { toggleMenu(false); $('#menuBtn').focus(); }
    }
    if (roomOpen && e.key === 'ArrowLeft') galStep(-1);
    if (roomOpen && e.key === 'ArrowRight') galStep(1);
    trapFocus(e);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1100) toggleMenu(false); });

  /* ---------- Start ---------- */
  rememberGerman();
  var q = /[?&]lang=(de|en)/.exec(window.location.search);
  lang = q ? q[1] : (store('alpenruh-lang') === 'en' ? 'en' : 'de');
  if (q) store('alpenruh-lang', lang);
  applyLang();
  onScroll();
})();
