/* Pension Oechsner — Inhalte: Zimmerdaten, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Preisliste pension-oechsner.de/preise/ (Stand Oktober 2026): pro Zimmer und Nacht inkl. Frühstücksbuffet,
     Service, Kurtaxe (3,60 € pro Person) und MwSt. price = 2026, price27 = ab 2027.
     Kurzaufenthalt bis 2 Übernachtungen: + 3 € pro Person und Nacht (ab 2027: 5 €).
     Doppelzimmer mit Balkon als Einzelzimmer: 75,60 €, Juni–September 90,60 € (single / singleSummer).
     Haustier 4 € pro Tag (ab 2027: 8 €). Kinderermäßigung auf Anfrage. busy = Demo-Auslastung. */
  var ROOMS = [
    {
      id: 'dzb', price: 115.20, price27: 120.40, single: 75.60, singleSummer: 90.60, size: 20, minP: 1, maxP: 2, busy: 3,
      imgs: ['zimmer-balkon', 'balkon', 'zimmer-balkon-2', 'bad'],
      de: {
        name: 'Doppelzimmer mit Balkon',
        cap: '1–2 Personen',
        short: 'Zirbenholzbett, Dusche/WC, TV – und vom Balkon der Blick auf den See und die Berge.',
        text: 'Die Zimmer mit Balkon liegen zum See hin. Doppelbett aus Zirbenholz, Dusche/WC mit Föhn, TV, ' +
          'Schreibtisch und Kleiderschrank. Nichtraucherzimmer. Als Einzelzimmer buchbar: 75,60 € pro Nacht, ' +
          'von Juni bis September 90,60 €.',
        alts: ['Doppelzimmer mit Holzbett, Sitzecke und Balkontür', 'Blick vom Balkon über die Liegewiese auf die Berge', 'Doppelzimmer mit Holzbett und Fenster zum Garten', 'Bad mit Dusche und WC']
      },
      en: {
        name: 'Double room with balcony',
        cap: '1–2 guests',
        short: 'Stone-pine bed, shower/WC, TV – and from the balcony the view of the lake and the mountains.',
        text: 'The rooms with balcony face the lake. Double bed in stone pine, shower/WC with hairdryer, TV, ' +
          'desk and wardrobe. Non-smoking. Available for single use: €75.60 per night, €90.60 from June to September.',
        alts: ['Double room with wooden bed, seating corner and balcony door', 'View from the balcony across the lawn to the mountains', 'Double room with wooden bed and window to the garden', 'Bathroom with shower and WC']
      }
    },
    {
      id: 'dz', price: 112.20, price27: 115.40, size: 20, minP: 2, maxP: 2, busy: 2,
      imgs: ['zimmer-doppel', 'zimmer-doppel-2', 'bad'],
      de: {
        name: 'Doppelzimmer ohne Balkon',
        cap: '2 Personen',
        short: 'Dasselbe Zimmer im Landhausstil, ohne Balkon – mit Blick in den Garten oder auf die Berge.',
        text: 'Doppelbett aus Zirbenholz, Dusche/WC mit Föhn, TV, Schreibtisch und Kleiderschrank. Blick in den ' +
          'Garten oder auf die Berge. Nichtraucherzimmer. Für eine Person: Preis auf Anfrage.',
        alts: ['Doppelzimmer mit Holzbett, Tisch und zwei Stühlen', 'Doppelbett mit karierter Bettwäsche', 'Bad mit Dusche und WC']
      },
      en: {
        name: 'Double room without balcony',
        cap: '2 guests',
        short: 'The same country-style room without a balcony – looking onto the garden or the mountains.',
        text: 'Double bed in stone pine, shower/WC with hairdryer, TV, desk and wardrobe. Garden or mountain ' +
          'view. Non-smoking. For one guest: price on request.',
        alts: ['Double room with wooden bed, table and two chairs', 'Double bed with checked linen', 'Bathroom with shower and WC']
      }
    },
    {
      id: 'ez', price: 63.60, price27: 66.70, size: 16, minP: 1, maxP: 1, busy: 2,
      imgs: ['zimmer-einzel', 'zimmer-einzel-2', 'bad-2'],
      de: {
        name: 'Einzelzimmer',
        cap: '1 Person',
        short: 'Einzelbett, Dusche/WC, TV – 16 Quadratmeter für eine Person, Frühstück inklusive.',
        text: 'Einzelzimmer im Landhausstil mit Dusche/WC, Föhn, TV, Schreibtisch und Kleiderschrank. ' +
          'Nichtraucherzimmer.',
        alts: ['Einzelzimmer mit Holzbett und Fenster', 'Einzelzimmer mit Bett, Tisch und Stuhl', 'Bad mit Dusche']
      },
      en: {
        name: 'Single room',
        cap: '1 guest',
        short: 'Single bed, shower/WC, TV – 16 square metres for one guest, breakfast included.',
        text: 'Country-style single room with shower/WC, hairdryer, TV, desk and wardrobe. Non-smoking.',
        alts: ['Single room with wooden bed and window', 'Single room with bed, table and chair', 'Bathroom with shower']
      }
    }
  ];

  var UI = {
    de: {
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen',
      'bw.btn': 'Verfügbarkeit prüfen',
      adult1: 'Erwachsener', adultN: 'Erwachsene', kid1: 'Kind', kidN: 'Kinder', pet: 'Haustier',
      night1: 'Nacht', nightN: 'Nächte',
      'room.pn': 'pro Zimmer und Nacht, inkl. Frühstück', 'room.details': 'Details', 'room.book': 'Buchen',
      'room.bookThis': 'Dieses Zimmer buchen', 'room.equip': 'Ausstattung',
      'room.equipList': ['Dusche / WC', 'Föhn', 'TV', 'WLAN kostenlos', 'Schreibtisch', 'Nichtraucher'],
      'room.priceNote': 'inkl. Frühstücksbuffet, Service, Kurtaxe und MwSt. · bis 2 Nächte zzgl. 3 € pro Person und Nacht',
      'room.m2': 'm²', 'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
      'cal.reset': 'Auswahl zurücksetzen',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder',
      'bk.age': 'Alter Kind', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.pet': 'Mit Haustier (4 € pro Tag, ab 2027 8 €)',
      'bk.kidNote': 'Kinderermäßigung auf Anfrage – wir melden uns vor der Bestätigung.',
      'bk.rooms': 'Verfügbare Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie Preis und Verfügbarkeit.',
      'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl nicht buchbar',
      'bk.ask': 'Für 1 Person: Preis auf Anfrage',
      'bk.total': 'gesamt', 'bk.incl': 'Alle Preise inkl. Frühstücksbuffet, Service, Kurtaxe und MwSt.',
      'bk.short': 'Bis 2 Nächte berechnen wir 3 € pro Person und Nacht zusätzlich (ab 2027: 5 €).',
      'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie Zeitraum oder Gästezahl – ' +
        'oder rufen Sie uns an: +49 8651 96970.',
      'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
      'bk.price': 'Gesamtpreis', 'bk.pay': 'Zahlung vor Ort: bar, EC-Karte oder Kreditkarte.',
      'bk.calcRoom': 'Zimmer', 'bk.calcShort': 'Kurzaufenthalt', 'bk.calcPet': 'Haustier',
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
      adult1: 'adult', adultN: 'adults', kid1: 'child', kidN: 'children', pet: 'pet',
      night1: 'night', nightN: 'nights',
      'room.pn': 'per room and night, incl. breakfast', 'room.details': 'Details', 'room.book': 'Book',
      'room.bookThis': 'Book this room', 'room.equip': 'Amenities',
      'room.equipList': ['Shower / WC', 'Hairdryer', 'TV', 'Free Wi-Fi', 'Desk', 'Non-smoking'],
      'room.priceNote': 'incl. breakfast buffet, service, visitor’s tax and VAT · up to 2 nights plus €3 per person and night',
      'room.m2': 'm²', 'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'cal.hintIn': 'Please choose your arrival date.', 'cal.hintOut': 'Now choose your departure date.',
      'cal.reset': 'Reset selection',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children',
      'bk.age': 'Age of child', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.pet': 'With a pet (€4 per day, €8 from 2027)',
      'bk.kidNote': 'Discount for children on request – we will contact you before confirming.',
      'bk.rooms': 'Available rooms', 'bk.pickDates': 'Choose arrival and departure to see prices and availability.',
      'bk.select': 'Select', 'bk.busy': 'Booked for these dates', 'bk.small': 'Not bookable for this number of guests',
      'bk.ask': 'For 1 guest: price on request',
      'bk.total': 'total', 'bk.incl': 'All prices incl. breakfast buffet, service, visitor’s tax and VAT.',
      'bk.short': 'For stays of up to 2 nights we add €3 per person and night (€5 from 2027).',
      'bk.none': 'Unfortunately no room is available for this combination. Please change the dates or number of ' +
        'guests – or call us: +49 8651 96970.',
      'bk.back': 'Back', 'bk.summary': 'Your booking', 'bk.stay': 'Dates', 'bk.room': 'Room',
      'bk.price': 'Total price', 'bk.pay': 'Payment on site: cash, debit or credit card.',
      'bk.calcRoom': 'Room', 'bk.calcShort': 'Short stay', 'bk.calcPet': 'Pet',
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
    'nav.house': 'The house', 'nav.rooms': 'Rooms', 'nav.lake': 'The lake', 'nav.arrival': 'Getting here',
    'cta.book': 'Book',
    'hero.alt': 'The turquoise water of Lake Thumsee, trees on the shore, the mountains behind',
    'hero.line': 'Guesthouse on Lake Thumsee · Bad Reichenhall',
    'house.title': 'The house by the lake',
    'house.lead': 'Our family-run house stands just above Lake Thumsee behind Karlstein, barely four kilometres from the spa centre of Bad Reichenhall – quiet and sunny, with a view of the mountains and the lake.',
    'house.text': 'Twelve rooms on two floors, all with shower, WC and TV, some with a balcony facing the lake. Mornings start with the breakfast buffet and homemade jams; in the evening there is the house bar and two restaurants ten minutes’ walk away. Add lounges, a large sunbathing lawn and the horses on the riding ground in front of the house. Salzburg is 20 minutes by car; Berchtesgaden and Lake Chiemsee are just as close.',
    'house.n1': 'Location · Booking.com',
    'house.n2': 'out of 10 · 232 reviews on Booking.com, as of October 2026',
    'house.alt1': 'The Pension Oechsner with sunshade and garden tables on the lawn',
    'house.cap1': 'The house seen from the lawn – the forest behind, the lake in front of the door.',
    'house.alt2': 'Two horses grazing on the meadow by Lake Thumsee',
    'house.cap2': 'Our own horses by the lake – riding lessons and rides out.',
    'house.alt3': 'Breakfast room with wooden ceiling, red tablecloths and windows to the garden',
    'house.cap3': 'Breakfast from 7.30 to 10 am – buffet with homemade jams.',
    'q1.text': '“Beautiful lakeside location. Tranquil and peaceful. Lovely room with balcony overlooking Lake Thumsee.”',
    'q1.src': 'Teresa, United Kingdom · Booking.com, retrieved October 2026',
    'rooms.title': 'Rooms &amp; rates',
    'rooms.text': 'Rates per room and night, including breakfast buffet, service, visitor’s tax and VAT. Discount for children on request.',
    'prices.cap': 'The house’s price list',
    'prices.h1': 'per room and night', 'prices.h3': 'from 2027',
    'prices.r1': 'Single room', 'prices.r2': 'Double room without balcony', 'prices.r3': 'Double room with balcony',
    'prices.r4': 'Double room with balcony, single use<br><small>June to September €90.60</small>', 'prices.r4s': 'June to September €90.60',
    'prices.r5': 'Short stay up to 2 nights, per person and night', 'prices.r6': 'Pet, per day and animal',
    'times.t1': 'Arrival', 'times.d1': 'Rooms from 1 pm · after 6 pm please call',
    'times.t2': 'Breakfast', 'times.t3': 'Departure', 'times.d3': 'by 10.30 am',
    'times.t4': 'Payment', 'times.d4': 'cash, debit or credit card',
    'q2.text': '“Excellent stay in a lovely family B&B. The view from the balcony was perfect – what better than to wake up to a view of the mountains and horses playing in their paddock!”',
    'q2.src': 'Linda, Austria · Booking.com, retrieved October 2026',
    'see.alt1': 'Lake Thumsee in its valley: mountains, forest, the lake and the meadow in front',
    'see.title': 'Lake Thumsee',
    'see.lead': 'The lake lies in the valley behind Karlstein, at the centre of the triangle Salzburg – Berchtesgaden – Chiemsee. Swimming, fishing and boating on the lake; hiking, cycling and mountain biking start at the front door, through nature reserves and past meadows with wild orchids.',
    'see.text': 'Golf and rafting are nearby, the Rupertus spa with its pools and saunas a few minutes away by bus or car. In winter the ski areas are half an hour away – tobogganing, cross-country skiing and ski lessons on request. The town bus is free throughout Bad Reichenhall; the stop is 300 metres from the house.',
    'dist.t1': 'Bus stop', 'dist.t2': 'Bad Reichenhall, spa centre', 'dist.t3': 'Rupertus spa',
    'dist.t4': 'Bad Reichenhall station', 'dist.t5': 'Salzburg', 'dist.d5': '20 minutes by car', 'dist.t6': 'Salzburg airport',
    'see.alt2': 'The large sunbathing lawn with a view of the mountains', 'see.cap2': 'The large lawn in front of the house.',
    'see.alt3': 'Lake Thumsee under trees on the shore, the wooded mountains behind', 'see.cap3': 'Lake Thumsee: swimming, fishing and boating – in winter the ski areas are half an hour away.',
    'q3.text': '“Staff were exceptionally polite and even prepared breakfast an hour early so I could leave on time.”',
    'q3.src': 'Abbas, Czech Republic · Booking.com, retrieved October 2026',
    'arr.title': 'Getting here',
    'arr.1t': 'By car from Munich',
    'arr.1': 'A8 to the Piding exit, then the B20/B21 towards Lofer – Berchtesgaden, exit Inzell – Karlstein. Straight on at the traffic lights, right before the lake; after 400 metres the first house on the left. Alternatively A8 exit Siegsdorf towards Bad Reichenhall, left at the end of the lake. Parking at the house is free.',
    'arr.2t': 'By train and bus',
    'arr.2': 'To Bad Reichenhall station (5 km), then the town bus to the stop at Lake Thumsee, 300 metres from the house. Please check the last bus departure. Salzburg airport: 18 km.',
    'arr.3t': 'Arrival',
    'arr.3': 'Rooms are ready from 1 pm. If you arrive after 6 pm, please call ahead: +49 8651 96970.',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Pension Oechsner',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'bk.title': 'Book', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
  };

  window.OECHSNER = { ROOMS: ROOMS, UI: UI, EN: EN };
})();
