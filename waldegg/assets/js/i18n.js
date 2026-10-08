/* Pension Waldegg — Inhalte: Zimmertypen, Preise, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Zimmertypen laut pensionwaldegg.com/zimmer/ (Grösse, Personen, Dusche).
     Preise laut pensionwaldegg.com/preisliste/ – pro Person und Nacht; siehe PRICES. busy = Demo-Auslastung. */
  var ROOMS = [
    { id: 'v1', size: 24, min: 2, max: 4, bath: 'own', busy: 3,
      de: { name: 'Vierbettzimmer mit Privatdusche/WC', meta: 'Balkon · 24 m² · 2–4 Personen' },
      en: { name: 'Four-bed room with private shower/WC', meta: 'Balcony · 24 m² · 2–4 guests' } },
    { id: 'e1', size: 12, min: 1, max: 1, bath: 'floor', busy: 2,
      de: { name: 'Einzelzimmer', meta: 'Etagendusche/-WC · 12 m² · 1 Person' },
      en: { name: 'Single room', meta: 'Shared shower/WC · 12 m² · 1 guest' } },
    { id: 'd1', size: 12, min: 1, max: 2, bath: 'floor', busy: 2,
      de: { name: 'Doppelzimmer mit Balkon oder Terrasse', meta: 'Etagendusche/-WC · 12 m² · 1–2 Personen' },
      en: { name: 'Double room with balcony or terrace', meta: 'Shared shower/WC · 12 m² · 1–2 guests' } },
    { id: 'd2', size: 12, min: 1, max: 2, bath: 'floor', busy: 1,
      de: { name: 'Doppelzimmer mit Waldblick', meta: 'Etagendusche/-WC · 12 m² · 1–2 Personen' },
      en: { name: 'Double room with forest view', meta: 'Shared shower/WC · 12 m² · 1–2 guests' } },
    { id: 'v2', size: 24, min: 2, max: 4, bath: 'floor', busy: 2,
      de: { name: 'Vierbettzimmer mit Balkon oder Terrasse', meta: 'Etagendusche/-WC · 24 m² · 2–4 Personen' },
      en: { name: 'Four-bed room with balcony or terrace', meta: 'Shared shower/WC · 24 m² · 2–4 guests' } },
    { id: 'v3', size: 24, min: 2, max: 4, bath: 'floor', busy: 1,
      de: { name: 'Vierbettzimmer mit Waldblick', meta: 'Etagendusche/-WC · 24 m² · 2–4 Personen' },
      en: { name: 'Four-bed room with forest view', meta: 'Shared shower/WC · 24 m² · 2–4 guests' } }
  ];

  /* Preislisten (CHF pro Person und Nacht). single = Einzelbelegung, dbl = ab 2 Personen, multi = 3–4 Personen
     (Rabatt 5.00), kidBf / kidHp = Kinder 4–12. Kinder 0–3 gratis. Kurtaxe: Sommer 1.6.–31.10., Winter 1.11.–31.5. */
  var PRICES = {
    until: '2026-12-18',
    a: { bf: { single: 57.5, dbl: 52.5, multi: 47.5, kid: 30 }, hp: { single: 87, dbl: 82, multi: 77, kid: 47.5 } },
    b: { bf: { single: 62.5, dbl: 55, multi: 50, kid: 32.5 }, hp: { single: 92.5, dbl: 85, multi: 80, kid: 49.5 } },
    tax: { summer: { adult: 7, kid: 3.5 }, winter: { adult: 4.5, kid: 2.25 } }
  };

  var UI = {
    de: {
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen',
      'bw.btn': 'Verfügbarkeit prüfen',
      adult1: 'Erwachsener', adultN: 'Erwachsene', kid1: 'Kind', kidN: 'Kinder',
      night1: 'Nacht', nightN: 'Nächte',
      'room.from': 'ab', 'room.pp': 'pro Person / Nacht mit Frühstück', 'room.book': 'Buchen',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
      'cal.reset': 'Auswahl zurücksetzen',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder (bis 16 Jahre)',
      'bk.age': 'Alter Kind', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.board': 'Verpflegung', 'bk.bf': 'Frühstücksbuffet', 'bk.hp': 'Halbpension',
      'bk.hpS': 'Frühstücksbuffet und 3-Gang-Menü am Abend',
      'bk.rooms': 'Verfügbare Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie Preis und Verfügbarkeit.',
      'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl zu klein',
      'bk.big': 'Für eine Person zu gross – bitte Einzel- oder Doppelzimmer wählen',
      'bk.total': 'gesamt, inkl. Kurtaxe', 'bk.incl': 'Preise pro Person laut Preisliste',
      'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie Zeitraum oder Gästezahl – ' +
        'oder schreiben Sie uns per WhatsApp: +41 77 486 26 65.',
      'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
      'bk.boardL': 'Verpflegung', 'bk.lodging': 'Übernachtung', 'bk.tax': 'Kurtaxe (SaastalCard inkl.)',
      'bk.price': 'Gesamtpreis', 'bk.pay': 'Zahlung vor Ort.',
      'bk.group': 'Gruppen ab 15 Personen auf Anfrage.',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail-Adresse', 'f.phone': 'Telefon',
      'f.msg': 'Wünsche oder Fragen, z. B. vegetarisch/vegan (optional)',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener noreferrer">' +
        'Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben zur Abwicklung der Buchung einverstanden.',
      'f.submit': 'Verbindlich buchen',
      'e.name': 'Bitte geben Sie Ihren Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'e.phone': 'Bitte geben Sie eine Telefonnummer an, unter der wir Sie erreichen.',
      'e.consent': 'Bitte stimmen Sie der Datenschutzerklärung zu.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'Ihre Buchung ist bestätigt. Die Bestätigung geht an {email}.',
      'ok.no': 'Buchungsnummer', 'ok.demo': 'Dies ist eine Beta-Vorschau: Es wurde keine echte Buchung ausgelöst ' +
        'und keine E-Mail versendet.',
      'ok.close': 'Schliessen', close: 'Schliessen', menu: 'Menü',
      'map.link': 'In OpenStreetMap öffnen'
    },
    en: {
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Select date',
      'bw.btn': 'Check availability',
      adult1: 'adult', adultN: 'adults', kid1: 'child', kidN: 'children',
      night1: 'night', nightN: 'nights',
      'room.from': 'from', 'room.pp': 'per person / night with breakfast', 'room.book': 'Book',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'cal.hintIn': 'Please choose your arrival date.', 'cal.hintOut': 'Now choose your departure date.',
      'cal.reset': 'Reset selection',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children (up to 16)',
      'bk.age': 'Age of child', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.board': 'Meals', 'bk.bf': 'Breakfast buffet', 'bk.hp': 'Half board',
      'bk.hpS': 'Breakfast buffet and a three-course dinner',
      'bk.rooms': 'Available rooms', 'bk.pickDates': 'Choose arrival and departure to see prices and availability.',
      'bk.select': 'Select', 'bk.busy': 'Booked for these dates', 'bk.small': 'Too small for this number of guests',
      'bk.big': 'Too large for one guest – please choose a single or double room',
      'bk.total': 'total, incl. visitor’s tax', 'bk.incl': 'Prices per person as per the rate list',
      'bk.none': 'Unfortunately no room is available for this combination. Please change the dates or number of ' +
        'guests – or message us on WhatsApp: +41 77 486 26 65.',
      'bk.back': 'Back', 'bk.summary': 'Your booking', 'bk.stay': 'Dates', 'bk.room': 'Room',
      'bk.boardL': 'Meals', 'bk.lodging': 'Accommodation', 'bk.tax': 'Visitor’s tax (SaastalCard incl.)',
      'bk.price': 'Total price', 'bk.pay': 'Payment on site.',
      'bk.group': 'Groups of 15 or more on request.',
      'f.name': 'First and last name', 'f.email': 'Email address', 'f.phone': 'Phone',
      'f.msg': 'Requests or questions, e.g. vegetarian/vegan (optional)',
      'f.consent': 'I have read the <a href="datenschutz.html" target="_blank" rel="noopener noreferrer">' +
        'privacy policy</a> and agree to my details being processed in order to handle the booking.',
      'f.submit': 'Book now',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid email address.',
      'e.phone': 'Please enter a phone number where we can reach you.',
      'e.consent': 'Please agree to the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'Your booking is confirmed. The confirmation will be sent to {email}.',
      'ok.no': 'Booking number', 'ok.demo': 'This is a beta preview: no real booking was made and no email was sent.',
      'ok.close': 'Close', close: 'Close', menu: 'Menu',
      'map.link': 'Open in OpenStreetMap'
    }
  };

  /* Englische Fassung der statischen Seitentexte (Schlüssel = data-i18n im HTML). */
  var EN = {
    beta: 'Beta preview — not a final design',
    menu: 'Menu', and: 'and',
    'brand.sub': 'Guesthouse · Zermeiggern',
    'nav.place': 'Location', 'nav.rooms': 'Rooms', 'nav.board': 'Half board', 'nav.season': 'Summer &amp; winter',
    'nav.guests': 'Guests', 'nav.hosts': 'Hosts', 'nav.arrival': 'Getting here',
    'cta.book': 'Book', close: 'Close',
    'hero.small': 'Guesthouse &amp; restaurant · Zermeiggern',
    'hero.place': 'Saas-Almagell · 1,710 m · by the river',
    'hero.alt': 'Aerial view: Pension Waldegg with red shutters among larches on the Saaser Vispa river, a PostBus in front',
    'hero.note': 'From CHF 52.50 per person and night with breakfast · 9.2 out of 10 from 350 reviews on Booking.com',
    'place.title': 'Ski slope, cross-country trail and hiking path at the door.',
    'place.lead': 'The Waldegg stands on its own at the end of the Saas Valley: in the hamlet of Zermeiggern at 1,710 metres, right on the Saaser Vispa river. The ski slope, the cross-country trail and the hiking paths pass the house; the PostBus stops at the door.',
    'place.alt1': 'Terrace with tables and red parasols under larches next to the house',
    'place.cap1': 'The terrace under the larches, right at the house.',
    'place.f1': 'Zermeiggern, hamlet of Saas-Almagell', 'place.f2': 'Furggu cable car', 'place.f3': 'Heidbodme cable car',
    'place.f4': 'Mattmark dam, end of the valley', 'place.f5': 'PostBus stop', 'place.f5v': 'at the house', 'place.f6': 'Sion airport',
    'place.src': 'Distances according to Booking.com, altitudes according to wandersite.ch.',
    'rooms.title': 'Rooms and rates',
    'rooms.text': 'Simple wood-panelled rooms – shower and WC on the floor, one four-bed room with its own shower. Rates are per person and night with breakfast buffet, valid until 18 December 2026; the winter rate list applies after that (from CHF 55.00).',
    'terms.1t': 'Children', 'terms.1': '0–3 years free · 4–12 years CHF 30.00 with breakfast, CHF 47.50 with half board',
    'terms.2t': 'Single occupancy', 'terms.2': 'supplement CHF 5.00 per night',
    'terms.3t': '3- and 4-bed rooms', 'terms.3': 'CHF 5.00 off per person and night',
    'terms.4t': 'Groups of 15 or more', 'terms.4': 'on request',
    'terms.5t': 'Visitor’s tax', 'terms.5': 'summer CHF 7.00, winter CHF 4.50 per adult and night (children 6–16: half) – SaastalCard included',
    'rooms.alt1': 'Wood-panelled room with two beds, washbasin and balcony door',
    'rooms.cap1': 'Room with two beds, washbasin and balcony door.',
    'rooms.alt2': 'Room with double bed under a wooden ceiling and window to the balcony',
    'rooms.cap2': 'Double bed under the wooden ceiling.',
    'rooms.alt3': 'Lounge with sofa, books and windows facing the forest',
    'rooms.cap3': 'The lounge with sofa and books.',
    'board.title': 'Half board: buffet in the morning, three courses in the evening.',
    'board.text': 'The restaurant is in the house. Breakfast buffet in the morning, a three-course menu in the evening – vegetarian or vegan on request, please let us know in advance. If you don’t want to go down to the village after a day on the slopes or the trail, you eat here.',
    'board.alt1': 'Breakfast buffet with fruit, muesli, cheese, cold cuts and bread in the restaurant',
    'board.cap1': 'The breakfast buffet in the restaurant.',
    'board.h1': 'Per person and night', 'board.h2': 'until 18 Dec 2026',
    'board.r1': 'Double room with breakfast', 'board.r2': 'Double room with half board',
    'board.r3': 'Children 4–12 with half board', 'board.r4': 'Half-board supplement, adults',
    'board.r4s': 'Breakfast buffet and three-course dinner',
    'board.note': 'From 18 December 2026: CHF 55.00 / 85.00 / 49.50. Prices exclude visitor’s tax.',
    'board.alt2': 'Restaurant with laid tables, wooden walls and pendant lamps', 'board.cap2': 'The restaurant.',
    'board.alt3': 'Fruit tart with strawberries, kiwi and blueberries', 'board.cap3': 'From the kitchen: fruit tart.',
    'season.title': 'Summer and winter', 'season.s': 'Summer', 'season.w': 'Winter',
    'season.s1': 'Hiking trails', 'season.s1v': 'from the house',
    'season.s2': 'Mountain railways in the valley', 'season.s2v': 'SaastalCard<small>from the 1st night, except Metro Alpin</small>',
    'season.s3': 'PostBus in the valley', 'season.s3v': 'SaastalCard',
    'season.s4': 'Mattmark reservoir',
    'season.w1': 'Ski slope', 'season.w1v': 'at the house', 'season.w2': 'Cross-country trail', 'season.w2v': 'at the house',
    'season.w3': 'Furggu cable car', 'season.w4': 'Visitor’s tax, winter', 'season.w4s': 'per adult and night',
    'season.src': 'SaastalCard according to saas-fee.ch: summer and autumn, 1 night = 1 cable-car day.',
    'rev.c1': 'United Kingdom', 'rev.c2': 'Switzerland', 'rev.c3': 'Germany',
    'rev.of': 'out of 10 from 350 reviews on', 'rev.date': 'As of October 2026',
    'rev.s1': 'Staff', 'rev.s2': 'Value for money', 'rev.s3': 'Cleanliness', 'rev.s4': 'Comfort',
    'rev.n': '9.2', 'rev.s1v': '9.8', 'rev.s2v': '9.5', 'rev.s3v': '9.4', 'rev.s4v': '9.1',
    'host.text': 'run the Waldegg guesthouse and restaurant themselves – reception, kitchen and tips for trails and cable cars. Questions before you arrive are answered by phone or WhatsApp.',
    'arr.title': 'Getting here', 'arr.1t': 'Address',
    'arr.2t': 'By train and PostBus', 'arr.2': 'To Visp, then by PostBus into the Saas Valley to Saas-Almagell. The stop is right in front of the house.',
    'arr.3t': 'By car', 'arr.3': 'Through Saas-Almagell on the Talstrasse towards Mattmark as far as the hamlet of Zermeiggern. Parking at the house.',
    'arr.4t': 'Check-in and check-out', 'arr.4': 'Arrival 3–10 pm, please let us know your arrival time in advance. Departure by 11 am.',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'again.title': 'Book direct', 'again.text': 'Or by phone and WhatsApp:',
    'foot.ch': 'Switzerland', 'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Pension Waldegg',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'bk.title': 'Book direct', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
  };

  window.WALDEGG = { ROOMS: ROOMS, PRICES: PRICES, UI: UI, EN: EN };
})();
