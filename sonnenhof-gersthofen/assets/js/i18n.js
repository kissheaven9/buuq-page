/* Augsburg-Hotel Sonnenhof, Gersthofen — Beta-Vorschau. Inhalte: Zimmer, Buffets, UI-Texte und Übersetzungen (DE/EN).
   Deutsch steht direkt im HTML; Englisch wird über data-i18n eingesetzt.
   Quellen: sonnenhof-augsburg.de (Startseite, Zimmer, Restaurant, Tagungen, Fitness, Tagesnutzung, Kontakt, Impressum,
   Stand 25. November 2026), OpenStreetMap (Lage). Zimmerpreise sind dort nicht veröffentlicht — darum «Preis auf Anfrage». */
(function () {
  'use strict';

  /* Zimmer laut sonnenhof-augsburg.de/zimmer/. Preise sind nicht veröffentlicht: prices entfällt, Anfrage statt Festpreis.
     max = Personen (Schlafsofa im Französischen Doppelzimmer und in der Suite). busy = Demo-Belegungsgrad. */
  var ROOMS = [
    {
      id: 'standard', max: 2, busy: 3,
      imgs: ['zimmer-standard-1', 'zimmer-standard-2', 'zimmer-bad'],
      de: {
        name: 'Standard Doppelzimmer', cap: '1–2 Personen · 2. und 3. OG',
        short: 'Zwei Einzelmatratzen à 90 cm – als gemeinsames Bett oder getrennt, mit Balkon.',
        text: 'Die Doppelzimmer der Standard-Kategorie liegen im 2. und 3. Obergeschoss. Das Bett besteht aus zwei Einzelmatratzen mit 90 cm Breite – je nach Wunsch als gemeinsames Bett oder als zwei getrennte Betten. Wie jedes Zimmer im Haus: mit kleinem privatem Balkon.',
        equip: ['Boxspringbett (2 × 90 cm)', 'Bad mit Dusche und WC', 'Klimaanlage, Lärmschutzfenster', 'Kabel-TV, Telefon, WLAN', 'Schreibtisch, Safe, elektrische Jalousien', 'Minibar inklusive, täglich nachgefüllt', 'Privater Balkon'],
        alts: ['Standard-Doppelzimmer mit zwei Einzelbetten, honigfarbenen Überwürfen und Balkontür', 'Holzbrett mit Tassen, Kaffee und Tee auf dem Schreibtisch im Zimmer', 'Bad mit ebenerdiger Dusche, Waschbecken und Handtuchheizkörper']
      },
      en: {
        name: 'Standard double room', cap: '1–2 guests · 2nd and 3rd floor',
        short: 'Two single mattresses of 90 cm – joined or separate, with balcony.',
        text: 'The standard double rooms are on the 2nd and 3rd floor. The bed consists of two single mattresses, 90 cm wide each – made up as one double bed or as two separate beds. Like every room in the house: with a small private balcony.',
        equip: ['Box-spring bed (2 × 90 cm)', 'Bathroom with shower and WC', 'Air conditioning, soundproof windows', 'Cable TV, phone, Wi-Fi', 'Desk, safe, electric blinds', 'Minibar included, refilled daily', 'Private balcony'],
        alts: ['Standard double room with two single beds, honey-coloured runners and balcony door', 'Wooden board with cups, coffee and tea on the desk in the room', 'Bathroom with walk-in shower, washbasin and towel radiator']
      }
    },
    {
      id: 'franz', max: 3, busy: 2,
      imgs: ['zimmer-franz-1', 'zimmer-franz-2'],
      de: {
        name: 'Französisches Doppelzimmer', cap: '1–3 Personen · 26 m² · 1. OG',
        short: 'Bett 160 × 200 cm und zusätzliches Schlafsofa 160 × 200 cm, viel Ruhe im 1. Stock.',
        text: 'Mit 26 m² bieten diese Zimmer im 1. Stock viel Ruhe und Wohnlichkeit. Das französische Bett misst 160 × 200 cm; dazu kommt ein Schlafsofa mit 160 × 200 cm Liegefläche – Platz für eine dritte Person.',
        equip: ['Französisches Bett 160 × 200 cm', 'Schlafsofa 160 × 200 cm', 'Bad mit Dusche und WC', 'Klimaanlage, Lärmschutzfenster', 'Kabel-TV, Telefon, WLAN', 'Schreibtisch, Safe, elektrische Jalousien', 'Minibar inklusive, privater Balkon'],
        alts: ['Zimmer mit Bett, grüner Tagesdecke, Sitzbank und offener Balkontür', 'Zimmer mit Sitzbank, Schreibtisch, Fernseher und Garderobe in Holz und Anthrazit']
      },
      en: {
        name: 'French double room', cap: '1–3 guests · 26 m² · 1st floor',
        short: 'Bed of 160 × 200 cm plus a sofa bed of 160 × 200 cm, quiet rooms on the 1st floor.',
        text: 'With 26 m², these rooms on the 1st floor offer plenty of calm and comfort. The French bed measures 160 × 200 cm; in addition there is a sofa bed with a 160 × 200 cm surface – room for a third guest.',
        equip: ['French bed, 160 × 200 cm', 'Sofa bed, 160 × 200 cm', 'Bathroom with shower and WC', 'Air conditioning, soundproof windows', 'Cable TV, phone, Wi-Fi', 'Desk, safe, electric blinds', 'Minibar included, private balcony'],
        alts: ['Room with bed, green bedspread, bench and open balcony door', 'Room with bench, desk, TV and wardrobe in wood and anthracite']
      }
    },
    {
      id: 'komfort', max: 2, busy: 3,
      imgs: ['zimmer-komfort-1', 'zimmer-komfort-2'],
      de: {
        name: 'Komfort Doppelzimmer', cap: '1–2 Personen · 4. OG',
        short: 'Bett 180 × 200 cm, gehobene Ausstattung und besonders schöner Ausblick im 4. OG.',
        text: 'Die Zimmer im 4. Obergeschoss bieten einen besonders schönen Ausblick. Das großzügige Bett misst 180 × 200 cm, die gehobene Ausstattung sorgt für das gewisse Etwas.',
        equip: ['Boxspringbett 180 × 200 cm', 'Gehobene Ausstattung', 'Bad mit Dusche und WC', 'Klimaanlage, Lärmschutzfenster', 'Kabel-TV, Telefon, WLAN', 'Schreibtisch, Safe, elektrische Jalousien', 'Minibar inklusive, privater Balkon'],
        alts: ['Komfort-Zimmer mit großem Bett, roter Decke, rotem Sessel und Balkon mit Ausblick', 'Zimmerdetail mit Schreibtisch, Sitzecke und Blick zum Balkon']
      },
      en: {
        name: 'Comfort double room', cap: '1–2 guests · 4th floor',
        short: 'Bed of 180 × 200 cm, upgraded furnishings and a particularly fine view from the 4th floor.',
        text: 'The rooms on the 4th floor offer a particularly fine view. The generous bed measures 180 × 200 cm, and the upgraded furnishings add that certain something.',
        equip: ['Box-spring bed, 180 × 200 cm', 'Upgraded furnishings', 'Bathroom with shower and WC', 'Air conditioning, soundproof windows', 'Cable TV, phone, Wi-Fi', 'Desk, safe, electric blinds', 'Minibar included, private balcony'],
        alts: ['Comfort room with large bed, red blanket, red armchair and balcony with a view', 'Room detail with desk, seating area and view towards the balcony']
      }
    },
    {
      id: 'suite', max: 3, busy: 2,
      imgs: ['zimmer-suite-1', 'zimmer-suite-2', 'zimmer-suite-3'],
      de: {
        name: 'Suite', cap: '1–3 Personen · 52 m² · 4. OG · barrierefrei',
        short: '52 m² im 4. OG, Kingsize-Bett 180 × 200 cm mit durchgehender Matratze, Schlafsofa, behindertengerecht.',
        text: 'Die Suite liegt im 4. Obergeschoss und ist mit 52 m² sehr geräumig – und behindertengerecht. Das Bett hat eine durchgehende Matratze im Kingsize-Format 180 × 200 cm; dazu kommt ein Schlafsofa.',
        equip: ['Kingsize-Bett 180 × 200 cm, durchgehende Matratze', 'Schlafsofa', '52 m², behindertengerecht', 'Bad mit Dusche und WC', 'Klimaanlage, Lärmschutzfenster', 'Kabel-TV, Telefon, WLAN, Schreibtisch, Safe', 'Minibar inklusive, privater Balkon'],
        alts: ['Suite mit Doppelbett, grünem Sofa und Augsburg-Zeichnung an der Wand', 'Suite mit Bett, grünem Schlafsofa, rotem Sessel und Balkontür', 'Sitzbereich der Suite mit Sofa, Sesseln und Couchtisch']
      },
      en: {
        name: 'Suite', cap: '1–3 guests · 52 m² · 4th floor · accessible',
        short: '52 m² on the 4th floor, king-size bed of 180 × 200 cm with a continuous mattress, sofa bed, accessible.',
        text: 'The suite is on the 4th floor and, at 52 m², very spacious – and wheelchair-accessible. The bed has a continuous king-size mattress of 180 × 200 cm; in addition there is a sofa bed.',
        equip: ['King-size bed, 180 × 200 cm, continuous mattress', 'Sofa bed', '52 m², wheelchair-accessible', 'Bathroom with shower and WC', 'Air conditioning, soundproof windows', 'Cable TV, phone, Wi-Fi, desk, safe', 'Minibar included, private balcony'],
        alts: ['Suite with double bed, green sofa and a drawing of Augsburg on the wall', 'Suite with bed, green sofa bed, red armchair and balcony door', 'Seating area of the suite with sofa, armchairs and coffee table']
      }
    }
  ];

  /* Buffets und Karte laut sonnenhof-augsburg.de/restaurant/ (Stand 25.11.2026). items = [de, en, Preis] — Preis '' = ohne Preisangabe */
  var MENU = [
    { id: 'fruehstueck', items: [
      ['Montag bis Freitag, 6 – 10 Uhr', 'Monday to Friday, 6 – 10 am', '21,00 €'],
      ['Samstag, Sonn- und Feiertage, 7 – 13 Uhr', 'Saturday, Sunday and public holidays, 7 am – 1 pm', '24,90 €'],
      ['Eierspeisen frisch vom Koch, Hausbäckerei, Heißgetränke und Säfte inklusive', 'Egg dishes freshly made, in-house bakery, hot drinks and juices included', '']
    ] },
    { id: 'mittag', items: [
      ['Montag bis Freitag, 12 – 14 Uhr', 'Monday to Friday, 12 – 2 pm', '21,00 €'],
      ['«All you can eat»: Hauptgerichte, Beilagen, Salatbar, Dessertbuffet', '“All you can eat”: mains, sides, salad bar, dessert buffet', '']
    ] },
    { id: 'abend', items: [
      ['Montag bis Samstag, 18 – 21 Uhr', 'Monday to Saturday, 6 – 9 pm', '20,00 €'],
      ['Salate, Suppen, Vorspeisen, warme Speisen (auch vegetarisch und vegan), Desserts', 'Salads, soups, starters, hot dishes (also vegetarian and vegan), desserts', '']
    ] },
    { id: 'karte', items: [
      ['Burger, frisch zubereitet', 'Burgers, freshly prepared', ''],
      ['Pizza mit 35 cm Durchmesser', 'Pizza, 35 cm across', ''],
      ['Salate und Crêpes', 'Salads and crêpes', ''],
      ['Happy Hour an der Bar, 18 – 20 Uhr', 'Happy hour at the bar, 6 – 8 pm', ''],
      ['Latte Macchiato frisch vom Siebträger', 'Latte macchiato fresh from the portafilter', '']
    ] }
  ];

  var UI = {
    de: {
      'person1': 'Person', 'personN': 'Personen', 'night1': 'Nacht', 'nightN': 'Nächte',
      'room.details': 'Zimmer ansehen', 'room.book': 'Anfragen', 'room.equip': 'Ausstattung',
      'room.photo': 'Foto', 'room.bookThis': 'Dieses Zimmer anfragen',
      'room.priceNote': 'Preise auf Anfrage: Das Haus nennt Ihnen den Preis für Ihren Termin mit der Bestätigung. Buchen auch telefonisch: +49 821 2071210.',
      'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.hintIn': 'Bitte Anreisetag wählen', 'cal.hintOut': 'Bitte Abreisetag wählen', 'cal.reset': 'Zurücksetzen',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'bk.guests': 'Personen', 'bk.persons': 'Personen im Zimmer', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.extraNote': '3 Personen: Französisches Doppelzimmer oder Suite mit Schlafsofa. Kinderbett und weitere Wünsche bitte im Feld «Wünsche» angeben.',
      'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie, welche Zimmer frei sind.',
      'bk.small': 'Für diese Personenzahl nicht geeignet', 'bk.busy': 'In diesem Zeitraum belegt',
      'bk.onreq': 'Preis auf Anfrage', 'bk.free': 'verfügbar', 'bk.select': 'Auswählen',
      'bk.none': 'In diesem Zeitraum ist kein passendes Zimmer frei. Bitte wählen Sie andere Tage oder rufen Sie uns an: +49 821 2071210.',
      'bk.fine': 'Verfügbarkeit und Vergabe sind in dieser Beta-Vorschau simuliert. Die Zimmerpreise sind nicht öffentlich – das Haus bestätigt Preis und Verfügbarkeit mit der Antwort auf Ihre Anfrage.',
      'bk.summary': 'Ihre Anfrage', 'bk.room': 'Zimmer', 'bk.stay': 'Zeitraum',
      'bk.price': 'Preis', 'bk.priceReq': 'auf Anfrage', 'bk.back': 'Zurück',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.msg': 'Wünsche: Kinderbett, Anreisezeit, Tageszimmer, Rechnung an Firma (optional)',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden.',
      'f.submit': 'Anfrage senden',
      'e.name': 'Bitte geben Sie Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'e.phone': 'Bitte geben Sie eine Telefonnummer an.', 'e.consent': 'Bitte bestätigen Sie die Datenschutzerklärung.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'In der fertigen Website geht Ihre Anfrage jetzt an die Rezeption, und Sie erhalten Preis und Bestätigung an {email}. Check-in ab 15 Uhr, Check-out bis 11 Uhr.',
      'ok.no': 'Anfragenummer', 'ok.demo': 'Dies ist eine Beta-Vorschau: Es wurde nichts angefragt, nichts gespeichert und nichts versendet.',
      'ok.close': 'Schließen', 'map.link': 'In OpenStreetMap öffnen',
      'open.now': 'Rezeption besetzt', 'open.until': 'bis {t} Uhr', 'open.before': 'Rezeption öffnet um 7 Uhr', 'open.after': 'Rezeption öffnet morgen um 7 Uhr'
    },
    en: {
      'person1': 'guest', 'personN': 'guests', 'night1': 'night', 'nightN': 'nights',
      'room.details': 'View room', 'room.book': 'Enquire', 'room.equip': 'Amenities',
      'room.photo': 'Photo', 'room.bookThis': 'Enquire about this room',
      'room.priceNote': 'Rates on request: the house confirms the rate for your dates together with the confirmation. You can also book by phone: +49 821 2071210.',
      'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.hintIn': 'Please select your arrival date', 'cal.hintOut': 'Please select your departure date', 'cal.reset': 'Reset',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'bk.guests': 'Guests', 'bk.persons': 'Guests in the room', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.extraNote': '3 guests: French double room or suite with sofa bed. Please mention a cot and other wishes under “Requests”.',
      'bk.rooms': 'Rooms', 'bk.pickDates': 'Select arrival and departure to see which rooms are available.',
      'bk.small': 'Not suitable for this number of guests', 'bk.busy': 'Booked for these dates',
      'bk.onreq': 'Rate on request', 'bk.free': 'available', 'bk.select': 'Select',
      'bk.none': 'No suitable room is available for these dates. Please choose other days or call us: +49 821 2071210.',
      'bk.fine': 'Availability in this beta preview is simulated. Room rates are not published – the house confirms rate and availability in its reply to your enquiry.',
      'bk.summary': 'Your enquiry', 'bk.room': 'Room', 'bk.stay': 'Stay',
      'bk.price': 'Rate', 'bk.priceReq': 'on request', 'bk.back': 'Back',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.msg': 'Requests: cot, arrival time, day room, invoice to company (optional)',
      'f.consent': 'I have read the <a href="datenschutz.html" target="_blank" rel="noopener">privacy policy</a> and agree that my details are used to process the enquiry.',
      'f.submit': 'Send enquiry',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid e-mail address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please confirm the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'On the finished website your enquiry would now go to the reception, and you would receive rate and confirmation at {email}. Check-in from 3 pm, check-out until 11 am.',
      'ok.no': 'Enquiry number', 'ok.demo': 'This is a beta preview: nothing has been enquired, saved or sent.',
      'ok.close': 'Close', 'map.link': 'Open in OpenStreetMap',
      'open.now': 'Reception staffed', 'open.until': 'until {t}', 'open.before': 'Reception opens at 7 am', 'open.after': 'Reception opens tomorrow at 7 am'
    }
  };

  var META = {
    en: {
      title: 'Augsburg-Hotel Sonnenhof, Gersthofen · 95 rooms with balcony, Henry’s Panorama Restaurant',
      desc: 'Business hotel in Gersthofen near Augsburg, right at the Augsburg-West interchange: 95 air-conditioned rooms with balcony and minibar included, breakfast in the panorama restaurant on the 5th floor, three meeting rooms, free gym.'
    }
  };

  /* Seitentexte: Schlüssel = data-i18n im HTML */
  var T = {
    en: {
      'beta': 'Beta preview — not a final design',
      'nav.zimmer': 'Rooms', 'nav.restaurant': 'Restaurant', 'nav.buffets': 'Buffets', 'nav.tagungen': 'Meetings', 'nav.haus': 'The house', 'nav.lage': 'Location',
      'nav.book': 'Book a room', 'nav.menu': 'Menu', 'close': 'Close', 'lang.aria': 'Language',
      'hero.kicker': 'Business and city hotel since 2019 · Gersthofen near Augsburg',
      'hero.h1': '95 rooms with balcony, breakfast above the rooftops.',
      'hero.p': 'The Augsburg-Hotel Sonnenhof stands in the B2 business park in Gersthofen, right at the Augsburg-West interchange of the A8 and the B2. Every one of the 95 rooms has air conditioning, a box-spring bed and a small private balcony; the minibar is included and refilled daily. Breakfast is served in Henry’s Panorama Restaurant on the 5th floor.',
      'hero.hoursH': 'Times', 'hero.h1row': 'Reception', 'hero.h1val': '7 am – 10 pm', 'hero.h2row': 'Check-in / check-out', 'hero.h2val': 'from 3 pm / until 11 am',
      'hero.h3row': 'Breakfast Mon – Fri', 'hero.h3val': '6 – 10 am', 'hero.h4row': 'Breakfast Sat, Sun, holidays', 'hero.h4val': '7 am – 1 pm',
      'hero.book': 'Book a room', 'hero.call': 'Call: +49 821 2071210',
      'hero.alt': 'Roof terrace of the hotel with green chairs and a wide view over Gersthofen and Augsburg',
      'zimmer.kicker': 'Rooms · 95 double rooms and a suite',
      'zimmer.h2': 'Spacious rooms, each with its own balcony',
      'zimmer.p': 'A new building from 2019: all rooms have air conditioning, a bathroom with shower and WC, cable TV, Wi-Fi, soundproof windows, electric blackout blinds, a desk, a safe and a small private balcony facing the town or the Lech meadows. The minibar is included in every booking and refilled daily.',
      'zimmer.th1': 'Room', 'zimmer.th2': 'Bed', 'zimmer.th3': 'Location & size',
      'zimmer.r1': 'Standard double', 'zimmer.r1b': '2 × 90 cm – joined or separate', 'zimmer.r1f': '2nd and 3rd floor',
      'zimmer.r2': 'French double', 'zimmer.r2b': '160 × 200 cm + sofa bed 160 × 200 cm', 'zimmer.r2f': '26 m², 1st floor',
      'zimmer.r3': 'Comfort double', 'zimmer.r3b': '180 × 200 cm', 'zimmer.r3f': '4th floor, upgraded furnishings',
      'zimmer.r4': 'Suite', 'zimmer.r4b': 'King-size 180 × 200 cm + sofa bed', 'zimmer.r4f': '52 m², 4th floor, accessible',
      'zimmer.book': 'Enquire',
      'zimmer.n1': 'Room rates are not published – the house confirms the rate for your dates with the booking confirmation.',
      'zimmer.n2': 'Minibar included in every booking, refilled daily. Check-in from 3 pm, check-out until 11 am.',
      'zimmer.n3': 'Day rooms (dayuse) for up to 4 hours on request – up to 70 % below the overnight rate.',
      'zimmer.galH': 'The four room types',
      'rest.kicker': 'Restaurant · 5th floor', 'rest.h2': 'Henry’s Panorama Restaurant',
      'rest.p1': '<b>Above the rooftops</b> – the restaurant sits high up on the 5th floor of the hotel. To the west the Lech meadows, to the south the landmarks of Gersthofen and Augsburg and, in the distance, the peaks of the northern Alps.',
      'rest.p2': '<b>Sun terrace</b> – the large terrace invites you to eat and linger, with an unobstructed view over the countryside.',
      'rest.p3': '<b>From the kitchen</b> – freshly prepared burgers, pizza 35 cm across, salads and crêpes; buffets with drinks included. Happy hour at the bar from 6 to 8 pm.',
      'rest.music': 'Coffee drinkers enjoy a latte macchiato freshly made at the portafilter machine.',
      'rest.alt1': 'Henry’s Panorama Restaurant on the 5th floor with set tables and ceiling lights',
      'rest.alt2': 'Warm dishes at the buffet in heated display counters',
      'rest.alt3': 'Employee preparing coffee at the portafilter machine',
      'karte.kicker': 'Eating & drinking · as published by the house',
      'karte.h2': 'Buffets with drinks included',
      'karte.p': 'All buffets include soft drinks, Henry’s coffee, tea, beer and house wine, self-tapped. Children up to 4 eat free of charge; ages 5–10 get 50 % off. Prices as published on sonnenhof-augsburg.de, 25 November 2026.',
      'karte.g1': 'Breakfast buffet', 'karte.g2': 'Lunch buffet', 'karte.g3': 'Evening buffet', 'karte.g4': 'Henry’s menu & bar',
      'karte.note': 'Groups and events are catered for by arrangement – please get in touch.',
      'karte.alt1': 'Pizza and a glass of wine on a table in Henry’s restaurant',
      'karte.alt2': 'Burger with fries and salad on a plate',
      'karte.alt3': 'Crêpes with berries and a glass of Aperol on the terrace',
      'tagungen.kicker': 'Meetings & events', 'tagungen.h2': 'Three rooms, dividable into six – from €20 per person',
      'tagungen.p1': 'Three air-conditioned meeting rooms with modern technology; each can be divided in two by a partition wall – up to six separate areas. The meeting package including drinks and basic equipment starts at €20 per person. Weddings, birthdays and company events are just as welcome.',
      'tagungen.c1': 'Sky meeting room (5th floor)', 'tagungen.c1v': '192 m², up to 150 guests',
      'tagungen.c2': 'Augsburg room (ground floor)', 'tagungen.c2v': '63 m² or 2 × 31.5 m²',
      'tagungen.c3': 'Bodensee room (ground floor)', 'tagungen.c3v': '58 m² or 2 × 29 m²',
      'tagungen.c4': 'Meeting package', 'tagungen.c4v': 'from €20 per person',
      'tagungen.ask': 'Ask about a meeting', 'tagungen.tel': 'or call +49 821 2071210',
      'tagungen.alt1': 'The Sky meeting room on the 5th floor with parquet floor and window front',
      'tagungen.alt2': 'Rows of green, orange and yellow chairs in the meeting room',
      'tagungen.alt3': 'Conference table in U-shape with colourful chairs and documents',
      'haus.kicker': 'The house', 'haus.h2': 'A new building from 2019 – with a gym in the house',
      'haus.p1': 'The Augsburg-Hotel Sonnenhof opened in the summer of 2019: a modern new building with 95 generous double rooms and a suite in the B2 business park in Gersthofen.',
      'haus.p2': 'The in-house Sonnenhof gym with modern MATRIX equipment is free of charge for hotel guests. Day rooms (dayuse) are available for up to four hours – ideal between two appointments or before a flight. Vouchers for the hotel and restaurant can be ordered online.',
      'haus.l1': 'Sonnenhof gym (sonnenhof-fitness.de)', 'haus.l2': 'Order vouchers online',
      'haus.alt1': 'Reading corner with bookshelves and armchairs in the hotel',
      'haus.alt2': 'Training equipment in the Sonnenhof gym',
      'haus.alt3': 'Coffee being served at the table in the lobby',
      'haus.cap1': 'The reading corner', 'haus.cap2': 'The Sonnenhof gym', 'haus.cap3': 'Service in the house',
      'lage.kicker': 'Location & arrival', 'lage.h2': 'Right at the Augsburg-West interchange',
      'lage.p1': 'The hotel stands in the B2 business park in Gersthofen, directly connected to the B2 and the A8. Into Augsburg it is around 11 km, to the Augsburg trade fair around 17 km, to Munich about 70 km – convenient for trade-fair guests, project teams and everyone who wants to get moving quickly in the morning.',
      'lage.d1': 'Augsburg city centre', 'lage.d1v': 'approx. 11 km',
      'lage.d2': 'Messe Augsburg (trade fair)', 'lage.d2v': 'approx. 17 km',
      'lage.d3': 'Munich', 'lage.d3v': 'approx. 70 km',
      'lage.alt1': 'The facade of the hotel with a metal sculpture in front of the entrance',
      'anreise.h3': 'Getting here', 'anreise.addr': 'Augsburg-Hotel Sonnenhof · Henleinstraße 31 · 86368 Gersthofen · Germany',
      'anreise.p': 'In the B2 business park, right at the Augsburg-West interchange (A8/B2).',
      'anreise.mapBtn': 'Load map', 'anreise.mapNote': 'The map is loaded from OpenStreetMap only after clicking.',
      'anreise.hours': 'Times', 'anreise.h1': 'Reception daily 7 am – 10 pm', 'anreise.h2': 'Check-in from 3 pm', 'anreise.h3b': 'Check-out until 11 am',
      'foot.beta': 'Beta preview – concept &amp; implementation: Olga Tikhomirova', 'foot.imp': 'Legal notice', 'foot.ds': 'Privacy',
      'foot.sub': 'Augsburg-Hotel<br>Gersthofen',
      'bk.title': 'Book a room', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
    }
  };

  window.SONNENHOF = { ROOMS: ROOMS, MENU: MENU, UI: UI, T: T, META: META };
})();
