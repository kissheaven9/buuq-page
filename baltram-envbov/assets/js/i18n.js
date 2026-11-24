/* Gästehaus Baltram — Inhalte: Zimmerdaten, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Preise laut Preisliste baltram.de: pro Person und Nacht inkl. Frühstück, ab 4 Nächten.
     1–3 Nächte: + 5 € pro Person und Nacht.
     Belegung: maxAdults = Erwachsene höchstens; extra = Aufbettungs-Einheiten über 2 Personen hinaus
     (Erwachsener = 2, Kind = 1); total = feste Obergrenze (Familienzimmer). busy = Demo-Auslastung. */
  var ROOMS = [
    {
      id: 'a', price: 57, size: '20–24', maxAdults: 3, extra: 2, busy: 1,
      imgs: ['zimmer-a-1', 'zimmer-a-2', 'zimmer-a-3', 'zimmer-a-4'],
      de: {
        name: 'Doppelzimmer Kategorie A',
        short: 'Süd- oder Ostlage mit Bergblick, im ersten oder zweiten Stock des Haupthauses.',
        cap: 'bis 3 Personen',
        text: 'Unsere größeren Doppelzimmer im Haupthaus liegen nach Süden oder Osten und blicken auf die Berge. ' +
          'Jedes ist individuell eingerichtet; in einigen ist eine Aufbettung für einen Erwachsenen oder ' +
          'zwei Kinder möglich.',
        alts: ['Doppelzimmer mit Holzbett, Natursteinwand und rotem Sofa', 'Doppelbett vor Natursteinwand mit Balkontür',
          'Doppelzimmer mit Sitzecke und Fenster zum Balkon', 'Bad mit Dusche und WC']
      },
      en: {
        name: 'Double room, category A',
        short: 'Facing south or east with mountain views, on the first or second floor of the main house.',
        cap: 'up to 3 guests',
        text: 'Our larger double rooms in the main house face south or east and look out onto the mountains. ' +
          'Each one is furnished individually; some can take an extra bed for one adult or two children.',
        alts: ['Double room with wooden bed, stone wall and red sofa', 'Double bed in front of a stone wall with balcony door',
          'Double room with seating corner and balcony window', 'Bathroom with shower and toilet']
      }
    },
    {
      id: 'b', price: 52, size: '16–20', maxAdults: 2, extra: 0, busy: 1,
      imgs: ['zimmer-b-1', 'zimmer-b-2', 'zimmer-b-3', 'zimmer-b-4'],
      de: {
        name: 'Doppelzimmer Kategorie B',
        short: 'Ost-, West- oder Nordlage im ersten Stock, teilweise mit Bergblick.',
        cap: 'bis 2 Personen',
        text: 'Die gemütlichen Doppelzimmer im ersten Stock des Haupthauses liegen nach Osten, Westen oder Norden, ' +
          'teilweise mit Bergblick. Unser günstigster Preis – mit Balkon und Frühstücksbuffet.',
        alts: ['Doppelzimmer mit roter Sitzbank und zwei Fenstern', 'Doppelzimmer mit großem Bauernschrank',
          'Zimmer mit Tisch am Fenster', 'Bad mit Dusche und WC']
      },
      en: {
        name: 'Double room, category B',
        short: 'Facing east, west or north on the first floor, some with mountain views.',
        cap: 'up to 2 guests',
        text: 'The cosy double rooms on the first floor of the main house face east, west or north, ' +
          'some with mountain views. Our best rate – balcony and breakfast buffet included.',
        alts: ['Double room with red bench and two windows', 'Double room with large farmhouse wardrobe',
          'Room with table by the window', 'Bathroom with shower and toilet']
      }
    },
    {
      id: 'n', price: 62, size: '30', maxAdults: 2, extra: 2, busy: 2,
      imgs: ['neben-1', 'neben-2', 'neben-3'],
      de: {
        name: 'Doppelzimmer im Nebenhaus',
        short: 'Mit Empore und Schlafcouch – ein eigenes kleines Reich für ein bis zwei Kinder.',
        cap: '2 Erwachsene + 2 Kinder',
        text: 'Die beiden Zimmer im Nebengebäude über den Hof haben eine Empore mit Schlafcouch (1,40 × 1,90 m), ' +
          'auf der ein bis zwei Kinder ihr eigenes kleines Reich haben. Nichtraucherzimmer in Süd- oder ' +
          'Nordlage mit Bergblick.',
        alts: ['Zimmer mit Holztreppe zur Empore', 'Doppelbett unter Holzbalkendecke', 'Bad mit Dusche und WC']
      },
      en: {
        name: 'Double room in the annexe',
        short: 'With a gallery and sofa bed – a little realm of their own for one or two children.',
        cap: '2 adults + 2 children',
        text: 'The two rooms in the annexe across the courtyard have a gallery with a sofa bed (1.40 × 1.90 m) ' +
          'where one or two children have their own little realm. Non-smoking rooms facing south or north ' +
          'with mountain views.',
        alts: ['Room with wooden stairs to the gallery', 'Double bed under a beamed ceiling', 'Bathroom with shower and toilet']
      }
    },
    {
      id: 'f', price: 70, size: '40', maxAdults: 5, total: 6, busy: 3,
      imgs: ['familie-1', 'familie-2', 'familie-3', 'familie-4'],
      de: {
        name: 'Zwei-Raum-Familienzimmer',
        short: 'Zwei getrennte Schlafräume mit Verbindungstür, Ostlage mit Bergblick.',
        cap: 'bis 5 Personen',
        text: 'Zwei Schlafräume mit Verbindungstür im Nebengebäude: ein Doppelbett in dem einen, ein Doppel- und ' +
          'ein Einzelbett in dem anderen. Platz für bis zu fünf Personen, ein Zustellbett ist zusätzlich möglich. ' +
          'Nichtraucherzimmer.',
        alts: ['Essecke mit roter Eckbank und Blick ins Schlafzimmer', 'Schlafraum mit Doppelbett unter Holzbalken',
          'Schlafraum mit Doppel- und Einzelbett', 'Bad mit Dusche und WC']
      },
      en: {
        name: 'Two-room family room',
        short: 'Two separate bedrooms with a connecting door, facing east with mountain views.',
        cap: 'up to 5 guests',
        text: 'Two bedrooms with a connecting door in the annexe: a double bed in one, a double and a single bed ' +
          'in the other. Space for up to five guests, plus an extra bed on request. Non-smoking room.',
        alts: ['Dining corner with red bench and view into the bedroom', 'Bedroom with double bed under wooden beams',
          'Bedroom with double and single bed', 'Bathroom with shower and toilet']
      }
    }
  ];

  var UI = {
    de: {
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen',
      'bw.btn': 'Verfügbarkeit prüfen',
      adult1: 'Erwachsener', adultN: 'Erwachsene', kid1: 'Kind', kidN: 'Kinder',
      night1: 'Nacht', nightN: 'Nächte',
      'room.from': 'ab', 'room.pp': 'pro Person / Nacht', 'room.details': 'Details', 'room.book': 'Buchen',
      'room.bookThis': 'Dieses Zimmer buchen', 'room.equip': 'Ausstattung',
      'room.equipList': ['Balkon', 'Dusche / WC', 'Flachbildfernseher', 'WLAN', 'Safe', 'Föhn'],
      'room.priceNote': 'inkl. Frühstücksbuffet, zzgl. Kurtaxe · 1–3 Nächte zzgl. 5 € pro Person',
      'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
      'cal.reset': 'Auswahl zurücksetzen',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder (bis 16 Jahre)',
      'bk.age': 'Alter Kind', 'bk.years': 'Jahre', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Verfügbare Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie Preis und Verfügbarkeit.',
      'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl zu klein',
      'bk.total': 'gesamt', 'bk.incl': 'inkl. Frühstück, zzgl. Kurtaxe',
      'bk.single': 'Bei Einzelnutzung berechnen wir einen Aufpreis nach Absprache.',
      'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie Zeitraum oder Gästezahl – ' +
        'oder rufen Sie uns an: +49 8657 572.',
      'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
      'bk.price': 'Gesamtpreis', 'bk.pay': 'Zahlung vor Ort, bar oder mit EC-Karte.',
      'bk.cancel': 'Kostenlos stornierbar bis 30 Tage vor Anreise.',
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
      adult1: 'adult', adultN: 'adults', kid1: 'child', kidN: 'children',
      night1: 'night', nightN: 'nights',
      'room.from': 'from', 'room.pp': 'per person / night', 'room.details': 'Details', 'room.book': 'Book',
      'room.bookThis': 'Book this room', 'room.equip': 'Amenities',
      'room.equipList': ['Balcony', 'Shower / WC', 'Flat-screen TV', 'Wi-Fi', 'Safe', 'Hairdryer'],
      'room.priceNote': 'incl. breakfast buffet, plus visitor’s tax · 1–3 nights plus €5 per person',
      'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'cal.hintIn': 'Please choose your arrival date.', 'cal.hintOut': 'Now choose your departure date.',
      'cal.reset': 'Reset selection',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children (up to 16)',
      'bk.age': 'Age of child', 'bk.years': 'years', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.rooms': 'Available rooms', 'bk.pickDates': 'Choose arrival and departure to see prices and availability.',
      'bk.select': 'Select', 'bk.busy': 'Booked for these dates', 'bk.small': 'Too small for this number of guests',
      'bk.total': 'total', 'bk.incl': 'incl. breakfast, plus visitor’s tax',
      'bk.single': 'For single occupancy a supplement applies by arrangement.',
      'bk.none': 'Unfortunately no room is available for this combination. Please change the dates or number of ' +
        'guests – or call us: +49 8657 572.',
      'bk.back': 'Back', 'bk.summary': 'Your booking', 'bk.stay': 'Dates', 'bk.room': 'Room',
      'bk.price': 'Total price', 'bk.pay': 'Payment on site, in cash or by EC card.',
      'bk.cancel': 'Free cancellation up to 30 days before arrival.',
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
    menu: 'Menu',
    'nav.rooms': 'Rooms', 'nav.kitchen': 'Dining', 'nav.area': 'Surroundings', 'nav.service': 'Services',
    'nav.reviews': 'Reviews', 'nav.arrival': 'Getting here',
    'cta.book': 'Book direct', 'cta.bookShort': 'Book', and: 'and', close: 'Close',
    'hero.alt': 'Gästehaus Baltram in Ramsau with flower-decked balconies in front of the mountains',
    'hero.pre': 'Gästehaus Baltram · Ramsau near Berchtesgaden',
    'hero.title': 'Balconies, mountain views, <br class="brk">hiking from the door',
    'hero.sub': 'A family-run guesthouse – three minutes’ walk to the bus stop, half an hour to Lake Königssee.',
    'hero.note': 'Rooms from €52 per person incl. breakfast · best rate when you book direct',
    'trust.booking': 'Booking.com · 281 reviews', 'trust.hc': 'HolidayCheck · 100% recommend',
    'trust.bestT': 'Best rate', 'trust.best': 'always when you book direct',
    'trust.village': 'Mountaineering village by Berchtesgaden National Park',
    'intro.pre': 'Family-run in the mountaineering village of Ramsau',
    'intro.title': 'A warm welcome',
    'intro.text': 'A guesthouse with 15 rooms, each with its own balcony. Breakfast from the buffet in the morning, ' +
      'regional cooking in the evening, and hiking trails from the front door in between: the Soleleitungsweg is ' +
      'a three-minute walk away, Lake Hintersee ten minutes by car. This is where you find the quiet to rest ' +
      'after a day full of impressions.',
    'host.label': 'Your hosts',
    'host.quote': '“We look forward to welcoming you to our guesthouse. If you have any questions or wishes, ' +
      'we are happy to help.”',
    'host.role': 'The Graßl family runs the house personally – with many years of experience and a great number ' +
      'of returning guests.',
    'host.alt': 'The Graßl family in traditional dress on the meadow in front of the house',
    'rooms.pre': '15 rooms, all with a balcony', 'rooms.title': 'Rooms &amp; rates',
    'rooms.text': 'Rates per person and night including the breakfast buffet, plus visitor’s tax. ' +
      'The lowest rate applies from four nights.',
    'terms.kids': 'Children up to 3 stay free', 'terms.cancel': 'Free cancellation up to 30 days before arrival',
    'terms.parking': 'Free parking, garage €7 per day',
    'kitchen.alt1': 'Dining room with corner benches and tables set for breakfast',
    'kitchen.alt2': 'Breakfast buffet with cold cuts, eggs and sausages',
    'kitchen.pre': 'Dining room &amp; kitchen', 'kitchen.title': 'Regional cooking',
    'kitchen.text': 'The day starts at the breakfast buffet: rolls and bread, homemade jams, cheese, ham, fresh ' +
      'fruit salad, with boiled or scrambled eggs in turn. In season we cook on three evenings a week – always ' +
      'on Mondays and Tuesdays. Guests who are not staying with us are very welcome, too.',
    'kitchen.cardTitle': 'From the evening menu',
    'dish.1': 'Hearty beef broth with liver spaetzle',
    'dish.2': 'Roast venison with red cabbage and homemade spaetzle',
    'dish.3': 'Cheese dumplings (Kasnocken) with fried onions and mixed salad',
    'dish.4': 'Homemade pressed cheese dumplings with sauerkraut',
    'dish.5': 'Spinach dumplings with almond butter and Parmesan',
    'dish.6': 'Panna cotta with raspberry sauce',
    'kitchen.note': 'All dishes are also available as a smaller senior portion, €2.00 less. Children’s dishes ' +
      'on request. Sample menu – the dishes change weekly.',
    'kitchen.f1t': 'Breakfast', 'kitchen.f1': '7.30–9.30 am',
    'kitchen.f2t': 'Evening kitchen', 'kitchen.f2': '5.30–7.30 pm',
    'kitchen.f3t': 'Pre-order on the day', 'kitchen.f3': 'by 10 am',
    'kitchen.cta': 'Reserve a table: +49 8657 572',
    'area.pre': 'Berchtesgaden National Park', 'area.title': 'Hiking from the front door',
    'area.text': 'Ramsau lies by Berchtesgaden National Park, the only Alpine national park in Germany. Many ' +
      'trails start right at the house: the sunny Soleleitungsweg, the loop around the Schmuckenstein, the ' +
      'climb to the Mordaualm or Moosenalm.',
    'area.t1alt': 'Parish church of St Sebastian on the Ramsauer Ache',
    'area.t1': 'Village centre · buses to Berchtesgaden and Salzburg',
    'area.t2alt': 'Lake Taubensee with reed islands and mountains in the background',
    'area.t2': '5 minutes on foot · cross-country trail in winter',
    'area.t3alt': 'The Watzmannhaus hut on the Falzköpfl',
    'area.t3': 'Trailhead a few minutes by car',
    'area.t4alt': 'Lake Hintersee seen from above', 'area.t4': '10 minutes by car',
    'area.t5alt': 'Wooden walkway by the waterfalls of the Wimbachklamm gorge', 'area.t5': 'Ramsau',
    'area.t6alt': 'Gästehaus Baltram covered in snow',
    'area.t6t': 'Winter', 'area.t6': 'Hochschwarzeck ski area and toboggan run · 10 minutes by car',
    'area.f1t': 'Soleleitungsweg trail', 'area.f1': '3 minutes on foot',
    'area.f2t': 'Taubensee bus stop', 'area.f2': '3 minutes on foot',
    'area.f3t': 'Königssee, Jennerbahn', 'area.f3': 'under 30 minutes by car',
    'area.f4t': 'Salzburg, from the village centre', 'area.f4': 'by bus',
    'svc.pre': 'More than a place to sleep', 'svc.title': 'Only with us',
    'svc.1t': 'Daily “Morgenpost”',
    'svc.1': 'Tips for outings, the weather forecast and local events – every morning at breakfast.',
    'svc.2t': 'Two charging points',
    'svc.2': 'For electric cars, right at the house. The guesthouse runs on 100% green electricity.',
    'svc.3t': 'Garage for motorbikes &amp; bicycles',
    'svc.3': 'Your motorbike or bicycle is kept dry in our garage, free of charge.',
    'svc.4t': 'Buses with the guest card',
    'svc.4': 'Local buses are free with your guest card. We keep timetables and help you find the best connection.',
    'svc.5t': 'Garden &amp; sunbathing lawn',
    'svc.5': 'Terrace and lawn with mountain views; for children a playground, swing and trampoline.',
    'svc.6t': 'Two lounges',
    'svc.6': 'The parlour with its tiled stove and a guest kitchen with a drinks fridge – open all day.',
    'svc.alt1': 'Terrace with laid tables and a view of the mountains',
    'svc.alt2': 'View from the balcony across the valley to the mountains',
    'svc.alt3': 'Country-style lounge with a tiled stove',
    'rev.pre': 'Guest reviews', 'rev.title': 'What our guests say',
    'rev.of': 'out of 10 · 281 reviews on Booking.com',
    'rev.s1': 'Staff', 'rev.s2': 'Cleanliness', 'rev.s3': 'Comfort', 'rev.s4': 'Value for money',
    'rev.date': 'As of September 2026',
    'rev.q1': 'Stayed in July 2026 · HolidayCheck', 'rev.q2': 'Stayed in May 2025 · HolidayCheck',
    'rev.q3': 'Stayed in July 2023 · HolidayCheck',
    'rev.link': 'Read all 51 reviews on HolidayCheck',
    'arr.pre': 'Alpenstraße 100 · 83486 Ramsau', 'arr.title': 'Getting here',
    'arr.1t': 'By train and bus',
    'arr.1': 'To Berchtesgaden main station, then RVO bus 846 to Neuhausenbrücke and bus 845 to the Taubensee ' +
      'stop. From there it is a three-minute walk.',
    'arr.2t': 'By car',
    'arr.2': 'Leave the A8 at the Siegsdorf exit and follow the B306 towards Inzell and Berchtesgaden. Parking ' +
      'at the house is free; there are two charging points for electric cars.',
    'arr.3t': 'Arrival and departure',
    'arr.3': 'Arrival until 7 pm, later by arrangement – there is a key box at the house. Departure by 10 am. ' +
      'Payment in cash or by EC card.',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the ' +
      'OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'final.pre': 'Best rate when you book direct', 'final.title': 'When may we welcome you?',
    'final.text': 'You always get the lowest rate directly from us – without the detour via a portal. ' +
      'Cancellation is free up to 30 days before arrival.',
    'final.or': 'Or give us a call:',
    'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Gästehaus Baltram',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'bk.title': 'Book direct', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
  };

  window.BALTRAM = { ROOMS: ROOMS, UI: UI, EN: EN };
})();
