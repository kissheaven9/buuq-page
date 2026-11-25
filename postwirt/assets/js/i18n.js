/* Landhotel Postwirt — Inhalte: Zimmerdaten, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Preisliste hotel-postwirt.de/de/hotel/preisliste.html (Stand November 2026): pro Person und Nacht
     inkl. Frühstücksbuffet, Vitaloase, Leihbademantel, WLAN, Igelbus/Waldbahn. Zzgl. Kurtaxe
     (3 € pro Erwachsenem und Tag). price = 2026, price27 = ab 2027.
     Halbpension (4-Gang-Menü): +38 € pro Person/Nacht, ab 2027 +39 € (Kinder 4–9: +15 €, 10–14: +21 €).
     Kinder: bis 3 Jahre kostenfrei, 4–9 Jahre 21 €, 10–14 Jahre 27 € pro Nacht inkl. Frühstück.
     Doppelzimmer zur Einzelnutzung: +35 € pro Nacht. Suite mit 3–4 Erwachsenen: 10 € Abzug pro Person/Tag.
     Hund: 10 € pro Tag. busy = Demo-Auslastung. */
  var ROOMS = [
    {
      id: 'tanne', price: 80.00, price27: 86.00, size: 26, minP: 1, maxP: 2, busy: 3, singleUse: true,
      imgs: ['tanne', 'tanne-2', 'tanne-bad'],
      de: {
        name: 'Standard-Doppelzimmer „Tanne“',
        cap: '1–2 Personen',
        short: 'Junge, moderne Zimmer mit Holzboden und gemütlicher Sitzecke – teilweise mit Balkon.',
        text: 'Helle Zimmer mit Holzboden, Doppelbett 180 × 200, Dusche oder Bad/WC, Föhn, TV und ' +
          'gemütlicher Sitzecke. Teilweise mit dem Aufzug anfahrbar. Mit Balkon: 83 € pro Person und Nacht ' +
          '(ab 2027: 89 €). Einzelnutzung: zuzüglich 35 € pro Nacht.',
        alts: ['Doppelzimmer „Tanne“ mit Holzboden, Boxspringbett und rotem Stuhl am Schreibtisch', 'Sitzbereich mit Stehlampe, Fernseher und Obstteller', 'Bad mit Dusche, Waschtisch und dunklen Fliesen']
      },
      en: {
        name: 'Standard double room “Tanne”',
        cap: '1–2 guests',
        short: 'Young, modern rooms with wooden floors and a cosy seating corner – some with balcony.',
        text: 'Bright rooms with wooden floor, 180 × 200 double bed, shower or bath/WC, hairdryer, TV and ' +
          'a cosy seating corner. Partly reachable by lift. With balcony: €83 per person per night ' +
          '(from 2027: €89). Single use: plus €35 per night.',
        alts: ['Double room “Tanne” with wooden floor, box-spring bed and red desk chair', 'Seating area with floor lamp, TV and fruit plate', 'Bathroom with shower, washbasin and dark tiles']
      }
    },
    {
      id: 'buche', price: 93.00, price27: 99.00, size: 25, minP: 2, maxP: 2, busy: 2,
      imgs: ['buche', 'buche-2', 'buche-bad'],
      de: {
        name: 'Design-Doppelzimmer „Buche“',
        cap: '2 Personen',
        short: 'Viel Holz, starke Farben und Designklassiker neben gewohnten alten Möbelstücken.',
        text: 'Zimmer mit viel Holz, in Kombination mit Designklassikern in starken Farben und gewohnten ' +
          'alten Möbelstücken. Boxspringbett 180 × 200, Badezimmer mit Dusche und WC, Föhn, SAT-TV ' +
          'und kostenloses WLAN. 20–25 Quadratmeter.',
        alts: ['Design-Doppelzimmer „Buche“ mit Holzwand, Hirschmotiv und weißen Kissen', 'Bemalter Bauernschrank und Leselampe neben dem Bett', 'Waschtisch mit heller Holzplatte und weißem Aufsatzbecken']
      },
      en: {
        name: 'Design double room “Buche”',
        cap: '2 guests',
        short: 'Lots of wood, strong colours and design classics next to familiar old furniture.',
        text: 'Rooms with plenty of wood combined with design classics in strong colours and familiar ' +
          'old furniture. 180 × 200 box-spring bed, bathroom with shower and WC, hairdryer, satellite TV ' +
          'and free Wi-Fi. 20–25 square metres.',
        alts: ['Design double room “Buche” with wooden wall, deer motif and white pillows', 'Painted farmhouse cupboard and reading lamp next to the bed', 'Washbasin with light wooden top and white countertop bowl']
      }
    },
    {
      id: 'suite', price: 108.00, price27: 115.00, size: 40, minP: 2, maxP: 4, busy: 2,
      imgs: ['suite', 'suite-2', 'suite-bad'],
      de: {
        name: 'Landlust-Juniorsuite „Buche“',
        cap: '2–4 Personen',
        short: 'Wohn- und Schlafbereich auf rund 40 Quadratmetern – auch als Familienzimmer geeignet.',
        text: 'Gemütlicher Wohn- und Schlafbereich mit Boxspringbett 180 × 200, teilweise mit Schlafcouch ' +
          '(160 × 200) und Balkon. Badezimmer mit Dusche und WC, teilweise mit Badewanne. Auch als ' +
          'Familienzimmer für bis zu 4 Personen geeignet. Nicht mit dem Aufzug anfahrbar.',
        alts: ['Juniorsuite „Buche“ mit Holzwand, Hirschmotiv und Fellteppich', 'Schlafbereich mit Doppelbett, Schreibtisch und Balkontür', 'Bad der Suite mit Badewanne und Dusche']
      },
      en: {
        name: 'Country junior suite “Buche”',
        cap: '2–4 guests',
        short: 'Living and sleeping area on around 40 square metres – also suitable as a family room.',
        text: 'Cosy living and sleeping area with a 180 × 200 box-spring bed, partly with a sofa bed ' +
          '(160 × 200) and balcony. Bathroom with shower and WC, partly with bathtub. Also suitable as ' +
          'a family room for up to 4 guests. Not reachable by lift.',
        alts: ['Junior suite “Buche” with wooden wall, deer motif and fur rug', 'Sleeping area with double bed, desk and balcony door', 'Suite bathroom with bathtub and shower']
      }
    },
    {
      id: 'ez', price: 94.00, price27: 99.00, size: 12, minP: 1, maxP: 1, busy: 2,
      imgs: ['einzel', 'einzel-2', 'einzel-3'],
      de: {
        name: 'Einzelzimmer',
        cap: '1 Person',
        short: 'Kompakt und gemütlich: Queensize-Bett 140 × 200, Dusche/WC – Frühstück inklusive.',
        text: 'Gemütliches Einzelzimmer mit Queensize-Bett 140 × 200, Badezimmer mit Dusche und WC, Föhn, ' +
          'TV und kostenlosem WLAN. Nicht direkt mit dem Aufzug anfahrbar.',
        alts: ['Einzelzimmer mit Holzbett, roter Wand und Spiegel', 'Schreibtisch mit Zimmersafe, Hocker und Stehlampe', 'Zimmer mit Doppelbett vor roter Wand und Vorhängen']
      },
      en: {
        name: 'Single room',
        cap: '1 guest',
        short: 'Compact and cosy: 140 × 200 queen-size bed, shower/WC – breakfast included.',
        text: 'Cosy single room with a 140 × 200 queen-size bed, bathroom with shower and WC, hairdryer, ' +
          'TV and free Wi-Fi. Not directly reachable by lift.',
        alts: ['Single room with wooden bed, red wall and mirror', 'Desk with room safe, stool and floor lamp', 'Room with double bed in front of a red wall and curtains']
      }
    }
  ];

  var UI = {
    de: {
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen',
      'bw.btn': 'Verfügbarkeit prüfen',
      adult1: 'Erwachsener', adultN: 'Erwachsene', kid1: 'Kind', kidN: 'Kinder', pet: 'Hund', hp: 'Halbpension',
      night1: 'Nacht', nightN: 'Nächte',
      'room.pn': 'pro Person und Nacht, inkl. Frühstück', 'room.details': 'Details', 'room.book': 'Buchen',
      'room.bookThis': 'Dieses Zimmer buchen', 'room.equip': 'Im Preis enthalten',
      'room.equipList': ['Frühstücksbuffet', 'Vitaloase: Pool & 3 Saunen', 'WLAN kostenlos', 'Leihbademantel', 'Flasche Wasser am Zimmer', 'Igelbus & Waldbahn ab Hotel'],
      'room.priceNote': 'zzgl. Kurtaxe: 3 € pro Erwachsenem und Tag · Halbpension zubuchbar: +38 € pro Person und Nacht (ab 2027: 39 €)',
      'room.m2': 'm²', 'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
      'cal.reset': 'Auswahl zurücksetzen',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder (bis 14 Jahre)',
      'bk.age': 'Alter Kind', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.pet': 'Mit Hund (10 € pro Tag, ohne Verpflegung)',
      'bk.hp': 'Mit Halbpension: 4-Gang-Verwöhnmenü (+38 € pro Person und Nacht, ab 2027: 39 €; Kinder ermäßigt)',
      'bk.kidNote': 'Kinder: bis 3 Jahre kostenfrei, 4–9 Jahre 21 €, 10–14 Jahre 27 € pro Nacht inkl. Frühstück. Ab 15 Jahren gilt der Erwachsenenpreis.',
      'bk.rooms': 'Verfügbare Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie Preis und Verfügbarkeit.',
      'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl nicht buchbar',
      'bk.total': 'gesamt', 'bk.incl': 'Alle Preise pro Person inkl. Frühstücksbuffet, Vitaloase, Leihbademantel und WLAN.',
      'bk.short': 'Zzgl. Kurtaxe der Stadt Grafenau: 3 € pro Erwachsenem und Tag, Kinder ermäßigt. Stornierung bis 14 Tage vor Anreise kostenlos.',
      'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie Zeitraum oder Gästezahl – ' +
        'oder rufen Sie uns an: +49 8552 96450.',
      'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
      'bk.price': 'Gesamtpreis', 'bk.pay': 'Check-in ab 14 Uhr, Check-out bis 11 Uhr.',
      'bk.calcRoom': 'Übernachtung', 'bk.calcHp': 'Halbpension', 'bk.calcSingle': 'Einzelnutzung', 'bk.calcPet': 'Hund',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail-Adresse', 'f.phone': 'Telefon',
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
      'map.link': 'In OpenStreetMap öffnen'
    },
    en: {
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Select date',
      'bw.btn': 'Check availability',
      adult1: 'adult', adultN: 'adults', kid1: 'child', kidN: 'children', pet: 'dog', hp: 'half board',
      night1: 'night', nightN: 'nights',
      'room.pn': 'per person and night, incl. breakfast', 'room.details': 'Details', 'room.book': 'Book',
      'room.bookThis': 'Book this room', 'room.equip': 'Included in the price',
      'room.equipList': ['Breakfast buffet', 'Spa: pool & 3 saunas', 'Free Wi-Fi', 'Bathrobe to borrow', 'Bottle of water in the room', 'Free Igelbus & Waldbahn'],
      'room.priceNote': 'plus visitor’s tax: €3 per adult and day · half board available: +€38 per person and night (from 2027: €39)',
      'room.m2': 'm²', 'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'cal.hintIn': 'Please choose your arrival date.', 'cal.hintOut': 'Now choose your departure date.',
      'cal.reset': 'Reset selection',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children (up to 14)',
      'bk.age': 'Age of child', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.pet': 'With a dog (€10 per day, food not included)',
      'bk.hp': 'With half board: 4-course menu (+€38 per person and night, from 2027: €39; reduced for children)',
      'bk.kidNote': 'Children: up to 3 years free, 4–9 years €21, 10–14 years €27 per night incl. breakfast. From 15 the adult rate applies.',
      'bk.rooms': 'Available rooms', 'bk.pickDates': 'Choose arrival and departure to see prices and availability.',
      'bk.select': 'Select', 'bk.busy': 'Booked for these dates', 'bk.small': 'Not bookable for this number of guests',
      'bk.total': 'total', 'bk.incl': 'All prices per person incl. breakfast buffet, spa, bathrobe and Wi-Fi.',
      'bk.short': 'Plus visitor’s tax of the town of Grafenau: €3 per adult and day, reduced for children. Free cancellation up to 14 days before arrival.',
      'bk.none': 'Unfortunately no room is available for this combination. Please change the dates or number of ' +
        'guests – or call us: +49 8552 96450.',
      'bk.back': 'Back', 'bk.summary': 'Your booking', 'bk.stay': 'Dates', 'bk.room': 'Room',
      'bk.price': 'Total price', 'bk.pay': 'Check-in from 2 pm, check-out by 11 am.',
      'bk.calcRoom': 'Accommodation', 'bk.calcHp': 'Half board', 'bk.calcSingle': 'Single use', 'bk.calcPet': 'Dog',
      'f.name': 'First and last name', 'f.email': 'Email address', 'f.phone': 'Phone',
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
    'nav.house': 'The house', 'nav.rooms': 'Rooms', 'nav.spa': 'Spa', 'nav.park': 'National park', 'nav.arrival': 'Getting here',
    'cta.book': 'Book',
    'hero.alt': 'The Landhotel Postwirt in summer: wooden facade, inn sign and the path through the beer garden',
    'hero.line': 'Country hotel &amp; inn since 1890 · Rosenau near Grafenau, Bavarian Forest',
    'house.title': 'The house in Rosenau',
    'house.lead': 'Since 1890 the Postwirt has been in the hands of the Beck family – first an inn and post station, today a 3-star-superior country hotel with its own tavern on the edge of the Bavarian Forest National Park.',
    'house.text': 'Cosy rooms and suites with shower or bathtub, bathrobe and free Wi-Fi, many with a balcony. Mornings start with the breakfast buffet; in the evening there is honest tavern cooking in the parlour or beer garden – on request as a 4-course menu with half board. Add the spa with indoor pool and three saunas, free parking with an EV charging point, and the Igelbus and town bus stop right opposite the hotel.',
    'house.n1': 'four generations of the Beck family · hotel-postwirt.de',
    'house.n2': 'out of 6 · 151 reviews on HolidayCheck, as of November 2026',
    'house.alt1': 'The Landhotel Postwirt on a winter evening, warmly lit in the snow',
    'house.cap1': 'The Postwirt in winter – starting point for cross-country trails, winter walks and the national park.',
    'house.alt2': 'The parlour with wooden ceiling, winter garden and laid tables',
    'house.cap2': 'The parlour with winter garden – kitchen daily 5.30–9 pm, also at lunchtime on Sundays and holidays.',
    'house.alt3': 'A plated dish with fried fish and edible flowers from the Postwirt kitchen',
    'house.cap3': 'Honest tavern cooking – regional and lovingly presented.',
    'q1.text': '“Whether you are spending a few days’ holiday in the Bavarian Forest, eating well with us or celebrating with family, friends or colleagues: the Beck family and all the Postwirt crew bid you a warm welcome.”',
    'q1.src': 'The Beck family · hotel-postwirt.de',
    'rooms.title': 'Rooms &amp; rates',
    'rooms.text': 'Rates per person and night, including breakfast buffet, spa, bathrobe, Wi-Fi and free Igelbus and Waldbahn from the hotel. Plus visitor’s tax. Free cancellation up to 14 days before arrival.',
    'prices.cap': 'The house’s price list',
    'prices.h1': 'per person and night, incl. breakfast', 'prices.h3': 'from 2027',
    'prices.r1': 'Single room', 'prices.r2': 'Standard double room “Tanne”', 'prices.r3': 'Standard double room “Tanne” with balcony',
    'prices.r4': 'Comfort double room “Erle”', 'prices.r5': 'Design double room “Buche”',
    'prices.r6': 'Country junior suite “Buche”', 'prices.r7': 'Design gable suite “Buche”', 'prices.r8': 'Superior suite “Tanne”',
    'prices.r9': 'Half board: 4-course menu, per person and night', 'prices.r10': 'Double room for single use, per night',
    'prices.r11': 'Dog, per day (food not included)',
    'times.t1': 'Arrival', 'times.d1': 'Check-in from 2 pm',
    'times.t2': 'Breakfast', 'times.d2': 'Mon–Fri 6.30–10 am · Sat, Sun &amp; holidays 7.30–10 am',
    'times.t3': 'Departure', 'times.d3': 'Check-out by 11 am',
    'times.t4': 'Reception', 'times.d4': 'Mon–Fri 7.30 am–8 pm · Sat, Sun &amp; holidays 8 am–8 pm',
    'q2.text': '“We look forward to your visit and will gladly keep a nice little spot free for you here at the Postwirt.”',
    'q2.src': 'Your Postwirt crew · hotel-postwirt.de',
    'vital.alt1': 'The indoor pool of the spa with warm light and wooden loungers',
    'vital.title': 'The spa',
    'vital.lead': 'After a day in the national park, swim a few laps, take a hot break in one of the three saunas or treat yourself to a treatment – that is what our small but fine spa is for. For hotel guests it is included in the room rate.',
    'vital.text': 'Indoor pool, Finnish sauna, bio sauna and steam bath, plus a relaxation room and drinks station – open daily from 8 am to 9 pm. Classic massages and natural cosmetics are available by appointment; best requested when booking. Day guests enjoy the spa with the “Little Break” day package.',
    'vd.t1': 'Open', 'vd.d1': 'daily 8 am – 9 pm',
    'vd.t2': 'Saunas', 'vd.d2': '3 · Finnish, bio, steam bath',
    'vd.t3': 'Day spa “Little Break”', 'vd.d3': '€35 per person',
    'vd.t4': 'Back deluxe massage, 25 min', 'vd.t5': 'Full-body relax massage, 60 min',
    'vd.t6': 'Hotel guests', 'vd.d6': 'use included',
    'vital.alt2': 'The sauna cabins of the spa: Finnish and bio sauna with wooden fronts',
    'vital.cap2': 'Three saunas: Finnish sauna, bio sauna and steam bath.',
    'vital.alt3': 'The relaxation room with loungers, towels and soft light',
    'vital.cap3': 'The relaxation room – with bathrobe and sauna towels from your room.',
    'wald.alt1': 'Sunbeams between tall trees in the Bavarian Forest National Park',
    'wald.title': 'The national park',
    'wald.lead': 'The Postwirt sits in Rosenau, right on the route into the Bavarian Forest National Park – with around 320 kilometres of signposted hiking trails and about 170 kilometres of cross-country ski tracks. We will gladly lay out hiking and trail maps for you.',
    'wald.text': 'As a hotel guest you use the Igelbus and the Waldbahn free of charge from the hotel – and the guest card gives discounts on the treetop walk, guided tours in the national park and the museums in Grafenau. Golfers play at the national park golf course nearby, and the hotel’s own tennis court is free for guests. In winter, cross-country trails, winter walking paths and sledging slopes await.',
    'dist.t1': 'Igelbus &amp; town bus', 'dist.d1': 'right opposite',
    'dist.t2': 'Waldbahn stop Rosenau', 'dist.d2': '10 minutes on foot',
    'dist.t3': 'Grafenau town centre', 'dist.t4': 'Neuschönau, national park entrance',
    'dist.t5': 'The hotel’s tennis court', 'dist.t6': 'Hiking trails in the national park',
    'arr.title': 'Getting here',
    'arr.1t': 'By car',
    'arr.1': 'From Nuremberg or Passau on the A3 to the Hengersberg exit, then follow the signs via the B533 towards Grafenau. From Munich take the A92 towards Deggendorf, at the Deggendorf interchange join the A3 towards Passau, exit Hengersberg. Parking at the house is free and an EV charging point is available in the hotel car park.',
    'arr.2t': 'By train and bus',
    'arr.2': 'Take the Waldbahn to Grafenau (station approx. 2 km) – we will gladly pick you up with our shuttle service. Or get off at the request stop “Rosenau”, about ten minutes’ walk through the village. The Igelbus and the town bus stop right opposite the hotel.',
    'arr.3t': 'Arrival',
    'arr.3': 'Rooms are ready from 2 pm; reception is staffed until 8 pm. If you arrive later, please call ahead: +49 8552 96450.',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Landhotel Postwirt (hotel-postwirt.de)',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'bk.title': 'Book', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
  };

  window.POSTWIRT = { ROOMS: ROOMS, UI: UI, EN: EN };
})();
