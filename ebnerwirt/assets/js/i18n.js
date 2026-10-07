/* Hotel-Pension Ebnerwirt — Inhalte: Zimmer und Preise, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Preise laut Preisliste ebnerwirt.at/de/zimmer-preise.html (abgerufen 7.10.2026): pro Zimmer und Nacht
     inkl. Frühstücksbuffet, zzgl. Ortstaxe 3,50 € pro Person und Nacht ab dem 15. Geburtstag.
     Winter 2026/27: [ab 4 Nächten, bis 4 Nächte] – jeweils der günstigste Preis der Kategorie.
     Sommer 2027: Montag–Donnerstag / Freitag–Sonntag (Nacht). Für Zeiträume ohne veröffentlichten Preis
     (Herbst 2026) rechnet die Vorschau mit den Sommerpreisen. cap = Personen höchstens. busy = Demo-Auslastung. */
  var ROOMS = [
    {
      id: 'dz', cap: 2, busy: 2, from: 130,
      rates: { xmas: [168, 168], zw: [150, 158], haupt: [160, 168], soMoDo: 130, soFrSo: 140 },
      list: { xmas: '168–176 / 168–186', zw: '150–168 / 158–178', haupt: '160–176 / 168–186', so: '130–148 / 140–168' },
      imgs: ['zimmer-1', 'zimmer-2', 'zimmer-3', 'zimmer-4', 'zimmer-bad'],
      de: {
        name: 'Doppelzimmer',
        cap: 'für 2 Personen',
        short: 'Wohn-/Schlafraum mit Doppelbett, Dusche und WC, Balkon.',
        text: 'Wohn-/Schlafraum mit Doppelbett, Dusche und WC, Flachbild-Kabel-TV, Telefon und kostenfreiem WLAN. ' +
          'Jedes Zimmer hat einen eigenen Balkon. Bei Einzelnutzung ziehen wir 25 € pro Nacht ab.',
        equip: ['Doppelbett', 'Dusche und WC', 'Balkon', 'Flachbild-Kabel-TV', 'Telefon', 'Kostenfreies WLAN'],
        alts: ['Doppelzimmer mit Bett aus hellem Holz, Schreibtisch und Sessel', 'Doppelzimmer mit Balkontür und blaugrünen Vorhängen',
          'Bett mit Kopfteil aus Holz und Nachtlampe', 'Zimmertür 102 aus hellem Holz', 'Bad mit Dusche und Waschtisch']
      },
      en: {
        name: 'Double room',
        cap: 'for 2 guests',
        short: 'Bedroom with double bed, shower and toilet, balcony.',
        text: 'Bedroom with a double bed, shower and toilet, flat-screen cable TV, telephone and free Wi-Fi. ' +
          'Every room has its own balcony. For single occupancy we deduct €25 per night.',
        equip: ['Double bed', 'Shower and toilet', 'Balcony', 'Flat-screen cable TV', 'Telephone', 'Free Wi-Fi'],
        alts: ['Double room with light wooden bed, desk and armchair', 'Double room with balcony door and teal curtains',
          'Bed with wooden headboard and bedside lamp', 'Room door 102 in light wood', 'Bathroom with shower and washbasin']
      }
    },
    {
      id: 'dreibett', cap: 3, busy: 3, from: 159,
      rates: { xmas: [189, 189], zw: [165, 168], haupt: [189, 189], soMoDo: 159, soFrSo: 168 },
      list: { xmas: '189–198 / 189–210', zw: '165–189 / 168–210', haupt: '189–198 / 189–210', so: '159–180 / 168–200' },
      imgs: ['dreibett-1', 'dreibett-2', 'dreibett-3'],
      de: {
        name: 'Dreibettzimmer',
        cap: 'für 3 Personen',
        short: 'Doppelbett und ein Einzelbett, Dusche oder Badewanne, Balkon.',
        text: 'Wohn-/Schlafraum mit Doppelbett und einem Einzelbett, Dusche oder Badewanne sowie WC, Flachbild-Kabel-TV, ' +
          'Telefon und kostenfreiem WLAN. Balkon mit Blick auf die Berge.',
        equip: ['Doppelbett und Einzelbett', 'Dusche oder Badewanne, WC', 'Balkon', 'Flachbild-Kabel-TV', 'Telefon', 'Kostenfreies WLAN'],
        alts: ['Dreibettzimmer mit Doppelbett und Einzelbett in hellem Holz', 'Zimmer mit Doppelbett, Einzelbett und Schreibtisch',
          'Sitzbank aus Holz mit grauem Polster']
      },
      en: {
        name: 'Triple room',
        cap: 'for 3 guests',
        short: 'Double bed and one single bed, shower or bath, balcony.',
        text: 'Bedroom with a double bed and a single bed, shower or bathtub and toilet, flat-screen cable TV, ' +
          'telephone and free Wi-Fi. Balcony facing the mountains.',
        equip: ['Double bed and single bed', 'Shower or bathtub, toilet', 'Balcony', 'Flat-screen cable TV', 'Telephone', 'Free Wi-Fi'],
        alts: ['Triple room with double and single bed in light wood', 'Room with double bed, single bed and desk',
          'Wooden bench with grey cushion']
      }
    },
    {
      id: 'vierbett', cap: 4, busy: 3, from: 232,
      rates: { xmas: [248, 268], zw: [232, 240], haupt: [248, 268], soMoDo: 232, soFrSo: 248 },
      list: { xmas: '248–272 / 268–290', zw: '232–268 / 240–272', haupt: '248–272 / 268–290', so: '232–248 / 248–272' },
      imgs: ['vierbett-1', 'vierbett-2', 'vierbett-3'],
      de: {
        name: 'Vierbettzimmer',
        cap: 'für 4 Personen',
        short: 'Doppelbett und zwei Einzelbetten, Dusche oder Badewanne, Balkon.',
        text: 'Wohn-/Schlafraum mit Doppelbett und zwei Einzelbetten, Dusche oder Badewanne sowie WC, Kabel-TV, Telefon ' +
          'und WLAN. Balkon mit Blick auf die Berge – für Familien und kleine Gruppen.',
        equip: ['Doppelbett und zwei Einzelbetten', 'Dusche oder Badewanne, WC', 'Balkon', 'Kabel-TV', 'Telefon', 'WLAN'],
        alts: ['Zimmer mit Doppelbett und Einzelbett, blaue Tagesdecken', 'Zimmer mit Doppelbett und Einzelbett in Holz',
          'Bad mit Dusche und Waschbecken']
      },
      en: {
        name: 'Quadruple room',
        cap: 'for 4 guests',
        short: 'Double bed and two single beds, shower or bath, balcony.',
        text: 'Bedroom with a double bed and two single beds, shower or bathtub and toilet, cable TV, telephone and ' +
          'Wi-Fi. Balcony facing the mountains – for families and small groups.',
        equip: ['Double bed and two single beds', 'Shower or bathtub, toilet', 'Balcony', 'Cable TV', 'Telephone', 'Wi-Fi'],
        alts: ['Room with double and single bed, blue bedspreads', 'Room with double and single bed in wood',
          'Bathroom with shower and washbasin']
      }
    }
  ];

  var UI = {
    de: {
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen',
      'bw.btn': 'Verfügbarkeit prüfen',
      adult1: 'Erwachsener', adultN: 'Erwachsene', kid1: 'Kind', kidN: 'Kinder',
      night1: 'Nacht', nightN: 'Nächte',
      'room.from': 'ab', 'room.pn': 'pro Zimmer und Nacht', 'room.details': 'Details und Fotos', 'room.book': 'Buchen',
      'room.bookThis': 'Dieses Zimmer buchen', 'room.equip': 'Ausstattung',
      'room.priceNote': 'inkl. Frühstücksbuffet, zzgl. Ortstaxe 3,50 € pro Person und Nacht (ab 15 Jahren)',
      'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
      'cal.reset': 'Auswahl zurücksetzen',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder (bis 17 Jahre)',
      'bk.age': 'Alter Kind', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Zimmer für Ihren Zeitraum', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie Preis und Verfügbarkeit.',
      'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl zu klein',
      'bk.big': 'Für diese Gästezahl nicht vorgesehen',
      'bk.total': 'gesamt', 'bk.incl': 'inkl. Frühstücksbuffet und Ortstaxe',
      'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie Zeitraum oder Gästezahl – ' +
        'oder rufen Sie uns an: +43 6458 8156.',
      'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
      'bk.price': 'Gesamtpreis', 'bk.pay': 'Zahlung bar vor Ort.',
      'bk.cancel': 'Es gelten die Buchungs- und Stornobedingungen laut Österreichischem Hotelreglement (ÖHVB).',
      'bk.nights': 'Zimmer', 'bk.single': 'Einzelnutzung Doppelzimmer', 'bk.tax': 'Ortstaxe',
      'bk.taxLine': '{n} × {nights} Nächte × 3,50 €', 'bk.taxLine1': '{n} × 1 Nacht × 3,50 €',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail-Adresse', 'f.phone': 'Telefon',
      'f.arrival': 'Voraussichtliche Ankunftszeit (optional)',
      'f.msg': 'Wünsche oder Fragen (optional)',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener noreferrer">' +
        'Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben zur Abwicklung der Buchung einverstanden.',
      'f.submit': 'Verbindlich buchen',
      'e.name': 'Bitte geben Sie Ihren Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'e.phone': 'Bitte geben Sie eine Telefonnummer an, unter der wir Sie erreichen.',
      'e.consent': 'Bitte stimmen Sie der Datenschutzerklärung zu.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'Ihre Buchung ist bestätigt. Die Bestätigung geht an {email}.',
      'ok.no': 'Buchungsnummer', 'ok.demo': 'Dies ist eine Beta-Vorschau: Es wurde keine echte Buchung ausgelöst ' +
        'und keine E-Mail versendet.',
      'ok.close': 'Schließen', close: 'Schließen', menu: 'Menü',
      'map.link': 'In OpenStreetMap öffnen',
      'g.title': 'Anfrage für Gruppen und Busse', 'g.date': 'Zeitraum oder Datum', 'g.n': 'Personen', 'g.msg': 'Was Sie brauchen (Zimmer, Mahlzeiten, Ausflüge)',
      'g.org': 'Verein, Firma oder Busunternehmen (optional)', 'g.submit': 'Anfrage senden',
      'g.ok': 'Vielen Dank, {name}. Wir melden uns mit einem Angebot an {email}.',
      'e.date': 'Bitte nennen Sie einen Zeitraum.', 'e.n': 'Bitte geben Sie die Personenzahl an (ab 10).'
    },
    en: {
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Select date',
      'bw.btn': 'Check availability',
      adult1: 'adult', adultN: 'adults', kid1: 'child', kidN: 'children',
      night1: 'night', nightN: 'nights',
      'room.from': 'from', 'room.pn': 'per room and night', 'room.details': 'Details and photos', 'room.book': 'Book',
      'room.bookThis': 'Book this room', 'room.equip': 'Amenities',
      'room.priceNote': 'incl. breakfast buffet, plus local tax of €3.50 per person and night (from age 15)',
      'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'cal.hintIn': 'Please choose your arrival date.', 'cal.hintOut': 'Now choose your departure date.',
      'cal.reset': 'Reset selection',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children (up to 17)',
      'bk.age': 'Age of child', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.rooms': 'Rooms for your dates', 'bk.pickDates': 'Choose arrival and departure to see prices and availability.',
      'bk.select': 'Select', 'bk.busy': 'Booked for these dates', 'bk.small': 'Too small for this number of guests',
      'bk.big': 'Not intended for this number of guests',
      'bk.total': 'total', 'bk.incl': 'incl. breakfast buffet and local tax',
      'bk.none': 'Unfortunately no room is available for this combination. Please change the dates or number of ' +
        'guests – or call us: +43 6458 8156.',
      'bk.back': 'Back', 'bk.summary': 'Your booking', 'bk.stay': 'Dates', 'bk.room': 'Room',
      'bk.price': 'Total price', 'bk.pay': 'Payment in cash on site.',
      'bk.cancel': 'The booking and cancellation terms of the Austrian Hotel Contract Conditions (ÖHVB) apply.',
      'bk.nights': 'Room', 'bk.single': 'Single occupancy, double room', 'bk.tax': 'Local tax',
      'bk.taxLine': '{n} × {nights} nights × €3.50', 'bk.taxLine1': '{n} × 1 night × €3.50',
      'f.name': 'First and last name', 'f.email': 'Email address', 'f.phone': 'Phone',
      'f.arrival': 'Expected arrival time (optional)',
      'f.msg': 'Requests or questions (optional)',
      'f.consent': 'I have read the <a href="datenschutz.html" target="_blank" rel="noopener noreferrer">' +
        'privacy policy</a> and agree to my details being processed in order to handle the booking.',
      'f.submit': 'Book now',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid email address.',
      'e.phone': 'Please enter a phone number where we can reach you.',
      'e.consent': 'Please agree to the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'Your booking is confirmed. The confirmation will be sent to {email}.',
      'ok.no': 'Booking number', 'ok.demo': 'This is a beta preview: no real booking was made and no email was sent.',
      'ok.close': 'Close', close: 'Close', menu: 'Menu',
      'map.link': 'Open in OpenStreetMap',
      'g.title': 'Enquiry for groups and coaches', 'g.date': 'Dates or period', 'g.n': 'Number of guests', 'g.msg': 'What you need (rooms, meals, excursions)',
      'g.org': 'Club, company or coach operator (optional)', 'g.submit': 'Send enquiry',
      'g.ok': 'Thank you, {name}. We will get back to you with an offer at {email}.',
      'e.date': 'Please tell us your dates.', 'e.n': 'Please enter the number of guests (10 or more).'
    }
  };

  /* Englische Fassung der statischen Seitentexte (Schlüssel = data-i18n im HTML). */
  var EN = {
    beta: 'Beta preview — not a final design',
    menu: 'Menu', close: 'Close',
    'nav.rooms': 'Rooms', 'nav.breakfast': 'Breakfast', 'nav.location': 'Location', 'nav.seasons': 'Winter &amp; summer',
    'nav.groups': 'Groups', 'nav.reviews': 'Guests', 'nav.arrival': 'Getting here',
    'cta.book': 'Book', 'brand.sub': 'Hotel-Pension · Eben im Pongau',
    'hero.alt': 'Hotel-Pension Ebnerwirt with wooden balconies, flower boxes and the green awning in Eben im Pongau',
    'hero.title': 'Ebnerwirt',
    'hero.line': 'Bed and breakfast run by the Santner family. 450 m from the railway station, in the middle of Ski amadé.',
    'hero.note': '8.9 out of 10 · 642 reviews on Booking.com',
    'haus.alt': 'Double room in light wood with desk, armchair and balcony door',
    'haus.title': 'Run by the Santner family for decades',
    'haus.text': '25 rooms, every one with its own balcony. A lift, two wheelchair-accessible rooms, free parking at the ' +
      'house and a coach park. The ski bus stops in front of the door, the station is 450 metres away, the ' +
      'A10 motorway exit a few minutes by car. Guests give the staff 9.4 out of 10 on Booking.com, and ' +
      'cleanliness 9.4 as well.',
    'haus.fact1': 'rooms, all with balcony', 'haus.fact2': 'beds', 'haus.fact3': 'accessible rooms',
    'rooms.title': 'Rooms and rates',
    'rooms.lead': 'Rates per room and night including the breakfast buffet, plus local tax of €3.50 per person and ' +
      'night (from age 15).',
    'rooms.dzAlt': 'Double room with light wooden bed and balcony door',
    'rooms.dbAlt': 'Triple room with double bed and single bed',
    'rooms.vbAlt': 'Room with double bed and single bed',
    'rooms.dz': 'Double room', 'rooms.db': 'Triple room', 'rooms.vb': 'Quadruple room',
    'rooms.dzText': 'Double bed, shower and toilet, balcony. Single occupancy €25 less.',
    'rooms.dbText': 'Double bed and one single bed, balcony.',
    'rooms.vbText': 'Double bed and two single beds, balcony.',
    'rooms.pn': 'per room and night', 'rooms.from': 'from',
    'rooms.details': 'Details and photos', 'rooms.book': 'Book',
    'price.title': 'Price list', 'price.cat': 'Room', 'price.dz': 'Double room', 'price.db': 'Triple room', 'price.vb': 'Quadruple room',
    'price.winter': 'Winter 2026/27', 'price.summer': 'Summer 2027',
    'price.xmas': 'Christmas and New Year · 26 Dec 2026 – 10 Jan 2027',
    'price.zw': 'Low season · 11 – 31 Jan 2027 and 30 Mar – 16 Apr 2027',
    'price.haupt': 'High season · 1 Feb – 29 Mar 2027',
    'price.so': 'Summer rates 2027', 'price.col2': 'Monday–Thursday / Friday–Sunday',
    'price.col': 'from 4 nights / up to 4 nights',
    'price.note': 'All rates per room and night incl. breakfast buffet, plus local tax €3.50 per person and night (from age 15). ' +
      'Payment in cash on site. Dogs on request by phone, €15 per day. Booking and cancellation terms according to the ' +
      'Austrian Hotel Contract Conditions (ÖHVB).',
    'bf.alt': 'Breakfast buffet with bread rolls, cold cuts, cheese and fruit',
    'bf.alt2': 'Dining room with red upholstered benches and tables set for breakfast',
    'bf.title': 'Breakfast from the buffet, 7 to 9.30',
    'bf.text': 'The morning starts in the dining room with a generous buffet: bread rolls, cold cuts, cheese, fruit, ' +
      'warm dishes. Vegetarian, vegan and gluten-free options are available, and if you leave early we pack a ' +
      'breakfast to take away. In the evening the restaurant serves Austrian and international cooking; please ' +
      'tell us about allergies in advance. In summer you sit in the garden in front of the house – with a cold ' +
      'drink from the fridge.',
    'bf.f1': 'Breakfast', 'bf.f1v': '7.00–9.30 am', 'bf.f2': 'Buffet', 'bf.f2v': 'vegetarian, vegan, gluten-free',
    'bf.f3': 'Leaving early', 'bf.f3v': 'breakfast to take away',
    'lage.alt': 'Eben im Pongau from above: village, fields and mountains',
    'lage.title': 'Between the station and the motorway',
    'lage.text': 'The Ebnerwirt stands in the centre of Eben im Pongau, on the main street. The regional station is ' +
      '450 metres away, the A10 Tauern motorway leaves at the Pongau junction a few minutes from the house. ' +
      'This makes the house a good stop on the way south – and a base for excursions: ' +
      'Salzburg, the Eisriesenwelt, Hohenwerfen castle, the Dachstein glacier.',
    'lage.d1': 'Railway station Eben im Pongau', 'lage.d1v': '450 m',
    'lage.d2': 'Supermarket', 'lage.d2v': '50 m',
    'lage.d3': 'Ski bus to Flachau', 'lage.d3v': 'stops in front of the house',
    'lage.d4': 'Popolo lift 1', 'lage.d4v': '1 km',
    'lage.d5': 'Bathing lake Eben', 'lage.d5v': '10 minutes on foot',
    'lage.d6': 'Therme Amadé, Altenmarkt', 'lage.d6v': '4 km',
    'lage.d7': 'Salzburg airport', 'lage.d7v': '60 km',
    'lage.d8': 'Munich', 'lage.d8v': '190 km',
    'lage.stop': 'Stopover on the way south',
    'lage.stopText': 'Arrival from 4 pm, key box with code if you arrive late, departure by 10 am. Free parking at the ' +
      'house, motorbikes and bicycles go into the garage free of charge.',
    'winter.alt': 'Hotel-Pension Ebnerwirt in winter with snow and sunshine',
    'winter.title': 'Winter: 760 km of pistes with one ski pass',
    'winter.text': 'Ski amadé is Austria’s largest ski area: 760 kilometres of pistes and 270 lifts with a single pass. ' +
      'The free ski bus stops in front of the house and takes you to Flachau; the family ski area Monte Popolo in ' +
      'Eben is a few minutes away. In the house there is a ski room. Two toboggan runs (Reitlehenalm and Halmgut), ' +
      '200 kilometres of cross-country trails in the Salzburger Sportwelt and the high trails at Rossbrand and ' +
      'Gnadenalm until well into spring.',
    'winter.f1': 'Ski amadé', 'winter.f1v': '760 km of pistes, 270 lifts',
    'winter.f2': 'Ski bus', 'winter.f2v': 'free, in front of the house',
    'winter.f3': 'Ski hire', 'winter.f3v': 'Sport Klieber in Eben',
    'sommer.alt': 'Bathing lake in Eben im Pongau with meadow and mountains',
    'sommer.title': 'Summer: 80 km of hiking trails from the door',
    'sommer.text': 'In Eben alone there are over 80 kilometres of marked hiking trails, in the region more than 500. ' +
      'The Enns cycle path, 252 kilometres long, starts here; bicycles and mountain bikes go into our garage free ' +
      'of charge. The Eben bathing lake with 7,000 m² of water, two slides and a beach volleyball court is a ' +
      'walk away. Many sights – Hohenwerfen castle, the Eisriesenwelt, the Dachstein glacier – are free or reduced ' +
      'with the SalzburgerLand Card.',
    'sommer.f1': 'Hiking trails in Eben', 'sommer.f1v': 'over 80 km',
    'sommer.f2': 'Enns cycle path', 'sommer.f2v': '252 km, starts in the region',
    'sommer.f3': 'Bathing lake', 'sommer.f3v': '7,000 m², 10 minutes on foot',
    'gr.title': 'Coaches and groups',
    'gr.text': 'The Ebnerwirt has hosted coach parties, groups and clubs for many years, in summer and winter. ' +
      '25 rooms with 65 beds, a lift, and a coach park right at the hotel. For groups we put together ' +
      'arrangements: breakfast from the buffet, lunch, coffee and cake or dinner – and we help plan the excursions.',
    'gr.f1': 'beds in 25 rooms', 'gr.f2': 'Lift and coach park', 'gr.f3': 'meals: breakfast, lunch, coffee, dinner',
    'gr.list': 'Excursions for groups', 'gr.cta': 'Group enquiry',
    'rev.title': 'What guests write',
    'rev.q1src': 'Karolin, Germany · Booking.com',
    'rev.q2src': 'Susanne, Germany · Booking.com',
    'rev.q3src': 'Ondřej, Czech Republic · Booking.com',
    'rev.score': '8.9 out of 10 on Booking.com, 642 reviews. Staff 9.4 · Cleanliness 9.4 · Comfort 9.2 · ' +
      'Value for money 8.9 · Location 8.9. Retrieved on 7 October 2026.',
    'rev.link': 'Read all reviews on Booking.com',
    'arr.title': 'Getting here',
    'arr.1t': 'By car',
    'arr.1': 'A10 Tauern motorway to the Pongau junction, exit Eben im Pongau. The house is in the village centre on ' +
      'the left-hand side of the main street. Free parking at the house; underground parking next door for a fee.',
    'arr.2t': 'By train',
    'arr.2': 'Regional station Eben im Pongau, 450 metres from the house. The nearest Intercity stops are Radstadt ' +
      '(10 km) and Bischofshofen (20 km).',
    'arr.3t': 'By plane',
    'arr.3': 'Salzburg airport is 60 km away, Munich 230 km. We are happy to organise a transfer from the airport.',
    'arr.4t': 'Arrival and departure',
    'arr.4': 'Rooms are ready from 4 pm; please let us know if you arrive late – there is a key box with a code. ' +
      'Departure by 10 am. Payment in cash on site.',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the ' +
      'OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Hotel-Pension Ebnerwirt, Tourismusverband Eben im Pongau',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'g.title': 'Enquiry for groups and coaches',
    'bk.title': 'Book a room', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
  };

  window.EBNERWIRT = { ROOMS: ROOMS, UI: UI, EN: EN };
})();
