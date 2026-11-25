/* Landgasthof Schwarzberg — Inhalte: Zimmerkategorien, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt.
   Das Haus veröffentlicht keine Zimmerpreisliste (schwarzberg.de, abgerufen 24.11.2026) —
   deshalb überall «Preis auf Anfrage»; die Vorschau rechnet keine Summen. */
(function () {
  'use strict';

  /* Zimmerbeschreibungen laut schwarzberg.de/unsere-zimmer/ (abgerufen 24.11.2026).
     Alle Zimmer: komplett neu renoviert, Frühstück inklusive, Hunde willkommen, kostenloses WLAN.
     cap = Personen höchstens. minN = Mindestaufenthalt in Nächten (nur Ferienwohnung).
     busy = Demo-Auslastung (1 locker … 4 oft belegt). */
  var ROOMS = [
    {
      id: 'einzel', cap: 1, busy: 2,
      imgs: ['einzel-1'],
      de: {
        name: 'Standard Einzelzimmer', kind: 'Einzelzimmer', occ: '1 Person', short: 'Komplett neu renoviert, Bad mit Dusche/WC, TV.',
        text: 'Komplett neu renoviertes Zimmer mit Bad mit Dusche/WC und TV, ohne Balkon. Frühstück inklusive – und Hunde sind herzlich willkommen.',
        prices: ['Preis auf Anfrage beim Haus', 'Frühstück inklusive'],
        equip: ['Dusche/WC', 'TV', 'Kostenloses WLAN', 'Frühstück inklusive', 'Hunde willkommen'],
        alts: ['Einzelzimmer mit Einzelbett, Schreibtisch und warmem Lampenlicht']
      },
      en: {
        name: 'Standard single room', kind: 'Single room', occ: '1 guest', short: 'Completely renovated, bathroom with shower/WC, TV.',
        text: 'Completely renovated room with bathroom with shower/WC and TV, no balcony. Breakfast included – and dogs are very welcome.',
        prices: ['Price on request from the house', 'Breakfast included'],
        equip: ['Shower/WC', 'TV', 'Free Wi-Fi', 'Breakfast included', 'Dogs welcome'],
        alts: ['Single room with single bed, desk and warm lamplight']
      }
    },
    {
      id: 'doppel', cap: 2, busy: 3,
      imgs: ['dz-1', 'dz-2', 'dz-3'],
      de: {
        name: 'Standard & Deluxe Doppelzimmer', kind: 'Doppelzimmer', occ: '2 Personen', short: 'Modernes Bad, Smart TV – einige Zimmer mit Balkon.',
        text: 'Komplett neu renovierte Doppelzimmer mit modernem Bad mit Dusche/WC und Smart TV; einige Zimmer haben einen Balkon. Das Deluxe Doppelzimmer ist einräumig und etwas großzügiger geschnitten. Frühstück inklusive, Hunde willkommen.',
        prices: ['Preis auf Anfrage beim Haus', 'Frühstück inklusive'],
        equip: ['Modernes Bad mit Dusche/WC', 'Smart TV', 'Teils mit Balkon', 'Kostenloses WLAN', 'Frühstück inklusive', 'Hunde willkommen'],
        alts: ['Doppelzimmer mit hellem Holz, Doppelbett und Bergfoto über dem Kopfteil', 'Doppelzimmer mit Smart TV, Schrank und Fenstern mit roten Vorhängen', 'Deluxe Doppelzimmer mit Sofa, Schreibtisch und Couchtisch aus Glas']
      },
      en: {
        name: 'Standard & deluxe double room', kind: 'Double room', occ: '2 guests', short: 'Modern bathroom, smart TV – some rooms with balcony.',
        text: 'Completely renovated double rooms with modern bathroom with shower/WC and smart TV; some rooms have a balcony. The deluxe double room is one open space and a little more generous. Breakfast included, dogs welcome.',
        prices: ['Price on request from the house', 'Breakfast included'],
        equip: ['Modern bathroom with shower/WC', 'Smart TV', 'Some with balcony', 'Free Wi-Fi', 'Breakfast included', 'Dogs welcome'],
        alts: ['Double room with light wood, double bed and mountain photo above the headboard', 'Double room with smart TV, wardrobe and windows with red curtains', 'Deluxe double room with sofa, desk and glass coffee table']
      }
    },
    {
      id: 'superior', cap: 2, busy: 3,
      imgs: ['sup-1'],
      de: {
        name: 'Superior Doppelzimmer', kind: 'Doppelzimmer', occ: '2 Personen', short: 'Balkon oder Terrasse, Bergblick.',
        text: 'Komplett neu renoviertes Doppelzimmer mit modernem Bad mit Dusche/WC und Smart TV – und mit Balkon oder Terrasse mit Bergblick. Frühstück inklusive, Hunde willkommen.',
        prices: ['Preis auf Anfrage beim Haus', 'Frühstück inklusive'],
        equip: ['Balkon oder Terrasse', 'Bergblick', 'Modernes Bad mit Dusche/WC', 'Smart TV', 'Kostenloses WLAN', 'Frühstück inklusive', 'Hunde willkommen'],
        alts: ['Superior Doppelzimmer mit Schreibtisch und Balkontür mit Blick auf die Berge']
      },
      en: {
        name: 'Superior double room', kind: 'Double room', occ: '2 guests', short: 'Balcony or terrace, mountain view.',
        text: 'Completely renovated double room with modern bathroom with shower/WC and smart TV – plus a balcony or terrace with mountain view. Breakfast included, dogs welcome.',
        prices: ['Price on request from the house', 'Breakfast included'],
        equip: ['Balcony or terrace', 'Mountain view', 'Modern bathroom with shower/WC', 'Smart TV', 'Free Wi-Fi', 'Breakfast included', 'Dogs welcome'],
        alts: ['Superior double room with desk and balcony door with mountain view']
      }
    },
    {
      id: 'dreibett', cap: 3, busy: 2,
      imgs: ['dreibett-1', 'dreibett-2', 'dreibett-3'],
      de: {
        name: '3-Bett-Zimmer', kind: 'Für bis zu 3 Personen', occ: 'bis 3 Personen', short: 'Französisches Bett und Einzelbett; Superior-Variante mit Balkon.',
        text: 'Komplett neu renoviertes Zimmer für bis zu 3 Personen, mit französischem Bett und Einzelbett, modernem Bad mit Dusche/WC und Smart TV. Die Superior-Variante hat zusätzlich Balkon oder Terrasse und Bergblick. Frühstück inklusive, Hunde willkommen.',
        prices: ['Preis auf Anfrage beim Haus', 'Frühstück inklusive'],
        equip: ['Französisches Bett und Einzelbett', 'Modernes Bad mit Dusche/WC', 'Smart TV', 'Superior: Balkon/Terrasse mit Bergblick', 'Kostenloses WLAN', 'Frühstück inklusive', 'Hunde willkommen'],
        alts: ['3-Bett-Zimmer mit Doppelbett, Einzelbett und hellem Holzschrank', '3-Bett-Zimmer mit Betten, Smart TV und Tür zum Balkon', 'Superior 3-Bett-Zimmer mit Schreibtisch und Fenster mit roten Vorhängen']
      },
      en: {
        name: 'Triple room', kind: 'For up to 3 guests', occ: 'up to 3 guests', short: 'French bed and single bed; superior version with balcony.',
        text: 'Completely renovated room for up to 3 guests, with a French double bed and a single bed, modern bathroom with shower/WC and smart TV. The superior version also has a balcony or terrace and mountain view. Breakfast included, dogs welcome.',
        prices: ['Price on request from the house', 'Breakfast included'],
        equip: ['French bed and single bed', 'Modern bathroom with shower/WC', 'Smart TV', 'Superior: balcony/terrace with mountain view', 'Free Wi-Fi', 'Breakfast included', 'Dogs welcome'],
        alts: ['Triple room with double bed, single bed and light wooden wardrobe', 'Triple room with beds, smart TV and door to the balcony', 'Superior triple room with desk and window with red curtains']
      }
    },
    {
      id: 'familie', cap: 4, busy: 2,
      imgs: ['familie-1', 'familie-2'],
      de: {
        name: 'Familienzimmer', kind: 'Zweiräumig', occ: 'bis 4 Personen', short: 'Zweiräumig, kleiner Kühlschrank; Variante mit Terrasse.',
        text: 'Komplett neu renoviertes, zweiräumiges Zimmer – ideal für Familien bis zu 4 Personen, mit modernem Bad mit Dusche/WC, Smart TV und kleinem Kühlschrank. Die Variante mit Terrasse hat französisches Bett und Stockbett und eignet sich besonders für Familien mit Kleinkindern. Frühstück inklusive, Hunde willkommen.',
        prices: ['Preis auf Anfrage beim Haus', 'Frühstück inklusive'],
        equip: ['Zwei Räume', 'Kleiner Kühlschrank', 'Modernes Bad mit Dusche/WC', 'Smart TV', 'Variante mit Terrasse, französischem Bett und Stockbett', 'Kostenloses WLAN', 'Frühstück inklusive', 'Hunde willkommen'],
        alts: ['Familienzimmer mit Doppelbett und Fenster Richtung Berge', 'Familienzimmer mit Doppelbett, roten Vorhängen und Tür zur Terrasse']
      },
      en: {
        name: 'Family room', kind: 'Two rooms', occ: 'up to 4 guests', short: 'Two rooms, small fridge; version with terrace.',
        text: 'Completely renovated two-room unit – ideal for families of up to 4, with modern bathroom with shower/WC, smart TV and a small fridge. The version with terrace has a French bed and a bunk bed and suits families with small children. Breakfast included, dogs welcome.',
        prices: ['Price on request from the house', 'Breakfast included'],
        equip: ['Two rooms', 'Small fridge', 'Modern bathroom with shower/WC', 'Smart TV', 'Version with terrace, French bed and bunk bed', 'Free Wi-Fi', 'Breakfast included', 'Dogs welcome'],
        alts: ['Family room with double bed and window towards the mountains', 'Family room with double bed, red curtains and door to the terrace']
      }
    },
    {
      id: 'fewo', cap: 6, busy: 2, minN: 3,
      imgs: ['fewo-1', 'fewo-2'],
      de: {
        name: 'Ferienwohnung', kind: 'Apartment', occ: 'bis 6 Personen', short: '2 Schlafzimmer, Küche, Waschmaschine, Terrasse und Balkon.',
        text: 'Die neu renovierte, großzügige Ferienwohnung bietet Platz für bis zu 6 Gäste (plus 2 Babys auf Anfrage): 2 Schlafzimmer, voll ausgestattete Küche mit Herd, Kühlschrank und Geschirrspüler, modernes Bad mit Dusche, Terrasse und Balkon mit Bergblick. Dazu Waschmaschine, Flat-TV mit Streamingdiensten, 2 Doppelbetten und 2 Schlafsofas. Kinder unter 5 Jahren wohnen kostenlos; Mindestaufenthalt 3 Nächte. Hunde willkommen.',
        prices: ['Preis auf Anfrage beim Haus', 'Kinder unter 5 Jahren kostenlos', 'Mindestaufenthalt 3 Nächte'],
        equip: ['2 Schlafzimmer', 'Küche mit Herd, Kühlschrank, Geschirrspüler', 'Waschmaschine', 'Terrasse und Balkon mit Bergblick', 'Flat-TV mit Streamingdiensten', '2 Doppelbetten + 2 Schlafsofas', 'Babybetten für bis zu 2 Babys auf Wunsch', 'Hunde willkommen'],
        alts: ['Küche der Ferienwohnung mit Essbereich und Fensterfront', 'Balkon der Ferienwohnung mit Holzboden und Blick ins Grüne']
      },
      en: {
        name: 'Holiday apartment', kind: 'Apartment', occ: 'up to 6 guests', short: '2 bedrooms, kitchen, washing machine, terrace and balcony.',
        text: 'The newly renovated, generous apartment sleeps up to 6 guests (plus 2 babies on request): 2 bedrooms, fully equipped kitchen with stove, fridge and dishwasher, modern bathroom with shower, terrace and balcony with mountain view. Plus washing machine, flat TV with streaming services, 2 double beds and 2 sofa beds. Children under 5 stay free; minimum stay 3 nights. Dogs welcome.',
        prices: ['Price on request from the house', 'Children under 5 stay free', 'Minimum stay 3 nights'],
        equip: ['2 bedrooms', 'Kitchen with stove, fridge, dishwasher', 'Washing machine', 'Terrace and balcony with mountain view', 'Flat TV with streaming services', '2 double beds + 2 sofa beds', 'Baby cots for up to 2 babies on request', 'Dogs welcome'],
        alts: ['Kitchen of the apartment with dining area and window front', 'Balcony of the apartment with wooden floor and view of the green']
      }
    }
  ];

  /* Keine veröffentlichten Pauschalangebote — die private Sauna steht als eigener Abschnitt auf der Seite. */
  var OFFERS = [];

  var UI = {
    de: {
      'adult1': 'Erwachsener', 'adultN': 'Erwachsene', 'night1': 'Nacht', 'nightN': 'Nächte',
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen', 'bw.btn': 'Verfügbarkeit anfragen',
      'room.photo': 'Foto', 'room.equip': 'Ausstattung',
      'room.prices': 'Preise', 'room.bookThis': 'Diese Kategorie anfragen',
      'room.priceNote': 'Das Haus veröffentlicht keine Preisliste; Preis und Verfügbarkeit bestätigt es mit der Antwort. Beschreibungen laut schwarzberg.de, Stand 24.11.2026.',
      'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.hintIn': 'Anreisetag wählen', 'cal.hintOut': 'Jetzt den Abreisetag wählen', 'cal.reset': 'Zurücksetzen',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt (Beispiel)', 'cal.sel': 'gewählt',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder',
      'bk.kidsNote': 'Kinder unter 5 Jahren wohnen in der Ferienwohnung kostenlos (laut schwarzberg.de); alles Weitere klärt das Haus mit der Antwort auf Ihre Anfrage.',
      'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Kategorie wählen', 'bk.pickDates': 'Bitte zuerst An- und Abreise wählen.',
      'bk.select': 'Wählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Personenzahl zu klein',
      'bk.minN': 'Mindestaufenthalt 3 Nächte',
      'bk.free': 'frei', 'bk.onReq': 'Preis auf Anfrage', 'bk.onReqNote': 'inkl. Frühstück',
      'bk.none': 'In diesem Zeitraum ist im Beispiel keine Kategorie frei – bitte andere Daten wählen.',
      'bk.incl': 'Alle Zimmer mit Frühstück; Hunde willkommen. Preis und Verfügbarkeit bestätigt das Haus auf Ihre Anfrage',
      'bk.direct': 'Direkt beim Haus angefragt – ohne Vermittler.',
      'bk.summary': 'Ihre Anfrage', 'bk.room': 'Kategorie', 'bk.stay': 'Aufenthalt',
      'bk.price': 'Preis', 'bk.priceReq': 'auf Anfrage – das Haus bestätigt den Preis mit der Antwort',
      'bk.back': 'Zurück', 'bk.title': 'Zimmer anfragen',
      'bk.pay': 'Keine Vorauszahlung über diese Seite.', 'bk.cancel': 'Stornobedingungen bestätigt das Haus mit der Antwort.',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.arrival': 'Voraussichtliche Ankunftszeit (Check-in ab 15 Uhr)',
      'f.msg': 'Nachricht an das Haus (z. B. Hund, Babybett, Motorrad)', 'f.consent': 'Ich habe die <a href="datenschutz.html">Datenschutzerklärung</a> gelesen.',
      'f.submit': 'Anfrage senden',
      'e.name': 'Bitte Vor- und Nachnamen angeben.', 'e.email': 'Bitte eine gültige E-Mail-Adresse angeben.',
      'e.phone': 'Bitte eine Telefonnummer angeben.', 'e.consent': 'Bitte die Datenschutzerklärung bestätigen.',
      'ok.title': 'Danke, {name}!', 'ok.text': 'Ihre Anfrage geht an {email} in Kopie. Das Haus meldet sich mit Preis und Verfügbarkeit.',
      'ok.no': 'Anfragenummer',
      'ok.demo': 'Vorschau: Es wurde nichts gebucht und keine Daten wurden gesendet. In der fertigen Website geht diese Anfrage direkt an den Landgasthof.',
      'ok.close': 'Schließen',
      'map.link': 'In OpenStreetMap öffnen',
      'steps.1': 'Zeitraum & Kategorie', 'steps.2': 'Ihre Daten', 'steps.3': 'Bestätigung',
      'd.thu': 'Do', 'd.fri': 'Fr', 'd.sat': 'Sa', 'd.sun': 'So', 'd.mon': 'Mo'
    },
    en: {
      'adult1': 'adult', 'adultN': 'adults', 'night1': 'night', 'nightN': 'nights',
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Select date', 'bw.btn': 'Check availability',
      'room.photo': 'Photo', 'room.equip': 'Facilities',
      'room.prices': 'Rates', 'room.bookThis': 'Enquire about this category',
      'room.priceNote': 'The house does not publish a price list; price and availability are confirmed with the reply. Descriptions as on schwarzberg.de, 24 Nov 2026.',
      'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.hintIn': 'Select arrival day', 'cal.hintOut': 'Now select the departure day', 'cal.reset': 'Reset',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'free', 'cal.busy': 'booked (sample)', 'cal.sel': 'selected',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children',
      'bk.kidsNote': 'Children under 5 stay free in the holiday apartment (as on schwarzberg.de); the house clarifies everything else in its reply.',
      'bk.less': 'less', 'bk.more': 'more',
      'bk.rooms': 'Choose a category', 'bk.pickDates': 'Please select arrival and departure first.',
      'bk.select': 'Select', 'bk.busy': 'Booked in this period', 'bk.small': 'Too small for this number of guests',
      'bk.minN': 'Minimum stay 3 nights',
      'bk.free': 'free', 'bk.onReq': 'Price on request', 'bk.onReqNote': 'incl. breakfast',
      'bk.none': 'No category is free in this period in the sample – please choose other dates.',
      'bk.incl': 'All rooms with breakfast; dogs welcome. The house confirms price and availability in its reply',
      'bk.direct': 'Enquiry goes directly to the house – no intermediary.',
      'bk.summary': 'Your enquiry', 'bk.room': 'Category', 'bk.stay': 'Stay',
      'bk.price': 'Price', 'bk.priceReq': 'on request – the house confirms the price in its reply',
      'bk.back': 'Back', 'bk.title': 'Room enquiry',
      'bk.pay': 'No prepayment via this page.', 'bk.cancel': 'The house confirms the cancellation terms in its reply.',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.arrival': 'Expected arrival time (check-in from 3 pm)',
      'f.msg': 'Message to the house (e.g. dog, baby cot, motorbike)', 'f.consent': 'I have read the <a href="datenschutz.html">privacy policy</a>.',
      'f.submit': 'Send enquiry',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid e-mail address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please confirm the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'A copy of your enquiry goes to {email}. The house will get back to you with price and availability.',
      'ok.no': 'Enquiry number',
      'ok.demo': 'Preview: nothing has been booked and no data has been sent. On the finished website this enquiry goes straight to the inn.',
      'ok.close': 'Close',
      'map.link': 'Open in OpenStreetMap',
      'steps.1': 'Dates & category', 'steps.2': 'Your details', 'steps.3': 'Confirmation',
      'd.thu': 'Thu', 'd.fri': 'Fri', 'd.sat': 'Sat', 'd.sun': 'Sun', 'd.mon': 'Mon'
    }
  };

  /* Englische Fassung der Seite (Schlüssel = data-i18n im HTML) */
  var EN = {
    'beta': 'Beta preview — not a finished design',
    'brand.sub': 'Country inn · Beer garden · Inzell',
    'nav.biergarten': 'Beer garden', 'nav.kueche': 'Kitchen', 'nav.zimmer': 'Rooms', 'nav.sauna': 'Sauna',
    'nav.biker': 'Bikers', 'nav.inzell': 'Inzell', 'nav.anreise': 'Getting here',
    'cta.book': 'Enquire', 'menu': 'Menu',

    'hero.kicker': 'Country inn · Beer garden · Hotel',
    'hero.title': 'Where the Chiemgau kisses the Alps.',
    'hero.sub': 'A Bavarian beer garden under three old chestnut trees, a parlour with a tiled stove and completely renovated rooms – on the edge of Inzell, in the heart of the Chiemgau. Dogs and bikers are very welcome.',
    'hero.fact': '20 rooms', 'hero.priceNote': 'from single room to holiday apartment · breakfast included · prices on request',
    'hero.alt': 'The Landgasthof Schwarzberg in the evening: farmhouse with green balconies and a busy beer garden under the chestnut trees',

    'bg.title': 'Beer, pretzels and chestnut trees',
    'bg.text': 'The beer garden is the heart of the Schwarzberg: around 200 seats in the shade of three old chestnut trees, with a view across the whole Inzell valley to the Chiemgau Alps. Add a cool lager or a fresh wheat beer from the house brewery Wieninger – and in the warm months bands play on fine days, sometimes traditionally Bavarian, sometimes a little more modern.',
    'bg.f1': 'Seats', 'bg.f1v': 'Around 200, under three old chestnut trees',
    'bg.f2': 'Beer', 'bg.f2v': 'Lager and wheat beer from the house brewery Wieninger',
    'bg.f3': 'View', 'bg.f3v': 'Across the Inzell valley to the Chiemgau Alps',
    'bg.f4': 'Live music', 'bg.f4v': 'In the warm months, traditional to modern',
    'bg.f5': 'Food', 'bg.f5v': 'From roast pork knuckle to coffee and cake',
    'bg.q': '“The pleasant shade of ancient chestnut trees, a cool beer or a fresh wheat beer from our house brewery Wieninger and an incomparable view over the whole Inzell valley.”',
    'bg.qc': 'Landgasthof Schwarzberg, schwarzberg.de',
    'bg.alt1': 'Bavarian snack and wheat beer on a beer garden table, meadows and the Chiemgau Alps behind',
    'bg.alt2': 'Band in traditional dress with guitar and tuba under the beer garden umbrellas',
    'bg.alt3': 'Waiter with two freshly tapped lagers on a tray in front of the painted facade',
    'bg.alt4': 'Empty beer garden tables under the big chestnut tree, meadows and mountains behind',
    'bg.cap': 'A snack with a view of the Alps – and music under the chestnut trees in the afternoon.',
    'bg.cap2': 'The beer garden under the chestnut trees – around 200 seats overlooking the Inzell valley.',

    'ku.title': 'A parlour with a tiled stove',
    'ku.text': 'The restaurant, furnished with plenty of wood, has around 140 seats and a cosy tiled stove. The kitchen is regionally Bavarian with influences from neighbouring Tyrol; breakfast is included for hotel guests. There is free Wi-Fi in the parlour, too – and if you have something to celebrate, there is room for up to 50 guests.',
    'ku.h1': 'Parlour', 'ku.h2': 'From the kitchen',
    'ku.o1': 'Seats', 'ku.o1v': 'Around 140, with plenty of wood and a cosy tiled stove',
    'ku.o2': 'Kitchen', 'ku.o2v': 'Regionally Bavarian, with influences from neighbouring Tyrol',
    'ku.o3': 'Breakfast', 'ku.o3v': 'Generous – included for hotel guests',
    'ku.o4': 'Celebrations', 'ku.o4v': 'Wedding, birthday or anniversary for up to 50 guests – the house helps with the planning',
    'ku.m1': 'Pork knuckle', 'ku.m1v': 'Oven-fresh – not only on Sundays',
    'ku.m2': 'Salads', 'ku.m2v': 'Colourful variations in dark-beer dressing with baked veal sausage',
    'ku.m3': 'Trout', 'ku.m3v': 'Local, from the streams of the region',
    'ku.m4': 'Sweets', 'ku.m4v': 'Apple strudel, coffee and cake in the afternoon',
    'ku.q': '“From oven-fresh pork knuckle and the classic sausage salad to local trout, coffee and cake – the whole range of local and international beer garden specialities.”',
    'ku.qc': 'Landgasthof Schwarzberg, schwarzberg.de',
    'ku.alt1': 'Parlour with wooden ceiling, corner benches and windows looking out into the green',
    'ku.alt2': 'Plate of roast meat in dark sauce on sauerkraut',
    'ku.alt3': 'Apple strudel with whipped cream and icing sugar on a grey plate',
    'ku.alt4': 'The parlour with wooden ceiling, corner benches and lamps above the laid tables',
    'ku.cap': 'The parlour: plenty of wood, corner benches and the view through the lattice windows into the valley.',

    'st.1n': 'Around&nbsp;200', 'st.1': 'seats in the beer garden under three old chestnut trees',
    'st.2n': 'Around&nbsp;140', 'st.2': 'seats in the parlour with its tiled stove',
    'st.3n': '20', 'st.3': 'rooms, completely renovated',
    'st.4n': '8.5&thinsp;/&thinsp;10', 'st.4': 'KAYAK average from 1,251 reviews',
    'st.5n': '3&nbsp;hrs', 'st.5': 'private sauna – reserved exclusively for you',

    'zi.r1a': 'Single room with single bed, desk and warm lamplight',
    'zi.r2a': 'Double room with light wood, double bed and mountain photo above the headboard',
    'zi.r3a': 'Superior double room with desk and balcony door with mountain view',
    'zi.r4a': 'Triple room with double bed, single bed and light wooden wardrobe',
    'zi.r5a': 'Family room with double bed and window towards the mountains',
    'zi.r6a': 'Kitchen of the apartment with dining area and window front',

    'zi.title': 'Rooms',
    'zi.lead': 'All rooms are completely renovated, with a modern bathroom, smart TV and free Wi-Fi. Breakfast included, dogs very welcome. The house confirms prices on request.',
    'zi.details': 'Photos & details', 'zi.book': 'Enquire', 'zi.req': 'on request', 'room.bf': 'incl. breakfast',
    'zi.r1': 'Standard single room', 'zi.r1s': 'Completely renovated, bathroom with shower/WC, TV', 'zi.r1o': '1 guest',
    'zi.r2': 'Standard & deluxe double room', 'zi.r2s': 'Modern bathroom, smart TV, some with balcony', 'zi.r2o': '2 guests',
    'zi.r3': 'Superior double room', 'zi.r3s': 'With balcony or terrace and mountain view', 'zi.r3o': '2 guests',
    'zi.r4': 'Triple room', 'zi.r4s': 'French bed and single bed; superior version with balcony and mountain view', 'zi.r4o': 'up to 3 guests',
    'zi.r5': 'Family room', 'zi.r5s': 'Two rooms, with a small fridge; with terrace on request', 'zi.r5o': 'up to 4 guests',
    'zi.r6': 'Holiday apartment', 'zi.r6s': '2 bedrooms, kitchen, washing machine, terrace and balcony with mountain view; from 3 nights', 'zi.r6o': 'up to 6 guests',
    'zi.r6b': 'children under 5 free',
    'zi.extra': 'Room descriptions as on schwarzberg.de, 24 Nov 2026. The house does not publish a price list – price and availability are confirmed in the reply to your enquiry.',
    'zi.scoreV': 'of 10 KAYAK average from 1,251 reviews; Booking.com: 8.5 from 781 reviews (both retrieved 24 Nov 2026)',
    'zi.q': 'Frequently praised in the reviews: the friendly staff, the breakfast, the clean, newly renovated rooms and the location.',
    'zi.qc': 'Review topics as listed on KAYAK, retrieved 24 Nov 2026',

    'sa.title': 'Newly opened: the private sauna',
    'sa.text': 'The newly opened sauna area is yours alone for three hours – with vital snacks, tea and water, non-alcoholic beers and towels, bathrobe and slippers on loan. Reception is happy to tell you about free slots.',
    'sa.f1': 'Private', 'sa.f1v': 'Exclusive use for 3 hours, for 2 to 4 guests',
    'sa.f2': 'Included', 'sa.f2v': 'Vital snacks, tea and water, non-alcoholic beers, towels, bathrobe, slippers',
    'sa.f3': 'Price', 'sa.f3v': '€78 for 2 guests; 3rd and 4th guest €20 each',
    'sa.f4': 'Extras', 'sa.f4v': 'Sauna infusion for a surcharge; sparkling wine or non-alcoholic prosecco €25',
    'sa.f5': 'Opening hours', 'sa.f5v': 'Daily 7 am – 10 pm, booked via reception',
    'sa.q': '“Take a little time for yourself – treat yourself in our newly opened sauna area.”',
    'sa.qc': 'Landgasthof Schwarzberg, schwarzberg.de/wellness',
    'sa.alt1': 'Relaxation room with light rocking loungers in front of a wooden wall',
    'sa.alt2': 'Sauna cabin made of light wood with a glass door',
    'sa.alt3': 'Sauna benches with bucket, ladle and aroma oils',
    'sa.cap': 'Three hours reserved for you: sauna and relaxation room with loungers.',

    'bi.title': 'Bikers welcome',
    'bi.text': 'Inzell lies on the German Alpine Road, and the Schwarzberg is listed as a motorcycle hotel in the Chiemgau. After a day in the saddle: park the bike within sight, warm up in the sauna, settle into the beer garden.',
    'bi.c1': 'The German Alpine Road runs through Inzell – winding on towards Ruhpolding and Berchtesgaden.',
    'bi.c2y': 'Parking', 'bi.c2': 'Free parking right at the house – the motorbike stays within sight.',
    'bi.c3y': 'Sauna', 'bi.c3': 'The private sauna helps you recover after long riding days.',
    'bi.c4y': 'Tours', 'bi.c4': 'Chiemsee and the Upper Bavarian lakes, Salzburg region, Großer Ahornboden in the Karwendel.',
    'bi.c5y': 'Listed', 'bi.c5': 'With its own profile as a motorcycle hotel on motorradundreisen.de.',
    'bi.alt': 'The Gasthof Schwarzberg in summer: facade painting, wooden balconies and the beer garden in front',

    'in.title': 'Inzell, Chiemgau, Alps',
    'in.text': 'In summer Inzell means the natural bathing lake, the cycle paths through the flat valley and the “calorie promenade”; in winter it is more than 40 kilometres of cleared winter paths and over 35 kilometres of cross-country trails – the entry to the Filzenloipe is just a few steps from the house. The natural toboggan run to Forsthaus Adlgaß is 600 metres long, floodlit on Thursdays and Sundays.',
    'in.sport': 'Speed skating and biathlon: the Max Aicher Arena in Inzell is 3.4 km away, the Chiemgau Arena in Ruhpolding around 16 km.',
    'in.th1': 'Distances (driving route, own measurement via OpenStreetMap)',
    'in.d1': 'Inzell village centre', 'in.d2': 'Badepark Inzell', 'in.d3': 'Max Aicher Arena', 'in.d4': 'Traunstein railway station',
    'in.d5': 'Chiemgau Arena Ruhpolding', 'in.d6': 'Lake Chiemsee', 'in.d7': 'Salzburg airport',
    'in.alt': 'Winter view over the Gasthof Schwarzberg to the snow-covered Inzell valley and the mountains',
    'in.alt2': 'Wooden sledge in the snow in front of the snowy Inzell valley in the evening sun',
    'in.cap': 'The Inzell valley in winter – the Schwarzberg sits on the edge of the village, on the road towards Traunstein.',

    'ar.title': 'Getting here',
    'ar.addr': 'Address', 'ar.addrV': 'Landgasthof Schwarzberg · Traunsteiner Str. 95 · 83334 Inzell · Germany',
    'ar.car': 'By car', 'ar.carV': 'From the A8 motorway (exit Traunstein/Siegsdorf) via the B306 towards Inzell; the house sits on Traunsteiner Straße on the edge of the village. Free parking at the house.',
    'ar.train': 'By train', 'ar.trainV': 'The nearest railway station is Traunstein, around 16 km away; continue by bus towards Inzell or by taxi.',
    'ar.times': 'Check-in / check-out', 'ar.timesV': 'Check-in from 3 pm, check-out until 10 am (as listed on Booking.com/KAYAK, 24 Nov 2026)',
    'ar.contact': 'Contact', 'ar.web': 'schwarzberg.de',
    'map.btn': 'Load map', 'map.note': 'The map is loaded from OpenStreetMap only after you click.',
    'map.alt': 'The snow-covered Gasthof Schwarzberg with dark wooden facade and green shutters',

    'foot.beta': 'Beta preview – concept & implementation: Olga Tikhomirova',
    'foot.legal': 'Imprint', 'foot.privacy': 'Privacy', 'foot.photos': 'Photos: schwarzberg.de (the house’s own photos).',
    'foot.old': 'Current website',
    'bk.title': 'Room enquiry',
    'steps.1': 'Dates & category', 'steps.2': 'Your details', 'steps.3': 'Confirmation'
  };

  window.SCHWARZBERG = { ROOMS: ROOMS, OFFERS: OFFERS, UI: UI, EN: EN };
})();
