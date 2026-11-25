/* Kurhotel Jakob — Inhalte: Zimmer und Preise, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Preise laut kurhotel-jakob.de/unterkunft/ und /unterkunft/ferienwohnung.html (abgerufen 25.11.2026):
     pro Person und Nacht inkl. Frühstücksbuffet, zzgl. Kurtaxe 2,50 €/Tag; Ferienwohnung pro Wohnung
     für 2 Personen/Nacht. from = Vorsaison («ab»), high = Hauptsaison (1.5.–15.10. und 20.12.–10.1.).
     unit = Preis gilt pro Wohneinheit (nicht pro Person). dog = Hunde erlaubt (18 €/Tag laut AGB);
     in Ferienwohnung und Familienzimmer laut Website nicht gestattet.
     cap = Personen höchstens. busy = Demo-Auslastung (1 locker … 4 oft belegt). */
  var ROOMS = [
    {
      id: 'dz-balkon', cap: 2, busy: 3, from: 55.25, high: 88.50, dog: true,
      imgs: ['dz-balkon-1', 'dz-balkon-2', 'dz-balkon-3', 'dz-balkon-4'],
      de: {
        name: 'Doppelzimmer mit Balkon', short: '28 m², Doppelbett 180×200 cm, Dusche/WC, Balkon.',
        cap: 'für 2 Personen',
        text: '28 m² mit Balkon: Doppelbett 180×200 cm mit getrennten Matratzen, teilweise mit offenem Fußende, ' +
          'Sitzecke und Schreibtisch, Dusche/WC mit Kosmetikartikeln und Fön, Flachbildfernseher, blickdichter Vorhang.',
        equip: ['Balkon', 'Doppelbett 180×200 cm, getrennte Matratzen', 'Dusche/WC, Fön', 'Sitzecke und Schreibtisch', 'Flachbildfernseher', 'WLAN kostenfrei'],
        alts: ['Doppelzimmer mit Holzbett, blauer Wand und Bergbild', 'Doppelbett aus Holz mit weißer Bettwäsche',
          'Doppelzimmer mit Balkontür und Schreibtisch', 'Sitzecke mit Tisch und zwei Sesseln am Fenster']
      },
      en: {
        name: 'Double room with balcony', short: '28 m², double bed 180×200 cm, shower/WC, balcony.',
        cap: 'for 2 guests',
        text: '28 m² with balcony: double bed 180×200 cm with separate mattresses, some with an open foot end, ' +
          'seating corner and desk, shower/WC with toiletries and hairdryer, flat-screen TV, blackout curtain.',
        equip: ['Balcony', 'Double bed 180×200 cm, separate mattresses', 'Shower/WC, hairdryer', 'Seating corner and desk', 'Flat-screen TV', 'Free Wi-Fi'],
        alts: ['Double room with wooden bed, blue wall and mountain picture', 'Wooden double bed with white bed linen',
          'Double room with balcony door and desk', 'Seating corner with table and two armchairs by the window']
      }
    },
    {
      id: 'dz', cap: 2, busy: 2, from: 49.50, high: 80.75, dog: true,
      imgs: ['dz-1', 'dz-2'],
      de: {
        name: 'Doppelzimmer ohne Balkon', short: '20 m², Doppelbett 180×190 cm, Dusche/WC.',
        cap: 'für 2 Personen',
        text: '20 m²: Doppelbett 180×190 cm mit offenem Fußende und getrennten Matratzen, Sitzecke und Schreibtisch, ' +
          'Dusche/WC mit Fön und Shampoo, Flachbildfernseher, blickdichter Vorhang.',
        equip: ['Doppelbett 180×190 cm, getrennte Matratzen', 'Dusche/WC, Fön, Shampoo', 'Sitzecke und Schreibtisch', 'Flachbildfernseher', 'WLAN kostenfrei'],
        alts: ['Doppelzimmer mit hellgrünen Wänden und Doppelbett', 'Dusche mit Glaswand und Waschtisch aus Holz']
      },
      en: {
        name: 'Double room without balcony', short: '20 m², double bed 180×190 cm, shower/WC.',
        cap: 'for 2 guests',
        text: '20 m²: double bed 180×190 cm with an open foot end and separate mattresses, seating corner and desk, ' +
          'shower/WC with hairdryer and shampoo, flat-screen TV, blackout curtain.',
        equip: ['Double bed 180×190 cm, separate mattresses', 'Shower/WC, hairdryer, shampoo', 'Seating corner and desk', 'Flat-screen TV', 'Free Wi-Fi'],
        alts: ['Double room with light green walls and double bed', 'Shower with glass wall and wooden washstand']
      }
    },
    {
      id: 'ez', cap: 1, busy: 3, from: 90.00, high: 119.50, dog: true,
      imgs: ['ez-1', 'ez-2', 'ez-3', 'ez-4'],
      de: {
        name: 'Einzelzimmer mit Balkon', short: 'Einzelbett 100×200 cm, Dusche/WC, Balkon, Nichtraucher.',
        cap: 'für 1 Person',
        text: 'Im 1. Obergeschoss: Einzelbett 100×200 cm mit offenem Fußende, Sitzecke und Schreibtisch, Dusche/WC ' +
          'mit Kosmetikartikeln und Fön, Flachbild-TV und Durchwahltelefon, blickdichter Vorhang. Nichtraucherzimmer.',
        equip: ['Balkon', 'Einzelbett 100×200 cm', 'Dusche/WC, Fön', 'Sitzecke und Schreibtisch', 'Flachbild-TV, Telefon', 'WLAN kostenfrei'],
        alts: ['Einzelzimmer mit Einzelbett und hellblauen Wänden', 'Blick vom Einzelzimmer über den Balkon auf Füssen',
          'Waschtisch mit weißem Aufsatzbecken im Badezimmer', 'Badezimmer mit Dusche, WC und Waschbecken']
      },
      en: {
        name: 'Single room with balcony', short: 'Single bed 100×200 cm, shower/WC, balcony, non-smoking.',
        cap: 'for 1 guest',
        text: 'On the first floor: single bed 100×200 cm with an open foot end, seating corner and desk, shower/WC ' +
          'with toiletries and hairdryer, flat-screen TV and direct-dial phone, blackout curtain. Non-smoking room.',
        equip: ['Balcony', 'Single bed 100×200 cm', 'Shower/WC, hairdryer', 'Seating corner and desk', 'Flat-screen TV, phone', 'Free Wi-Fi'],
        alts: ['Single room with single bed and light blue walls', 'View from the single room across the balcony over Füssen',
          'Washstand with white basin in the bathroom', 'Bathroom with shower, WC and washbasin']
      }
    },
    {
      id: 'familie', cap: 4, busy: 2, from: 82.50, high: 105.50, dog: false,
      imgs: ['fam-1', 'fam-2', 'fam-3', 'fam-4'],
      de: {
        name: 'Familienzimmer', short: 'Zwei Doppelzimmer nebeneinander, großer Balkon, gemeinsames Bad.',
        cap: 'für 2 bis 4 Personen',
        text: 'Eine abgeschlossene Wohneinheit mit zwei Doppelzimmern nebeneinander – je Zimmer ein Doppelbett 180×200 cm ' +
          'mit offenem Fußende und ein Flachbildfernseher, jedes Zimmer mit eigener Tür. Dazu ein großer Balkon und ein ' +
          'gemeinsames Badezimmer mit Dusche, WC und Waschbecken. Haustiere sind in dieser Wohneinheit nicht gestattet.',
        equip: ['Zwei Doppelzimmer mit eigener Tür', 'Großer Balkon', 'Gemeinsames Bad mit Dusche/WC', 'Je Zimmer ein Flachbildfernseher', 'Blickdichte Vorhänge', 'WLAN kostenfrei'],
        alts: ['Familienzimmer mit Doppelbett, karierten Kopfkissen und gelbem Sessel', 'Doppelbett mit Holz-Truhe am Fußende',
          'Doppelbett mit karierten Kopfteilen und weißer Bettwäsche', 'Zwei Zimmer des Familienzimmers mit eigenen Türen']
      },
      en: {
        name: 'Family room', short: 'Two adjoining double rooms, large balcony, shared bathroom.',
        cap: 'for 2 to 4 guests',
        text: 'A self-contained unit with two adjoining double rooms – each with a double bed 180×200 cm with an open ' +
          'foot end and a flat-screen TV, each room with its own door. Plus a large balcony and a shared bathroom with ' +
          'shower, WC and washbasin. Pets are not allowed in this unit.',
        equip: ['Two double rooms, each with its own door', 'Large balcony', 'Shared bathroom with shower/WC', 'Flat-screen TV in each room', 'Blackout curtains', 'Free Wi-Fi'],
        alts: ['Family room with double bed, checked pillows and yellow armchair', 'Double bed with a wooden chest at the foot end',
          'Double bed with checked headboards and white bed linen', 'Two rooms of the family room with their own doors']
      }
    },
    {
      id: 'fewo', cap: 4, busy: 3, from: 160.00, high: 190.00, dog: false, unit: true,
      imgs: ['fewo-1', 'fewo-2', 'fewo-3', 'fewo-4', 'fewo-5'],
      de: {
        name: 'Ferienwohnung', short: '100 m², zwei Schlafzimmer, Küche, Bad mit Wanne, großer Balkon.',
        cap: 'für 2 bis 4 Personen',
        text: 'Frisch renovierte 100-m²-Wohnung mit zwei Schlafzimmern (Doppelbetten mit getrennten Matratzen), Bad mit ' +
          'Dusche, Wanne und WC und großem Balkon. Die Küche ist voll ausgestattet: Induktionsherd, Spülmaschine, ' +
          'Kühlschrank, Kaffeemaschine, Wasserkocher, Toaster und Geschirr für bis zu 4 Personen. Der Preis gilt für eine ' +
          'Schlafzimmereinheit; ab der dritten Person öffnen wir das zweite Schlafzimmer gegen Aufpreis. ' +
          'Haustiere sind in dieser Wohneinheit nicht gestattet; Preis ohne Frühstück.',
        equip: ['Zwei Schlafzimmer mit Doppelbetten', 'Voll ausgestattete Küche', 'Bad mit Dusche, Wanne und WC', 'Großer Balkon mit Aussicht', 'Flachbildfernseher', 'WLAN kostenfrei'],
        alts: ['Wohnbereich der Ferienwohnung mit Blumen auf dem Tisch', 'Küche der Ferienwohnung mit Kochinsel',
          'Wohnbereich mit Sofa unter der Holzdecke und Balkonfenstern', 'Schlafzimmer der Ferienwohnung mit Doppelbett', 'Sofa mit Tulpen auf dem Holztisch']
      },
      en: {
        name: 'Holiday apartment', short: '100 m², two bedrooms, kitchen, bath with tub, large balcony.',
        cap: 'for 2 to 4 guests',
        text: 'Freshly renovated 100 m² apartment with two bedrooms (double beds with separate mattresses), bathroom with ' +
          'shower, tub and WC, and a large balcony. The kitchen is fully equipped: induction hob, dishwasher, fridge, ' +
          'coffee machine, kettle, toaster and tableware for up to 4 people. The price covers one bedroom unit; from the ' +
          'third guest we open the second bedroom for a surcharge. Pets are not allowed in this unit; price without breakfast.',
        equip: ['Two bedrooms with double beds', 'Fully equipped kitchen', 'Bathroom with shower, tub and WC', 'Large balcony with a view', 'Flat-screen TV', 'Free Wi-Fi'],
        alts: ['Living area of the apartment with flowers on the table', 'Kitchen of the apartment with cooking island',
          'Living area with sofa under the wooden ceiling and balcony windows', 'Bedroom of the apartment with double bed', 'Sofa with tulips on the wooden table']
      }
    }
  ];

  var UI = {
    de: {
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum',
      'bw.btn': 'Verfügbarkeit prüfen',
      adult1: 'Person', adultN: 'Personen', night1: 'Nacht', nightN: 'Nächte',
      'room.from': 'ab', 'room.pn': 'pro Person und Nacht', 'room.pn2': 'für 2 Personen und Nacht',
      'room.details': 'Details und Fotos', 'room.book': 'Buchen',
      'room.bookThis': 'Dieses Zimmer buchen', 'room.equip': 'Ausstattung',
      'room.priceNote': 'mit Frühstücksbuffet, zzgl. Kurtaxe 2,50 € pro Person und Tag · Vorsaison; Hauptsaison 1.5.–15.10. und 20.12.–10.1.',
      'room.priceNoteUnit': 'pro Wohnung ohne Frühstück, zzgl. Kurtaxe 2,50 € pro Person und Tag · Vorsaison; Hauptsaison 1.5.–15.10. und 20.12.–10.1.',
      'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
      'cal.reset': 'Auswahl zurücksetzen',
      'bk.guests': 'Gäste', 'bk.adults': 'Personen', 'bk.dog': 'Hund (18 € pro Tag, auf Voranmeldung)',
      'bk.kids': 'Mit Kindern? Preise für Kinder auf Anfrage: +49 8362 9132-0',
      'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Zimmer für Ihren Zeitraum', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie Preis und Verfügbarkeit.',
      'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl zu klein',
      'bk.noDog': 'Haustiere hier nicht gestattet',
      'bk.total': 'gesamt', 'bk.incl': 'Zimmerpreise pro Person und Nacht mit Frühstücksbuffet, Ferienwohnung pro Wohnung ohne Frühstück; Kurtaxe 2,50 € pro Person und Tag ist eingerechnet',
      'bk.direct': 'Bestpreis bei direkter Buchung.',
      'bk.est': 'Bei Belegung mit mehr als 2 Personen sind die Preise ein Richtwert dieser Vorschau – verbindlich nennt sie Ihnen das Haus.',
      'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie den Zeitraum – ' +
        'oder rufen Sie uns an: +49 8362 9132-0.',
      'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
      'bk.price': 'Gesamtpreis', 'bk.pay': 'Zahlung bei Anreise, bar oder mit EC-Karte.',
      'bk.cancel': 'Kostenlose Stornierung bis 21 Tage vor Anreise.',
      'bk.nights': 'Übernachtung', 'bk.tax': 'Kurtaxe', 'bk.dogLine': 'Hund',
      'bk.perNight': '{n} · {a}', 'bk.perDay': '2,50 € pro Person und Tag', 'bk.perDogDay': '18 € pro Tag',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail-Adresse', 'f.phone': 'Telefon',
      'f.arrival': 'Voraussichtliche Ankunftszeit (Anreise 12–18 Uhr)',
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
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Date',
      'bw.btn': 'Check availability',
      adult1: 'guest', adultN: 'guests', night1: 'night', nightN: 'nights',
      'room.from': 'from', 'room.pn': 'per person and night', 'room.pn2': 'for 2 guests per night',
      'room.details': 'Details and photos', 'room.book': 'Book',
      'room.bookThis': 'Book this room', 'room.equip': 'Amenities',
      'room.priceNote': 'with breakfast buffet, plus visitor’s tax of €2.50 per person/day · low season; high season 1 May–15 Oct and 20 Dec–10 Jan',
      'room.priceNoteUnit': 'per apartment without breakfast, plus visitor’s tax of €2.50 per person/day · low season; high season 1 May–15 Oct and 20 Dec–10 Jan',
      'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'cal.hintIn': 'Please choose your arrival date.', 'cal.hintOut': 'Now choose your departure date.',
      'cal.reset': 'Reset selection',
      'bk.guests': 'Guests', 'bk.adults': 'Guests', 'bk.dog': 'Dog (€18 per day, by prior arrangement)',
      'bk.kids': 'Travelling with children? Children’s rates on request: +49 8362 9132-0',
      'bk.less': 'fewer', 'bk.more': 'more',
      'bk.rooms': 'Rooms for your dates', 'bk.pickDates': 'Choose arrival and departure to see prices and availability.',
      'bk.select': 'Select', 'bk.busy': 'Booked for these dates', 'bk.small': 'Too small for this number of guests',
      'bk.noDog': 'Pets not allowed in this unit',
      'bk.total': 'total', 'bk.incl': 'Room rates per person and night with breakfast buffet, apartment per unit without breakfast; visitor’s tax of €2.50 per person/day is included',
      'bk.direct': 'Best price when booking direct.',
      'bk.est': 'For more than 2 guests the prices are an estimate of this preview – the house will quote the binding rate.',
      'bk.none': 'Unfortunately no room is available for this combination. Please change the dates – ' +
        'or call us: +49 8362 9132-0.',
      'bk.back': 'Back', 'bk.summary': 'Your booking', 'bk.stay': 'Dates', 'bk.room': 'Room',
      'bk.price': 'Total price', 'bk.pay': 'Payment on arrival, cash or EC card.',
      'bk.cancel': 'Free cancellation up to 21 days before arrival.',
      'bk.nights': 'Accommodation', 'bk.tax': 'Visitor’s tax', 'bk.dogLine': 'Dog',
      'bk.perNight': '{n} · {a}', 'bk.perDay': '€2.50 per person and day', 'bk.perDogDay': '€18 per day',
      'f.name': 'First and last name', 'f.email': 'Email address', 'f.phone': 'Phone',
      'f.arrival': 'Expected arrival time (check-in 12–6 pm)',
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
    'nav.house': 'The house', 'nav.rooms': 'Rooms', 'nav.direct': 'Book direct', 'nav.wellness': 'Wellness',
    'nav.offers': 'Packages', 'nav.area': 'Around us', 'nav.arrival': 'Getting here',
    'cta.book': 'Book', 'brand.sub': 'Spa hotel garni · Füssen-Bad Faulenbach',
    'hero.title': 'Arrive in the Valley of the Senses.',
    'hero.line': 'Spa and holiday hotel garni · Füssen-Bad Faulenbach · Allgäu',
    'hero.sub': 'Run by the Jakob family in its third generation: rooms with balcony, a holiday apartment, breakfast ' +
      'buffet, physiotherapy and sauna in the house – quietly located in the Faulenbach valley.',
    'haus.alt': 'Kurhotel Jakob: house with balconies, parasols and garden in the green Faulenbach valley',
    'haus.cap': 'The house on Schwärzerweg, in the middle of the quiet Faulenbach valley.',
    'haus.title': 'Third generation in Füssen',
    'haus.text': 'A warm welcome from the Jakob family. Our three-star hotel garni, run in its third generation, lies in ' +
      'the heart of Füssen-Bad Faulenbach, the “Valley of the Senses”. Away from the bustle of the town and the royal ' +
      'castles you sleep in tastefully furnished rooms in snow-white damask bed linen – and in the morning we spoil you ' +
      'in our elegant breakfast room with a rich breakfast buffet and freshly brewed filter coffee.',
    'haus.f1': 'Check-in', 'haus.f1v': '12 noon to 6 pm',
    'haus.f2': 'Accommodation', 'haus.f2v': 'hotel rooms &amp; holiday apartment',
    'haus.f3': 'Breakfast', 'haus.f3v': 'rich buffet',
    'haus.f4': 'Dogs', 'haus.f4v': 'by prior arrangement, €18 per day',
    'damast.alt': 'Hotel room with two beds and snow-white damask bed linen',
    'kneipp.title': 'A Kneipp spa town since 1938',
    'kneipp.text': 'Bad Faulenbach owes its name to the sulphur springs in the valley and has been a recognised Kneipp ' +
      'spa resort since 1938. The Kneipp meadow with drinking fountain and herb garden, the water-treading basin, the ' +
      'natural Kneipp pool at the Mittersee and the Kneipp basin at the Alatsee bear witness to this to this day. The ' +
      'valley is largely car-free – right outside the front door the Faulenbach lakes line up all the way to the Alatsee.',
    'kneipp.alt1': 'Green mountain lake in the Faulenbach valley, surrounded by forest',
    'kneipp.alt2': 'View across a lake towards the Allgäu mountains near Füssen',
    'rooms.title': 'Rooms and rates',
    'rooms.lead': 'Four room categories and one holiday apartment. Rates per person and night with breakfast buffet, plus ' +
      'visitor’s tax of €2.50 per day. Rates vary between low and high season (1 May – 15 October and 20 December – ' +
      '10 January) – the figures shown are the lowest.',
    'rooms.dzbAlt': 'Double room with wooden bed, blue wall and mountain picture',
    'rooms.dzAlt': 'Double room with light green walls and double bed',
    'rooms.ezAlt': 'Single room with single bed and light blue walls',
    'rooms.famAlt': 'Family room with double bed, checked pillows and yellow armchair',
    'rooms.fewoAlt': 'Living area of the holiday apartment with flowers on the table',
    'rooms.dzb': 'Double room with balcony', 'rooms.dz': 'Double room without balcony',
    'rooms.ez': 'Single room with balcony', 'rooms.fam': 'Family room', 'rooms.fewo': 'Holiday apartment',
    'rooms.dzbText': '28 m², double bed 180×200 cm with separate mattresses, seating corner, desk, shower/WC.',
    'rooms.dzText': '20 m², double bed 180×190 cm with separate mattresses, seating corner, desk.',
    'rooms.ezText': 'On the first floor, single bed 100×200 cm, seating corner, desk, shower/WC, non-smoking.',
    'rooms.famText': 'Two adjoining double rooms with a large balcony and shared bathroom – each room with its own door.',
    'rooms.fewoText': '100 m², freshly renovated: two bedrooms, kitchen, bathroom with tub and a large balcony – for 2 to ' +
      '4 guests; from the third guest the second bedroom is opened (surcharge).',
    'rooms.pn': 'per person/night', 'rooms.pn2': 'for 2 guests/night', 'rooms.from': 'from',
    'rooms.details': 'Details and photos', 'rooms.book': 'Book',
    'rooms.equipTitle': 'In every room',
    'rooms.e1': 'Shower/WC with toiletries and hairdryer', 'rooms.e2': 'Flat-screen TV', 'rooms.e3': 'Telephone',
    'rooms.e4': 'Blackout curtains', 'rooms.e5': 'Snow-white damask bed linen', 'rooms.e6': 'Free Wi-Fi',
    'rooms.e7': 'Room cleaning every two days', 'rooms.e8': 'Non-smoking',
    'direct.title': 'Enquiring direct pays off',
    'direct.text': 'Enquire directly with the house and get the best price for your holiday – on clear terms:',
    'direct.l1': 'Best price', 'direct.l1v': 'when booking direct',
    'direct.l2': 'Payment', 'direct.l2v': 'cash or EC card on arrival',
    'direct.l3': 'Cancellation', 'direct.l3v': 'free up to 21 days before arrival',
    'direct.l4': 'Check-in', 'direct.l4v': '12 noon to 6 pm',
    'direct.l5': 'Dogs', 'direct.l5v': 'by prior arrangement, €18 per day (not in the apartment and family room)',
    'direct.note': 'This preview uses the published “from” and high-season rates; the house will quote binding prices.',
    'direct.cta': 'Check availability',
    'well.title': 'Wellness and physio­therapy in the house',
    'well.text': 'Rest and renewal for the whole person: our own physiotherapy practice in the house is open Monday to ' +
      'Friday from 8 to 11.30 am, otherwise by appointment. Treatments include Kneipp, moor mud, physical, movement and ' +
      'relaxation therapy – from baths and massages to lymphatic drainage. Our sauna is open daily from 2 to 7 pm, with ' +
      'reservation and exclusively for one room at a time.',
    'well.f1': 'Physiotherapy', 'well.f1v': 'Mon–Fri 8–11.30 am',
    'well.f2': 'Baths', 'well.f2v': '€35 to €55',
    'well.f3': 'Massages', 'well.f3v': '€35 to €45',
    'well.f4': 'Sauna', 'well.f4v': '€15 per room, 1.5 hours',
    'well.alt1': 'The house’s own sauna with wooden benches and towels',
    'well.alt2': 'Treatment room of the physiotherapy practice at Kurhotel Jakob',
    'well.alt3': 'Roses in the garden in front of Kurhotel Jakob',
    'off.title': 'Packages of the house',
    'off.lead': 'Four arrangements with accommodation, breakfast buffet and treatments. Treatments take place Monday to ' +
      'Friday in the morning; prices per person in a double room, plus visitor’s tax. Interested? Just send us an enquiry.',
    'off.o1': '<b>Fit instead of back pain</b> – 7 nights, 3× hay sack, 3× massage, 3× Kneipp affusion',
    'off.o1v': 'from €698',
    'off.o2': '<b>Let your soul unwind</b> – 7 nights, 3× relaxation bath, 3× massage, 3× Kneipp affusion',
    'off.o2v': 'from €741',
    'off.o3': '<b>Moor time-out</b> – 7 nights, 3× moor mud bath, 3× loam wrap, 3× massage',
    'off.o3v': 'from €836',
    'off.o4': '<b>Pampering weekend</b> – 2 nights, 1× relaxation bath and massage each',
    'off.o4v': 'from €457 for 2 guests',
    'area.title': 'Lakes, old town and royal castles',
    'area.text': 'The Mittersee, Obersee and Alatsee, the hiking trails and Füssen’s old town can all be reached from us ' +
      'on foot. Mittersee and Obersee have natural swimming areas, and a barrier-free circular path leads around the ' +
      'Mittersee. The house lies at the end of the Lebensspur Lech trail – the ideal base for hiking, cycling, mountain ' +
      'biking, swimming in natural lakes and tennis.',
    'area.alt': 'Neuschwanstein Castle in the evening light above the forested mountains',
    'area.d1': 'Mittersee with park and natural swimming area', 'area.d1v': 'on foot from the hotel',
    'area.d2': 'Obersee with natural swimming area', 'area.d2v': 'on foot from the hotel',
    'area.d3': 'Alatsee at the top of the valley', 'area.d3v': 'footpath from the hotel, past Mittersee and Obersee',
    'area.d4': 'Füssen old town, St Mang abbey, High Castle', 'area.d4v': 'within walking distance',
    'area.d5': 'Lechfall with a view into the Lech gorge', 'area.d5v': 'within walking distance',
    'area.d6': 'Neuschwanstein and Hohenschwangau castles', 'area.d6v': 'close by, also on foot over the Kalvarienberg',
    'area.d7': 'Hikes, e.g. Lebensspur Lech', 'area.d7v': 'right from the hotel',
    'see.alt': 'Calm lake with a view of Füssen and the Allgäu mountains',
    'arr.title': 'Getting here',
    'arr.1t': 'By car',
    'arr.1': 'To Füssen and into the Faulenbach valley. All of Bad Faulenbach is a traffic-calmed zone – walking pace ' +
      'applies. From the entrance to the valley follow the hotel guidance system; parking is close to the house.',
    'arr.2t': 'By train',
    'arr.2': 'Füssen is the terminus of the line via Buchloe. From the station you reach us by taxi or on foot through ' +
      'the old town and the Faulenbach valley.',
    'arr.3t': 'Arrival and departure',
    'arr.3': 'Check-in between 12 noon and 6 pm. You settle your stay on arrival in cash or by EC card. Free ' +
      'cancellation up to 21 days before arrival.',
    'arr.4t': 'Questions?',
    'arr.4': 'Call us on +49 8362 9132-0 or write to info@kurhotel-jakob.de – we will be happy to advise you on rooms, ' +
      'packages and treatments.',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the ' +
      'OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Kurhotel Jakob / Michael Helmer',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'bk.title': 'Book a room', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
  };

  window.JAKOB = { ROOMS: ROOMS, UI: UI, EN: EN };
})();
