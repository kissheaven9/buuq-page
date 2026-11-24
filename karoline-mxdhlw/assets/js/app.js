/* Gästehaus Karoline — Beta-Vorschau. Ohne Backend: Verfügbarkeit und Buchung werden im Browser simuliert. */
(function () {
  'use strict';

  var D = window.KAROLINE;
  var ROOMS = D.ROOMS, RULES = D.RULES;
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
      title: 'Gästehaus Karoline · Two holiday apartments with south-facing balcony in Reit im Winkl',
      desc: 'Two holiday apartments for two guests each in Reit im Winkl, Bavaria: south-facing balcony with a view ' +
        'of the Kaiser mountains, eight minutes’ walk to the village centre. From €73 per night, final cleaning included.'
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
    if (!$('#roomModal').hidden && roomOpen) renderRoomModal();
    typo(document.body);
  }

  function setLang(l) {
    lang = l === 'en' ? 'en' : 'de';
    store('karoline-lang', lang);
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
      var s = n.nodeValue, prev, pass = 0;
      do { prev = s; s = s.replace(TYPO_RE, '$1$2\u00a0'); pass++; } while (s !== prev && pass < 3);
      s = s.replace(/[ \t\n]+([–—])[ \t\n]+/g, '\u00a0$1 ');
      if (s !== n.nodeValue) n.nodeValue = s;
    }
  }

  /* ---------- Datum und Geld ---------- */
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
      style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(n);
  }
  var TODAY = (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();
  /* „Buchung muss mindestens einen Tag vor der Anreise erfolgen“ */
  var FIRST = addDays(TODAY, 1);

  /* ---------- Saison ---------- */
  var SEASONS = D.SEASONS.map(function (s) { return { id: s.id, from: parseYmd(s.from), to: parseYmd(s.to) }; });
  /* Saison der Nacht, die an diesem Tag beginnt (null = außerhalb der veröffentlichten Preise) */
  function seasonOf(d) {
    for (var i = 0; i < SEASONS.length; i++) if (d >= SEASONS[i].from && d < SEASONS[i].to) return SEASONS[i].id;
    return null;
  }
  function rangeInSeason(from, to) {
    for (var d = from; d < to; d = addDays(d, 1)) if (!seasonOf(d)) return false;
    return true;
  }
  var LAST_MONTH = (function () {
    var last = SEASONS[SEASONS.length - 1].to;
    return new Date(last.getFullYear(), last.getMonth(), 1);
  })();
  function firstBookable() {
    for (var d = FIRST, i = 0; i < 400; i++, d = addDays(d, 1)) if (seasonOf(d) && !houseFull(d)) return d;
    return FIRST;
  }

  /* ---------- Demo-Verfügbarkeit (deterministisch, ohne Backend) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function roomBusy(room, d) {
    var i = ROOMS.indexOf(room);
    return hash(Math.floor((dayIdx(d) + i * 3) / 7) + i * 57 + 11) % 5 < 2;
  }
  function houseFull(d) {
    for (var i = 0; i < ROOMS.length; i++) if (!roomBusy(ROOMS[i], d)) return false;
    return true;
  }
  function roomFree(room, from, to) {
    for (var d = from; d < to; d = addDays(d, 1)) if (roomBusy(room, d)) return false;
    return true;
  }
  function rangeHasFull(from, to) {
    for (var d = from; d < to; d = addDays(d, 1)) if (houseFull(d)) return true;
    return false;
  }

  /* ---------- Preis ---------- */
  var state = { from: null, to: null, guests: 2, prefer: null, room: null, step: 1, month: null, form: {} };

  function stayPrice(room, from, to) {
    var sum = 0;
    for (var d = from; d < to; d = addDays(d, 1)) sum += room.price[seasonOf(d)] || 0;
    return sum;
  }
  function taxFor(nights) { return RULES.tax * state.guests * nights; }
  function guestsLabel() { return state.guests + '\u00a0' + (state.guests === 1 ? t('guest1') : t('guestN')); }
  function nightsLabel(n) { return n + '\u00a0' + (n === 1 ? t('night1') : t('nightN')); }
  function minPrice(room) { return Math.min(room.price.summer, room.price.winter); }

  /* ---------- Bilder ---------- */
  function pic(name, w, alt, cls, eager) {
    return '<picture' + (cls ? ' class="' + cls + '"' : '') + '>' +
      '<source type="image/webp" srcset="assets/img/' + name + '-' + w + '.webp">' +
      '<img src="assets/img/' + name + '-' + w + '.jpg" alt="' + esc(alt) + '"' +
      (eager ? '' : ' loading="lazy"') + '></picture>';
  }

  /* ---------- Wohnungskarten ---------- */
  function renderRooms() {
    $('#rooms').innerHTML = ROOMS.map(function (r) {
      var l = L(r);
      return '<article class="apt">' +
        '<button class="apt__img" type="button" data-room-open="' + r.id + '" aria-label="' +
        esc(l.name + ': ' + r.imgs.length + ' ' + t('room.photos')) + '">' + pic(r.imgs[0][0], 800, l.alts[0]) +
        '<span class="apt__count">' + r.imgs.length + ' ' + t('room.photos') + '</span></button>' +
        '<div class="apt__body">' +
        '<p class="apt__meta">' + r.size + '\u00a0m² · ' + esc(l.cap) + '</p>' +
        '<h3>' + esc(l.name) + '</h3>' +
        '<p class="apt__text">' + esc(l.short) + '</p>' +
        '<ul class="chips">' + l.equip.slice(0, 3).map(function (e) { return '<li>' + esc(e.split(',')[0]) + '</li>'; }).join('') +
        '</ul>' +
        '<div class="apt__foot"><p class="price">' + t('room.from') + ' <b>' + fmtMoney(minPrice(r)) + '</b> <span>' +
        t('room.pn') + '</span></p>' +
        '<div class="apt__actions">' +
        '<button class="btn btn--ghost" type="button" data-room-open="' + r.id + '">' + t('room.details') + '</button>' +
        '<button class="btn btn--primary" type="button" data-book data-room="' + r.id + '">' + t('room.book') + '</button>' +
        '</div></div></div></article>';
    }).join('');
  }

  /* ---------- Buchungseinstieg ---------- */
  function renderWidgets() {
    var html =
      '<button class="bw__field" type="button" data-book><svg class="ico" aria-hidden="true"><use href="#i-cal"/></svg>' +
      '<span class="bw__label">' + t('bw.in') + '</span>' +
      '<span class="bw__value' + (state.from ? '' : ' is-empty') + '">' +
      (state.from ? fmtDate(state.from, true) : t('bw.pick')) + '</span></button>' +
      '<button class="bw__field" type="button" data-book><svg class="ico" aria-hidden="true"><use href="#i-cal"/></svg>' +
      '<span class="bw__label">' + t('bw.out') + '</span>' +
      '<span class="bw__value' + (state.to ? '' : ' is-empty') + '">' +
      (state.to ? fmtDate(state.to, true) : t('bw.pick')) + '</span></button>' +
      '<button class="bw__field bw__field--guests" type="button" data-book><svg class="ico" aria-hidden="true">' +
      '<use href="#i-users"/></svg><span class="bw__label">' + t('bw.guests') + '</span>' +
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

  /* ---------- Wohnungsdetails ---------- */
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
        '" aria-label="' + t('room.photo') + ' ' + (i + 1) + '">' + pic(n[0], 800, '') + '</button>';
    }).join('');
    $('#roomBody').innerHTML =
      '<div class="rd">' +
      '<div class="gal">' +
      '<div class="gal__main">' + pic(r.imgs[galIdx][0], r.imgs[galIdx][1], l.alts[galIdx], '', true) +
      '<button type="button" class="gal__nav gal__nav--prev" data-gal-step="-1" aria-label="' + t('gal.prev') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<button type="button" class="gal__nav gal__nav--next" data-gal-step="1" aria-label="' + t('gal.next') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
      '<span class="gal__count">' + (galIdx + 1) + ' / ' + r.imgs.length + '</span></div>' +
      '<div class="gal__thumbs">' + thumbs + '</div></div>' +
      '<div class="rd__info">' +
      '<p class="eyebrow">' + r.size + '\u00a0m² · ' + esc(l.cap) + '</p>' +
      '<h2 class="modal__title" id="roomTitle">' + esc(l.name) + '</h2>' +
      '<p>' + esc(l.text) + '</p>' +
      '<h3 class="rd__sub">' + t('room.equip') + '</h3>' +
      '<ul class="ticks">' + l.equip.map(function (e) {
        return '<li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg><span>' + esc(e) + '</span></li>';
      }).join('') + '</ul>' +
      '<p class="price">' + t('room.from') + ' <b>' + fmtMoney(minPrice(r)) + '</b> <span>' + t('room.pn') + '</span></p>' +
      '<p class="rd__note">' + esc(t('room.priceNote').replace('{s}', fmtMoney(r.price.summer))
        .replace('{w}', fmtMoney(r.price.winter))) + '</p>' +
      '<button class="btn btn--primary" type="button" data-book data-room="' + r.id + '">' + t('room.book') +
      '</button></div></div>';
    typo($('#roomBody'));
  }
  function galStep(n) {
    if (!roomOpen) return;
    galIdx = (galIdx + n + roomOpen.imgs.length) % roomOpen.imgs.length;
    renderRoomModal();
  }

  /* ---------- Buchung ---------- */
  function monthOf(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
  function openBooking(preferId) {
    state.prefer = preferId || null;
    roomOpen = null;
    state.step = 1;
    state.room = null;
    if (!state.month) state.month = monthOf(state.from || firstBookable());
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
    var minMonth = monthOf(TODAY);
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
      /* als Abreisetag wählbar: alle Nächte davor liegen in der Saison und das Haus ist nicht ausgebucht */
      var okAsEnd = state.from && !state.to && date > state.from && rangeInSeason(state.from, date) &&
        !rangeHasFull(state.from, date);
      if (date < FIRST) { dis = true; cls += ' is-past'; }
      else if (!seasonOf(date)) { if (!okAsEnd) dis = true; cls += ' is-off'; }
      else if (houseFull(date)) { if (!okAsEnd) dis = true; cls += ' is-busy'; }
      if (state.from && +date === +state.from) cls += ' is-start';
      if (state.to && +date === +state.to) cls += ' is-end';
      if (state.from && state.to && date > state.from && date < state.to) cls += ' is-in';
      if (+date === +TODAY) cls += ' is-today';
      cells += '<button type="button" class="' + cls + '" data-day="' + ymd(date) + '"' + (dis ? ' disabled' : '') +
        ' aria-label="' + fmtDate(date, true) + '">' + d + '</button>';
    }
    var hint = !state.from ? t('cal.hintIn') : (!state.to ? t('cal.hintOut')
      : fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nightsBetween(state.from, state.to)));
    var jumps = SEASONS.filter(function (s) { return s.to > FIRST; }).map(function (s) {
      var target = s.from > FIRST ? s.from : FIRST;
      return '<button type="button" class="chip-btn" data-jump="' + ymd(monthOf(target)) + '">' + t('cal.' + s.id) + '</button>';
    }).join('');
    $('#cal').innerHTML =
      '<div class="cal__head">' +
      '<button type="button" class="cal__nav" data-cal="-1" aria-label="' + t('cal.prev') + '"' +
      (m <= minMonth ? ' disabled' : '') + '><svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<p class="cal__title" aria-live="polite">' + title + '</p>' +
      '<button type="button" class="cal__nav" data-cal="1" aria-label="' + t('cal.next') + '"' +
      (m >= LAST_MONTH ? ' disabled' : '') + '><svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
      '</div><div class="cal__wd">' + wd.join('') + '</div><div class="cal__grid">' + cells + '</div>' +
      '<p class="cal__hint" aria-live="polite">' + hint +
      (state.from ? ' <button type="button" class="link" data-cal-reset>' + t('cal.reset') + '</button>' : '') + '</p>' +
      '<ul class="cal__legend"><li class="lg-free">' + t('cal.free') + '</li><li class="lg-busy">' + t('cal.busy') +
      '</li><li class="lg-off">' + t('cal.off') + '</li><li class="lg-sel">' + t('cal.sel') + '</li></ul>' +
      (jumps ? '<div class="cal__jump" role="group" aria-label="' + t('cal.jump') + '">' + jumps + '</div>' : '');
  }

  function pickDay(s) {
    var d = parseYmd(s);
    var asEnd = state.from && !state.to && d > state.from && rangeInSeason(state.from, d) && !rangeHasFull(state.from, d);
    if (asEnd) {
      state.to = d;
    } else {
      if (!seasonOf(d) || houseFull(d) || d < FIRST) return;
      state.from = d; state.to = null;
    }
    renderCal(); renderRoomList(); renderWidgets();
    typo($('#bookBody'));
    refocus('[data-day="' + s + '"]');
  }

  /* nach dem Neuzeichnen den Fokus auf dem gleichen Bedienelement halten (Tastatur) */
  function refocus(sel) {
    var el = $(sel, $('#bookBody'));
    if (el && !el.disabled) el.focus();
  }

  function renderGuests() {
    var val = state.guests, label = t('bk.persons');
    $('#guests').innerHTML = '<h3 class="bk__h">' + t('bk.guests') + '</h3>' +
      '<div class="stepper"><span class="stepper__label">' + label + '</span>' +
      '<span class="stepper__ctl"><button type="button" data-step="-1" aria-label="' + label + ': ' +
      t('bk.less') + '"' + (val <= 1 ? ' disabled' : '') + '>−</button><output>' + val + '</output>' +
      '<button type="button" data-step="1" aria-label="' + label + ': ' + t('bk.more') + '"' +
      (val >= RULES.maxGuests ? ' disabled' : '') + '>+</button></span></div>' +
      '<p class="bk__fine">' + t('bk.max') + '</p>';
  }

  function renderRoomList() {
    var box = $('#bkRooms');
    if (!box) return;
    var ready = state.from && state.to;
    var nights = ready ? nightsBetween(state.from, state.to) : 0;
    var longEnough = nights >= RULES.minNights;
    var list = ROOMS.slice().sort(function (a, b) {
      return (b.id === state.prefer) - (a.id === state.prefer);
    });
    var anyFree = false;
    var rows = list.map(function (r) {
      var l = L(r), free = ready && roomFree(r, state.from, state.to);
      if (free) anyFree = true;
      var right;
      if (!ready || !longEnough) right = '<p class="bkr__price">' + t('room.from') + ' <b>' + fmtMoney(minPrice(r)) +
        '</b><span>' + t('room.pn') + '</span></p>';
      else if (!free) right = '<p class="bkr__state">' + t('bk.busy') + '</p>';
      else right = '<p class="bkr__price"><b>' + fmtMoney(stayPrice(r, state.from, state.to)) + '</b><span>' +
        t('bk.total') + ' · ' + nightsLabel(nights) + '</span></p>' +
        '<button class="btn btn--primary btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
      return '<li class="bkr' + (ready && longEnough && !free ? ' is-off' : '') + '">' +
        pic(r.imgs[0][0], 800, '', 'bkr__img') +
        '<div class="bkr__info"><h4>' + esc(l.name) + '</h4><p>' + r.size + '\u00a0m² · ' + esc(l.cap) + '</p></div>' +
        '<div class="bkr__right">' + right + '</div></li>';
    }).join('');
    var sub = ready
      ? fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + guestsLabel()
      : t('bk.pickDates');
    box.innerHTML = '<h3 class="bk__h">' + t('bk.rooms') + '</h3><p class="bk__sub">' + sub + '</p>' +
      (ready && !longEnough ? '<p class="bk__none" role="status">' + t('bk.min') + '</p>' : '') +
      '<ul class="bkr-list">' + rows + '</ul>' +
      (ready && longEnough && !anyFree ? '<p class="bk__none" role="status">' + t('bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.incl') + '. ' + t('bk.tax') + ' ' + t('bk.pay') + '</p>';
  }

  function summaryHtml() {
    var r = state.room, nights = nightsBetween(state.from, state.to);
    var stay = stayPrice(r, state.from, state.to), tax = taxFor(nights);
    return '<aside class="sum"><h3 class="bk__h">' + t('bk.summary') + '</h3>' +
      pic(r.imgs[0][0], 800, '', 'sum__img') +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(L(r).name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + guestsLabel() + '</dd></div>' +
      '<div><dt>' + t('bk.stayNights') + ' · ' + nightsLabel(nights) + '</dt><dd>' + fmtMoney(stay) + '</dd></div>' +
      '<div><dt>' + t('bk.taxLine') + ' · ' + state.guests + ' × ' + nights + ' × ' + fmtMoney(RULES.tax) + '</dt><dd>' +
      fmtMoney(tax) + '</dd></div>' +
      '<div class="sum__total"><dt>' + t('bk.price') + '</dt><dd>' + fmtMoney(stay + tax) + '</dd></div></dl>' +
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
    var no = 'KA-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + state.guests) % 9000);
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
      var Lf = window.L, pos = [47.67879, 12.47794];
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" ' +
        'href="https://www.openstreetmap.org/?mlat=47.67879&mlon=12.47794#map=16/47.67879/12.47794">' +
        t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(pos, 14);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      Lf.marker(pos).addTo(map).bindPopup('<b>Gästehaus Karoline</b><br>' + t('map.popup'));
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
  function onScroll() { $('#header').classList.toggle('is-scrolled', window.scrollY > 8); }

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
      renderCal(); typo($('#cal'));
      refocus('[data-cal="' + el.getAttribute('data-cal') + '"]');
      return;
    }
    if ((el = e.target.closest('[data-jump]'))) {
      state.month = parseYmd(el.getAttribute('data-jump'));
      renderCal(); typo($('#cal'));
      refocus('[data-jump="' + el.getAttribute('data-jump') + '"]');
      return;
    }
    if (e.target.closest('[data-cal-reset]')) {
      state.from = state.to = null;
      renderCal(); renderRoomList(); renderWidgets(); typo($('#bookBody')); return;
    }
    if ((el = e.target.closest('[data-step]'))) {
      var d = +el.getAttribute('data-step');
      state.guests = Math.min(RULES.maxGuests, Math.max(1, state.guests + d));
      renderGuests(); renderRoomList(); renderWidgets(); typo($('#bookBody'));
      refocus('[data-step="' + d + '"]');
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
  window.addEventListener('resize', function () { if (window.innerWidth >= 1100) toggleMenu(false); });

  /* ---------- Start ---------- */
  rememberGerman();
  var q = /[?&]lang=(de|en)/.exec(window.location.search);
  lang = q ? q[1] : (store('karoline-lang') === 'en' ? 'en' : 'de');
  if (q) store('karoline-lang', lang);
  applyLang();
  onScroll();
})();
