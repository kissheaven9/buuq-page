/* Gasthof Sonne — Inhalte: Zimmerdaten, Preise, UI-Texte (DE/IT/EN), Übersetzungen der Seite.
   Deutsch steht direkt im HTML (SEO), Italienisch und Englisch werden über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Preise laut Preisliste gasthof-sonne.com (Stand 20.12.2025): pro Tag und Person.
     rate[Verpflegung] = [niedrigster, höchster Preis der Spanne]. Die Preisliste nennt keine Saisonzeiten –
     die Hauptsaison in SEASON_HIGH ist für diese Vorschau angenommen und vom Haus zu bestätigen.
     max = Personen höchstens (laut suedtirol.info), size = m² laut Booking.com. busy = Demo-Auslastung. */
  var ROOMS = [
    {
      id: 'st', size: 23, max: 2, single: 20, busy: 2,
      rate: { bb: [62, 78], hb: [88, 102] },
      imgs: ['zimmer-st-1', 'zimmer-st-2', 'zimmer-st-3', 'zimmer-st-4'],
      de: {
        name: 'Doppelzimmer Standard',
        cap: 'bis 2 Personen',
        short: 'Doppelbett, Balkon und Bad mit Dusche – neu gestaltet mit hellem Holz und klaren Linien.',
        text: 'Unsere Standardzimmer bieten auf rund 23 m² ein Doppelbett, Balkon, Dusche und WC, Föhn, TV und ' +
          'kostenloses WLAN. Die Zimmer sind neu gestaltet: moderne Linien, alpine Materialien. Der Aufzug ' +
          'bringt Sie bequem nach oben.',
        alts: ['Standardzimmer mit Doppelbett vor einer Holzwand', 'Standardzimmer mit Doppelbett und Schreibplatz',
          'Standardzimmer mit Holzschrank und Fernseher', 'Bad mit Waschtisch und bodenebener Dusche']
      },
      it: {
        name: 'Camera doppia Standard',
        cap: 'fino a 2 persone',
        short: 'Letto matrimoniale, balcone e bagno con doccia – rinnovata, con legno chiaro e linee essenziali.',
        text: 'Le nostre camere Standard offrono su circa 23 m² un letto matrimoniale, balcone, doccia e WC, ' +
          'asciugacapelli, TV e Wi-Fi gratuito. Le camere sono state rinnovate: linee moderne, materiali alpini. ' +
          'L’ascensore vi porta comodamente al piano.',
        alts: ['Camera Standard con letto matrimoniale davanti a una parete in legno',
          'Camera Standard con letto matrimoniale e scrittoio', 'Camera Standard con armadio in legno e televisore',
          'Bagno con lavabo e doccia a filo pavimento']
      },
      en: {
        name: 'Standard double room',
        cap: 'up to 2 guests',
        short: 'Double bed, balcony and bathroom with shower – newly designed with pale wood and clean lines.',
        text: 'Our Standard rooms offer a double bed, balcony, shower and WC, hairdryer, TV and free Wi-Fi on ' +
          'around 23 m². The rooms are newly designed: modern lines, alpine materials. The lift takes you ' +
          'comfortably upstairs.',
        alts: ['Standard room with double bed in front of a wooden wall', 'Standard room with double bed and desk',
          'Standard room with wooden wardrobe and TV', 'Bathroom with washbasin and walk-in shower']
      }
    },
    {
      id: 'su', size: 38, max: 4, single: null, busy: 3,
      rate: { bb: [72, 92], hb: [98, 118] },
      imgs: ['zimmer-su-1', 'zimmer-su-2', 'zimmer-su-3', 'zimmer-su-4'],
      de: {
        name: 'Doppelzimmer Superior',
        cap: 'bis 4 Personen',
        short: 'Deutlich größer: Schlafbereich, eigener Wohnbereich mit Sofa und Balkon.',
        text: 'Die Superior-Zimmer sind mit rund 38 m² deutlich größer: Schlafbereich, eigener Wohnbereich mit ' +
          'Sofa, Balkon sowie ein Bad mit Dusche und Bidet. Platz für bis zu vier Personen – ideal für Familien ' +
          'oder einen längeren Aufenthalt.',
        alts: ['Superior-Zimmer mit Doppelbett und Eichenholz', 'Wohnbereich mit Sofa, dahinter der Schlafbereich',
          'Wohnbereich mit Sitzecke und Garderobe', 'Bad mit Waschtisch, Bidet und Dusche']
      },
      it: {
        name: 'Camera doppia Superior',
        cap: 'fino a 4 persone',
        short: 'Molto più ampia: zona notte, zona giorno separata con divano e balcone.',
        text: 'Con circa 38 m² le camere Superior sono molto più ampie: zona notte, zona giorno separata con ' +
          'divano, balcone e bagno con doccia e bidet. Spazio per un massimo di quattro persone – ideale per ' +
          'famiglie o per un soggiorno più lungo.',
        alts: ['Camera Superior con letto matrimoniale e legno di rovere', 'Zona giorno con divano, dietro la zona notte',
          'Zona giorno con salottino e guardaroba', 'Bagno con lavabo, bidet e doccia']
      },
      en: {
        name: 'Superior double room',
        cap: 'up to 4 guests',
        short: 'Much larger: sleeping area, separate living area with sofa, and balcony.',
        text: 'At around 38 m² the Superior rooms are much larger: a sleeping area, a separate living area with ' +
          'sofa, a balcony and a bathroom with shower and bidet. Space for up to four guests – ideal for ' +
          'families or a longer stay.',
        alts: ['Superior room with double bed and oak wood', 'Living area with sofa, sleeping area behind',
          'Living area with seating corner and wardrobe', 'Bathroom with washbasin, bidet and shower']
      }
    }
  ];

  /* Für die Vorschau angenommene Hauptsaison (Monat-Tag, einschließlich). Vom Haus zu bestätigen. */
  var SEASON_HIGH = [['07-01', '08-31'], ['12-20', '12-31'], ['01-01', '01-06']];
  /* Betriebsferien laut Eintrag auf suedtirolerland.it (abgerufen 2.10.2026): geschlossen 7.–28.1.2027 */
  var CLOSED = [['2027-01-07', '2027-01-27']];
  var CITY_TAX = 3.2;      /* Ortstaxe pro Person ab 14 Jahren und Nacht */
  var CITY_TAX_AGE = 14;

  var UI = {
    de: {
      locale: 'de-DE', approx: 'ca.',
      'bw.title': 'Direkt buchen', 'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste',
      'bw.pick': 'Datum wählen', 'bw.btn': 'Verfügbarkeit prüfen',
      'bw.note': 'Mit Frühstück ab 62 € pro Person · Sarntal Card inklusive',
      adult1: 'Erwachsener', adultN: 'Erwachsene', kid1: 'Kind', kidN: 'Kinder',
      night1: 'Nacht', nightN: 'Nächte', person1: 'Person', personN: 'Personen',
      'room.from': 'ab', 'room.pp': 'pro Person / Tag', 'room.details': 'Details & Fotos', 'room.book': 'Zimmer buchen',
      'room.bookThis': 'Dieses Zimmer buchen', 'room.equip': 'Ausstattung',
      'room.equipList': ['Balkon', 'Dusche / WC', 'Föhn', 'TV', 'Kostenloses WLAN', 'Aufzug im Haus'],
      'room.equipSu': 'Wohnbereich mit Sofa',
      'room.bb': 'mit Frühstück', 'room.hb': 'mit Halbpension',
      'room.priceNote': 'Preis pro Person und Tag, je nach Saison. Sarntal Card inklusive, zzgl. Ortstaxe 3,20 € ab 14 Jahren.',
      'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
      'cal.reset': 'Auswahl zurücksetzen',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder (bis 17 Jahre)',
      'bk.age': 'Alter Kind', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.board': 'Verpflegung', 'bk.bb': 'Mit Frühstück', 'bk.hb': 'Halbpension',
      'bk.bbHint': 'Frühstücksbuffet 7.30–10 Uhr', 'bk.hbHint': 'Frühstück und 3-Gang-Wahlmenü am Abend',
      'bk.toRooms': 'Zimmer anzeigen', 'bk.rooms': 'Zimmer wählen',
      'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl zu klein',
      'bk.noSingle': 'Einzelnutzung nicht verfügbar',
      'bk.total': 'gesamt', 'bk.perNight': 'pro Person / Nacht',
      'bk.single': 'inkl. Aufpreis Einzelnutzung 20 € pro Nacht',
      'bk.kidsNote': 'Preis für {n}. Kinderermäßigung nach Vereinbarung – den Kinderpreis bestätigen wir mit der Buchung.',
      'bk.tax': 'Ortstaxe, vor Ort zu zahlen',
      'bk.season': 'Die Saisonzeiten sind in dieser Vorschau angenommen.',
      'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie Zeitraum oder Gästezahl – ' +
        'oder rufen Sie uns an: +39 0471 623 804.',
      'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
      'bk.boardT': 'Verpflegung', 'bk.price': 'Gesamtpreis', 'bk.priceAdults': 'Preis Erwachsene',
      'bk.incl': 'Sarntal Card inklusive.',
      'bk.cancel': 'Kostenlos stornierbar bis zwei Wochen vor Anreise.',
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
      'map.link': 'In OpenStreetMap öffnen', 'map.popup': 'Astfeld 34, Sarntal'
    },
    it: {
      locale: 'it-IT', approx: 'ca.',
      'bw.title': 'Prenota direttamente', 'bw.in': 'Arrivo', 'bw.out': 'Partenza', 'bw.guests': 'Ospiti',
      'bw.pick': 'Scegli la data', 'bw.btn': 'Verifica disponibilità',
      'bw.note': 'Con colazione da 62 € a persona · Sarntal Card inclusa',
      adult1: 'adulto', adultN: 'adulti', kid1: 'bambino', kidN: 'bambini',
      night1: 'notte', nightN: 'notti', person1: 'persona', personN: 'persone',
      'room.from': 'da', 'room.pp': 'a persona / giorno', 'room.details': 'Dettagli e foto', 'room.book': 'Prenota la camera',
      'room.bookThis': 'Prenota questa camera', 'room.equip': 'Dotazione',
      'room.equipList': ['Balcone', 'Doccia / WC', 'Asciugacapelli', 'TV', 'Wi-Fi gratuito', 'Ascensore'],
      'room.equipSu': 'Zona giorno con divano',
      'room.bb': 'con colazione', 'room.hb': 'con mezza pensione',
      'room.priceNote': 'Prezzo a persona e al giorno, secondo la stagione. Sarntal Card inclusa, più imposta di soggiorno di 3,20 € dai 14 anni.',
      'room.photo': 'Foto', 'gal.prev': 'Foto precedente', 'gal.next': 'Foto successiva',
      'cal.prev': 'Mese precedente', 'cal.next': 'Mese successivo',
      'cal.free': 'libero', 'cal.busy': 'occupato', 'cal.sel': 'la vostra scelta',
      'cal.hintIn': 'Scegliete il giorno di arrivo.', 'cal.hintOut': 'Ora scegliete il giorno di partenza.',
      'cal.reset': 'Annulla la selezione',
      'bk.guests': 'Ospiti', 'bk.adults': 'Adulti', 'bk.kids': 'Bambini (fino a 17 anni)',
      'bk.age': 'Età bambino', 'bk.less': 'meno', 'bk.more': 'più',
      'bk.board': 'Trattamento', 'bk.bb': 'Con colazione', 'bk.hb': 'Mezza pensione',
      'bk.bbHint': 'Colazione a buffet dalle 7.30 alle 10', 'bk.hbHint': 'Colazione e menu serale di 3 portate a scelta',
      'bk.toRooms': 'Mostra le camere', 'bk.rooms': 'Scegliete la camera',
      'bk.select': 'Seleziona', 'bk.busy': 'Occupata in questo periodo', 'bk.small': 'Troppo piccola per questo numero di ospiti',
      'bk.noSingle': 'Uso singola non disponibile',
      'bk.total': 'totale', 'bk.perNight': 'a persona / notte',
      'bk.single': 'incl. supplemento uso singola di 20 € a notte',
      'bk.kidsNote': 'Prezzo per {n}. Riduzione bambini su accordo – confermiamo il prezzo dei bambini con la prenotazione.',
      'bk.tax': 'Imposta di soggiorno, da pagare in loco',
      'bk.season': 'In questa anteprima i periodi stagionali sono ipotizzati.',
      'bk.none': 'Purtroppo per questa combinazione non c’è una camera libera. Modificate il periodo o il numero ' +
        'di ospiti – oppure chiamateci: +39 0471 623 804.',
      'bk.back': 'Indietro', 'bk.summary': 'La vostra prenotazione', 'bk.stay': 'Periodo', 'bk.room': 'Camera',
      'bk.boardT': 'Trattamento', 'bk.price': 'Prezzo totale', 'bk.priceAdults': 'Prezzo adulti',
      'bk.incl': 'Sarntal Card inclusa.',
      'bk.cancel': 'Cancellazione gratuita fino a due settimane prima dell’arrivo.',
      'f.name': 'Nome e cognome', 'f.email': 'Indirizzo e-mail', 'f.phone': 'Telefono',
      'f.msg': 'Richieste o domande (facoltativo)',
      'f.consent': 'Ho letto l’<a href="datenschutz.html" target="_blank" rel="noopener noreferrer">' +
        'informativa sulla privacy</a> e acconsento al trattamento dei miei dati per la gestione della prenotazione.',
      'f.submit': 'Prenota ora',
      'e.name': 'Inserite nome e cognome.', 'e.email': 'Inserite un indirizzo e-mail valido.',
      'e.phone': 'Inserite un numero di telefono al quale possiamo raggiungervi.',
      'e.consent': 'Accettate l’informativa sulla privacy.',
      'ok.title': 'Grazie, {name}!', 'ok.text': 'La prenotazione è confermata. La conferma viene inviata a {email}.',
      'ok.no': 'Numero di prenotazione', 'ok.demo': 'Questa è un’anteprima beta: non è stata effettuata alcuna ' +
        'prenotazione reale e non è stata inviata alcuna e-mail.',
      'ok.close': 'Chiudi', close: 'Chiudi', menu: 'Menu',
      'map.link': 'Apri in OpenStreetMap', 'map.popup': 'Campolasta 34, Sarentino'
    },
    en: {
      locale: 'en-GB', approx: 'approx.',
      'bw.title': 'Book direct', 'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests',
      'bw.pick': 'Select date', 'bw.btn': 'Check availability',
      'bw.note': 'With breakfast from €62 per person · Sarntal Card included',
      adult1: 'adult', adultN: 'adults', kid1: 'child', kidN: 'children',
      night1: 'night', nightN: 'nights', person1: 'person', personN: 'people',
      'room.from': 'from', 'room.pp': 'per person / day', 'room.details': 'Details & photos', 'room.book': 'Book this room',
      'room.bookThis': 'Book this room', 'room.equip': 'Amenities',
      'room.equipList': ['Balcony', 'Shower / WC', 'Hairdryer', 'TV', 'Free Wi-Fi', 'Lift'],
      'room.equipSu': 'Living area with sofa',
      'room.bb': 'with breakfast', 'room.hb': 'with half board',
      'room.priceNote': 'Rate per person and day, depending on the season. Sarntal Card included, plus local tax of €3.20 from age 14.',
      'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'cal.hintIn': 'Please choose your arrival date.', 'cal.hintOut': 'Now choose your departure date.',
      'cal.reset': 'Reset selection',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children (up to 17)',
      'bk.age': 'Age of child', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.board': 'Board', 'bk.bb': 'With breakfast', 'bk.hb': 'Half board',
      'bk.bbHint': 'Breakfast buffet 7.30–10 am', 'bk.hbHint': 'Breakfast and a 3-course choice menu in the evening',
      'bk.toRooms': 'Show rooms', 'bk.rooms': 'Choose your room',
      'bk.select': 'Select', 'bk.busy': 'Booked for these dates', 'bk.small': 'Too small for this number of guests',
      'bk.noSingle': 'Single occupancy not available',
      'bk.total': 'total', 'bk.perNight': 'per person / night',
      'bk.single': 'incl. single-occupancy supplement of €20 per night',
      'bk.kidsNote': 'Price for {n}. Children’s discount by arrangement – we confirm the children’s rate with your booking.',
      'bk.tax': 'Local tax, payable on site',
      'bk.season': 'Season dates are assumed in this preview.',
      'bk.none': 'Unfortunately no room is available for this combination. Please change the dates or number of ' +
        'guests – or call us: +39 0471 623 804.',
      'bk.back': 'Back', 'bk.summary': 'Your booking', 'bk.stay': 'Dates', 'bk.room': 'Room',
      'bk.boardT': 'Board', 'bk.price': 'Total price', 'bk.priceAdults': 'Price for adults',
      'bk.incl': 'Sarntal Card included.',
      'bk.cancel': 'Free cancellation up to two weeks before arrival.',
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
      'map.link': 'Open in OpenStreetMap', 'map.popup': 'Astfeld 34, Sarntal'
    }
  };

  /* Übersetzungen der statischen Seitentexte (Schlüssel = data-i18n im HTML). */
  var T = {};

  T.it = {
    beta: 'Anteprima beta — design non definitivo',
    menu: 'Menu', close: 'Chiudi',
    'brand.sub': 'Val Sarentino · Alto Adige',
    'nav.wellness': 'Wellness', 'nav.rooms': 'Camere', 'nav.roomsLong': 'Camere e prezzi', 'nav.kitchen': 'Cucina',
    'nav.bike': 'Bike', 'nav.area': 'Dintorni', 'nav.arrival': 'Come arrivare', 'nav.house': 'Casa e famiglia',
    'nav.reviews': 'Recensioni',
    'cta.book': 'Prenota ora', 'cta.bookShort': 'Prenota',
    'hero.pre': '3 stelle Superior · Campolasta in Val Sarentino',
    'hero.title': 'Sole, sauna e cucina sarentinese',
    'hero.sub': 'Albergo a gestione familiare con 23 camere e una propria zona wellness – a 19 km da Bolzano. ' +
      'Dal 1959 punto d’incontro per ospiti e gente della valle.',
    'hero.alt': 'L’albergo Sonne a Campolasta: edificio principale con balconi in legno e nuova ala in legno davanti ai boschi',
    'hero.badge': 'su 10 · Booking.com',
    'trust.aria': 'Recensioni e dati principali',
    'trust.booking': 'Booking.com · 57 recensioni', 'trust.bs': 'Booking Südtirol · 62 recensioni',
    'trust.family': 'Famiglia Kröss · terza generazione',
    'trust.bozen': 'da Bolzano · nel cuore delle Alpi Sarentine',
    'well.pre': 'Wellness in casa', 'well.title': 'Sauna, bagno turco e idromassaggio',
    'well.text': 'Dopo l’escursione, il giro in bici o la giornata sugli sci vi aspetta la nostra piccola e ' +
      'raffinata zona wellness – curata in ogni dettaglio.',
    'well.1': 'Sauna finlandese', 'well.2': 'Bagno turco', 'well.3': 'Doccia emozionale profumata',
    'well.4': 'Idromassaggio', 'well.5': 'Solarium', 'well.6': 'Lettini relax',
    'well.n1t': 'Sauna gratuita', 'well.n1': 'per soggiorni a partire da tre giorni',
    'well.n2t': '10 € a seduta', 'well.n2': 'idromassaggio e solarium',
    'well.cta': 'Pianifica il soggiorno',
    'well.alt1': 'Sauna finlandese con panche in legno e secchiello per le gettate',
    'well.alt2': 'Idromassaggio con parete a mosaico nella zona wellness',
    'well.alt3': 'Bagno turco con panche a mosaico', 'well.alt4': 'Zona relax con lettini',
    'well.alt5': 'Asciugamani e secchiello sulla panca della sauna',
    'house.pre': 'Famiglia Kröss · dal 1959', 'house.title': 'Punto d’incontro in Val Sarentino',
    'house.text': 'Il «Sonne» è locanda di paese con ristorante e bar – e insieme albergo con 23 camere e zona ' +
      'wellness. Dal 1959 vengono da noi vacanzieri, chi cerca relax e la gente della valle. Gestiamo la casa ' +
      'da tre generazioni: per chi ama la buona cucina, la natura e lo sport, per escursionisti e appassionati ' +
      'di montagna.',
    'house.quote': '«Saremo lieti di darvi il benvenuto.»',
    'house.sign': 'La famiglia Kröss e il team del Sonne',
    'house.alt': 'Il bar dell’albergo con soffitto in legno, bancone e angoli con sedute',
    'house.f1t': 'Punto d’incontro dal', 'house.f2': '3ª', 'house.f2t': 'generazione della famiglia Kröss',
    'house.f3t': 'camere in due categorie', 'house.f4t': 'posti a sedere al ristorante',
    'rooms.pre': '23 camere · due categorie', 'rooms.title': 'Camere e prezzi',
    'rooms.text': 'Rinnovate, con linee moderne e materiali alpini. I prezzi si intendono a persona e al giorno, ' +
      'secondo la stagione – la Sarntal Card è inclusa.',
    'prices.title': 'Listino prezzi', 'prices.h0': 'Servizio', 'prices.h1': 'Standard', 'prices.h2': 'Superior',
    'prices.r1': 'Pernottamento e colazione', 'prices.r2': 'Mezza pensione',
    'prices.r3': 'Supplemento uso singola', 'prices.r4': 'Imposta di soggiorno (dai 14 anni)',
    'prices.na': 'non disponibile',
    'terms.1': 'Arrivo dalle 14, partenza entro le 11',
    'terms.2': 'Cancellazione gratuita fino a due settimane prima dell’arrivo',
    'terms.3': 'Riduzione bambini su accordo', 'terms.4': 'Animali su richiesta, 25 € a soggiorno',
    'kitchen.pre': 'Ristorante Sonne',
    'kitchen.text': 'Cucina altoatesina classica, regionale e stagionale: canederli di ogni tipo, Gröstl contadino ' +
      'e strudel di mele incontrano influenze italiane e mediterranee, accompagnati soprattutto da vini ' +
      'dell’Alto Adige. Il nostro chef sceglie prodotti preferibilmente dell’Alto Adige e direttamente della ' +
      'Val Sarentino. A servirvi siamo noi padroni di casa – nella Stube rivestita in legno o nella grande sala.',
    'kitchen.f1t': 'Ristorante', 'kitchen.f1': '12–14 e 18–20, martedì giorno di riposo',
    'kitchen.f2t': 'Colazione a buffet', 'kitchen.f2': '7.30–10',
    'kitchen.f3t': 'Mezza pensione', 'kitchen.f3': 'menu di 3 portate a scelta, 4 la domenica e nei festivi',
    'kitchen.cta': 'Prenota un tavolo: +39 0471 623 804',
    'kitchen.cardTitle': 'Dal nostro menù',
    'dish.1': 'Canederli allo speck in brodo',
    'dish.2': 'Mezzelune di spinaci fatte in casa con burro fuso',
    'dish.3': 'Gröstl di carne e patate alla contadina con insalata di cappuccio',
    'dish.4': 'Braciola di manzo con cipolla e patate saltate',
    'dish.5': 'Kaiserschmarren con mirtilli rossi',
    'dish.6': 'Strudel di mele fatto in casa',
    'kitchen.note': 'Estratto dal menù di luglio 2026. Per i piccoli ospiti ci sono piatti dedicati.',
    'kitchen.alt1': 'Sala da pranzo con tavoli apparecchiati, soffitto in legno e vetrate',
    'kitchen.alt2': 'Bistecca di manzo con verdure grigliate e patate su un tagliere di legno',
    'kitchen.alt3': 'Pasta fatta in casa con funghi e pomodoro',
    'kitchen.alt4': 'Dessert con semifreddo ai frutti di bosco su un piatto bianco',
    'bike.pre': 'Bett &amp; Bike Sport', 'bike.title': 'Pensato per chi va in bici',
    'bike.text': 'Mountain bike, e-bike o bici da corsa: come membro degli hotel «Bett &amp; Bike Sport» sappiamo ' +
      'di che cosa hanno bisogno gli appassionati in vacanza. Circa 600 km di strade forestali e trail ' +
      'iniziano davanti alla porta. Da noi trovate mappe, dati GPS e consigli sui percorsi.',
    'bike.1': 'Deposito bici a prova di furto', 'bike.2': 'Angolo riparazioni',
    'bike.3': 'Area lavaggio per le bici', 'bike.4': 'Locale asciugatura per l’attrezzatura',
    'bike.alt1': 'Mountain biker su un trail nelle Alpi Sarentine',
    'bike.alt2': 'Mountain bike parcheggiate nel deposito dell’albergo',
    'area.pre': 'Alpi Sarentine · nel cuore dell’Alto Adige',
    'area.title': '500 km di sentieri davanti alla porta',
    'area.text': 'La Val Sarentino è considerata il polmone verde dell’Alto Adige: oltre 500 km di sentieri ' +
      'segnalati, 120 cime tutt’intorno e d’inverno il comprensorio sciistico di San Martino (Reinswald), ' +
      'a dieci minuti dall’albergo.',
    'area.aria': 'Mete per escursioni', 'area.prev': 'Indietro', 'area.next': 'Avanti',
    'area.t1t': 'Lago di Valdurna', 'area.t1': 'Lago di montagna, uno dei luoghi più belli della valle',
    'area.t1alt': 'Il lago di Valdurna con la chiesa e i pendii boscosi',
    'area.t2': 'Un centinaio di omini di pietra a 2.000 m · giro ad anello di circa 5 ore',
    'area.t2alt': 'Omini di pietra sull’altopiano degli Stoanerne Mandln',
    'area.t3t': 'Santa Croce di Lazfons', 'area.t3': 'Gita di un giorno per la Cima San Cassiano · vista sulle Dolomiti',
    'area.t3alt': 'La chiesa di Santa Croce di Lazfons con la bandiera tirolese sopra la valle',
    'area.t4t': 'Bus degli escursionisti', 'area.t4': 'Ai punti di partenza dei tour · gratuito con la Sarntal Card',
    'area.t4alt': 'Vista sui prati verso un paese della Val Sarentino',
    'area.t5t': 'Bolzano', 'area.t5': '19 km · centro storico, portici e musei',
    'area.t5alt': 'Case del centro storico di Bolzano con il Catinaccio sullo sfondo',
    'area.t6t': 'San Martino d’inverno', 'area.t6': 'Comprensorio sciistico a 7,5 km · 14 km di piste, pista da slittino di 4,5 km',
    'area.t6alt': 'Pendii e boschi innevati nella Val Sarentino invernale',
    'rev.pre': 'Recensioni', 'rev.title': 'Che cosa dicono i nostri ospiti',
    'rev.of': 'su 10 · 57 recensioni su Booking.com',
    'rev.s1': 'Pulizia', 'rev.s2': 'Comfort', 'rev.s3': 'Servizi', 'rev.s4': 'Rapporto qualità-prezzo', 'rev.s5': 'Staff',
    'rev.date': 'Aggiornato al 2 ottobre 2026',
    'rev.q1': 'Soggiorno ad agosto 2025 · HolidayCheck', 'rev.q2': 'Soggiorno ad agosto 2026 · HolidayCheck',
    'rev.q3': 'Ospite dalla Francia · Booking.com',
    'rev.b1': 'Booking Südtirol · 62 recensioni', 'rev.b2': 'HolidayCheck · 100 % lo consiglia',
    'rev.link': 'Leggi le recensioni su HolidayCheck',
    'arr.pre': 'Campolasta 34 · 39058 Sarentino · Alto Adige', 'arr.title': 'Come arrivare',
    'arr.1t': 'In auto',
    'arr.1': 'Da Bolzano una strada di montagna ben tenuta attraversa la gola della Val Sarentino – fino a ' +
      'Campolasta sono 19 km. Da Monaco di Baviera sono 240 km, da Zurigo 374 km. Il parcheggio è presso l’albergo.',
    'arr.2t': 'In treno e autobus',
    'arr.2': 'In treno fino a Bolzano (Trenitalia, ÖBB, DB). Da lì gli autobus per la Val Sarentino partono ogni ' +
      'mezz’ora nei giorni feriali, più volte al giorno la domenica e nei festivi. La navetta Südtirol ' +
      'Transfer vi porta dalla stazione fino all’albergo.',
    'arr.3t': 'Arrivo e partenza',
    'arr.3': 'La camera è pronta dalle 14 e va liberata entro le 11 del giorno di partenza. Vi preghiamo di ' +
      'avvisarci se arrivate dopo le 19.',
    'map.text': 'La mappa viene caricata da OpenStreetMap. Il vostro indirizzo IP viene trasmesso ai server ' +
      'della OpenStreetMap Foundation.',
    'map.btn': 'Carica la mappa', 'map.more': 'Maggiori informazioni nell’informativa sulla privacy',
    'final.pre': 'Prenotate direttamente dalla famiglia Kröss', 'final.title': 'Il vostro posto al sole',
    'final.text': 'Scegliete il periodo e prenotate direttamente da noi – senza passare da un portale. ' +
      'Fino a due settimane prima dell’arrivo la cancellazione è gratuita.',
    'final.or': 'Oppure chiamateci:',
    'foot.claim': 'Albergo e locanda con zona wellness, 3 stelle Superior. A gestione familiare dal 1959.',
    'foot.addrT': 'Indirizzo', 'foot.country': 'Italia', 'foot.contactT': 'Contatti', 'foot.legalT': 'Note legali',
    'foot.imprint': 'Colophon', 'foot.privacy': 'Privacy',
    'foot.photos': 'Foto: Gasthof Sonne, LIVE-STYLE Agency / Daniel Mair e altri – vedi colophon',
    'foot.beta': 'Anteprima beta – concept e realizzazione: Olga Tikhomirova',
    'bk.title': 'Prenota direttamente', 'bk.step1': 'Periodo', 'bk.step2': 'Camera', 'bk.step3': 'I vostri dati',
    'bk.step4': 'Conferma'
  };

  T.en = {
    beta: 'Beta preview — not a final design',
    menu: 'Menu', close: 'Close',
    'brand.sub': 'Sarntal · South Tyrol',
    'nav.wellness': 'Wellness', 'nav.rooms': 'Rooms', 'nav.roomsLong': 'Rooms &amp; rates', 'nav.kitchen': 'Dining',
    'nav.bike': 'Bike', 'nav.area': 'Surroundings', 'nav.arrival': 'Getting here', 'nav.house': 'House &amp; family',
    'nav.reviews': 'Reviews',
    'cta.book': 'Book direct', 'cta.bookShort': 'Book',
    'hero.pre': '3-star Superior · Astfeld in the Sarntal valley',
    'hero.title': 'Sun, sauna and Sarntal cooking',
    'hero.sub': 'A family-run inn with 23 rooms and its own wellness area – 19 km from Bolzano. A meeting place ' +
      'for holidaymakers and locals since 1959.',
    'hero.alt': 'Gasthof Sonne in Astfeld: main house with wooden balconies and the new timber wing in front of wooded mountains',
    'hero.badge': 'out of 10 · Booking.com',
    'trust.aria': 'Ratings and key facts',
    'trust.booking': 'Booking.com · 57 reviews', 'trust.bs': 'Booking Südtirol · 62 reviews',
    'trust.family': 'Kröss family · third generation',
    'trust.bozen': 'to Bolzano · in the heart of the Sarntal Alps',
    'well.pre': 'Wellness in the house', 'well.title': 'Sauna, steam bath and whirlpool',
    'well.text': 'After the hike, the bike tour or the day on skis, our small but fine wellness area awaits – ' +
      'furnished with great attention to detail.',
    'well.1': 'Finnish sauna', 'well.2': 'Steam bath', 'well.3': 'Scented experience shower',
    'well.4': 'Whirlpool', 'well.5': 'Solarium', 'well.6': 'Relaxation loungers',
    'well.n1t': 'Sauna free of charge', 'well.n1': 'for stays of three days or more',
    'well.n2t': '€10 per session', 'well.n2': 'whirlpool and solarium',
    'well.cta': 'Plan your stay',
    'well.alt1': 'Finnish sauna with wooden benches and infusion bucket',
    'well.alt2': 'Whirlpool with mosaic wall in the wellness area',
    'well.alt3': 'Steam bath with mosaic benches', 'well.alt4': 'Relaxation area with loungers',
    'well.alt5': 'Towels and infusion bucket on the sauna bench',
    'house.pre': 'The Kröss family · since 1959', 'house.title': 'The valley’s meeting place',
    'house.text': 'The “Sonne” is a village inn with restaurant and bar – and at the same time a hotel with ' +
      '23 rooms and a wellness area. Since 1959 holidaymakers, people seeking rest and locals from the Sarntal ' +
      'valley have all been coming to us. We run the house in the third generation: for food lovers, nature ' +
      'and sports fans, hikers and mountain enthusiasts.',
    'house.quote': '“We look forward to welcoming you.”',
    'house.sign': 'The Kröss family &amp; the Sonne team',
    'house.alt': 'The inn’s bar with wooden ceiling, counter and seating corners',
    'house.f1t': 'Meeting place since', 'house.f2': '3rd', 'house.f2t': 'generation of the Kröss family',
    'house.f3t': 'rooms in two categories', 'house.f4t': 'seats in the restaurant',
    'rooms.pre': '23 rooms · two categories', 'rooms.title': 'Rooms &amp; rates',
    'rooms.text': 'Newly designed, with modern lines and alpine materials. Rates are per person and day, ' +
      'depending on the season – the Sarntal Card is included.',
    'prices.title': 'Price list', 'prices.h0': 'Service', 'prices.h1': 'Standard', 'prices.h2': 'Superior',
    'prices.r1': 'Bed and breakfast', 'prices.r2': 'Half board',
    'prices.r3': 'Single-occupancy supplement', 'prices.r4': 'Local tax (from age 14)',
    'prices.na': 'not available',
    'terms.1': 'Check-in from 2 pm, check-out by 11 am',
    'terms.2': 'Free cancellation up to two weeks before arrival',
    'terms.3': 'Children’s discount by arrangement', 'terms.4': 'Pets on request, €25 per stay',
    'kitchen.pre': 'Restaurant Sonne',
    'kitchen.text': 'Classic South Tyrolean cooking, regional and seasonal: dumplings of all kinds, farmer’s ' +
      'Gröstl and apple strudel meet Italian and Mediterranean influences, with wines mainly from South Tyrol. ' +
      'Our chef uses produce preferably from South Tyrol and straight from the Sarntal valley. We, your hosts, ' +
      'serve you in person – in the wood-panelled parlour or in the large dining room.',
    'kitchen.f1t': 'Restaurant', 'kitchen.f1': '12–2 pm and 6–8 pm, closed on Tuesdays',
    'kitchen.f2t': 'Breakfast buffet', 'kitchen.f2': '7.30–10 am',
    'kitchen.f3t': 'Half board', 'kitchen.f3': '3-course choice menu, 4 courses on Sundays and public holidays',
    'kitchen.cta': 'Reserve a table: +39 0471 623 804',
    'kitchen.cardTitle': 'From the menu',
    'dish.1': 'Bacon dumpling soup',
    'dish.2': 'Homemade Schlutzkrapfen (spinach ravioli) with brown butter',
    'dish.3': 'Farmer’s Gröstl (pan-fried beef and potatoes) with cabbage salad',
    'dish.4': 'Tyrolean roast beef with onions and fried potatoes',
    'dish.5': 'Kaiserschmarren with cranberries',
    'dish.6': 'Homemade apple strudel',
    'kitchen.note': 'Excerpt from the menu of July 2026. There are separate dishes for our young guests.',
    'kitchen.alt1': 'Dining room with laid tables, wooden ceiling and window front',
    'kitchen.alt2': 'Beef steak with grilled vegetables and potato wedges on a wooden board',
    'kitchen.alt3': 'Homemade pasta with mushrooms and tomato',
    'kitchen.alt4': 'Dessert with berry parfait on a white plate',
    'bike.pre': 'Bett &amp; Bike Sport', 'bike.title': 'Made for cyclists',
    'bike.text': 'Mountain bike, e-bike or road bike: as a member of the “Bett &amp; Bike Sport” hotels we know ' +
      'what cycling enthusiasts need on holiday. Around 600 km of forest roads and trails start at the hotel ' +
      'door. We provide bike maps, GPS data and tour tips.',
    'bike.1': 'Theft-proof bike room', 'bike.2': 'Repair corner',
    'bike.3': 'Wash station for bikes', 'bike.4': 'Drying room for your gear',
    'bike.alt1': 'Mountain bikers on a trail in the Sarntal Alps',
    'bike.alt2': 'Mountain bikes parked in the hotel’s bike room',
    'area.pre': 'Sarntal Alps · in the heart of South Tyrol',
    'area.title': '500 km of hiking trails on the doorstep',
    'area.text': 'The Sarntal valley is known as the green lung of South Tyrol: over 500 km of signposted ' +
      'hiking trails, 120 peaks all around and, in winter, the Reinswald ski area ten minutes from the house.',
    'area.aria': 'Places to visit', 'area.prev': 'Back', 'area.next': 'Next',
    'area.t1t': 'Lake Durnholz', 'area.t1': 'Mountain lake and one of the valley’s scenic highlights',
    'area.t1alt': 'Lake Durnholz with its church and wooded slopes',
    'area.t2': 'Around a hundred stone cairns at 2,000 m · circular hike of about 5 hours',
    'area.t2alt': 'Stone cairns on the plateau of the Stoanerne Mandln',
    'area.t3t': 'Latzfonser Kreuz', 'area.t3': 'Day hike via the Kassiansspitze · views of the Dolomites',
    'area.t3alt': 'The church at Latzfonser Kreuz with the Tyrolean flag above the valley',
    'area.t4t': 'Hikers’ bus', 'area.t4': 'To the trailheads · free with the Sarntal Card',
    'area.t4alt': 'View across meadows to a village in the Sarntal valley',
    'area.t5t': 'Bolzano', 'area.t5': '19 km · old town, arcades and museums',
    'area.t5alt': 'Old-town houses in Bolzano with the Rosengarten massif in the background',
    'area.t6t': 'Reinswald in winter', 'area.t6': 'Ski area 7.5 km away · 14 km of slopes, 4.5 km toboggan run',
    'area.t6alt': 'Snow-covered slopes and forests in the wintry Sarntal valley',
    'rev.pre': 'Guest reviews', 'rev.title': 'What our guests say',
    'rev.of': 'out of 10 · 57 reviews on Booking.com',
    'rev.s1': 'Cleanliness', 'rev.s2': 'Comfort', 'rev.s3': 'Facilities', 'rev.s4': 'Value for money', 'rev.s5': 'Staff',
    'rev.date': 'As of 2 October 2026',
    'rev.q1': 'Stayed in August 2025 · HolidayCheck', 'rev.q2': 'Stayed in August 2026 · HolidayCheck',
    'rev.q3': 'Guest from France · Booking.com',
    'rev.b1': 'Booking Südtirol · 62 reviews', 'rev.b2': 'HolidayCheck · 100% recommend',
    'rev.link': 'Read the reviews on HolidayCheck',
    'arr.pre': 'Astfeld 34 · 39058 Sarntal · South Tyrol', 'arr.title': 'Getting here',
    'arr.1t': 'By car',
    'arr.1': 'From Bolzano a well-built mountain road leads through the Sarntal gorge into the valley – it is ' +
      '19 km to Astfeld. Munich is 240 km away, Zurich 374 km. Parking is available at the house.',
    'arr.2t': 'By train and bus',
    'arr.2': 'By train to Bolzano (DB, ÖBB, Trenitalia). From there buses run into the Sarntal valley every ' +
      'half hour on weekdays and several times a day on Sundays and public holidays. The Südtirol Transfer ' +
      'shuttle takes you from the station to the inn.',
    'arr.3t': 'Arrival and departure',
    'arr.3': 'Your room is ready from 2 pm and should be vacated by 11 am on the day of departure. Please let ' +
      'us know if you arrive after 7 pm.',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the ' +
      'OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'final.pre': 'Book directly with the Kröss family', 'final.title': 'Your place in the sun',
    'final.text': 'Choose your dates and book directly with us – without the detour via a portal. ' +
      'Cancellation is free up to two weeks before arrival.',
    'final.or': 'Or give us a call:',
    'foot.claim': 'Hotel and inn with wellness area, 3-star Superior. Family-run since 1959.',
    'foot.addrT': 'Address', 'foot.country': 'Italy', 'foot.contactT': 'Contact', 'foot.legalT': 'Legal',
    'foot.imprint': 'Legal notice', 'foot.privacy': 'Privacy',
    'foot.photos': 'Photos: Gasthof Sonne, LIVE-STYLE Agency / Daniel Mair and others – see legal notice',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'bk.title': 'Book direct', 'bk.step1': 'Dates', 'bk.step2': 'Room', 'bk.step3': 'Your details',
    'bk.step4': 'Confirmation'
  };

  var META = {
    it: {
      title: 'Albergo Sonne Val Sarentino · 3 stelle Superior con wellness vicino a Bolzano',
      desc: '23 camere, sauna, bagno turco e cucina altoatesina a Campolasta in Val Sarentino, a 19 km da ' +
        'Bolzano. Famiglia Kröss, dal 1959. 9,5 su 10 su Booking.com. Prenotate direttamente.'
    },
    en: {
      title: 'Gasthof Sonne Sarntal · 3-star Superior inn with wellness near Bolzano',
      desc: '23 rooms, sauna, steam bath and South Tyrolean cooking in Astfeld in the Sarntal valley, 19 km ' +
        'from Bolzano. The Kröss family, since 1959. Rated 9.5 out of 10 on Booking.com. Book direct.'
    }
  };

  window.SONNE = {
    ROOMS: ROOMS, UI: UI, T: T, META: META, SEASON_HIGH: SEASON_HIGH, CLOSED: CLOSED,
    CITY_TAX: CITY_TAX, CITY_TAX_AGE: CITY_TAX_AGE
  };
})();
