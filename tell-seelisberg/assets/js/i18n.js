/* Hotel Tell, Seelisberg — Inhalte: Zimmer, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Zimmer laut hoteltell.ch (Seiten /einzelzimmer/, /doppelzimmer/, /familienzimmer/, 27.10.2026) und Booking.com.
     Das Haus veröffentlicht keine Preise. Richtwert Doppelzimmer: Booking.com im Google-Preisvergleich, abgerufen
     27.10.2026 für 28.–29.10.2026, 2 Erwachsene, Frühstück inbegriffen: 155 € ≈ CHF 143 (Kurs laut Google 1.0843).
     price = Preis je Zimmer und Nacht (null = auf Anfrage). cap = Personen höchstens. busy = Demo-Auslastung (1 locker … 4 oft belegt). */
  var ROOMS = [
    {
      id: 'dz', cap: 2, min: 1, busy: 2, price: 143,
      imgs: ['dz-3', 'dz-1', 'dz-balkon', 'dz-2', 'dz-4', 'dz-bad'],
      de: {
        name: 'Doppelzimmer', floor: '2. Etage', occ: '1–2 Personen', short: 'Hell, holzgetäfelt, teils mit Balkon zur Bergwelt.',
        text: 'Die freundlichen und hellen Doppelzimmer liegen in der 2. Etage. Jedes hat ein eigenes Badezimmer mit Dusche und WC, zum Teil mit Fenster. Einige Zimmer haben einen Balkon, auf dem Sie die Aussicht auf die Bergwelt und die Ruhe in Seelisberg geniessen.',
        prices: ['Richtwert CHF 143 je Zimmer und Nacht für 2 Personen, Frühstück inbegriffen', 'Belegung durch 1 Person: Preis auf Anfrage', 'Quelle: Booking.com im Google-Preisvergleich, 27.10.2026 (28.–29.10.2026)'],
        equip: ['Dusche/WC im Zimmer', 'Teils Balkon', 'Holzgetäfelte Wände und Decke', 'Flachbild-TV', 'Kostenloses WLAN', 'Haartrockner', 'Nichtraucherzimmer', 'Frühstücksbuffet im Saal'],
        alts: ['Doppelzimmer mit Holzwänden, kariertem Bettzeug und Bild eines Steinbocks über dem Bett', 'Doppelzimmer mit Holzdecke, Nachttischlampen und Fenster', 'Offene Balkontür eines Doppelzimmers mit Blick auf die Berge', 'Doppelzimmer mit Fenster, Sessel und Blick ins Grüne', 'Doppelzimmer mit Schreibtisch, Stuhl und rotem Teppich', 'Badezimmer mit Dusche, Waschtisch und Fenster']
      },
      en: {
        name: 'Double room', floor: '2nd floor', occ: '1–2 guests', short: 'Bright, wood-panelled, some with a balcony towards the mountains.',
        text: 'The friendly, bright double rooms are on the 2nd floor. Each has its own bathroom with shower and WC, some with a window. Some rooms have a balcony where you can enjoy the view of the mountains and the quiet of Seelisberg.',
        prices: ['Guide price CHF 143 per room and night for 2 guests, breakfast included', 'Single occupancy: price on request', 'Source: Booking.com in the Google price comparison, 27 Oct 2026 (28–29 Oct 2026)'],
        equip: ['Shower/WC in the room', 'Some with balcony', 'Wood-panelled walls and ceiling', 'Flat-screen TV', 'Free Wi-Fi', 'Hairdryer', 'Non-smoking room', 'Breakfast buffet in the hall'],
        alts: ['Double room with wooden walls, checked bedding and a picture of an ibex above the bed', 'Double room with wooden ceiling, bedside lamps and window', 'Open balcony door of a double room with mountain view', 'Double room with window, armchair and view of the greenery', 'Double room with desk, chair and red carpet', 'Bathroom with shower, washbasin and window']
      }
    },
    {
      id: 'ez', cap: 1, min: 1, busy: 2, price: null,
      imgs: ['ez-1', 'ez-2', 'ez-3', 'ez-bad'],
      de: {
        name: 'Einzelzimmer', floor: '1. und 3. Etage', occ: '1 Person', short: '«Ein kleines Nest für Alleinreisende» – mit eigener Dusche und WC.',
        text: 'Unsere gemütlichen Einzelzimmer befinden sich in der 1. und 3. Etage und verfügen über ein eigenes Badezimmer mit Dusche und WC. Das Haus nennt sie «ein kleines Nest für Alleinreisende».',
        prices: ['Preis auf Anfrage – das Haus veröffentlicht keinen Einzelzimmerpreis', 'Frühstücksbuffet inbegriffen'],
        equip: ['Dusche/WC im Zimmer', 'Holzgetäfelte Wände', 'Flachbild-TV', 'Kostenloses WLAN', 'Haartrockner', 'Nichtraucherzimmer', 'Frühstücksbuffet im Saal'],
        alts: ['Einzelzimmer mit Holzwand, Bett mit kariertem Bezug und Bild eines Hirsches', 'Einzelzimmer mit Schreibtisch, Stuhl und zwei Fenstern', 'Einzelzimmer mit Bett, Nachttisch und Fenster zum Dorf', 'Badezimmer des Einzelzimmers mit Waschtisch und Dusche']
      },
      en: {
        name: 'Single room', floor: '1st and 3rd floor', occ: '1 guest', short: '“A little nest for solo travellers” – with its own shower and WC.',
        text: 'Our cosy single rooms are on the 1st and 3rd floor and have their own bathroom with shower and WC. The house calls them “a little nest for solo travellers”.',
        prices: ['Price on request – the house does not publish a single-room rate', 'Breakfast buffet included'],
        equip: ['Shower/WC in the room', 'Wood-panelled walls', 'Flat-screen TV', 'Free Wi-Fi', 'Hairdryer', 'Non-smoking room', 'Breakfast buffet in the hall'],
        alts: ['Single room with wooden wall, bed with checked cover and a picture of a stag', 'Single room with desk, chair and two windows', 'Single room with bed, bedside table and window to the village', 'Bathroom of the single room with washbasin and shower']
      }
    },
    {
      id: 'fz', cap: 4, min: 2, busy: 2, price: null,
      imgs: ['fz-1', 'fz-3', 'fz-2', 'fz-4', 'fz-5', 'fz-bad'],
      de: {
        name: 'Familienzimmer', floor: '3. Etage, zwei Ebenen', occ: '2–4 Personen', short: 'Unten Doppelbett und Bad, oben zwei Einzelbetten und Platz zum Spielen.',
        text: 'Die geräumigen Familienzimmer liegen in der 3. Etage und erstrecken sich über zwei Ebenen: In der unteren Ebene befinden sich ein Doppelbett und das Bad, in der oberen Ebene zwei Einzelbetten und genug Platz zum Spielen für Ihre Kinder. Platz für bis zu 4 Personen; eigenes Badezimmer mit Dusche und WC, zum Teil mit Fenster.',
        prices: ['Preis auf Anfrage – das Haus veröffentlicht keinen Familienzimmerpreis', 'Frühstücksbuffet inbegriffen', 'Baby- und Zustellbetten sind nicht verfügbar (laut Booking.com)'],
        equip: ['Zwei Ebenen mit Treppe', 'Doppelbett unten, zwei Einzelbetten oben', 'Dusche/WC im Zimmer', 'Flachbild-TV', 'Kostenloses WLAN', 'Haartrockner', 'Nichtraucherzimmer', 'Frühstücksbuffet im Saal'],
        alts: ['Familienzimmer mit Doppelbett, Holztreppe zur oberen Ebene und Schreibtisch', 'Obere Ebene des Familienzimmers mit zwei Einzelbetten, Kindertisch und Dachfenster', 'Holztreppe zur oberen Ebene des Familienzimmers', 'Obere Ebene mit Einzelbett, Geländer und Hirschbild', 'Familienzimmer mit Doppelbett unter der Dachschräge und Sitzecke', 'Badezimmer des Familienzimmers mit Dusche, Waschtisch und Fenster']
      },
      en: {
        name: 'Family room', floor: '3rd floor, two levels', occ: '2–4 guests', short: 'Double bed and bathroom below, two single beds and room to play above.',
        text: 'The spacious family rooms are on the 3rd floor and extend over two levels: the lower level has a double bed and the bathroom, the upper level two single beds and enough room for your children to play. Space for up to 4 guests; own bathroom with shower and WC, some with a window.',
        prices: ['Price on request – the house does not publish a family-room rate', 'Breakfast buffet included', 'Cots and extra beds are not available (according to Booking.com)'],
        equip: ['Two levels with a staircase', 'Double bed below, two single beds above', 'Shower/WC in the room', 'Flat-screen TV', 'Free Wi-Fi', 'Hairdryer', 'Non-smoking room', 'Breakfast buffet in the hall'],
        alts: ['Family room with double bed, wooden stairs to the upper level and desk', 'Upper level of the family room with two single beds, a children’s table and skylight', 'Wooden stairs to the upper level of the family room', 'Upper level with single bed, railing and stag picture', 'Family room with double bed under the sloping roof and seating corner', 'Bathroom of the family room with shower, washbasin and window']
      }
    }
  ];

  var UI = {
    de: {
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen', 'bw.btn': 'Verfügbarkeit prüfen',
      'adult1': 'Erwachsener', 'adultN': 'Erwachsene', 'kid1': 'Kind', 'kidN': 'Kinder', 'night1': 'Nacht', 'nightN': 'Nächte',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat', 'cal.reset': 'Zurücksetzen',
      'cal.hintIn': 'Wählen Sie den Anreisetag.', 'cal.hintOut': 'Wählen Sie den Abreisetag.',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'gewählt',
      'bk.title': 'Zimmer buchen', 'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder',
      'bk.kidsNote': 'Kinder jeden Alters sind willkommen. Baby- und Zustellbetten gibt es nicht; Familien wählen das Familienzimmer mit zwei Einzelbetten auf der oberen Ebene.',
      'bk.less': 'weniger', 'bk.more': 'mehr', 'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie zuerst An- und Abreise – dann sehen Sie, was frei ist.',
      'bk.small': 'Für diese Personenzahl zu klein', 'bk.big': 'Für eine Person ist das Einzel- oder Doppelzimmer gedacht',
      'bk.busy': 'In diesem Zeitraum belegt', 'bk.total': 'gesamt', 'bk.select': 'Wählen', 'bk.request': 'Anfragen',
      'bk.onRequest': 'Preis auf Anfrage', 'bk.onRequestSub': 'Das Haus nennt Ihnen den Preis',
      'bk.none': 'Für diesen Zeitraum ist in der Vorschau nichts frei. Bitte wählen Sie andere Tage.',
      'bk.incl': 'Preise je Zimmer und Nacht, Frühstücksbuffet inbegriffen',
      'bk.direct': 'Richtwert laut Booking.com (27.10.2026); der genaue Preis kommt vom Haus. Keine Buchungsgebühr.',
      'bk.pay': 'Zahlung im Haus (laut Booking.com: Barzahlung).', 'bk.cancel': 'Stornobedingungen nennt Ihnen das Haus in der Bestätigung.',
      'bk.summary': 'Ihre Auswahl', 'bk.room': 'Zimmer', 'bk.stay': 'Aufenthalt', 'bk.price': 'Preis', 'bk.priceReq': 'auf Anfrage',
      'bk.line': '{a} × CHF {p} × {n}', 'bk.back': 'Zurück', 'bk.single': 'Doppelzimmer für 1 Person: Preis auf Anfrage',
      'bk.reqNote': 'Einzel- und Familienzimmer sowie Doppelzimmer für eine Person vergibt das Haus auf Anfrage – Sie senden dieselben Angaben, das Haus antwortet mit dem Preis.',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.arrival': 'Voraussichtliche Ankunftszeit (Check-in 16–18 Uhr)', 'f.msg': 'Nachricht an das Haus',
      'f.consent': 'Ich bin einverstanden, dass meine Angaben zur Bearbeitung dieser Anfrage verwendet werden. Hinweise im <a href="datenschutz.html">Datenschutz</a>.',
      'f.submit': 'Verbindlich buchen', 'f.submitReq': 'Anfrage senden',
      'e.name': 'Bitte Vor- und Nachnamen angeben.', 'e.email': 'Bitte eine gültige E-Mail-Adresse angeben.', 'e.phone': 'Bitte eine Telefonnummer mit mindestens 6 Ziffern angeben.',
      'e.consent': 'Bitte bestätigen Sie die Einwilligung.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'Eine Bestätigung ginge an {email}. Das Haus meldet sich, falls es Rückfragen gibt.',
      'ok.titleReq': 'Vielen Dank, {name} – Ihre Anfrage ist unterwegs.', 'ok.textReq': 'Das Haus antwortet an {email} mit Preis und Verfügbarkeit.',
      'ok.no': 'Buchungsnummer', 'ok.noReq': 'Anfragenummer', 'ok.close': 'Schliessen',
      'ok.demo': 'Vorschau: Es wurde nichts gebucht und nichts gesendet. In der fertigen Website erhält das Hotel Tell diese Angaben per E-Mail, und Sie bekommen eine Bestätigung.',
      'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto', 'room.prices': 'Preise', 'room.equip': 'Ausstattung',
      'room.priceNote': 'Das Haus veröffentlicht keine Preise; der Richtwert stammt aus dem Preisvergleich bei Google/Booking.com vom 27.10.2026.',
      'room.bookThis': 'Dieses Zimmer buchen', 'room.from': 'Richtwert', 'room.night': 'je Zimmer und Nacht',
      'map.link': 'Auf OpenStreetMap öffnen'
    },
    en: {
      'bw.in': 'Check-in', 'bw.out': 'Check-out', 'bw.guests': 'Guests', 'bw.pick': 'Choose date', 'bw.btn': 'Check availability',
      'adult1': 'adult', 'adultN': 'adults', 'kid1': 'child', 'kidN': 'children', 'night1': 'night', 'nightN': 'nights',
      'cal.prev': 'Previous month', 'cal.next': 'Next month', 'cal.reset': 'Reset',
      'cal.hintIn': 'Choose your arrival day.', 'cal.hintOut': 'Choose your departure day.',
      'cal.free': 'free', 'cal.busy': 'booked', 'cal.sel': 'selected',
      'bk.title': 'Book a room', 'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kids': 'Children',
      'bk.kidsNote': 'Children of all ages are welcome. There are no cots or extra beds; families choose the family room with two single beds on the upper level.',
      'bk.less': 'fewer', 'bk.more': 'more', 'bk.rooms': 'Rooms', 'bk.pickDates': 'Choose check-in and check-out first – then you see what is free.',
      'bk.small': 'Too small for this number of guests', 'bk.big': 'For one guest, choose the single or double room',
      'bk.busy': 'Booked in this period', 'bk.total': 'total', 'bk.select': 'Select', 'bk.request': 'Request',
      'bk.onRequest': 'Price on request', 'bk.onRequestSub': 'The house will quote the price',
      'bk.none': 'Nothing is free in the preview for this period. Please choose other days.',
      'bk.incl': 'Prices per room and night, breakfast buffet included',
      'bk.direct': 'Guide price according to Booking.com (27 Oct 2026); the exact price comes from the house. No booking fee.',
      'bk.pay': 'Payment at the hotel (according to Booking.com: cash).', 'bk.cancel': 'The house states its cancellation terms in the confirmation.',
      'bk.summary': 'Your selection', 'bk.room': 'Room', 'bk.stay': 'Stay', 'bk.price': 'Price', 'bk.priceReq': 'on request',
      'bk.line': '{a} × CHF {p} × {n}', 'bk.back': 'Back', 'bk.single': 'Double room for 1 guest: price on request',
      'bk.reqNote': 'Single and family rooms, and double rooms for one guest, are allocated on request – you send the same details and the house replies with the price.',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.arrival': 'Expected arrival time (check-in 4–6 pm)', 'f.msg': 'Message to the house',
      'f.consent': 'I agree that my details are used to process this request. See the <a href="datenschutz.html">privacy notice</a>.',
      'f.submit': 'Book now', 'f.submitReq': 'Send request',
      'e.name': 'Please enter first and last name.', 'e.email': 'Please enter a valid e-mail address.', 'e.phone': 'Please enter a phone number with at least 6 digits.',
      'e.consent': 'Please confirm your consent.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'A confirmation would go to {email}. The house will get in touch if there are questions.',
      'ok.titleReq': 'Thank you, {name} – your request is on its way.', 'ok.textReq': 'The house replies to {email} with price and availability.',
      'ok.no': 'Booking number', 'ok.noReq': 'Request number', 'ok.close': 'Close',
      'ok.demo': 'Preview: nothing was booked and nothing was sent. On the finished website Hotel Tell receives these details by e-mail and you get a confirmation.',
      'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo', 'room.prices': 'Prices', 'room.equip': 'Facilities',
      'room.priceNote': 'The house does not publish prices; the guide price comes from the Google/Booking.com price comparison of 27 Oct 2026.',
      'room.bookThis': 'Book this room', 'room.from': 'Guide price', 'room.night': 'per room and night',
      'map.link': 'Open on OpenStreetMap'
    }
  };

  /* Englische Fassung der Seite (Schlüssel = data-i18n im HTML) */
  var EN = {
    'beta': 'Beta preview — not a finished design',
    'brand.sub': 'Hotel · Seelisberg above Lake Lucerne',
    'nav.lage': 'Location', 'nav.zimmer': 'Rooms & prices', 'nav.haus': 'House & hosts', 'nav.seelisberg': 'Seelisberg', 'nav.anreise': 'Getting here',
    'menu': 'Menu', 'cta.book': 'Book',

    'hero.kicker': 'Hotel Tell · Seelisberg, Canton of Uri · directly on the Swiss Path',
    'hero.title': '400 metres above the lake. The Rütli across the water.',
    'hero.sub': 'A village hotel with wood-panelled rooms on the sunny terrace of Seelisberg, high above the Urnersee. Breakfast buffet in the hall, free parking by the house, the funicular and the lake boats a few minutes away.',
    'hero.alt': 'View from Seelisberg down to the Urnersee in autumn, with the steep shore and the far side of the lake',
    'hero.cap': 'The Urnersee seen from Seelisberg – photo of the house, October.',
    'lad.h': 'From the house down to the lake',
    'lad.1': 'Hotel Tell, Seelisberg', 'lad.1v': 'village terrace about 400 m above the lake',
    'lad.2': 'Rütli meadow', 'lad.2v': 'where the Confederation was sworn in 1291 – 550 m from the house',
    'lad.3': 'Funicular Treib–Seelisberg', 'lad.3v': 'top station 400 m away; 8 minutes down to the lake, since 1916',
    'lad.4': 'Treib boat landing', 'lad.4v': 'Lake Lucerne boats: Brunnen 7 minutes, Lucerne about 2 hours',
    'hero.from': 'Guide price', 'hero.priceNote': 'double room for 2 guests per night with breakfast · Booking.com, 27 Oct 2026',
    'hero.book': 'Book a room', 'hero.rooms': 'Rooms & prices',

    'zi.title': 'Three kinds of room, all with shower and WC',
    'zi.lead': 'Wood-panelled walls and ceilings, flat-screen TV, free Wi-Fi, mountain view – that is how Booking.com describes the rooms. The breakfast buffet in the hall is included. The house does not publish prices; the guide price comes from the price comparison on Google/Booking.com.',
    'zi.th1': 'Category', 'zi.th2': 'Floor', 'zi.th3': 'Occupancy', 'zi.th4': 'Price per night', 'zi.details': 'Photos & details', 'zi.book': 'Book', 'zi.request': 'Request',
    'zi.r1': 'Double room', 'zi.r1s': 'Bright, wood-panelled, some with a balcony towards the mountains', 'zi.r1f': '2nd floor', 'zi.r1o': '1–2 guests',
    'zi.r1p': 'guide price for 2 guests, breakfast included',
    'zi.r2': 'Single room', 'zi.r2s': '“A little nest for solo travellers”', 'zi.r2f': '1st and 3rd floor', 'zi.r2o': '1 guest', 'zi.req': 'on request',
    'zi.r3': 'Family room', 'zi.r3s': 'Two levels: double bed and bathroom below, two single beds and room to play above', 'zi.r3f': '3rd floor', 'zi.r3o': '2–4 guests',
    'zi.note': 'Guide price: Booking.com in the Google price comparison, read on 27 Oct 2026 for 28–29 Oct 2026, 2 adults, breakfast included (€ 155 ≈ CHF 143). Single and family rooms: the house quotes the price – the request goes through the same form.',
    'zi.h2': 'Good to know', 'zi.i1': 'Check-in', 'zi.i1v': '4–6 pm; please tell the house your arrival time in advance (Booking.com)',
    'zi.i2': 'Check-out', 'zi.i2v': 'until 10.30 am (Booking.com)', 'zi.i3': 'Breakfast', 'zi.i3v': 'buffet in the hall for about 60 guests, included',
    'zi.i4': 'Payment', 'zi.i4v': 'cash (Booking.com lists cash as the accepted method)', 'zi.i5': 'Parking', 'zi.i5v': 'free private car park by the house',
    'zi.i6': 'Pets', 'zi.i6v': 'not allowed', 'zi.i7': 'Children', 'zi.i7v': 'welcome at any age; no cots or extra beds',
    'zi.alt1': 'Double room with wooden walls, checked bedding and a picture of an ibex', 'zi.alt2': 'Open balcony door of a double room with view of the mountains',
    'zi.cap': 'Double room on the 2nd floor and the view from a balcony – photos of the house.',
    'zi.q': '“The rooms are furnished with Alpine charm and attention to detail. The hospitality at breakfast and the friendly conversations with staff and management – we liked it very much.”',
    'zi.qc': 'Karin, Germany · Booking.com, read 27 Oct 2026',

    'ha.title': 'Breakfast in the hall, a terrace towards the church',
    'ha.text': 'The hall seats about 60 guests; this is where house guests have the rich breakfast buffet. In front of the house, the terrace with red chairs looks across to the church of St. Michael and the Mythen – the view the hotel webcam shows. The restaurant is currently closed; the rooms with breakfast remain bookable.',
    'ha.f1': 'Hall', 'ha.f1v': 'about 60 seats, breakfast buffet for house guests',
    'ha.f2': 'Terrace', 'ha.f2v': 'in front of the house, view of the church of St. Michael and the Mythen',
    'ha.f3': 'Restaurant', 'ha.f3v': 'currently closed (hoteltell.ch)',
    'ha.f4': 'Parking', 'ha.f4v': 'free, directly by the hotel',
    'ha.f5': 'Webcam', 'ha.f5v': 'live view from the hotel towards the church and the Mythen',
    'ha.alt1': 'Breakfast hall with wooden ceiling, chandelier and laid tables', 'ha.alt2': 'Red lounge with stag picture, wooden cabinet and chairs with fur',
    'ha.alt3': 'Terrace of Hotel Tell with red chairs, flowers and the church of St. Michael',
    'ha.cap': 'Hall, red lounge, terrace and the TELL letters – photos of the house.',
    'ho.title': 'Hosts',
    'ho.text': 'Hotel Tell is run by Hotel Tell Seelisberg AG, a family company of the Breitschmid family (board: Laura Breitschmid, chair, and Nora Breitschmid – Uri commercial register). What guests notice first is not the structure but the welcome: 9.8 out of 10 for the staff on Booking.com.',
    'ho.q': '“The greatest luxury we offer at Hotel Tell is passionate hospitality. Everything else is brought by the place – and by you.”',
    'ho.qc': 'Hotel Tell, hoteltell.ch/auszeit',
    'sc.v': 'out of 10 · 647 reviews on Booking.com (27 Oct 2026) – staff 9.8, cleanliness 9.5, comfort 9.4, location 9.3, value 9.0 · Google 4.7 stars',
    'sc.q1': '“Attention to detail, the hospitality – simply everything! A truly enchanting stay.”', 'sc.q1c': 'Daniela, Germany · Booking.com',
    'sc.q2': '“Nice, tasty little breakfast buffet, a really tastefully furnished room, free parking, uncomplicated arrival even when nobody is around, uncomplicated friendly hosts.”', 'sc.q2c': 'M., Germany · Booking.com',
    'sc.q3': '“Great sunny location and a wide view a few steps away. Everything we needed was there.”', 'sc.q3c': 'Ralf, Germany · Booking.com',
    'sc.note': 'Quotes from the Booking.com page of the hotel, read 27 Oct 2026; names as published there.',

    'se.title': 'Rütli, Swiss Path, Tannwald',
    'se.text': 'Seelisberg is the home of the Rütli: on this meadow the Confederation was sworn in 1291. The village lies on the Swiss Path, which leads around the Urnersee and can be walked in stages; the Way of St. James also passes through Seelisberg. The Tannwald loop with views of the Urnersee, the Uri mountains and the Reuss valley is manageable for everyone – or combine a hike with PostBus line 311, the cable car to Alp Weid or the Treib–Seelisberg funicular.',
    'se.h1': 'On foot from the front door',
    'se.l1': 'Geschichtsreise Seelisberg', 'se.l1v': 'open-air history trail, free of charge',
    'se.l2': 'Swiss Path', 'se.l2v': 'around the Urnersee, in stages – the house is right on it',
    'se.l3': 'Tannwald loop', 'se.l3v': 'views of the Urnersee, the Uri mountains and the Reuss valley',
    'se.l4': 'Way of St. James', 'se.l4v': 'passes through Seelisberg',
    'se.l5': 'Alp Weid', 'se.l5v': 'cable car from the village',
    'se.h2': 'Winter',
    'se.w': 'Klewenalp–Stockhütte is the nearest ski area – 5 minutes by car or by PostBus. Further afield: Titlis–Engelberg, Stoos–Fronalpstock, Andermatt, Melchsee-Frutt, Mythen region. With the Schneepass Zentralschweiz one pass covers them all.',
    'se.alt1': 'Seelisberg village with church on the terrace above the Urnersee, autumn', 'se.alt2': 'Path through the Tannwald with low sun and view of the mountains',
    'se.alt3': 'Winter morning: snow-covered meadow with a farmhouse and the Niederbauen', 'se.alt4': 'Panorama of the Urnersee between steep shores on a summer day',
    'se.cap': 'The village above the lake, the Tannwald path, a winter morning – photos of the house.',
    'pan.cap': 'The Urnersee, the southern arm of Lake Lucerne – photo from hoteltell.ch.',

    'ar.title': 'Getting here',
    'ar.addr': 'Address', 'ar.addrV': 'Hotel Tell · Dorfstrasse 81 · 6377 Seelisberg · Switzerland',
    'ar.boat': 'By boat and funicular', 'ar.boatV': 'Lake Lucerne boats to Treib: from Brunnen 7 minutes, from Lucerne about 2 hours (19 Oct – 12 Dec 2026 change of boat in Beckenried). From Treib the funicular takes 8 minutes up to Seelisberg; the top station is 400 m from the house.',
    'ar.bus': 'By bus', 'ar.busV': 'PostBus line 311 to Seelisberg; stop near the house.',
    'ar.car': 'By car', 'ar.carV': 'Lucerne 34 km; Zurich Airport 94 km; Emmen 39 km (Booking.com). Free private car park by the house.',
    'ar.times': 'Check-in / check-out', 'ar.timesV': 'Check-in 4–6 pm, check-out until 10.30 am (Booking.com). Please tell the house your arrival time.',
    'ar.contact': 'Contact', 'ar.webcam': 'Webcam',
    'map.alt': 'Hotel Tell with its pink facade, red shutters and the sign HOTEL TELL, seen from the village street',
    'map.note': 'The map is loaded from OpenStreetMap only after you click.', 'map.btn': 'Load map',

    'foot.old': 'Current website', 'foot.legal': 'Legal notice', 'foot.privacy': 'Privacy', 'foot.beta': 'Beta preview – concept & build: Olga Tikhomirova',
    'foot.photos': 'Photos: hoteltell.ch (the house’s own photos).',
    'steps.1': 'Dates & room', 'steps.2': 'Your details', 'steps.3': 'Confirmation', 'bk.title': 'Book a room'
  };

  window.TELL = { ROOMS: ROOMS, UI: UI, EN: EN };
})();
