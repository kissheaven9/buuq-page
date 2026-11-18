/* Gasthof Hotel Zwieselstein — Beta-Vorschau. Ohne Backend: Verfügbarkeit und Buchung werden im Browser simuliert.
   Preise und Regeln stammen aus der Online-Buchung des Hauses (siehe i18n.js). */
(function () {
  'use strict';

  var D = window.ZWIESEL;
  var ROOMS = D.ROOMS, RATES = D.RATES, RULES = D.RULES;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Speicher (localStorage kann gesperrt sein) ---------- */
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

  /* ---------- Sprache ---------- */
  var LANGS = ['de', 'en', 'nl'];
  var LOCALE = { de: 'de-AT', en: 'en-GB', nl: 'nl-NL' };
  var lang = 'de';
  function t(key) { return D.UI[lang][key] !== undefined ? D.UI[lang][key] : key; }
  function L(room) { return room[lang]; }

  var META = {
    de: { title: document.title, desc: ($('meta[name="description"]') || {}).content },
    en: D.META.en, nl: D.META.nl
  };

  function rememberGerman() {
    $$('[data-i18n]').forEach(function (el) { el._de = el.innerHTML; });
    $$('[data-i18n-alt]').forEach(function (el) { el._deAlt = el.alt; });
    $$('[data-i18n-aria]').forEach(function (el) { el._deAria = el.getAttribute('aria-label'); });
  }

  function applyLang() {
    document.documentElement.lang = lang;
    var dict = D.T[lang] || {};
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
    document.title = META[lang].title;
    var md = $('meta[name="description"]');
    if (md) md.content = META[lang].desc;
    renderRooms();
    renderPriceTables();
    renderWidgets();
    if (!$('#bookModal').hidden) renderBook();
    if (!$('#roomModal').hidden && roomOpen) renderRoomModal();
    typo(document.body);
  }

  function setLang(l) {
    lang = LANGS.indexOf(l) >= 0 ? l : 'de';
    store('zwiesel-lang', lang);
    applyLang();
  }

  /* ---------- Jahreszeit: Winter / Sommer ---------- */
  var season = 'winter';
  function applySeason() {
    document.documentElement.setAttribute('data-season-now', season);
    $$('[data-season]').forEach(function (el) { el.hidden = el.getAttribute('data-season') !== season; });
    $$('[data-season-set]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-season-set') === season ? 'true' : 'false');
    });
    $$('[data-season-mark]').forEach(function (el) {
      el.classList.toggle('is-now', el.getAttribute('data-season-mark') === season);
    });
    renderRooms();
    typo($('#rooms'));
  }
  function setSeason(s) {
    season = s === 'sommer' ? 'sommer' : 'winter';
    store('zwiesel-season', season);
    applySeason();
  }

  /* ---------- Typografie: kurze Wörter und Zahlen nicht am Zeilenende hängen lassen ---------- */
  var TYPO_WORDS = 'der|die|das|den|dem|des|ein|und|mit|von|vom|bis|für|auf|aus|bei|zum|zur|vor|als|wie|pro|' +
    'the|and|for|but|not|per|het|een|van|met|bij|tot|uit|aan|als|per';
  var TYPO_RE = new RegExp('(^|[\\s\\u00a0(„“"])([A-Za-zÄÖÜäöüß]{1,2}|' + TYPO_WORDS +
    '|\\d[\\d.,–]*)[ \\t\\n]+(?=\\S)', 'gi');
  function typo(root) {
    if (!root) return;
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

  /* ---------- Datum und Zahlen ---------- */
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
  function fmtShort(s, year) {
    var p = s.split('-');
    return p[2] + '.' + p[1] + '.' + (year ? p[0] : '');
  }
  function fmtMoney(n) {
    return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : LOCALE[lang], {
      style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(n);
  }
  var TODAY = (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();

  /* ---------- Saisonpreise ---------- */
  function rateOf(d) {
    var s = ymd(d), r = RATES[0];
    for (var i = 0; i < RATES.length; i++) if (RATES[i].from <= s) r = RATES[i];
    return r;
  }
  function minRate(s) {
    var m = Infinity;
    RATES.forEach(function (r) {
      if (r.s !== s) return;
      if (s === 'sommer' && r.from < '2027-01-01') return;   /* „Sommer 2027“: Herbst 2026 zählt nicht mit */
      if (r.price < m) m = r.price;
    });
    return m;
  }
  function hbAllowed(from, to) {
    for (var d = from; d < to; d = addDays(d, 1)) if (!rateOf(d).hb) return false;
    return true;
  }

  /* ---------- Demo-Verfügbarkeit (deterministisch, ohne Backend) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function houseFull(d) {
    var s = ymd(d);
    /* Stand der echten Online-Buchung am 02.10.2026: zwischen den Feiertagen kein Zimmer mehr frei */
    if (s >= '2026-12-26' && s <= '2027-01-01') return true;
    return hash(Math.floor(dayIdx(d) / 5) + 91) % 11 === 0;
  }
  function freeOn(room, d) {
    if (houseFull(d)) return 0;
    var i = ROOMS.indexOf(room);
    var load = rateOf(d).price >= 178 ? 1.25 : (rateOf(d).price >= 138 ? 0.95 : 0.6);
    var frac = (hash(Math.floor((dayIdx(d) + i * 3) / 6) + i * 101) % 1000) / 1000;
    var busy = Math.min(room.count, Math.floor(frac * (room.count + 1) * load));
    return room.count - busy;
  }
  function freeIn(room, from, to) {
    var m = room.count;
    for (var d = from; d < to; d = addDays(d, 1)) m = Math.min(m, freeOn(room, d));
    return m;
  }
  function rangeHasFull(from, to) {
    for (var d = from; d < to; d = addDays(d, 1)) if (houseFull(d)) return true;
    return false;
  }

  /* ---------- Belegung und Preis ---------- */
  var state = {
    from: null, to: null, adults: 2, kids: [], board: 0, prefer: null, room: null, step: 1, month: null, form: {}
  };

  function persons() { return state.adults + state.kids.length; }
  function fits(room) { return persons() <= room.max; }
  function kidBand(age) { return age <= 2 ? 0 : (age <= 8 ? 1 : 2); }

  /* Rechnet wie die Online-Buchung des Hauses: Zimmer, Verpflegung, Kurzaufenthalt, Ortstaxe. */
  function priceFor(from, to, adults, kids, board) {
    var nights = nightsBetween(from, to), n = adults + kids.length;
    var sorted = kids.slice().sort(function (a, b) { return b - a; });
    var out = { room: 0, board: 0, short: 0, tax: 0, total: 0, nights: nights };
    var meal = board === 2 ? RULES.halfBoard : (board === 1 ? RULES.breakfast : null);
    for (var d = from; d < to; d = addDays(d, 1)) {
      var p = rateOf(d).price / 2;
      if (n === 1) out.room += p + RULES.single;
      else {
        for (var i = 0; i < n; i++) {
          if (i < 2) { out.room += p; continue; }
          if (i < adults) { out.room += Math.round(p * RULES.extraAdult); continue; }
          var band = kidBand(sorted[i - adults]);
          out.room += band === 0 ? 0 : Math.round(p * (band === 1 ? RULES.kid3to8 : RULES.kid9to14));
        }
      }
      if (meal) {
        out.board += adults * meal.adult;
        sorted.forEach(function (age) {
          var b = kidBand(age);
          out.board += b === 0 ? 0 : (b === 1 ? meal.kid3to8 : meal.kid9to14);
        });
      }
      if (nights <= 3) out.short += n * RULES.shortStay;
      out.tax += adults * RULES.tax;
    }
    out.total = out.room + out.board + out.short + out.tax;
    return out;
  }
  function currentBoard() {
    return state.board === 2 && state.from && state.to && !hbAllowed(state.from, state.to) ? 0 : state.board;
  }
  function guestsLabel() {
    var a = state.adults + '\u00a0' + (state.adults === 1 ? t('adult1') : t('adultN'));
    var k = state.kids.length;
    return k ? a + ', ' + k + '\u00a0' + (k === 1 ? t('kid1') : t('kidN')) : a;
  }
  function nightsLabel(n) { return n + '\u00a0' + (n === 1 ? t('night1') : t('nightN')); }
  function boardLabel(b) { return t('bk.b' + b); }

  /* ---------- Bilder ---------- */
  function pic(name, w, alt, cls, eager) {
    return '<picture' + (cls ? ' class="' + cls + '"' : '') + '>' +
      '<source type="image/webp" srcset="assets/img/' + name + '-' + w + '.webp">' +
      '<img src="assets/img/' + name + '-' + w + '.jpg" alt="' + esc(alt) + '" width="3" height="2"' +
      (eager ? '' : ' loading="lazy"') + '></picture>';
  }
  function imgW(room, i, big) {
    var b = room.big[i];
    return big ? b : (b === 900 ? 900 : 800);
  }

  /* ---------- Zimmerliste ---------- */
  function renderRooms() {
    var box = $('#rooms');
    if (!box) return;
    var from = minRate(season);
    box.innerHTML = ROOMS.map(function (r) {
      var l = L(r);
      return '<article class="room">' +
        '<button class="room__img" type="button" data-room-open="' + r.id + '" aria-label="' +
        esc(t('room.details') + ': ' + l.name) + '">' + pic(r.imgs[0], imgW(r, 0, false), l.alts[0]) + '</button>' +
        '<div class="room__body">' +
        '<p class="room__meta">' + r.size + ' m² · ' + esc(l.cap) + (r.balcony ? ' · ' + t('room.balcony') : '') + '</p>' +
        '<h3>' + esc(l.name) + '</h3>' +
        '<p class="room__text">' + esc(l.short) + '</p></div>' +
        '<div class="room__side">' +
        '<p class="room__price"><span>' + t('room.from') + '</span> <b>' + fmtMoney(from) + '</b>' +
        '<small>' + t('room.unit') + ' ' + t(season === 'winter' ? 'room.seasonW' : 'room.seasonS') + '</small></p>' +
        '<div class="room__actions">' +
        '<button class="btn btn--ghost" type="button" data-room-open="' + r.id + '">' + t('room.details') + '</button>' +
        '<button class="btn btn--primary" type="button" data-book data-room="' + r.id + '">' + t('room.book') + '</button>' +
        '</div></div></article>';
    }).join('');
  }

  /* ---------- Preistabellen ---------- */
  function renderPriceTables() {
    function row(r) {
      var cross = r.from.slice(0, 4) !== r.to.slice(0, 4);
      var period = (r.from <= ymd(TODAY) ? t('pt.to') + ' ' : fmtShort(r.from, cross) + '\u00a0– ') + fmtShort(r.to, true);
      return '<tr><td>' + period + '</td><td><b>' + fmtMoney(r.price) + '</b></td><td>(' +
        fmtMoney(r.price / 2 + RULES.single) + ')</td></tr>';
    }
    var w = RATES.filter(function (r) { return r.s === 'winter' && r.to >= ymd(TODAY); }).map(row).join('');
    var s = RATES.filter(function (r) { return r.s === 'sommer' && r.to >= ymd(TODAY); }).map(row).join('');
    if ($('#ptWinter')) $('#ptWinter').innerHTML = w;
    if ($('#ptSommer')) $('#ptSommer').innerHTML = s;
  }

  /* ---------- Buchungsleiste ---------- */
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
      '<button class="btn btn--primary bw__btn" type="button" data-book><span>' + t('bw.btn') + '</span>' +
      '<svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></button>';
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
        '" aria-label="' + t('room.photo') + ' ' + (i + 1) + '">' + pic(n, imgW(r, i, false), '') + '</button>';
    }).join('');
    var equip = t('room.equipList').slice();
    if (r.balcony) equip.splice(1, 0, t('room.balcony'));
    $('#roomBody').innerHTML =
      '<div class="rd">' +
      '<div class="gal">' +
      '<div class="gal__main">' + pic(r.imgs[galIdx], imgW(r, galIdx, true), l.alts[galIdx], '', true) +
      '<button type="button" class="gal__nav gal__nav--prev" data-gal-step="-1" aria-label="' + t('gal.prev') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<button type="button" class="gal__nav gal__nav--next" data-gal-step="1" aria-label="' + t('gal.next') + '">' +
      '<svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
      '<span class="gal__count">' + (galIdx + 1) + ' / ' + r.imgs.length + '</span></div>' +
      '<div class="gal__thumbs">' + thumbs + '</div></div>' +
      '<div class="rd__info">' +
      '<p class="pretitle">' + r.size + ' m² · ' + esc(l.cap) + ' · ' + r.count + ' ' + t('room.count') + '</p>' +
      '<h2 class="modal__title" id="roomTitle">' + esc(l.name) + '</h2>' +
      '<p>' + esc(l.text) + '</p>' +
      '<h3 class="rd__sub">' + t('room.equip') + '</h3>' +
      '<ul class="rd__equip">' + equip.map(function (e) {
        return '<li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>' + esc(e) + '</li>';
      }).join('') + '</ul>' +
      '<dl class="rd__prices">' +
      '<div><dt>' + $('[data-i18n="prices.winter"]').textContent + '</dt><dd>' + t('room.from') + ' ' +
      fmtMoney(minRate('winter')) + '</dd></div>' +
      '<div><dt>' + ($('[data-i18n="season.summer"]').textContent + ' 2027') + '</dt><dd>' + t('room.from') + ' ' +
      fmtMoney(minRate('sommer')) + '</dd></div></dl>' +
      '<p class="rd__note">' + t('room.priceNote') + '</p>' +
      '<button class="btn btn--primary" type="button" data-book data-room="' + r.id + '">' + t('room.bookThis') +
      '</button></div></div>';
    typo($('#roomBody'));
  }
  function galStep(n) {
    if (!roomOpen) return;
    galIdx = (galIdx + n + roomOpen.imgs.length) % roomOpen.imgs.length;
    renderRoomModal();
    refocusIn('#roomBody', '[data-gal-step="' + n + '"]');
  }

  /* ---------- Buchung ---------- */
  function openBooking(preferId) {
    state.prefer = preferId || null;
    roomOpen = null;
    state.step = 1;
    state.room = null;
    if (!state.month) {
      var base = state.from || TODAY;
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
        '<div class="guests" id="guests"></div><div class="board" id="board"></div></div>' +
        '<div class="bk__right" id="bkRooms"></div></div>';
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
    var loc = LOCALE[lang];
    var title = new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric' }).format(m);
    var minMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    var maxMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 12, 1);
    var wd = [], i;
    for (i = 0; i < 7; i++) {
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
        /* ein ausgebuchter Tag darf Abreisetag sein, wenn die Nächte davor frei sind */
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
    renderCal(); renderBoard(); renderRoomList(); renderWidgets();
    typo($('#bookBody'));
    refocus('[data-day="' + s + '"]');
  }

  /* nach dem Neuzeichnen den Fokus auf dem gleichen Bedienelement halten (Tastatur) */
  function refocusIn(root, sel) {
    var el = $(sel, $(root));
    if (el && !el.disabled) el.focus();
  }
  function refocus(sel) { refocusIn('#bookBody', sel); }

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
      for (var a = 0; a <= 14; a++) opts += '<option value="' + a + '"' + (a === age ? ' selected' : '') + '>' + a + '</option>';
      return '<label class="age"><span>' + t('bk.age') + ' ' + (i + 1) + '</span><select data-age="' + i + '">' + opts +
        '</select></label>';
    }).join('');
    $('#guests').innerHTML = '<h3 class="bk__h">' + t('bk.guests') + '</h3>' +
      stepper('adults', state.adults, 1, 4 - state.kids.length, t('bk.adults')) +
      stepper('kids', state.kids.length, 0, Math.min(2, 4 - state.adults), t('bk.kids')) +
      (ages ? '<div class="ages">' + ages + '</div>' : '');
  }

  function renderBoard() {
    var box = $('#board');
    if (!box) return;
    var hbOk = !(state.from && state.to) || hbAllowed(state.from, state.to);
    var cur = currentBoard();
    function opt(v, sub, off) {
      return '<label class="radio' + (off ? ' is-off' : '') + '"><input type="radio" name="board" value="' + v + '"' +
        (cur === v ? ' checked' : '') + (off ? ' disabled' : '') + '><span><b>' + boardLabel(v) + '</b>' +
        (sub ? '<small>' + sub + '</small>' : '') + '</span></label>';
    }
    box.innerHTML = '<h3 class="bk__h">' + t('bk.board') + '</h3>' +
      opt(0, '', false) + opt(1, t('bk.b1p'), false) + opt(2, hbOk ? t('bk.b2p') : t('bk.b2off'), !hbOk);
  }

  function renderRoomList() {
    var box = $('#bkRooms');
    if (!box) return;
    var ready = state.from && state.to;
    var nights = ready ? nightsBetween(state.from, state.to) : 0;
    var board = currentBoard();
    var list = ROOMS.slice().sort(function (a, b) {
      return (b.id === state.prefer) - (a.id === state.prefer);
    });
    var anyFree = false;
    var rows = list.map(function (r) {
      var l = L(r), ok = fits(r), free = ready && ok ? freeIn(r, state.from, state.to) : 0;
      if (free) anyFree = true;
      var right;
      if (!ok) right = '<p class="bkr__state">' + t('bk.small') + '</p>';
      else if (!ready) right = '<p class="bkr__price">' + t('room.from') + ' <b>' + fmtMoney(minRate(season)) + '</b><span>' +
        t('room.unit') + '</span></p>';
      else if (!free) right = '<p class="bkr__state">' + t('bk.busy') + '</p>';
      else right = '<p class="bkr__price"><b>' + fmtMoney(priceFor(state.from, state.to, state.adults, state.kids, board).total) +
        '</b><span>' + t('bk.total') + ' · ' + nightsLabel(nights) + '</span></p>' +
        '<button class="btn btn--primary btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
      var left = ready && ok && free && free <= 2
        ? '<p class="bkr__left">' + (free === 1 ? t('bk.left1') : t('bk.leftN').replace('{n}', free)) + '</p>' : '';
      return '<li class="bkr' + ((ready && ok && !free) || !ok ? ' is-off' : '') + '">' +
        pic(r.imgs[0], imgW(r, 0, false), '', 'bkr__img') +
        '<div class="bkr__info"><h4>' + esc(l.name) + '</h4><p>' + r.size + ' m² · ' + esc(l.cap) + '</p>' + left + '</div>' +
        '<div class="bkr__right">' + right + '</div></li>';
    }).join('');
    var sub = ready
      ? fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + guestsLabel() +
        ' · ' + boardLabel(board)
      : t('bk.pickDates');
    box.innerHTML = '<h3 class="bk__h">' + t('bk.rooms') + '</h3><p class="bk__sub">' + sub + '</p>' +
      '<ul class="bkr-list">' + rows + '</ul>' +
      (ready && !anyFree ? '<p class="bk__none" role="status">' + t('bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.incl') + '. ' + (ready && nights <= 3 ? t('bk.short') + ' ' : '') + t('bk.pay') + '</p>';
  }

  function summaryHtml() {
    var r = state.room, board = currentBoard();
    var p = priceFor(state.from, state.to, state.adults, state.kids, board);
    function line(label, val) { return val ? '<div><dt>' + label + '</dt><dd>' + fmtMoney(val) + '</dd></div>' : ''; }
    return '<aside class="sum"><h3 class="bk__h">' + t('bk.summary') + '</h3>' +
      pic(r.imgs[0], imgW(r, 0, false), '', 'sum__img') +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(L(r).name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' +
      nightsLabel(p.nights) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + guestsLabel() + '</dd></div>' +
      '<div><dt>' + t('bk.board') + '</dt><dd>' + boardLabel(board) + '</dd></div></dl>' +
      '<dl class="sum__calc">' + line(t('bk.l.room'), p.room) + line(t('bk.l.board'), p.board) +
      line(t('bk.l.short'), p.short) + line(t('bk.l.tax'), p.tax) +
      '<div class="sum__total"><dt>' + t('bk.price') + '</dt><dd>' + fmtMoney(p.total) + '</dd></div></dl>' +
      '<p class="bk__fine">' + t('bk.pay') + '</p></aside>';
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
    var no = 'ZW-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + state.adults) % 9000);
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
      var Lf = window.L, pos = [46.94122, 11.02837];
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" ' +
        'href="https://www.openstreetmap.org/?mlat=46.94122&mlon=11.02837#map=14/46.94122/11.02837">' +
        t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(pos, 12);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      Lf.marker(pos).addTo(map).bindPopup('<b>Hotel Gasthof Zwieselstein</b><br>' + t('map.pop'));
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

  function saveForm() {
    var form = $('#bookForm');
    if (!form) return;
    ['name', 'email', 'phone', 'msg'].forEach(function (n) { state.form[n] = form.elements[n].value.trim(); });
  }

  /* ---------- Ereignisse ---------- */
  document.addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-lang]'))) { setLang(el.getAttribute('data-lang')); return; }
    if ((el = e.target.closest('[data-season-set]'))) { setSeason(el.getAttribute('data-season-set')); return; }
    if ((el = e.target.closest('[data-book]'))) {
      toggleMenu(false);
      openBooking(el.getAttribute('data-room'));
      return;
    }
    if ((el = e.target.closest('[data-room-open]'))) { openRoom(el.getAttribute('data-room-open')); return; }
    if ((el = e.target.closest('[data-gal]'))) {
      galIdx = +el.getAttribute('data-gal'); renderRoomModal();
      refocusIn('#roomBody', '[data-gal="' + galIdx + '"]');
      return;
    }
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
      renderCal(); renderBoard(); renderRoomList(); renderWidgets(); typo($('#bookBody')); return;
    }
    if ((el = e.target.closest('[data-step]'))) {
      var d = +el.getAttribute('data-d'), key = el.getAttribute('data-step');
      if (key === 'adults') state.adults = Math.min(4 - state.kids.length, Math.max(1, state.adults + d));
      else if (d > 0 && state.kids.length < 2 && persons() < 4) state.kids.push(8);
      else if (d < 0) state.kids.pop();
      renderGuests(); renderRoomList(); renderWidgets(); typo($('#bookBody'));
      refocus('[data-step="' + key + '"][data-d="' + d + '"]');
      if (!$('#bookBody').contains(document.activeElement)) refocus('[data-step="' + key + '"][data-d="' + (-d) + '"]');
      return;
    }
    if ((el = e.target.closest('[data-pick]'))) {
      state.room = ROOMS.filter(function (r) { return r.id === el.getAttribute('data-pick'); })[0];
      state.board = currentBoard();
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
    var el = e.target.closest('[data-age]');
    if (el) {
      state.kids[+el.getAttribute('data-age')] = +el.value;
      renderRoomList(); typo($('#bookBody'));
      return;
    }
    if (e.target.name === 'board') {
      state.board = +e.target.value;
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
    if (roomOpen && e.key === 'ArrowLeft') galStep(-1);
    if (roomOpen && e.key === 'ArrowRight') galStep(1);
    trapFocus(e);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1100) toggleMenu(false); });

  /* ---------- Start ---------- */
  rememberGerman();
  var q = /[?&]lang=(de|en|nl)/.exec(window.location.search);
  var savedLang = store('zwiesel-lang');
  lang = q ? q[1] : (LANGS.indexOf(savedLang) >= 0 ? savedLang : 'de');
  if (q) store('zwiesel-lang', lang);

  var qs = /[?&]saison=(winter|sommer)/.exec(window.location.search);
  var savedSeason = store('zwiesel-season');
  var mo = TODAY.getMonth();   /* Mai bis September → Sommer, sonst Winter */
  season = qs ? qs[1] : (savedSeason === 'winter' || savedSeason === 'sommer' ? savedSeason
    : (mo >= 4 && mo <= 8 ? 'sommer' : 'winter'));

  applyLang();
  applySeason();
  onScroll();

  /* Für die Prüfung der Preisrechnung in der Konsole */
  window.ZWIESEL.priceFor = function (a, b, adults, kids, board) {
    return priceFor(parseYmd(a), parseYmd(b), adults, kids || [], board || 0);
  };
})();
