/* Gasthof Hotel Zwieselstein — Inhalte: Zimmer, Saisonpreise, UI-Texte (DE/EN/NL), Übersetzungen der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch und Niederländisch werden über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Saisonpreise: Doppelzimmer pro Nacht für zwei Personen, ohne Verpflegung, ohne Ortstaxe.
     Quelle: Online-Buchung des Hauses (easybooking), abgefragt am 02.10.2026 – jede Nacht einzeln.
     Ein Eintrag gilt ab "from" bis zum Tag vor dem nächsten Eintrag. hb = Halbpension buchbar. */
  var RATES = [
    { from: '2026-09-05', to: '2026-11-13', price: 118, s: 'sommer', hb: false },
    { from: '2026-11-14', to: '2026-12-18', price: 138, s: 'winter', hb: true },
    { from: '2026-12-19', to: '2027-01-01', price: 190, s: 'winter', hb: true },
    { from: '2027-01-02', to: '2027-01-08', price: 178, s: 'winter', hb: true },
    { from: '2027-01-09', to: '2027-01-29', price: 162, s: 'winter', hb: true },
    { from: '2027-01-30', to: '2027-02-26', price: 190, s: 'winter', hb: true },
    { from: '2027-02-27', to: '2027-03-19', price: 178, s: 'winter', hb: true },
    { from: '2027-03-20', to: '2027-03-26', price: 190, s: 'winter', hb: true },
    { from: '2027-03-27', to: '2027-04-02', price: 178, s: 'winter', hb: true },
    { from: '2027-04-03', to: '2027-04-09', price: 162, s: 'winter', hb: true },
    { from: '2027-04-10', to: '2027-04-30', price: 142, s: 'winter', hb: true },
    { from: '2027-05-01', to: '2027-06-25', price: 124, s: 'sommer', hb: false },
    { from: '2027-06-26', to: '2027-09-03', price: 146, s: 'sommer', hb: false },
    { from: '2027-09-04', to: '2027-11-05', price: 124, s: 'sommer', hb: false }
  ];

  /* Aufschläge und Ermäßigungen laut Online-Buchung des Hauses (Stand 02.10.2026) */
  var RULES = {
    single: 15,          /* Alleinbenutzung: halber Zimmerpreis + 15 € pro Nacht */
    extraAdult: 0.9,     /* 3. und 4. Person ab 15 Jahren: 90 % des Personenpreises */
    kid3to8: 0.45,
    kid9to14: 0.675,
    breakfast: { adult: 20, kid9to14: 16, kid3to8: 10 },
    halfBoard: { adult: 50, kid9to14: 39, kid3to8: 25 },
    shortStay: 10,       /* 1–3 Nächte: pro Person und Nacht */
    tax: 5,              /* Ortstaxe pro Person und Nacht, ab 16 Jahren */
    deposit: 30          /* Anzahlung in Prozent */
  };

  /* Zimmerkategorien wie in der Online-Buchung des Hauses; Größen laut Eintrag auf soelden.com.
     count = Zimmer dieser Kategorie (zusammen 10). big = Breite des großen Bildes je Foto. */
  var ROOMS = [
    {
      id: 'dz', size: 18, max: 2, count: 2, balcony: false,
      imgs: ['zimmer-dz-1', 'zimmer-dz-2'], big: [1600, 1600],
      de: {
        name: 'Doppelzimmer', cap: '1–2 Personen',
        short: 'Großzügiges Doppelzimmer mit Doppelbett, Couch und eigenem Bad.',
        text: 'Ein großzügig gestaltetes Doppelzimmer, eingerichtet mit Holz aus den eigenen Wäldern: Doppelbett, ' +
          'Couch, Schreibtisch, eigenes Bad mit Dusche, WC und Föhn. Für Kleinkinder stellen wir gern ein Babybett bereit.',
        alts: ['Doppelzimmer mit Holzbett, Wandspiegel und Sofa', 'Blick durch die Zimmertür auf das Doppelbett am Fenster']
      },
      en: {
        name: 'Double room', cap: '1–2 guests',
        short: 'Spacious double room with double bed, couch and private bathroom.',
        text: 'A generously sized double room, furnished with timber from the family’s own forest: double bed, couch, ' +
          'desk, private bathroom with shower, WC and hairdryer. A cot for small children is available on request.',
        alts: ['Double room with wooden bed, wall mirror and sofa', 'View through the door to the double bed by the window']
      },
      nl: {
        name: 'Tweepersoonskamer', cap: '1–2 personen',
        short: 'Ruime tweepersoonskamer met tweepersoonsbed, bank en eigen badkamer.',
        text: 'Een ruime tweepersoonskamer, ingericht met hout uit de eigen bossen: tweepersoonsbed, bank, bureau, ' +
          'eigen badkamer met douche, wc en föhn. Voor kleine kinderen zetten wij graag een babybedje klaar.',
        alts: ['Tweepersoonskamer met houten bed, wandspiegel en bank', 'Blik door de kamerdeur op het tweepersoonsbed bij het raam']
      }
    },
    {
      id: 'balkon', size: 18, max: 2, count: 2, balcony: true,
      imgs: ['zimmer-balkon-1', 'zimmer-balkon-2'], big: [900, 1600],
      de: {
        name: 'Doppelzimmer mit Balkon', cap: '1–2 Personen',
        short: 'Wie das Doppelzimmer – mit eigenem Balkon und Blick in die Berge.',
        text: 'Großzügiges Doppelzimmer mit Balkon: Doppelbett, Couch, eigenes Bad mit Dusche, WC und Föhn. Abends ' +
          'die Balkontür öffnen, hinaussetzen und den Tag ausklingen lassen – zu hören ist nur das Rauschen des Baches.',
        alts: ['Doppelzimmer mit Holzbett, Kommode und Zimmertür', 'Die Holzbalkone des Gasthofs im Winter']
      },
      en: {
        name: 'Double room with balcony', cap: '1–2 guests',
        short: 'Like the double room – with a private balcony and mountain view.',
        text: 'Spacious double room with balcony: double bed, couch, private bathroom with shower, WC and hairdryer. ' +
          'Open the balcony door in the evening, sit outside and let the day fade – all you hear is the stream.',
        alts: ['Double room with wooden bed, chest of drawers and door', 'The wooden balconies of the inn in winter']
      },
      nl: {
        name: 'Tweepersoonskamer met balkon', cap: '1–2 personen',
        short: 'Zoals de tweepersoonskamer – met eigen balkon en uitzicht op de bergen.',
        text: 'Ruime tweepersoonskamer met balkon: tweepersoonsbed, bank, eigen badkamer met douche, wc en föhn. ' +
          'Doe ’s avonds de balkondeur open, ga buiten zitten en laat de dag rustig eindigen – u hoort alleen de beek.',
        alts: ['Tweepersoonskamer met houten bed, commode en kamerdeur', 'De houten balkons van de Gasthof in de winter']
      }
    },
    {
      id: 'drei', size: 20, max: 3, count: 2, balcony: true,
      imgs: ['zimmer-3-1', 'zimmer-3-2'], big: [1600, 900],
      de: {
        name: 'Doppelzimmer für bis zu 3 Personen', cap: '1–3 Personen',
        short: 'Doppelbett und Schlafcouch für eine dritte Person, mit Balkon.',
        text: 'Unser großzügiges Doppelzimmer bietet Platz für bis zu drei Personen: Doppelbett, Schlafcouch für ' +
          'eine Person, Balkon, eigenes Bad mit Dusche, WC und Föhn. Babybetten stellen wir gern bereit.',
        alts: ['Doppelzimmer mit Holzbett, Fenster und Balkontür', 'Doppelzimmer mit Schreibtisch, Spiegel und Schlafcouch']
      },
      en: {
        name: 'Double room for up to 3 guests', cap: '1–3 guests',
        short: 'Double bed and sofa bed for a third guest, with balcony.',
        text: 'Our spacious double room sleeps up to three: double bed, sofa bed for one, balcony, private bathroom ' +
          'with shower, WC and hairdryer. Cots are available on request.',
        alts: ['Double room with wooden bed, window and balcony door', 'Double room with desk, mirror and sofa bed']
      },
      nl: {
        name: 'Tweepersoonskamer voor max. 3 personen', cap: '1–3 personen',
        short: 'Tweepersoonsbed en slaapbank voor een derde persoon, met balkon.',
        text: 'Onze ruime tweepersoonskamer biedt plaats aan maximaal drie personen: tweepersoonsbed, slaapbank voor ' +
          'één persoon, balkon, eigen badkamer met douche, wc en föhn. Babybedjes zetten wij graag klaar.',
        alts: ['Tweepersoonskamer met houten bed, raam en balkondeur', 'Tweepersoonskamer met bureau, spiegel en slaapbank']
      }
    },
    {
      id: 'vier', size: 22, max: 4, count: 4, balcony: true,
      imgs: ['zimmer-4-1', 'zimmer-4-2'], big: [1600, 1600],
      de: {
        name: 'Doppelzimmer für bis zu 4 Personen', cap: '1–4 Personen',
        short: 'Doppelbett und ausziehbares Sofa für zwei weitere Personen, mit Balkon.',
        text: 'Unser größtes Zimmer bietet Platz für bis zu vier Personen: Doppelbett, Schlafcouch für eine oder ' +
          'zwei Personen, Balkon, eigenes Bad mit Dusche, WC und Föhn. Ideal für Familien – Babybetten stellen wir gern bereit.',
        alts: ['Doppelzimmer mit Holzbett, Schreibtisch und Fenster', 'Zimmer mit Sofa, Fernseher und Balkontür']
      },
      en: {
        name: 'Double room for up to 4 guests', cap: '1–4 guests',
        short: 'Double bed and pull-out sofa for two more guests, with balcony.',
        text: 'Our largest room sleeps up to four: double bed, sofa bed for one or two, balcony, private bathroom ' +
          'with shower, WC and hairdryer. Ideal for families – cots are available on request.',
        alts: ['Double room with wooden bed, desk and window', 'Room with sofa, television and balcony door']
      },
      nl: {
        name: 'Tweepersoonskamer voor max. 4 personen', cap: '1–4 personen',
        short: 'Tweepersoonsbed en uittrekbare bank voor nog twee personen, met balkon.',
        text: 'Onze grootste kamer biedt plaats aan maximaal vier personen: tweepersoonsbed, slaapbank voor één of ' +
          'twee personen, balkon, eigen badkamer met douche, wc en föhn. Ideaal voor gezinnen – babybedjes zetten wij graag klaar.',
        alts: ['Tweepersoonskamer met houten bed, bureau en raam', 'Kamer met bank, televisie en balkondeur']
      }
    }
  ];

  var UI = {
    de: {
      'adult1': 'Erwachsener', 'adultN': 'Erwachsene', 'kid1': 'Kind', 'kidN': 'Kinder',
      'night1': 'Nacht', 'nightN': 'Nächte',
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen',
      'bw.btn': 'Verfügbarkeit prüfen',
      'room.from': 'ab', 'room.unit': 'pro Zimmer und Nacht', 'room.details': 'Details',
      'room.book': 'Buchen', 'room.bookThis': 'Dieses Zimmer buchen', 'room.equip': 'Ausstattung',
      'room.equipList': ['Doppelbett', 'Dusche, WC und Föhn', 'Kabel-TV, Radio und Telefon', 'Kostenloses WLAN',
        'Schreibtisch', 'Babybett auf Wunsch'],
      'room.balcony': 'Balkon', 'room.count': 'Zimmer dieser Art',
      'room.priceNote': 'Für zwei Personen, ohne Verpflegung, zuzüglich Ortstaxe. Frühstück 20 €, im Winter Halbpension 50 € pro Person und Nacht.',
      'room.seasonW': 'im Winter 2026/27', 'room.seasonS': 'im Sommer 2027',
      'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'pt.to': 'bis', 'pt.night': 'pro Nacht',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.hintIn': 'Bitte wählen Sie den Anreisetag.', 'cal.hintOut': 'Bitte wählen Sie den Abreisetag.',
      'cal.reset': 'Zurücksetzen', 'cal.free': 'frei', 'cal.busy': 'ausgebucht', 'cal.sel': 'Ihre Auswahl',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder (bis 14 Jahre)', 'bk.age': 'Alter Kind',
      'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.board': 'Verpflegung', 'bk.b0': 'Ohne Verpflegung', 'bk.b1': 'Mit Frühstück', 'bk.b2': 'Mit Halbpension',
      'bk.b1p': '+ 20 € pro Person und Nacht', 'bk.b2p': '+ 50 € pro Person und Nacht',
      'bk.b2off': 'nur von Mitte November bis Ende April',
      'bk.rooms': 'Zimmer wählen', 'bk.pickDates': 'Wählen Sie An- und Abreise, um Preise für Ihren Zeitraum zu sehen.',
      'bk.small': 'zu klein für Ihre Gästezahl', 'bk.busy': 'in diesem Zeitraum belegt', 'bk.total': 'gesamt',
      'bk.select': 'Auswählen', 'bk.left1': 'Nur noch 1 Zimmer frei', 'bk.leftN': 'Noch {n} Zimmer frei',
      'bk.none': 'In diesem Zeitraum ist leider kein passendes Zimmer frei. Bitte wählen Sie andere Tage oder rufen Sie uns an: +43 5254 3503.',
      'bk.incl': 'Gesamtpreis inklusive Ortstaxe',
      'bk.short': 'Bei 1 bis 3 Nächten gilt ein Zuschlag von 10 € pro Person und Nacht.',
      'bk.summary': 'Ihre Buchung', 'bk.room': 'Zimmer', 'bk.stay': 'Zeitraum', 'bk.price': 'Gesamtpreis',
      'bk.l.room': 'Zimmer', 'bk.l.board': 'Verpflegung', 'bk.l.short': 'Kurzaufenthalt', 'bk.l.tax': 'Ortstaxe',
      'bk.pay': 'Anzahlung 30 % per Überweisung, Rest bis eine Woche vor der Anreise.',
      'bk.back': 'Zurück',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail-Adresse', 'f.phone': 'Telefon',
      'f.msg': 'Nachricht an die Gastgeber (optional)',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung der Buchung einverstanden.',
      'f.submit': 'Verbindlich buchen',
      'e.name': 'Bitte geben Sie Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'e.phone': 'Bitte geben Sie eine Telefonnummer an.', 'e.consent': 'Bitte stimmen Sie der Datenschutzerklärung zu.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'Die Buchungsbestätigung würden wir jetzt an {email} senden.',
      'ok.no': 'Buchungsnummer',
      'ok.demo': 'Dies ist eine Beta-Vorschau: Es wurde nichts gebucht und es wurden keine Daten übertragen. Die Verfügbarkeit ist simuliert, die Preise entsprechen der Online-Buchung des Hauses vom 2. Oktober 2026.',
      'ok.close': 'Schließen',
      'map.link': 'In OpenStreetMap öffnen', 'map.pop': 'Kühtrainstraße 14, 6450 Sölden'
    },
    en: {
      'adult1': 'adult', 'adultN': 'adults', 'kid1': 'child', 'kidN': 'children',
      'night1': 'night', 'nightN': 'nights',
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Select date',
      'bw.btn': 'Check availability',
      'room.from': 'from', 'room.unit': 'per room per night', 'room.details': 'Details',
      'room.book': 'Book', 'room.bookThis': 'Book this room', 'room.equip': 'Amenities',
      'room.equipList': ['Double bed', 'Shower, WC and hairdryer', 'Cable TV, radio and telephone', 'Free Wi-Fi',
        'Desk', 'Cot on request'],
      'room.balcony': 'Balcony', 'room.count': 'rooms of this type',
      'room.priceNote': 'For two guests, room only, plus local tax. Breakfast €20, half board in winter €50 per person per night.',
      'room.seasonW': 'in winter 2026/27', 'room.seasonS': 'in summer 2027',
      'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'pt.to': 'to', 'pt.night': 'per night',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.hintIn': 'Please select your arrival date.', 'cal.hintOut': 'Please select your departure date.',
      'cal.reset': 'Reset', 'cal.free': 'available', 'cal.busy': 'fully booked', 'cal.sel': 'your selection',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children (up to 14)', 'bk.age': 'Age of child',
      'bk.less': 'fewer', 'bk.more': 'more',
      'bk.board': 'Meals', 'bk.b0': 'Room only', 'bk.b1': 'With breakfast', 'bk.b2': 'With half board',
      'bk.b1p': '+ €20 per person per night', 'bk.b2p': '+ €50 per person per night',
      'bk.b2off': 'mid-November to end of April only',
      'bk.rooms': 'Choose your room', 'bk.pickDates': 'Select arrival and departure to see prices for your stay.',
      'bk.small': 'too small for your party', 'bk.busy': 'not available for these dates', 'bk.total': 'total',
      'bk.select': 'Select', 'bk.left1': 'Only 1 room left', 'bk.leftN': '{n} rooms left',
      'bk.none': 'Unfortunately no suitable room is available for these dates. Please choose other days or call us: +43 5254 3503.',
      'bk.incl': 'Total price including local tax',
      'bk.short': 'For stays of 1 to 3 nights a supplement of €10 per person per night applies.',
      'bk.summary': 'Your booking', 'bk.room': 'Room', 'bk.stay': 'Dates', 'bk.price': 'Total price',
      'bk.l.room': 'Room', 'bk.l.board': 'Meals', 'bk.l.short': 'Short stay', 'bk.l.tax': 'Local tax',
      'bk.pay': '30% deposit by bank transfer, balance one week before arrival.',
      'bk.back': 'Back',
      'f.name': 'First and last name', 'f.email': 'Email address', 'f.phone': 'Phone',
      'f.msg': 'Message to your hosts (optional)',
      'f.consent': 'I have read the <a href="datenschutz.html" target="_blank" rel="noopener">privacy policy</a> and agree to my details being processed to handle this booking.',
      'f.submit': 'Book now',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid email address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please agree to the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'We would now send the booking confirmation to {email}.',
      'ok.no': 'Booking number',
      'ok.demo': 'This is a beta preview: nothing has been booked and no data has been sent. Availability is simulated; prices match the hotel’s own online booking as of 2 October 2026.',
      'ok.close': 'Close',
      'map.link': 'Open in OpenStreetMap', 'map.pop': 'Kühtrainstraße 14, 6450 Sölden'
    },
    nl: {
      'adult1': 'volwassene', 'adultN': 'volwassenen', 'kid1': 'kind', 'kidN': 'kinderen',
      'night1': 'nacht', 'nightN': 'nachten',
      'bw.in': 'Aankomst', 'bw.out': 'Vertrek', 'bw.guests': 'Gasten', 'bw.pick': 'Datum kiezen',
      'bw.btn': 'Beschikbaarheid bekijken',
      'room.from': 'vanaf', 'room.unit': 'per kamer per nacht', 'room.details': 'Details',
      'room.book': 'Boeken', 'room.bookThis': 'Deze kamer boeken', 'room.equip': 'Voorzieningen',
      'room.equipList': ['Tweepersoonsbed', 'Douche, wc en föhn', 'Kabel-tv, radio en telefoon', 'Gratis wifi',
        'Bureau', 'Babybedje op aanvraag'],
      'room.balcony': 'Balkon', 'room.count': 'kamers van dit type',
      'room.priceNote': 'Voor twee personen, alleen logies, exclusief toeristenbelasting. Ontbijt € 20, in de winter halfpension € 50 per persoon per nacht.',
      'room.seasonW': 'in de winter 2026/27', 'room.seasonS': 'in de zomer 2027',
      'room.photo': 'Foto', 'gal.prev': 'Vorige foto', 'gal.next': 'Volgende foto',
      'pt.to': 'tot', 'pt.night': 'per nacht',
      'cal.prev': 'Vorige maand', 'cal.next': 'Volgende maand',
      'cal.hintIn': 'Kies uw aankomstdag.', 'cal.hintOut': 'Kies uw vertrekdag.',
      'cal.reset': 'Wissen', 'cal.free': 'vrij', 'cal.busy': 'volgeboekt', 'cal.sel': 'uw keuze',
      'bk.guests': 'Gasten', 'bk.adults': 'Volwassenen', 'bk.kids': 'Kinderen (t/m 14 jaar)', 'bk.age': 'Leeftijd kind',
      'bk.less': 'minder', 'bk.more': 'meer',
      'bk.board': 'Verzorging', 'bk.b0': 'Alleen logies', 'bk.b1': 'Met ontbijt', 'bk.b2': 'Met halfpension',
      'bk.b1p': '+ € 20 per persoon per nacht', 'bk.b2p': '+ € 50 per persoon per nacht',
      'bk.b2off': 'alleen van half november tot eind april',
      'bk.rooms': 'Kamer kiezen', 'bk.pickDates': 'Kies aankomst en vertrek om de prijzen voor uw verblijf te zien.',
      'bk.small': 'te klein voor uw gezelschap', 'bk.busy': 'in deze periode bezet', 'bk.total': 'totaal',
      'bk.select': 'Kiezen', 'bk.left1': 'Nog maar 1 kamer vrij', 'bk.leftN': 'Nog {n} kamers vrij',
      'bk.none': 'In deze periode is helaas geen passende kamer vrij. Kies andere dagen of bel ons: +43 5254 3503.',
      'bk.incl': 'Totaalprijs inclusief toeristenbelasting',
      'bk.short': 'Bij 1 tot 3 nachten geldt een toeslag van € 10 per persoon per nacht.',
      'bk.summary': 'Uw boeking', 'bk.room': 'Kamer', 'bk.stay': 'Periode', 'bk.price': 'Totaalprijs',
      'bk.l.room': 'Kamer', 'bk.l.board': 'Verzorging', 'bk.l.short': 'Kort verblijf', 'bk.l.tax': 'Toeristenbelasting',
      'bk.pay': 'Aanbetaling 30 % per overschrijving, rest uiterlijk een week vóór aankomst.',
      'bk.back': 'Terug',
      'f.name': 'Voor- en achternaam', 'f.email': 'E-mailadres', 'f.phone': 'Telefoon',
      'f.msg': 'Bericht aan de gastheer (optioneel)',
      'f.consent': 'Ik heb de <a href="datenschutz.html" target="_blank" rel="noopener">privacyverklaring</a> gelezen en ga akkoord met de verwerking van mijn gegevens voor deze boeking.',
      'f.submit': 'Definitief boeken',
      'e.name': 'Vul uw voor- en achternaam in.', 'e.email': 'Vul een geldig e-mailadres in.',
      'e.phone': 'Vul een telefoonnummer in.', 'e.consent': 'Ga akkoord met de privacyverklaring.',
      'ok.title': 'Hartelijk dank, {name}!', 'ok.text': 'De boekingsbevestiging zouden wij nu naar {email} sturen.',
      'ok.no': 'Boekingsnummer',
      'ok.demo': 'Dit is een bètavoorbeeld: er is niets geboekt en er zijn geen gegevens verzonden. De beschikbaarheid is gesimuleerd; de prijzen komen overeen met de online boeking van het hotel op 2 oktober 2026.',
      'ok.close': 'Sluiten',
      'map.link': 'Openen in OpenStreetMap', 'map.pop': 'Kühtrainstraße 14, 6450 Sölden'
    }
  };

  var META = {
    en: {
      title: 'Gasthof Hotel Zwieselstein · Small hotel between Sölden and Obergurgl',
      desc: 'Family-run inn with ten rooms in the Ötztal valley: ski bus outside the door, Tyrolean kitchen, sauna and ' +
        'steam bath. 4.6 out of 5 from 93 reviews. Winter and summer rates at a glance, book direct.'
    },
    nl: {
      title: 'Gasthof Hotel Zwieselstein · Klein hotel tussen Sölden en Obergurgl',
      desc: 'Familiehotel met tien kamers in het Ötztal: skibus voor de deur, Tiroolse keuken, sauna en stoombad. ' +
        '4,6 van 5 bij 93 beoordelingen. Winter- en zomerprijzen in één oogopslag, direct boeken.'
    }
  };

  var T = {};
  T.en = {
    'beta': 'Beta preview — not a final design',
    'menu': 'Menu', 'close': 'Close', 'brand.aria': 'Gasthof Hotel Zwieselstein – home', 'brand.top': 'Gasthof Hotel Zwieselstein – back to top',
    'nav.rooms': 'Rooms &amp; rates', 'nav.inn': 'The inn', 'nav.season': 'Winter &amp; summer', 'nav.spa': 'Wellness',
    'nav.reviews': 'Reviews', 'nav.arrival': 'Getting here',
    'cta.book': 'Book direct', 'cta.bookShort': 'Book',
    'season.aria': 'Season', 'season.winter': 'Winter', 'season.summer': 'Summer',
    'hero.pre': 'Gasthof Hotel Zwieselstein · Sölden, Ötztal valley',
    'hero.titleW': 'Ten rooms. <br>Two ski areas. <br>No crowds.',
    'hero.titleS': 'Ten rooms. <br>300 kilometres of trails. <br>No crowds.',
    'hero.subW': 'The free ski bus stops a few steps from the house and takes you to the valley stations in Sölden and Gurgl. Run by the Gstrein family for over 100 years.',
    'hero.subS': 'Hiking trails start at the front door, the Timmelsjoch pass is just around the corner, and you receive the Ötztal Summer Card on arrival. Run by the Gstrein family for over 100 years.',
    'hero.noteW': 'Winter 2026/27: double room from €138 per night · half board €50 per person',
    'hero.noteS': 'Summer 2027: double room from €124 per night · breakfast €20 per person',
    'hero.altW': 'Wooden balconies of Gasthof Zwieselstein in front of a snow-covered mountainside',
    'hero.altS': 'Gasthof Zwieselstein in summer with terrace and red parasols in front of a wooded slope',
    'trust.aria': 'Ratings and key figures',
    'trust.1': '93 reviews, summarised on soelden.com',
    'trust.2': 'HolidayCheck · 97% would recommend',
    'trust.3': 'years as the Gstrein family’s inn',
    'trust.4': 'to Sölden · ski bus stop at the house',
    'intro.pre': 'The Gstrein family · for over 100 years',
    'intro.title': 'Away from the bustle, yet right in the middle',
    'intro.text': 'Zwieselstein lies between Sölden and Obergurgl, right at the entrance to the Vent valley. Where mountain farmers of the upper Ötztal once stopped on their way to Imst, guests now stay who love the mountains and like their holiday a little quieter. Ten rooms, old wood-panelled parlours, a sun terrace and a small wellness area – that is all it takes.',
    'intro.host': 'Dominic Gstrein runs the inn today – with a feel for what has stayed and for what is new.',
    'intro.alt': 'Wood-panelled parlour with tiled stove and tables laid in white',
    'intro.bus': 'Ski and hiking bus', 'intro.busV': 'at the door',
    'rooms.pre': 'Ten rooms · timber from the family’s own forest',
    'rooms.title': 'Rooms &amp; rates',
    'rooms.text': 'All rooms have a double bed, shower and WC, hairdryer, cable TV and free Wi-Fi. The rate is per room per night for two guests – the same in every category.',
    'prices.title': 'Rates for both seasons',
    'prices.sub': 'Double room per night for two guests, room only, local tax not included. In brackets: one room for single use.',
    'prices.winter': 'Winter 2026/27', 'prices.summer': 'Autumn 2026 and summer 2027',
    'prices.period': 'Period', 'prices.dbl': '2 guests', 'prices.sgl': '1 guest',
    'ex.1t': 'Breakfast', 'ex.1': '€20 per person per night',
    'ex.2t': 'Half board', 'ex.2': '€50 per person per night, from mid-November to the end of April',
    'ex.3t': 'Local tax', 'ex.3': '€5 per person per night, from age 16',
    'ex.4t': 'Short stay', 'ex.4': 'for 1 to 3 nights, a €10 supplement per person per night',
    'ex.5t': 'Children in their parents’ room', 'ex.5': 'free up to age 2, 55% off from 3 to 8, around one third off from 9 to 14',
    'prices.src': 'Rates as shown in the hotel’s own online booking, as of 2 October 2026. Check-in from 2 pm, check-out by 10 am.',
    'inn.pre': 'The inn &amp; its kitchen',
    'inn.title': 'Here the chef cooks himself',
    'inn.text': 'For over 100 years people have stopped at the inn to sit together and eat well. The kitchen serves honest Tyrolean dishes made with good regional ingredients. The old parlours are still here – their wood tells of long evenings and good company.',
    'inn.f1t': 'In summer', 'inn.f1': 'Rooms with breakfast',
    'inn.f2t': 'In winter', 'inn.f2': 'Rooms with half board',
    'inn.f3t': 'When the sun is out', 'inn.f3': 'Terrace in front of the house',
    'inn.cta': 'Reserve a table: +43&nbsp;5254&nbsp;3503',
    'inn.alt1': 'Long table laid for dinner in the parlour with tiled stove',
    'inn.alt2': 'Corner bench with wooden table in the dining room',
    'inn.alt3': 'House bar with carved bar stools',
    'sea.preW': 'Winter in Sölden', 'sea.preS': 'Summer in the Ötztal',
    'sea.titleW': 'Three directions, plenty of winter', 'sea.titleS': 'Simply higher up',
    'sea.textW': 'In the morning all you decide is where to go: down to Sölden, up to Gurgl or out to quieter Vent. The free ski bus stops a few steps from the hotel – the car stays where it is.',
    'sea.textS': 'Most of our guests come to hike, and the trails start right at the front door. If you would rather ride than walk: the Timmelsjoch pass is practically next door.',
    'w.1t': 'Sölden ski area', 'w.1': 'Runs of every grade, two glaciers and the BIG 3 – three peaks above 3,000 metres served by lifts. 3.5 km from the house.',
    'w.2t': 'Obergurgl-Hochgurgl', 'w.2': 'Runs between 1,800 and 3,080 metres, 23 lifts. 7 km from the house.',
    'w.3t': 'Ski bus', 'w.3': 'Free of charge, stops a few steps from the hotel and runs to the valley stations in Sölden and Gurgl.',
    'w.4t': 'Half board', 'w.4': 'Per person per night, with breakfast and dinner from the house kitchen. Available from mid-November to the end of April.',
    's.1t': 'Marked hiking trails', 's.1': 'In the upper Ötztal, plus 600 surrounding peaks – 174 of them above 3,000 metres – glaciers, mountain lakes, alpine pastures and huts.',
    's.2t': 'Ötztal Summer Card', 's.2': 'Free for hotel guests: buses throughout the valley, each summer lift once a day, pools and museums. In 2026 valid from 4 June to 4 October.',
    's.3t': 'On two wheels', 's.3': 'By mountain bike onto the trails around Sölden, by motorbike over the Timmelsjoch to South Tyrol and Merano.',
    's.4t': 'Breakfast', 's.4': 'Per person per night. Later, back on the terrace: boots off, a cold drink and a view of the mountains.',
    'spa.pre': 'Rest and unwind',
    'spa.title': 'Sauna, steam bath, relaxation room',
    'spa.text': 'After a day on the mountain the small wellness area is waiting: the Tyrolean “Schwitzstube” sauna, the steam bath and a relaxation room to switch off. Sweat a little, relax a little and above all: take your time.',
    'spa.incT': 'Included in the room rate',
    'spa.i1': 'Sauna, steam bath, infrared cabin and solarium', 'spa.i2': 'Wi-Fi throughout the house',
    'spa.i3': 'Parking at the house', 'spa.i4': 'Playground, cot on request',
    'spa.i5': 'Ötztal Summer Card in summer', 'spa.i6': 'Pets are welcome',
    'spa.alt': 'Relaxation room with loungers, shower and glass door to the steam bath',
    'rev.pre': 'Guest reviews', 'rev.title': 'What our guests say',
    'rev.of': '93 reviews from all portals, summarised on soelden.com',
    'rev.date': 'As of 2 October 2026',
    'rev.q1': 'Couple, July 2024 · HolidayCheck', 'rev.q2': 'Couple, February 2019 · HolidayCheck',
    'rev.q3': 'Group, February 2019 · HolidayCheck',
    'rev.link': 'Read all 13 reviews on HolidayCheck (in German)',
    'arr.pre': 'Kühtrainstraße 14 · 6450 Sölden · Tyrol',
    'arr.title': 'The quickest way to your holiday',
    'arr.1t': 'By car', 'arr.1': 'Take the Inntal motorway to the Ötztal exit, then just under 40 kilometres along the Ötztal road. In Zwieselstein turn left right after the bridge – the inn is on the right-hand side. Parking at the house is free.',
    'arr.2t': 'By train and bus', 'arr.2': 'By train to Ötztal station, then by bus or taxi to Zwieselstein. The bus stop is directly in front of the house.',
    'arr.3t': 'By plane', 'arr.3': 'The nearest airport is Innsbruck. Ötztal shuttle services take you to Zwieselstein in about an hour and a half.',
    'arr.4t': 'Arrival and departure', 'arr.4': 'Check-in from 2 pm, check-out by 10 am. In summer the Timmelsjoch pass takes you to the Passeier valley in South Tyrol in no time.',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in the privacy policy (in German)',
    'final.pre': 'Book direct with your hosts',
    'final.title': 'Rooms available! Arrive and feel at home',
    'final.text': 'You book directly with the Gstrein family – at the hotel’s own rates, with no detour via a portal.',
    'final.or': 'Or give us a call:',
    'foot.country': 'Austria', 'foot.legal': 'Legal', 'foot.imprint': 'Legal notice', 'foot.privacy': 'Privacy',
    'foot.photos': 'Photos: Hotel Gasthof Zwieselstein',
    'foot.beta': 'Beta preview – concept &amp; implementation: Olga Tikhomirova',
    'bk.title': 'Book direct', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
  };
  T.nl = {
    'beta': 'Bètavoorbeeld — geen definitief ontwerp',
    'menu': 'Menu', 'close': 'Sluiten', 'brand.aria': 'Gasthof Hotel Zwieselstein – startpagina', 'brand.top': 'Gasthof Hotel Zwieselstein – naar boven',
    'nav.rooms': 'Kamers &amp; prijzen', 'nav.inn': 'Gasthof', 'nav.season': 'Winter &amp; zomer', 'nav.spa': 'Wellness',
    'nav.reviews': 'Beoordelingen', 'nav.arrival': 'Route',
    'cta.book': 'Direct boeken', 'cta.bookShort': 'Boeken',
    'season.aria': 'Seizoen', 'season.winter': 'Winter', 'season.summer': 'Zomer',
    'hero.pre': 'Gasthof Hotel Zwieselstein · Sölden in het Ötztal',
    'hero.titleW': 'Tien kamers. <br>Twee skigebieden. <br>Geen drukte.',
    'hero.titleS': 'Tien kamers. <br>300 kilometer wandelpaden. <br>Geen drukte.',
    'hero.subW': 'De gratis skibus stopt op een paar stappen van het huis en brengt u naar de dalstations in Sölden en Gurgl. Al meer dan 100 jaar gerund door de familie Gstrein.',
    'hero.subS': 'De wandelpaden beginnen voor de deur, de Timmelsjoch ligt om de hoek en de Ötztal Summer Card krijgt u bij aankomst. Al meer dan 100 jaar gerund door de familie Gstrein.',
    'hero.noteW': 'Winter 2026/27: tweepersoonskamer vanaf € 138 per nacht · halfpension € 50 per persoon',
    'hero.noteS': 'Zomer 2027: tweepersoonskamer vanaf € 124 per nacht · ontbijt € 20 per persoon',
    'hero.altW': 'Houten balkons van Gasthof Zwieselstein voor een besneeuwde berghelling',
    'hero.altS': 'Gasthof Zwieselstein in de zomer met terras en rode parasols voor een beboste helling',
    'trust.aria': 'Beoordelingen en kerncijfers',
    'trust.1': '93 beoordelingen, samengevat op soelden.com',
    'trust.2': 'HolidayCheck · 97 % beveelt het aan',
    'trust.3': 'jaar Gasthof van de familie Gstrein',
    'trust.4': 'naar Sölden · skibushalte bij het huis',
    'intro.pre': 'Familie Gstrein · al meer dan 100 jaar',
    'intro.title': 'Weg van de drukte en toch er middenin',
    'intro.text': 'Zwieselstein ligt tussen Sölden en Obergurgl, precies aan het begin van het Ventertal. Waar vroeger de bergboeren uit het achterste Ötztal onderweg naar Imst aanlegden, logeren nu gasten die van de bergen houden en het op vakantie graag wat rustiger aan doen. Tien kamers, oude houten Stuben, een zonneterras en een kleine wellness – meer is niet nodig.',
    'intro.host': 'Dominic Gstrein leidt de Gasthof vandaag – met gevoel voor wat gebleven is en voor wat er nieuw bijkomt.',
    'intro.alt': 'Houten Stube met tegelkachel en wit gedekte tafels',
    'intro.bus': 'Ski- en wandelbus', 'intro.busV': 'voor de deur',
    'rooms.pre': 'Tien kamers · hout uit de eigen bossen',
    'rooms.title': 'Kamers &amp; prijzen',
    'rooms.text': 'Alle kamers hebben een tweepersoonsbed, douche en wc, föhn, kabel-tv en gratis wifi. De prijs geldt per kamer per nacht voor twee personen – in elke categorie dezelfde.',
    'prices.title': 'Prijzen van beide seizoenen',
    'prices.sub': 'Tweepersoonskamer per nacht voor twee personen, alleen logies, exclusief toeristenbelasting. Tussen haakjes: een kamer voor één persoon.',
    'prices.winter': 'Winter 2026/27', 'prices.summer': 'Herfst 2026 en zomer 2027',
    'prices.period': 'Periode', 'prices.dbl': '2 personen', 'prices.sgl': '1 persoon',
    'ex.1t': 'Ontbijt', 'ex.1': '€ 20 per persoon per nacht',
    'ex.2t': 'Halfpension', 'ex.2': '€ 50 per persoon per nacht, van half november tot eind april',
    'ex.3t': 'Toeristenbelasting', 'ex.3': '€ 5 per persoon per nacht, vanaf 16 jaar',
    'ex.4t': 'Kort verblijf', 'ex.4': 'bij 1 tot 3 nachten € 10 toeslag per persoon per nacht',
    'ex.5t': 'Kinderen op de kamer van de ouders', 'ex.5': 't/m 2 jaar gratis, van 3 t/m 8 jaar 55 % korting, van 9 t/m 14 jaar ongeveer een derde',
    'prices.src': 'Prijzen volgens de online boeking van het hotel, stand 2 oktober 2026. Inchecken vanaf 14 uur, uitchecken tot 10 uur.',
    'inn.pre': 'Gasthof &amp; keuken',
    'inn.title': 'Hier kookt de chef zelf',
    'inn.text': 'Al meer dan 100 jaar wordt er in de Gasthof aangeschoven, samen gezeten en goed gegeten. Op tafel komen eerlijke Tiroolse gerechten met goede producten uit de regio. De oude Stuben zijn gebleven – het hout vertelt van lange avonden en gezellige rondes.',
    'inn.f1t': 'In de zomer', 'inn.f1': 'Kamers met ontbijt',
    'inn.f2t': 'In de winter', 'inn.f2': 'Kamers met halfpension',
    'inn.f3t': 'Bij zon', 'inn.f3': 'Terras voor het huis',
    'inn.cta': 'Tafel reserveren: +43&nbsp;5254&nbsp;3503',
    'inn.alt1': 'Lange gedekte tafel in de Stube met tegelkachel',
    'inn.alt2': 'Hoekbank met houten tafel in de gelagkamer',
    'inn.alt3': 'Huisbar met houtgesneden barkrukken',
    'sea.preW': 'Winter in Sölden', 'sea.preS': 'Zomer in het Ötztal',
    'sea.titleW': 'Drie richtingen, volop winter', 'sea.titleS': 'Gewoon hogerop',
    'sea.textW': '’s Ochtends beslist u alleen nog waar het heen gaat: omlaag naar Sölden, omhoog naar Gurgl of naar het rustigere Vent. De gratis skibus stopt op een paar stappen van het hotel – de auto blijft staan.',
    'sea.textS': 'De meeste gasten komen om te wandelen, en de paden beginnen direct voor de deur. Liever rijden dan lopen? De Timmelsjoch ligt praktisch om de hoek.',
    'w.1t': 'Skigebied Sölden', 'w.1': 'Pistes in alle moeilijkheidsgraden, twee gletsjers en de BIG 3 – drie drieduizenders met liften. 3,5 km van het huis.',
    'w.2t': 'Obergurgl-Hochgurgl', 'w.2': 'Pistes tussen 1.800 en 3.080 meter, 23 liften. 7 km van het huis.',
    'w.3t': 'Skibus', 'w.3': 'Gratis, stopt op een paar stappen van het hotel en rijdt naar de dalstations in Sölden en Gurgl.',
    'w.4t': 'Halfpension', 'w.4': 'Per persoon per nacht, met ontbijt en diner uit de keuken van het huis. Te boeken van half november tot eind april.',
    's.1t': 'Gemarkeerde wandelpaden', 's.1': 'In het achterste Ötztal, met 600 toppen rondom – waarvan 174 boven de 3.000 meter –, gletsjers, bergmeren, almen en hutten.',
    's.2t': 'Ötztal Summer Card', 's.2': 'Gratis voor hotelgasten: bus in het hele dal, elke zomerbergbaan één keer per dag, zwembaden en musea. In 2026 geldig van 4 juni tot 4 oktober.',
    's.3t': 'Op twee wielen', 's.3': 'Met de mountainbike over de trails rond Sölden, met de motor over de Timmelsjoch naar Zuid-Tirol en Meran.',
    's.4t': 'Ontbijt', 's.4': 'Per persoon per nacht. Daarna terug naar het terras: schoenen uit, een koel drankje en uitzicht op de bergen.',
    'spa.pre': 'Rusten en ontspannen',
    'spa.title': 'Sauna, stoombad, rustruimte',
    'spa.text': 'Na een dag in de bergen wacht de kleine wellness: de Tiroolse “Schwitzstube”, het stoombad en een rustruimte om af te schakelen. Een beetje zweten, een beetje ontspannen en vooral: tijd hebben.',
    'spa.incT': 'Bij de kamerprijs inbegrepen',
    'spa.i1': 'Sauna, stoombad, infraroodcabine en solarium', 'spa.i2': 'Wifi in het hele huis',
    'spa.i3': 'Parkeerplaats bij het huis', 'spa.i4': 'Speeltuin, babybedje op aanvraag',
    'spa.i5': 'Ötztal Summer Card in de zomer', 'spa.i6': 'Huisdieren zijn welkom',
    'spa.alt': 'Rustruimte met ligbedden, douche en glazen deur naar het stoombad',
    'rev.pre': 'Beoordelingen', 'rev.title': 'Wat onze gasten zeggen',
    'rev.of': '93 beoordelingen van alle portalen, samengevat op soelden.com',
    'rev.date': 'Stand: 2 oktober 2026',
    'rev.q1': 'Als stel in juli 2024 · HolidayCheck', 'rev.q2': 'Als stel in februari 2019 · HolidayCheck',
    'rev.q3': 'Als groep in februari 2019 · HolidayCheck',
    'rev.link': 'Alle 13 beoordelingen op HolidayCheck lezen (Duits)',
    'arr.pre': 'Kühtrainstraße 14 · 6450 Sölden · Tirol',
    'arr.title': 'De snelste weg naar uw vakantie',
    'arr.1t': 'Met de auto', 'arr.1': 'Via de Inntal-snelweg tot afrit Ötztal, daarna krap 40 kilometer over de Ötztal-weg. In Zwieselstein direct na de brug linksaf – de Gasthof ligt aan de rechterkant. Parkeren bij het huis is gratis.',
    'arr.2t': 'Met trein en bus', 'arr.2': 'Met de trein tot station Ötztal, vandaar met de bus of een taxi naar Zwieselstein. De halte ligt direct voor het huis.',
    'arr.3t': 'Met het vliegtuig', 'arr.3': 'De dichtstbijzijnde luchthaven is Innsbruck. Shuttlediensten uit het Ötztal brengen u in ongeveer anderhalf uur naar Zwieselstein.',
    'arr.4t': 'Aankomst en vertrek', 'arr.4': 'Inchecken vanaf 14 uur, uitchecken tot 10 uur. In de zomer bent u via de Timmelsjoch snel in het Zuid-Tiroolse Passeiertal.',
    'map.text': 'De kaart wordt geladen via OpenStreetMap. Daarbij wordt uw IP-adres doorgegeven aan de servers van de OpenStreetMap Foundation.',
    'map.btn': 'Kaart laden', 'map.more': 'Meer in de privacyverklaring (Duits)',
    'final.pre': 'Direct bij de gastheer boeken',
    'final.title': 'Kamers vrij! Aankomen en thuis voelen',
    'final.text': 'U boekt rechtstreeks bij de familie Gstrein – tegen de prijzen van het huis, zonder omweg via een portaal.',
    'final.or': 'Of bel ons:',
    'foot.country': 'Oostenrijk', 'foot.legal': 'Juridisch', 'foot.imprint': 'Colofon', 'foot.privacy': 'Privacy',
    'foot.photos': 'Foto’s: Hotel Gasthof Zwieselstein',
    'foot.beta': 'Bètavoorbeeld – concept &amp; realisatie: Olga Tikhomirova',
    'bk.title': 'Direct boeken', 'bk.step1': 'Periode &amp; kamer', 'bk.step2': 'Uw gegevens', 'bk.step3': 'Bevestiging'
  };

  window.ZWIESEL = { RATES: RATES, RULES: RULES, ROOMS: ROOMS, UI: UI, T: T, META: META };
})();
