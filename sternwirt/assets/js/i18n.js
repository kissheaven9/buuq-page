/* Landhotel Sternwirt — Inhalte: Zimmertypen (mit Fotos), Preise, UI-Texte (DE/EN), englische Übersetzung.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt.
   Alle Preise laut landhotel-sternwirt.de (Stand 25.11.2026): pro Person und Nacht inkl. Halbpension
   und beider Wellnessbereiche. Kinderermäßigung als Obergrenze der veröffentlichten Spanne. */
(function () {
  'use strict';

  /* Zimmerkategorien laut landhotel-sternwirt.de/de/zimmer-preise/unsere-zimmer.html.
     price = € pro Person und Nacht inkl. Halbpension („ab“-Preis laut Website); null = auf Anfrage.
     busy = Demo-Auslastung (0–6). img/w = Dateibasis und Breiten in assets/img (webp+jpg),
     Fotos vom Haus selbst (landhotel-sternwirt.de). */
  var ROOMS = [
    { id: 'ez', min: 1, max: 1, price: 90, busy: 2, img: 'zimmer-ez', w: [600, 1000], ih: 665,
      de: { name: 'Einzelzimmer Classic', meta: 'Traditionelles Flair · Bett 1,20 × 2,00 m · 1 Person',
            alt: 'Einzelzimmer Classic mit Bett, Schreibtisch und Vorhang am bodentiefen Fenster' },
      en: { name: 'Classic single room', meta: 'Traditional charm · bed 1.20 × 2.00 m · 1 guest',
            alt: 'Classic single room with bed, desk and curtain at the floor-to-ceiling window' } },
    { id: 'dzc', min: 2, max: 2, price: 103, busy: 2, img: 'zimmer-dzc', w: [600, 1000], ih: 667,
      de: { name: 'Doppelzimmer Classic', meta: 'Traditioneller Charme · Bett 1,80 × 2,00 m · 2 Personen',
            alt: 'Doppelzimmer Classic mit hellem Bett, Spiegel und klassischen Möbeln' },
      en: { name: 'Classic double room', meta: 'Traditional charm · bed 1.80 × 2.00 m · 2 guests',
            alt: 'Classic double room with a light bed, mirror and classic furniture' } },
    { id: 'dzk', min: 2, max: 2, price: 106, busy: 3, img: 'zimmer-dzk', w: [600, 1000], ih: 666,
      de: { name: 'Doppelzimmer Komfort', meta: 'Helle Möbel · Bett 1,80 × 2,00 m · 2 Personen',
            alt: 'Doppelzimmer Komfort mit Sitzecke, Waldmotiv und Doppelbett' },
      en: { name: 'Comfort double room', meta: 'Bright interior · bed 1.80 × 2.00 m · 2 guests',
            alt: 'Comfort double room with seating corner, forest motif and double bed' } },
    { id: 'drei', min: 2, max: 3, price: null, busy: 2, img: 'zimmer-drei', w: [600, 1000], ih: 665,
      de: { name: 'Dreibettzimmer Classic', meta: 'Begehbare Dusche · Betten 1,80 und 1,20 × 2,00 m · bis 3 Personen',
            alt: 'Dreibettzimmer Classic mit Doppel- und Einzelbett in hellem Holz' },
      en: { name: 'Classic triple room', meta: 'Walk-in shower · beds 1.80 and 1.20 × 2.00 m · up to 3 guests',
            alt: 'Classic triple room with double and single bed in light wood' } },
    { id: 'dzp', min: 2, max: 4, price: 145, busy: 3, img: 'zimmer-dzp', w: [600, 1000], ih: 665,
      de: { name: 'Doppelzimmer Premium', meta: '5 m² Balkon · Regendusche · aufbettbar für zwei Kinder',
            alt: 'Doppelzimmer Premium mit Holz-Kopfteil und Sternwirt-Schriftzug über dem Bett' },
      en: { name: 'Premium double room', meta: '5 m² balcony · rain shower · extra beds for two children',
            alt: 'Premium double room with wooden headboard and Sternwirt lettering above the bed' } },
    { id: 'bar', min: 2, max: 2, price: 145, busy: 1, img: 'zimmer-bar', w: [600, 1000], ih: 665,
      de: { name: 'Barrierefreundliches Zimmer Premium', meta: 'Große Terrasse · Regendusche · barrierefreundlich',
            alt: 'Barrierefreundliches Zimmer Premium mit niedrigem Bett und gelbem Sessel' },
      en: { name: 'Accessible premium room', meta: 'Large terrace · rain shower · accessibility-friendly',
            alt: 'Accessible premium room with low bed and yellow armchair' } },
    { id: 'fsg', min: 2, max: 5, price: 140, busy: 2, img: 'zimmer-fsg', w: [600, 1000], ih: 630,
      de: { name: 'Familiensuite Gasthof', meta: 'Zwei Schlafzimmer · Whirlwanne · 15 m² Terrasse',
            alt: 'Wohnzimmer der Familiensuite Gasthof mit Sofa und Blick ins Schlafzimmer' },
      en: { name: 'Gasthof family suite', meta: 'Two bedrooms · whirlpool bath · 15 m² terrace',
            alt: 'Living room of the Gasthof family suite with sofa and view into the bedroom' } },
    { id: 'fsh', min: 2, max: 5, price: 155, busy: 2, img: 'familiensuite', w: [600, 900], ih: 750,
      de: { name: 'Familiensuite Hot Tube', meta: '54 m² · 40 m² Terrasse mit Hot Tube und Daybed',
            alt: 'Schlafzimmer der Familiensuite Hot Tube mit Boxspringbetten und warmem Holz' },
      en: { name: 'Hot Tube family suite', meta: '54 m² · 40 m² terrace with hot tub and daybed',
            alt: 'Bedroom of the Hot Tube family suite with box-spring beds and warm wood' } },
    { id: 'wsb', min: 2, max: 4, price: 177, busy: 1, img: 'zimmer-wsb', w: [600, 1000], ih: 666,
      de: { name: 'Wellness-Suite Bergblick', meta: 'Whirlpool (380 l) · Blick auf die Felsenwand · 10 m² Terrasse',
            alt: 'Paar im Whirlpool der Wellness-Suite Bergblick, am Fenster brennen Kerzen' },
      en: { name: 'Bergblick wellness suite', meta: 'Whirlpool (380 l) · view of the rock face · 10 m² terrace',
            alt: 'Couple in the whirlpool of the Bergblick wellness suite, candles at the window' } },
    { id: 'wsp', min: 2, max: 4, price: 197, busy: 1, img: 'zimmer-wsp', w: [600, 1000], ih: 593,
      de: { name: 'Wellness-Suite Penthouse', meta: 'Whirlpool (380 l) · beheizte Liegen · 15 m² Sonnenterrasse',
            alt: 'Wellness-Suite Penthouse mit beheizten Liegen, Whirlpool und bodentiefen Fenstern' },
      en: { name: 'Penthouse wellness suite', meta: 'Whirlpool (380 l) · heated loungers · 15 m² sun terrace',
            alt: 'Penthouse wellness suite with heated loungers, whirlpool and floor-to-ceiling windows' } }
  ];

  /* Preisregeln laut Preisliste landhotel-sternwirt.de/de/zimmer-preise/preisliste.html:
     Halbpension und Wellnessbereiche im Zimmerpreis enthalten. Kinderermäßigung in Spannen –
     hier wird die Obergrenze gerechnet (1–5: 42 %, 6–10: 52 %, 11–15: 60 % vom Erwachsenenpreis),
     der genaue Betrag folgt mit der Bestätigung. Ortstaxe 1 € pro Person und Tag.
     4-Gang-Candlelight-Dinner: Aufpreis 28 € pro Erwachsenem und Tag.
     Betriebsurlaub 20.–25.12.2026 (laut Startseite). */
  var PRICES = {
    kid: { k5: 0.42, k10: 0.52, k15: 0.60 },
    tax: 1,
    candle: 28,
    closed: ['2026-12-20', '2026-12-25']
  };

  var UI = {
    de: {
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen',
      'bw.btn': 'Verfügbarkeit prüfen',
      adult1: 'Erwachsener', adultN: 'Erwachsene', kid1: 'Kind', kidN: 'Kinder',
      night1: 'Nacht', nightN: 'Nächte',
      'room.from': 'ab', 'room.pp': 'pro Person / Nacht mit Halbpension', 'room.book': 'Buchen',
      'room.ask': 'Preis auf Anfrage',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
      'cal.reset': 'Auswahl zurücksetzen',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder (bis 15 Jahre)',
      'bk.age': 'Alter Kind', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.board': 'Verpflegung', 'bk.bf': 'Halbpension', 'bk.hp': 'Halbpension + Candlelight-Dinner',
      'bk.bfS': 'Frühstücksbüfett und Abendmenü – im Preis enthalten',
      'bk.hpS': '4-Gang-Candlelight-Dinner, Aufpreis 28 € pro Erwachsenem und Tag',
      'bk.rooms': 'Verfügbare Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie Preis und Verfügbarkeit.',
      'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl zu klein',
      'bk.big': 'Einzelbelegung auf Anfrage – bitte rufen Sie uns an',
      'bk.ask': 'Preis auf Anfrage – bitte telefonisch: +49 9663 425',
      'bk.total': 'gesamt, inkl. Ortstaxe', 'bk.incl': 'Preise pro Person laut Preisliste, inkl. Halbpension und ' +
        'beider Wellnessbereiche. Kinderermäßigung als Obergrenze der Spanne gerechnet; der genaue Betrag folgt mit der ' +
        'Bestätigung. Zuschläge an Ostern, Weihnachten und Silvester möglich. Betriebsurlaub 20.–25.12.2026',
      'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie Zeitraum oder Gästezahl – ' +
        'oder rufen Sie uns an: +49 9663 425.',
      'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
      'bk.boardL': 'Verpflegung', 'bk.lodging': 'Übernachtung mit Halbpension', 'bk.candle': 'Candlelight-Dinner',
      'bk.tax': 'Ortstaxe (1 € pro Person/Tag)',
      'bk.price': 'Gesamtpreis', 'bk.pay': 'Zahlung im Haus.',
      'bk.group': 'Gruppen und dritter Erwachsener im Zimmer auf Anfrage.',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail-Adresse', 'f.phone': 'Telefon',
      'f.msg': 'Wünsche oder Fragen, z. B. Kinderbett oder Hund (optional)',
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
      'map.link': 'In OpenStreetMap öffnen'
    },
    en: {
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Select date',
      'bw.btn': 'Check availability',
      adult1: 'adult', adultN: 'adults', kid1: 'child', kidN: 'children',
      night1: 'night', nightN: 'nights',
      'room.from': 'from', 'room.pp': 'per person / night with half board', 'room.book': 'Book',
      'room.ask': 'Price on request',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'cal.hintIn': 'Please choose your arrival date.', 'cal.hintOut': 'Now choose your departure date.',
      'cal.reset': 'Reset selection',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children (up to 15)',
      'bk.age': 'Age of child', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.board': 'Meals', 'bk.bf': 'Half board', 'bk.hp': 'Half board + candlelight dinner',
      'bk.bfS': 'Breakfast buffet and evening menu – included in the rate',
      'bk.hpS': 'Four-course candlelight dinner, € 28 extra per adult and day',
      'bk.rooms': 'Available rooms', 'bk.pickDates': 'Choose arrival and departure to see prices and availability.',
      'bk.select': 'Select', 'bk.busy': 'Booked for these dates', 'bk.small': 'Too small for this number of guests',
      'bk.big': 'Single occupancy on request – please call us',
      'bk.ask': 'Price on request – please call +49 9663 425',
      'bk.total': 'total, incl. local tax', 'bk.incl': 'Prices per person as per the rate list, incl. half board and ' +
        'both spa areas. Children’s discount calculated at the upper end of the published range; the exact amount follows ' +
        'with the confirmation. Surcharges possible at Easter, Christmas and New Year. Closed for holidays 20–25 Dec 2026',
      'bk.none': 'Unfortunately no room is available for this combination. Please change the dates or number of ' +
        'guests – or call us: +49 9663 425.',
      'bk.back': 'Back', 'bk.summary': 'Your booking', 'bk.stay': 'Dates', 'bk.room': 'Room',
      'bk.boardL': 'Meals', 'bk.lodging': 'Accommodation with half board', 'bk.candle': 'Candlelight dinner',
      'bk.tax': 'Local tax (€ 1 per person/day)',
      'bk.price': 'Total price', 'bk.pay': 'Payment at the hotel.',
      'bk.group': 'Groups and a third adult in the room on request.',
      'f.name': 'First and last name', 'f.email': 'Email address', 'f.phone': 'Phone',
      'f.msg': 'Requests or questions, e.g. cot or dog (optional)',
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
    'brand.sub': 'Landhotel · Weigendorf-Högen',
    'nav.haus': 'The hotel', 'nav.rooms': 'Rooms', 'nav.offers': 'Packages', 'nav.kueche': 'Kitchen',
    'nav.wellness': 'Spa', 'nav.guests': 'Guests', 'nav.hosts': 'Hosts', 'nav.arrival': 'Getting here',
    'cta.book': 'Book',
    'hero.small': 'Landhotel &amp; spa hotel · Weigendorf-Högen',
    'hero.place': 'Högenbachtal · Franconian Jura · between Nuremberg and Amberg',
    'hero.alt': 'Aerial view: the Landhotel Sternwirt with red tiled roofs and the modern SkySPA building against the wooded hillside of the Högenbachtal',
    'hero.note': 'From € 90 per person and night with half board and both spa areas · Falstaff Hotel Guide 2025: 89 points',

    'st.1': 'founded as a country tavern',
    'st.2': 'generations of one family',
    'st.3': 'beds – and one indoor and outdoor lounger per guest',
    'st.4': 'of wellness in two spa areas',
    'st.5': 'of marked hiking trails from the house',

    'hs.lbl': 'The hotel',
    'hs.title': 'In the Högenbachtal, between Nuremberg and Amberg.',
    'hs.lead': 'The streets of Högen run towards the old inn in the shape of a star – hence the name Sternwirt. The same family has kept this house since 1874, now in its sixth generation.',
    'hs.p1': 'Wilhelmine and Georg Märtl’s country tavern has grown into a country hotel on the edge of the Franconian Jura and Upper Palatinate Jura nature parks: the Haas family’s Gasthaus, the new wing with reception and two spa areas above the valley, and a relaxation garden with Kneipp basin and loungers.',
    'hs.p2': 'Hiking trails start at the front door – 131 km are marked in the valley, among them the certified Erzweg trail. Nuremberg and Amberg lie on either side; the house itself sits away from the main routes.',
    'hs.src': 'Figures according to landhotel-sternwirt.de (as of November 2026).',
    'hs.alt1': 'Lounger terrace of the SkySPA with daybeds, blue cushions and a view of the wooded hills',
    'hs.cap1': 'The lounger terrace of the SkySPA.',

    'bl1.alt': 'The illuminated infinity SkyPool on the roof terrace under a red and purple evening sky above the Högenbachtal',
    'bl1.cap': 'The heated infinity SkyPool on the roof terrace – included in the half-board rate.',

    'rm.lbl': 'Rooms &amp; rates',
    'rooms.title': 'Ten categories, one rate for everything.',
    'rooms.text': 'From the Classic single room to the Penthouse wellness suite: all rates are per person and night and include half board and both spa areas – the differences come only from the location, size and furnishing of the rooms.',
    'terms.1t': 'Children', 'terms.1': 'discount off the adult rate (with two full-paying guests): ages 1–5 30–42 %, 6–10 42–52 %, 11–15 52–60 %',
    'terms.2t': 'Local tax', 'terms.2': '€ 1 per person and day',
    'terms.3t': 'Dog', 'terms.3': '€ 14 per day (selected categories, food not included)',
    'terms.4t': 'Check-in / check-out', 'terms.4': 'arrival from 2.30 pm, departure by 11 am; reception open daily from 9 am',
    'terms.5t': 'Surcharges', 'terms.5': 'possible at Easter, Christmas and New Year',
    'terms.6t': 'Cancellation', 'terms.6': 'in writing only; 50 % within 6 weeks, 70 % within 14 days of arrival',

    'of.lbl': 'Packages',
    'of.title': 'Three packages of the house',
    'of.text': 'For a short escape: three packages with half board and both spa areas, bookable from 1 January to 19 December 2026.',
    'of.1n': '2-day package', 'of.1s': '2 nights with half board',
    'of.2n': '3 getaway days', 'of.2s': '3 nights with half board',
    'of.3n': '5 taster days', 'of.3s': '5 nights, bookable Sunday to Friday',
    'of.pp': 'per person',
    'of.note': 'Prices according to landhotel-sternwirt.de (as of November 2026). Details and booking of the packages directly with the hotel: +49 9663 425 · info@landhotel-sternwirt.de',

    'ku.lbl': 'Kitchen &amp; half board',
    'board.title': 'Buffet in the morning, plated dinner in the evening.',
    'board.text1': 'Half board is included in every rate. In the morning (7.45–10.30 am): muesli bar, regional milk and yoghurt, bread from the local baker, freshly made pancakes, coffee specialities and freshly squeezed orange juice. In the evening (5.45–8 pm): homemade soup, a colourful salad plate, three mains to choose from and a dessert.',
    'board.text2': 'The cooking is Franconian with modern accents: Schäufele, roulades, stuffed cabbage and braised ox cheeks, plus game, lamb, fish and vegetarian dishes. Meat comes from nearby butchers, vegetables from the Knoblauchsland, herbs from the hotel’s own garden – and since 1967 a traditional wood-fired stove has stood in the kitchen.',
    'board.h1': 'Extras from the rate list', 'board.h2': 'per person',
    'board.r1': 'Four-course candlelight dinner', 'board.r1s': 'surcharge on half board, per day', 'board.r1v': '€ 28',
    'board.r2': 'Bathrobe hire', 'board.r2v': '€ 5',
    'board.r3': 'Breakfast for external guests', 'board.r3v': '€ 28',
    'board.alt1': 'Guests at laid tables in the Gasthaus Sternwirt in the evening',
    'board.cap1': 'The Haas family’s Gasthaus – also open to day guests.',
    'board.alt2': 'A couple raising glasses of red wine at a candle-lit table in the restaurant',
    'board.cap2': 'Evening in the restaurant – three mains to choose from.',
    'board.note': 'Day guests are welcome in the Gasthaus: hot kitchen Tue–Fri 5.30–8 pm, Sat/Sun 11.30 am–2.30 pm and 5.30–8 pm; Sat/Sun 2.30–5 pm homemade cakes, tortes and the famous cream puffs. The bistro at reception serves daytime snacks such as avocado bread, Strammer Max and salad bowls. Please reserve a table: +49 9663 425.',

    'rev.q3': '“There was nothing to fault. Room clean, food excellent, spa area great – the tortes were a delight! We will come back.”',
    'rev.c3': 'guestbook on landhotel-sternwirt.de, February 2025',

    'wl.lbl': 'Spa',
    'wl.title': 'SkySPA and TerraSPA: 1,200 m² above the valley.',
    'wl.lead': 'Two spa areas come with every stay – at no extra charge, reserved for hotel guests.',
    'wl.text': 'Upstairs the SkySPA with its heated infinity SkyPool on the roof terrace, panorama sauna and relaxation room with hanging loungers; downstairs the Mediterranean TerraSPA with indoor pool, steam bath and tea bar. Plus gym, billiards and table tennis – all included in the half-board rate.',
    'wl.f1': 'Pools', 'wl.f1v': '2<small>heated infinity SkyPool outside, adventure pool inside</small>',
    'wl.f2': 'Saunas',
    'wl.f3': 'Indoor and outdoor loungers', 'wl.f3v': '58 + 58<small>one lounger per guest, for 58 beds</small>',
    'wl.f4': 'Spa on arrival or departure day', 'wl.f4v': '€ 20<small>per person, with reservation</small>',
    'wl.alt1': 'A couple relaxing in the heated SkyPool with drinks, steam rising from the water',
    'wl.cap1': 'In the heated SkyPool.',
    'wl.alt2': 'Panorama sauna with warm wood, hanging infusion bowl and a window to the evening sky',
    'wl.cap2': 'The panorama sauna.',
    'wl.alt3': 'Two guests relaxing on the wooden benches of the sauna with a view outside',
    'wl.cap3': 'Four saunas, indoors and out.',
    'wl.alt4': 'Guest in a bathrobe in the relaxation room, behind them a swimmer looks through the pool’s underwater window',
    'wl.cap4': 'Relaxation room at the pool window.',
    'wl.alt5': 'Hanging lounger on ropes in the relaxation room, next to wide relax loungers with turquoise cushions',
    'wl.cap5': 'Hanging loungers in the relaxation room.',

    'ak.lbl': 'Active',
    'ak.title': 'Hiking and cycling from the front door.',
    'ak.text': '131 km of hiking trails are marked in the Högenbachtal, among them the certified Erzweg trail and the 16 km Högen Erzweg loop. The hotel hires out its own bikes; after the tour, the Kneipp basin and the relaxation garden await.',
    'ak.f1': 'Marked hiking trails in the valley', 'ak.f1v': '131 km',
    'ak.f2': 'Högen Erzweg loop', 'ak.f2v': '16 km',
    'ak.f3': 'Bicycle hire (city/trekking bike)', 'ak.f3v': '€ 12 / day',
    'ak.f4': 'E-mountainbike “Fully”', 'ak.f4v': '€ 30 / day',
    'ak.f5': 'Bicycle garage with charging station', 'ak.f5v': 'included',

    'g.lbl': 'Guests',
    'rev.q1': '“Absolutely perfect from the first second to the last. This excellent service cannot be topped. Staff, service, cleanliness, food – all outstanding.”',
    'rev.c1': 'guestbook on landhotel-sternwirt.de, August 2026',
    'rev.of': 'points in the Falstaff Hotel Guide 2025', 'rev.s1v': 'Relax Guide Spa Award 2025',
    'rev.date': 'According to landhotel-sternwirt.de, as of November 2026',
    'rev.q2': '“It is lovely here every time. Beautifully modernised, very friendly staff, very kind host. Lovely rooms, delicious food, great massages and treatments.”',
    'rev.c2': 'guestbook, July 2026',

    'gh.lbl': 'Hosts',
    'gh.title': 'One family, six generations.',
    'gh.text': 'Jürgen Haas has led the Landhotel since 2006, Hans-Werner Haas runs the Gasthaus. The wood-fired stove from 1967 is still in use today. Questions before you arrive are answered by phone or email.',
    'tl.1': 'founders of the country tavern',
    'tl.4t': 'since 1983', 'tl.5t': 'since 2006',
    'gh.alt1': 'Reception of the Landhotel Sternwirt with illuminated star logo, natural stone and starry-sky ceiling',
    'gh.cap1': 'The reception in the new wing – staffed daily from 9 am.',

    'arr.title': 'Getting here', 'arr.1t': 'Address',
    'arr.1': 'Landhotel Sternwirt, Schlossplatz 3–4, 91249 Weigendorf, Högen village (district of Amberg-Sulzbach, Bavaria)',
    'arr.2t': 'By car', 'arr.2': 'The hotel stands in the Högenbachtal between Nuremberg and Amberg, away from the main routes. Parking at the house; bicycle garage with e-bike charging station.',
    'arr.3t': 'Check-in and check-out', 'arr.3': 'Arrival from 2.30 pm, departure by 11 am. On arrival and departure days the spa areas can be extended for € 20 per person (reservation required).',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'again.title': 'Book direct', 'again.text': 'Or by phone and email:',
    'foot.de': 'Germany', 'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Landhotel Sternwirt (landhotel-sternwirt.de)',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'bk.title': 'Book direct', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
  };

  window.STERNWIRT = { ROOMS: ROOMS, PRICES: PRICES, UI: UI, EN: EN };
})();
