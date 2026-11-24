/* Hotel Wildhorn, Lauenen — Beta-Vorschau. Ohne Backend: Verfügbarkeit und Buchung werden im Browser simuliert. */
(function () {
  'use strict';

  var D = window.WILDHORN;
  var ROOMS = D.ROOMS;
  var MAX_PERSONS = 3;
  var TEL = '+41 33 765 30 12', TEL_HREF = 'tel:+41337653012';
  var MAIL = 'hotel@wildhorn.ch';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Sprache ---------- */
  var LANGS = ['de', 'en', 'fr'];
  var LOCALE = { de: 'de-CH', en: 'en-GB', fr: 'fr-CH' };
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
    renderRoomTiles();
    renderOpen();
    if (!$('#bookModal').hidden) renderBook();
    if (!$('#roomModal').hidden && roomOpen) renderRoomModal();
    typo(document.body);
  }
  function setLang(l) {
    lang = LANGS.indexOf(l) >= 0 ? l : 'de';
    store('wildhorn-lang', lang);
    applyLang();
  }

  /* ---------- Typografie: kurze Funktionswörter und Zahlen nicht am Zeilenende ---------- */
  var TYPO_WORDS = 'der|die|das|den|dem|des|ein|und|mit|von|vom|bis|für|auf|aus|bei|zum|zur|vor|als|wie|pro|CHF|' +
    'les|des|une|aux|sur|par|dès|the|and|for|but|not|per';
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
      if (lang === 'fr') s = s.replace(/ ([:;!?»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
      if (s !== n.nodeValue) n.nodeValue = s;
    }
  }

  /* ---------- Datum, Geld, Saison ---------- */
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

  function inRange(d, r) { var s = ymd(d); return s >= r.from && s <= r.to; }
  function seasonOf(d) {
    for (var i = 0; i < D.SEASONS.length; i++) if (inRange(d, D.SEASONS[i])) return D.SEASONS[i].s;
    return null;
  }
  function isClosed(d) {
    for (var i = 0; i < D.CLOSED.length; i++) if (inRange(d, D.CLOSED[i])) return true;
    return false;
  }

  /* ---------- Demo-Verfügbarkeit (deterministisch) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function houseFull(d) { return isClosed(d) || hash(Math.floor(dayIdx(d) / 4) + 91) % 11 === 0; }
  function roomBusy(room, d) {
    if (houseFull(d)) return true;
    var i = ROOMS.indexOf(room);
    return hash(Math.floor((dayIdx(d) + i * 4) / 6) + i * 131) % 7 < room.busy;
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
  var state = { from: null, to: null, persons: 2, prefer: null, room: null, step: 1, month: null, form: {} };

  function fits(room, persons) { return persons <= room.max; }
  function nightly(room, persons, d) {
    var s = seasonOf(d);
    if (!s) return null;
    var base = room.prices[Math.min(persons, 2)];
    if (!base) return null;
    return base[s] + (persons > 2 ? room.extra : 0);
  }
  /* Kosten über den Zeitraum: Zimmerpreis je Nacht nach Saison, Zusatzbett separat */
  function costs(room, from, to, persons) {
    var r = 0, x = 0, zw = 0, sa = 0, ok = true;
    for (var d = from; d < to; d = addDays(d, 1)) {
      var s = seasonOf(d);
      if (!s || !room.prices[Math.min(persons, 2)]) { ok = false; break; }
      r += room.prices[Math.min(persons, 2)][s];
      if (persons > 2) x += room.extra;
      if (s === 'zwischen') zw++; else sa++;
    }
    return { ok: ok, room: r, extra: x, total: r + x, zw: zw, sa: sa };
  }
  function personsLabel(n) { return n + '\u00a0' + (n === 1 ? t('person1') : t('personN')); }
  function nightsLabel(n) { return n + '\u00a0' + (n === 1 ? t('night1') : t('nightN')); }

  /* ---------- Bilder ---------- */
  function pic(name, w, alt, cls, eager) {
    return '<picture' + (cls ? ' class="' + cls + '"' : '') + '>' +
      '<source type="image/webp" srcset="assets/img/' + name + '-' + w + '.webp">' +
      '<img src="assets/img/' + name + '-' + w + '.jpg" alt="' + esc(alt) + '"' +
      (eager ? '' : ' loading="lazy"') + '></picture>';
  }
  function roomById(id) { return ROOMS.filter(function (r) { return r.id === id; })[0]; }

  /* ---------- Karte (Speisekarte) ---------- */
  function renderMenu() {
    var li = { de: 0, en: 1, fr: 2 }[lang];
    D.MENU.forEach(function (g) {
      var box = $('#menu-' + g.id);
      if (!box) return;
      box.innerHTML = g.items.map(function (it) {
        return '<li><span class="karte__name">' + esc(it[li]) + '</span><span class="karte__dots" aria-hidden="true"></span>' +
          '<span class="karte__price">' + esc(it[3]) + '</span></li>';
      }).join('');
    });
  }

  /* ---------- Zimmer-Kacheln ---------- */
  function renderRoomTiles() {
    var box = $('#roomTiles');
    if (!box) return;
    box.innerHTML = ROOMS.map(function (r) {
      var l = L(r);
      return '<article class="tile tile--' + r.id + '">' +
        '<button class="tile__img" type="button" data-room-open="' + r.id + '" aria-label="' + esc(t('room.details') + ': ' + l.name) + '">' +
        pic(r.imgs[0], r.id === 'standard' ? 1400 : 800, l.alts[0]) + '</button>' +
        '<div class="tile__text"><h3>' + esc(l.name) + '</h3><p>' + esc(l.cap) + '</p>' +
        '<p class="tile__short">' + esc(l.short) + '</p>' +
        '<p class="tile__actions"><button class="link" type="button" data-room-open="' + r.id + '">' + t('room.details') + '</button>' +
        '<button class="btn btn--small" type="button" data-book data-room="' + r.id + '">' + t('room.book') + '</button></p></div></article>';
    }).join('');
  }

  /* ---------- Öffnungsstatus (Kontaktseite wildhorn.ch, gstaad.ch) ---------- */
  function renderOpen() {
    var el = $('#openNow');
    if (!el) return;
    var now = new Date(), day = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
    var txt, cls = 'is-open';
    /* nach Mitternacht bis 0.30 zählt noch zum Freitag/Samstag */
    if (h < 0.5 && (day === 6 || day === 0)) { txt = t('open.now') + ' · ' + t('open.until').replace('{t}', '0.30'); }
    else if (isClosed(TODAY)) { txt = t('open.holiday'); cls = 'is-closed'; }
    else if (day === 1) { txt = t('open.closed'); cls = 'is-closed'; }
    else if (h < 8) { txt = t('open.before'); cls = 'is-closed'; }
    else {
      var end = (day === 5 || day === 6) ? 24.5 : 23.5;
      if (h < end) txt = t('open.now') + ' · ' + t('open.until').replace('{t}', end === 24.5 ? '0.30' : '23.30');
      else { txt = t('open.after'); cls = 'is-closed'; }
    }
    el.textContent = txt;
    el.className = 'open ' + cls;
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
    var rows = Object.keys(r.prices).map(function (n) {
      return '<tr><th scope="row">' + t('room.p' + n) + '</th><td>' + fmtMoney(r.prices[n].zwischen) + '</td><td>' + fmtMoney(r.prices[n].saison) + '</td></tr>';
    }).join('');
    return '<table class="rd__prices"><thead><tr><th></th><th scope="col">' + t('room.zw') + '</th><th scope="col">' + t('room.sa') + '</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }
  function renderRoomModal() {
    var r = roomOpen, l = L(r);
    var thumbs = r.imgs.length > 1 ? r.imgs.map(function (n, i) {
      return '<button type="button" class="gal__thumb' + (i === galIdx ? ' is-active' : '') + '" data-gal="' + i +
        '" aria-label="' + t('room.photo') + ' ' + (i + 1) + '">' + pic(n, 800, '') + '</button>';
    }).join('') : '';
    var nav = r.imgs.length > 1
      ? '<button type="button" class="gal__nav gal__nav--prev" data-gal-step="-1" aria-label="' + t('gal.prev') + '"><svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
        '<button type="button" class="gal__nav gal__nav--next" data-gal-step="1" aria-label="' + t('gal.next') + '"><svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
        '<span class="gal__count">' + (galIdx + 1) + ' / ' + r.imgs.length + '</span>'
      : '';
    $('#roomBody').innerHTML =
      '<div class="rd"><div class="gal"><div class="gal__main">' + pic(r.imgs[galIdx], 1400, l.alts[galIdx], '', true) + nav + '</div>' +
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
    if (state.prefer) {
      var pr = roomById(state.prefer);
      if (pr && state.persons > pr.max) state.persons = pr.max;
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
      else if (isClosed(date)) { dis = true; cls += ' is-closed'; }
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
      '<div class="cal__head"><button type="button" class="cal__nav" data-cal="-1" aria-label="' + t('cal.prev') + '"' + (m <= minMonth ? ' disabled' : '') +
      '><svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<p class="cal__title" aria-live="polite">' + title + '</p>' +
      '<button type="button" class="cal__nav" data-cal="1" aria-label="' + t('cal.next') + '"' + (m >= maxMonth ? ' disabled' : '') +
      '><svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button></div>' +
      '<div class="cal__wd" aria-hidden="true">' + wd.join('') + '</div><div class="cal__grid">' + cells + '</div>' +
      '<p class="cal__hint" aria-live="polite">' + hint + (state.from ? ' <button type="button" class="link" data-cal-reset>' + t('cal.reset') + '</button>' : '') + '</p>' +
      '<ul class="cal__legend"><li class="lg-free">' + t('cal.free') + '</li><li class="lg-busy">' + t('cal.busy') + '</li><li class="lg-closed">' + t('cal.closed') + '</li><li class="lg-sel">' + t('cal.sel') + '</li></ul>';
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

  function renderGuests() {
    var label = t('bk.persons'), val = state.persons;
    $('#guests').innerHTML = '<h3 class="bk__h">' + t('bk.guests') + '</h3>' +
      '<div class="stepper"><span class="stepper__label">' + label + '</span><span class="stepper__ctl">' +
      '<button type="button" data-step="-1" aria-label="' + label + ': ' + t('bk.less') + '"' + (val <= 1 ? ' disabled' : '') + '>−</button>' +
      '<output aria-live="polite">' + val + '</output>' +
      '<button type="button" data-step="1" aria-label="' + label + ': ' + t('bk.more') + '"' + (val >= MAX_PERSONS ? ' disabled' : '') + '>+</button></span></div>' +
      '<p class="bk__fine">' + t('bk.extraNote') + '</p>';
  }
  function renderRoomList() {
    var box = $('#bkRooms');
    if (!box) return;
    var ready = state.from && state.to;
    var nights = ready ? nightsBetween(state.from, state.to) : 0;
    var list = ROOMS.slice().sort(function (a, b) {
      return (b.id === state.prefer) - (a.id === state.prefer) || fits(b, state.persons) - fits(a, state.persons);
    });
    var anyFree = false;
    var rows = list.map(function (r) {
      var l = L(r), ok = fits(r, state.persons), right, off = false;
      if (!ok) { right = '<p class="bkr__state">' + t('bk.small') + '</p>'; off = true; }
      else if (!ready) {
        var p = r.prices[Math.min(state.persons, 2)];
        var lo = p.zwischen + (state.persons > 2 ? r.extra : 0);
        right = '<p class="bkr__price"><b>' + fmtMoney(lo) + '</b><span>' + t('room.night') + ' · ' + t('room.zw') + '</span></p>';
      } else {
        var c = costs(r, state.from, state.to, state.persons);
        if (!c.ok) { right = '<p class="bkr__state">' + t('bk.noprice') + '</p><a class="link" href="' + TEL_HREF + '">' + TEL + '</a>'; off = true; }
        else if (!roomFree(r, state.from, state.to)) { right = '<p class="bkr__state">' + t('bk.busy') + '</p>'; off = true; }
        else {
          anyFree = true;
          right = '<p class="bkr__price"><b>' + fmtMoney(c.total) + '</b><span>' + t('bk.total') + ' · ' + nightsLabel(nights) + '</span></p>' +
            '<button class="btn btn--primary btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
        }
      }
      return '<li class="bkr' + (off ? ' is-off' : '') + '">' + pic(r.imgs[0], 800, '', 'bkr__img') +
        '<div class="bkr__info"><h4>' + esc(l.name) + '</h4><p>' + esc(l.cap) + '</p></div><div class="bkr__right">' + right + '</div></li>';
    }).join('');
    var sub = ready
      ? fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + personsLabel(state.persons)
      : t('bk.pickDates');
    box.innerHTML = '<h3 class="bk__h">' + t('bk.rooms') + '</h3><p class="bk__sub">' + sub + '</p><ul class="bkr-list">' + rows + '</ul>' +
      (ready && !anyFree ? '<p class="bk__none" role="status">' + t('bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.fine') + '</p>';
  }
  function summaryHtml() {
    var r = state.room, nights = nightsBetween(state.from, state.to);
    var c = costs(r, state.from, state.to, state.persons);
    var mix = (c.zw ? c.zw + ' × ' + t('bk.nightsZw') : '') + (c.zw && c.sa ? ', ' : '') + (c.sa ? c.sa + ' × ' + t('bk.nightsSa') : '');
    return '<aside class="sum"><h3 class="bk__h">' + t('bk.summary') + '</h3>' + pic(r.imgs[0], 800, '', 'sum__img') +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(L(r).name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + personsLabel(state.persons) + '</dd></div>' +
      '<div class="sum__line"><dt>' + t('bk.lineRoom') + '<small>' + mix + '</small></dt><dd>' + fmtMoney(c.room) + '</dd></div>' +
      (c.extra ? '<div class="sum__line"><dt>' + t('bk.lineExtra') + '<small>' + nights + ' × ' + fmtMoney(r.extra) + '</small></dt><dd>' + fmtMoney(c.extra) + '</dd></div>' : '') +
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
    var no = 'WH-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + state.persons) % 9000);
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
      var Lf = window.L, pos = [46.4242, 7.3224];
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/?mlat=46.4242&mlon=7.3224#map=16/46.4242/7.3224">' + t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(pos, 15);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      Lf.marker(pos).addTo(map).bindPopup('<b>Hotel Wildhorn</b><br>Dorfstrasse 4, 3782 Lauenen');
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
      var d = +el.getAttribute('data-step');
      state.persons = Math.min(MAX_PERSONS, Math.max(1, state.persons + d));
      renderGuests(); renderRoomList(); typo($('#bookBody')); refocusIn('#bookBody', '[data-step="' + d + '"]'); return;
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
  window.addEventListener('resize', function () { if (window.innerWidth >= 1000) toggleMenu(false); });

  /* ---------- Start ---------- */
  rememberGerman();
  var q = /[?&]lang=(de|en|fr)\b/.exec(window.location.search);
  var saved = store('wildhorn-lang');
  lang = q ? q[1] : (LANGS.indexOf(saved) >= 0 ? saved : 'de');
  if (q) store('wildhorn-lang', lang);
  applyLang();
  onScroll();
  setInterval(renderOpen, 60000);
})();
