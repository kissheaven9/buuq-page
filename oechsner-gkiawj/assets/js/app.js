/* Pension Oechsner — Beta-Vorschau. Ohne Backend: Verfügbarkeit und Buchung werden im Browser simuliert. */
(function () {
  'use strict';

  var D = window.OECHSNER;
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
      title: 'Pension Oechsner · Rooms on Lake Thumsee, Bad Reichenhall',
      desc: 'Family-run guesthouse just above Lake Thumsee near Bad Reichenhall: 12 rooms with breakfast buffet, ' +
        'sunbathing lawn, own horses. Location 9.5/10 on Booking.com. Book direct from €63.60 per night.'
    }
  };

  function rememberGerman() {
    $$('[data-i18n]').forEach(function (el) { el._de = el.innerHTML; });
    $$('[data-i18n-alt]').forEach(function (el) { el._deAlt = el.alt; });
    $$('[data-i18n-aria]').forEach(function (el) { el._deAria = el.getAttribute('aria-label'); });
    $$('.voice').forEach(function (el) { el._deLang = el.getAttribute('lang'); });
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
    $$('.voice').forEach(function (el) { el.setAttribute('lang', lang === 'de' ? el._deLang : 'en'); });
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
    if (!$('#roomModal').hidden && roomOpen) renderRoomModal();
    typo(document.body);
  }

  function setLang(l) {
    lang = l === 'en' ? 'en' : 'de';
    store('oechsner-lang', lang);
    applyLang();
  }

  /* ---------- Typografie: kurze Wörter und Zahlen nicht am Zeilenende hängen lassen ---------- */
  var TYPO_WORDS = 'der|die|das|den|dem|des|ein|und|mit|von|vom|bis|für|auf|aus|bei|zum|zur|vor|als|wie|pro|' +
    'the|and|for|but|not|per';
  var TYPO_RE = new RegExp('(^|[\\s\\u00a0(„“"])([A-Za-zÄÖÜäöüß]{1,2}|' + TYPO_WORDS +
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
    return new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', o).format(d);
  }
  function fmtMoney(n) {
    return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
      style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2
    }).format(n);
  }
  var TODAY = (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();

  /* ---------- Demo-Verfügbarkeit (deterministisch, ohne Backend) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function houseFull(d) { return hash(Math.floor(dayIdx(d) / 4) + 37) % 10 === 0; }
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

  /* ---------- Belegung und Preis (Preisliste des Hauses) ---------- */
  var state = { from: null, to: null, adults: 2, kids: [], pet: false, prefer: null, room: null, step: 1, month: null, form: {} };

  function persons() { return state.adults + state.kids.length; }
  function fits(room) { var p = persons(); return p >= room.minP && p <= room.maxP; }
  /* Preis einer Nacht: Jahr der Nacht entscheidet über 2026/2027, Einzelnutzung des Balkonzimmers nach Saison */
  function nightPrice(room, d, p) {
    var y27 = d.getFullYear() >= 2027;
    if (room.id === 'dzb' && p === 1) { var m = d.getMonth() + 1; return m >= 6 && m <= 9 ? room.singleSummer : room.single; }
    return y27 ? room.price27 : room.price;
  }
  function calc(room, from, to, p, pet) {
    var nights = nightsBetween(from, to), roomSum = 0, shortSum = 0, petSum = 0;
    for (var d = from; d < to; d = addDays(d, 1)) {
      var y27 = d.getFullYear() >= 2027;
      roomSum += nightPrice(room, d, p);
      if (nights <= 2) shortSum += p * (y27 ? 5 : 3);
      if (pet) petSum += y27 ? 8 : 4;
    }
    return { nights: nights, room: roomSum, short: shortSum, pet: petSum, total: roomSum + shortSum + petSum };
  }
  function priceFor(room) { return calc(room, state.from, state.to, persons(), state.pet).total; }
  function guestsLabel() {
    var a = state.adults + '\u00a0' + (state.adults === 1 ? t('adult1') : t('adultN'));
    var k = state.kids.length;
    var s = k ? a + ', ' + k + '\u00a0' + (k === 1 ? t('kid1') : t('kidN')) : a;
    return state.pet ? s + ', ' + t('pet') : s;
  }
  function nightsLabel(n) { return n + '\u00a0' + (n === 1 ? t('night1') : t('nightN')); }

  /* ---------- Bilder ---------- */
  var W = { 'zimmer-balkon': [800, 1400], 'balkon': [800, 1400], 'zimmer-balkon-2': [800, 1400], 'bad': [800, 1400],
    'zimmer-doppel': [800, 1400], 'zimmer-doppel-2': [800, 1400], 'zimmer-einzel': [800, 1400],
    'zimmer-einzel-2': [800, 1400], 'bad-2': [800, 1400] };
  function pic(name, big, alt, cls, eager) {
    var w = W[name][big ? 1 : 0];
    return '<picture' + (cls ? ' class="' + cls + '"' : '') + '>' +
      '<source type="image/webp" srcset="assets/img/' + name + '-' + w + '.webp">' +
      '<img src="assets/img/' + name + '-' + w + '.jpg" alt="' + esc(alt) + '"' +
      (eager ? '' : ' loading="lazy"') + '></picture>';
  }

  /* ---------- Zimmerliste ---------- */
  function renderRooms() {
    $('#rooms').innerHTML = ROOMS.map(function (r) {
      var l = L(r);
      return '<li class="room">' +
        '<button class="room__img" type="button" data-room-open="' + r.id + '" aria-label="' +
        esc(t('room.details') + ': ' + l.name) + '">' + pic(r.imgs[0], false, l.alts[0]) + '</button>' +
        '<div class="room__body">' +
        '<h3>' + esc(l.name) + '</h3>' +
        '<p class="room__meta">' + r.size + '\u00a0' + t('room.m2') + ' · ' + esc(l.cap) + '</p>' +
        '<p class="room__text">' + esc(l.short) + '</p>' +
        '<div class="room__foot">' +
        '<p class="room__price"><b>' + fmtMoney(r.price) + '</b><span>' + t('room.pn') + '</span></p>' +
        '<div class="room__actions">' +
        '<button class="link" type="button" data-room-open="' + r.id + '">' + t('room.details') + '</button>' +
        '<button class="btn btn--primary" type="button" data-book data-room="' + r.id + '">' + t('room.book') + '</button>' +
        '</div></div></div></li>';
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
        '" aria-label="' + t('room.photo') + ' ' + (i + 1) + '">' + pic(n, false, '') + '</button>';
    }).join('');
    $('#roomBody').innerHTML =
      '<div class="rd">' +
      '<div class="gal">' +
      '<div class="gal__main">' + pic(r.imgs[galIdx], true, l.alts[galIdx], '', true) +
      '<button type="button" class="gal__nav gal__nav--prev" data-gal-step="-1" aria-label="' + t('gal.prev') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<button type="button" class="gal__nav gal__nav--next" data-gal-step="1" aria-label="' + t('gal.next') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
      '<span class="gal__count">' + (galIdx + 1) + ' / ' + r.imgs.length + '</span></div>' +
      '<div class="gal__thumbs">' + thumbs + '</div></div>' +
      '<div class="rd__info">' +
      '<p class="rd__meta">' + r.size + '\u00a0' + t('room.m2') + ' · ' + esc(l.cap) + '</p>' +
      '<h2 class="modal__title" id="roomTitle">' + esc(l.name) + '</h2>' +
      '<p>' + esc(l.text) + '</p>' +
      '<h3 class="rd__sub">' + t('room.equip') + '</h3>' +
      '<ul class="rd__equip">' + t('room.equipList').map(function (e) {
        return '<li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>' + esc(e) + '</li>';
      }).join('') + '</ul>' +
      '<p class="room__price"><b>' + fmtMoney(r.price) + '</b><span>' + t('room.pn') + '</span></p>' +
      '<p class="rd__note">' + t('room.priceNote') + '</p>' +
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
    var loc = lang === 'de' ? 'de-DE' : 'en-GB';
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
      return '<label class="age"><span>' + t('bk.age') + ' ' + (i + 1) + '</span> <select data-age="' + i + '">' + opts +
        '</select></label>';
    }).join('');
    $('#guests').innerHTML = '<h3 class="bk__h">' + t('bk.guests') + '</h3>' +
      stepper('adults', state.adults, 1, 2, t('bk.adults')) +
      stepper('kids', state.kids.length, 0, state.adults === 1 ? 1 : 0, t('bk.kids')) +
      (ages ? '<div class="ages">' + ages + '</div><p class="bk__fine">' + t('bk.kidNote') + '</p>' : '') +
      '<label class="pet"><input type="checkbox" id="petBox"' + (state.pet ? ' checked' : '') + '><span>' + t('bk.pet') + '</span></label>';
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
      var l = L(r), ok = fits(r), free = ready && ok && roomFree(r, state.from, state.to);
      if (free) anyFree = true;
      var right;
      if (!ok) right = '<p class="bkr__state">' + (r.id === 'dz' && persons() === 1 ? t('bk.ask') : t('bk.small')) + '</p>';
      else if (!ready) right = '<p class="bkr__price"><b>' + fmtMoney(r.price) + '</b><span>' + t('room.pn') + '</span></p>';
      else if (!free) right = '<p class="bkr__state">' + t('bk.busy') + '</p>';
      else right = '<p class="bkr__price"><b>' + fmtMoney(priceFor(r)) + '</b><span>' +
        t('bk.total') + ' · ' + nightsLabel(nights) + '</span></p>' +
        '<button class="btn btn--primary btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
      return '<li class="bkr' + (ready && ok && !free || !ok ? ' is-off' : '') + '">' +
        pic(r.imgs[0], false, '', 'bkr__img') +
        '<div class="bkr__info"><h4>' + esc(l.name) + '</h4><p>' + r.size + '\u00a0' + t('room.m2') + ' · ' + esc(l.cap) + '</p></div>' +
        '<div class="bkr__right">' + right + '</div></li>';
    }).join('');
    var sub = ready
      ? fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + guestsLabel()
      : t('bk.pickDates');
    box.innerHTML = '<h3 class="bk__h">' + t('bk.rooms') + '</h3><p class="bk__sub">' + sub + '</p>' +
      '<ul class="bkr-list">' + rows + '</ul>' +
      (ready && !anyFree ? '<p class="bk__none" role="status">' + t('bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.incl') + ' ' + t('bk.short') + '</p>';
  }

  function summaryHtml() {
    var r = state.room, c = calc(r, state.from, state.to, persons(), state.pet);
    var parts = [t('bk.calcRoom') + ' ' + fmtMoney(c.room)];
    if (c.short) parts.push(t('bk.calcShort') + ' ' + fmtMoney(c.short));
    if (c.pet) parts.push(t('bk.calcPet') + ' ' + fmtMoney(c.pet));
    return '<aside class="sum"><h3 class="bk__h">' + t('bk.summary') + '</h3>' +
      pic(r.imgs[0], false, '', 'sum__img') +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(L(r).name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' +
      nightsLabel(c.nights) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + guestsLabel() + '</dd></div>' +
      '<div class="sum__total"><dt>' + t('bk.price') + '</dt><dd>' + fmtMoney(c.total) + '</dd></div></dl>' +
      '<p class="sum__calc">' + parts.join(' + ') + '</p>' +
      '<p class="bk__fine">' + t('bk.incl') + ' ' + t('bk.pay') + '</p></aside>';
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
    var no = 'OE-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + persons()) % 9000);
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

  /* ---------- Karte (erst nach Einwilligung) ---------- */
  function loadMap() {
    var box = $('#map');
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'assets/vendor/leaflet/leaflet.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = 'assets/vendor/leaflet/leaflet.js';
    js.onload = function () {
      var Lf = window.L, pos = [47.72142, 12.83154];
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" ' +
        'href="https://www.openstreetmap.org/?mlat=47.72142&mlon=12.83154#map=15/47.72142/12.83154">' +
        t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(pos, 14);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      Lf.marker(pos).addTo(map).bindPopup('<b>Pension Oechsner</b><br>Thumsee 7, Bad Reichenhall');
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
    $('#header').classList.toggle('is-solid', open || window.scrollY > 40);
  }
  function onScroll() {
    if (document.body.classList.contains('menu-open')) return;
    $('#header').classList.toggle('is-solid', window.scrollY > 40);
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
      renderCal(); renderRoomList(); renderWidgets(); typo($('#bookBody')); return;
    }
    if ((el = e.target.closest('[data-step]'))) {
      var d = +el.getAttribute('data-d');
      if (el.getAttribute('data-step') === 'adults') {
        state.adults = Math.min(2, Math.max(1, state.adults + d));
        if (state.adults === 2) state.kids = [];
      } else if (d > 0 && state.kids.length < 1 && state.adults === 1) state.kids.push(8);
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

  function saveForm() {
    var form = $('#bookForm');
    if (!form) return;
    ['name', 'email', 'phone', 'msg'].forEach(function (n) { state.form[n] = form.elements[n].value.trim(); });
  }

  document.addEventListener('change', function (e) {
    var el = e.target.closest('[data-age]');
    if (el) { state.kids[+el.getAttribute('data-age')] = +el.value; renderRoomList(); typo($('#bookBody')); return; }
    if (e.target.id === 'petBox') { state.pet = e.target.checked; renderRoomList(); renderWidgets(); typo($('#bookBody')); }
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
    if (roomOpen && e.key === 'ArrowLeft') galStep(-1);
    if (roomOpen && e.key === 'ArrowRight') galStep(1);
    trapFocus(e);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1024) toggleMenu(false); });

  /* ---------- Start ---------- */
  rememberGerman();
  var q = /[?&]lang=(de|en)/.exec(window.location.search);
  lang = q ? q[1] : (store('oechsner-lang') === 'en' ? 'en' : 'de');
  if (q) store('oechsner-lang', lang);
  applyLang();
  onScroll();
})();
