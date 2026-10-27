/* Hotel Landgasthof Eischen — Beta-Vorschau. Ohne Backend: Verfügbarkeit und Buchung werden im Browser simuliert. */
(function () {
  'use strict';

  var D = window.EISCHEN;
  var ROOMS = D.ROOMS, OFFERS = D.OFFERS;
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
  function L(o) { return o[lang]; }

  var META = {
    de: { title: document.title, desc: ($('meta[name="description"]') || {}).content },
    en: {
      title: 'Hotel Landgasthof Eischen · Appenzell · Panorama pool, sauna village and country inn',
      desc: 'Family-run hotel above Appenzell: indoor panorama pool with Alpstein view, sauna village, outdoor whirlpool, ' +
        'traditional Appenzell restaurant. Four room categories from CHF 160 per person with breakfast and spa. 9.0/10 from 245 reviews.'
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
    renderWidgets();
    if (!$('#bookModal').hidden) renderBook();
    if (!$('#roomModal').hidden && roomOpen) renderRoomModal();
    typo(document.body);
  }

  function setLang(l) {
    lang = l === 'en' ? 'en' : 'de';
    store('eischen-lang', lang);
    applyLang();
  }

  /* ---------- Typografie: kurze Wörter und Zahlen nicht am Zeilenende hängen lassen ---------- */
  var TYPO_WORDS = 'der|die|das|den|dem|des|ein|und|mit|von|vom|bis|für|auf|aus|bei|zum|zur|vor|als|wie|pro|' +
    'the|and|for|but|not|per';
  var TYPO_RE = new RegExp('(^|[\\s\\u00a0(„“"«])([A-Za-zÄÖÜäöü]{1,2}|' + TYPO_WORDS +
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
    return new Intl.DateTimeFormat(lang === 'de' ? 'de-CH' : 'en-GB', o).format(d);
  }
  function fmtMoney(n) {
    var s = new Intl.NumberFormat('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
    return 'CHF\u00a0' + s;
  }
  var TODAY = (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();

  /* Restaurant-Ruhetag Di/Mi von November bis Ende Juni (eischen.ch, Fusszeile); Hotel 7 Tage geöffnet auf Anfrage.
     In der Vorschau: Anreise möglich, Hinweis im Kalender. */
  function ruhetag(d) {
    var m = d.getMonth(), w = d.getDay();
    return (m >= 10 || m <= 5) && (w === 2 || w === 3);
  }

  /* ---------- Demo-Verfügbarkeit (deterministisch, ohne Backend) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function houseFull(d) { return hash(Math.floor(dayIdx(d) / 4) + 37) % 14 === 0; }
  function roomBusy(room, d) {
    if (houseFull(d)) return true;
    var i = ROOMS.indexOf(room);
    return hash(Math.floor((dayIdx(d) + i * 4) / 6) + i * 131) % 7 < room.busy - 1;
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
  var state = { from: null, to: null, adults: 2, kids: 0, offer: null, prefer: null, room: null, step: 1, month: null, form: {} };

  function persons() { return state.adults + state.kids; }
  function fits(room) {
    if (persons() > room.cap) return 'small';
    if (state.adults === 1 && state.kids === 0 && room.single === null) return 'single';
    return 'ok';
  }
  function offerFor(room, from, to) {
    var o = state.offer;
    if (!o || o.room !== room.id) return null;
    if (nightsBetween(from, to) !== o.nights || state.adults !== 2 || state.kids !== 0) return null;
    if (o.days.indexOf(from.getDay()) < 0) return null;
    return o;
  }
  /* Preis je Nacht: 2 Personen zum Personenpreis, jede weitere Person Zusatzbett (CHF 70);
     1 Erwachsener: Einzelpreis (Säntis EZ 145 / Mehrbett 70). Mehrbettzimmer: Kinder ab 6 Jahren CHF 55. */
  function priceParts(room, from, to) {
    var nights = nightsBetween(from, to);
    var off = offerFor(room, from, to);
    if (off) return { nights: nights, offer: off, total: off.price, lines: [] };
    var lines = [];
    var base, extra = 0, kidsum = 0;
    if (room.id === 'mehrbett') {
      base = state.adults * room.pp;
      kidsum = state.kids * room.kid;
      lines.push({ k: 'adults', a: state.adults, p: room.pp });
      if (state.kids) lines.push({ k: 'kids', a: state.kids, p: room.kid });
    } else if (state.adults === 1 && state.kids === 0) {
      base = room.single;
      lines.push({ k: 'single', a: 1, p: room.single });
    } else {
      var paying = Math.min(state.adults, 2);
      base = paying * room.pp;
      lines.push({ k: 'adults', a: paying, p: room.pp });
      var more = persons() - paying;
      if (more > 0) { extra = more * room.extra; lines.push({ k: 'extra', a: more, p: room.extra }); }
    }
    var perNight = base + extra + kidsum;
    return { nights: nights, offer: null, perNight: perNight, total: perNight * nights, lines: lines };
  }
  function guestsLabel() {
    var s = state.adults + '\u00a0' + (state.adults === 1 ? t('adult1') : t('adultN'));
    if (state.kids) s += ' + ' + state.kids + '\u00a0' + (lang === 'de' ? (state.kids === 1 ? 'Kind' : 'Kinder') : (state.kids === 1 ? 'child' : 'children'));
    return s;
  }
  function nightsLabel(n) { return n + '\u00a0' + (n === 1 ? t('night1') : t('nightN')); }
  function daysLabel(days) {
    var names = { 0: t('d.sun'), 1: t('d.mon'), 4: t('d.thu'), 5: t('d.fri'), 6: t('d.sat') };
    return days.map(function (d) { return names[d]; }).join('/');
  }

  /* ---------- Bilder ---------- */
  function pic(name, w, alt, cls, eager) {
    return '<picture' + (cls ? ' class="' + cls + '"' : '') + '>' +
      '<source type="image/webp" srcset="assets/img/' + name + '-' + w + '.webp">' +
      '<img src="assets/img/' + name + '-' + w + '.jpg" alt="' + esc(alt) + '"' +
      (eager ? '' : ' loading="lazy"') + '></picture>';
  }

  /* ---------- Buchungszeile ---------- */
  function renderWidgets() {
    var html =
      '<button class="bw__field" type="button" data-book><span class="bw__label">' + t('bw.in') + '</span>' +
      '<span class="bw__value' + (state.from ? '' : ' is-empty') + '">' +
      (state.from ? fmtDate(state.from) : t('bw.pick')) + '</span></button>' +
      '<button class="bw__field" type="button" data-book><span class="bw__label">' + t('bw.out') + '</span>' +
      '<span class="bw__value' + (state.to ? '' : ' is-empty') + '">' +
      (state.to ? fmtDate(state.to) : t('bw.pick')) + '</span></button>' +
      '<button class="bw__field" type="button" data-book><span class="bw__label">' + t('bw.guests') + '</span>' +
      '<span class="bw__value">' + guestsLabel() + '</span></button>' +
      '<button class="btn btn--primary" type="button" data-book>' + t('bw.btn') + '</button>';
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
      return el.getClientRects().length > 0;
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
        '" aria-label="' + t('room.photo') + ' ' + (i + 1) + '">' + pic(n, 600, '') + '</button>';
    }).join('');
    $('#roomBody').innerHTML =
      '<div class="rd">' +
      '<div class="gal">' +
      '<div class="gal__main">' + pic(r.imgs[galIdx], 1400, l.alts[galIdx], '', true) +
      '<button type="button" class="gal__nav gal__nav--prev" data-gal-step="-1" aria-label="' + t('gal.prev') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<button type="button" class="gal__nav gal__nav--next" data-gal-step="1" aria-label="' + t('gal.next') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
      '<span class="gal__count">' + (galIdx + 1) + ' / ' + r.imgs.length + '</span></div>' +
      '<div class="gal__thumbs">' + thumbs + '</div></div>' +
      '<div class="rd__info">' +
      '<p class="rd__cap">' + esc(l.kind) + ' · ' + esc(l.occ) + '</p>' +
      '<h2 class="modal__title" id="roomTitle">' + esc(l.name) + '</h2>' +
      '<p>' + esc(l.text) + '</p>' +
      '<h3 class="rd__sub">' + t('room.prices') + '</h3>' +
      '<ul class="rd__prices">' + l.prices.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>' +
      '<h3 class="rd__sub">' + t('room.equip') + '</h3>' +
      '<ul class="rd__equip">' + l.equip.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>' +
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
  function openBooking(preferId, offerId) {
    state.prefer = preferId || null;
    state.offer = offerId ? OFFERS.filter(function (o) { return o.id === offerId; })[0] || null : null;
    if (state.offer) { state.prefer = state.offer.room; state.adults = 2; state.kids = 0; }
    if (state.prefer) {
      var pr = ROOMS.filter(function (r) { return r.id === state.prefer; })[0];
      if (pr && persons() > pr.cap) { state.adults = Math.min(state.adults, pr.cap); state.kids = Math.max(0, Math.min(state.kids, pr.cap - state.adults)); }
    }
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
      body.innerHTML = (state.offer ? '<p class="bk__offer">' + esc(t('bk.offerHint').replace('{name}', L(state.offer).name)
        .replace('{nights}', nightsLabel(state.offer.nights)).replace('{days}', daysLabel(state.offer.days))) + '</p>' : '') +
        '<div class="bk"><div class="bk__left"><div class="cal" id="cal"></div>' +
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
        cls += ' is-busy';
      }
      if (!dis && ruhetag(date)) cls += ' is-ruhe';
      if (state.from && +date === +state.from) cls += ' is-start';
      if (state.to && +date === +state.to) cls += ' is-end';
      if (state.from && state.to && date > state.from && date < state.to) cls += ' is-in';
      if (+date === +TODAY) cls += ' is-today';
      cells += '<button type="button" class="' + cls + '" data-day="' + ymd(date) + '"' + (dis ? ' disabled' : '') +
        ' aria-label="' + fmtDate(date, true) + (ruhetag(date) ? ' – ' + t('ruhe.hint') : '') + '">' + d + '</button>';
    }
    var hint = !state.from ? t('cal.hintIn') : (!state.to ? t('cal.hintOut')
      : fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nightsBetween(state.from, state.to)));
    if (state.from && ruhetag(state.from)) hint += ' · ' + t('ruhe.hint');
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
      '</li><li class="lg-ruhe">' + t('cal.ruhe') + '</li><li class="lg-sel">' + t('cal.sel') + '</li></ul>';
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
    $('#guests').innerHTML = '<h3 class="bk__h">' + t('bk.guests') + '</h3>' +
      stepper('adults', state.adults, 1, 6, t('bk.adults')) +
      stepper('kids', state.kids, 0, 4, t('bk.kids')) +
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
      var l = L(r), fit = fits(r), ok = fit === 'ok', free = ready && ok && roomFree(r, state.from, state.to);
      if (free) anyFree = true;
      var right;
      if (fit === 'small') right = '<p class="bkr__state">' + t('bk.small') + '</p>';
      else if (fit === 'single') right = '<p class="bkr__state">' + t('bk.single') + '</p>';
      else if (!ready) right = '<p class="bkr__price">' + t('room.from') + ' <b>' + fmtMoney(r.pp) + '</b><span>' +
        t('room.pp') + '</span></p>';
      else if (!free) right = '<p class="bkr__state">' + t('bk.busy') + '</p>';
      else {
        var p = priceParts(r, state.from, state.to);
        right = '<p class="bkr__price"><b>' + fmtMoney(p.total) + '</b><span>' +
          (p.offer ? esc(L(p.offer).name) : t('bk.total') + ' · ' + nightsLabel(nights)) + '</span></p>' +
          '<button class="btn btn--primary btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
      }
      return '<li class="bkr' + (ready && ok && !free || !ok ? ' is-off' : '') + '">' +
        pic(r.imgs[0], 600, '', 'bkr__img') +
        '<div class="bkr__info"><h4>' + esc(l.name) + '</h4><p>' + esc(l.occ) + ' · ' + esc(l.short) + '</p></div>' +
        '<div class="bkr__right">' + right + '</div></li>';
    }).join('');
    var sub = ready
      ? fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + guestsLabel()
      : t('bk.pickDates');
    box.innerHTML = '<h3 class="bk__h">' + t('bk.rooms') + '</h3><p class="bk__sub">' + sub + '</p>' +
      '<ul class="bkr-list">' + rows + '</ul>' +
      (ready && !anyFree ? '<p class="bk__none" role="status">' + t('bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.incl') + '. ' + t('bk.direct') + '</p>';
  }

  function lineLabel(ln, nights) {
    var who = ln.k === 'kids' ? t('bk.kidLine') : ln.k === 'extra' ? t('bk.extraLine') :
      (ln.a === 1 ? t('adult1') : t('adultN'));
    return who + ' · ' + t('bk.line').replace('{a}', ln.a).replace('{p}', ln.p).replace('{n}', nightsLabel(nights));
  }
  function summaryHtml() {
    var r = state.room, p = priceParts(r, state.from, state.to);
    return '<aside class="sum"><h3 class="bk__h">' + t('bk.summary') + '</h3>' +
      pic(r.imgs[0], 600, '', 'sum__img') +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(L(r).name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' +
      nightsLabel(p.nights) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + guestsLabel() + '</dd></div>' +
      (p.offer ? '<div><dt>' + t('bk.offer') + '</dt><dd>' + esc(L(p.offer).name) + '</dd></div>'
        : p.lines.map(function (ln) {
          return '<div><dt>' + lineLabel(ln, p.nights) + '</dt><dd>' + fmtMoney(ln.a * ln.p * p.nights) + '</dd></div>';
        }).join('')) +
      '<div class="sum__total"><dt>' + t('bk.price') + '</dt><dd>' + fmtMoney(p.total) + '</dd></div></dl>' +
      '<p class="bk__fine">' + (p.offer ? esc(t('bk.offerOk').replace('{name}', L(p.offer).name)) + '. ' : t('bk.incl') + '. ') +
      t('bk.direct') + ' ' + t('bk.pay') + ' ' + t('bk.cancel') + '</p></aside>';
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
    var no = 'EI-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + state.adults) % 9000);
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
  var POS = [47.3226636, 9.3873923];
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
        'href="https://www.openstreetmap.org/?mlat=' + POS[0] + '&mlon=' + POS[1] + '#map=16/' + POS[0] + '/' + POS[1] + '">' +
        t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(POS, 15);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      Lf.marker(POS).addTo(map).bindPopup('<b>Hotel Landgasthof Eischen</b><br>Kaustrasse 123, 9050 Appenzell');
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
      openBooking(el.getAttribute('data-room'), el.getAttribute('data-offer'));
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
      var d = +el.getAttribute('data-d'), k = el.getAttribute('data-step');
      if (k === 'adults') state.adults = Math.min(6, Math.max(1, state.adults + d));
      else state.kids = Math.min(4, Math.max(0, state.kids + d));
      renderGuests(); renderRoomList(); renderWidgets(); typo($('#bookBody'));
      refocus('[data-step="' + k + '"][data-d="' + d + '"]');
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
  window.addEventListener('resize', function () { if (window.innerWidth >= 1200) toggleMenu(false); });

  /* ---------- Start ---------- */
  rememberGerman();
  var q = /[?&]lang=(de|en)/.exec(window.location.search);
  lang = q ? q[1] : (store('eischen-lang') === 'en' ? 'en' : 'de');
  if (q) store('eischen-lang', lang);
  applyLang();
  onScroll();
})();
