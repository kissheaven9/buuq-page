/* Hotel Garni Alpenruh, Lenk — Beta-Vorschau. Inhalte: Zimmer und Preise, UI-Texte (DE/EN), englische Übersetzung.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt.
   Preise laut alpenruh-lenk.ch/angebot/zimmer-mit-wc-dusche und /angebot/budgetzimmer (abgerufen 27.10.2026):
   pro Person und Nacht inkl. Frühstück, Kurtaxen, MWST. Kinder bis 12 Jahre 20 %, bis 6 Jahre 50 % Ermässigung.
   Die Vorschau rechnet mit dem unteren Wert der Spanne (ab-Preis); die genaue Einstufung legt das Haus fest. */
(function () {
  'use strict';

  var ROOMS = [
    {
      id: 'sued', from: 70, to: 87, busy: 3, imgs: ['zimmer-sued', 'fenster', 'bett'],
      de: {
        name: 'Zimmer Süd mit Balkon', short: 'Dusche/WC, Südseite, Balkon mit Blick ins Tal.',
        text: 'Unsere Zimmer mit Dusche/WC auf der Südseite haben einen Balkon. Zwei Betten, Tisch mit zwei Stühlen, ' +
          'zwei Sessel, HD-TV, Radio, Haarföhn und Wecker. WLAN ist kostenlos.',
        equip: ['Dusche und WC im Zimmer', 'Balkon, Südausrichtung', 'Zwei Betten', 'HD-TV, Radio, Wecker', 'Haarföhn', 'WLAN kostenlos'],
        alts: ['Zimmer Süd mit zwei Betten, Tisch, grünen Sesseln und Balkontür', 'Blick aus dem Zimmer auf Geranien und Berge', 'Zwei Betten mit weisser Bettwäsche']
      },
      en: {
        name: 'South room with balcony', short: 'Shower/WC, south side, balcony facing the valley.',
        text: 'Our rooms with shower/WC on the south side have a balcony. Two beds, a table with two chairs, two armchairs, ' +
          'HD TV, radio, hairdryer and alarm clock. Wi-Fi is free.',
        equip: ['Shower and WC in the room', 'Balcony, south-facing', 'Two beds', 'HD TV, radio, alarm clock', 'Hairdryer', 'Free Wi-Fi'],
        alts: ['South room with two beds, table, green armchairs and balcony door', 'View from the room onto geraniums and mountains', 'Two beds with white linen']
      }
    },
    {
      id: 'nord', from: 70, to: 87, busy: 2, imgs: ['zimmer-nord', 'bett'],
      de: {
        name: 'Zimmer Nord', short: 'Dusche/WC, ruhige Nordseite, ohne Balkon.',
        text: 'Die ruhigeren Zimmer auf der Nordseite, ohne Balkon, mit Dusche/WC. Zwei Betten, Tisch mit zwei Stühlen, ' +
          'Sessel, HD-TV, Radio, Haarföhn und Wecker. WLAN ist kostenlos.',
        equip: ['Dusche und WC im Zimmer', 'Ruhige Nordseite', 'Zwei Betten', 'HD-TV, Radio, Wecker', 'Haarföhn', 'WLAN kostenlos'],
        alts: ['Zimmer Nord mit zwei Betten, Tisch und grünem Sessel', 'Zwei Betten mit weisser Bettwäsche']
      },
      en: {
        name: 'North room', short: 'Shower/WC, quiet north side, no balcony.',
        text: 'The quieter rooms on the north side, without balcony, with shower/WC. Two beds, a table with two chairs, ' +
          'armchair, HD TV, radio, hairdryer and alarm clock. Wi-Fi is free.',
        equip: ['Shower and WC in the room', 'Quiet north side', 'Two beds', 'HD TV, radio, alarm clock', 'Hairdryer', 'Free Wi-Fi'],
        alts: ['North room with two beds, table and green armchair', 'Two beds with white linen']
      }
    },
    {
      id: 'budget', from: 60, to: 77, busy: 2, imgs: ['budget', 'fenster'],
      de: {
        name: 'Budgetzimmer', short: 'Lavabo im Zimmer, Dusche und WC auf der Etage.',
        text: 'Fürs kleine Budget: Zimmer mit Lavabo, Dusche und WC auf der Etage. HD-TV, Radio, Haarföhn und Wecker ' +
          'wie in allen Zimmern. WLAN ist kostenlos.',
        equip: ['Lavabo im Zimmer', 'Dusche und WC auf der Etage', 'HD-TV, Radio, Wecker', 'Haarföhn', 'WLAN kostenlos'],
        alts: ['Budgetzimmer mit Lavabo, Spiegel und Heizkörper', 'Blick aus dem Zimmer auf Geranien und Berge']
      },
      en: {
        name: 'Budget room', short: 'Washbasin in the room, shower and WC on the floor.',
        text: 'For a small budget: room with washbasin, shower and WC on the floor. HD TV, radio, hairdryer and alarm clock ' +
          'as in all rooms. Wi-Fi is free.',
        equip: ['Washbasin in the room', 'Shower and WC on the floor', 'HD TV, radio, alarm clock', 'Hairdryer', 'Free Wi-Fi'],
        alts: ['Budget room with washbasin, mirror and radiator', 'View from the room onto geraniums and mountains']
      }
    }
  ];

  /* UI-Texte für den Buchungsablauf und Widgets */
  var UI = {
    de: {
      adult1: 'Erwachsener', adultN: 'Erwachsene', night1: 'Nacht', nightN: 'Nächte',
      kid1: 'Kind', kidN: 'Kinder', pp: 'pro Person und Nacht', from: 'ab',
      'bk.title': 'Zimmer buchen', 'bk.s1': 'Zeitraum, Gäste, Zimmer', 'bk.s2': 'Ihre Daten', 'bk.s3': 'Bestätigung',
      'cal.hintIn': 'Anreisetag wählen', 'cal.hintOut': 'Abreisetag wählen', 'cal.reset': 'zurücksetzen',
      'cal.prev': 'Voriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.closed': 'Betriebsferien', 'cal.sel': 'gewählt',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids7': 'Kinder 7–12 Jahre', 'bk.kids6': 'Kinder bis 6 Jahre',
      'bk.kidsNote': 'Kinder bis 12 Jahre 20 %, bis 6 Jahre 50 % Ermässigung. Mehr als zwei Erwachsene oder zwei Kinder: bitte anrufen.',
      'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Zimmer', 'bk.pickDates': 'Bitte zuerst An- und Abreise wählen.',
      'bk.busy': 'in diesem Zeitraum belegt', 'bk.select': 'Wählen', 'bk.total': 'gesamt',
      'bk.none': 'Für diesen Zeitraum ist leider kein Zimmer frei. Bitte wählen Sie andere Tage oder rufen Sie uns an: +41 33 733 10 64.',
      'bk.closed': 'In diesem Zeitraum ist das Haus geschlossen. Saison: 12.12.2026 – 4.4.2027 und 21.6. – 17.10.2027.',
      'bk.incl': 'Preise pro Person und Nacht inkl. Frühstücksbuffet, Kurtaxe und MWST',
      'bk.range': 'Die Vorschau rechnet mit dem unteren Wert der Preisspanne; den genauen Preis bestätigt das Haus.',
      'bk.summary': 'Ihre Buchung', 'bk.room': 'Zimmer', 'bk.stay': 'Aufenthalt', 'bk.price': 'Gesamtpreis',
      'bk.line': '{n} × {p}', 'bk.back': 'Zurück',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.arrival': 'Ankunftszeit (Check-in 15–22 Uhr)',
      'f.msg': 'Bemerkungen (Hund, Velo, Anreise mit dem Zug …)', 'f.consent': 'Ich habe die Datenschutzerklärung gelesen.',
      'f.submit': 'Verbindlich anfragen',
      'e.name': 'Bitte Vor- und Nachnamen angeben.', 'e.email': 'Bitte eine gültige E-Mail-Adresse angeben.',
      'e.phone': 'Bitte eine Telefonnummer angeben.', 'e.consent': 'Bitte die Datenschutzerklärung bestätigen.',
      'ok.title': 'Danke, {name}!', 'ok.text': 'Wir bestätigen Ihre Buchung innert 24 Stunden per E-Mail an {email}.',
      'ok.no': 'Buchungsnummer',
      'ok.demo': 'Dies ist eine Vorschau: Es wurde nichts gebucht und keine Daten wurden übermittelt.',
      'ok.close': 'Schliessen',
      'room.photo': 'Foto', 'gal.prev': 'Voriges Foto', 'gal.next': 'Nächstes Foto', 'room.equip': 'Ausstattung',
      'room.bookThis': 'Dieses Zimmer buchen', 'room.priceNote': 'pro Person und Nacht inkl. Frühstück, Kurtaxe und MWST',
      'map.link': 'In OpenStreetMap öffnen', 'menu': 'Menü', 'close': 'Schliessen'
    },
    en: {
      adult1: 'adult', adultN: 'adults', night1: 'night', nightN: 'nights',
      kid1: 'child', kidN: 'children', pp: 'per person per night', from: 'from',
      'bk.title': 'Book a room', 'bk.s1': 'Dates, guests, room', 'bk.s2': 'Your details', 'bk.s3': 'Confirmation',
      'cal.hintIn': 'Choose arrival day', 'cal.hintOut': 'Choose departure day', 'cal.reset': 'reset',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'free', 'cal.busy': 'booked', 'cal.closed': 'closed', 'cal.sel': 'selected',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids7': 'Children 7–12', 'bk.kids6': 'Children up to 6',
      'bk.kidsNote': 'Children up to 12: 20 % off, up to 6: 50 % off. More than two adults or two children: please call.',
      'bk.less': 'fewer', 'bk.more': 'more',
      'bk.rooms': 'Rooms', 'bk.pickDates': 'Please choose arrival and departure first.',
      'bk.busy': 'booked for these dates', 'bk.select': 'Select', 'bk.total': 'total',
      'bk.none': 'No room is free for these dates. Please choose other days or call us: +41 33 733 10 64.',
      'bk.closed': 'The house is closed during this period. Season: 12 Dec 2026 – 4 Apr 2027 and 21 Jun – 17 Oct 2027.',
      'bk.incl': 'Prices per person per night incl. breakfast buffet, visitor’s tax and VAT',
      'bk.range': 'This preview calculates with the lower end of the price range; the house confirms the exact price.',
      'bk.summary': 'Your booking', 'bk.room': 'Room', 'bk.stay': 'Stay', 'bk.price': 'Total',
      'bk.line': '{n} × {p}', 'bk.back': 'Back',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.arrival': 'Arrival time (check-in 3–10 pm)',
      'f.msg': 'Remarks (dog, bike, arriving by train …)', 'f.consent': 'I have read the privacy policy.',
      'f.submit': 'Send binding request',
      'e.name': 'Please enter first and last name.', 'e.email': 'Please enter a valid e-mail address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please confirm the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'We will confirm your booking within 24 hours by e-mail to {email}.',
      'ok.no': 'Booking number',
      'ok.demo': 'This is a preview: nothing has been booked and no data has been sent.',
      'ok.close': 'Close',
      'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo', 'room.equip': 'Amenities',
      'room.bookThis': 'Book this room', 'room.priceNote': 'per person per night incl. breakfast, visitor’s tax and VAT',
      'map.link': 'Open in OpenStreetMap', 'menu': 'Menu', 'close': 'Close'
    }
  };

  /* Englische Fassung der Seite (Schlüssel = data-i18n im HTML) */
  var EN = {
    'beta': 'Beta preview — not a finished design',
    'brand.sub': 'Hotel Garni · Lenk im Simmental',
    'nav.prices': 'Rooms & prices', 'nav.incl': 'Included', 'nav.house': 'Breakfast & house', 'nav.hosts': 'Hosts',
    'nav.guests': 'Guests', 'nav.arrival': 'Season & arrival', 'cta.book': 'Book',
    'hero.kicker': 'Hotel Garni Alpenruh · Lenk im Simmental, Bernese Oberland',
    'hero.title': '90 metres from the station. In summer the cable cars are on us.',
    'hero.lead': 'A simple, friendly bed and breakfast run by Martin and Sonja Buchs – at the end of the Simmental, ' +
      'right by the Lenk railway station. Guests rate the location 9.6 out of 10 on Booking.com.',
    'board.title': 'Distances and times',
    'board.r1': 'Lenk im Simmental station', 'board.r1v': '90 m', 'board.r1s': 'about 2 minutes on foot',
    'board.r2': 'Betelberg cable car, valley station', 'board.r2v': '750 m', 'board.r2s': 'about 10 minutes on foot',
    'board.r3': 'Betelberg and Metsch cable cars in summer', 'board.r3v': 'CHF 0', 'board.r3s': 'included from the first night',
    'board.r4': 'Room with breakfast buffet', 'board.r4v': 'from CHF 60', 'board.r4s': 'per person per night',
    'hero.book': 'Book a room', 'hero.prices': 'See prices',
    'hero.cap': 'Gässli 2, Lenk: the chalet with the red geraniums, next to the station.',
    'hero.alt': 'Hotel Garni Alpenruh: wooden chalet with green shutters and red geraniums on three balconies',

    'prices.title': 'Rooms and prices',
    'prices.lead': 'Three categories, one simple price per person and night – breakfast buffet, visitor’s tax and VAT included. ' +
      'The exact price within the range depends on season and occupancy.',
    'prices.h1': 'Category', 'prices.h2': 'Adults', 'prices.h3': 'Children 7–12', 'prices.h4': 'Children up to 6', 'prices.h5': '',
    'prices.sued': 'South room with balcony', 'prices.sued.s': 'Shower/WC · balcony · south side',
    'prices.nord': 'North room', 'prices.nord.s': 'Shower/WC · quiet · no balcony',
    'prices.budget': 'Budget room', 'prices.budget.s': 'Washbasin in the room · shower and WC on the floor',
    'prices.details': 'Details', 'prices.book': 'Book',
    'prices.note': 'Per person per night incl. overnight stay, breakfast, visitor’s tax and VAT. Children up to 12: 20 % off, ' +
      'up to 6: 50 % off. Check-in 3–10 pm, check-out by 10 am.',
    'prices.alt1': 'South room with two beds, table and balcony door', 'prices.alt2': 'Budget room with washbasin',

    'incl.title': 'In summer you ride for free',
    'incl.lead': 'From the first night we offer you, in the summer season, all cable cars on the Betelberg and the Metsch – ' +
      'and all year round the public buses in Lenk, the train from Erlenbach to Rougemont and Lenk, the PostBuses from Gstaad ' +
      'according to the flyer and the bus Boltigen–Jaunpass.',
    'incl.h1': 'Included', 'incl.h2': 'From the house', 'incl.h3': 'When',
    'incl.r1': 'Betelberg cable car (Lenk–Leiterli)', 'incl.r1d': '750 m on foot', 'incl.r1w': 'summer season',
    'incl.r2': 'Metsch cable car (Stand-Xpress to 2,100 m)', 'incl.r2d': '2.4 km, by bus', 'incl.r2w': 'summer season',
    'incl.r3': 'Buses in Lenk (Simmenfälle, Bühlberg, Iffigenalp)', 'incl.r3d': 'stop at the station, 90 m', 'incl.r3w': 'all year',
    'incl.r4': 'Train Erlenbach – Zweisimmen – Lenk, and to Rougemont', 'incl.r4d': 'station, 90 m', 'incl.r4w': 'all year',
    'incl.r5': 'PostBuses from Gstaad (according to flyer), bus Boltigen–Jaunpass', 'incl.r5d': 'via Zweisimmen', 'incl.r5w': 'all year',
    'incl.card': 'As a guest paying the visitor’s tax you receive the SIMMENTAL CARD: public transport in 2nd class between the ' +
      'Simmental and the Saanenland is included in summer, with discounts on the Stockhorn and Wasserngrat railways, the Wallbach ' +
      'pool, Blausee and Ballenberg. Dogs and bikes need a ticket.',
    'incl.winter': 'In winter: the ski bus between the Betelberg and Metsch valley stations runs via the station; ski passes are ' +
      'sold at the house.',
    'incl.alt1': 'Yellow hiking signposts with walking times above Lenk', 'incl.alt2': 'Cable car above the Leiterli with hikers on the path',
    'incl.alt3': 'View from above onto the village of Lenk',

    'house.title': 'Breakfast from 7.30 am, the lounge all day',
    'house.p1': 'Between 7.30 and 9.30 am you help yourself at our breakfast buffet: cheese and cold cuts, yoghurt, ' +
      'eggs from the egg boiler, coffee and tea – and on Sundays home-baked braided loaf, as guests write. “Very good breakfast”, says Booking.com.',
    'house.p2': 'Our lounge is open during the day: sofas, books, games – or a round of Jass. Coffee break: please help yourself.',
    'house.l1': 'Lockable bike room for bicycles and mountain bikes', 'house.l2': 'Free private parking at the house',
    'house.l3': 'Dogs are welcome (free of charge, according to Booking.com)', 'house.l4': 'Free Wi-Fi in all rooms',
    'house.l5': 'HD TV, radio, hairdryer and alarm clock in every room',
    'house.alt1': 'Breakfast buffet: cheese, cold cuts, butter, yoghurt and milk in the cooled counter',
    'house.alt2': 'Egg boiler, fresh eggs in a basket and cups on the breakfast table',
    'house.alt3': 'Lounge with green sofa, bookshelf and toys', 'house.alt4': 'Coffee corner with kettle, tea and cups',

    'hosts.title': 'Martin and Sonja Buchs',
    'hosts.p1': 'Martin and Sonja Buchs run the Alpenruh. Guests on Booking.com give the staff 9.8 out of 10 – the highest mark ' +
      'the house receives. What they mention most: a warm welcome, time for a chat, and tips for skiing, hiking and the weather.',
    'hosts.p2': 'The team: Gero (guest care), Maya Heinisch, Monika Zeller and Ramona Schmid (breakfast), Claudia Werren, ' +
      'Jacqueline Pfister, Annika Hofmann and Ursula Matti (housekeeping).',
    'hosts.q': '“Very friendly people who take time to speak to the guests. I really appreciated the useful information about skiing and weather.”',
    'hosts.qs': 'Canningtown, Switzerland · Booking.com',
    'hosts.alt1': 'Martin and Sonja Buchs with their Labrador', 'hosts.alt2': 'Martin and Sonja Buchs in front of the mountains',

    'guests.title': 'What guests write',
    'guests.score': '8.9 out of 10', 'guests.n': '226 reviews on Booking.com',
    'guests.c1': 'Staff', 'guests.c2': 'Location', 'guests.c3': 'Free Wi-Fi', 'guests.c4': 'Cleanliness',
    'guests.c5': 'Value for money', 'guests.c6': 'Comfort', 'guests.c7': 'Facilities',
    'guests.q1': '“Warm welcome, and friendly, warm-hearted hosts at all times. The room is practical, super clean and has ' +
      'everything you need. Breakfast is generous too. Thank you – gladly again!”',
    'guests.q1s': 'Marianne, Switzerland · Booking.com',
    'guests.q2': '“Very warm welcome. Room spacious and comfortable. Location central. Breakfast good selection. I liked the ' +
      'complementary cable car pass.”',
    'guests.q2s': 'Keith, United Kingdom · Booking.com',
    'guests.q3': '“Simple hotel with extremely accommodating staff. The location is perfect – right next to Lenk train station, ' +
      'walking distance from Betelberg.”',
    'guests.q3s': 'Katherine, Switzerland · Booking.com',
    'guests.src': 'Scores and quotes from Booking.com, retrieved 27 October 2026; quotes shortened.',

    'arr.title': 'Season and arrival',
    'arr.s1': 'Winter season', 'arr.s1v': '12 Dec 2026 – 4 Apr 2027',
    'arr.s2': 'Summer season', 'arr.s2v': '21 Jun – 17 Oct 2027',
    'arr.s3': 'Check-in', 'arr.s3v': '3 – 10 pm, please tell us your arrival time',
    'arr.s4': 'Check-out', 'arr.s4v': 'by 10 am',
    'arr.s5': 'Breakfast', 'arr.s5v': '7.30 – 9.30 am',
    'arr.train': 'By train', 'arr.trainT': 'Zürich – Bern – Spiez – Zweisimmen – Lenk im Simmental, about 2 h 50 from Zürich. From the station ' +
      'it is 90 metres to the house.',
    'arr.car': 'By car', 'arr.carT': 'Motorway to Spiez, then through the Simmental via Zweisimmen to Lenk. Free parking at the house.',
    'arr.map': 'Show map', 'arr.mapNote': 'The map is loaded from OpenStreetMap only after you click.',
    'arr.addr': 'Address',

    'foot.beta': 'Beta preview – concept & implementation: Olga Tikhomirova',
    'bk.title': 'Book a room', 'bk.s1': 'Dates, guests, room', 'bk.s2': 'Your details', 'bk.s3': 'Confirmation',
    'foot.imprint': 'Imprint', 'foot.privacy': 'Privacy policy', 'foot.note': 'Photos: Hotel Garni Alpenruh (alpenruh-lenk.ch).'
  };

  window.ALPENRUH = { ROOMS: ROOMS, UI: UI, EN: EN };
})();
