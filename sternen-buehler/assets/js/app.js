/* Landgasthof Sternen, Bühler — Beta-Vorschau. Ohne Backend: Verfügbarkeit und Buchung werden im Browser simuliert. */
(function () {
  'use strict';

  var D = window.STERNEN;
  var ROOMS = D.ROOMS;
  var TEL = '+41 71 793 17 58', TEL_HREF = 'tel:+41717931758';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Sprache ---------- */
  var LANGS = ['de', 'en'];
  var LOCALE = { de: 'de-CH', en: 'en-GB' };
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
    document.documentElement.lang = lang === 'de' ? 'de-CH' : lang;
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
    renderMenu();
    renderProg();
    renderRoomRows();
    renderOpen();
    if (!$('#bookModal').hidden) renderBook();
    if (!$('#roomModal').hidden && roomOpen) renderRoomModal();
    typo(document.body);
  }
  function setLang(l) {
    lang = LANGS.indexOf(l) >= 0 ? l : 'de';
    store('sternen-lang', lang);
    applyLang();
  }

  /* ---------- Typografie: kurze Funktionswörter und Zahlen nicht am Zeilenende ---------- */
  var TYPO_WORDS = 'der|die|das|den|dem|des|ein|und|mit|von|vom|bis|für|auf|aus|bei|zum|zur|vor|als|wie|pro|CHF|the|and|for|but|not|per';
  var TYPO_RE = new RegExp('(^|[\\s\\u00a0(«“"])([A-Za-zÀ-ÿ]{1,2}|' + TYPO_WORDS + '|\\d[\\d.,–’]*)[ \\t\\n]+(?=\\S)', 'gi');
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
    return new Intl.DateTimeFormat(LOCALE[lang], o).format(d);
  }
  function fmtMoney(n) {
    return 'CHF\u00a0' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '’');
  }
  var TODAY = (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();

  /* Restaurant-Ruhetage: Dienstag, Mittwoch; ab März 2026 jeder zweite Sonntag im Monat (Website, 16.01.2026).
     Das Hotel nimmt an diesen Tagen Gäste auf (Booking.com: Mittwoch Self-Check-in mit Türcode; local.ch: «7 Tage die Woche»). */
  function secondSunday(d) {
    if (d.getDay() !== 0) return false;
    if (d < new Date(2026, 2, 1)) return false;
    return d.getDate() >= 8 && d.getDate() <= 14;
  }
  function isRuhetag(d) { return d.getDay() === 2 || d.getDay() === 3 || secondSunday(d); }

  /* ---------- Demo-Verfügbarkeit (deterministisch) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function houseFull(d) { return hash(Math.floor(dayIdx(d) / 3) + 57) % 13 === 0; }
  function roomBusy(room, d) {
    if (houseFull(d)) return true;
    var i = ROOMS.indexOf(room);
    return hash(Math.floor((dayIdx(d) + i * 5) / 5) + i * 97) % 7 < room.busy;
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
  var state = { from: null, to: null, adults: 2, u6: 0, c612: 0, c1315: 0, prefer: null, room: null, step: 1, month: null, form: {} };

  function kids() { return state.u6 + state.c612 + state.c1315; }
  function persons() { return state.adults + kids(); }
  function fits(room) {
    var extraAdults = Math.max(0, state.adults - room.adultsMin);
    if (state.adults < room.adultsMin) return false;
    if (room.id === 'einzel') return state.adults === 1 && kids() === 0;
    return extraAdults + kids() <= room.extraMax;
  }
  /* Preis je Nacht: Grundpreis + Zusatzbett Erwachsene + Kinder nach Alter; Familienzimmer höchstens 280 (Preisliste 160–280). */
  function nightly(room) {
    var extraAdults = Math.max(0, state.adults - room.adultsMin);
    var extra = extraAdults * D.EXTRA_ADULT;
    var child = state.c612 * D.CHILD.c612 + state.c1315 * D.CHILD.c1315 + state.u6 * D.CHILD.u6;
    var total = room.base + extra + child;
    if (room.max && total > room.max) { var over = total - room.max; child = Math.max(0, child - over); total = room.max; }
    return { base: room.base, extra: extra, child: child, total: total };
  }
  function costs(room, from, to) {
    var n = nightsBetween(from, to), p = nightly(room);
    var sub = p.total * n, disc = n >= 5 ? Math.round(sub * 0.1) : 0;
    return { nights: n, base: p.base * n, extra: p.extra * n, child: p.child * n, sub: sub, disc: disc, total: sub - disc };
  }
  function personsLabel() {
    var a = state.adults + '\u00a0' + (state.adults === 1 ? t('adult1') : t('adultN'));
    return kids() ? a + ', ' + kids() + '\u00a0' + (kids() === 1 ? t('child1') : t('childN')) : a;
  }
  function nightsLabel(n) { return n + '\u00a0' + (n === 1 ? t('night1') : t('nightN')); }

  /* ---------- Bilder ---------- */
  function pic(img, alt, cls, eager) {
    var name = img[0], w = img[1];
    return '<picture' + (cls ? ' class="' + cls + '"' : '') + '>' +
      '<source type="image/webp" srcset="assets/img/' + name + '-' + w + '.webp">' +
      '<img src="assets/img/' + name + '-' + w + '.jpg" alt="' + esc(alt) + '"' + (eager ? '' : ' loading="lazy"') + '></picture>';
  }
  function roomById(id) { return ROOMS.filter(function (r) { return r.id === id; })[0]; }

  /* ---------- Speisekarte ---------- */
  function renderMenu() {
    var li = lang === 'en' ? 1 : 0;
    D.MENU.forEach(function (g) {
      var box = $('#menu-' + g.id);
      if (!box) return;
      box.innerHTML = g.items.map(function (it) {
        var desc = it[2 + li];
        return '<li><span class="karte__name">' + esc(it[li]) + '</span><span class="karte__price">' + esc(it[4]) + '</span>' +
          (desc ? '<span class="karte__desc">' + esc(desc) + '</span>' : '') + '</li>';
      }).join('');
    });
  }

  /* ---------- Jahresprogramm ---------- */
  function renderProg() {
    var box = $('#programm');
    if (!box) return;
    box.innerHTML = D.PROG.map(function (p) {
      var x = p[lang], past = parseYmd(p.to) < TODAY;
      return '<li' + (past ? ' class="is-past"' : '') + '><span class="programm__date">' + esc(x[0]) + (past ? ' <span class="muted">' + t('prog.past') + '</span>' : '') + '</span>' +
        '<div><h3>' + esc(x[1]) + '</h3><p>' + esc(x[2]) + '</p></div>' +
        '<span class="programm__price">' + esc(p.price) + '</span></li>';
    }).join('');
  }

  /* ---------- Zimmerzeilen ---------- */
  function renderRoomRows() {
    var box = $('#roomRows');
    if (!box) return;
    box.innerHTML = ROOMS.map(function (r) {
      var l = L(r);
      return '<article class="room">' +
        '<button class="room__img" type="button" data-room-open="' + r.id + '" aria-label="' + esc(t('room.details') + ': ' + l.name) + '">' + pic(r.imgs[0], l.alts[0]) + '</button>' +
        '<div class="room__text"><h3>' + esc(l.name) + '</h3><p class="room__cap">' + esc(l.cap) + '</p><p>' + esc(l.short) + '</p>' +
        '<p class="room__price"><b>' + (r.max ? t('room.from') + '\u00a0' : '') + fmtMoney(r.base) + '</b><span>' + t('room.night') + '</span></p>' +
        '<p class="room__actions"><button class="btn btn--primary btn--small" type="button" data-book data-room="' + r.id + '">' + t('room.book') + '</button>' +
        '<button class="link" type="button" data-room-open="' + r.id + '">' + t('room.details') + '</button></p></div></article>';
    }).join('');
  }

  /* ---------- Öffnungsstatus: Do–Mo 9–24 Uhr, Di/Mi Ruhetag, 2. Sonntag im Monat geschlossen ---------- */
  function renderOpen() {
    var el = $('#openNow');
    if (!el) return;
    var now = new Date(), h = now.getHours() + now.getMinutes() / 60;
    var txt, cls = 'is-open';
    if (secondSunday(TODAY)) { txt = t('open.sunday'); cls = 'is-closed'; }
    else if (isRuhetag(TODAY)) { txt = t('open.closed'); cls = 'is-closed'; }
    else if (h < 9) { txt = t('open.before'); cls = 'is-closed'; }
    else txt = t('open.now') + ' · ' + t('open.until').replace('{t}', lang === 'en' ? 'midnight' : '24');
    el.textContent = txt;
    el.className = 'hours__status ' + cls;
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
    roomOpen = null;
    if (lastFocus && lastFocus !== document.body && lastFocus.focus) lastFocus.focus();
    else if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }
  function trapFocus(e) {
    var m = $$('.modal').filter(function (x) { return !x.hidden; })[0];
    if (!m || e.key !== 'Tab') return;
    var f = $$('a[href], button:not([disabled]), input, select, textarea', m).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === $('.modal__dialog', m))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Zimmerdetails ---------- */
  var roomOpen = null, galIdx = 0;
  function openRoom(id, idx) {
    roomOpen = roomById(id);
    galIdx = idx || 0;
    renderRoomModal();
    openModal($('#roomModal'));
  }
  function priceTable(r) {
    var rows = '<tr><th scope="row">' + t('room.p2') + ' · ' + esc(L(r).cap) + '</th><td>' + fmtMoney(r.base) + '</td></tr>';
    if (r.extraMax) rows += '<tr><th scope="row">' + t('room.pExtra') + '</th><td>+ ' + fmtMoney(D.EXTRA_ADULT) + '</td></tr>' +
      '<tr><th scope="row">' + t('room.pChild') + '</th><td>' + t('room.pChildV') + '</td></tr>';
    if (r.max) rows += '<tr><th scope="row">' + t('room.pMax') + '</th><td>' + fmtMoney(r.max) + '</td></tr>';
    return '<table class="rd__prices"><tbody>' + rows + '</tbody></table>';
  }
  function renderRoomModal() {
    var r = roomOpen, l = L(r);
    var thumbs = r.imgs.length > 1 ? r.imgs.map(function (img, i) {
      return '<button type="button" class="gal__thumb' + (i === galIdx ? ' is-active' : '') + '" data-gal="' + i +
        '" aria-label="' + t('room.photo') + ' ' + (i + 1) + '">' + pic(img, '') + '</button>';
    }).join('') : '';
    var nav = r.imgs.length > 1
      ? '<button type="button" class="gal__nav gal__nav--prev" data-gal-step="-1" aria-label="' + t('gal.prev') + '"><svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
        '<button type="button" class="gal__nav gal__nav--next" data-gal-step="1" aria-label="' + t('gal.next') + '"><svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
        '<span class="gal__count">' + (galIdx + 1) + ' / ' + r.imgs.length + '</span>'
      : '';
    $('#roomBody').innerHTML =
      '<div class="rd"><div class="gal"><div class="gal__main">' + pic(r.imgs[galIdx], l.alts[galIdx], '', true) + nav + '</div>' +
      (thumbs ? '<div class="gal__thumbs">' + thumbs + '</div>' : '') + '</div>' +
      '<div class="rd__info"><p class="kicker">' + esc(l.cap) + '</p>' +
      '<h2 class="modal__title" id="roomTitle">' + esc(l.name) + '</h2>' +
      '<p>' + esc(l.text) + '</p>' +
      '<h3 class="rd__sub">' + t('room.equip') + '</h3>' +
      '<ul class="rd__equip">' + l.equip.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>' +
      '<h3 class="rd__sub">' + t('room.prices') + '</h3>' + priceTable(r) +
      '<p class="rd__note">' + t('bk.fine') + '</p>' +
      '<button class="btn btn--primary" type="button" data-book data-room="' + r.id + '">' + t('room.bookThis') + '</button>' +
      '</div></div>';
    typo($('#roomBody'));
  }
  function galStep(n) {
    if (!roomOpen || roomOpen.imgs.length < 2) return;
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
    if (state.prefer === 'einzel') { state.adults = 1; state.u6 = state.c612 = state.c1315 = 0; }
    else if (state.adults < 2) state.adults = 2;
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
      body.innerHTML = '<div class="bk"><div class="bk__left"><div class="cal" id="cal"></div><div class="guests" id="guests"></div></div><div class="bk__right" id="bkRooms"></div></div>';
      renderCal(); renderGuests(); renderRoomList();
    } else if (state.step === 2) body.innerHTML = step2Html();
    else body.innerHTML = step3Html();
    typo(body);
  }
  function renderCal() {
    var m = state.month, y = m.getFullYear(), mo = m.getMonth(), loc = LOCALE[lang];
    var title = new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric' }).format(m);
    var minMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    var maxMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 14, 1);
    var wd = [];
    for (var i = 0; i < 7; i++) wd.push('<span>' + new Intl.DateTimeFormat(loc, { weekday: 'short' }).format(new Date(2024, 0, 1 + i)).slice(0, 2) + '</span>');
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
      if (!dis && isRuhetag(date)) cls += ' is-ruhe';
      if (state.from && +date === +state.from) cls += ' is-start';
      if (state.to && +date === +state.to) cls += ' is-end';
      if (state.from && state.to && date > state.from && date < state.to) cls += ' is-in';
      if (+date === +TODAY) cls += ' is-today';
      cells += '<button type="button" class="' + cls + '" data-day="' + ymd(date) + '"' + (dis ? ' disabled' : '') +
        ' aria-label="' + fmtDate(date, true) + (isRuhetag(date) ? ' · ' + t('cal.ruhe') : '') + '">' + d + '</button>';
    }
    var hint = !state.from ? t('cal.hintIn') : (!state.to ? t('cal.hintOut')
      : fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nightsBetween(state.from, state.to)));
    $('#cal').innerHTML =
      '<div class="cal__head"><button type="button" class="cal__nav" data-cal="-1" aria-label="' + t('cal.prev') + '"' + (m <= minMonth ? ' disabled' : '') +
      '><svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<p class="cal__title" aria-live="polite">' + title + '</p>' +
      '<button type="button" class="cal__nav" data-cal="1" aria-label="' + t('cal.next') + '"' + (m >= maxMonth ? ' disabled' : '') +
      '><svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button></div>' +
      '<div class="cal__wd" aria-hidden="true">' + wd.join('') + '</div><div class="cal__grid">' + cells + '</div>' +
      '<p class="cal__hint" aria-live="polite">' + hint + (state.from ? ' <button type="button" class="link" data-cal-reset>' + t('cal.reset') + '</button>' : '') + '</p>' +
      '<ul class="cal__legend"><li class="lg-free">' + t('cal.free') + '</li><li class="lg-busy">' + t('cal.busy') + '</li><li class="lg-ruhe">' + t('cal.ruhe') + '</li><li class="lg-sel">' + t('cal.sel') + '</li></ul>' +
      (state.from && state.from.getDay() === 3 ? '<p class="bk__fine">' + t('bk.ruheNote') + '</p>' : '');
  }
  function pickDay(s) {
    var d = parseYmd(s);
    if (!state.from || state.to || d <= state.from || rangeHasFull(state.from, d)) {
      if (houseFull(d)) return;
      state.from = d; state.to = null;
    } else state.to = d;
    renderCal(); renderRoomList();
    typo($('#bookBody'));
    refocusIn('#bookBody', '[data-day="' + s + '"]');
  }
  function refocusIn(box, sel) { var el = $(sel, $(box)); if (el && !el.disabled) el.focus(); }

  function stepper(key, label, note, min, max) {
    var val = state[key];
    return '<div class="stepper"><span class="stepper__label">' + label + '<small>' + note + '</small></span><span class="stepper__ctl">' +
      '<button type="button" data-step="' + key + '" data-dir="-1" aria-label="' + label + ': ' + t('bk.less') + '"' + (val <= min ? ' disabled' : '') + '>−</button>' +
      '<output aria-live="polite">' + val + '</output>' +
      '<button type="button" data-step="' + key + '" data-dir="1" aria-label="' + label + ': ' + t('bk.more') + '"' + (val >= max ? ' disabled' : '') + '>+</button></span></div>';
  }
  function renderGuests() {
    $('#guests').innerHTML = '<h3 class="bk__h">' + t('bk.guests') + '</h3>' +
      stepper('adults', t('bk.adults'), t('bk.adultsNote'), 1, 4) +
      stepper('u6', t('bk.u6'), t('bk.u6Note'), 0, 2) +
      stepper('c612', t('bk.c612'), t('bk.c612Note'), 0, 2) +
      stepper('c1315', t('bk.c1315'), t('bk.c1315Note'), 0, 2);
  }
  function renderRoomList() {
    var box = $('#bkRooms');
    if (!box) return;
    var ready = state.from && state.to;
    var nights = ready ? nightsBetween(state.from, state.to) : 0;
    var list = ROOMS.slice().sort(function (a, b) {
      return (b.id === state.prefer) - (a.id === state.prefer) || fits(b) - fits(a);
    });
    var anyFree = false;
    var rows = list.map(function (r) {
      var l = L(r), ok = fits(r), right, off = false;
      if (!ok) { right = '<p class="bkr__state">' + t('bk.small') + '</p>'; off = true; }
      else if (!ready) {
        right = '<p class="bkr__price"><b>' + fmtMoney(nightly(r).total) + '</b><span>' + t('room.night') + '</span></p>';
      } else if (!roomFree(r, state.from, state.to)) { right = '<p class="bkr__state">' + t('bk.busy') + '</p>'; off = true; }
      else {
        anyFree = true;
        var c = costs(r, state.from, state.to);
        right = '<p class="bkr__price"><b>' + fmtMoney(c.total) + '</b><span>' + t('bk.total') + ' · ' + nightsLabel(nights) + '</span></p>' +
          '<button class="btn btn--primary btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
      }
      return '<li class="bkr' + (off ? ' is-off' : '') + '">' + pic(r.imgs[0], '', 'bkr__img') +
        '<div class="bkr__info"><h4>' + esc(l.name) + '</h4><p>' + esc(l.cap) + '</p></div><div class="bkr__right">' + right + '</div></li>';
    }).join('');
    var sub = ready
      ? fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + personsLabel()
      : t('bk.pickDates');
    box.innerHTML = '<h3 class="bk__h">' + t('bk.rooms') + '</h3><p class="bk__sub">' + sub + '</p><ul class="bkr-list">' + rows + '</ul>' +
      (ready && !anyFree ? '<p class="bk__none" role="status">' + t('bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.fine') + '</p>';
  }
  function summaryHtml() {
    var r = state.room, c = costs(r, state.from, state.to), p = nightly(r);
    return '<aside class="sum"><h3 class="bk__h">' + t('bk.summary') + '</h3>' + pic(r.imgs[0], '', 'sum__img') +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(L(r).name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(c.nights) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + personsLabel() + '</dd></div>' +
      '<div class="sum__line"><dt>' + t('bk.lineRoom') + '<small>' + c.nights + ' × ' + fmtMoney(p.base) + '</small></dt><dd>' + fmtMoney(c.base) + '</dd></div>' +
      (c.extra ? '<div class="sum__line"><dt>' + t('bk.lineExtra') + '<small>' + c.nights + ' × ' + fmtMoney(p.extra) + '</small></dt><dd>' + fmtMoney(c.extra) + '</dd></div>' : '') +
      (c.child ? '<div class="sum__line"><dt>' + t('bk.lineChild') + '<small>' + c.nights + ' × ' + fmtMoney(p.child) + '</small></dt><dd>' + fmtMoney(c.child) + '</dd></div>' : '') +
      (c.disc ? '<div class="sum__line"><dt>' + t('bk.lineDisc') + '</dt><dd>− ' + fmtMoney(c.disc) + '</dd></div>' : '') +
      '<div class="sum__total"><dt>' + t('bk.price') + '</dt><dd>' + fmtMoney(c.total) + '</dd></div></dl>' +
      '<p class="bk__fine">' + t('bk.fine') + '</p></aside>';
  }
  function field(name, type, label, auto, required) {
    var v = state.form[name] || '';
    var tag = type === 'textarea'
      ? '<textarea id="f-' + name + '" name="' + name + '" rows="3">' + esc(v) + '</textarea>'
      : '<input id="f-' + name + '" name="' + name + '" type="' + type + '" value="' + esc(v) + '" autocomplete="' + auto + '"' +
        (required ? ' required aria-describedby="e-' + name + '"' : '') + '>';
    return '<div class="field"><label for="f-' + name + '">' + label + (required ? ' *' : '') + '</label>' + tag +
      (required ? '<p class="field__err" id="e-' + name + '" hidden></p>' : '') + '</div>';
  }
  function step2Html() {
    return '<div class="bk bk--form"><form class="form" id="bookForm" novalidate>' +
      field('name', 'text', t('f.name'), 'name', true) + field('email', 'email', t('f.email'), 'email', true) +
      field('phone', 'tel', t('f.phone'), 'tel', true) + field('msg', 'textarea', t('f.msg'), 'off', false) +
      '<div class="field field--check"><input id="f-consent" name="consent" type="checkbox" aria-describedby="e-consent">' +
      '<label for="f-consent">' + t('f.consent') + '</label><p class="field__err" id="e-consent" hidden></p></div>' +
      '<div class="form__actions"><button class="link" type="button" data-back>' + t('bk.back') + '</button>' +
      '<button class="btn btn--primary" type="submit">' + t('f.submit') + '</button></div></form>' + summaryHtml() + '</div>';
  }
  function step3Html() {
    var no = 'ST-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + persons()) % 9000);
    return '<div class="ok"><h3 class="ok__title">' + esc(t('ok.title').replace('{name}', state.form.name.split(' ')[0])) + '</h3>' +
      '<p>' + esc(t('ok.text').replace('{email}', state.form.email)) + '</p>' +
      '<p class="ok__no">' + t('ok.no') + ': <b>' + no + '</b></p>' + summaryHtml() +
      '<p class="ok__demo">' + t('ok.demo') + '</p>' +
      '<button class="btn btn--primary" type="button" data-close>' + t('ok.close') + '</button></div>';
  }
  function validate(form) {
    var ok = true, first = null;
    function check(name, valid, msg) {
      var el = form.elements[name], err = $('#e-' + name, form);
      err.hidden = valid; err.textContent = valid ? '' : msg;
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
      var Lf = window.L, pos = [47.3731522, 9.4175641];
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/?mlat=47.37315&mlon=9.41756#map=16/47.37315/9.41756">' + t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(pos, 15);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      Lf.marker(pos).addTo(map).bindPopup('<b>Landgasthof Sternen</b><br>Dorfstrasse 97, 9055 Bühler');
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
    if ((el = e.target.closest('[data-book]'))) { toggleMenu(false); openBooking(el.getAttribute('data-room')); return; }
    if ((el = e.target.closest('[data-room-open]'))) { openRoom(el.getAttribute('data-room-open'), 0); return; }
    if ((el = e.target.closest('[data-gal]'))) { galIdx = +el.getAttribute('data-gal'); renderRoomModal(); refocusIn('#roomBody', '[data-gal="' + galIdx + '"]'); return; }
    if ((el = e.target.closest('[data-gal-step]'))) { galStep(+el.getAttribute('data-gal-step')); return; }
    if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) { closeModals(); return; }
    if ((el = e.target.closest('[data-day]'))) { pickDay(el.getAttribute('data-day')); return; }
    if ((el = e.target.closest('[data-cal]'))) {
      state.month = new Date(state.month.getFullYear(), state.month.getMonth() + (+el.getAttribute('data-cal')), 1);
      renderCal(); refocusIn('#bookBody', '[data-cal="' + el.getAttribute('data-cal') + '"]'); return;
    }
    if (e.target.closest('[data-cal-reset]')) { state.from = state.to = null; renderCal(); renderRoomList(); typo($('#bookBody')); return; }
    if ((el = e.target.closest('[data-step]'))) {
      var key = el.getAttribute('data-step'), dir = +el.getAttribute('data-dir');
      var lim = { adults: [1, 4], u6: [0, 2], c612: [0, 2], c1315: [0, 2] }[key];
      state[key] = Math.min(lim[1], Math.max(lim[0], state[key] + dir));
      renderGuests(); renderRoomList(); typo($('#bookBody')); refocusIn('#bookBody', '[data-step="' + key + '"][data-dir="' + dir + '"]'); return;
    }
    if ((el = e.target.closest('[data-pick]'))) {
      state.room = roomById(el.getAttribute('data-pick'));
      state.step = 2; renderBook();
      var f = $('#f-name'); if (f) f.focus({ preventScroll: true });
      $('#bookModal').scrollTop = 0; return;
    }
    if (e.target.closest('[data-back]')) { saveForm(); state.step = 1; renderBook(); $('#bookModal').scrollTop = 0; return; }
    if (e.target.closest('#menuBtn')) { toggleMenu($('#menu').hidden); return; }
    if (e.target.closest('#menu a')) { toggleMenu(false); return; }
    if (e.target.closest('#mapLoad')) { loadMap(); return; }
  });
  document.addEventListener('submit', function (e) {
    if (e.target.id !== 'bookForm') return;
    e.preventDefault();
    if (!validate(e.target)) return;
    saveForm();
    state.step = 3; renderBook();
    $('#bookModal .modal__dialog').focus({ preventScroll: true });
    $('#bookModal').scrollTop = 0;
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
  var q = /[?&]lang=(de|en)\b/.exec(window.location.search);
  var saved = store('sternen-lang');
  lang = q ? q[1] : (LANGS.indexOf(saved) >= 0 ? saved : 'de');
  if (q) store('sternen-lang', lang);
  applyLang();
  onScroll();
  setInterval(renderOpen, 60000);
})();
