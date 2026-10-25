/* Azsteakas — Beta-Vorschau. Ohne Backend: Reservierung und Verfügbarkeit werden im Browser simuliert. */
(function () {
  'use strict';

  var D = window.AZ;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Typografie: kurze Funktionswörter nicht am Zeilenende ---------- */
  var SHORT = 'in|im|an|am|auf|aus|bei|bis|der|die|das|dem|den|des|ein|eine|einem|einen|einer|eines|für|mit|nach|von|vom|vor|zu|zum|zur|und|oder|als|ab|um|so|je|pro|ca|per|wie|ist|es|er|sie|wir|Sie|ich|du|ihr|ob|da|hier|dort|nur|noch|auch|sehr|ganz|' +
    'a|an|at|by|in|of|on|or|to|the|and|for|with|from';
  var TYPO_RE = new RegExp('(^|[\\s(„"\'])(' + SHORT + ')\\s+(?=\\S)', 'g');
  function typo(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        if (p === 'SCRIPT' || p === 'STYLE' || p === 'TEXTAREA' || p === 'OPTION' || p === 'BUTTON') return NodeFilter.FILTER_REJECT;
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

  /* ---------- Zeit und Öffnungszeiten ---------- */
  var DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var DAYS_SHORT = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  function mins(hm) { var p = hm.split(':'); return +p[0] * 60 + +p[1]; }
  function hm(m) { return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); }
  function fmtMoney(n) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n);
  }
  function fmtDate(d) {
    return new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  }
  function ymd(d) {
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function parseYmd(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }

  function openState(now) {
    var day = now.getDay(), h = D.HOURS[day], m = now.getHours() * 60 + now.getMinutes();
    if (m >= mins(h.open) && m < mins(h.close)) {
      var left = mins(h.close) - m;
      return left <= 60
        ? { open: true, text: 'Jetzt geöffnet · Küche schließt in ' + left + ' Min', short: 'Küche schließt in ' + left + ' Min' }
        : { open: true, text: 'Jetzt geöffnet · Küche bis ' + h.close + ' Uhr', short: 'Geöffnet · Küche bis ' + h.close };
    }
    if (m < mins(h.open)) return { open: false, text: 'Heute geschlossen bis ' + h.open + ' Uhr', short: 'Geschlossen · ab ' + h.open };
    var next = D.HOURS[(day + 1) % 7];
    return { open: false, text: 'Jetzt geschlossen · morgen ab ' + next.open + ' Uhr', short: 'Geschlossen · morgen ' + next.open };
  }

  function renderStatus() {
    var st = openState(new Date());
    $$('[data-status]').forEach(function (el) {
      el.textContent = el.getAttribute('data-status') === 'short' ? st.short : st.text;
      el.classList.toggle('is-open', st.open);
      el.classList.toggle('is-closed', !st.open);
    });
  }

  function renderHours() {
    var today = new Date().getDay();
    var order = [1, 2, 3, 4, 5, 6, 0];
    var html = order.map(function (i) {
      var h = D.HOURS[i];
      return '<div' + (i === today ? ' class="is-today"' : '') + '><dt>' + DAYS_SHORT[i] + (i === today ? ' · heute' : '') + '</dt>' +
        '<dd><b>' + h.open + '–' + h.close + '</b></dd></div>';
    }).join('');
    $$('[data-hours]').forEach(function (el) { el.innerHTML = html; });
  }

  /* ---------- Speisekarte ---------- */
  var menuState = { tab: D.MENU[0].id, filters: {} };
  var TAG_LABEL = { veg: 'vegetarisch', vegan: 'vegan', scharf: 'scharf', vegetarisch: 'vegetarisch' };

  function itemMatches(it) {
    var t = it.t || [];
    var f = menuState.filters;
    if (f.veg && t.indexOf('veg') < 0 && t.indexOf('vegan') < 0) return false;
    if (f.vegan && t.indexOf('vegan') < 0) return false;
    if (f.scharf && t.indexOf('scharf') < 0) return false;
    return true;
  }
  function tagsHtml(t) {
    return (t || []).map(function (k) { return '<span class="tag tag--' + k + '">' + TAG_LABEL[k] + '</span>'; }).join('');
  }
  function dishHtml(it) {
    var price = '';
    if (it.w) {
      price = '<div class="weights">' + it.w.map(function (w) {
        return '<span>' + esc(w[0]) + '</span><span class="price">' + fmtMoney(w[1]).replace(/\s€/, '') + '</span>';
      }).join('') + '</div>';
    } else if (it.p !== undefined) {
      price = '<span class="price">' + fmtMoney(it.p).replace(/\s€/, '') + '</span>';
    } else if (it.ptext) {
      price = '<span class="price"><small>' + esc(it.ptext) + '</small></span>';
    } else {
      price = '<span class="price"></span>';
    }
    return '<li class="dish"><span class="dish__name">' + esc(it.n) + tagsHtml(it.t) + '</span>' + price +
      (it.d ? '<span class="dish__desc">' + esc(it.d) + '</span>' : '') + '</li>';
  }

  function renderTabs() {
    $('[data-tabs]').innerHTML = D.MENU.map(function (c) {
      var sel = c.id === menuState.tab;
      var n = c.groups.reduce(function (k, g) { return k + g.items.length; }, 0);
      return '<button type="button" role="tab" id="tab-' + c.id + '" aria-selected="' + sel + '" aria-controls="panel-karte" data-tab="' + c.id + '"' +
        (sel ? '' : ' tabindex="-1"') + '><span>' + esc(c.tab) + '</span><small>' + n + '</small></button>';
    }).join('');
  }

  function renderMenu() {
    var cat = D.MENU.filter(function (c) { return c.id === menuState.tab; })[0];
    var panel = $('[data-panel]');
    panel.id = 'panel-karte';
    panel.setAttribute('aria-labelledby', 'tab-' + cat.id);
    var any = false;
    var groups = cat.groups.map(function (g) {
      var items = g.items.filter(itemMatches);
      if (!items.length) return '';
      any = true;
      return '<div class="menu__group"><h4>' + esc(g.h) + '</h4>' +
        (g.note ? '<p class="menu__group-note">' + esc(g.note) + '</p>' : '') +
        '<ul class="dishes">' + items.map(dishHtml).join('') + '</ul></div>';
    }).join('');
    var active = Object.keys(menuState.filters).filter(function (k) { return menuState.filters[k]; }).map(function (k) { return TAG_LABEL[k]; });
    var photos = cat.photos && !active.length ? '<div class="menu__photos' + (cat.photos.length === 1 ? ' menu__photos--1' : '') + '">' +
      cat.photos.map(function (ph) { return pic(ph[0], ph[1], 'Foto: Gast auf Yelp'); }).join('') + '</div>' : '';
    panel.innerHTML = '<div class="menu__title"><h3>' + esc(cat.title) + '</h3>' + (cat.intro ? '<p>' + esc(cat.intro) + '</p>' : '') + '</div>' + photos +
      (any ? groups : '<p class="menu__empty">In dieser Kategorie gibt es nichts, das „' + esc(active.join(', ')) + '“ ist. Schauen Sie unter „Vegetarisch &amp; vegan“ oder „Vorweg“.</p>') +
      (cat.foot ? '<p class="menu__foot">' + esc(cat.foot) + '</p>' : '');
    typo(panel);
  }

  function initMenu() {
    renderTabs(); renderMenu();
    $('[data-tabs]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tab]'); if (!b) return;
      menuState.tab = b.getAttribute('data-tab'); renderTabs(); renderMenu();
      b = $('[data-tab="' + menuState.tab + '"]'); b.focus();
      if (typeof b.scrollIntoView === 'function') b.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
    $('[data-tabs]').addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var ids = D.MENU.map(function (c) { return c.id; });
      var i = ids.indexOf(menuState.tab);
      i = (i + (e.key === 'ArrowRight' ? 1 : ids.length - 1)) % ids.length;
      menuState.tab = ids[i]; renderTabs(); renderMenu(); $('[data-tab="' + menuState.tab + '"]').focus(); e.preventDefault();
    });
    $('[data-filters]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]'); if (!b) return;
      var k = b.getAttribute('data-filter');
      menuState.filters[k] = !menuState.filters[k];
      if (k === 'vegan' && menuState.filters.vegan) menuState.filters.veg = false;
      if (k === 'veg' && menuState.filters.veg) menuState.filters.vegan = false;
      $$('[data-filter]').forEach(function (c) { c.setAttribute('aria-pressed', String(!!menuState.filters[c.getAttribute('data-filter')])); });
      renderMenu();
    });
  }

  /* ---------- Gästefotos ---------- */
  function pic(name, caption, src) {
    return '<figure class="pic"><picture><source type="image/webp" srcset="assets/img/' + name + '.webp">' +
      '<img src="assets/img/' + name + '.jpg" alt="' + esc(caption) + '" loading="lazy"></picture>' +
      '<figcaption>' + esc(caption) + (src ? '<span class="pic__src">' + esc(src) + '</span>' : '') + '</figcaption></figure>';
  }
  function gotoTab(id) {
    menuState.tab = id; renderTabs(); renderMenu();
    var sec = $('#karte'); if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function renderFavs() {
    var box = $('[data-favs]'); if (!box) return;
    box.innerHTML = D.FAVS.map(function (f) {
      return '<article class="fav"><picture><source type="image/webp" srcset="assets/img/' + f.img + '.webp">' +
        '<img src="assets/img/' + f.img + '.jpg" alt="' + esc(f.n) + '" loading="lazy" width="800" height="600"></picture>' +
        '<span class="fav__tag">Bestseller</span>' +
        '<div><div class="fav__head"><span class="fav__name">' + esc(f.n) + '</span><span class="price price--tag">' + esc(f.p) + '</span></div>' +
        '<p>' + esc(f.d) + '</p></div>' +
        '<button class="fav__link" type="button" data-goto-tab="' + f.tab + '">In der Karte ansehen</button></article>';
    }).join('');
    typo(box);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-goto-tab]'); if (b) { e.preventDefault(); gotoTab(b.getAttribute('data-goto-tab')); }
  });

  /* ---------- Mittagskarte ---------- */
  function renderLunch() {
    var L = D.LUNCH, today = new Date().getDay();
    $('[data-lunch-from]').textContent = L.validFrom;
    $('[data-lunch-price]').textContent = fmtMoney(L.price);
    $('[data-lunch-price-veg]').textContent = fmtMoney(L.priceVeg);
    $('[data-lunch]').innerHTML = L.days.map(function (d, i) {
      var isToday = (i + 1) === today;
      return '<li class="lunch__day' + (isToday ? ' is-today' : '') + '"><h3>' + d.d + (isToday ? '<small>heute</small>' : '') + '</h3>' +
        '<p>' + esc(d.dish) + '</p><p><span class="tag">' + TAG_LABEL[d.vegTag] + '</span><br>' + esc(d.veg) + '</p></li>';
    }).join('');
  }

  /* ---------- Reservierung (Simulation) ---------- */
  var book = { date: null, time: null };
  var TODAY = (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();

  function hash(n) { return ((n * 2654435761) >>> 0) >>> 8; }
  function dayIdx(d) { return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); }
  /* deterministisch „ausgebucht“: Fr/Sa-Abend häufiger, große Gruppen öfter */
  function slotFull(d, m, guests) {
    var wd = d.getDay(), evening = m >= mins('18:30') && m <= mins('20:30');
    var base = (wd === 5 || wd === 6) && evening ? 2 : evening ? 5 : 9;
    if (guests >= 6) base = Math.max(2, base - 2);
    return hash(dayIdx(d) * 97 + m) % base === 0;
  }
  function slotsFor(d) {
    var h = D.HOURS[d.getDay()], out = [];
    for (var m = mins(h.open); m <= mins(h.close) - 60; m += 30) out.push(m);
    return out;
  }

  function renderSlots() {
    var box = $('[data-slots]');
    var guests = +$('#b-guests').value;
    if (!book.date) { box.innerHTML = '<p class="slots__msg">Bitte zuerst ein Datum wählen.</p>'; return; }
    var d = parseYmd(book.date);
    if (d < TODAY) { box.innerHTML = '<p class="slots__msg">Das Datum liegt in der Vergangenheit.</p>'; return; }
    var now = new Date();
    var sameDay = ymd(d) === ymd(TODAY);
    if (sameDay && now.getHours() * 60 + now.getMinutes() >= mins('17:00')) {
      box.innerHTML = '<p class="slots__msg">Für heute nehmen wir nach 17:00 Uhr Reservierungen nur noch telefonisch an: <a href="tel:+4982142070936">0821 420 70 936</a>. ' +
        'Online geht es ab morgen: <button class="slots__link" type="button" data-morgen>Morgen wählen</button></p>';
      book.time = null; return;
    }
    if (guests > 8) {
      box.innerHTML = '<p class="slots__msg">Ab neun Personen reservieren wir gern persönlich: <a href="tel:+4982142070936">0821 420 70 936</a>.</p>';
      book.time = null; return;
    }
    var nowM = now.getHours() * 60 + now.getMinutes();
    var list = slotsFor(d);
    var html = list.map(function (m) {
      var past = sameDay && m < nowM + 60;
      var full = slotFull(d, m, guests);
      var dis = past || full;
      var sel = book.time === m;
      return '<button class="slot" type="button" aria-pressed="' + sel + '" data-slot="' + m + '"' + (dis ? ' disabled' : '') +
        (full ? ' title="ausgebucht"' : '') + '>' + hm(m) + '</button>';
    }).join('');
    var freeCount = list.filter(function (m) { return !(sameDay && m < nowM + 60) && !slotFull(d, m, guests); }).length;
    if (!freeCount) html += '<p class="slots__msg">An diesem Tag ist online nichts mehr frei – rufen Sie uns an: <a href="tel:+4982142070936">0821 420 70 936</a>.</p>';
    else html += '<p class="slots__msg">Durchgestrichen = ausgebucht. Tisch bleibt 15 Minuten nach der gewählten Zeit reserviert.</p>';
    box.innerHTML = html;
    if (book.time !== null && !$('[data-slot="' + book.time + '"]:not([disabled])', box)) book.time = null;
    renderSummary();
  }

  function renderSummary() {
    var s = $('[data-summary]');
    if (book.date && book.time !== null) {
      s.textContent = fmtDate(parseYmd(book.date)) + ', ' + hm(book.time) + ' Uhr, ' + $('#b-guests').value + ' ' + (+$('#b-guests').value === 1 ? 'Person' : 'Personen');
    } else s.textContent = '';
  }

  function setErr(name, msg) {
    var err = $('#e-' + name), field = err && err.closest('.field');
    if (!err) return;
    if (msg) { err.textContent = msg; err.hidden = false; field.classList.add('is-invalid'); }
    else { err.hidden = true; field.classList.remove('is-invalid'); }
  }

  function validate() {
    var ok = true;
    function check(name, cond, msg) { setErr(name, cond ? '' : msg); if (!cond) ok = false; }
    var guests = +$('#b-guests').value;
    check('date', !!book.date && parseYmd(book.date) >= TODAY, 'Bitte ein Datum ab heute wählen.');
    check('guests', guests >= 1 && guests <= 8, 'Ab neun Personen bitte telefonisch reservieren.');
    check('time', book.time !== null, 'Bitte eine Uhrzeit wählen.');
    check('name', $('#b-name').value.trim().length >= 2, 'Bitte Ihren Namen eintragen.');
    check('phone', /^[+0-9][0-9 \/()-]{5,}$/.test($('#b-phone').value.trim()), 'Bitte eine Telefonnummer eintragen.');
    check('mail', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($('#b-mail').value.trim()), 'Bitte eine gültige E-Mail-Adresse eintragen.');
    check('consent', $('#b-consent').checked, 'Bitte stimmen Sie der Verarbeitung zu.');
    return ok;
  }

  function initBook() {
    var dateEl = $('#b-date');
    dateEl.min = ymd(TODAY);
    var max = new Date(TODAY.getFullYear(), TODAY.getMonth() + 3, TODAY.getDate());
    dateEl.max = ymd(max);
    function onDate() { if (book.date === (dateEl.value || null)) return; book.date = dateEl.value || null; book.time = null; setErr('date', ''); renderSlots(); }
    dateEl.addEventListener('change', onDate); dateEl.addEventListener('input', onDate);
    $('[data-slots]').addEventListener('click', function (e) {
      if (!e.target.closest('[data-morgen]')) return;
      var tm = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 1); dateEl.value = ymd(tm); onDate();
    });
    $('#b-guests').addEventListener('change', function () { setErr('guests', ''); renderSlots(); });
    $('[data-slots]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-slot]'); if (!b || b.disabled) return;
      book.time = +b.getAttribute('data-slot'); setErr('time', '');
      $$('[data-slot]').forEach(function (x) { x.setAttribute('aria-pressed', String(+x.getAttribute('data-slot') === book.time)); });
      renderSummary();
    });
    ['name', 'phone', 'mail'].forEach(function (k) { $('#b-' + k).addEventListener('input', function () { setErr(k, ''); }); });
    $('#b-consent').addEventListener('change', function () { setErr('consent', ''); });
    renderSlots();

    $('#bookForm').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var first = $('.field.is-invalid');
        if (first) { var f = $('input, select, button', first); if (f) f.focus(); }
        return;
      }
      var guests = +$('#b-guests').value;
      $('#okBody').innerHTML =
        '<p>Vielen Dank, ' + esc($('#b-name').value.trim()) + '. Wir haben Ihre Anfrage erhalten und bestätigen die Reservierung per E-Mail an ' + esc($('#b-mail').value.trim()) + '.</p>' +
        '<dl><dt>Datum</dt><dd>' + esc(fmtDate(parseYmd(book.date))) + '</dd><dt>Uhrzeit</dt><dd>' + hm(book.time) + ' Uhr</dd>' +
        '<dt>Personen</dt><dd>' + guests + '</dd>' + ($('#b-note').value.trim() ? '<dt>Anmerkung</dt><dd>' + esc($('#b-note').value.trim()) + '</dd>' : '') + '</dl>' +
        '<p class="modal__note">Dies ist eine Vorschau der neuen Website. Es wurde kein Tisch reserviert und keine Daten wurden gesendet.</p>';
      openModal($('#okModal'));
      $('#bookForm').reset(); book.date = null; book.time = null; renderSlots();
    });
  }

  /* ---------- Modal ---------- */
  var lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement;
    m.hidden = false; document.body.style.overflow = 'hidden';
    var dlg = $('.modal__dialog', m); dlg.focus();
  }
  function closeModal(m) {
    m.hidden = true; document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var m = e.target.closest('.modal'); if (!m) return;
    if (e.target.closest('[data-close]') || e.target === m) closeModal(m);
  });
  document.addEventListener('keydown', function (e) {
    var m = $('.modal:not([hidden])'); if (!m) return;
    if (e.key === 'Escape') { closeModal(m); return; }
    if (e.key === 'Tab') {
      var f = $$('button, [href], input, select, textarea', m).filter(function (x) { return !x.disabled; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === $('.modal__dialog', m))) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  /* ---------- Navigation ---------- */
  function initNav() {
    var burger = $('.burger'), nav = $('#nav');
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('is-open')) burger.click();
    });
    var links = $$('.nav a'), sections = links.map(function (a) { return $(a.getAttribute('href')); });
    if ('IntersectionObserver' in window) {
      var current = null;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) current = en.target.id; });
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + current) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      sections.forEach(function (s) { if (s) io.observe(s); });
    }
  }

  /* ---------- Karte (nur nach Klick) ---------- */
  function loadMap() {
    var box = $('#map');
    var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'assets/vendor/leaflet/leaflet.css';
    document.head.appendChild(css);
    var js = document.createElement('script'); js.src = 'assets/vendor/leaflet/leaflet.js';
    js.onload = function () {
      var Lf = window.L, pos = [48.3706, 10.8947];
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/?mlat=48.3706&mlon=10.8947#map=17/48.3706/10.8947">Größere Karte</a>';
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView(pos, 16);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      Lf.marker(pos).addTo(map).bindPopup('<b>Azsteakas</b><br>Ludwigstraße 19, 86152 Augsburg').openPopup();
    };
    document.body.appendChild(js);
  }

  /* ---------- Start ---------- */
  renderStatus(); renderHours(); setInterval(renderStatus, 60000);
  initMenu(); renderFavs(); renderLunch(); initBook(); initNav();
  var ml = $('#mapLoad'); if (ml) ml.addEventListener('click', loadMap);
  typo(document.body);
})();
