/* Stadthotel Garni Augsburger Hof, Landsberg am Lech — Beta-Vorschau.
   Inhalte: Zimmerkategorien laut stadthotel-landsberg.de/services (abgerufen 24.11.2026), UI-Texte (DE/EN), englische Übersetzung.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt.
   Bewusst ohne Preise: Das Haus bucht über die eigene Online-Buchung (SoftTec) mit tagesaktuellen Preisen;
   die Vorschau bestätigt deshalb nur Zeitraum, Zimmer und Gäste und nennt »Preis auf Anfrage«. */
(function () {
  'use strict';

  var ROOMS = [
    {
      id: 'ez', cap: 1, busy: 3, imgs: ['ez-classic', 'ez-plus'],
      de: {
        name: 'Einzelzimmer', short: 'Kompakt und gemütlich, neues Bett mit 1,40 m Breite.',
        text: 'Klein, fein und gemütlich: Unsere kompakten Einzelzimmer bieten alles, was Sie für einen angenehmen und ' +
          'erholsamen Aufenthalt brauchen. Das neue, 1,40 m breite Bett verbindet Komfort mit einer platzsparenden ' +
          'Raumaufteilung – ideal für Alleinreisende.',
        equip: ['Bett 1,40 × 2,00 m', 'Landhausstil mit Massivholz-Möbeln', 'Ideal für Alleinreisende', 'Self-Check-In ab 15 Uhr'],
        alts: ['Einzelzimmer mit Holzbett, grüner Wand und Hirsch-Motiv', 'Einzelzimmer mit Bauernschrank und Massivholz-Bett']
      },
      en: {
        name: 'Single room', short: 'Compact and cosy, new bed 1.40 m wide.',
        text: 'Small, neat and cosy: our compact single rooms offer everything you need for a pleasant, restful stay. ' +
          'The new 1.40 m wide bed combines comfort with a space-saving layout – ideal for solo travellers.',
        equip: ['Bed 1.40 × 2.00 m', 'Country-house style with solid wood furniture', 'Ideal for solo travellers', 'Self check-in from 3 pm'],
        alts: ['Single room with wooden bed, green wall and deer motif', 'Single room with farmhouse wardrobe and solid wood bed']
      }
    },
    {
      id: 'dz', cap: 2, busy: 2, imgs: ['dz-gruen', 'dz-bett', 'dz-schrank'],
      de: {
        name: 'Doppelzimmer', short: 'Landhausstil, Doppelbett 1,80 × 2,00 m.',
        text: 'Unsere gemütlichen Doppelzimmer im charmanten Landhausstil verbinden wohnliche Atmosphäre mit zeitlosem ' +
          'Komfort. Das Doppelbett (1,80 × 2,00 m) bietet den idealen Rahmen für einen erholsamen Aufenthalt – zu zweit ' +
          'oder für Alleinreisende, die sich mehr Platz wünschen.',
        equip: ['Doppelbett 1,80 × 2,00 m', 'Charmanter Landhausstil', 'Für 1–2 Personen', 'Self-Check-In ab 15 Uhr'],
        alts: ['Doppelzimmer mit dunkelgrüner Wand, Holzbett und Hirsch-Motiv', 'Doppelbett aus hellem Holz vor grüner Wand',
          'Doppelzimmer mit Massivholz-Bett und großem Bauernschrank']
      },
      en: {
        name: 'Double room', short: 'Country-house style, double bed 1.80 × 2.00 m.',
        text: 'Our cosy double rooms in charming country-house style combine a homely atmosphere with timeless comfort. ' +
          'The double bed (1.80 × 2.00 m) sets the ideal scene for a restful stay – for two, or for solo travellers ' +
          'who want more space.',
        equip: ['Double bed 1.80 × 2.00 m', 'Charming country-house style', 'For 1–2 guests', 'Self check-in from 3 pm'],
        alts: ['Double room with dark green wall, wooden bed and deer motif', 'Light wooden double bed against a green wall',
          'Double room with solid wood bed and large farmhouse wardrobe']
      }
    },
    {
      id: 'zweibett', cap: 2, busy: 2, imgs: ['zweibett', 'einzelbett'],
      de: {
        name: 'Zweibett-Zimmer', short: 'Zwei getrennte Betten, je 1,00 × 2,00 m.',
        text: 'Ideal für Freunde, Kollegen und Gäste, die getrennt schlafen möchten: Das gut eingerichtete Zweibett-Zimmer ' +
          'bietet eine entspannte Atmosphäre zum Wohlfühlen. Sie schlafen in zwei Betten mit je 1,00 × 2,00 m.',
        equip: ['2 Betten, je 1,00 × 2,00 m', 'Für Freunde und Kollegen', 'Tisch und Stühle im Zimmer', 'Self-Check-In ab 15 Uhr'],
        alts: ['Zweibett-Zimmer mit Holzbett, Tisch und Stühlen', 'Einzelbett mit Holzrahmen, grüne Vorhänge und Hirsch-Wandmotiv']
      },
      en: {
        name: 'Twin room', short: 'Two separate beds, each 1.00 × 2.00 m.',
        text: 'Ideal for friends, colleagues and guests who prefer separate beds: the well-appointed twin room offers a ' +
          'relaxed, comfortable atmosphere. You sleep in two beds of 1.00 × 2.00 m each.',
        equip: ['2 beds, each 1.00 × 2.00 m', 'For friends and colleagues', 'Table and chairs in the room', 'Self check-in from 3 pm'],
        alts: ['Twin room with wooden bed, table and chairs', 'Single bed with wooden frame, green curtains and deer wall motif']
      }
    },
    {
      id: 'fam', cap: 4, busy: 2, imgs: ['familienzimmer'],
      de: {
        name: 'Familienzimmer', short: 'Doppelbett und Etagenbett, Platz für 4 Personen.',
        text: 'Die praktische Wahl für Familien, kleine Gruppen oder gemeinsam Reisende: Mit einem Doppelbett (1,80 × 2,00 m) ' +
          'und einem Etagenbett (je 0,90 × 2,00 m) bietet das Familienzimmer bequem Platz für vier Personen.',
        equip: ['Doppelbett 1,80 × 2,00 m', 'Etagenbett, je 0,90 × 2,00 m', 'Bequem Platz für 4 Personen', 'Self-Check-In ab 15 Uhr'],
        alts: ['Familienzimmer mit zwei Betten und Etagenbett unter Holzbalken']
      },
      en: {
        name: 'Family room', short: 'Double bed and bunk bed, sleeps 4.',
        text: 'The practical choice for families, small groups or friends travelling together: with a double bed ' +
          '(1.80 × 2.00 m) and a bunk bed (each 0.90 × 2.00 m), the family room comfortably sleeps four.',
        equip: ['Double bed 1.80 × 2.00 m', 'Bunk bed, each 0.90 × 2.00 m', 'Comfortably sleeps 4', 'Self check-in from 3 pm'],
        alts: ['Family room with two beds and a bunk bed under wooden beams']
      }
    }
  ];

  /* UI-Texte für den Anfrage-Ablauf und Widgets */
  var UI = {
    de: {
      adult1: 'Erwachsener', adultN: 'Erwachsene', night1: 'Nacht', nightN: 'Nächte',
      kid1: 'Kind', kidN: 'Kinder',
      'bk.title': 'Zimmer anfragen', 'bk.s1': 'Zeitraum, Gäste, Zimmer', 'bk.s2': 'Ihre Daten', 'bk.s3': 'Bestätigung',
      'cal.hintIn': 'Anreisetag wählen', 'cal.hintOut': 'Abreisetag wählen', 'cal.reset': 'zurücksetzen',
      'cal.prev': 'Voriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'gewählt',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder',
      'bk.kidsNote': 'Das Familienzimmer bietet Platz für bis zu 4 Personen. Größere Gruppen, Kinderbett oder das Apartment: bitte anrufen.',
      'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Zimmer', 'bk.pickDates': 'Bitte zuerst An- und Abreise wählen.',
      'bk.busy': 'in diesem Zeitraum belegt', 'bk.small': 'für diese Gästezahl zu klein',
      'bk.select': 'Wählen',
      'bk.onRequest': 'auf Anfrage', 'bk.onRequestSub': 'Preis bestätigt das Haus',
      'bk.none': 'Für diesen Zeitraum ist leider kein Zimmer frei. Bitte wählen Sie andere Tage oder rufen Sie uns an: +49 8191 969596.',
      'bk.incl': 'Diese Vorschau nennt bewusst keine Preise: Preis und Verfügbarkeit bestätigt das Haus mit der Antwort auf Ihre Anfrage',
      'bk.summary': 'Ihre Anfrage', 'bk.room': 'Zimmer', 'bk.stay': 'Aufenthalt', 'bk.price': 'Preis',
      'bk.back': 'Zurück',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.arrival': 'Ankunftszeit (Self-Check-In ab 15 Uhr)',
      'f.msg': 'Bemerkungen (Haustier, Fahrrad, Apartment, Early Check-in …)', 'f.consent': 'Ich habe die Datenschutzerklärung gelesen.',
      'f.submit': 'Unverbindlich anfragen',
      'e.name': 'Bitte Vor- und Nachnamen angeben.', 'e.email': 'Bitte eine gültige E-Mail-Adresse angeben.',
      'e.phone': 'Bitte eine Telefonnummer angeben.', 'e.consent': 'Bitte die Datenschutzerklärung bestätigen.',
      'ok.title': 'Danke, {name}!', 'ok.text': 'Wir melden uns innerhalb von 24 Stunden per E-Mail an {email} mit Preis und Bestätigung.',
      'ok.no': 'Anfragenummer',
      'ok.demo': 'Dies ist eine Vorschau: Es wurde nichts gebucht und keine Daten wurden übermittelt.',
      'ok.close': 'Schließen',
      'room.photo': 'Foto', 'gal.prev': 'Voriges Foto', 'gal.next': 'Nächstes Foto', 'room.equip': 'Ausstattung',
      'room.bookThis': 'Dieses Zimmer anfragen', 'room.onRequest': 'Preis auf Anfrage',
      'room.priceNote': 'Das Haus bestätigt Preis und Verfügbarkeit auf Ihre Anfrage',
      'map.link': 'In OpenStreetMap öffnen', 'menu': 'Menü', 'close': 'Schließen'
    },
    en: {
      adult1: 'adult', adultN: 'adults', night1: 'night', nightN: 'nights',
      kid1: 'child', kidN: 'children',
      'bk.title': 'Request a room', 'bk.s1': 'Dates, guests, room', 'bk.s2': 'Your details', 'bk.s3': 'Confirmation',
      'cal.hintIn': 'Choose arrival day', 'cal.hintOut': 'Choose departure day', 'cal.reset': 'reset',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'free', 'cal.busy': 'booked', 'cal.sel': 'selected',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children',
      'bk.kidsNote': 'The family room sleeps up to 4. Larger groups, a cot or the apartment: please call us.',
      'bk.less': 'fewer', 'bk.more': 'more',
      'bk.rooms': 'Rooms', 'bk.pickDates': 'Please choose arrival and departure first.',
      'bk.busy': 'booked for these dates', 'bk.small': 'too small for this number of guests',
      'bk.select': 'Select',
      'bk.onRequest': 'on request', 'bk.onRequestSub': 'price confirmed by the hotel',
      'bk.none': 'No room is free for these dates. Please choose other days or call us: +49 8191 969596.',
      'bk.incl': 'This preview deliberately shows no prices: the hotel confirms price and availability in its reply to your request',
      'bk.summary': 'Your request', 'bk.room': 'Room', 'bk.stay': 'Stay', 'bk.price': 'Price',
      'bk.back': 'Back',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.arrival': 'Arrival time (self check-in from 3 pm)',
      'f.msg': 'Remarks (pet, bike, apartment, early check-in …)', 'f.consent': 'I have read the privacy policy.',
      'f.submit': 'Send non-binding request',
      'e.name': 'Please enter first and last name.', 'e.email': 'Please enter a valid e-mail address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please confirm the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'We will get back to you within 24 hours by e-mail to {email} with price and confirmation.',
      'ok.no': 'Request number',
      'ok.demo': 'This is a preview: nothing has been booked and no data has been sent.',
      'ok.close': 'Close',
      'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo', 'room.equip': 'Amenities',
      'room.bookThis': 'Request this room', 'room.onRequest': 'Price on request',
      'room.priceNote': 'The hotel confirms price and availability in its reply',
      'map.link': 'Open in OpenStreetMap', 'menu': 'Menu', 'close': 'Close'
    }
  };

  /* Englische Fassung der Seite (Schlüssel = data-i18n im HTML) */
  var EN = {
    'beta': 'Beta preview — not a finished design',
    'brand.sub': 'Stadthotel Garni · Landsberg am Lech',
    'nav.rooms': 'Rooms', 'nav.parking': 'Parking', 'nav.house': 'Breakfast & house', 'nav.history': 'History',
    'nav.arrival': 'Getting here', 'cta.book': 'Request',
    'hero.kicker': 'Stadthotel Garni Augsburger Hof · old town of Landsberg am Lech',
    'hero.title': 'In the heart of the old town. In a house that has known guests since 1632.',
    'hero.lead': 'A family-run bed and breakfast hotel in the Schlossergasse: country-house style rooms, an apartment for ' +
      'up to four guests and a breakfast buffet with regional products. Guests rate the house 4.4 out of 5 on TripAdvisor.',
    'board.r1': 'Hauptplatz with the historic town hall', 'board.r1v': '200 m', 'board.r1s': 'about 3 minutes on foot',
    'board.r2': 'Landsberg (Lech) railway station', 'board.r2v': '750 m', 'board.r2s': 'about 9 minutes on foot',
    'board.r3': 'Self check-in', 'board.r3v': 'from 3 pm', 'board.r3s': 'arrive whenever it suits you',
    'board.r4': 'Breakfast buffet on weekdays', 'board.r4v': 'from 6.30 am', 'board.r4s': 'weekends and holidays from 7.30 am',
    'hero.book': 'Request a room', 'hero.rooms': 'See the rooms',
    'hero.cap': 'Schlossergasse 378: the yellow house with the green shutters, two lanes from the Hauptplatz.',
    'hero.alt': 'Stadthotel Garni Augsburger Hof: yellow old-town house with green shutters and flower boxes in the Schlossergasse',

    'rooms.title': 'Rooms and apartment',
    'rooms.lead': 'Four room categories in country-house style – plus a spacious apartment with kitchenette for up to four ' +
      'guests. The hotel confirms prices and availability in its reply to your request; this preview deliberately shows no prices.',
    'rooms.h1': 'Category', 'rooms.h2': 'Beds', 'rooms.h3': 'Suitable for', 'rooms.h5': '',
    'rooms.ez': 'Single room', 'rooms.ez.s': 'compact · new bed, 1.40 m wide',
    'rooms.ez.b': '1 bed, 1.40 × 2.00 m', 'rooms.ez.g': '1 guest',
    'rooms.dz': 'Double room', 'rooms.dz.s': 'country-house style · double bed',
    'rooms.dz.b': 'double bed, 1.80 × 2.00 m', 'rooms.dz.g': '1–2 guests',
    'rooms.tw': 'Twin room', 'rooms.tw.s': 'two separate beds',
    'rooms.tw.b': '2 beds, each 1.00 × 2.00 m', 'rooms.tw.g': '2 guests',
    'rooms.fam': 'Family room', 'rooms.fam.s': 'double bed and bunk bed',
    'rooms.fam.b': '1.80 × 2.00 m + bunk bed', 'rooms.fam.g': 'up to 4 guests',
    'rooms.details': 'Details', 'rooms.book': 'Request',
    'rooms.note': 'Check-in from 3 pm (self check-in), early check-in for a surcharge. Check-out by 10 am on weekdays, ' +
      'by 10.30 am at weekends. The apartment with kitchenette for up to four guests is available on request.',
    'rooms.alt1': 'Single room with wooden bed, green wall and deer motif',
    'rooms.alt2': 'Family room with two beds and a bunk bed under wooden beams',

    'park.title': 'Arrive, park, continue on foot',
    'park.lead': 'Landsberg’s old town belongs to pedestrians – your car still parks close by. There are spaces at the ' +
      'hotel subject to availability, and two car parks are a few minutes’ walk away.',
    'park.h1': 'Parking', 'park.h2': 'Distance', 'park.h3': 'Fee',
    'park.r1': 'Spaces at the hotel (subject to availability)', 'park.r1d': 'at the house', 'park.r1w': '€ 10.00 per day',
    'park.r2': 'Schlossberg car park, exit “Stadttheater”', 'park.r2d': 'approx. 150 m', 'park.r2w': 'max. € 7.00 per day',
    'park.r3': 'Lechstraße car park, exit “Färbertor”', 'park.r3d': 'approx. 300 m', 'park.r3w': 'max. € 7.00 per day',
    'park.r4': 'Waitzinger Wiese car park', 'park.r4d': 'approx. 850 m', 'park.r4w': 'max. € 2.30 per day',
    'park.r5': 'Schlüsselanger car park (Bossewiese)', 'park.r5d': 'approx. 1.2 km', 'park.r5w': 'free of charge',
    'park.src': 'Details as published by the hotel (as of November 2026); current fees are published by the town of Landsberg am Lech.',
    'park.card1': 'Public parking in the town centre is free of charge from midnight to 9 am, on Sundays until noon. During ' +
      'the day a 2-hour limit applies (€ 0.60 per 20 minutes).',
    'park.card2': 'Arriving by bike? The Augsburger Hof is a certified Bett+Bike host: bicycles are stored free of charge ' +
      'at or in the hotel, with a lockable bike room available.',
    'park.card3': 'Motorbikes park free of charge at the Spitalplatz (approx. 150 m). Motorhomes stay at the Waitzinger ' +
      'Wiese for at most € 10.00 per day.',

    'house.title': 'Breakfast from 6.30 am, rooms in country-house style',
    'house.p1': 'From Monday to Friday the breakfast buffet is ready from 6.30 to 9.30 am, at weekends and on public ' +
      'holidays from 7.30 to 10.30 am – generous, and mostly with regional products from local partners.',
    'house.p2': 'Arrive whenever it suits you: the Augsburger Hof is a self check-in hotel. Early check-in for a surcharge ' +
      'and luggage drop-off by arrangement are possible.',
    'house.l1': 'Self check-in from 3 pm, check-out by 10 am (weekends 10.30 am)',
    'house.l2': 'Lockable bike room, certified Bett+Bike host',
    'house.l3': 'Apartment with kitchenette for up to 4 guests',
    'house.l4': 'Pets welcome by prior arrangement',
    'house.l5': 'Parking at the hotel subject to availability',
    'house.alt1': 'Room with dark green wall, deer motif and wooden bed in country-house style',
    'house.alt2': 'Double room with solid wood bed and large farmhouse wardrobe',
    'house.alt3': 'Light wooden double bed against a green wall with deer motif',
    'house.alt4': 'Single bed with wooden frame, green curtains and deer wall motif',

    'hist.title': 'A house with history – since 1632',
    'hist.p1': 'The building of the Augsburger Hof was first mentioned in records in 1632 and originally served as the home ' +
      'and workshop of a Landsberg tawer. After a baroque remodelling, the tanner’s estate became a coffee house and ' +
      'finally an inn – guests have been looked after here since the middle of the 19th century.',
    'hist.p2': 'Today Christian Karner runs the family-managed Stadthotel Garni, combining the house’s almost 400-year ' +
      'history with uncomplicated, contemporary hospitality – from self check-in to a breakfast made with products ' +
      'from local partners.',
    'hist.q': 'Guests rate the house 4.4 out of 5 on TripAdvisor (115 reviews, no. 2 of 4 hotels in Landsberg am Lech) ' +
      'and around 4.5 out of 5 on Google.',
    'hist.qs': 'As of 24 November 2026 · guest quotes to follow once approved by the hotel.',
    'hist.alt1': 'Double room with dark green wall, carved wooden bed and deer motif',

    'arr.title': 'Good to know and getting here',
    'arr.s1': 'Check-in', 'arr.s1v': 'from 3 pm, self check-in; early check-in for a surcharge',
    'arr.s2': 'Check-out', 'arr.s2v': 'Mon–Fri by 10 am, Sat/Sun by 10.30 am',
    'arr.s3': 'Breakfast', 'arr.s3v': 'Mon–Fri 6.30–9.30 am; weekends and holidays 7.30–10.30 am',
    'arr.s4': 'Luggage', 'arr.s4v': 'drop-off by arrangement',
    'arr.s5': 'Pets', 'arr.s5v': 'welcome by prior arrangement',
    'arr.train': 'By train', 'arr.trainT': 'From Munich with a change in Kaufering to Landsberg (Lech). From the station it ' +
      'is about 750 metres on foot across the Lech into the old town – around 9 minutes.',
    'arr.car': 'By car', 'arr.carT': 'Via the A96 Munich–Lindau to the Landsberg exit, then towards the old town. Spaces at ' +
      'the hotel subject to availability, car parks nearby – see the parking section.',
    'arr.map': 'Show map', 'arr.mapNote': 'The map is loaded from OpenStreetMap only after you click.',
    'arr.addr': 'Address',

    'foot.beta': 'Beta preview – concept & implementation: Olga Tikhomirova',
    'bk.title': 'Request a room', 'bk.s1': 'Dates, guests, room', 'bk.s2': 'Your details', 'bk.s3': 'Confirmation',
    'foot.imprint': 'Imprint', 'foot.privacy': 'Privacy policy', 'foot.note': 'Photos: Stadthotel Garni Augsburger Hof (stadthotel-landsberg.de).'
  };

  window.AUGSBURGERHOF = { ROOMS: ROOMS, UI: UI, EN: EN };
})();
