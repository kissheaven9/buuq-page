/* Landhotel Brandlhof — Inhalte: Zimmerdaten, Preise, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt.
   Preise laut landhotel-brandlhof.de/zimmer-preise.html (Stand 25.11.2026): pro Person und Tag
   ab 3 Übernachtungen, inkl. Frühstück bzw. Halbpension, gültig ab Dezember 2026.
   Kurtaxe 1,50 € pro Person/Tag, Kinder unter 16 Jahren frei. Keine Kreditkarten. */
(function () {
  'use strict';

  /* Ein Preiszeitraum: die veröffentlichte Preisliste gilt ab Dezember 2026. */
  var SEASONS = [
    { id: 'jahr', from: '2026-12-01', to: '2027-11-30' }
  ];
  var RULES = { minNights: 3, tax: 1.5, maxGuests: 2 };

  /* price = pro Person und Nacht: fr = inkl. Frühstück, hp = inkl. Halbpension.
     max = Personen im Zimmer. Alle Zimmer laut Haus je 30 m². */
  var ROOMS = [
    {
      id: 'dz', size: 30, max: 2, price: { fr: 88, hp: 106 },
      imgs: [['dz-1', 800], ['dz-2', 800], ['dz-3', 800]],
      de: {
        name: 'Doppelzimmer',
        cap: 'für 2 Personen',
        short: 'Der Klassiker des Hauses: ruhig gelegen, mit Doppelbett, Sitzgelegenheit und geräumigem Bad ' +
          'mit Dusche und WC.',
        text: 'Alle Zimmer im Brandlhof sind mit hellen und hochwertigen Möbeln eingerichtet. Zum Doppelzimmer ' +
          'gehören ein Doppelbett (1,80 × 2,00 m), eine Sitzgelegenheit und das geräumige Badezimmer mit Dusche, ' +
          'WC, Föhn und Kosmetikspiegel.',
        equip: ['Doppelbett 1,80 × 2,00 m', 'Sitzgelegenheit', 'TV, WLAN und Safe', 'Kleiner Kühlschrank',
          'Bad mit Dusche, WC, Föhn und Kosmetikspiegel', 'Leihbademantel inklusive'],
        alts: ['Doppelbett mit heller Holzwand und Leselampen im Doppelzimmer',
          'Doppelzimmer mit Doppelbett, Sitzecke und gelben Kissen',
          'Bad mit Dusche, Waschbecken und Kosmetikspiegel']
      },
      en: {
        name: 'Double room',
        cap: 'for 2 guests',
        short: 'The classic of the house: quietly situated, with a double bed, a seating corner and a spacious ' +
          'bathroom with shower and toilet.',
        text: 'All rooms at the Brandlhof are furnished with bright, high-quality furniture. The double room has ' +
          'a double bed (1.80 × 2.00 m), a seating corner and a spacious bathroom with shower, toilet, hairdryer ' +
          'and cosmetic mirror.',
        equip: ['Double bed 1.80 × 2.00 m', 'Seating corner', 'TV, Wi-Fi and safe', 'Small fridge',
          'Bathroom with shower, toilet, hairdryer and cosmetic mirror', 'Bathrobe included'],
        alts: ['Double bed with light wooden wall and reading lamps in the double room',
          'Double room with double bed, seating corner and yellow cushions',
          'Bathroom with shower, washbasin and cosmetic mirror']
      }
    },
    {
      id: 'balkon', size: 30, max: 2, price: { fr: 93, hp: 111 },
      imgs: [['balkon-1', 800], ['balkon-2', 800], ['balkon-3', 800]],
      de: {
        name: 'Balkonzimmer',
        cap: 'für 2 Personen · mit Balkon',
        short: 'Das Komfortzimmer mit eigenem Balkon: morgens Kaffee an der frischen Luft, abends der Blick ' +
          'ins Grüne.',
        text: 'Das Balkon-Komfortzimmer bietet dieselbe Ausstattung wie das Doppelzimmer – und dazu einen ' +
          'eigenen möblierten Balkon. Doppelbett (1,80 × 2,00 m), Sitzgelegenheit und das geräumige Bad mit ' +
          'Dusche und WC gehören selbstverständlich dazu.',
        equip: ['Eigener möblierter Balkon', 'Doppelbett 1,80 × 2,00 m', 'Sitzgelegenheit', 'TV, WLAN und Safe',
          'Kleiner Kühlschrank', 'Bad mit Dusche, WC, Föhn und Kosmetikspiegel'],
        alts: ['Balkonzimmer mit Doppelbett, Schreibtisch und Blick ins Grüne',
          'Balkonzimmer mit Sitzecke am Fenster und blauem Teppich',
          'Balkonzimmer mit Sesseln, Beistelltisch und Balkontür']
      },
      en: {
        name: 'Balcony room',
        cap: 'for 2 guests · with balcony',
        short: 'The comfort room with its own balcony: coffee in the fresh air in the morning, a view of the ' +
          'greenery in the evening.',
        text: 'The balcony comfort room offers the same features as the double room – plus its own furnished ' +
          'balcony. A double bed (1.80 × 2.00 m), a seating corner and the spacious bathroom with shower and ' +
          'toilet are of course included.',
        equip: ['Private furnished balcony', 'Double bed 1.80 × 2.00 m', 'Seating corner', 'TV, Wi-Fi and safe',
          'Small fridge', 'Bathroom with shower, toilet, hairdryer and cosmetic mirror'],
        alts: ['Balcony room with double bed, desk and a view of the greenery',
          'Balcony room with seating corner by the window and blue carpet',
          'Balcony room with armchairs, side table and balcony door']
      }
    },
    {
      id: 'terrasse', size: 30, max: 2, price: { fr: 93, hp: 111 },
      imgs: [['terrasse-1', 800], ['terrasse-2', 800], ['terrasse-3', 800]],
      de: {
        name: 'Terrassenzimmer',
        cap: 'für 2 Personen · mit Terrasse',
        short: 'Ebenerdig wohnen mit eigener Terrasse – von hier sind es nur ein paar Schritte in den Garten.',
        text: 'Das Terrassen-Komfortzimmer liegt ebenerdig und hat eine eigene Terrasse. Die Ausstattung ' +
          'entspricht den übrigen Zimmern: Doppelbett (1,80 × 2,00 m), Sitzgelegenheit und das geräumige Bad ' +
          'mit Dusche und WC.',
        equip: ['Eigene Terrasse', 'Doppelbett 1,80 × 2,00 m', 'Sitzgelegenheit', 'TV, WLAN und Safe',
          'Kleiner Kühlschrank', 'Bad mit Dusche, WC, Föhn und Kosmetikspiegel'],
        alts: ['Terrassenzimmer mit Doppelbett, Sessel und Stehlampe',
          'Terrassenzimmer mit Doppelbett und Sitzecke am Fenster',
          'Terrassenzimmer mit Holzmöbeln und Terrassentür']
      },
      en: {
        name: 'Terrace room',
        cap: 'for 2 guests · with terrace',
        short: 'Ground-floor living with a private terrace – the garden is only a few steps away.',
        text: 'The terrace comfort room is on the ground floor and has its own terrace. The furnishings match ' +
          'the other rooms: a double bed (1.80 × 2.00 m), a seating corner and the spacious bathroom with ' +
          'shower and toilet.',
        equip: ['Private terrace', 'Double bed 1.80 × 2.00 m', 'Seating corner', 'TV, Wi-Fi and safe',
          'Small fridge', 'Bathroom with shower, toilet, hairdryer and cosmetic mirror'],
        alts: ['Terrace room with double bed, armchair and floor lamp',
          'Terrace room with double bed and seating corner by the window',
          'Terrace room with wooden furniture and terrace door']
      }
    },
    {
      id: 'app', size: 30, max: 2, price: { fr: 100, hp: 118 },
      imgs: [['app-1', 800], ['app-2', 800], ['app-3', 800]],
      de: {
        name: 'Appartement',
        cap: 'für 2 Personen · mit Küchenzeile',
        short: 'Die größte Kategorie des Hauses: Wohnbereich mit Sitzecke und eigener Küchenzeile.',
        text: 'Das Appartement bietet einen Wohnbereich mit Sitzecke und eine eigene Küchenzeile – ideal für ' +
          'alle, die etwas mehr Platz möchten. Dazu kommen Doppelbett, TV, WLAN, Safe und das geräumige Bad ' +
          'mit Dusche und WC.',
        equip: ['Wohnbereich mit Sitzecke', 'Eigene Küchenzeile', 'Doppelbett', 'TV, WLAN und Safe',
          'Kleiner Kühlschrank', 'Bad mit Dusche, WC, Föhn und Kosmetikspiegel'],
        alts: ['Wohnbereich des Appartements mit türkisen Sesseln und Essplatz',
          'Küchenzeile des Appartements mit rundem Esstisch und Blumen',
          'Schlafbereich des Appartements mit Doppelbett']
      },
      en: {
        name: 'Apartment',
        cap: 'for 2 guests · with kitchenette',
        short: 'The largest category in the house: a living area with seating corner and its own kitchenette.',
        text: 'The apartment offers a living area with a seating corner and its own kitchenette – ideal for ' +
          'anyone who would like a little more space. It also has a double bed, TV, Wi-Fi, safe and the ' +
          'spacious bathroom with shower and toilet.',
        equip: ['Living area with seating corner', 'Private kitchenette', 'Double bed', 'TV, Wi-Fi and safe',
          'Small fridge', 'Bathroom with shower, toilet, hairdryer and cosmetic mirror'],
        alts: ['Living area of the apartment with turquoise armchairs and dining table',
          'Kitchenette of the apartment with round dining table and flowers',
          'Sleeping area of the apartment with double bed']
      }
    },
    {
      id: 'ez', size: 30, max: 1, price: { fr: 98, hp: 116 },
      imgs: [['ez-1', 800], ['ez-2', 800], ['ez-3', 800]],
      de: {
        name: 'Einzelzimmer',
        cap: 'für 1 Person',
        short: 'Volle 30 m² für Sie allein – mit derselben hellen Ausstattung wie die Doppelzimmer.',
        text: 'Auch wer allein reist, wohnt im Brandlhof auf vollen 30 m²: helle, hochwertige Möbel, ' +
          'Sitzgelegenheit und das geräumige Bad mit Dusche, WC, Föhn und Kosmetikspiegel.',
        equip: ['30 m² für eine Person', 'Sitzgelegenheit', 'TV, WLAN und Safe', 'Kleiner Kühlschrank',
          'Bad mit Dusche, WC, Föhn und Kosmetikspiegel', 'Leihbademantel inklusive'],
        alts: ['Bett mit Bademantel und Gästemappe im Einzelzimmer',
          'Bad des Einzelzimmers mit großem Spiegel und Waschbecken',
          'Kissen und Blumendekoration im Einzelzimmer']
      },
      en: {
        name: 'Single room',
        cap: 'for 1 guest',
        short: 'A full 30 m² to yourself – with the same bright furnishings as the double rooms.',
        text: 'Even when travelling alone you enjoy a full 30 m² at the Brandlhof: bright, high-quality ' +
          'furniture, a seating corner and the spacious bathroom with shower, toilet, hairdryer and cosmetic ' +
          'mirror.',
        equip: ['30 m² for one guest', 'Seating corner', 'TV, Wi-Fi and safe', 'Small fridge',
          'Bathroom with shower, toilet, hairdryer and cosmetic mirror', 'Bathrobe included'],
        alts: ['Bed with bathrobe and guest folder in the single room',
          'Bathroom of the single room with large mirror and washbasin',
          'Pillows and flower decoration in the single room']
      }
    }
  ];

  var UI = {
    de: {
      'room.from': 'ab', 'room.pn': 'pro Person/Nacht inkl. Frühstück', 'room.details': 'Details und Fotos',
      'room.book': 'Verfügbarkeit prüfen', 'room.bookThis': 'Dieses Zimmer anfragen', 'room.equip': 'Ausstattung',
      'room.photo': 'Foto', 'room.photos': 'Fotos',
      'room.priceNote': 'Inkl. Frühstück {f} · inkl. Halbpension {h} pro Person und Nacht, ab 3 Übernachtungen. ' +
        'Zuzüglich Kurtaxe.',
      'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Personen', 'bw.pick': 'Datum wählen',
      'bw.btn': 'Verfügbarkeit prüfen',
      'guest1': 'Person', 'guestN': 'Personen', 'night1': 'Nacht', 'nightN': 'Nächte',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat', 'cal.hintIn': 'Bitte Anreisetag wählen.',
      'cal.hintOut': 'Jetzt den Abreisetag wählen – mindestens 3 Nächte.', 'cal.reset': 'Zurücksetzen',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.off': 'außerhalb der Preisliste', 'cal.sel': 'Ihre Auswahl',
      'cal.jump': 'Zum Zeitraum springen', 'cal.jahr': 'Preisliste ab Dezember 2026',
      'bk.guests': 'Personen & Verpflegung', 'bk.persons': 'Personen', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.max': 'Zimmer für bis zu zwei Personen; das Einzelzimmer ist für eine Person eingerichtet.',
      'bk.board': 'Verpflegung', 'bk.fr': 'Frühstück', 'bk.hp': 'Halbpension',
      'bk.frLong': 'inkl. Frühstück', 'bk.hpLong': 'inkl. Halbpension',
      'bk.rooms': 'Freie Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise im Kalender.',
      'bk.min': 'Mindestaufenthalt 3 Nächte – bitte einen späteren Abreisetag wählen.',
      'bk.busy': 'In diesem Zeitraum belegt', 'bk.forOne': 'Für 1 Person eingerichtet',
      'bk.select': 'Auswählen', 'bk.total': 'gesamt',
      'bk.none': 'In diesem Zeitraum sind alle Zimmer belegt. Bitte wählen Sie andere Tage – oder rufen Sie ' +
        'uns an: +49 8582 269.',
      'bk.incl': 'Alle Preise pro Person und Nacht, ab 3 Übernachtungen',
      'bk.tax': 'Zuzüglich Kurtaxe: 1,50 € pro Person und Tag, Kinder unter 16 Jahren frei.',
      'bk.pay': 'Zahlung bar oder mit EC-Karte vor Ort, keine Kreditkarten.',
      'bk.summary': 'Ihre Auswahl', 'bk.room': 'Zimmer', 'bk.stay': 'Zeitraum', 'bk.stayNights': 'Übernachtung',
      'bk.taxLine': 'Kurtaxe', 'bk.price': 'Gesamt, zahlbar vor Ort', 'bk.back': 'Zurück',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon',
      'f.msg': 'Nachricht an die Gastgeber (optional)',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">' +
        'Datenschutzerklärung</a> gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung der ' +
        'Anfrage verwendet werden.', 'f.submit': 'Unverbindlich anfragen',
      'e.name': 'Bitte geben Sie Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'e.phone': 'Bitte geben Sie eine Telefonnummer an.', 'e.consent': 'Bitte stimmen Sie der Datenschutzerklärung zu.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'Ihre Anfrage ist eingegangen. Die Antwort geht an {email}.',
      'ok.no': 'Anfragenummer', 'ok.demo': 'Dies ist eine Vorschau der neuen Website. Es wurde nichts gebucht und ' +
        'keine Daten wurden übertragen.', 'ok.close': 'Schließen',
      'map.link': 'In OpenStreetMap öffnen', 'map.popup': 'Außernbrünst 2, 94133 Röhrnbach'
    },
    en: {
      'room.from': 'from', 'room.pn': 'per person/night incl. breakfast', 'room.details': 'Details and photos',
      'room.book': 'Check availability', 'room.bookThis': 'Enquire about this room', 'room.equip': 'Features',
      'room.photo': 'Photo', 'room.photos': 'photos',
      'room.priceNote': 'With breakfast {f} · with half board {h} per person per night, minimum stay 3 nights. ' +
        'Visitor’s tax is extra.',
      'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Choose date',
      'bw.btn': 'Check availability',
      'guest1': 'guest', 'guestN': 'guests', 'night1': 'night', 'nightN': 'nights',
      'cal.prev': 'Previous month', 'cal.next': 'Next month', 'cal.hintIn': 'Please choose your arrival day.',
      'cal.hintOut': 'Now choose your departure day – at least 3 nights.', 'cal.reset': 'Reset',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.off': 'outside the price list', 'cal.sel': 'your selection',
      'cal.jump': 'Jump to period', 'cal.jahr': 'Price list from December 2026',
      'bk.guests': 'Guests & board', 'bk.persons': 'Guests', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.max': 'Rooms sleep up to two guests; the single room is furnished for one guest.',
      'bk.board': 'Board', 'bk.fr': 'Breakfast', 'bk.hp': 'Half board',
      'bk.frLong': 'with breakfast', 'bk.hpLong': 'with half board',
      'bk.rooms': 'Available rooms', 'bk.pickDates': 'Choose arrival and departure in the calendar.',
      'bk.min': 'Minimum stay is 3 nights – please choose a later departure day.',
      'bk.busy': 'Booked for these dates', 'bk.forOne': 'Furnished for 1 guest',
      'bk.select': 'Select', 'bk.total': 'total',
      'bk.none': 'All rooms are booked for these dates. Please choose other days – or call us: +49 8582 269.',
      'bk.incl': 'All prices per person per night, minimum stay 3 nights',
      'bk.tax': 'Visitor’s tax is extra: €1.50 per person per day, children under 16 free.',
      'bk.pay': 'Payment in cash or by debit card on site; credit cards are not accepted.',
      'bk.summary': 'Your selection', 'bk.room': 'Room', 'bk.stay': 'Dates', 'bk.stayNights': 'Accommodation',
      'bk.taxLine': 'Visitor’s tax', 'bk.price': 'Total, payable on site', 'bk.back': 'Back',
      'f.name': 'First and last name', 'f.email': 'Email', 'f.phone': 'Phone',
      'f.msg': 'Message to your hosts (optional)',
      'f.consent': 'I have read the <a href="datenschutz.html" target="_blank" rel="noopener">' +
        'privacy policy</a> and agree that my details are used to process the enquiry.',
      'f.submit': 'Send non-binding enquiry',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid email address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please agree to the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'We have received your enquiry. Our answer will be sent ' +
        'to {email}.',
      'ok.no': 'Enquiry number', 'ok.demo': 'This is a preview of the new website. Nothing has been booked and ' +
        'no data has been transmitted.', 'ok.close': 'Close',
      'map.link': 'Open in OpenStreetMap', 'map.popup': 'Außernbrünst 2, 94133 Röhrnbach'
    }
  };

  var EN = {
    'beta': 'Beta preview — not a final design',
    'brand.aria': 'Landhotel Brandlhof – home', 'brand.top': 'Landhotel Brandlhof – back to top',
    'nav.aria': 'Main navigation', 'menu.aria': 'Menu', 'menu.nav': 'Mobile navigation', 'lang.aria': 'Language',
    'close': 'Close',
    'nav.rooms': 'Rooms', 'nav.hosts': 'Your hosts', 'nav.wellness': 'Wellness', 'nav.offers': 'Packages',
    'nav.area': 'Bavarian Forest', 'nav.dayspa': 'Day spa', 'nav.prices': 'Prices', 'nav.arr': 'Getting here',
    'cta.check': 'Check availability',
    'mbar.price': 'from <b>€88</b> per person/night',
    'hero.pre': 'Außernbrünst near Röhrnbach · Bavarian Forest',
    'hero.title': 'Quiet, heartfelt, relaxing – between the national park and Passau',
    'hero.lead': 'The family-run three-star-superior country hotel of the Dirndorfer family: around 30 beds, ' +
      'indoor pool and sauna oasis, regional cooking – far away from crowds and rush.',
    'hero.note': 'from <b>€88</b> per person per night incl. breakfast · minimum stay 3 nights · half board ' +
      'available',
    'hero.alt': 'Landhotel Brandlhof: yellow country house with garden, parasols and sun loungers',
    'score.word': 'Superior', 'score.src': 'German hotel classification · May 2024',
    'trust.aria': 'Facts about the house',
    'trust.1s': 'stars', 'trust.1': 'Superior · German hotel classification',
    'trust.2s': 'points', 'trust.2': 'awarded at the May 2024 classification',
    'trust.3s': 'beds', 'trust.3': 'small, fine and family-run',
    'trust.4': 'heated indoor pool · daily 7 am – 9 pm',
    'trust.date': 'As of 25 November 2026 · Source: landhotel-brandlhof.de',
    'apts.pre': 'Rooms & prices', 'apts.title': 'Five room types – each a full 30 m²',
    'apts.lead': 'All rooms are furnished with bright, high-quality furniture: double bed (1.80 × 2.00 m), ' +
      'seating corner, TV, Wi-Fi, safe and a small fridge. The spacious bathroom has a shower, toilet, ' +
      'hairdryer and cosmetic mirror – bathrobes are provided.',
    'hosts.pre': 'Your hosts', 'hosts.title': 'With the Dirndorfer family',
    'hosts.p1': 'As a family-run house with around 30 beds, the Brandlhof stands for what many guests are ' +
      'looking for today: a hotel far away from rush and mass tourism – small and finely run, with great ' +
      'attention to detail.',
    'hosts.p2': 'A generous breakfast buffet awaits you from 8 to 10 in the morning. With half board, the ' +
      'kitchen spoils you from 6 pm with a starter soup, salad, a choice of two main courses and a dessert – ' +
      'made with produce from farms in the immediate area.',
    'hosts.p3': 'Mild summer evenings are spent in the Bavarian beer garden under the big chestnut tree – and ' +
      'the day winds down in the romantic wine lounge over a good glass of wine.',
    'hosts.l1': 'Cosy parlour with regional cooking', 'hosts.l2': 'Beer garden under the chestnut tree',
    'hosts.l3': 'Romantic wine lounge (vinothek)',
    'hosts.alt1': 'The Dirndorfer family in front of wintry trees',
    'hosts.alt2': 'Guests at a table in the beer garden under the chestnut tree',
    'wel.pre': 'Wellness & beauty', 'wel.title': 'Your small, fine wellness oasis',
    'wel.lead': 'No crowded spa landscapes – just relaxed quiet and personal care. The Brandlhof wellness ' +
      'oasis offers everything a restorative break needs.',
    'wel.news': 'Fresh sparkle from Christmas 2026: the indoor pool is currently being renewed – the ' +
      'Dirndorfer family looks forward to surprising you with new moments of wellbeing.',
    'wel.1t': 'Heated indoor pool',
    'wel.1': '29 °C warm water, counter-current system and massage jets; at 4.5 × 9 m also good for sporty ' +
      'swimmers. Open daily from 7 am to 9 pm.',
    'wel.2t': 'Sauna & steam bath',
    'wel.2': 'Finnish sauna with up to 90 °C and an outside window, aroma steam bath at a gentle 50 °C. ' +
      'Open daily from 12:30 to 6 pm.',
    'wel.3t': 'Massages',
    'wel.3': 'From aroma massage to hot stone and shiatsu, from €42. Best booked together with your room ' +
      'reservation.',
    'wel.4t': 'Beauty treatments',
    'wel.4': 'Facials “classic” (€75) and “deluxe” (€95) with products matched to your skin type, plus ' +
      'manicure and extras.',
    'wel.5t': 'Quiet room',
    'wel.5': 'Relaxation loungers with gentle background music, rain and torrent showers, drinking fountain, ' +
      'juice and a nut mix.',
    'wel.6t': 'Bathrobes included',
    'wel.6': 'Cosy bathrobes are provided for all house guests – your bag for pool and sauna is ready.',
    'off.pre': 'Packages', 'off.title': 'Two offers to arrive and unwind',
    'off.lead': 'Accommodation, good food and wellness in one package – valid from 1 November 2026 to ' +
      '1 November 2027.',
    'off.1tag': '3 days · from €429 per person', 'off.1t': 'A quick getaway („Kurz mal weg“)',
    'off.1': 'Three nights with breakfast buffet and three-course dinner, welcome sparkling wine, aroma back ' +
      'massage, herbal footbath with foot massage, head energy massage, coffee and cake – plus indoor pool, ' +
      'sauna oasis and bathrobe. Not bookable over public holidays.',
    'off.1p': 'in a double room <b>€429</b> per person',
    'off.2tag': '5 days · from €711 per person', 'off.2t': 'Pampering days („Verwöhntage“)',
    'off.2': 'Five nights with breakfast buffet and three-course dinner, welcome sparkling wine, herbal ' +
      'footbath with foot massage, a facial “fresh kick”, relaxation massage, coffee and cake and a little ' +
      'gift from the wellness area.',
    'off.2p': 'in a double room <b>€711</b> per person',
    'off.alt1': 'Relaxation room with loungers and stone wall',
    'off.alt2': 'Regional dish, beautifully arranged on a white plate',
    'area.pre': 'On the doorstep', 'area.title': 'National park, treetops and the city of three rivers',
    'area.lead': 'The Bavarian Forest is Germany’s oldest national park region – and Passau with its ' +
      'cathedral and the Danube is close enough for a day trip.',
    'area.1tag': 'Nature & hiking', 'area.1t': 'Bavarian Forest National Park',
    'area.1': 'Unspoilt nature around Röhrnbach: hiking and cycling trails start at the hotel; the treetop ' +
      'walk in Neuschönau, the Dreisessel mountain and the Saußbach gorge are favourite excursions.',
    'area.2tag': 'Towns & culture', 'area.2t': 'Passau and the Danube',
    'area.2': 'The city of three rivers with its cathedral, old town and Danube boat trips is a classic day ' +
      'trip – as are Schärding and the Bavarian Forest museum village.',
    'area.alt1': 'Wooden treetop walk tower between green trees',
    'area.alt2': 'View over Passau old town, cathedral and the Danube',
    'spa.pre': 'Day spa', 'spa.title': 'A wellness day – no overnight stay needed',
    'spa.lead': 'Day guests are welcome in the sauna and pool area too. Three of our four day-spa packages – ' +
      'please book your wellness day by phone.',
    'spa.1h': '12:30 – 6 pm', 'spa.1t': 'Little time-out („Kleine Auszeit“)',
    'spa.1': 'Use of the sauna and pool area, spa bag with bathrobe, sauna towel and slippers, water, juice ' +
      'and fruit, in the afternoon coffee, cake, a snack and a glass of sparkling wine – plus a back or foot ' +
      'massage (30 min).',
    'spa.1p': '<b>€78</b> per person',
    'spa.2h': '12:30 – 9 pm', 'spa.2t': 'Relaxation day („Entspannungstag“)',
    'spa.2': 'Everything from the little time-out – with a full-body chill-out massage (45 min) instead and a ' +
      'three-course dinner to finish the day.',
    'spa.2p': '<b>€125</b> per person',
    'spa.3h': '8:30 am – 9 pm', 'spa.3t': 'My wellness day („Mein Wellnesstag“)',
    'spa.3': 'The whole day: rich breakfast buffet, sauna and pool area, afternoon coffee and cake, a feel-good ' +
      'massage (50 min) and a three-course dinner.',
    'spa.3p': '<b>€153</b> per person',
    'pr.pre': 'Prices from December 2026', 'pr.title': 'One price per person – with breakfast or half board',
    'pr.th0': 'Room', 'pr.th1': 'With breakfast', 'pr.th2': 'With half board',
    'pr.thNote': 'per person/night, from 3 nights',
    'pr.r1': 'Double room', 'pr.r2': 'Balcony room', 'pr.r3': 'Terrace room', 'pr.r4': 'Single room',
    'pr.r5': 'Apartment',
    'pr.note': 'All prices per person per day for stays of 3 nights or more; valid from December 2026 until a ' +
      'new price list appears. The municipal visitor’s tax is extra: €1.50 per person per day, free for ' +
      'children under 16. Cancellation: free up to 14 days before arrival, then 50 %, within 7 days 80 % of ' +
      'the room price.',
    'know.title': 'Good to know',
    'know.1t': 'Minimum stay', 'know.1': '3 nights',
    'know.2t': 'Arrival', 'know.2': 'from 2 pm · with half board by 5 pm',
    'know.3t': 'Departure', 'know.3': 'by 10:30 am',
    'know.4t': 'Payment', 'know.4': 'cash or debit card, no credit cards',
    'know.5t': 'Pets', 'know.5': 'not allowed – a dog-free hotel',
    'know.6t': 'Accessibility', 'know.6': 'no lift, not barrier-free',
    'arr.pre': 'Außernbrünst 2 · 94133 Röhrnbach', 'arr.title': 'How to find us',
    'arr.1t': 'Via the A 3 motorway',
    'arr.1': 'Leave the A 3 Deggendorf–Passau at the Aicha vorm Wald exit and follow the road for about ' +
      '20 km towards Waldkirchen. At the junction in Hutthurm turn left onto the B 12 towards Waldkirchen.',
    'arr.2t': 'On the B 12 to Außernbrünst',
    'arr.2': 'Follow the B 12 towards Freyung as far as Außernbrünst, turn right at the junction – the ' +
      'Brandlhof is in the middle of the village.',
    'arr.3t': 'In the heart of the Bavarian Forest',
    'arr.3': 'Außernbrünst is a hamlet of the market town of Röhrnbach in the Freyung-Grafenau district – ' +
      'between the Bavarian Forest National Park and Passau.',
    'arr.addr': 'Landhotel Brandlhof · Außernbrünst 2 · 94133 Röhrnbach · phone +49 8582 269',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the ' +
      'OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'final.pre': 'Directly with your hosts', 'final.title': 'When may we welcome you?',
    'final.text': 'Choose your dates – you will see at once which room is free and what your stay costs. Or ' +
      'simply give us a call.',
    'final.or': 'Or give us a call:',
    'foot.aria': 'Legal', 'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Silvia Strasser, Foto Dünnbier',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'bk.title': 'Availability &amp; enquiry', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details',
    'bk.step3': 'Confirmation'
  };

  window.BRANDLHOF = { ROOMS: ROOMS, SEASONS: SEASONS, RULES: RULES, UI: UI, EN: EN };
})();
