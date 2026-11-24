/* Hotel Restaurant Bellevue, Heiligenschwendi — Inhalte: Zimmer (Hoteltarife 2026), UI-Texte und Übersetzung (DE/EN).
   Deutsch steht direkt im HTML; Englisch wird über data-i18n eingesetzt.
   Quellen: bellevue-heiligenschwendi.ch (Seiten Home, Hotel, Restaurant, Kontakt, Impressum; 27.10.2026),
   Booking.com (Noten, Check-in/-out, Hausregeln; 27.10.2026), myswitzerland.com (Betten, Lift, Parkplatz; 27.10.2026). */
(function () {
  'use strict';

  /* Hoteltarife 2026 (bellevue-heiligenschwendi.ch/hotel): Preise pro Person und Nacht in CHF inkl. Frühstück,
     Service, Kurtaxen und MwSt. Halbpension +22 pro Person. Kinder im Zusatzbett im Zimmer der Eltern:
     bis 5 gratis, bis 11 Jahre 50 %, bis 15 Jahre 30 % Ermässigung. Hund CHF 8. */
  var PP = 83, EZ = 88, HP = 22;
  var KIDS = [
    { id: 'k5', pct: 0 },      /* bis und mit 5 Jahre: gratis */
    { id: 'k11', pct: 50 },    /* bis und mit 11 Jahre: 50 % Ermässigung */
    { id: 'k15', pct: 70 }     /* bis und mit 15 Jahre: 30 % Ermässigung */
  ];

  var ROOMS = [
    {
      id: 'dz', adults: 2, kids: 2, busy: 3, perPerson: PP, room: 2 * PP,
      imgs: ['zimmer-dz-1', 'zimmer-dz-2'],
      de: {
        name: 'Doppelzimmer', cap: '2 Personen · Balkon · Dusche/Bad, WC',
        short: 'Zwei Betten, Holztäfer, Balkon mit Blick auf See und Berge.',
        text: 'Doppelzimmer mit Holztäfer, zwei Betten, Schreibtisch und HD-TV. Dusche oder Bad mit WC. Balkon mit Blick auf den Thunersee und die Berner Alpen. Kinder im Zusatzbett im Zimmer der Eltern.',
        equip: ['Balkon mit Seeblick', 'Dusche/Bad und WC', 'HD-TV', 'Schreibtisch', 'WLAN inklusive', 'Lift im Haus'],
        alts: ['Doppelzimmer mit Holztäfer, zwei Betten mit weisser Bettwäsche und Wandleuchten', 'Doppelzimmer mit Schreibtisch, Fernseher und Tür zum Balkon']
      },
      en: {
        name: 'Double room', cap: '2 guests · balcony · shower/bath, WC',
        short: 'Two beds, wood panelling, balcony facing the lake and the mountains.',
        text: 'Double room with wood panelling, two beds, desk and HD TV. Shower or bath with WC. Balcony with a view of Lake Thun and the Bernese Alps. Children on an extra bed in their parents’ room.',
        equip: ['Balcony with lake view', 'Shower/bath and WC', 'HD TV', 'Desk', 'Wi-Fi included', 'Lift in the house'],
        alts: ['Double room with wood panelling, two beds with white linen and wall lamps', 'Double room with desk, TV and door to the balcony']
      }
    },
    {
      id: 'ez', adults: 1, kids: 0, busy: 2, perPerson: EZ, room: EZ,
      imgs: ['zimmer-ez-1', 'zimmer-tv'],
      de: {
        name: 'Einzelzimmer', cap: '1 Person · Balkon · Dusche/Bad, WC',
        short: 'Ein Bett, Holztäfer, eigener Balkon – zum Preis mit Frühstück.',
        text: 'Einzelzimmer mit Holztäfer, Bett, Schreibtisch und HD-TV. Dusche oder Bad mit WC. Eigener Balkon mit Blick auf den Thunersee und die Berner Alpen.',
        equip: ['Balkon mit Seeblick', 'Dusche/Bad und WC', 'HD-TV', 'Schreibtisch', 'WLAN inklusive', 'Lift im Haus'],
        alts: ['Einzelzimmer mit Holztäfer, Bett mit gelber Tagesdecke und offener Balkontür', 'Fernseher auf dem Tisch am Fenster zum Balkon']
      },
      en: {
        name: 'Single room', cap: '1 guest · balcony · shower/bath, WC',
        short: 'One bed, wood panelling, own balcony – at a price including breakfast.',
        text: 'Single room with wood panelling, bed, desk and HD TV. Shower or bath with WC. Own balcony with a view of Lake Thun and the Bernese Alps.',
        equip: ['Balcony with lake view', 'Shower/bath and WC', 'HD TV', 'Desk', 'Wi-Fi included', 'Lift in the house'],
        alts: ['Single room with wood panelling, bed with yellow bedspread and open balcony door', 'TV on the table by the window to the balcony']
      }
    }
  ];

  var UI = {
    de: {
      'person1': 'Person', 'personN': 'Personen', 'night1': 'Nacht', 'nightN': 'Nächte', 'adult1': 'Erwachsener', 'adultN': 'Erwachsene',
      'kid1': 'Kind', 'kidN': 'Kinder',
      'room.details': 'Zimmer ansehen', 'room.book': 'Buchen', 'room.night': 'pro Nacht', 'room.equip': 'Ausstattung',
      'room.prices': 'Hoteltarife 2026', 'room.photo': 'Foto', 'room.bookThis': 'Dieses Zimmer buchen',
      'room.pRoom': 'Zimmer mit Frühstück', 'room.pHp': 'Halbpension, Zuschlag', 'room.pp': 'pro Person', 'room.forTwo': 'für zwei Personen',
      'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.hintIn': 'Bitte Anreisetag wählen', 'cal.hintOut': 'Bitte Abreisetag wählen', 'cal.reset': 'Zurücksetzen',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'bk.guests': 'Personen', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder bis 15 Jahre', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.kidAge': 'Alter Kind', 'k5': 'bis 5 Jahre – gratis', 'k11': '6 bis 11 Jahre – 50 % Ermässigung', 'k15': '12 bis 15 Jahre – 30 % Ermässigung',
      'bk.hp': 'Halbpension', 'bk.hpNote': 'Abendessen im Restaurant, CHF 22 pro Person und Nacht',
      'bk.kidsNote': 'Kinder schlafen im Zusatzbett im Zimmer der Eltern (Ermässigung laut Hoteltarife 2026).',
      'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie die freien Zimmer und den Preis.',
      'bk.small': 'Für diese Personenzahl nicht geeignet', 'bk.ezKids': 'Einzelzimmer: eine Person, ohne Zusatzbett', 'bk.busy': 'In diesem Zeitraum belegt',
      'bk.total': 'gesamt', 'bk.select': 'Auswählen',
      'bk.none': 'In diesem Zeitraum ist kein passendes Zimmer frei. Bitte wählen Sie andere Tage oder rufen Sie uns an: +41 33 243 13 10.',
      'bk.fine': 'Preise laut Hoteltarife 2026 in CHF inkl. Frühstück, Service, Kurtaxen und MwSt. Hund CHF 8. Halbpension für Kinder auf Anfrage.',
      'bk.summary': 'Ihre Buchung', 'bk.room': 'Zimmer', 'bk.stay': 'Zeitraum',
      'bk.lineRoom': 'Zimmer mit Frühstück', 'bk.lineKids': 'Kinder im Zusatzbett', 'bk.lineHp': 'Halbpension', 'bk.price': 'Gesamtbetrag', 'bk.back': 'Zurück',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.msg': 'Wünsche, Hund, Anreisezeit (optional)',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung der Buchung verwendet werden.',
      'f.submit': 'Verbindlich buchen',
      'e.name': 'Bitte geben Sie Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'e.phone': 'Bitte geben Sie eine Telefonnummer an.', 'e.consent': 'Bitte bestätigen Sie die Datenschutzerklärung.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'In der fertigen Website erhalten Sie jetzt eine Bestätigung an {email}. Anreise 15 bis 21 Uhr, Abreise bis 11 Uhr.',
      'ok.no': 'Buchungsnummer', 'ok.demo': 'Dies ist eine Beta-Vorschau: Es wurde nichts gebucht, nichts gespeichert und nichts versendet.',
      'ok.close': 'Schliessen', 'map.link': 'In OpenStreetMap öffnen',
      'open.now': 'Jetzt geöffnet', 'open.closed': 'Heute Ruhetag', 'open.until': 'bis {t}',
      'open.before': 'Öffnet um {t}', 'open.after': 'Heute geschlossen',
      'sun.rise': 'Sonnenaufgang', 'sun.set': 'Sonnenuntergang', 'sun.today': 'heute in Heiligenschwendi',
      'bl.err': 'Bitte Anreise und Abreise wählen – die Abreise liegt nach der Anreise.'
    },
    en: {
      'person1': 'guest', 'personN': 'guests', 'night1': 'night', 'nightN': 'nights', 'adult1': 'adult', 'adultN': 'adults',
      'kid1': 'child', 'kidN': 'children',
      'room.details': 'View room', 'room.book': 'Book', 'room.night': 'per night', 'room.equip': 'Amenities',
      'room.prices': 'Hotel rates 2026', 'room.photo': 'Photo', 'room.bookThis': 'Book this room',
      'room.pRoom': 'Room with breakfast', 'room.pHp': 'Half board, supplement', 'room.pp': 'per person', 'room.forTwo': 'for two guests',
      'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.hintIn': 'Please select your arrival date', 'cal.hintOut': 'Please select your departure date', 'cal.reset': 'Reset',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children up to 15', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.kidAge': 'Age of child', 'k5': 'up to 5 years – free', 'k11': '6 to 11 years – 50 % off', 'k15': '12 to 15 years – 30 % off',
      'bk.hp': 'Half board', 'bk.hpNote': 'Dinner in the restaurant, CHF 22 per person and night',
      'bk.kidsNote': 'Children sleep on an extra bed in their parents’ room (discount according to the 2026 rates).',
      'bk.rooms': 'Rooms', 'bk.pickDates': 'Select arrival and departure to see the available rooms and the price.',
      'bk.small': 'Not suitable for this number of guests', 'bk.ezKids': 'Single room: one guest, no extra bed', 'bk.busy': 'Booked for these dates',
      'bk.total': 'total', 'bk.select': 'Select',
      'bk.none': 'No suitable room is available for these dates. Please choose other days or call us: +41 33 243 13 10.',
      'bk.fine': 'Rates according to the 2026 hotel rates in CHF including breakfast, service, visitor’s tax and VAT. Dog CHF 8. Half board for children on request.',
      'bk.summary': 'Your booking', 'bk.room': 'Room', 'bk.stay': 'Stay',
      'bk.lineRoom': 'Room with breakfast', 'bk.lineKids': 'Children on extra bed', 'bk.lineHp': 'Half board', 'bk.price': 'Total', 'bk.back': 'Back',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.msg': 'Requests, dog, arrival time (optional)',
      'f.consent': 'I have read the <a href="datenschutz.html" target="_blank" rel="noopener">privacy policy</a> and agree that my details are used to process the booking.',
      'f.submit': 'Book now',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid e-mail address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please confirm the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'On the finished website you would now receive a confirmation at {email}. Check-in 3 pm to 9 pm, check-out until 11 am.',
      'ok.no': 'Booking number', 'ok.demo': 'This is a beta preview: nothing has been booked, saved or sent.',
      'ok.close': 'Close', 'map.link': 'Open in OpenStreetMap',
      'open.now': 'Open now', 'open.closed': 'Closed today (rest day)', 'open.until': 'until {t}',
      'open.before': 'Opens at {t}', 'open.after': 'Closed for today',
      'sun.rise': 'Sunrise', 'sun.set': 'Sunset', 'sun.today': 'today in Heiligenschwendi',
      'bl.err': 'Please select arrival and departure – departure must be after arrival.'
    }
  };

  var META = {
    en: {
      title: 'Hotel Restaurant Bellevue, Heiligenschwendi above Thun · 20 rooms with balcony above Lake Thun',
      desc: 'Family-run hotel and restaurant at 1,100 m above Lake Thun: 20 rooms, all with balcony and a view of the lake and the Bernese Alps, panoramic terrace, single room CHF 88, double room CHF 83 per person with breakfast. 8.6 of 10 on Booking.com.'
    }
  };

  /* Seitentexte: Schlüssel = data-i18n im HTML */
  var T = {
    en: {
      'beta': 'Beta preview — not a final design',
      'nav.restaurant': 'Restaurant', 'nav.zimmer': 'Rooms & rates', 'nav.gaeste': 'Guests', 'nav.ort': 'Getting here', 'nav.haus': 'The house',
      'nav.book': 'Book', 'nav.menu': 'Menu', 'close': 'Close', 'lang.aria': 'Language',
      'brand.sub': 'Hotel · Restaurant<br>Heiligenschwendi above Thun',
      'pano.alt': 'View from Heiligenschwendi over the forest to Lake Thun and the Niesen with the Bernese Alps',
      'hero.kicker': 'Hotel Restaurant Bellevue · 1,100 m above Lake Thun',
      'hero.h1': 'The lake below, the Alps in front, and all of it from your balcony.',
      'hero.p': 'Family-run in the third generation, at the Saali viewpoint on the edge of the forest above Thun. Twenty rooms, each with its own balcony, a panoramic terrace and a restaurant with its own kitchen. Single room CHF 88, double room CHF 83 per person – with breakfast.',
      'bl.title': 'Book directly with the house', 'bl.in': 'Arrival', 'bl.out': 'Departure', 'bl.guests': 'Guests', 'bl.g1': '1 guest', 'bl.g2': '2 guests',
      'bl.btn': 'Check availability', 'bl.note': 'Single room CHF 88 · double room CHF 83 per person · with breakfast',
      'facts.price': 'per person and night, double room with breakfast', 'facts.rooms': 'rooms, all with balcony', 'facts.score': 'on Booking.com, 571 reviews, location 9.4',
      'rest.kicker': 'Terrace & restaurant', 'rest.h2': 'A terrace above the lake, four rooms behind it.',
      'rest.p1': 'The panoramic terrace looks out over Lake Thun and the peaks of the Bernese Alps – lunch, coffee and cake or dinner in the open air. Inside, the kitchen is run by the house itself: menus and plated service, a cellar with selected wines.',
      'rest.hoursH': 'Opening hours', 'rest.d1': 'Monday, Tuesday, Friday, Saturday', 'rest.d1v': '8 am – 10 pm', 'rest.d2': 'Wednesday', 'rest.d2v': '5 pm – 10 pm',
      'rest.d3': 'Sunday', 'rest.d3v': '8 am – 8 pm', 'rest.d4': 'Thursday', 'rest.d4v': 'rest day',
      'rest.hoursNote': 'When the last guests have left, we close at 10 pm.',
      'rest.table': 'Reserve a table', 'rest.tableOnline': 'Reserve online', 'rest.tel': 'or call +41 33 243 13 10',
      'rest.r1': 'Panoramic terrace', 'rest.r1v': 'Lake Thun and the Bernese Alps in view',
      'rest.r2': 'Gaststube', 'rest.r2v': '35 seats, panoramic view of the lake',
      'rest.r3': 'Dining room', 'rest.r3v': '35 seats, non-smoking, breakfast room for hotel guests',
      'rest.r4': 'Bellevue-Stübli', 'rest.r4v': '30 seats, for family celebrations and small meetings',
      'rest.alt1': 'Panoramic terrace of the Bellevue with laid tables, Lake Thun and the mountains behind',
      'rest.alt2': 'Gaststube with wooden chairs and a view of the lake through the windows',
      'rest.alt3': 'Dining room with white tablecloths and laid tables by the window',
      'rest.alt4': 'Bellevue-Stübli with wooden tables and old photographs on the wall',
      'rest.alt5': 'Table on the terrace with folded napkins and wine glasses, the lake and mountains behind',
      'rest.bankH': 'Celebrations and banquets', 'rest.bankP': 'For weddings, family celebrations and company events the Stübli and the dining room are available. Ask for our menu suggestions for your celebration.',
      'rest.bankAsk': 'Ask about a celebration',
      'zimmer.kicker': 'Rooms & rates 2026', 'zimmer.h2': 'Twenty rooms, twenty balconies.',
      'zimmer.p': 'Ten double and ten single rooms with shower or bath, WC, HD TV and balcony. Wood panelling, a desk, and the lake in front of the window. Lift in the house, a lounge with TV and reading corner, free parking at the door.',
      'zimmer.th1': 'Room', 'zimmer.th2': 'With breakfast', 'zimmer.th3': 'Half board', 'zimmer.th4': '',
      'zimmer.r1': 'Single room', 'zimmer.r1f': '1 guest · balcony · shower/bath, WC',
      'zimmer.r2': 'Double room', 'zimmer.r2f': '2 guests · balcony · shower/bath, WC',
      'zimmer.pp': 'per person', 'zimmer.ppn': 'per person and night', 'zimmer.forTwo': 'CHF 166 for two',
      'zimmer.book': 'Book', 'zimmer.view': 'View',
      'zimmer.n1': 'Rates per person and night in CHF, including breakfast, service, visitor’s tax and VAT.',
      'zimmer.n2': 'Children on an extra bed in their parents’ room: up to 5 years free, up to 11 years 50 % off, up to 15 years 30 % off.',
      'zimmer.n3': 'Dog CHF 8. Check-in 3 pm to 9 pm, check-out until 11 am. Payment in cash.',
      'zimmer.alt1': 'Double room with wood panelling and two beds',
      'zimmer.alt2': 'Single room with bed and open door to the balcony',
      'zimmer.alt3': 'View of the Alps and Lake Thun straight from the hotel room, with a bedside lamp and the balcony railing',
      'zimmer.cap3': 'The Alps and Lake Thun straight from the room',
      'gaeste.kicker': 'What guests say', 'gaeste.h2': 'The location gets 9.4 – the staff 9.5.',
      'gaeste.src': 'Booking.com, 571 reviews, as of 27 October 2026',
      'gaeste.s1': 'Staff', 'gaeste.s2': 'Location', 'gaeste.s3': 'Cleanliness', 'gaeste.s4': 'Value for money',
      'gaeste.google': 'Google: 4.4 of 5 stars (Google Maps, 27 October 2026)',
      'gaeste.q1': '“Wow what a location! We chose this hotel as a one-night stop-off on our European motorcycle tour, as it offered a great location and onsite parking. We were not disappointed and were given a warm welcome and found all the staff extremely friendly.”',
      'gaeste.q1n': 'Owen, United Kingdom · Booking.com',
      'gaeste.q2': '“The best thing was the staff, who were very happy to help and just as comfortable in German or English. Great views too and a very decent price.”',
      'gaeste.q2n': 'John, France · Booking.com',
      'gaeste.q3': '“The hotel is up on a hill, offering an amazing view of the lake and the Alps. The mountain bus stop stops near the entrance. The breakfast is local and fresh.”',
      'gaeste.q3n': 'Xinxuan, China · Booking.com',
      'ort.kicker': 'Heiligenschwendi & getting here', 'ort.h2': 'The sun terrace above Lake Thun, 1,100 m above sea level.',
      'ort.p1': 'Heiligenschwendi lies on the sunny slope above the right shore of Lake Thun, in the foothills of the Alps at 1,100 m, with a clear view of the peaks of the Bernese Oberland. The house stands at the Saali, a little off the main road, on the edge of the forest. Walking and hiking trails lead through the fir woods right from the door.',
      'ort.d1': 'Bus stop Stapfenboden-Saali', 'ort.d1v': '400 m', 'ort.d2': 'Thun railway station by STI bus', 'ort.d2v': 'lines 31/32 to Heiligenschwendi',
      'ort.d3': 'Thun by car', 'ort.d3v': '15 min', 'ort.d4': 'Bern by car', 'ort.d4v': '30 min',
      'ort.d5': 'Blueme lookout tower', 'ort.d5v': '360° view of the Alps, Jura and the lake', 'ort.d6': 'Spycherweg', 'ort.d6v': 'circular trail, about 10 km, 3.5 hours',
      'ort.alt1': 'Lake Thun seen from the slope above Heiligenschwendi, the Niesen pyramid and snow-covered Alps behind',
      'anreise.h3': 'Getting here', 'anreise.addr': 'Hotel Restaurant Bellevue · Im Saali 251 · 3625 Heiligenschwendi · Switzerland',
      'anreise.p': 'Large private car park for cars and coaches at the house, free of charge. By public transport: train to Thun, then STI bus to Heiligenschwendi, stop Stapfenboden-Saali, 400 m on foot.',
      'anreise.mapBtn': 'Load map', 'anreise.mapNote': 'The map is loaded from OpenStreetMap only after you click.',
      'haus.kicker': 'The house', 'haus.h2': 'Family-run, in the third generation.',
      'haus.p1': 'The Bellevue is run by Daniel Wälchli – the third generation of the family. A comfortable, homely house at a sunny, quiet spot on the edge of the forest: lift, lounge with TV and reading corner, a large private car park for cars and coaches.',
      'haus.p2': 'Twenty rooms, 30 beds, a restaurant with its own kitchen and a terrace that gave the house its name. Pets are welcome (a fee may apply).',
      'haus.alt1': 'The Hotel Restaurant Bellevue with flags on the balcony, trees and the car park in front',
      'haus.alt2': 'Gaststube of the Bellevue with flowers, plants and laid tables',
      'haus.contact': 'Contact', 'haus.call': 'Call', 'haus.mail': 'Write an e-mail',
      'foot.sub': 'Hotel · Restaurant<br>Heiligenschwendi above Thun', 'foot.imp': 'Legal notice', 'foot.ds': 'Privacy', 'foot.beta': 'Beta preview – concept & implementation: Olga Tikhomirova',
      'bk.title': 'Book a room', 'bk.step1': 'Dates & room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
    }
  };

  window.BELLEVUE = { ROOMS: ROOMS, KIDS: KIDS, PP: PP, EZ: EZ, HP: HP, UI: UI, T: T, META: META };
})();
