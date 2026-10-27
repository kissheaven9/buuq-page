/* Hotel Wildhorn, Lauenen — Inhalte: Zimmer (Preisliste 2027), Karte (Herbst 2026), UI-Texte und Übersetzungen (DE/EN/FR).
   Deutsch steht direkt im HTML; Englisch und Französisch werden über data-i18n eingesetzt.
   Quellen: wildhorn.ch (Preisliste-Zimmer-2027docx.pdf, Speisekarte-Herbst-mit-Wild-2026.pdf, Wild-im-Wildhorn-2026-1.pdf,
   Dessertkarte-2026.pdf, Zimmerseiten), Beschrieb-Hotel-Restaurant.pdf, gstaad.ch (Betriebsferien), Booking.com (26.10.2026). */
(function () {
  'use strict';

  /* Saisonzeiten laut Preisliste 2027. Herbst 2026 (bis 29.11.) wird wie die Zwischensaison 2027 behandelt (Annahme, im DEV-LOG).
     30.11.–17.12.2026 geschlossen (gstaad.ch, 26.10.2026). */
  var SEASONS = [
    { from: '2026-10-18', to: '2026-11-29', s: 'zwischen' },
    { from: '2026-12-18', to: '2027-03-28', s: 'saison' },
    { from: '2027-03-29', to: '2027-05-31', s: 'zwischen' },
    { from: '2027-06-01', to: '2027-10-17', s: 'saison' },
    { from: '2027-10-18', to: '2027-11-30', s: 'zwischen' },
    { from: '2027-12-17', to: '2028-03-30', s: 'saison' }
  ];
  var CLOSED = [{ from: '2026-11-30', to: '2026-12-17' }];

  /* Preise pro Zimmer und Nacht in CHF, inkl. Frühstücksbuffet, Taxen und MwSt (Preisliste 2027).
     prices[persons] = { zwischen, saison }. extra = Zusatzbett ab 16 Jahren (CHF 50). */
  var ROOMS = [
    {
      id: 'rustik', max: 2, busy: 2,
      prices: { 1: { zwischen: 95, saison: 110 }, 2: { zwischen: 160, saison: 180 } },
      imgs: ['zimmer-rustik-1', 'zimmer-rustik-2', 'zimmer-rustik-3', 'zimmer-bad'],
      de: {
        name: 'Rustik', cap: '1–2 Personen · Etagenbad',
        short: 'Lavabo im Zimmer, Dusche und WC auf der Etage, zum Teil mit Balkon.',
        text: 'Die einfachen Zimmer unter dem Dach von 1900: Lavabo und Schreibtisch im Zimmer, Bad mit Dusche und WC auf der Etage. Zum Teil mit Balkon.',
        equip: ['Lavabo im Zimmer', 'Dusche und WC auf der Etage', 'Radio und TV', 'Schreibtisch', 'zum Teil Balkon', 'WLAN'],
        alts: ['Rustik-Zimmer mit Holzwänden, Doppelbett mit rot-weiss karierten Kissen und Sofa', 'Rustik-Zimmer unter der Dachschräge mit Bett und Sitzbank', 'Rustik-Zimmer mit Doppelbett, Balkontür und Blick ins Grüne', 'Etagenbad mit Dusche, Badewanne und WC']
      },
      en: {
        name: 'Rustik', cap: '1–2 guests · shared bathroom',
        short: 'Washbasin in the room, shower and toilet on the floor, some with balcony.',
        text: 'The simple rooms under the roof of 1900: washbasin and desk in the room, bathroom with shower and toilet on the floor. Some with balcony.',
        equip: ['Washbasin in the room', 'Shower and toilet on the floor', 'Radio and TV', 'Desk', 'Some with balcony', 'Wi-Fi'],
        alts: ['Rustik room with wooden walls, double bed with red-and-white checked pillows and a sofa', 'Rustik room under the sloping roof with bed and bench', 'Rustik room with double bed, balcony door and green view', 'Shared bathroom with shower, bathtub and toilet']
      },
      fr: {
        name: 'Rustik', cap: '1–2 personnes · salle de bain à l’étage',
        short: 'Lavabo dans la chambre, douche et WC à l’étage, en partie avec balcon.',
        text: 'Les chambres simples sous le toit de 1900 : lavabo et bureau dans la chambre, salle de bain avec douche et WC à l’étage. En partie avec balcon.',
        equip: ['Lavabo dans la chambre', 'Douche et WC à l’étage', 'Radio et TV', 'Bureau', 'En partie balcon', 'Wi-Fi'],
        alts: ['Chambre Rustik aux murs en bois, lit double avec coussins à carreaux rouges et blancs et canapé', 'Chambre Rustik sous les combles avec lit et banc', 'Chambre Rustik avec lit double, porte-fenêtre et vue sur la verdure', 'Salle de bain à l’étage avec douche, baignoire et WC']
      }
    },
    {
      id: 'einzel', max: 1, busy: 2,
      prices: { 1: { zwischen: 100, saison: 110 } },
      imgs: ['zimmer-einzel-1'],
      de: {
        name: 'Einzel', cap: '1 Person · Dusche',
        short: 'Einzelzimmer mit eigener Dusche, Radio und TV.',
        text: 'Das Einzelzimmer mit eigener Dusche – für alle, die allein unterwegs sind: Bett, Schreibtisch, Radio und TV.',
        equip: ['Eigene Dusche', 'Radio und TV', 'Schreibtisch', 'WLAN'],
        alts: ['Einzelzimmer mit Holzwänden, Bett mit kariertem Kissen und Mohnblumenbild']
      },
      en: {
        name: 'Single', cap: '1 guest · shower',
        short: 'Single room with its own shower, radio and TV.',
        text: 'The single room with its own shower – for those travelling alone: bed, desk, radio and TV.',
        equip: ['Own shower', 'Radio and TV', 'Desk', 'Wi-Fi'],
        alts: ['Single room with wooden walls, bed with checked pillow and a poppy painting']
      },
      fr: {
        name: 'Simple', cap: '1 personne · douche',
        short: 'Chambre simple avec douche privée, radio et TV.',
        text: 'La chambre simple avec douche privée, pour qui voyage seul : lit, bureau, radio et TV.',
        equip: ['Douche privée', 'Radio et TV', 'Bureau', 'Wi-Fi'],
        alts: ['Chambre simple aux murs en bois, lit avec coussin à carreaux et tableau de coquelicots']
      }
    },
    {
      id: 'standard', max: 3, busy: 3, extra: 50,
      prices: { 1: { zwischen: 140, saison: 150 }, 2: { zwischen: 190, saison: 200 } },
      imgs: ['zimmer-standard-1', 'zimmer-standard-2', 'zimmer-standard-3'],
      de: {
        name: 'Standard Doppel', cap: '1–3 Personen · Dusche/WC',
        short: 'Eigene Dusche/WC, kleine Sitzecke, teilweise Balkon mit Blick nach Süden.',
        text: 'Heimelige Zimmer mit eigener Dusche/WC, Lavabo und Föhn, kleiner Sitzecke und Schreibtisch. Teilweise mit Balkon und Aussicht Richtung Süden. Mit Zusatzbett als Familienzimmer geeignet.',
        equip: ['Eigene Dusche/WC, Lavabo, Föhn', 'Radio und TV', 'Kleine Sitzecke, Schreibtisch', 'Teilweise Balkon, Aussicht Richtung Süden', 'Zusatzbett möglich (CHF 50)', 'WLAN'],
        alts: ['Standard-Zimmer mit Sofa unter der Dachschräge und offener Balkontür', 'Standard-Zimmer mit Doppelbett, Holzwänden und Fenster zum Tal', 'Standard-Zimmer mit Bett, Sitzecke und Balkon']
      },
      en: {
        name: 'Standard double', cap: '1–3 guests · shower/WC',
        short: 'Own shower/WC, small seating area, some with south-facing balcony.',
        text: 'Cosy rooms with their own shower/WC, washbasin and hairdryer, a small seating area and desk. Some with balcony and view to the south. With an extra bed suitable as a family room.',
        equip: ['Own shower/WC, washbasin, hairdryer', 'Radio and TV', 'Small seating area, desk', 'Some with balcony facing south', 'Extra bed possible (CHF 50)', 'Wi-Fi'],
        alts: ['Standard room with sofa under the sloping roof and open balcony door', 'Standard room with double bed, wooden walls and window to the valley', 'Standard room with bed, seating area and balcony']
      },
      fr: {
        name: 'Double Standard', cap: '1–3 personnes · douche/WC',
        short: 'Douche/WC privés, petit coin salon, en partie balcon côté sud.',
        text: 'Chambres chaleureuses avec douche/WC privés, lavabo et sèche-cheveux, petit coin salon et bureau. En partie avec balcon et vue vers le sud. Avec lit d’appoint, elles conviennent aux familles.',
        equip: ['Douche/WC privés, lavabo, sèche-cheveux', 'Radio et TV', 'Petit coin salon, bureau', 'En partie balcon, vue vers le sud', 'Lit d’appoint possible (CHF 50)', 'Wi-Fi'],
        alts: ['Chambre Standard avec canapé sous les combles et porte-fenêtre ouverte', 'Chambre Standard avec lit double, murs en bois et fenêtre sur la vallée', 'Chambre Standard avec lit, coin salon et balcon']
      }
    },
    {
      id: 'comfort', max: 2, busy: 3,
      prices: { 1: { zwischen: 200, saison: 220 }, 2: { zwischen: 200, saison: 220 } },
      imgs: ['zimmer-comfort-1', 'zimmer-comfort-2', 'zimmer-comfort-3'],
      de: {
        name: 'Comfort Doppel', cap: '2 Personen · Dusche/WC',
        short: 'Das grössere Doppelzimmer mit Sitzgruppe, Dusche/WC, Radio und TV.',
        text: 'Das grössere Doppelzimmer: Sitzgruppe mit Sesseln und Tisch, eigene Dusche/WC, Radio und TV.',
        equip: ['Eigene Dusche/WC', 'Sitzgruppe mit Sesseln', 'Radio und TV', 'Schreibtisch', 'WLAN'],
        alts: ['Comfort-Zimmer mit Doppelbett, Sitzgruppe, Fernseher und mehreren Fenstern', 'Comfort-Zimmer mit Doppelbett, blauen Sesseln und Holzdecke', 'Comfort-Zimmer mit Bett, blauem Sessel und Lampe']
      },
      en: {
        name: 'Comfort double', cap: '2 guests · shower/WC',
        short: 'The larger double room with seating area, shower/WC, radio and TV.',
        text: 'The larger double room: seating area with armchairs and table, own shower/WC, radio and TV.',
        equip: ['Own shower/WC', 'Seating area with armchairs', 'Radio and TV', 'Desk', 'Wi-Fi'],
        alts: ['Comfort room with double bed, seating area, TV and several windows', 'Comfort room with double bed, blue armchairs and wooden ceiling', 'Comfort room with bed, blue armchair and lamp']
      },
      fr: {
        name: 'Double Comfort', cap: '2 personnes · douche/WC',
        short: 'La chambre double plus grande avec coin salon, douche/WC, radio et TV.',
        text: 'La chambre double plus grande : coin salon avec fauteuils et table, douche/WC privés, radio et TV.',
        equip: ['Douche/WC privés', 'Coin salon avec fauteuils', 'Radio et TV', 'Bureau', 'Wi-Fi'],
        alts: ['Chambre Comfort avec lit double, coin salon, téléviseur et plusieurs fenêtres', 'Chambre Comfort avec lit double, fauteuils bleus et plafond en bois', 'Chambre Comfort avec lit, fauteuil bleu et lampe']
      }
    }
  ];

  /* Karte: Auszug, Preise CHF inkl. 8,1 % MwSt (Speisekarte Herbst mit Wild 2026, Wild im Wildhorn 2026, Dessertkarte 2026) */
  var MENU = [
    { id: 'wild', items: [
      ['Hirschbratwurst an Zwiebelrahmsauce', 'Venison sausage with onion cream sauce', 'Saucisse de cerf, sauce aux oignons à la crème', '32.00'],
      ['Hirschgeschnetzeltes an Wildrahmsauce', 'Sliced venison in creamy game sauce', 'Émincé de cerf, sauce chasse à la crème', '33.00'],
      ['Gemspfeffer nach Wildhorn Art', 'Jugged chamois, Wildhorn style', 'Civet de chamois façon Wildhorn', '38.00'],
      ['Rehmedaillons mit Wildrahmsauce', 'Venison medallions with creamy game sauce', 'Médaillons de chevreuil, sauce chasse à la crème', '42.00'],
      ['Hirschentrecôte an Rotweinsauce', 'Venison entrecôte with red wine sauce', 'Entrecôte de cerf, sauce au vin rouge', '45.00'],
      ['Rehrücken, ab 2 Personen, in zwei Services', 'Saddle of venison, from 2 guests, served in two courses', 'Selle de chevreuil, dès 2 personnes, en deux services', '58.00 p.P.'],
      ['«Wildes» Gemüseteller: Spätzli, Rotkraut, Rosenkohl, Kastanien, Birne, Apfel', '“Wild” vegetable plate: Spätzli, red cabbage, Brussels sprouts, chestnuts, pear, apple', 'Assiette «chasse» végétarienne : Spätzli, chou rouge, choux de Bruxelles, marrons, poire, pomme', '26.00']
    ] },
    { id: 'lauenen', items: [
      ['Lauener Trockenfleischteller', 'Dried beef from Lauenen', 'Viande séchée de Lauenen', '28.50'],
      ['Lauener Hobelkäse', 'Shaved cheese from Lauenen', 'Fromage en rebibes de Lauenen', '19.00'],
      ['Wildhornteller: Trockenfleisch, Coppa, Rohschinken, Speck, Wurst, Bergkäse', 'Wildhorn platter: dried beef, coppa, raw ham, bacon, sausage, mountain cheese', 'Assiette Wildhorn : viande séchée, coppa, jambon cru, lard, saucisson, fromage d’alpage', '29.00'],
      ['Käsefondue mit Kartoffeln und Brot, ab 2 Personen', 'Cheese fondue with potatoes and bread, from 2 guests', 'Fondue au fromage avec pommes de terre et pain, dès 2 personnes', '30.00 p.P.'],
      ['Raclette à discrétion mit Tischofen, ab 2 Personen', 'Raclette all you can eat with table oven, from 2 guests', 'Raclette à discrétion avec four de table, dès 2 personnes', '35.00 p.P.'],
      ['Käseschnitte natur', 'Swiss cheese toast', 'Croûte au fromage nature', '20.50']
    ] },
    { id: 'roesti', items: [
      ['Rösti mit Spiegelei', 'Rösti with fried egg', 'Rösti avec œuf au plat', '21.00'],
      ['Rösti Zermatt mit Raclettekäse', 'Rösti Zermatt with raclette cheese', 'Rösti Zermatt au fromage à raclette', '24.00'],
      ['Rösti Lauenen mit Pilzmischung an Rahmsauce', 'Rösti Lauenen with mushrooms in cream sauce', 'Rösti Lauenen aux champignons à la crème', '28.00'],
      ['Rösti Gstaad mit Bauernbratwurst und Zwiebelsauce', 'Rösti Gstaad with farmer’s sausage and onion sauce', 'Rösti Gstaad avec saucisse paysanne et sauce aux oignons', '28.00'],
      ['Rösti Gourmet mit Rauchlachs und Sauerrahm', 'Rösti Gourmet with smoked salmon and sour cream', 'Rösti Gourmet au saumon fumé et crème aigre', '31.00']
    ] },
    { id: 'haus', items: [
      ['Rahmschnitzel vom Schwein mit Champignonrahmsauce', 'Pork escalope with creamy mushroom sauce', 'Escalope de porc à la crème de champignons', '27.00'],
      ['Fischknusperli Egli', 'Crispy perch fillets', 'Filets de perche croustillants', '28.00'],
      ['Lachsforellenfilet, gebraten', 'Fried salmon trout fillet', 'Filet de truite saumonée poêlé', '28.00'],
      ['Kalbsgeschnetzeltes an Wildhornrahmsauce', 'Sliced veal in creamy Wildhorn sauce', 'Émincé de veau à la crème Wildhorn', '40.00'],
      ['Pfeffersteak «Wildhorn» vom Entrecôte', 'Pepper steak “Wildhorn”, entrecôte', 'Entrecôte au poivre «Wildhorn»', '46.00'],
      ['Fleischfondue Chinoise vom Rind, 200 g, ab 2 Personen', 'Fondue chinoise with beef, 200 g, from 2 guests', 'Fondue chinoise au bœuf, 200 g, dès 2 personnes', '55.00 p.P.'],
      ['Coupe Wildhorn: Walnusseis, karamellisierte Walnüsse, Ahornsirup', 'Coupe Wildhorn: walnut ice cream, caramelised walnuts, maple syrup', 'Coupe Wildhorn : glace aux noix, noix caramélisées, sirop d’érable', '12.50'],
      ['Meringues double crème', 'Meringues with double cream', 'Meringues double crème', '11.00']
    ] }
  ];

  var UI = {
    de: {
      'person1': 'Person', 'personN': 'Personen', 'night1': 'Nacht', 'nightN': 'Nächte',
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Personen', 'bw.pick': 'Datum wählen', 'bw.btn': 'Verfügbarkeit prüfen',
      'room.details': 'Zimmer ansehen', 'room.book': 'Buchen', 'room.night': 'pro Nacht', 'room.equip': 'Ausstattung',
      'room.prices': 'Preise pro Zimmer und Nacht, inkl. Frühstücksbuffet', 'room.photo': 'Foto', 'room.bookThis': 'Dieses Zimmer buchen',
      'room.p1': '1 Person', 'room.p2': '2 Personen', 'room.zw': 'Zwischensaison', 'room.sa': 'Saison',
      'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.hintIn': 'Bitte Anreisetag wählen', 'cal.hintOut': 'Bitte Abreisetag wählen', 'cal.reset': 'Zurücksetzen',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.closed': 'Betriebsferien', 'cal.sel': 'Ihre Auswahl',
      'bk.guests': 'Personen', 'bk.persons': 'Personen im Zimmer', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.extraNote': '3 Personen: Standard Doppel mit Zusatzbett (CHF 50 pro Nacht). Kinder bis 16 Jahre im Zimmer der Eltern CHF 20 – bitte im Feld «Wünsche» angeben.',
      'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie die freien Zimmer und den Preis.',
      'bk.small': 'Für diese Personenzahl nicht geeignet', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.noprice': 'Für diesen Zeitraum liegt noch keine Preisliste vor – bitte anfragen.',
      'bk.total': 'gesamt', 'bk.select': 'Auswählen',
      'bk.none': 'In diesem Zeitraum ist kein passendes Zimmer frei. Bitte wählen Sie andere Tage oder rufen Sie uns an: +41 33 765 30 12.',
      'bk.fine': 'Preise pro Zimmer und Nacht laut Preisliste 2027, inkl. Frühstücksbuffet, Taxen und MwSt. Halbpension auf Anfrage ab 3 Nächten. Hund CHF 10 (ohne Futter).',
      'bk.summary': 'Ihre Buchung', 'bk.room': 'Zimmer', 'bk.stay': 'Zeitraum',
      'bk.lineRoom': 'Zimmer inkl. Frühstück', 'bk.lineExtra': 'Zusatzbett', 'bk.price': 'Gesamtbetrag', 'bk.back': 'Zurück',
      'bk.nightsZw': 'Zwischensaison', 'bk.nightsSa': 'Saison',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.msg': 'Wünsche, Kinder, Hund, Halbpension, Anreisezeit (optional)',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung der Buchung verwendet werden.',
      'f.submit': 'Verbindlich buchen',
      'e.name': 'Bitte geben Sie Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'e.phone': 'Bitte geben Sie eine Telefonnummer an.', 'e.consent': 'Bitte bestätigen Sie die Datenschutzerklärung.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'In der fertigen Website erhalten Sie jetzt eine Bestätigung an {email}. Check-in ab 14 Uhr, Check-out bis 11 Uhr.',
      'ok.no': 'Buchungsnummer', 'ok.demo': 'Dies ist eine Beta-Vorschau: Es wurde nichts gebucht, nichts gespeichert und nichts versendet.',
      'ok.close': 'Schliessen', 'map.link': 'In OpenStreetMap öffnen',
      'open.now': 'Jetzt geöffnet', 'open.closed': 'Heute Ruhetag', 'open.holiday': 'Betriebsferien bis 17. Dezember', 'open.until': 'bis {t} Uhr',
      'open.before': 'Öffnet um 8 Uhr', 'open.after': 'Heute geschlossen'
    },
    en: {
      'person1': 'guest', 'personN': 'guests', 'night1': 'night', 'nightN': 'nights',
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Select date', 'bw.btn': 'Check availability',
      'room.details': 'View room', 'room.book': 'Book', 'room.night': 'per night', 'room.equip': 'Amenities',
      'room.prices': 'Rates per room and night, breakfast buffet included', 'room.photo': 'Photo', 'room.bookThis': 'Book this room',
      'room.p1': '1 guest', 'room.p2': '2 guests', 'room.zw': 'Low season', 'room.sa': 'Season',
      'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.hintIn': 'Please select your arrival date', 'cal.hintOut': 'Please select your departure date', 'cal.reset': 'Reset',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.closed': 'closed', 'cal.sel': 'your selection',
      'bk.guests': 'Guests', 'bk.persons': 'Guests in the room', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.extraNote': '3 guests: Standard double with extra bed (CHF 50 per night). Children up to 16 in their parents’ room CHF 20 – please mention them under “Requests”.',
      'bk.rooms': 'Rooms', 'bk.pickDates': 'Select arrival and departure to see the available rooms and the price.',
      'bk.small': 'Not suitable for this number of guests', 'bk.busy': 'Booked for these dates', 'bk.noprice': 'No price list yet for this period – please ask us.',
      'bk.total': 'total', 'bk.select': 'Select',
      'bk.none': 'No suitable room is available for these dates. Please choose other days or call us: +41 33 765 30 12.',
      'bk.fine': 'Rates per room and night according to the 2027 price list, including breakfast buffet, taxes and VAT. Half board on request from 3 nights. Dog CHF 10 (without food).',
      'bk.summary': 'Your booking', 'bk.room': 'Room', 'bk.stay': 'Stay',
      'bk.lineRoom': 'Room incl. breakfast', 'bk.lineExtra': 'Extra bed', 'bk.price': 'Total', 'bk.back': 'Back',
      'bk.nightsZw': 'low season', 'bk.nightsSa': 'season',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.msg': 'Requests, children, dog, half board, arrival time (optional)',
      'f.consent': 'I have read the <a href="datenschutz.html" target="_blank" rel="noopener">privacy policy</a> and agree that my details are used to process the booking.',
      'f.submit': 'Book now',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid e-mail address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please confirm the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'On the finished website you would now receive a confirmation at {email}. Check-in from 2 pm, check-out until 11 am.',
      'ok.no': 'Booking number', 'ok.demo': 'This is a beta preview: nothing has been booked, saved or sent.',
      'ok.close': 'Close', 'map.link': 'Open in OpenStreetMap',
      'open.now': 'Open now', 'open.closed': 'Closed today (rest day)', 'open.holiday': 'Closed until 17 December', 'open.until': 'until {t}',
      'open.before': 'Opens at 8 am', 'open.after': 'Closed for today'
    },
    fr: {
      'person1': 'personne', 'personN': 'personnes', 'night1': 'nuit', 'nightN': 'nuits',
      'bw.in': 'Arrivée', 'bw.out': 'Départ', 'bw.guests': 'Personnes', 'bw.pick': 'Choisir la date', 'bw.btn': 'Voir les disponibilités',
      'room.details': 'Voir la chambre', 'room.book': 'Réserver', 'room.night': 'par nuit', 'room.equip': 'Équipement',
      'room.prices': 'Prix par chambre et par nuit, buffet de petit-déjeuner compris', 'room.photo': 'Photo', 'room.bookThis': 'Réserver cette chambre',
      'room.p1': '1 personne', 'room.p2': '2 personnes', 'room.zw': 'Entre-saison', 'room.sa': 'Saison',
      'gal.prev': 'Photo précédente', 'gal.next': 'Photo suivante',
      'cal.prev': 'Mois précédent', 'cal.next': 'Mois suivant',
      'cal.hintIn': 'Choisissez le jour d’arrivée', 'cal.hintOut': 'Choisissez le jour de départ', 'cal.reset': 'Réinitialiser',
      'cal.free': 'libre', 'cal.busy': 'complet', 'cal.closed': 'fermeture annuelle', 'cal.sel': 'votre choix',
      'bk.guests': 'Personnes', 'bk.persons': 'Personnes dans la chambre', 'bk.less': 'moins', 'bk.more': 'plus',
      'bk.extraNote': '3 personnes : Double Standard avec lit d’appoint (CHF 50 par nuit). Enfants jusqu’à 16 ans dans la chambre des parents CHF 20 – à indiquer sous «Souhaits».',
      'bk.rooms': 'Chambres', 'bk.pickDates': 'Choisissez l’arrivée et le départ : vous verrez les chambres libres et le prix.',
      'bk.small': 'Ne convient pas à ce nombre de personnes', 'bk.busy': 'Complet à ces dates', 'bk.noprice': 'Pas encore de liste de prix pour cette période – demandez-nous.',
      'bk.total': 'au total', 'bk.select': 'Choisir',
      'bk.none': 'Aucune chambre adaptée n’est libre à ces dates. Choisissez d’autres jours ou appelez-nous : +41 33 765 30 12.',
      'bk.fine': 'Prix par chambre et par nuit selon la liste de prix 2027, buffet de petit-déjeuner, taxes et TVA compris. Demi-pension sur demande dès 3 nuits. Chien CHF 10 (sans nourriture).',
      'bk.summary': 'Votre réservation', 'bk.room': 'Chambre', 'bk.stay': 'Séjour',
      'bk.lineRoom': 'Chambre avec petit-déjeuner', 'bk.lineExtra': 'Lit d’appoint', 'bk.price': 'Montant total', 'bk.back': 'Retour',
      'bk.nightsZw': 'entre-saison', 'bk.nightsSa': 'saison',
      'f.name': 'Prénom et nom', 'f.email': 'E-mail', 'f.phone': 'Téléphone', 'f.msg': 'Souhaits, enfants, chien, demi-pension, heure d’arrivée (facultatif)',
      'f.consent': 'J’ai lu la <a href="datenschutz.html" target="_blank" rel="noopener">déclaration de protection des données</a> et j’accepte que mes données soient utilisées pour traiter la réservation.',
      'f.submit': 'Réserver',
      'e.name': 'Veuillez indiquer votre prénom et votre nom.', 'e.email': 'Veuillez indiquer une adresse e-mail valable.',
      'e.phone': 'Veuillez indiquer un numéro de téléphone.', 'e.consent': 'Veuillez accepter la déclaration de protection des données.',
      'ok.title': 'Merci, {name} !', 'ok.text': 'Sur le site définitif, vous recevriez maintenant une confirmation à {email}. Arrivée dès 14 h, départ jusqu’à 11 h.',
      'ok.no': 'Numéro de réservation', 'ok.demo': 'Ceci est un aperçu bêta : rien n’a été réservé, enregistré ni envoyé.',
      'ok.close': 'Fermer', 'map.link': 'Ouvrir dans OpenStreetMap',
      'open.now': 'Ouvert maintenant', 'open.closed': 'Fermé aujourd’hui (jour de repos)', 'open.holiday': 'Fermeture annuelle jusqu’au 17 décembre', 'open.until': 'jusqu’à {t}',
      'open.before': 'Ouvre à 8 h', 'open.after': 'Fermé pour aujourd’hui'
    }
  };

  var META = {
    en: {
      title: 'Hotel Wildhorn, Lauenen near Gstaad · Restaurant, terrace and 12 rooms since 1900',
      desc: 'Hotel-restaurant since 1900 in Lauenen near Gstaad: terrace with view of the Wildhorn, Rösti and game from the local hunt, banquet hall for 200, 12 rooms from CHF 95. 8.7 of 10 on Booking.com.'
    },
    fr: {
      title: 'Hôtel Wildhorn, Lauenen près de Gstaad · Restaurant, terrasse et 12 chambres depuis 1900',
      desc: 'Hôtel-restaurant depuis 1900 à Lauenen près de Gstaad : terrasse avec vue sur le Wildhorn, Rösti et gibier de la chasse locale, salle de banquet pour 200 personnes, 12 chambres dès CHF 95. 8,7 sur 10 sur Booking.com.'
    }
  };

  /* Seitentexte: Schlüssel = data-i18n im HTML */
  var T = {
    en: {
      'beta': 'Beta preview — not a final design',
      'nav.restaurant': 'Restaurant', 'nav.karte': 'Menu', 'nav.zimmer': 'Rooms', 'nav.feste': 'Events', 'nav.haus': 'The house', 'nav.lauenen': 'Lauenen',
      'nav.book': 'Book a room', 'nav.menu': 'Menu', 'close': 'Close', 'lang.aria': 'Language',
      'hero.kicker': 'Hotel-restaurant since 1900 · Lauenen near Gstaad, 1,200 m',
      'hero.h1': 'Dinner on the terrace, facing the Wildhorn.',
      'hero.p': 'Dried beef and shaved cheese from Lauenen, Rösti from the Rösti Factory and, in autumn, game from the local hunt – in the rustic dining room, in the Stübli with its painted ceiling or on the terrace. Upstairs, twelve rooms under the roof of 1900.',
      'hero.hoursH': 'Opening hours', 'hero.h1row': 'Sunday to Thursday', 'hero.h1val': '8 am – 11.30 pm', 'hero.h2row': 'Friday and Saturday', 'hero.h2val': '8 am – 12.30 am',
      'hero.h3row': 'Monday', 'hero.h3val': 'rest day', 'hero.h4row': '30 Nov – 17 Dec 2026', 'hero.h4val': 'closed',
      'hero.table': 'Reserve a table', 'hero.book': 'Book a room',
      'hero.alt': 'View from the terrace of Hotel Wildhorn over the village of Lauenen to the snow-covered mountains in autumn',
      'rest.kicker': 'Restaurant', 'rest.h2': 'Dining room, Stübli, terrace',
      'rest.p1': '<b>Dining room</b> – 50 seats, wood, red-and-white checked curtains: traditional Swiss dishes and a good glass of wine from the wine list.',
      'rest.p2': '<b>Stübli</b> – 30 seats under a uniquely painted ceiling, for a dinner for two or a small group.',
      'rest.p3': '<b>Terrace</b> – 60 seats with a view of the Wildhorn, the Spitzhorn and the Gelten glacier at the end of the Lauenen valley. A cool drink, something from the kitchen, the mountains.',
      'rest.music': 'In high season, folk music live every Friday – in July and August Ueli and Kurt play.',
      'rest.alt1': 'Corner of the dining room with wooden tables, red-and-white checked curtains and wall lamps',
      'rest.alt2': 'Terrace of Hotel Wildhorn in the sun with a view of snow-covered peaks',
      'rest.alt3': 'The Stübli with painted ceiling, old cupboard and laid tables',
      'rest.alt4': 'A glass of beer on the terrace railing in front of the mountains',
      'karte.kicker': 'From the menu · autumn 2026', 'karte.h2': 'Game from the local hunt, Rösti from the factory',
      'karte.p': 'An excerpt. Prices in CHF including 8.1 % VAT. The full menu, the game menu, the dessert menu and the wine list are available as PDF.',
      'karte.g1': 'Game at the Wildhorn', 'karte.g2': 'From Lauenen and from the cheese', 'karte.g3': 'Rösti Factory', 'karte.g4': 'House specialities, fish, desserts',
      'karte.note': 'The house salad dressing is lactose- and gluten-free, the Italian dressing vegan. Rösti nature, beetroot soup and consommé on request vegan.',
      'karte.pdf1': 'Menu, autumn 2026 (PDF)', 'karte.pdf2': 'Game menu 2026 (PDF)', 'karte.pdf3': 'Dessert menu (PDF)', 'karte.pdf4': 'Wine list, winter 2025/26 (PDF)',
      'karte.alt1': 'Game plate with Spätzli, red cabbage, Brussels sprouts and pear with cranberries',
      'karte.alt2': 'Rösti with fried egg in a cast-iron pan',
      'karte.alt3': 'Whole trout with potatoes and salad on an oval plate',
      'zimmer.kicker': 'Rooms · price list 2027', 'zimmer.h2': 'Twelve rooms under the roof of 1900',
      'zimmer.p': 'Simple, nostalgic rooms with wood and checked pillows. No lift – the house is from 1900, the floors creak. Breakfast buffet, Wi-Fi throughout the house, and with the Gstaad Card free bus and train from the first night.',
      'zimmer.th1': 'Room', 'zimmer.th2': 'Facilities', 'zimmer.th3': 'Low season', 'zimmer.th4': 'Season', 'zimmer.th5': '',
      'zimmer.r1': 'Rustik', 'zimmer.r1b': 'as single', 'zimmer.r1f': 'shared bathroom, radio/TV',
      'zimmer.r2': 'Single', 'zimmer.r2f': 'shower, radio/TV',
      'zimmer.r3': 'Standard double', 'zimmer.r3b': 'as single', 'zimmer.r3f': 'shower/WC, radio/TV, some with balcony',
      'zimmer.r4': 'Comfort double', 'zimmer.r4f': 'shower/WC, seating area, radio/TV',
      'zimmer.book': 'Book',
      'zimmer.n1': 'Prices per room and night in CHF, including breakfast buffet, taxes and VAT.',
      'zimmer.n2': 'Season: 18 Dec 2026 – 28 Mar 2027, 1 Jun – 17 Oct 2027, 17 Dec 2027 – 30 Mar 2028. Low season: 29 Mar – 31 May 2027, 18 Oct – 30 Nov 2027.',
      'zimmer.n3': 'Children up to 16 in their parents’ room CHF 20 · extra bed from 16 CHF 50 · dog CHF 10 (without food) · half board on request from 3 nights.',
      'zimmer.n4': 'Check-in from 2 pm, check-out until 11 am.',
      'zimmer.galH': 'The four room types',
      'feste.kicker': 'Events', 'feste.h2': 'The hall for 200, the Stübli for 30',
      'feste.p1': 'The famous Wildhorn hall, where so many feasts have been celebrated: New Year’s Eve, the legendary «Zwöit Jänner», weddings, christenings, confirmations, birthdays, music events and aperitifs of every kind. We will gladly organise your event.',
      'feste.cap': 'Capacity', 'feste.c1': 'Banquet hall', 'feste.c1v': 'up to 200 seats', 'feste.c2': 'Terrace', 'feste.c2v': '60 seats', 'feste.c3': 'Dining room', 'feste.c3v': '50 seats', 'feste.c4': 'Stübli', 'feste.c4v': '30 seats',
      'feste.ask': 'Ask about an event', 'feste.tel': 'or call +41 33 765 30 12',
      'feste.alt1': 'The Wildhorn hall with round tables laid in white and a stage with timber framing',
      'feste.alt2': 'Long tables laid for a wedding in the hall with flowers',
      'feste.alt3': 'The Stübli in the evening, laid for a banquet with the old cupboard',
      'haus.kicker': 'The house', 'haus.h2': 'Since 1900 in the village',
      'haus.p1': 'The Wildhorn, built in 1900, is one of the oldest hotel-restaurants in the Saanenland. Tradition and folklore in a cosy style – the year still stands on the gable.',
      'haus.p2': 'Since the reopening on 18 June 2016 Ruth Lüthi and Thomas Addor have run the house. They will host the Wildhorn until at least spring 2028, before the renovation is planned.',
      'haus.alt1': 'The wooden facade of Hotel Wildhorn with green shutters, geraniums, Swiss flag and horse-drawn carriage in front',
      'haus.alt2': 'Historic black-and-white photograph of the Wildhorn with a horse-drawn carriage',
      'haus.alt3': 'Hotel Wildhorn in winter with a horse-drawn sleigh in front of the snow-covered facade',
      'haus.cap2': 'The Wildhorn around 1900', 'haus.cap3': 'Winter in front of the house',
      'stimmen.kicker': 'Guest reviews', 'stimmen.h2': 'What guests say',
      'stimmen.src': 'Booking.com, 264 reviews, as of 26 October 2026', 'stimmen.s1': 'Staff', 'stimmen.s2': 'Location', 'stimmen.s3': 'Cleanliness', 'stimmen.s4': 'Value for money',
      'stimmen.q1': '“Very authentic, clean, top view, great staff, good breakfast.”', 'stimmen.q1n': 'Janina, Switzerland · Booking.com (translated from German)',
      'stimmen.q2': '“Fabulous little hotel with very friendly people, delicious food, and cozy atmosphere.”', 'stimmen.q2n': 'Markus, USA · Booking.com',
      'stimmen.q3': '“Nice hotel with a historic charme. Only place in the village center with restaurant.”', 'stimmen.q3n': 'Petra, Switzerland · Booking.com',
      'lauenen.kicker': 'Lauenen near Gstaad', 'lauenen.h2': 'At the end of the valley, 1,200 m',
      'lauenen.p1': 'Lauenen is a mountain village about ten minutes by car from Gstaad. In summer hiking, biking and the Lauenensee; in winter skiing, cross-country skiing and tours. With the Gstaad Card, bus and train in the region are free from the first night.',
      'lauenen.map': 'Hiking map Lauenen (PDF)', 'lauenen.tour': 'Gstaad Saanenland Tourism',
      'lauenen.alt1': 'The Lauenensee with mountains reflected in the still water', 'lauenen.alt2': 'The village of Lauenen with chalets and church seen from above', 'lauenen.alt3': 'Starry sky over the snow-covered mountains of Lauenen',
      'anreise.h3': 'Getting here', 'anreise.addr': 'Hotel Wildhorn · Dorfstrasse 4 · 3782 Lauenen · Switzerland',
      'anreise.p': 'In the village centre of Lauenen, about 10 minutes by car from Gstaad. Free private parking at the house.',
      'anreise.mapBtn': 'Load map', 'anreise.mapNote': 'The map is loaded from OpenStreetMap only after clicking.',
      'anreise.hours': 'Opening hours', 'anreise.h1': 'Sun – Thu 8 am – 11.30 pm', 'anreise.h2': 'Fri – Sat 8 am – 12.30 am', 'anreise.h3b': 'Monday rest day',
      'foot.beta': 'Beta preview – concept &amp; implementation: Olga Tikhomirova', 'foot.imp': 'Legal notice', 'foot.ds': 'Privacy',
      'foot.sub': 'Hotel · Restaurant<br>Lauenen near Gstaad',
      'bk.title': 'Book a room', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
    },
    fr: {
      'beta': 'Aperçu bêta — pas un design définitif',
      'nav.restaurant': 'Restaurant', 'nav.karte': 'Carte', 'nav.zimmer': 'Chambres', 'nav.feste': 'Fêtes', 'nav.haus': 'La maison', 'nav.lauenen': 'Lauenen',
      'nav.book': 'Réserver une chambre', 'nav.menu': 'Menu', 'close': 'Fermer', 'lang.aria': 'Langue',
      'hero.kicker': 'Hôtel-restaurant depuis 1900 · Lauenen près de Gstaad, 1200 m',
      'hero.h1': 'Dîner sur la terrasse, face au Wildhorn.',
      'hero.p': 'Viande séchée et fromage en rebibes de Lauenen, Rösti de la Rösti Factory et, en automne, gibier de la chasse locale – dans la salle rustique, dans le Stübli au plafond peint ou sur la terrasse. À l’étage, douze chambres sous le toit de 1900.',
      'hero.hoursH': 'Heures d’ouverture', 'hero.h1row': 'Dimanche à jeudi', 'hero.h1val': '8 h – 23 h 30', 'hero.h2row': 'Vendredi et samedi', 'hero.h2val': '8 h – 0 h 30',
      'hero.h3row': 'Lundi', 'hero.h3val': 'jour de repos', 'hero.h4row': '30 nov. – 17 déc. 2026', 'hero.h4val': 'fermé',
      'hero.table': 'Réserver une table', 'hero.book': 'Réserver une chambre',
      'hero.alt': 'Vue de la terrasse de l’hôtel Wildhorn sur le village de Lauenen et les montagnes enneigées en automne',
      'rest.kicker': 'Restaurant', 'rest.h2': 'Salle, Stübli, terrasse',
      'rest.p1': '<b>Salle</b> – 50 places, bois, rideaux à carreaux rouges et blancs : plats suisses traditionnels et un bon verre de vin de la carte.',
      'rest.p2': '<b>Stübli</b> – 30 places sous un plafond peint unique, pour un dîner à deux ou un petit groupe.',
      'rest.p3': '<b>Terrasse</b> – 60 places avec vue sur le Wildhorn, le Spitzhorn et le glacier de Gelten au bout de la vallée de Lauenen. Une boisson fraîche, une gourmandise de la cuisine, les montagnes.',
      'rest.music': 'En haute saison, musique folklorique live chaque vendredi – en juillet et août, Ueli et Kurt jouent.',
      'rest.alt1': 'Coin de la salle avec tables en bois, rideaux à carreaux rouges et blancs et appliques',
      'rest.alt2': 'Terrasse de l’hôtel Wildhorn au soleil avec vue sur les sommets enneigés',
      'rest.alt3': 'Le Stübli au plafond peint, vieille armoire et tables dressées',
      'rest.alt4': 'Un verre de bière sur la balustrade de la terrasse devant les montagnes',
      'karte.kicker': 'De la carte · automne 2026', 'karte.h2': 'Gibier de la chasse locale, Rösti de la factory',
      'karte.p': 'Un extrait. Prix en CHF, TVA de 8,1 % comprise. La carte complète, la carte de chasse, la carte des desserts et la carte des vins sont disponibles en PDF.',
      'karte.g1': 'Gibier au Wildhorn', 'karte.g2': 'De Lauenen et du fromage', 'karte.g3': 'Rösti Factory', 'karte.g4': 'Spécialités maison, poisson, desserts',
      'karte.note': 'La sauce à salade maison est sans lactose ni gluten, la sauce italienne est végane. Rösti nature, potage de betterave et consommé véganes sur demande.',
      'karte.pdf1': 'Carte, automne 2026 (PDF)', 'karte.pdf2': 'Carte de chasse 2026 (PDF)', 'karte.pdf3': 'Carte des desserts (PDF)', 'karte.pdf4': 'Carte des vins, hiver 2025/26 (PDF)',
      'karte.alt1': 'Assiette de gibier avec Spätzli, chou rouge, choux de Bruxelles et poire aux airelles',
      'karte.alt2': 'Rösti avec œuf au plat dans une poêle en fonte',
      'karte.alt3': 'Truite entière avec pommes de terre et salade sur un plat ovale',
      'zimmer.kicker': 'Chambres · liste de prix 2027', 'zimmer.h2': 'Douze chambres sous le toit de 1900',
      'zimmer.p': 'Chambres simples et nostalgiques, bois et coussins à carreaux. Pas d’ascenseur – la maison date de 1900, les planchers craquent. Buffet de petit-déjeuner, Wi-Fi dans toute la maison et, avec la Gstaad Card, bus et train gratuits dès la première nuit.',
      'zimmer.th1': 'Chambre', 'zimmer.th2': 'Équipement', 'zimmer.th3': 'Entre-saison', 'zimmer.th4': 'Saison', 'zimmer.th5': '',
      'zimmer.r1': 'Rustik', 'zimmer.r1b': 'en simple', 'zimmer.r1f': 'salle de bain à l’étage, radio/TV',
      'zimmer.r2': 'Simple', 'zimmer.r2f': 'douche, radio/TV',
      'zimmer.r3': 'Double Standard', 'zimmer.r3b': 'en simple', 'zimmer.r3f': 'douche/WC, radio/TV, en partie balcon',
      'zimmer.r4': 'Double Comfort', 'zimmer.r4f': 'douche/WC, coin salon, radio/TV',
      'zimmer.book': 'Réserver',
      'zimmer.n1': 'Prix par chambre et par nuit en CHF, buffet de petit-déjeuner, taxes et TVA compris.',
      'zimmer.n2': 'Saison : 18.12.2026 – 28.03.2027, 01.06 – 17.10.2027, 17.12.2027 – 30.03.2028. Entre-saison : 29.03 – 31.05.2027, 18.10 – 30.11.2027.',
      'zimmer.n3': 'Enfants jusqu’à 16 ans dans la chambre des parents CHF 20 · lit d’appoint dès 16 ans CHF 50 · chien CHF 10 (sans nourriture) · demi-pension sur demande dès 3 nuits.',
      'zimmer.n4': 'Arrivée dès 14 h, départ jusqu’à 11 h.',
      'zimmer.galH': 'Les quatre types de chambres',
      'feste.kicker': 'Fêtes', 'feste.h2': 'La salle pour 200, le Stübli pour 30',
      'feste.p1': 'La célèbre salle du Wildhorn, où tant de fêtes ont été célébrées : Saint-Sylvestre, le légendaire «Zwöit Jänner», mariages, baptêmes, confirmations, anniversaires, soirées musicales et apéritifs en tout genre. Nous organisons volontiers votre fête.',
      'feste.cap': 'Capacité', 'feste.c1': 'Salle de banquet', 'feste.c1v': 'jusqu’à 200 places', 'feste.c2': 'Terrasse', 'feste.c2v': '60 places', 'feste.c3': 'Salle du restaurant', 'feste.c3v': '50 places', 'feste.c4': 'Stübli', 'feste.c4v': '30 places',
      'feste.ask': 'Demander pour une fête', 'feste.tel': 'ou appelez le +41 33 765 30 12',
      'feste.alt1': 'La salle du Wildhorn avec des tables rondes dressées en blanc et une scène à colombages',
      'feste.alt2': 'Longues tables dressées pour un mariage dans la salle, avec des fleurs',
      'feste.alt3': 'Le Stübli le soir, dressé pour un banquet, avec la vieille armoire',
      'haus.kicker': 'La maison', 'haus.h2': 'Depuis 1900 au village',
      'haus.p1': 'Le Wildhorn, construit en 1900, est l’un des plus anciens hôtels-restaurants du Saanenland. Tradition et folklore dans un style chaleureux – l’année figure toujours sur le pignon.',
      'haus.p2': 'Depuis la réouverture du 18 juin 2016, Ruth Lüthi et Thomas Addor tiennent la maison. Ils accueilleront les hôtes du Wildhorn au moins jusqu’au printemps 2028, avant la rénovation prévue.',
      'haus.alt1': 'La façade en bois de l’hôtel Wildhorn avec volets verts, géraniums, drapeau suisse et calèche devant',
      'haus.alt2': 'Photographie historique en noir et blanc du Wildhorn avec une calèche',
      'haus.alt3': 'L’hôtel Wildhorn en hiver avec un traîneau à cheval devant la façade enneigée',
      'haus.cap2': 'Le Wildhorn vers 1900', 'haus.cap3': 'L’hiver devant la maison',
      'stimmen.kicker': 'Avis des hôtes', 'stimmen.h2': 'Ce que disent les hôtes',
      'stimmen.src': 'Booking.com, 264 avis, état au 26 octobre 2026', 'stimmen.s1': 'Personnel', 'stimmen.s2': 'Emplacement', 'stimmen.s3': 'Propreté', 'stimmen.s4': 'Rapport qualité-prix',
      'stimmen.q1': '«Très authentique, propre, vue superbe, personnel formidable, bon petit-déjeuner.»', 'stimmen.q1n': 'Janina, Suisse · Booking.com (traduit de l’allemand)',
      'stimmen.q2': '«Fabulous little hotel with very friendly people, delicious food, and cozy atmosphere.»', 'stimmen.q2n': 'Markus, États-Unis · Booking.com',
      'stimmen.q3': '«Nice hotel with a historic charme. Only place in the village center with restaurant.»', 'stimmen.q3n': 'Petra, Suisse · Booking.com',
      'lauenen.kicker': 'Lauenen près de Gstaad', 'lauenen.h2': 'Au bout de la vallée, à 1200 m',
      'lauenen.p1': 'Lauenen est un village de montagne à une dizaine de minutes en voiture de Gstaad. En été, randonnée, VTT et le Lauenensee ; en hiver, ski, ski de fond et randonnées. Avec la Gstaad Card, bus et train de la région sont gratuits dès la première nuit.',
      'lauenen.map': 'Carte de randonnée Lauenen (PDF)', 'lauenen.tour': 'Gstaad Saanenland Tourisme',
      'lauenen.alt1': 'Le Lauenensee avec les montagnes qui se reflètent dans l’eau calme', 'lauenen.alt2': 'Le village de Lauenen avec ses chalets et son église, vu d’en haut', 'lauenen.alt3': 'Ciel étoilé au-dessus des montagnes enneigées de Lauenen',
      'anreise.h3': 'Accès', 'anreise.addr': 'Hotel Wildhorn · Dorfstrasse 4 · 3782 Lauenen · Suisse',
      'anreise.p': 'Au centre du village de Lauenen, à une dizaine de minutes en voiture de Gstaad. Parking privé gratuit à la maison.',
      'anreise.mapBtn': 'Charger la carte', 'anreise.mapNote': 'La carte n’est chargée depuis OpenStreetMap qu’après un clic.',
      'anreise.hours': 'Heures d’ouverture', 'anreise.h1': 'Di – je 8 h – 23 h 30', 'anreise.h2': 'Ve – sa 8 h – 0 h 30', 'anreise.h3b': 'Lundi jour de repos',
      'foot.beta': 'Aperçu bêta – concept &amp; réalisation : Olga Tikhomirova', 'foot.imp': 'Impressum', 'foot.ds': 'Protection des données',
      'foot.sub': 'Hôtel · Restaurant<br>Lauenen près de Gstaad',
      'bk.title': 'Réserver une chambre', 'bk.step1': 'Dates &amp; chambre', 'bk.step2': 'Vos coordonnées', 'bk.step3': 'Confirmation'
    }
  };

  window.WILDHORN = { ROOMS: ROOMS, MENU: MENU, SEASONS: SEASONS, CLOSED: CLOSED, UI: UI, T: T, META: META };
})();
