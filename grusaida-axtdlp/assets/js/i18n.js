/* Hotel Garni Grusaida — Inhalte: Zimmer und Preise, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Preise laut garni-alpenrose.ch/zimmer/ (abgerufen 7.10.2026): «Ab CHF …/Nacht», pro Nacht und Zimmer mit Frühstück,
     inkl. MwSt. und Taxen. Die Vorschau rechnet mit dem «ab»-Preis (Untergrenze); Saisonpreise nennt das Haus nicht.
     Direktbucher: ab 3 Übernachtungen 4–5 % Rabatt (Vorschau: 4 %), Parkplatz kostenlos. Hund CHF 10 pro Nacht.
     cap = Personen höchstens. busy = Demo-Auslastung (1 locker … 4 oft belegt). */
  var ROOMS = [
    {
      id: 'dz', cap: 2, busy: 3, from: 176,
      imgs: ['dz-1', 'dz-2', 'dz-3', 'dz-4'],
      de: {
        name: 'Doppelzimmer mit Dusche/WC', short: 'Arvenholzbett, Sitzecke, Dusche und WC im Zimmer.',
        cap: 'für 2 Personen',
        text: 'Doppelbett und Möbel aus einheimischem Arvenholz, Sitzecke, Radio und Sat-TV, Dusche und WC im Zimmer. ' +
          'Einige Zimmer mit Balkon. Täglich eine Flasche Mineralwasser.',
        equip: ['Doppelbett aus Arvenholz', 'Dusche und WC', 'Sitzecke', 'Radio, Sat-TV', 'Haartrockner', 'Free WLAN'],
        alts: ['Doppelzimmer mit Bett und Schreibtisch aus Arvenholz, rote Vorhänge', 'Doppelbett aus Arvenholz mit grauer Bettwäsche',
          'Doppelzimmer unter der Dachschräge mit Balkontür', 'Bad mit Dusche, Waschtisch und gelben Handtüchern']
      },
      en: {
        name: 'Double room with shower/WC', short: 'Stone-pine bed, seating corner, shower and WC in the room.',
        cap: 'for 2 guests',
        text: 'Double bed and furniture made of local stone pine, seating corner, radio and satellite TV, shower and WC in the room. ' +
          'Some rooms have a balcony. A bottle of mineral water every day.',
        equip: ['Stone-pine double bed', 'Shower and WC', 'Seating corner', 'Radio, satellite TV', 'Hairdryer', 'Free Wi-Fi'],
        alts: ['Double room with stone-pine bed and desk, red curtains', 'Stone-pine double bed with grey bed linen',
          'Double room under the sloping roof with balcony door', 'Bathroom with shower, washbasin and yellow towels']
      }
    },
    {
      id: 'tuermli', cap: 2, busy: 4, from: 188,
      imgs: ['tuermli-1', 'tuermli-2', 'tuermli-3', 'tuermli-4'],
      de: {
        name: 'Doppelzimmer «Türmli»', short: 'Im Turm des Hauses, mit Sicht auf die Unterengadiner Bergwelt.',
        cap: 'für 2 Personen',
        text: 'Unser Zimmer im «Türmli»: Doppelbett aus Arvenholz unter der Holzdecke, Sitzecke, Dusche und WC – und der Blick ' +
          'auf die Unterengadiner Bergwelt.',
        equip: ['Doppelbett aus Arvenholz', 'Sicht auf die Berge', 'Dusche und WC', 'Sitzecke', 'Radio, Sat-TV', 'Free WLAN'],
        alts: ['Zimmer «Türmli» mit Doppelbett, Holzdecke und zwei Fenstern', 'Sitzecke mit grauem Sofa und Treppe im «Türmli»',
          'Arvenholzschrank und Schreibtisch im «Türmli»', 'Doppelzimmer mit Schreibtisch und Fenster zur Bergseite']
      },
      en: {
        name: 'Double room “Türmli”', short: 'In the tower of the house, with a view of the Lower Engadine mountains.',
        cap: 'for 2 guests',
        text: 'Our room in the “Türmli” (little tower): stone-pine double bed under the wooden ceiling, seating corner, shower and WC – ' +
          'and the view of the Lower Engadine mountains.',
        equip: ['Stone-pine double bed', 'Mountain view', 'Shower and WC', 'Seating corner', 'Radio, satellite TV', 'Free Wi-Fi'],
        alts: ['“Türmli” room with double bed, wooden ceiling and two windows', 'Seating corner with grey sofa and stairs in the “Türmli”',
          'Stone-pine wardrobe and desk in the “Türmli”', 'Double room with desk and window facing the mountains']
      }
    },
    {
      id: 'dz-etage', cap: 2, busy: 2, from: 160,
      imgs: ['dz-etage-1', 'dz-etage-2', 'dz-etage-3'],
      de: {
        name: 'Doppelzimmer mit Etagendusche/WC', short: 'Waschtisch im Zimmer, Dusche und WC auf der Etage.',
        cap: 'für 2 Personen',
        text: 'Doppelbett aus Arvenholz, Waschtisch im Zimmer, Dusche und WC auf der Etage. Radio, Sat-TV, Sitzecke. ' +
          'Die günstige Art, im Arvenduft zu schlafen.',
        equip: ['Doppelbett aus Arvenholz', 'Waschtisch im Zimmer', 'Dusche und WC auf der Etage', 'Sitzecke', 'Radio, Sat-TV', 'Free WLAN'],
        alts: ['Doppelzimmer mit Arvenholzbett und Waschtisch im Zimmer', 'Doppelzimmer mit Doppelbett, Sessel und rotem Vorhang',
          'Dusche und WC auf der Etage mit weissen Fliesen']
      },
      en: {
        name: 'Double room, shared shower/WC', short: 'Washbasin in the room, shower and WC on the floor.',
        cap: 'for 2 guests',
        text: 'Stone-pine double bed, washbasin in the room, shower and WC on the floor. Radio, satellite TV, seating corner. ' +
          'The economical way to sleep in the scent of stone pine.',
        equip: ['Stone-pine double bed', 'Washbasin in the room', 'Shower and WC on the floor', 'Seating corner', 'Radio, satellite TV', 'Free Wi-Fi'],
        alts: ['Double room with stone-pine bed and washbasin in the room', 'Double room with double bed, armchair and red curtain',
          'Shared shower and WC with white tiles']
      }
    },
    {
      id: 'ez', cap: 1, busy: 3, from: 102,
      imgs: ['ez-1', 'ez-2', 'ez-3'],
      de: {
        name: 'Einzelzimmer mit Dusche/WC', short: 'Arvenholzbett, Schreibtisch, Dusche und WC im Zimmer.',
        cap: 'für 1 Person',
        text: 'Einzelbett aus Arvenholz, Schreibtisch, Radio und Sat-TV, Dusche und WC im Zimmer.',
        equip: ['Einzelbett aus Arvenholz', 'Dusche und WC', 'Schreibtisch', 'Radio, Sat-TV', 'Haartrockner', 'Free WLAN'],
        alts: ['Einzelzimmer mit Arvenholzbett, Schreibtisch und Regal', 'Waschtisch mit Spiegel im Einzelzimmer',
          'Einzelzimmer unter der Dachschräge mit oranger Decke']
      },
      en: {
        name: 'Single room with shower/WC', short: 'Stone-pine bed, desk, shower and WC in the room.',
        cap: 'for 1 guest',
        text: 'Stone-pine single bed, desk, radio and satellite TV, shower and WC in the room.',
        equip: ['Stone-pine single bed', 'Shower and WC', 'Desk', 'Radio, satellite TV', 'Hairdryer', 'Free Wi-Fi'],
        alts: ['Single room with stone-pine bed, desk and shelf', 'Washbasin with mirror in the single room',
          'Single room under the sloping roof with orange blanket']
      }
    },
    {
      id: 'ez-etage', cap: 1, busy: 2, from: 87,
      imgs: ['ez-etage-1', 'ez-etage-2'],
      de: {
        name: 'Einzelzimmer mit Etagendusche/WC', short: 'Waschtisch im Zimmer, Dusche und WC auf der Etage.',
        cap: 'für 1 Person',
        text: 'Einzelbett aus Arvenholz, Waschtisch im Zimmer, Dusche und WC auf der Etage. Radio, Sat-TV.',
        equip: ['Einzelbett aus Arvenholz', 'Waschtisch im Zimmer', 'Dusche und WC auf der Etage', 'Radio, Sat-TV', 'Free WLAN'],
        alts: ['Einzelzimmer mit Arvenholzbett, Waschtisch und rotem Vorhang', 'Einzelzimmer mit Bett, Tisch und Heizkörper am Fenster']
      },
      en: {
        name: 'Single room, shared shower/WC', short: 'Washbasin in the room, shower and WC on the floor.',
        cap: 'for 1 guest',
        text: 'Stone-pine single bed, washbasin in the room, shower and WC on the floor. Radio, satellite TV.',
        equip: ['Stone-pine single bed', 'Washbasin in the room', 'Shower and WC on the floor', 'Radio, satellite TV', 'Free Wi-Fi'],
        alts: ['Single room with stone-pine bed, washbasin and red curtain', 'Single room with bed, table and radiator by the window']
      }
    }
  ];

  var UI = {
    de: {
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum',
      'bw.btn': 'Verfügbarkeit prüfen',
      adult1: 'Person', adultN: 'Personen', night1: 'Nacht', nightN: 'Nächte',
      'room.from': 'ab', 'room.pn': 'pro Zimmer und Nacht', 'room.details': 'Details und Fotos', 'room.book': 'Buchen',
      'room.bookThis': 'Dieses Zimmer buchen', 'room.equip': 'Ausstattung',
      'room.priceNote': 'mit Frühstück, inkl. MwSt. und Taxen · direkt gebucht: Parkplatz kostenlos, ab 3 Nächten 4 % Rabatt',
      'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.closed': 'Betriebsferien', 'cal.sel': 'Ihre Auswahl',
      'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
      'cal.reset': 'Auswahl zurücksetzen',
      'bk.guests': 'Gäste', 'bk.adults': 'Personen', 'bk.dog': 'Hund (CHF 10 pro Nacht, auf Anfrage)',
      'bk.kids': 'Mit Kindern? Kinderpreise auf Anfrage: +41 81 864 14 74',
      'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Zimmer für Ihren Zeitraum', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie Preis und Verfügbarkeit.',
      'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl zu klein',
      'bk.total': 'gesamt', 'bk.incl': 'mit Frühstück, inkl. MwSt. und Taxen',
      'bk.direct': 'Direkt gebucht: Parkplatz kostenlos.',
      'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie den Zeitraum – ' +
        'oder rufen Sie uns an: +41 81 864 14 74.',
      'bk.closed': 'In diesem Zeitraum haben wir Betriebsferien (14.11.–20.12.2026 und 04.04.–08.05.2027).',
      'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
      'bk.price': 'Gesamtpreis', 'bk.pay': 'Zahlung vor Ort.',
      'bk.cancel': 'Kostenlose Stornierung bis 7 Tage vor Anreise (Vorschlag für die Vorschau).',
      'bk.nights': 'Zimmer', 'bk.disc': 'Direktbucher-Rabatt ab 3 Nächten (4 %)', 'bk.dogLine': 'Hund',
      'bk.perNight': '{n} × CHF {p}',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail-Adresse', 'f.phone': 'Telefon',
      'f.arrival': 'Voraussichtliche Ankunftszeit (Rezeption bis 19 Uhr)',
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
      'ok.close': 'Schliessen', close: 'Schliessen', menu: 'Menü',
      'map.link': 'In OpenStreetMap öffnen'
    },
    en: {
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Date',
      'bw.btn': 'Check availability',
      adult1: 'guest', adultN: 'guests', night1: 'night', nightN: 'nights',
      'room.from': 'from', 'room.pn': 'per room and night', 'room.details': 'Details and photos', 'room.book': 'Book',
      'room.bookThis': 'Book this room', 'room.equip': 'Amenities',
      'room.priceNote': 'with breakfast, incl. VAT and taxes · booked direct: free parking, 4% off from 3 nights',
      'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.closed': 'closed', 'cal.sel': 'your selection',
      'cal.hintIn': 'Please choose your arrival date.', 'cal.hintOut': 'Now choose your departure date.',
      'cal.reset': 'Reset selection',
      'bk.guests': 'Guests', 'bk.adults': 'Guests', 'bk.dog': 'Dog (CHF 10 per night, on request)',
      'bk.kids': 'Travelling with children? Children’s rates on request: +41 81 864 14 74',
      'bk.less': 'fewer', 'bk.more': 'more',
      'bk.rooms': 'Rooms for your dates', 'bk.pickDates': 'Choose arrival and departure to see prices and availability.',
      'bk.select': 'Select', 'bk.busy': 'Booked for these dates', 'bk.small': 'Too small for this number of guests',
      'bk.total': 'total', 'bk.incl': 'with breakfast, incl. VAT and taxes',
      'bk.direct': 'Booked direct: free parking.',
      'bk.none': 'Unfortunately no room is available for this combination. Please change the dates – ' +
        'or call us: +41 81 864 14 74.',
      'bk.closed': 'The house is closed during this period (14 Nov – 20 Dec 2026 and 4 Apr – 8 May 2027).',
      'bk.back': 'Back', 'bk.summary': 'Your booking', 'bk.stay': 'Dates', 'bk.room': 'Room',
      'bk.price': 'Total price', 'bk.pay': 'Payment on site.',
      'bk.cancel': 'Free cancellation up to 7 days before arrival (proposal for the preview).',
      'bk.nights': 'Room', 'bk.disc': 'Direct-booking discount from 3 nights (4%)', 'bk.dogLine': 'Dog',
      'bk.perNight': '{n} × CHF {p}',
      'f.name': 'First and last name', 'f.email': 'Email address', 'f.phone': 'Phone',
      'f.arrival': 'Expected arrival time (reception until 7 pm)',
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
      'map.link': 'Open in OpenStreetMap'
    }
  };

  /* Englische Fassung der statischen Seitentexte (Schlüssel = data-i18n im HTML). */
  var EN = {
    beta: 'Beta preview — not a final design',
    menu: 'Menu', close: 'Close',
    'nav.house': 'The house', 'nav.rooms': 'Rooms', 'nav.direct': 'Book direct', 'nav.breakfast': 'Breakfast',
    'nav.area': 'Around us', 'nav.reviews': 'Guests', 'nav.arrival': 'Getting here',
    'cta.book': 'Book', 'brand.sub': 'Hotel Garni · Scuol',
    'hero.title': 'Simply local.',
    'hero.line': 'Hotel Garni · Scuol · Lower Engadine',
    'hero.sub': 'Run by the Gisep-Denoth family for four generations. 12 rooms in stone pine, breakfast from our own bakery.',
    'hero.note': '9.0 out of 10 · 362 reviews on Booking.com',
    'haus.alt': 'Hotel Garni Grusaida: white Engadine house with wooden balconies and mountains in autumn',
    'haus.cap': 'The house at the edge of the village, on the sunny side of Scuol.',
    'haus.title': 'Four generations in Scuol',
    'haus.text': 'Allegra and bainvgnü. We are a small, family-run bed and breakfast in a very sunny spot at the edge of ' +
      'Scuol in the Lower Engadine – twelve rooms, thirty beds, the Gisep-Denoth family for four generations. ' +
      'Restaurants, the Bogn Engiadina spa and the Clozza bus stop are a few minutes’ walk away. The reception is ' +
      'staffed until 7 pm; if you arrive later, just let us know.',
    'haus.f1': 'Rooms', 'haus.f1v': '12, none like another',
    'haus.f2': 'Beds', 'haus.f2v': '30',
    'haus.f3': 'Check-in', 'haus.f3v': 'from 3 pm, reception until 7 pm',
    'haus.f4': 'Check-out', 'haus.f4v': 'until 11 am',
    'stube.alt': 'Breakfast room with stone-pine ceiling, arched niches and laid tables',
    'arve.title': 'Stone pine in every room',
    'arve.text': 'No room is like another, yet they all share one thing: the scent of local stone pine. Beds, wardrobes ' +
      'and ceilings are made of it – it is said to help you sleep deeply. Our guests on Booking.com write about it too: ' +
      '“Aroma of wood in the room.”',
    'arve.alt1': 'Bedside lamp made of stone-pine blocks', 'arve.alt2': 'Painted wooden coat hangers with Engadine flower pattern',
    'arve.alt3': 'Carved rosette on a stone-pine chair', 'arve.alt4': 'Staircase with carved stone-pine banister',
    'rooms.title': 'Rooms and rates',
    'rooms.lead': 'Five categories. Rates per room and night with breakfast, incl. VAT and taxes. Some rooms have a balcony. ' +
      'Rates vary by season – the figures shown are the lowest.',
    'rooms.dzAlt': 'Double room with stone-pine bed and desk', 'rooms.tuAlt': '“Türmli” room with wooden ceiling and two windows',
    'rooms.dzeAlt': 'Double room with washbasin in the room', 'rooms.ezAlt': 'Single room with stone-pine bed and desk',
    'rooms.ezeAlt': 'Single room with washbasin and red curtain',
    'rooms.dz': 'Double room with shower/WC', 'rooms.tu': 'Double room “Türmli”', 'rooms.dze': 'Double room, shared shower/WC',
    'rooms.ez': 'Single room with shower/WC', 'rooms.eze': 'Single room, shared shower/WC',
    'rooms.dzText': 'Stone-pine double bed, seating corner, shower and WC in the room. Some with balcony.',
    'rooms.tuText': 'In the tower of the house, with a view of the Lower Engadine mountains.',
    'rooms.dzeText': 'Washbasin in the room, shower and WC on the floor.',
    'rooms.ezText': 'Stone-pine bed, desk, shower and WC in the room.',
    'rooms.ezeText': 'Washbasin in the room, shower and WC on the floor.',
    'rooms.pn': 'per night', 'rooms.from': 'from',
    'rooms.details': 'Details and photos', 'rooms.book': 'Book',
    'rooms.equipTitle': 'In every room',
    'rooms.e1': 'Stone-pine furniture', 'rooms.e2': 'Radio and satellite TV', 'rooms.e3': 'Hairdryer', 'rooms.e4': 'Shampoo and shower gel',
    'rooms.e5': 'A bottle of mineral water every day', 'rooms.e6': 'Daily cleaning', 'rooms.e7': 'Free Wi-Fi', 'rooms.e8': 'Non-smoking',
    'direct.title': 'Booking direct pays off',
    'direct.text': 'Whoever books with us rather than through a portal gets what we can only offer here:',
    'direct.l1': 'Parking at the house', 'direct.l1v': 'free of charge',
    'direct.l2': 'From three nights', 'direct.l2v': '4–5% off the room rate',
    'direct.l3': 'Early risers', 'direct.l3v': 'breakfast from 6 am by arrangement',
    'direct.l4': 'Packed lunch', 'direct.l4v': 'order by noon the day before',
    'direct.l5': 'Luggage', 'direct.l5v': 'storage on early arrival or late departure',
    'direct.note': 'In this preview the discount from three nights is deducted automatically in the booking.',
    'direct.cta': 'Check availability',
    'bf.title': 'Bun di – slept well?',
    'bf.text': 'Breakfast is served from 7.30 to 10 am – everything from our own family bakery, the Pastizaria Cantieni: ' +
      'fresh crusty bread, homemade jam, Engadine nut cake. Plus coffee, milk, yoghurt, cheese, cold cuts, eggs and ' +
      'homemade Bircher muesli. If you need to leave early, we serve breakfast from 6 am by arrangement.',
    'bf.f1': 'Breakfast', 'bf.f1v': '7.30 – 10 am', 'bf.f2': 'Early risers', 'bf.f2v': 'from 6 am by arrangement',
    'bf.f3': 'Bakery', 'bf.f3v': 'Pastizaria Cantieni, family-owned',
    'bf.alt1': 'Basket of fresh bread rolls, cup and orange juice on the breakfast table',
    'bf.alt2': 'Engadine nut cake, cut, with dried apricots', 'bf.alt3': 'Jars of homemade jam on the breakfast buffet',
    'area.title': 'Free travel across the Lower Engadine',
    'area.text': 'From the first night you receive the Gästekarte Plus: unlimited travel on the Rhaetian Railway between ' +
      'Scuol-Tarasp and S-chanf, on all PostBus routes in the Lower Engadine including S-charl, Val Müstair and Samnaun, ' +
      'and on the Scuol cable cars (unlimited in summer, one return trip a day for walkers in winter). Your dog travels ' +
      'free. Plus 20% off the Bogn Engiadina spa and discounts on more than 70 holiday activities. Valid on arrival and ' +
      'departure day too.',
    'area.d1': 'Clozza bus stop', 'area.d1v': '2 minutes on foot',
    'area.d2': 'Bogn Engiadina – spa and sauna', 'area.d2v': 'approx. 500 m, 6 minutes on foot',
    'area.d3': 'Village centre of Scuol', 'area.d3v': '0.7 km',
    'area.d4': 'Scuol-Tarasp railway station', 'area.d4v': 'approx. 3 km, PostBus to Clozza',
    'area.d5': 'Scuol cable cars (Motta Naluns)', 'area.d5v': 'free with the Gästekarte Plus',
    'area.d6': 'Swiss National Park centre, Zernez', 'area.d6v': 'approx. 33 km, by train or PostBus',
    'area.d7': 'Ski room with boot warmer, bike garage', 'area.d7v': 'in the house',
    'area.alt': 'Yellow PostBus passing the geraniums at the house',
    'area.alt2': 'View from the balcony over Scuol at sunset',
    'rev.title': 'What guests write',
    'rev.q1src': 'Aurélie, Switzerland · Booking.com',
    'rev.q2src': 'Pavlo, Ukraine · Booking.com',
    'rev.q3src': 'Alena, Switzerland · Booking.com',
    'rev.score': '9.0 out of 10 on Booking.com, 362 reviews. Staff 9.8 · Cleanliness 9.5 · Comfort 9.3 · ' +
      'Value for money 9.1 · Location 8.8. Retrieved on 7 October 2026.',
    'rev.link': 'Read all reviews on Booking.com',
    'fassade.alt': 'Front of the house with wooden balconies, geraniums and brown shutters',
    'arr.title': 'Getting here',
    'arr.1t': 'By car',
    'arr.1': 'Via the Engadine: exit Scuol Ost. The house is on the Stradun at the edge of the village; parking at the house ' +
      'is free for direct bookers, motorbikes go into the garage.',
    'arr.2t': 'By train and PostBus',
    'arr.2': 'Rhaetian Railway to Scuol-Tarasp station, then PostBus to the Clozza stop – from there it is two minutes on foot. ' +
      'With the Gästekarte Plus the bus is free from the first night.',
    'arr.3t': 'Arrival and departure',
    'arr.3': 'Check-in from 3 pm, check-out until 11 am. The reception is staffed until 7 pm – if you arrive later, ' +
      'please contact us. Luggage can be stored on early arrival or late departure.',
    'arr.4t': 'Opening times',
    'arr.4': 'Summer season 16 May – 13 November 2026. Winter season 21 December 2026 – 3 April 2027. ' +
      'Closed 14 November – 20 December 2026 and 4 April – 8 May 2027.',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the ' +
      'OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Hotel Garni Grusaida / Jean-Marie Delnon, Gammeter Media AG',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'bk.title': 'Book a room', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
  };

  window.GRUSAIDA = { ROOMS: ROOMS, UI: UI, EN: EN };
})();
