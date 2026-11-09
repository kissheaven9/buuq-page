/* Gasthof Sonne — Beta-Vorschau. Ohne Backend: Verfügbarkeit und Buchung werden im Browser simuliert. */
(function () {
  'use strict';

  var D = window.SONNE;
  var ROOMS = D.ROOMS;
  var LANGS = ['de', 'it', 'en'];
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
  function loc() { return D.UI[lang].locale; }

  var META_DE = { title: document.title, desc: ($('meta[name="description"]') || {}).content };
  var NUM_SEL = '.hero__badge b, .trust__list strong, .score__num, .score__list dd, .badges b, .dishes b, ' +
    '.prices td:not([data-i18n])';

  function rememberGerman() {
    $$('[data-i18n]').forEach(function (el) { el._de = el.innerHTML; });
    $$('[data-i18n-alt]').forEach(function (el) { el._deAlt = el.alt; });
    $$('[data-i18n-aria]').forEach(function (el) { el._deAria = el.getAttribute('aria-label'); });
    $$(NUM_SEL).forEach(function (el) { el._num = el.innerHTML; });
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
    /* Dezimaltrennzeichen: Deutsch und Italienisch mit Komma, Englisch mit Punkt */
    $$(NUM_SEL).forEach(function (el) {
      el.innerHTML = lang === 'en' ? el._num.replace(/(\d),(\d)/g, '$1.$2') : el._num;
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
    renderWidgets();
    if (!$('#bookModal').hidden) renderBook();
    if (!$('#roomModal').hidden && roomOpen) renderRoomModal();
    typo(document.body);
  }

  function setLang(l) {
    lang = LANGS.indexOf(l) > -1 ? l : 'de';
    store('sonne-lang', lang);
    applyLang();
  }

  /* ---------- Typografie: kurze Wörter und Zahlen nicht am Zeilenende hängen lassen ---------- */
  var TYPO_WORDS = 'der|die|das|den|dem|des|ein|und|mit|von|vom|bis|für|auf|aus|bei|zum|zur|vor|als|wie|pro|' +
    'the|and|for|but|not|per|our|del|dal|nel|con|una|uno|gli|che|non|tra|fra|sul|dei|dai|per|più';
  var TYPO_RE = new RegExp('(^|[\\s\\u00a0(„“«"])([A-Za-zÄÖÜäöüßàèéìòù]{1,2}|' + TYPO_WORDS +
    '|\\d[\\d.,–]*)[ \\t\\n]+(?=\\S)', 'gi');
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
      /* Gedankenstrich und Mittelpunkt nicht an den Zeilenanfang */
      s = s.replace(/[ \t\n]+([–—·])(?=\s)/g, '\u00a0$1');
      if (s !== n.nodeValue) n.nodeValue = s;
    }
  }

  /* ---------- Datum und Geld ---------- */
  function pad2(n) { return ('0' + n).slice(-2); }
  function ymd(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function parseYmd(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function dayIdx(d) { return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); }
  function nightsBetween(a, b) { return dayIdx(b) - dayIdx(a); }
  function fmtDate(d, long) {
    var o = long ? { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }
      : { weekday: 'short', day: '2-digit', month: '2-digit' };
    return new Intl.DateTimeFormat(loc(), o).format(d);
  }
  function fmtMoney(n, cents) {
    return new Intl.NumberFormat(loc(), {
      style: 'currency', currency: 'EUR', minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0
    }).format(n);
  }
  var TODAY = (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();

  /* ---------- Demo-Verfügbarkeit (deterministisch, ohne Backend) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function closed(d) {
    var s = ymd(d);
    return D.CLOSED.some(function (r) { return s >= r[0] && s <= r[1]; });
  }
  function houseFull(d) { return closed(d) || hash(Math.floor(dayIdx(d) / 4) + 57) % 9 === 0; }
  function roomBusy(room, d) {
    if (houseFull(d)) return true;
    var i = ROOMS.indexOf(room);
    return hash(Math.floor((dayIdx(d) + i * 5) / 6) + i * 131) % 8 < room.busy;
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
  var state = {
    from: null, to: null, adults: 2, kids: [], board: 'bb', prefer: null, room: null, step: 1, month: null, form: {}
  };
  var MAX_GUESTS = 4;

  function isHigh(d) {
    var md = pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
    return D.SEASON_HIGH.some(function (r) { return md >= r[0] && md <= r[1]; });
  }
  function rateFor(room, d) { return room.rate[state.board][isHigh(d) ? 1 : 0]; }
  function isSingle() { return state.adults === 1 && !state.kids.length; }
  /* 'ok' | 'small' | 'noSingle' */
  function fitState(room) {
    if (state.adults + state.kids.length > room.max) return 'small';
    if (isSingle() && room.single === null) return 'noSingle';
    return 'ok';
  }
  /* Preis der Erwachsenen: Personenpreis je Nacht nach Saison, bei Einzelnutzung zuzüglich Aufpreis */
  function priceFor(room, from, to) {
    var sum = 0;
    for (var d = from; d < to; d = addDays(d, 1)) {
      sum += state.adults * rateFor(room, d) + (isSingle() ? room.single : 0);
    }
    return sum;
  }
  function rateRange(room, from, to) {
    var lo = Infinity, hi = 0;
    for (var d = from; d < to; d = addDays(d, 1)) { var r = rateFor(room, d); lo = Math.min(lo, r); hi = Math.max(hi, r); }
    if (lo === hi) return fmtMoney(lo);
    var a = fmtMoney(lo);
    return a.indexOf('€') === 0 ? a + '–' + hi : lo + '–' + fmtMoney(hi);
  }
  function taxFor(nights) {
    var payers = state.adults + state.kids.filter(function (a) { return a >= D.CITY_TAX_AGE; }).length;
    return payers * nights * D.CITY_TAX;
  }
  function adultsLabel() { return state.adults + '\u00a0' + (state.adults === 1 ? t('adult1') : t('adultN')); }
  function guestsLabel() {
    var k = state.kids.length;
    return k ? adultsLabel() + ', ' + k + '\u00a0' + (k === 1 ? t('kid1') : t('kidN')) : adultsLabel();
  }
  function nightsLabel(n) { return n + '\u00a0' + (n === 1 ? t('night1') : t('nightN')); }
  function boardLabel() { return t(state.board === 'hb' ? 'bk.hb' : 'bk.bb'); }

  /* ---------- Bilder ---------- */
  function pic(name, w, alt, cls, eager) {
    return '<picture' + (cls ? ' class="' + cls + '"' : '') + '>' +
      '<source type="image/webp" srcset="assets/img/' + name + '-' + w + '.webp">' +
      '<img src="assets/img/' + name + '-' + w + '.jpg" alt="' + esc(alt) + '" width="' + w + '" height="' +
      Math.round(w * 2 / 3) + '"' + (eager ? '' : ' loading="lazy"') + '></picture>';
  }

  /* ---------- Zimmerkarten ---------- */
  function equipList(r) {
    var list = t('room.equipList').slice();
    if (r.id === 'su') list.unshift(t('room.equipSu'));
    return list;
  }
  function renderRooms() {
    $('#rooms').innerHTML = ROOMS.map(function (r) {
      var l = L(r);
      return '<article class="room">' +
        '<button class="room__img" type="button" data-room-open="' + r.id + '" aria-label="' +
        esc(t('room.details') + ': ' + l.name) + '">' + pic(r.imgs[0], 800, l.alts[0]) + '</button>' +
        '<div class="room__body">' +
        '<p class="room__meta">' + t('approx') + ' ' + r.size + ' m² · ' + esc(l.cap) + '</p>' +
        '<h3>' + esc(l.name) + '</h3>' +
        '<p class="room__text">' + esc(l.short) + '</p>' +
        '<ul class="chips">' + equipList(r).slice(0, 4).map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>' +
        '<p class="room__price">' + t('room.from') + ' <b>' + fmtMoney(r.rate.bb[0]) + '</b> <span>' +
        t('room.pp') + ' · ' + t('room.bb') + '</span></p>' +
        '<p class="room__price2">' + t('room.hb') + ' ' + t('room.from') + ' ' + fmtMoney(r.rate.hb[0]) + '</p>' +
        '<div class="room__actions">' +
        '<button class="btn btn--primary" type="button" data-book data-room="' + r.id + '">' + t('room.book') + '</button>' +
        '<button class="link" type="button" data-room-open="' + r.id + '">' + t('room.details') + '</button>' +
        '</div></div></article>';
    }).join('');
  }

  /* ---------- Buchungskarte ---------- */
  function renderWidgets() {
    var html =
      '<p class="bcard__title">' + t('bw.title') + '</p>' +
      '<button class="bcard__field" type="button" data-book><span class="bcard__label">' + t('bw.in') + '</span>' +
      '<span class="bcard__value' + (state.from ? '' : ' is-empty') + '">' +
      (state.from ? fmtDate(state.from, true) : t('bw.pick')) + '</span></button>' +
      '<button class="bcard__field" type="button" data-book><span class="bcard__label">' + t('bw.out') + '</span>' +
      '<span class="bcard__value' + (state.to ? '' : ' is-empty') + '">' +
      (state.to ? fmtDate(state.to, true) : t('bw.pick')) + '</span></button>' +
      '<button class="bcard__field bcard__field--wide" type="button" data-book><span class="bcard__label">' +
      t('bw.guests') + '</span><span class="bcard__value">' + guestsLabel() + ' · ' + boardLabel() + '</span></button>' +
      '<button class="btn btn--primary bcard__btn" type="button" data-book>' + t('bw.btn') + '</button>' +
      '<p class="bcard__note">' + t('bw.note') + '</p>';
    $$('[data-bw]').forEach(function (el) { el.innerHTML = html; typo(el); });
  }

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
        '" aria-label="' + t('room.photo') + ' ' + (i + 1) + '">' + pic(n, 800, '') + '</button>';
    }).join('');
    $('#roomBody').innerHTML =
      '<div class="rd">' +
      '<div class="gal">' +
      '<div class="gal__main">' + pic(r.imgs[galIdx], 1440, l.alts[galIdx], '', true) +
      '<button type="button" class="gal__nav gal__nav--prev" data-gal-step="-1" aria-label="' + t('gal.prev') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<button type="button" class="gal__nav gal__nav--next" data-gal-step="1" aria-label="' + t('gal.next') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
      '<span class="gal__count">' + (galIdx + 1) + ' / ' + r.imgs.length + '</span></div>' +
      '<div class="gal__thumbs">' + thumbs + '</div></div>' +
      '<div class="rd__info">' +
      '<p class="pretitle">' + t('approx') + ' ' + r.size + ' m² · ' + esc(l.cap) + '</p>' +
      '<h2 class="modal__title" id="roomTitle">' + esc(l.name) + '</h2>' +
      '<p>' + esc(l.text) + '</p>' +
      '<p class="bk__h">' + t('room.equip') + '</p>' +
      '<ul class="rd__equip">' + equipList(r).map(function (e) {
        return '<li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>' + esc(e) + '</li>';
      }).join('') + '</ul>' +
      '<p class="room__price">' + t('room.from') + ' <b>' + fmtMoney(r.rate.bb[0]) + '</b> <span>' + t('room.pp') +
      ' · ' + t('room.bb') + '</span></p>' +
      '<p class="room__price2">' + t('room.hb') + ' ' + t('room.from') + ' ' + fmtMoney(r.rate.hb[0]) + '</p>' +
      '<p class="rd__note">' + t('room.priceNote') + '</p>' +
      '<button class="btn btn--primary" type="button" data-book data-room="' + r.id + '">' + t('room.bookThis') +
      '</button></div></div>';
    typo($('#roomBody'));
  }
  function galStep(n) {
    if (!roomOpen) return;
    galIdx = (galIdx + n + roomOpen.imgs.length) % roomOpen.imgs.length;
    renderRoomModal();
    refocusIn($('#roomBody'), '[data-gal-step="' + n + '"]');
  }

  /* ---------- Buchung ---------- */
  function openBooking(preferId) {
    state.prefer = preferId || null;
    roomOpen = null;
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
      body.innerHTML = '<div class="bk"><div class="cal" id="cal"></div>' +
        '<div class="bk__block" id="guests"></div><div class="bk__block" id="board"></div>' +
        '<div class="bk__actions bk__actions--bar" id="step1Actions"></div></div>';
      renderCal(); renderGuests(); renderBoard(); renderStep1Actions();
    } else if (state.step === 2) {
      body.innerHTML = '<div class="bk" id="bkRooms"></div>';
      renderRoomList();
    } else if (state.step === 3) {
      body.innerHTML = step3Html();
    } else {
      body.innerHTML = step4Html();
    }
    typo(body);
  }

  function renderCal() {
    var m = state.month, y = m.getFullYear(), mo = m.getMonth();
    var title = new Intl.DateTimeFormat(loc(), { month: 'long', year: 'numeric' }).format(m);
    var minMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    var maxMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 12, 1);
    var wd = [];
    for (var i = 0; i < 7; i++) {
      wd.push('<span>' + new Intl.DateTimeFormat(loc(), { weekday: 'short' }).format(new Date(2024, 0, 1 + i)).slice(0, 2) +
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
    renderCal(); renderStep1Actions(); renderWidgets();
    typo($('#bookBody'));
    refocusIn($('#bookBody'), '[data-day="' + s + '"]');
  }

  /* nach dem Neuzeichnen den Fokus auf dem gleichen Bedienelement halten (Tastatur) */
  function refocusIn(root, sel) {
    var el = $(sel, root);
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
      for (var a = 0; a <= 17; a++) opts += '<option value="' + a + '"' + (a === age ? ' selected' : '') + '>' + a + '</option>';
      return '<label class="age"><span>' + t('bk.age') + ' ' + (i + 1) + '</span><select data-age="' + i + '">' + opts +
        '</select></label>';
    }).join('');
    $('#guests').innerHTML = '<p class="bk__h">' + t('bk.guests') + '</p>' +
      stepper('adults', state.adults, 1, MAX_GUESTS - state.kids.length, t('bk.adults')) +
      stepper('kids', state.kids.length, 0, Math.min(3, MAX_GUESTS - state.adults), t('bk.kids')) +
      (ages ? '<div class="ages">' + ages + '</div>' : '');
  }
  function renderBoard() {
    function opt(key) {
      return '<button type="button" role="radio" data-board="' + key + '" aria-checked="' +
        (state.board === key ? 'true' : 'false') + '"><b>' + t('bk.' + key) + '</b><span>' + t('bk.' + key + 'Hint') +
        '</span></button>';
    }
    $('#board').innerHTML = '<p class="bk__h" id="boardLabel">' + t('bk.board') + '</p>' +
      '<div class="seg" role="radiogroup" aria-labelledby="boardLabel">' + opt('bb') + opt('hb') + '</div>';
  }
  function renderStep1Actions() {
    var box = $('#step1Actions');
    if (!box) return;
    box.innerHTML = '<button class="btn btn--primary" type="button" data-to-rooms' +
      (state.from && state.to ? '' : ' disabled') + '>' + t('bk.toRooms') + '</button>';
  }

  function staySub() {
    var nights = nightsBetween(state.from, state.to);
    return fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + guestsLabel() +
      ' · ' + boardLabel();
  }

  function renderRoomList() {
    var box = $('#bkRooms');
    if (!box) return;
    var nights = nightsBetween(state.from, state.to);
    var list = ROOMS.slice().sort(function (a, b) {
      return (b.id === state.prefer) - (a.id === state.prefer);
    });
    var anyFree = false;
    var rows = list.map(function (r) {
      var l = L(r), fit = fitState(r), free = fit === 'ok' && roomFree(r, state.from, state.to);
      if (free) anyFree = true;
      var bottom;
      if (fit === 'small') bottom = '<p class="bkr__state">' + t('bk.small') + '</p>';
      else if (fit === 'noSingle') bottom = '<p class="bkr__state">' + t('bk.noSingle') + '</p>';
      else if (!free) bottom = '<p class="bkr__state">' + t('bk.busy') + '</p>';
      else bottom = '<p class="bkr__price"><b>' + fmtMoney(priceFor(r, state.from, state.to)) + '</b><span>' +
        t('bk.total') + ' · ' + rateRange(r, state.from, state.to) + ' ' + t('bk.perNight') + '</span></p>' +
        '<button class="btn btn--primary btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
      return '<li class="bkr' + (free ? '' : ' is-off') + '">' +
        '<div class="bkr__top">' + pic(r.imgs[0], 800, '', 'bkr__img') +
        '<div class="bkr__info"><h3>' + esc(l.name) + '</h3><p>' + t('approx') + ' ' + r.size + ' m² · ' + esc(l.cap) + '</p><p>' +
        esc(l.short) + '</p></div></div>' +
        '<div class="bkr__bottom">' + bottom + '</div></li>';
    }).join('');
    box.innerHTML = '<div><p class="bk__h">' + t('bk.rooms') + '</p><p class="bk__sub">' + staySub() + '</p>' +
      '<ul class="bkr-list">' + rows + '</ul>' +
      (!anyFree ? '<p class="bk__none" role="status">' + t('bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + fineHtml(nights, !anyFree) + '</p></div>' +
      '<div class="bk__actions"><button class="link" type="button" data-back>' + t('bk.back') + '</button></div>';
  }

  function fineHtml(nights, noSingle) {
    var parts = [];
    if (isSingle() && !noSingle) parts.push(t('bk.single').charAt(0).toUpperCase() + t('bk.single').slice(1) + '.');
    if (state.kids.length) parts.push(t('bk.kidsNote').replace('{n}', adultsLabel()));
    parts.push(t('bk.incl'));
    parts.push(t('bk.tax') + ': ' + fmtMoney(taxFor(nights), true) + '.');
    parts.push(t('bk.cancel'));
    parts.push(t('bk.season'));
    return parts.join(' ');
  }

  function summaryHtml() {
    var r = state.room, nights = nightsBetween(state.from, state.to);
    return '<aside class="sum"><p class="bk__h">' + t('bk.summary') + '</p>' +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(L(r).name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' +
      nightsLabel(nights) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + guestsLabel() + '</dd></div>' +
      '<div><dt>' + t('bk.boardT') + '</dt><dd>' + boardLabel() + '</dd></div>' +
      '<div class="sum__total"><dt>' + t(state.kids.length ? 'bk.priceAdults' : 'bk.price') + '</dt><dd>' +
      fmtMoney(priceFor(r, state.from, state.to)) + '</dd></div></dl>' +
      '<p class="bk__fine">' + fineHtml(nights) + '</p></aside>';
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
  function step3Html() {
    return '<div class="bk">' + summaryHtml() + '<form class="form" id="bookForm" novalidate>' +
      field('name', 'text', t('f.name'), 'name', true) +
      field('email', 'email', t('f.email'), 'email', true) +
      field('phone', 'tel', t('f.phone'), 'tel', true) +
      field('msg', 'textarea', t('f.msg'), 'off', false) +
      '<div class="field field--check"><input id="f-consent" name="consent" type="checkbox" aria-describedby="e-consent">' +
      '<label for="f-consent">' + t('f.consent') + '</label><p class="field__err" id="e-consent" hidden></p></div>' +
      '<div class="bk__actions"><button class="link" type="button" data-back>' + t('bk.back') + '</button>' +
      '<button class="btn btn--primary" type="submit">' + t('f.submit') + '</button></div></form></div>';
  }
  function step4Html() {
    var no = 'SO-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + state.adults) % 9000);
    return '<div class="ok"><span class="ok__ico"><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg></span>' +
      '<h3 class="ok__title">' + esc(t('ok.title').replace('{name}', state.form.name.split(' ')[0])) + '</h3>' +
      '<p>' + esc(t('ok.text').replace('{email}', state.form.email)) + '</p>' +
      '<p class="ok__no">' + t('ok.no') + ': <b>' + no + '</b></p>' + summaryHtml() +
      '<p class="ok__demo">' + t('ok.demo') + '</p>' +
      '<button class="btn btn--primary" type="button" data-close>' + t('ok.close') + '</button></div>';
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
  function scrollBookTop() {
    var dlg = $('#bookModal .modal__dialog');
    dlg.scrollTop = 0;
    return dlg;
  }

  /* ---------- Karte (erst nach Einwilligung) ---------- */
  function loadMap() {
    var box = $('#map');
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'assets/vendor/leaflet/leaflet.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = 'assets/vendor/leaflet/leaflet.js';
    js.onload = function () {
      var Lf = window.L, pos = [46.66624, 11.36482];
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" ' +
        'href="https://www.openstreetmap.org/?mlat=46.66624&mlon=11.36482#map=14/46.66624/11.36482">' +
        t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(pos, 12);
      map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>');
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      Lf.marker(pos).addTo(map).bindPopup('<b>Gasthof Sonne</b><br>' + esc(t('map.popup')));
    };
    document.head.appendChild(js);
  }

  /* ---------- Menü, Kopfzeile, Band ---------- */
  function toggleMenu(open) {
    var menu = $('#menu'), btn = $('#menuBtn');
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    $('use', btn).setAttribute('href', open ? '#i-close' : '#i-menu');
    document.body.classList.toggle('menu-open', open);
  }
  function onScroll() { $('#header').classList.toggle('is-solid', window.scrollY > 8); }
  function ribbonStep(dir) {
    var rib = $('#ribbon'), card = $('.place', rib);
    var step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(rib).columnGap || 16);
    rib.scrollBy({ left: dir * step * (window.innerWidth >= 900 ? 2 : 1), behavior: 'smooth' });
  }

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
    if ((el = e.target.closest('[data-gal]'))) {
      galIdx = +el.getAttribute('data-gal'); renderRoomModal();
      refocusIn($('#roomBody'), '[data-gal="' + galIdx + '"]');
      return;
    }
    if ((el = e.target.closest('[data-gal-step]'))) { galStep(+el.getAttribute('data-gal-step')); return; }
    if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) { closeModals(); return; }
    if ((el = e.target.closest('[data-day]'))) { pickDay(el.getAttribute('data-day')); return; }
    if ((el = e.target.closest('[data-cal]'))) {
      state.month = new Date(state.month.getFullYear(), state.month.getMonth() + (+el.getAttribute('data-cal')), 1);
      renderCal(); typo($('#cal'));
      refocusIn($('#bookBody'), '[data-cal="' + el.getAttribute('data-cal') + '"]');
      return;
    }
    if (e.target.closest('[data-cal-reset]')) {
      state.from = state.to = null;
      renderCal(); renderStep1Actions(); renderWidgets(); typo($('#bookBody')); return;
    }
    if ((el = e.target.closest('[data-step]'))) {
      var d = +el.getAttribute('data-d');
      var total = state.adults + state.kids.length;
      if (el.getAttribute('data-step') === 'adults') {
        state.adults = Math.min(MAX_GUESTS - state.kids.length, Math.max(1, state.adults + d));
      } else if (d > 0 && total < MAX_GUESTS && state.kids.length < 3) state.kids.push(8);
      else if (d < 0) state.kids.pop();
      renderGuests(); renderWidgets(); typo($('#bookBody'));
      refocusIn($('#bookBody'), '[data-step="' + el.getAttribute('data-step') + '"][data-d="' + d + '"]');
      return;
    }
    if ((el = e.target.closest('[data-board]'))) {
      state.board = el.getAttribute('data-board') === 'hb' ? 'hb' : 'bb';
      renderBoard(); renderWidgets(); typo($('#bookBody'));
      refocusIn($('#bookBody'), '[data-board="' + state.board + '"]');
      return;
    }
    if (e.target.closest('[data-to-rooms]')) {
      if (!state.from || !state.to) return;
      state.step = 2; renderBook(); scrollBookTop().focus();
      return;
    }
    if ((el = e.target.closest('[data-pick]'))) {
      state.room = ROOMS.filter(function (r) { return r.id === el.getAttribute('data-pick'); })[0];
      state.step = 3; renderBook(); scrollBookTop();
      var f = $('#f-name'); if (f) f.focus();
      return;
    }
    if (e.target.closest('[data-back]')) {
      saveForm(); state.step = Math.max(1, state.step - 1); renderBook(); scrollBookTop().focus(); return;
    }
    if ((el = e.target.closest('[data-ribbon]'))) { ribbonStep(+el.getAttribute('data-ribbon')); return; }
    if (e.target.closest('#menuBtn')) { toggleMenu($('#menu').hidden); return; }
    if (e.target.closest('#menu a')) { toggleMenu(false); return; }
    if (e.target.closest('#mapLoad')) { loadMap(); return; }
  });

  document.addEventListener('change', function (e) {
    var el = e.target.closest('[data-age]');
    if (!el) return;
    state.kids[+el.getAttribute('data-age')] = +el.value;
  });

  document.addEventListener('submit', function (e) {
    if (e.target.id !== 'bookForm') return;
    e.preventDefault();
    if (!validate(e.target)) return;
    saveForm();
    state.step = 4;
    renderBook();
    scrollBookTop().focus();
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
  window.addEventListener('resize', function () { if (window.innerWidth >= 1180) toggleMenu(false); });

  /* ---------- Start ---------- */
  rememberGerman();
  var q = /[?&]lang=(de|it|en)/.exec(window.location.search);
  var saved = store('sonne-lang');
  lang = q ? q[1] : (LANGS.indexOf(saved) > -1 ? saved : 'de');
  if (q) store('sonne-lang', lang);
  applyLang();
  onScroll();
})();
