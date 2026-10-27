/* Hotel Landgasthof Eischen — Inhalte: Zimmer und Preise, Angebote, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Preise laut eischen.ch/hotel/<kategorie>/ (abgerufen 27.10.2026): «ab CHF … pro Person», pro Nacht inkl. Frühstück.
     Panorama, Panorama Suite und Säntis: inkl. Benutzung der Wellness-Anlage, Bademantel/Badetasche/Badeschuhe.
     Zusatzbett CHF 70 pro Person. Mehrbettzimmer: Erwachsene ab CHF 70, Kinder bis 6 Jahre gratis, ab 6 Jahren ab CHF 55.
     Säntis: Einzelzimmer ab 145, Doppelzimmer als Einzelbelegung ab 190. Einzelbelegung Panorama/Suite: nicht veröffentlicht.
     cap = Personen höchstens (2 + Zusatzbett). busy = Demo-Auslastung (1 locker … 4 oft belegt). */
  var ROOMS = [
    {
      id: 'saentis', cap: 3, busy: 3, pp: 145, single: 190, extra: 70, wellness: true,
      imgs: ['saentis-1', 'saentis-2', 'saentis-3', 'saentis-4'],
      de: {
        name: 'Säntis', kind: 'Doppelzimmer', occ: '1–3 Personen', short: 'Holzmöbel, Dusche, Sitzecke – auch als Einzelzimmer.',
        text: 'Die Kategorie Säntis im Haus von 1994: geräumige Zimmer mit Holzmöbeln und Holz- oder Parkettböden, Sitzecke, Flachbild-Sat-TV, Minibar, Safe und kostenlosem WLAN; Dusche im Zimmer. Es gibt sie als Einzelzimmer, Doppelzimmer und Doppelzimmer Superior.',
        prices: ['Einzelzimmer ab CHF 145', 'Doppelzimmer ab CHF 145 pro Person', 'Doppelzimmer als Einzelbelegung ab CHF 190', 'Doppelzimmer Superior Säntis ab CHF 145 pro Person', 'Zusatzbett CHF 70 pro Person'],
        equip: ['Holz- oder Parkettboden', 'Dusche/WC', 'Sitzecke', 'Flachbild-Sat-TV', 'Minibar und Safe', 'Kostenfreies WLAN', 'Bademantel, Badetasche, Badeschuhe', 'Wellnessbenützung inbegriffen'],
        alts: ['Zimmer Säntis mit Holzdecke, Doppelbett und Sitzecke am Fenster', 'Doppelbett mit rosa Bettwäsche unter der Dachschräge, Holzschrank', 'Bad der Kategorie Säntis mit Dusche und Waschtisch', 'Zimmer Säntis mit Giebelfenster und Holzmöbeln']
      },
      en: {
        name: 'Säntis', kind: 'Double room', occ: '1–3 guests', short: 'Wooden furniture, shower, seating corner – also as a single room.',
        text: 'The Säntis category in the 1994 building: spacious rooms with wooden furniture and wood or parquet floors, seating corner, flat-screen satellite TV, minibar, safe and free Wi-Fi; shower in the room. Available as single, double and superior double room.',
        prices: ['Single room from CHF 145', 'Double room from CHF 145 per person', 'Double room for single use from CHF 190', 'Superior double room Säntis from CHF 145 per person', 'Extra bed CHF 70 per person'],
        equip: ['Wood or parquet floor', 'Shower/WC', 'Seating corner', 'Flat-screen satellite TV', 'Minibar and safe', 'Free Wi-Fi', 'Bathrobe, spa bag, slippers', 'Spa access included'],
        alts: ['Säntis room with wooden ceiling, double bed and seating corner at the window', 'Double bed with pink linen under the sloping roof, wooden wardrobe', 'Bathroom of the Säntis category with shower and washbasin', 'Säntis room with gable window and wooden furniture']
      }
    },
    {
      id: 'panorama', cap: 3, busy: 3, pp: 160, single: null, extra: 70, wellness: true,
      imgs: ['pan-1', 'pan-2', 'pan-3', 'pan-4'],
      de: {
        name: 'Panorama', kind: 'Doppelzimmer', occ: '2–3 Personen', short: 'Terrasse, grosszügiges Bad mit Dusche oder Badewanne.',
        text: 'Die Panoramazimmer im Neubau von 2012: Terrasse, grosszügiger Badbereich mit Dusche oder Badewanne, Sitzecke, Schreibtisch, Flachbildschirm, Minibar, Safe und kostenloses WLAN. Ruhe geniessen und entspannt schlafen – so beschreibt das Haus diese Kategorie.',
        prices: ['Doppelzimmer Panorama ab CHF 160 pro Person', 'Zusatzbett CHF 70 pro Person'],
        equip: ['Terrasse', 'Dusche oder Badewanne', 'Sitzecke und Schreibtisch', 'Flachbildschirm', 'Minibar und Safe', 'Kostenfreies WLAN', 'Bademantel, Badetasche, Badeschuhe', 'Wellnessbenützung inbegriffen'],
        alts: ['Panoramazimmer mit Doppelbett, violetter Tagesdecke und Fensterfront', 'Balkon mit Holzboden, Liegestuhl und Blick über die Appenzeller Hügel', 'Panoramazimmer mit Sitzecke, Schreibtisch und Fenster zur Landschaft', 'Bad mit Badewanne, Waschtisch und Bademänteln']
      },
      en: {
        name: 'Panorama', kind: 'Double room', occ: '2–3 guests', short: 'Terrace, generous bathroom with shower or bathtub.',
        text: 'The Panorama rooms in the 2012 building: terrace, generous bathroom with shower or bathtub, seating corner, desk, flat screen, minibar, safe and free Wi-Fi. “Enjoy the quiet and sleep well” is how the house describes this category.',
        prices: ['Double room Panorama from CHF 160 per person', 'Extra bed CHF 70 per person'],
        equip: ['Terrace', 'Shower or bathtub', 'Seating corner and desk', 'Flat screen', 'Minibar and safe', 'Free Wi-Fi', 'Bathrobe, spa bag, slippers', 'Spa access included'],
        alts: ['Panorama room with double bed, purple bedspread and window front', 'Balcony with wooden floor, deck chair and view over the Appenzell hills', 'Panorama room with seating corner, desk and window to the landscape', 'Bathroom with bathtub, washbasin and bathrobes']
      }
    },
    {
      id: 'suite', cap: 3, busy: 4, pp: 185, single: null, extra: 70, wellness: true,
      imgs: ['suite-1', 'suite-2', 'suite-3', 'suite-4'],
      de: {
        name: 'Panorama Suite', kind: 'Suite', occ: '2–3 Personen', short: 'Blick vom Säntis bis ins Bodenseegebiet, Dusche und Badewanne.',
        text: 'Die Panorama Suite: Wohnbereich mit Sofa und Schreibtisch, Terrasse und der Blick vom Säntis bis ins Bodenseegebiet. Bad mit Dusche und Badewanne, Flachbildschirm, Minibar, Safe, kostenloses WLAN.',
        prices: ['Panorama Suite ab CHF 185 pro Person', 'Zusatzbett CHF 70 pro Person'],
        equip: ['Blick vom Säntis zum Bodensee', 'Terrasse', 'Dusche und Badewanne', 'Wohnbereich mit Sofa', 'Minibar und Safe', 'Kostenfreies WLAN', 'Bademantel, Badetasche, Badeschuhe', 'Wellnessbenützung inbegriffen'],
        alts: ['Wohnbereich der Panorama Suite mit Sofa, Schreibtisch und Holzdecke', 'Doppelbett der Panorama Suite vor der Fensterfront', 'Panorama Suite mit Bett, Holzdecke und Terrassentür', 'Bad der Suite mit Badewanne und Dusche']
      },
      en: {
        name: 'Panorama Suite', kind: 'Suite', occ: '2–3 guests', short: 'View from the Säntis to Lake Constance, shower and bathtub.',
        text: 'The Panorama Suite: living area with sofa and desk, terrace and the view from the Säntis to the Lake Constance region. Bathroom with shower and bathtub, flat screen, minibar, safe, free Wi-Fi.',
        prices: ['Panorama Suite from CHF 185 per person', 'Extra bed CHF 70 per person'],
        equip: ['View from the Säntis to Lake Constance', 'Terrace', 'Shower and bathtub', 'Living area with sofa', 'Minibar and safe', 'Free Wi-Fi', 'Bathrobe, spa bag, slippers', 'Spa access included'],
        alts: ['Living area of the Panorama Suite with sofa, desk and wooden ceiling', 'Double bed of the Panorama Suite in front of the window', 'Panorama Suite with bed, wooden ceiling and terrace door', 'Bathroom of the suite with bathtub and shower']
      }
    },
    {
      id: 'mehrbett', cap: 6, busy: 2, pp: 70, single: 70, extra: 70, kid: 55, wellness: false,
      imgs: ['mehrbett-1', 'mehrbett-2'],
      de: {
        name: 'Mehrbettzimmer', kind: 'Gruppen und Vereine', occ: 'bis 6 Personen', short: 'Neu renoviert, Dusche und WC auf der Etage.',
        text: 'Das Mehrbettzimmer unter dem Dach – neu renoviert, mit Etagenbetten, Dusche und WC auf der Etage. Beliebt bei Vereinen, Gruppen und Familien. Die Belegung grösserer Gruppen klären Sie am besten direkt mit dem Haus.',
        prices: ['Erwachsene ab CHF 70 pro Person', 'Kinder bis 6 Jahre gratis', 'Kinder ab 6 Jahren ab CHF 55 pro Person'],
        equip: ['Etagenbetten', 'Dusche und WC auf der Etage', 'Frühstück inbegriffen', 'Dachfenster'],
        alts: ['Mehrbettzimmer mit Etagenbetten und bunter Bettwäsche unter dem Dach', 'Waschraum mit zwei Waschbecken']
      },
      en: {
        name: 'Multi-bed room', kind: 'Groups and clubs', occ: 'up to 6 guests', short: 'Newly renovated, shower and WC on the floor.',
        text: 'The multi-bed room under the roof – newly renovated, with bunk beds, shower and WC on the floor. Popular with clubs, groups and families. For larger groups please check the occupancy directly with the house.',
        prices: ['Adults from CHF 70 per person', 'Children up to 6 years free', 'Children from 6 years from CHF 55 per person'],
        equip: ['Bunk beds', 'Shower and WC on the floor', 'Breakfast included', 'Skylights'],
        alts: ['Multi-bed room with bunk beds and colourful linen under the roof', 'Washroom with two basins']
      }
    }
  ];

  /* Angebote laut eischen.ch/angebote/ und /hotel/ (27.10.2026). Preise für 2 Personen, Kategorie Säntis;
     «Sternstunden» pro Person (Säntis / Panorama). days = erlaubte Anreisetage (0 = So … 6 = Sa). */
  var OFFERS = [
    { id: 'spezial', room: 'saentis', nights: 2, price: 599, days: [4, 5, 6],
      de: { name: 'Eischen Spezial', incl: '2 Nächte Säntis, Willkommensapéro, 4-Gang-Menu an beiden Abenden, Frühstück, Wellness, Bademantel', when: 'Anreise Do–Sa, ausser Ostern, Auffahrt, Pfingsten, Feiertage', price: 'CHF 599 für 2 Personen' },
      en: { name: 'Eischen Special', incl: '2 nights Säntis, welcome aperitif, 4-course dinner on both evenings, breakfast, spa, bathrobe', when: 'Arrival Thu–Sat, except Easter, Ascension, Whitsun, public holidays', price: 'CHF 599 for 2 guests' } },
    { id: 'herbst', room: 'saentis', nights: 2, price: 595, days: [0, 4, 5, 6],
      de: { name: 'Auszeit im Goldenen Herbst', incl: '2 Nächte Säntis, Apéro, 3-Gang-Menu «Herbst» und 4-Gang-Menu, Frühstück, Wellness', when: 'Oktober/November 2026, Anreise Do–Sa oder So (Abreise Di)', price: 'CHF 595 für 2 Personen' },
      en: { name: 'Golden Autumn Break', incl: '2 nights Säntis, aperitif, 3-course “autumn” menu and 4-course menu, breakfast, spa', when: 'October/November 2026, arrival Thu–Sat or Sun (departure Tue)', price: 'CHF 595 for 2 guests' } },
    { id: 'zauber', room: 'saentis', nights: 1, price: 385, days: [0, 4, 5, 6],
      de: { name: 'Herbstzauber', incl: '1 Nacht Säntis, Apéro, 4-Gang-Menu, Frühstück, Wellness', when: 'Oktober/November 2026, Anreise Do–Sa oder So, nicht kumulierbar', price: 'CHF 385 für 2 Personen' },
      en: { name: 'Autumn Magic', incl: '1 night Säntis, aperitif, 4-course menu, breakfast, spa', when: 'October/November 2026, arrival Thu–Sat or Sun, not combinable', price: 'CHF 385 for 2 guests' } },
    { id: 'winter', room: 'saentis', nights: 4, price: 1520, days: [0, 1, 4, 5, 6],
      de: { name: 'Winterangebot 26/27', incl: '4 Nächte Säntis, Apéro, 4 Abendessen (4-Gang-Halbpension), Frühstück, Wellness, Appenzeller Ferienkarte', when: 'Dezember bis März, Anreise Do–Mo; nicht an Feiertagen, zwischen Weihnachten und Neujahr und in den Betriebsferien', price: 'CHF 1520 für 2 Personen' },
      en: { name: 'Winter offer 26/27', incl: '4 nights Säntis, aperitif, 4 dinners (4-course half board), breakfast, spa, Appenzell holiday card', when: 'December to March, arrival Thu–Mon; not on public holidays, between Christmas and New Year or during the annual closure', price: 'CHF 1520 for 2 guests' } }
  ];

  var UI = {
    de: {
      'adult1': 'Erwachsener', 'adultN': 'Erwachsene', 'night1': 'Nacht', 'nightN': 'Nächte',
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen', 'bw.btn': 'Verfügbarkeit prüfen',
      'room.from': 'ab', 'room.pp': 'pro Person und Nacht', 'room.pn': 'pro Nacht', 'room.photo': 'Foto', 'room.equip': 'Ausstattung',
      'room.prices': 'Preise laut eischen.ch', 'room.bookThis': 'Diese Kategorie buchen',
      'room.priceNote': 'Pro Person und Nacht inkl. Frühstück. Preise laut eischen.ch, Stand 27.10.2026.',
      'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.hintIn': 'Anreisetag wählen', 'cal.hintOut': 'Jetzt den Abreisetag wählen', 'cal.reset': 'Zurücksetzen',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt (Beispiel)', 'cal.ruhe': 'Di/Mi: Restaurant-Ruhetag, Anreise möglich', 'cal.sel': 'gewählt',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder ab 6 Jahren', 'bk.kids6': 'Kinder bis 6 Jahre',
      'bk.kidsNote': 'Kinderpreise nennt das Haus nur für das Mehrbettzimmer; in den anderen Kategorien rechnet das Beispiel das Zusatzbett (CHF 70). Kinder bis 6 Jahre: bitte im Nachrichtenfeld erwähnen.',
      'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Kategorie wählen', 'bk.pickDates': 'Bitte zuerst An- und Abreise wählen.',
      'bk.select': 'Wählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Personenzahl zu klein',
      'bk.single': 'Einzelbelegung: Preis auf Anfrage', 'bk.total': 'gesamt',
      'bk.none': 'In diesem Zeitraum ist im Beispiel keine Kategorie frei – bitte andere Daten wählen.',
      'bk.incl': 'Preise pro Person und Nacht inkl. Frühstück; Wellnessbenützung in Panorama, Panorama Suite und Säntis inbegriffen',
      'bk.direct': 'Direkt beim Haus gebucht – ohne Vermittler.',
      'bk.summary': 'Ihre Buchung', 'bk.room': 'Kategorie', 'bk.stay': 'Aufenthalt', 'bk.nights': 'Übernachtung',
      'bk.perNight': '{n} × {p}', 'bk.line': '{a} × CHF {p} × {n}', 'bk.extraLine': 'Zusatzbett', 'bk.kidLine': 'Kinder ab 6 Jahren',
      'bk.offer': 'Angebot', 'bk.offerHint': 'Angebot «{name}»: {nights}, 2 Erwachsene, Kategorie Säntis, Anreise {days}. Bei anderen Daten gilt der normale Zimmerpreis.',
      'bk.offerOk': 'Angebot «{name}» – Pauschalpreis', 'bk.price': 'Gesamtpreis', 'bk.back': 'Zurück', 'bk.title': 'Zimmer buchen',
      'bk.pay': 'Bezahlung im Haus.', 'bk.cancel': 'Stornobedingungen bestätigt das Haus mit der Buchung.',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.arrival': 'Voraussichtliche Ankunftszeit (Check-in 15–21 Uhr)',
      'f.msg': 'Nachricht an das Haus', 'f.consent': 'Ich habe die <a href="datenschutz.html">Datenschutzerklärung</a> gelesen.',
      'f.submit': 'Verbindlich buchen',
      'e.name': 'Bitte Vor- und Nachnamen angeben.', 'e.email': 'Bitte eine gültige E-Mail-Adresse angeben.',
      'e.phone': 'Bitte eine Telefonnummer angeben.', 'e.consent': 'Bitte die Datenschutzerklärung bestätigen.',
      'ok.title': 'Danke, {name}!', 'ok.text': 'Die Bestätigung geht an {email}. Das Haus meldet sich, falls noch etwas offen ist.',
      'ok.no': 'Buchungsnummer',
      'ok.demo': 'Vorschau: Es wurde nichts gebucht und keine Daten wurden gesendet. In der fertigen Website geht diese Buchung direkt an das Hotel.',
      'ok.close': 'Schliessen',
      'map.link': 'In OpenStreetMap öffnen',
      'ruhe.hint': 'Di/Mi (Nov–Jun): Restaurant-Ruhetag, Anreise möglich.',
      'steps.1': 'Zeitraum & Kategorie', 'steps.2': 'Ihre Daten', 'steps.3': 'Bestätigung',
      'd.thu': 'Do', 'd.fri': 'Fr', 'd.sat': 'Sa', 'd.sun': 'So', 'd.mon': 'Mo'
    },
    en: {
      'adult1': 'adult', 'adultN': 'adults', 'night1': 'night', 'nightN': 'nights',
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Select date', 'bw.btn': 'Check availability',
      'room.from': 'from', 'room.pp': 'per person and night', 'room.pn': 'per night', 'room.photo': 'Photo', 'room.equip': 'Facilities',
      'room.prices': 'Prices as on eischen.ch', 'room.bookThis': 'Book this category',
      'room.priceNote': 'Per person and night incl. breakfast. Prices as on eischen.ch, 27 Oct 2026.',
      'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.hintIn': 'Select arrival day', 'cal.hintOut': 'Now select the departure day', 'cal.reset': 'Reset',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'free', 'cal.busy': 'booked (sample)', 'cal.ruhe': 'Tue/Wed: restaurant closed, arrival possible', 'cal.sel': 'selected',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children from 6 years', 'bk.kids6': 'Children up to 6 years',
      'bk.kidsNote': 'The house lists child rates only for the multi-bed room; in the other categories this sample charges the extra bed (CHF 70). Children up to 6: please mention them in the message field.',
      'bk.less': 'less', 'bk.more': 'more',
      'bk.rooms': 'Choose a category', 'bk.pickDates': 'Please select arrival and departure first.',
      'bk.select': 'Select', 'bk.busy': 'Booked in this period', 'bk.small': 'Too small for this number of guests',
      'bk.single': 'Single occupancy: price on request', 'bk.total': 'total',
      'bk.none': 'No category is free in this period in the sample – please choose other dates.',
      'bk.incl': 'Prices per person and night incl. breakfast; spa access included in Panorama, Panorama Suite and Säntis',
      'bk.direct': 'Booked directly with the house – no intermediary.',
      'bk.summary': 'Your booking', 'bk.room': 'Category', 'bk.stay': 'Stay', 'bk.nights': 'Accommodation',
      'bk.perNight': '{n} × {p}', 'bk.line': '{a} × CHF {p} × {n}', 'bk.extraLine': 'Extra bed', 'bk.kidLine': 'Children from 6 years',
      'bk.offer': 'Offer', 'bk.offerHint': 'Offer “{name}”: {nights}, 2 adults, Säntis category, arrival {days}. For other dates the regular room rate applies.',
      'bk.offerOk': 'Offer “{name}” – package price', 'bk.price': 'Total', 'bk.back': 'Back', 'bk.title': 'Book a room',
      'bk.pay': 'Payment at the hotel.', 'bk.cancel': 'The house confirms the cancellation terms with the booking.',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.arrival': 'Expected arrival time (check-in 3–9 pm)',
      'f.msg': 'Message to the house', 'f.consent': 'I have read the <a href="datenschutz.html">privacy policy</a>.',
      'f.submit': 'Book now',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid e-mail address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please confirm the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'The confirmation goes to {email}. The house will get in touch if anything is open.',
      'ok.no': 'Booking number',
      'ok.demo': 'Preview: nothing has been booked and no data has been sent. On the finished website this booking goes straight to the hotel.',
      'ok.close': 'Close',
      'map.link': 'Open in OpenStreetMap',
      'ruhe.hint': 'Tue/Wed (Nov–Jun): restaurant closed, arrival possible.',
      'steps.1': 'Dates & category', 'steps.2': 'Your details', 'steps.3': 'Confirmation',
      'd.thu': 'Thu', 'd.fri': 'Fri', 'd.sat': 'Sat', 'd.sun': 'Sun', 'd.mon': 'Mon'
    }
  };

  /* Englische Fassung der Seite (Schlüssel = data-i18n im HTML) */
  var EN = {
    'beta': 'Beta preview — not a finished design',
    'brand.sub': 'Hotel · Spa · Country inn · Appenzell',
    'nav.wellness': 'Spa', 'nav.kueche': 'Restaurant', 'nav.zimmer': 'Rooms & rates', 'nav.familie': 'Family', 'nav.appenzell': 'Appenzell', 'nav.anreise': 'Getting here',
    'cta.book': 'Book', 'menu': 'Menu',

    'hero.kicker': 'Hotel · Spa · Country inn',
    'hero.from': 'from', 'hero.priceNote': 'per person and night · Panorama double room, incl. breakfast and spa',
    'hero.title': 'Above Appenzell, with the Alpstein in view.',
    'hero.sub': 'Indoor panorama pool, sauna village and a country inn with its own kitchen – run by the Inauen family since 1894. Double room from CHF 160 per person, with breakfast and spa.',
    'hero.alt': 'Indoor panorama pool of the Hotel Landgasthof Eischen with a window front towards the Appenzell hills',
    'hero.cap': 'The panorama pool in the spa: indoor pool with hydroflow system, window front towards the Appenzell landscape and the Vorarlberg Alps.',

    'wl.title': 'Swim and sweat with a view',
    'wl.text': 'The spa came with the new building in 2012: an indoor pool with hydroflow system and a view of the Appenzell landscape and the Vorarlberg Alps, a sauna village, an outdoor whirlpool and a relaxation room with a view of the valley. Bathrobe, spa bag and slippers are waiting in the room; spa access is included in the Panorama, Panorama Suite and Säntis categories.',
    'wl.f1': 'Panorama pool', 'wl.f1v': 'Indoor pool with hydroflow system, window front',
    'wl.f2': 'Sauna village', 'wl.f2v': 'Bio sauna, Finnish sauna with natural salt stone, aroma steam bath',
    'wl.f3': 'Outdoor whirlpool', 'wl.f3v': 'In the garden, sun loungers on the lawn',
    'wl.f4': 'Relaxation room', 'wl.f4v': 'With a view of the valley',
    'wl.f5': 'Day pass', 'wl.f5v': 'For camping guests CHF 20 (price list 2025)',
    'wl.q': '“Great location, excellent breakfast, very friendly staff who met every wish. The spa area is great.”',
    'wl.qc': 'Isabel, Switzerland · Booking.com, retrieved 27 Oct 2026',
    'wl.alt1': 'Indoor pool with stone wall, sun loungers and window to the hills',
    'wl.alt2': 'Outdoor whirlpool made of stainless steel on the terrace with a view of the Appenzell hills',
    'wl.alt3': 'Finnish sauna with wooden benches and illuminated salt stone',
    'wl.alt4': 'Aroma steam bath with stone benches',
    'wl.alt5': 'Relaxation room with loungers in front of the window',
    'wl.cap2': 'Outdoor whirlpool in the garden – with the Appenzell hills all around.',

    'ku.title': 'A country inn with a panorama window',
    'ku.text': 'Since 1987 the Eischen has been a traditional restaurant with regional ingredients and a view over the Appenzell countryside. In 2012 the hall with panorama window, the bar and the lounge were added. Breakfast is served as a buffet; groups and clubs can use the seminar room – menu suggestions on request.',
    'ku.h1': 'Opening hours', 'ku.h2': 'From the menus',
    'ku.o1': 'November to end of June', 'ku.o1v': 'Tuesday and Wednesday closed (restaurant); hotel open 7 days on request',
    'ku.o2': '30 June to end of October', 'ku.o2v': 'Thu–Mon from 8 am until closing time; Tue and Wed from 5.30 pm',
    'ku.o3': 'Breakfast', 'ku.o3v': 'Buffet, daily 8.00–10.30 am (as listed on Booking.com)',
    'ku.o4': 'Diets', 'ku.o4v': 'Vegetarian, vegan, gluten- and lactose-free (as listed on Booking.com)',
    'ku.m1': '4-course dinner', 'ku.m1v': 'on both evenings of the “Eischen Special” package',
    'ku.m2': '5-course gala menu', 'ku.m2v': 'with aperitif, “Sternstunden zu zweit” package',
    'ku.m3': '3-course autumn menu', 'ku.m3v': '“Golden Autumn Break”, October/November 2026',
    'ku.m4': 'Wine list', 'ku.m4v': 'Selected wines – list on request',
    'ku.q': '“Very friendly and attentive staff and excellent service. Particularly worth mentioning is the very good food, which left nothing to be desired.”',
    'ku.qc': 'Björn, Germany · Booking.com, retrieved 27 Oct 2026',
    'ku.alt1': 'Dining hall with wooden coffered ceiling, laid tables and panorama window towards the hills',
    'ku.alt2': 'Dessert plate with chocolate cake, ice cream and strawberries on a white tablecloth',
    'ku.alt3': 'Breakfast buffet with bread, cheese and juices on a wooden counter',
    'ku.alt4': 'The old Landgasthof at dusk with lit windows and dark wooden shingle facade',
    'ku.cap': 'The hall with the panorama window – added in 2012 together with bar, lounge and the new kitchen.',

    'zi.title': 'Rooms and rates',
    'zi.lead': 'Four categories. All rates per person and night including breakfast; spa access included in Panorama, Panorama Suite and Säntis. Bathrobe, spa bag and slippers for the duration of the stay.',
    'zi.th1': 'Category', 'zi.th2': 'Occupancy', 'zi.th3': 'Per person and night', 'zi.th4': '',
    'zi.details': 'Photos & details', 'zi.book': 'Book',
    'zi.r1': 'Säntis', 'zi.r1s': 'Single room, double room, superior double room', 'zi.r1o': '1–3 guests',
    'zi.r2': 'Panorama', 'zi.r2s': 'Double room with terrace, shower or bathtub', 'zi.r2o': '2–3 guests',
    'zi.r3': 'Panorama Suite', 'zi.r3s': 'Suite with view from the Säntis to Lake Constance', 'zi.r3o': '2–3 guests',
    'zi.r4': 'Multi-bed room', 'zi.r4s': 'Bunk beds, shower and WC on the floor; children up to 6 free, from 6 years CHF 55', 'zi.r4o': 'up to 6 guests',
    'zi.extra': 'Extra bed CHF 70 per person. Säntis double room for single use from CHF 190. Rates as on eischen.ch, 27 Oct 2026.',
    'zi.score': 'What guests say',
    'zi.scoreV': '9.0 of 10 · 245 reviews on Booking.com (27 Oct 2026) – staff 9.6, comfort 9.3, cleanliness 9.2, location 9.1',
    'zi.q': '“Top was the warm, personal welcome. We felt very welcome. Also top was the high-quality furnishing. Class instead of mass is the concept here.”',
    'zi.qc': 'Kathrin, Germany · Booking.com, retrieved 27 Oct 2026',
    'an.title': 'Packages', 'an.lead': 'For two guests in the Säntis category, as published by the house. Select a package and the booking shows the package price for matching dates.',
    'an.th1': 'Package', 'an.th2': 'Included', 'an.th3': 'When', 'an.th4': 'Price',
    'an.btn': 'Select',
    'an.o1': 'Eischen Special', 'an.o1i': '2 nights, welcome aperitif, 4-course dinner on both evenings, breakfast, spa, bathrobe', 'an.o1w': 'Arrival Thu–Sat, except Easter, Ascension, Whitsun and public holidays', 'an.o1p': 'CHF 599 for 2',
    'an.o2': 'Golden Autumn Break', 'an.o2i': '2 nights, aperitif, 3-course “autumn” menu and 4-course menu, breakfast, spa', 'an.o2w': 'Oct/Nov 2026, arrival Thu–Sat or Sun (departure Tue)', 'an.o2p': 'CHF 595 for 2',
    'an.o3': 'Autumn Magic', 'an.o3i': '1 night, aperitif, 4-course menu, breakfast, spa', 'an.o3w': 'Oct/Nov 2026, arrival Thu–Sat or Sun', 'an.o3p': 'CHF 385 for 2',
    'an.o4': 'Winter offer 26/27', 'an.o4i': '4 nights, aperitif, 4 dinners (4-course half board), breakfast, spa, Appenzell holiday card', 'an.o4w': 'Dec–Mar, arrival Thu–Mon; not on public holidays or between Christmas and New Year', 'an.o4p': 'CHF 1520 for 2',
    'an.o5': 'Sternstunden zu zweit', 'an.o5i': '1 night, aperitif, 5-course gala menu, breakfast, spa', 'an.o5w': 'On request; Säntis category, in the Panorama category from CHF 215 per person', 'an.o5p': 'from CHF 197.50 p.p.',
    'an.note': 'From 3 nights the Appenzell holiday card is included: free arrival by public transport, free rides on Ebenalp, Kronberg and Hoher Kasten, museums, toboggan run, tennis hall.',

    'fa.title': 'The Inauen family since 1894',
    'fa.text': 'Four generations: the Eischen has been in the hands of the Inauen family for more than 130 years. The house tells the story itself – here in its own words, shortened.',
    'fa.c1': 'Josef Anton Inauen, councillor, buys the Eischen.',
    'fa.c2': 'His son Emil Inauen takes over; after his early death his wife Marie Inauen Huber runs the restaurant and the farm – and raises eight children.',
    'fa.c3': 'Alfred and Sonja Inauen take over: new restaurant and kitchen, a tourist dormitory and two hotel rooms.',
    'fa.c4': 'The stable next to the restaurant gives way to a new building with eight double rooms, the laundry and new sanitary facilities for the campsite.',
    'fa.c5': 'Hall with panorama window, bar, lounge, new kitchen, ten additional double and family rooms and the spa.',
    'fa.c6': 'Daniel Inauen, junior of the house, represents the fourth generation.',
    'fa.c6y': 'Today',
    'fa.q': '“We live for our business, we love what we do, we are hosts with joy and from the heart.”',
    'fa.qc': 'The Inauen family, eischen.ch/tradition',
    'fa.alt': 'The Inauen family in the meadow above the Eischen: three generations, with chef’s jacket, cooking pot and Appenzell traditional dress',

    'ap.title': 'Appenzell, Alpstein, holiday card',
    'ap.text': 'The Eischen stands above the village of Appenzell in Kau, 2.4 km from Appenzell railway station. Hiking trails into the Alpstein start right at the house. From three nights the house gives you the Appenzell holiday card: free arrival by public transport, free rides on Ebenalp, Kronberg and Hoher Kasten, museums, toboggan run and tennis hall.',
    'ap.th1': 'Distances (as listed on Booking.com)', 'ap.th2': '',
    'ap.d1': 'Appenzell railway station', 'ap.d2': 'Gontenbad railway station', 'ap.d3': 'Appenzell Museum', 'ap.d4': 'Kronberg forest', 'ap.d5': 'Säntis', 'ap.d6': 'St. Gallen–Altenrhein airport', 'ap.d7': 'Zurich airport',
    'ap.camp': 'The Camping Eischen belongs to the house – open 365 days, with motorhome pitches, playground and new pitches with a view towards the east; price list on request.',
    'ap.alt': 'View across a flower meadow to the snow-covered Alpstein with the Säntis',
    'ap.alt2': 'Winter view from the Eischen over snowy hills at sunset',
    'ap.cap': 'The Alpstein with the Säntis, seen from the hills around the Eischen.',

    'ar.title': 'Getting here',
    'ar.addr': 'Address', 'ar.addrV': 'Hotel Landgasthof Eischen · Kaustrasse 123 · 9050 Appenzell · Switzerland',
    'ar.train': 'By train', 'ar.trainV': 'Appenzell railway station is 2.4 km away (Appenzeller Bahnen from St. Gallen or Gossau). From there by taxi or the PubliCar on-demand bus; from 3 nights the arrival by public transport is free with the holiday card.',
    'ar.car': 'By car', 'ar.carV': 'Free parking at the house. Zurich airport 84 km, St. Gallen–Altenrhein 33 km.',
    'ar.times': 'Check-in / check-out', 'ar.timesV': 'Check-in 3–9 pm, check-out until 11 am (as listed on Booking.com)',
    'ar.contact': 'Contact', 'ar.webcam': 'Webcam on eischen.ch',
    'map.btn': 'Load map', 'map.note': 'The map is loaded from OpenStreetMap only after you click.',
    'map.alt': 'The Eischen with the modern wing, the indoor pool and sun loungers on the lawn',

    'foot.beta': 'Beta preview – concept & implementation: Olga Tikhomirova',
    'foot.legal': 'Imprint', 'foot.privacy': 'Privacy', 'foot.photos': 'Photos: eischen.ch (the house’s own photos).',
    'foot.old': 'Current website',
    'room.pp': 'per person and night', 'bk.title': 'Book a room',
    'steps.1': 'Dates & category', 'steps.2': 'Your details', 'steps.3': 'Confirmation'
  };

  window.EISCHEN = { ROOMS: ROOMS, OFFERS: OFFERS, UI: UI, EN: EN };
})();
