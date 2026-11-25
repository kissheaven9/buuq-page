/* ALATSEE Hotel & Restaurant, Füssen — Beta-Vorschau. Ohne Backend: Verfügbarkeit und Anfrage werden im Browser simuliert.
   Zimmerpreise veröffentlicht das Haus nicht — die Vorschau arbeitet darum als Anfrage („Preise auf Anfrage“). */
(function () {
  'use strict';

  var D = window.ALATSEE;
  var ROOMS = D.ROOMS;
  var TEL = '+49 8362 6205', TEL_HREF = 'tel:+4983626205';
  var LAT = 47.5615, LON = 10.6437;
  var LOCALE = 'de-DE';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function t(key) { return D.UI[key] !== undefined ? D.UI[key] : key; }

  /* ---------- Typografie: kurze Funktionswörter und Zahlen nicht am Zeilenende ---------- */
  var TYPO_WORDS = 'der|die|das|den|dem|des|ein|und|mit|von|vom|bis|für|auf|aus|bei|zum|zur|vor|als|wie|pro|am|im|an';
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
      do { prev = s; s = s.replace(TYPO_RE, '$1$2 '); pass++; } while (s !== prev && pass < 3);
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
    return new Intl.DateTimeFormat(LOCALE, o).format(d);
  }
  var TODAY = (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();

  /* ---------- Demo-Verfügbarkeit (deterministisch) ---------- */
  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function houseFull(d) {
    /* Betriebsurlaub 9.11.–3.12.2026: das Haus ist geschlossen (Zimmeranfragen nur per E-Mail) */
    if (d >= new Date(2026, 10, 9) && d <= new Date(2026, 11, 3)) return true;
    return hash(Math.floor(dayIdx(d) / 4) + 57) % 13 === 0;
  }
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

  /* ---------- Belegung ---------- */
  var state = { from: null, to: null, adults: 2, kids: [], hp: false, prefer: null, room: null, step: 1, month: null, form: {} };

  function fits(room) { return state.adults <= room.adults && state.kids.length <= room.kids; }
  function adultsLabel(n) { return n + ' ' + (n === 1 ? t('adult1') : t('adultN')); }
  function kidsLabel(n) { return n + ' ' + (n === 1 ? t('kid1') : t('kidN')); }
  function guestsLabel() { return adultsLabel(state.adults) + (state.kids.length ? ', ' + kidsLabel(state.kids.length) : ''); }
  function nightsLabel(n) { return n + ' ' + (n === 1 ? t('night1') : t('nightN')); }

  /* ---------- Bilder: Dateinamen enthalten die Größe bereits ---------- */
  function pic(name, alt, cls, eager) {
    return '<picture' + (cls ? ' class="' + cls + '"' : '') + '>' +
      '<source type="image/webp" srcset="assets/img/' + name + '.webp">' +
      '<img src="assets/img/' + name + '.jpg" alt="' + esc(alt) + '"' +
      (eager ? '' : ' loading="lazy"') + '></picture>';
  }
  function roomById(id) { return ROOMS.filter(function (r) { return r.id === id; })[0]; }

  /* ---------- Öffnungsstatus Restaurant (hotel-alatsee.de, Stand 24.11.2026) ----------
     Mo/Di 11–17:30, Mi–So 11–20 Uhr. Dezember bis April: Dienstag Ruhetag
     (zwischen Weihnachten und Neujahr kein Ruhetag). Betriebsurlaub 9.11.–3.12.2026. */
  var HOURS = { 0: [11, 20], 1: [11, 17.5], 2: [11, 17.5], 3: [11, 20], 4: [11, 20], 5: [11, 20], 6: [11, 20] };
  var URLAUB_VON = new Date(2026, 10, 9), URLAUB_BIS = new Date(2026, 11, 3);
  function hm(h) {
    var hh = Math.floor(h), mm = Math.round((h - hh) * 60);
    return hh + (mm ? ':' + ('0' + mm).slice(-2) : '') + ' Uhr';
  }
  function isRuhetag(d) {
    if (d.getDay() !== 2) return false;
    var m = d.getMonth(); /* Dez–Apr */
    if (m !== 11 && m > 3) return false;
    var md = (d.getMonth() + 1) * 100 + d.getDate(); /* zwischen Weihnachten und Neujahr kein Ruhetag */
    if (md >= 1225 || md <= 101) return false;
    return true;
  }
  function renderOpen() {
    var el = $('#openNow');
    if (!el) return;
    var now = new Date(), day = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var o = HOURS[day], txt, cls = 'is-open';
    if (today >= URLAUB_VON && today <= URLAUB_BIS) { txt = t('open.urlaub'); cls = 'is-closed'; }
    else if (isRuhetag(today)) { txt = t('open.closed'); cls = 'is-closed'; }
    else if (h < o[0]) { txt = t('open.before').replace('{t}', hm(o[0])); cls = 'is-closed'; }
    else if (h < o[1]) { txt = t('open.now') + ' · ' + t('open.until').replace('{t}', hm(o[1])); }
    else { txt = t('open.after'); cls = 'is-closed'; }
    el.textContent = txt;
    el.className = 'open ' + cls;
  }

  /* ---------- Sonnenauf- und -untergang (Sunrise-Equation, Koordinaten Am Alatsee 1) ---------- */
  function sunTime(date, rising) {
    var rad = Math.PI / 180, zen = 90.833;
    var start = Date.UTC(date.getFullYear(), 0, 1), n = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 864e5) + 1;
    var lngH = LON / 15, tt = n + ((rising ? 6 : 18) - lngH) / 24;
    var M = 0.9856 * tt - 3.289;
    var Lsun = (M + 1.916 * Math.sin(M * rad) + 0.020 * Math.sin(2 * M * rad) + 282.634 + 720) % 360;
    var RA = (Math.atan(0.91764 * Math.tan(Lsun * rad)) / rad + 360) % 360;
    RA = RA + (Math.floor(Lsun / 90) * 90 - Math.floor(RA / 90) * 90);
    RA /= 15;
    var sinDec = 0.39782 * Math.sin(Lsun * rad), cosDec = Math.cos(Math.asin(sinDec));
    var cosH = (Math.cos(zen * rad) - sinDec * Math.sin(LAT * rad)) / (cosDec * Math.cos(LAT * rad));
    if (cosH > 1 || cosH < -1) return null;
    var H = (rising ? 360 - Math.acos(cosH) / rad : Math.acos(cosH) / rad) / 15;
    var T = H + RA - 0.06571 * tt - 6.622;
    var UT = ((T - lngH) % 24 + 24) % 24;
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, Math.round(UT * 60)));
  }
  function renderSun() {
    var el = $('#sunToday');
    if (!el) return;
    var now = new Date(), r = sunTime(now, true), s = sunTime(now, false);
    if (!r || !s) { el.hidden = true; return; }
    var f = new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' });
    el.innerHTML = '<span>' + t('sun.rise') + ' ' + f.format(r) + '</span><span>' + t('sun.set') + ' ' + f.format(s) + '</span><small>' + t('sun.today') + '</small>';
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
  function priceTable() {
    var rows = '<tr><th scope="row">' + t('room.pRoom') + '</th><td><b>' + t('room.pOnReq') + '</b></td></tr>' +
      '<tr><th scope="row">' + t('room.pHp') + '</th><td>' + t('room.pHpV') + '</td></tr>';
    return '<table class="rd__prices"><caption>' + t('room.prices') + '</caption><tbody>' + rows + '</tbody></table>';
  }
  function renderRoomModal() {
    var r = roomOpen;
    var thumbs = r.imgs.length > 1 ? r.imgs.map(function (n, i) {
      return '<button type="button" class="gal__thumb' + (i === galIdx ? ' is-active' : '') + '" data-gal="' + i +
        '" aria-label="' + t('room.photo') + ' ' + (i + 1) + '">' + pic(n, '') + '</button>';
    }).join('') : '';
    var nav = r.imgs.length > 1
      ? '<button type="button" class="gal__nav gal__nav--prev" data-gal-step="-1" aria-label="' + t('gal.prev') + '"><svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
        '<button type="button" class="gal__nav gal__nav--next" data-gal-step="1" aria-label="' + t('gal.next') + '"><svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button>' +
        '<span class="gal__count">' + (galIdx + 1) + ' / ' + r.imgs.length + '</span>'
      : '';
    $('#roomBody').innerHTML =
      '<div class="rd"><div class="gal"><div class="gal__main">' + pic(r.imgs[galIdx], r.alts[galIdx], '', true) + nav + '</div>' +
      (thumbs ? '<div class="gal__thumbs">' + thumbs + '</div>' : '') + '</div>' +
      '<div class="rd__info"><p class="kicker">' + esc(r.cap) + '</p>' +
      '<h2 class="modal__title" id="roomTitle">' + esc(r.name) + '</h2>' +
      '<p>' + esc(r.text) + '</p>' +
      '<h3 class="rd__sub">' + t('room.equip') + '</h3>' +
      '<ul class="rd__equip">' + r.equip.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>' +
      priceTable() +
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

  /* ---------- Anfrage ---------- */
  function openBooking(preferId) {
    state.prefer = preferId || null;
    roomOpen = null;
    state.step = 1;
    state.room = null;
    if (state.prefer) {
      var pr = roomById(state.prefer);
      if (pr) { if (state.adults > pr.adults) state.adults = pr.adults; if (state.kids.length > pr.kids) state.kids = state.kids.slice(0, pr.kids); }
    }
    state.month = new Date((state.from || TODAY).getFullYear(), (state.from || TODAY).getMonth(), 1);
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
    var m = state.month, y = m.getFullYear(), mo = m.getMonth();
    var title = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric' }).format(m);
    var minMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    var maxMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 14, 1);
    var wd = [];
    for (var i = 0; i < 7; i++) wd.push('<span>' + new Intl.DateTimeFormat(LOCALE, { weekday: 'short' }).format(new Date(2024, 0, 1 + i)).slice(0, 2) + '</span>');
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
      '<div class="cal__head"><button type="button" class="cal__nav" data-cal="-1" aria-label="' + t('cal.prev') + '"' + (m <= minMonth ? ' disabled' : '') +
      '><svg class="ico" aria-hidden="true"><use href="#i-left"/></svg></button>' +
      '<p class="cal__title" aria-live="polite">' + title + '</p>' +
      '<button type="button" class="cal__nav" data-cal="1" aria-label="' + t('cal.next') + '"' + (m >= maxMonth ? ' disabled' : '') +
      '><svg class="ico" aria-hidden="true"><use href="#i-right"/></svg></button></div>' +
      '<div class="cal__wd" aria-hidden="true">' + wd.join('') + '</div><div class="cal__grid">' + cells + '</div>' +
      '<p class="cal__hint" aria-live="polite">' + hint + (state.from ? ' <button type="button" class="link" data-cal-reset>' + t('cal.reset') + '</button>' : '') + '</p>' +
      '<ul class="cal__legend"><li class="lg-free">' + t('cal.free') + '</li><li class="lg-busy">' + t('cal.busy') + '</li><li class="lg-sel">' + t('cal.sel') + '</li></ul>';
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

  function stepper(key, label, val, min, max) {
    return '<div class="stepper"><span class="stepper__label">' + label + '</span><span class="stepper__ctl">' +
      '<button type="button" data-step="' + key + '" data-dir="-1" aria-label="' + label + ': ' + t('bk.less') + '"' + (val <= min ? ' disabled' : '') + '>−</button>' +
      '<output aria-live="polite">' + val + '</output>' +
      '<button type="button" data-step="' + key + '" data-dir="1" aria-label="' + label + ': ' + t('bk.more') + '"' + (val >= max ? ' disabled' : '') + '>+</button></span></div>';
  }
  function renderGuests() {
    var kids = state.kids.map(function (k, i) {
      return '<div class="field field--kid"><label for="kid' + i + '">' + t('bk.kidAge') + ' ' + (i + 1) + '</label><select id="kid' + i + '" data-kid="' + i + '">' +
        D.KIDS.map(function (x) { return '<option value="' + x.id + '"' + (x.id === k ? ' selected' : '') + '>' + t(x.id) + '</option>'; }).join('') + '</select></div>';
    }).join('');
    $('#guests').innerHTML = '<h3 class="bk__h">' + t('bk.guests') + '</h3>' +
      stepper('adults', t('bk.adults'), state.adults, 1, 3) +
      stepper('kids', t('bk.kids'), state.kids.length, 0, 2) +
      (kids ? '<div class="kids">' + kids + '<p class="bk__fine">' + t('bk.kidsNote') + '</p></div>' : '') +
      '<div class="field field--check"><input id="f-hp" type="checkbox"' + (state.hp ? ' checked' : '') + ' data-hp><label for="f-hp"><b>' + t('bk.hp') + '</b><br><small>' + t('bk.hpNote') + '</small></label></div>';
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
      var ok = fits(r), right, off = false;
      if (!ok) { right = '<p class="bkr__state">' + t('bk.small') + '</p>'; off = true; }
      else if (!ready) {
        right = '<p class="bkr__price"><b>' + t('bk.onReq') + '</b><span>' + t('bk.withBreakfast') + ' · ' + guestsLabel() + '</span></p>';
      } else {
        if (!roomFree(r, state.from, state.to)) { right = '<p class="bkr__state">' + t('bk.busy') + '</p>'; off = true; }
        else {
          anyFree = true;
          right = '<p class="bkr__price"><b>' + t('bk.onReq') + '</b><span>' + t('bk.withBreakfast') + ' · ' + nightsLabel(nights) + '</span></p>' +
            '<button class="btn btn--primary btn--small" type="button" data-pick="' + r.id + '">' + t('bk.select') + '</button>';
        }
      }
      return '<li class="bkr' + (off ? ' is-off' : '') + '">' + pic(r.imgs[0], '', 'bkr__img') +
        '<div class="bkr__info"><h4>' + esc(r.name) + '</h4><p>' + esc(r.cap) + '</p></div><div class="bkr__right">' + right + '</div></li>';
    }).join('');
    var sub = ready
      ? fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(nights) + ' · ' + guestsLabel()
      : t('bk.pickDates');
    box.innerHTML = '<h3 class="bk__h">' + t('bk.rooms') + '</h3><p class="bk__sub">' + sub + '</p><ul class="bkr-list">' + rows + '</ul>' +
      (ready && !anyFree ? '<p class="bk__none" role="status">' + t('bk.none') + '</p>' : '') +
      '<p class="bk__fine">' + t('bk.fine') + '</p>';
  }
  function summaryHtml() {
    var r = state.room, n = nightsBetween(state.from, state.to);
    return '<aside class="sum"><h3 class="bk__h">' + t('bk.summary') + '</h3>' + pic(r.imgs[0], '', 'sum__img') +
      '<dl><div><dt>' + t('bk.room') + '</dt><dd>' + esc(r.name) + '</dd></div>' +
      '<div><dt>' + t('bk.stay') + '</dt><dd>' + fmtDate(state.from) + ' – ' + fmtDate(state.to, true) + ' · ' + nightsLabel(n) + '</dd></div>' +
      '<div><dt>' + t('bk.guests') + '</dt><dd>' + guestsLabel() + '</dd></div>' +
      (state.hp ? '<div><dt>' + t('bk.lineHp') + '</dt><dd>' + t('room.pHpV') + '</dd></div>' : '') +
      '<div class="sum__total"><dt>' + t('room.pRoom') + '</dt><dd>' + t('room.pOnReq') + '</dd></div></dl>' +
      '<p class="bk__fine">' + t('bk.priceNote') + '</p></aside>';
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
    var no = 'AL-' + ymd(state.from).replace(/-/g, '').slice(2) + '-' + (1000 + hash(dayIdx(state.from) + state.adults) % 9000);
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

  /* ---------- Anfrageleiste auf dem ersten Bildschirm ---------- */
  function initBookline() {
    var f = $('#bookline');
    if (!f) return;
    var inp = $('#bl-in'), out = $('#bl-out');
    inp.min = ymd(TODAY); out.min = ymd(addDays(TODAY, 1));
    inp.addEventListener('change', function () {
      if (inp.value) { var d = parseYmd(inp.value); out.min = ymd(addDays(d, 1)); if (out.value && out.value <= inp.value) out.value = ymd(addDays(d, 1)); }
    });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = $('#bl-err');
      var ok = inp.value && out.value && out.value > inp.value && inp.value >= ymd(TODAY);
      err.hidden = !!ok; err.textContent = ok ? '' : t('bl.err');
      if (!ok) { (inp.value ? out : inp).focus(); return; }
      state.from = parseYmd(inp.value); state.to = parseYmd(out.value);
      state.adults = +$('#bl-guests').value; state.kids = [];
      openBooking(null);
    });
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
      var Lf = window.L, pos = [LAT, LON];
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/?mlat=' + LAT + '&mlon=' + LON + '#map=16/' + LAT + '/' + LON + '">' + t('map.link') + '</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(pos, 15);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      Lf.marker(pos).addTo(map).bindPopup('<b>ALATSEE Hotel & Restaurant</b><br>Am Alatsee 1, 87629 Füssen');
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
      if (key === 'adults') state.adults = Math.min(3, Math.max(1, state.adults + dir));
      else if (dir > 0 && state.kids.length < 2) state.kids.push('k12');
      else if (dir < 0) state.kids.pop();
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
  document.addEventListener('change', function (e) {
    var el;
    if ((el = e.target.closest('[data-kid]'))) { state.kids[+el.getAttribute('data-kid')] = el.value; renderRoomList(); typo($('#bkRooms')); return; }
    if (e.target.closest('[data-hp]')) { state.hp = e.target.checked; renderRoomList(); typo($('#bkRooms')); }
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
  initBookline();
  renderOpen();
  renderSun();
  typo(document.body);
  onScroll();
  setInterval(renderOpen, 60000);
})();
