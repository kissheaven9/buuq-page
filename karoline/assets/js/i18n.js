/* Gästehaus Karoline — Inhalte: Wohnungsdaten, Saisonpreise, UI-Texte (DE/EN), englische Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Preise laut Preisliste gaestehaus-karoline.de (Stand 06.04.2026): pro Nacht für zwei Personen,
     inkl. Endreinigung, Bettwäsche und Handtüchern. Mindestaufenthalt 5 Tage. Nur Barzahlung.
     Kurbeitrag laut reitimwinkl.de: 3,00 € pro Erwachsenem und Nacht (ganzjährig).
     from = erste Nacht, to = Abreisetag der letzten Nacht. */
  var SEASONS = [
    { id: 'summer', from: '2026-04-25', to: '2026-10-11' },
    { id: 'winter', from: '2026-12-12', to: '2027-03-14' }
  ];
  var RULES = { minNights: 5, tax: 3, maxGuests: 2 };

  var ROOMS = [
    {
      id: 'f5', size: 35, price: { summer: 73, winter: 80 },
      imgs: [['f5-1', 1600], ['f5-2', 1600], ['f5-3', 1600], ['f5-4', 1280], ['balkon', 1280]],
      de: {
        name: 'Ferienwohnung 5',
        cap: 'für 2 Personen · Obergeschoss',
        short: 'Im Obergeschoss, mit Blick über den ganzen Ort und auf das Kaisergebirge. Vom Essplatz sehen Sie ' +
          'durch die Glasfront direkt auf die Berge.',
        text: 'Die Wohnung liegt im Obergeschoss und nach Süden: Sonne von früh bis spät und ein unverbauter Blick ' +
          'über Reit im Winkl und auf das Kaisergebirge. Wohn- und Schlafraum sind getrennt. Der Balkon mit Markise ' +
          'lädt zum Verweilen ein.',
        equip: ['Südbalkon mit Markise', 'Wohnraum mit Sitzgruppe und Couch', 'Schlafzimmer mit Doppelbett, ' +
          'Bandscheibenmatratzen', 'Küche mit Mikrowelle, Toaster, Wasserkocher und Eierkocher', 'Flachbildfernseher, ' +
          'Radio, Internetzugang', 'Bettwäsche und Handtücher inklusive'],
        alts: ['Wohnraum der Ferienwohnung 5 mit roter Sitzgruppe, Esstisch und Balkontür mit Bergblick',
          'Essplatz und Küchenzeile der Ferienwohnung 5', 'Schlafzimmer der Ferienwohnung 5 mit Doppelbett aus Holz',
          'Bad mit Dusche und Waschbecken', 'Balkon mit zwei Liegestühlen und Blick über Reit im Winkl']
      },
      en: {
        name: 'Holiday apartment 5',
        cap: 'for 2 guests · upper floor',
        short: 'On the upper floor, with a view across the whole village to the Kaiser mountains. From the dining ' +
          'table you look straight at the peaks through the glass front.',
        text: 'The apartment is on the upper floor and faces south: sun from morning till evening and an open view ' +
          'across Reit im Winkl to the Kaiser mountains. Living room and bedroom are separate. The balcony with ' +
          'its awning invites you to linger.',
        equip: ['South-facing balcony with awning', 'Living room with seating area and couch', 'Bedroom with double ' +
          'bed and orthopaedic mattresses', 'Kitchen with microwave, toaster, kettle and egg boiler', 'Flat-screen TV, ' +
          'radio, internet access', 'Bed linen and towels included'],
        alts: ['Living room of apartment 5 with red seating, dining table and balcony door with mountain view',
          'Dining table and kitchenette of apartment 5', 'Bedroom of apartment 5 with wooden double bed',
          'Bathroom with shower and washbasin', 'Balcony with two loungers and a view across Reit im Winkl']
      }
    },
    {
      id: 'f50', size: 40, price: { summer: 80, winter: 93 },
      imgs: [['f50-1', 1105], ['f50-2', 1280], ['f50-3', 1086], ['f50-4', 1200], ['f50-5', 1280]],
      de: {
        name: 'Ferienwohnung 50',
        cap: 'für 2 Personen · im Anbau',
        short: 'Die größere Wohnung im neu errichteten Anbau, mit großzügigem Balkon und freiem Blick auf das ' +
          'Kaisergebirge. Eigener Vorraum mit Garderobe.',
        text: 'Die Wohnung im neu errichteten Anbau liegt nach Süden und hat von morgens bis abends Sonne. Der ' +
          'großzügige Balkon mit Markise blickt unverbaut auf die Reit im Winkler Berge. Wohn- und Schlafraum sind ' +
          'getrennt, alle Räume gehen von einem eigenen Vorraum mit Garderobe ab.',
        equip: ['Großer Südbalkon mit Markise', 'Wohnraum mit Sitzgruppe und Couch', 'Schlafzimmer mit Doppelbett, ' +
          'Bandscheibenmatratzen und verstellbaren Lattenrosten', 'Küche mit Geschirrspüler, Kühlschrank, Mikrowelle, ' +
          'Toaster und Wasserkocher', 'Bad mit Dusche, WC und Fußbodenheizung, Föhn', 'Flachbildfernseher, Radio, ' +
          'Internetzugang'],
        alts: ['Wohnraum der Ferienwohnung 50 mit Holzbalkendecke, Esstisch und Fenstern nach Süden',
          'Essplatz der Ferienwohnung 50 mit Blick zur Sitzecke', 'Schlafzimmer der Ferienwohnung 50 mit ' +
          'Zirbenholzwand und Doppelbett', 'Küche mit Kochfeld, Spüle und Kaffeemaschine', 'Bad mit Glasdusche und ' +
          'Waschbecken']
      },
      en: {
        name: 'Holiday apartment 50',
        cap: 'for 2 guests · in the annexe',
        short: 'The larger apartment in the newly built annexe, with a generous balcony and an open view of the ' +
          'Kaiser mountains. Private hallway with wardrobe.',
        text: 'The apartment in the newly built annexe faces south and has sun from morning till evening. The ' +
          'generous balcony with awning looks out over the mountains around Reit im Winkl. Living room and bedroom ' +
          'are separate, and all rooms open off a private hallway with wardrobe.',
        equip: ['Large south-facing balcony with awning', 'Living room with seating area and couch', 'Bedroom with ' +
          'double bed, orthopaedic mattresses and adjustable slatted frames', 'Kitchen with dishwasher, fridge, ' +
          'microwave, toaster and kettle', 'Bathroom with shower, toilet and underfloor heating, hairdryer',
          'Flat-screen TV, radio, internet access'],
        alts: ['Living room of apartment 50 with beamed ceiling, dining table and south-facing windows',
          'Dining table of apartment 50 with a view of the seating corner', 'Bedroom of apartment 50 with pine ' +
          'panelling and double bed', 'Kitchen with hob, sink and coffee machine', 'Bathroom with glass shower and ' +
          'washbasin']
      }
    }
  ];

  var UI = {
    de: {
      'room.from': 'ab', 'room.pn': 'pro Nacht für zwei', 'room.details': 'Details und Fotos',
      'room.book': 'Verfügbarkeit prüfen', 'room.bookThis': 'Diese Wohnung anfragen', 'room.equip': 'Ausstattung',
      'room.photo': 'Foto', 'room.photos': 'Fotos', 'room.priceNote': 'Sommer {s} · Winter {w} pro Nacht für zwei Personen, Endreinigung ' +
        'inklusive. Zuzüglich Kurbeitrag.',
      'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Personen', 'bw.pick': 'Datum wählen',
      'bw.btn': 'Verfügbarkeit prüfen',
      'guest1': 'Person', 'guestN': 'Personen', 'night1': 'Nacht', 'nightN': 'Nächte',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat', 'cal.hintIn': 'Bitte Anreisetag wählen.',
      'cal.hintOut': 'Jetzt den Abreisetag wählen – mindestens 5 Nächte.', 'cal.reset': 'Zurücksetzen',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.off': 'außerhalb der Saison', 'cal.sel': 'Ihre Auswahl',
      'cal.jump': 'Zur Saison springen', 'cal.summer': 'Sommer bis 11.10.', 'cal.winter': 'Winter ab 12.12.',
      'bk.guests': 'Personen', 'bk.persons': 'Personen', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.max': 'Jede Wohnung ist für zwei Personen eingerichtet.',
      'bk.rooms': 'Freie Wohnungen', 'bk.pickDates': 'Wählen Sie An- und Abreise im Kalender.',
      'bk.min': 'Mindestaufenthalt 5 Nächte – bitte einen späteren Abreisetag wählen.',
      'bk.busy': 'In diesem Zeitraum belegt', 'bk.select': 'Auswählen', 'bk.total': 'gesamt',
      'bk.none': 'In diesem Zeitraum sind beide Wohnungen belegt. Bitte wählen Sie andere Tage – oder rufen Sie ' +
        'uns an: +49 8640 797898.',
      'bk.incl': 'Inklusive Endreinigung, Bettwäsche und Handtüchern', 'bk.tax': 'Zuzüglich Kurbeitrag: 3 € pro ' +
        'Person und Nacht.', 'bk.pay': 'Zahlung bar bei Anreise.',
      'bk.summary': 'Ihre Auswahl', 'bk.room': 'Wohnung', 'bk.stay': 'Zeitraum', 'bk.stayNights': 'Übernachtung',
      'bk.taxLine': 'Kurbeitrag', 'bk.price': 'Gesamt, bar vor Ort', 'bk.back': 'Zurück',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.msg': 'Nachricht an die Gastgeber ' +
        '(optional)', 'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">' +
        'Datenschutzerklärung</a> gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung der Buchung ' +
        'verwendet werden.', 'f.submit': 'Verbindlich buchen',
      'e.name': 'Bitte geben Sie Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'e.phone': 'Bitte geben Sie eine Telefonnummer an.', 'e.consent': 'Bitte stimmen Sie der Datenschutzerklärung zu.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'Ihre Buchung ist eingegangen. Die Bestätigung geht an {email}.',
      'ok.no': 'Buchungsnummer', 'ok.demo': 'Dies ist eine Vorschau der neuen Website. Es wurde nichts gebucht und ' +
        'keine Daten wurden übertragen.', 'ok.close': 'Schließen',
      'map.link': 'In OpenStreetMap öffnen', 'map.popup': 'Dosbachweg 2, Reit im Winkl'
    },
    en: {
      'room.from': 'from', 'room.pn': 'per night for two', 'room.details': 'Details and photos',
      'room.book': 'Check availability', 'room.bookThis': 'Request this apartment', 'room.equip': 'Features',
      'room.photo': 'Photo', 'room.photos': 'photos', 'room.priceNote': 'Summer {s} · winter {w} per night for two guests, final cleaning ' +
        'included. Visitor’s tax is extra.',
      'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Choose date',
      'bw.btn': 'Check availability',
      'guest1': 'guest', 'guestN': 'guests', 'night1': 'night', 'nightN': 'nights',
      'cal.prev': 'Previous month', 'cal.next': 'Next month', 'cal.hintIn': 'Please choose your arrival day.',
      'cal.hintOut': 'Now choose your departure day – at least 5 nights.', 'cal.reset': 'Reset',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.off': 'out of season', 'cal.sel': 'your selection',
      'cal.jump': 'Jump to season', 'cal.summer': 'Summer until 11 Oct', 'cal.winter': 'Winter from 12 Dec',
      'bk.guests': 'Guests', 'bk.persons': 'Guests', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.max': 'Each apartment is furnished for two guests.',
      'bk.rooms': 'Available apartments', 'bk.pickDates': 'Choose arrival and departure in the calendar.',
      'bk.min': 'Minimum stay is 5 nights – please choose a later departure day.',
      'bk.busy': 'Booked for these dates', 'bk.select': 'Select', 'bk.total': 'total',
      'bk.none': 'Both apartments are booked for these dates. Please choose other days – or call us: ' +
        '+49 8640 797898.',
      'bk.incl': 'Final cleaning, bed linen and towels included', 'bk.tax': 'Visitor’s tax is extra: €3 per guest ' +
        'per night.', 'bk.pay': 'Payment in cash on arrival.',
      'bk.summary': 'Your selection', 'bk.room': 'Apartment', 'bk.stay': 'Dates', 'bk.stayNights': 'Accommodation',
      'bk.taxLine': 'Visitor’s tax', 'bk.price': 'Total, in cash on site', 'bk.back': 'Back',
      'f.name': 'First and last name', 'f.email': 'Email', 'f.phone': 'Phone', 'f.msg': 'Message to your hosts ' +
        '(optional)', 'f.consent': 'I have read the <a href="datenschutz.html" target="_blank" rel="noopener">' +
        'privacy policy</a> and agree that my details are used to process the booking.', 'f.submit': 'Book now',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid email address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please agree to the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'We have received your booking. The confirmation will be sent ' +
        'to {email}.',
      'ok.no': 'Booking number', 'ok.demo': 'This is a preview of the new website. Nothing has been booked and no ' +
        'data has been transmitted.', 'ok.close': 'Close',
      'map.link': 'Open in OpenStreetMap', 'map.popup': 'Dosbachweg 2, Reit im Winkl'
    }
  };

  var EN = {
    'beta': 'Beta preview — not a final design',
    'brand.aria': 'Gästehaus Karoline – home', 'brand.top': 'Gästehaus Karoline – back to top',
    'nav.aria': 'Main navigation', 'menu.aria': 'Menu', 'menu.nav': 'Mobile navigation', 'lang.aria': 'Language',
    'close': 'Close',
    'nav.apts': 'Apartments', 'nav.hosts': 'Your hosts', 'nav.incl': 'Included', 'nav.seasons': 'Summer &amp; winter',
    'nav.rev': 'Guest reviews', 'nav.prices': 'Prices', 'nav.arr': 'Getting here',
    'cta.check': 'Check availability',
    'mbar.price': 'from <b>€73</b> per night',
    'hero.pre': 'Reit im Winkl · Chiemgau, Bavaria',
    'hero.title': 'A stay with friends&nbsp;– with a view of the Kaiser',
    'hero.lead': 'Two holiday apartments, each for two guests. South-facing balcony, sun from morning till ' +
      'evening, an eight-minute walk to the village centre.',
    'hero.note': 'from <b>€73</b> per night for two guests · final cleaning included · 5&nbsp;nights minimum',
    'hero.alt': 'Gästehaus Karoline: white house with wooden balconies and red geraniums, flower garden in front',
    'score.word': 'Exceptional', 'score.src': '33 reviews · Booking.com',
    'trust.aria': 'Ratings',
    'trust.1': 'Booking.com · 33 reviews', 'trust.2': 'Location · Booking.com', 'trust.3': 'Cleanliness · Booking.com',
    'trust.4': 'TrustYou · 24 reviews',
    'trust.date': 'As of 5 October 2026 · Sources: booking.com, TrustYou via reitimwinkl.de',
    'apts.pre': 'The apartments', 'apts.title': 'Two apartments, each with its own south-facing balcony',
    'apts.lead': 'Both apartments have a separate living room and bedroom, a fitted kitchen and a balcony with ' +
      'awning. They differ mainly in size.',
    'hosts.pre': 'Your hosts', 'hosts.title': 'At home with the Kastner-Wieneke family',
    'hosts.p1': 'Here you spend your holiday with friends in the Chiemgau – in a family atmosphere and with an open ' +
      'view of the Austrian Kaiser mountains.',
    'hosts.p2': 'In summer the garden is a paradise of flowers: in front of the house and behind it, wherever you ' +
      'look, something is in bloom. Your hostess devotes all her spare time to her flowers.',
    'hosts.p3': 'In winter a heated shoe cabinet waits in the entrance. Inside, everyone wears slippers – just like ' +
      'at home.',
    'hosts.l1': 'Non-smoking house', 'hosts.l2': 'Heated entirely with Naturwärme, the local district heat',
    'hosts.l3': 'Garden, lawn and terrace',
    'hosts.alt1': 'Bench under the birch tree with a view of the house and garden',
    'hosts.alt2': 'Roses and summer flowers in the garden, the Kaiser mountains behind',
    'incl.pre': 'Already in the price', 'incl.title': 'What you do not pay extra for',
    'incl.1t': 'Final cleaning and linen',
    'incl.1': 'Final cleaning, made-up beds, bath towels, hand towels and tea towels are included in the price.',
    'incl.2t': 'Three outdoor pools',
    'incl.2': 'With the Schwimm-Card our guests swim for free: in Reit im Winkl, at the Waldbad in Kössen and at ' +
      'Lake Walchsee.',
    'incl.3t': 'Warm, dry boots',
    'incl.3': 'The heated shoe cabinet in the entrance warms and dries hiking and winter boots.',
    'incl.4t': 'Room for bikes and skis', 'incl.4': 'Bicycles and skis are kept in a lockable storage room.',
    'incl.5t': 'Internet', 'incl.5': 'Free internet access in both apartments.',
    'incl.6t': 'Parking at the house', 'incl.6': 'A private guest parking space is of course included.',
    'sea.pre': 'On the doorstep', 'sea.title': 'Hiking in summer, cross-country skiing in winter',
    'sea.lead': 'The house is a good starting point: hiking and cycling trails, cross-country tracks and the golf ' +
      'course are all close by.',
    'sea.alt1': 'Summer view from the balcony across Reit im Winkl to the Kaiser mountains',
    'sea.alt2': 'Snow-covered Reit im Winkl under a blue sky, mountains in the background',
    'sea.1tag': 'Summer · 25 April to 11 October 2026', 'sea.1t': 'Hiking, cycling, swimming',
    'sea.1': 'With the village’s inklusiv&nbsp;Card you ride up to the Winklmoos-Alm for free and can join guided ' +
      'hikes. Afterwards the outdoor pool is waiting – or your balcony.',
    'sea.1p': 'Apartment from <b>€73</b> per night',
    'sea.2tag': 'Winter · 12 December 2026 to 14 March 2027',
    'sea.2t': 'Cross-country, downhill, winter walks',
    'sea.2': 'Reit im Winkl is a climatic health resort and winter sports village. There is a lockable room for ' +
      'your skis, a warming cabinet for your boots – and sun on the south-facing balcony from morning till evening.',
    'sea.2p': 'Apartment from <b>€80</b> per night',
    'rev.pre': 'Guest reviews', 'rev.title': '9.6 out of 10 – what our guests say',
    'rev.q1': '“A very well-kept and well-equipped apartment under the roof, a large balcony with parasol and ' +
      'seating. On our arrival there were fresh flowers from the garden and a home-baked cake on the table.”',
    'rev.c1': 'Germany · Booking.com · translated from German',
    'rev.q2': '“The house is superbly located, with a fantastic view of the surrounding mountains. The host family ' +
      'is very friendly and obliging.”',
    'rev.c2': 'Germany · Booking.com · translated from German',
    'rev.q3': '“The view of the Kaisergebirge from the balcony and the apartment itself was breathtaking. The ' +
      'apartment is very functionally furnished and has a warm, cozy atmosphere, making you feel at home right away.”',
    'rev.c3': 'Slovenia · Booking.com',
    'rev.date': 'Reviews from Booking.com, retrieved on 5 October 2026.', 'rev.link': 'Read all 33 reviews',
    'pr.pre': 'Prices 2026 / 27', 'pr.title': 'One price per night – for two guests',
    'pr.th0': 'Apartment', 'pr.th1': 'Summer', 'pr.th2': 'Winter',
    'pr.r1': 'Holiday apartment 5', 'pr.r2': 'Holiday apartment 50',
    'pr.note': 'Prices are per night for two guests and include final cleaning, made-up beds, bath towels, hand ' +
      'towels and tea towels. The municipal visitor’s tax is extra: €3.00 per adult per night. For prices in the ' +
      'early and late season, please give us a call.',
    'know.title': 'Good to know',
    'know.1t': 'Minimum stay', 'know.1': '5 nights', 'know.2t': 'Arrival', 'know.2': '4 pm to 8 pm',
    'know.3t': 'Departure', 'know.3': '7 am to 9.30 am', 'know.4t': 'Payment', 'know.4': 'cash on site',
    'know.5t': 'Booking', 'know.5': 'up to one day before arrival', 'know.6t': 'Pets', 'know.6': 'not allowed',
    'arr.pre': 'Dosbachweg 2 · 83242 Reit im Winkl', 'arr.title': 'How to find us',
    'arr.1t': 'From Munich',
    'arr.1': 'Take the A&nbsp;8 Munich–Salzburg to the Bernau exit, then follow the German Alpine Road (B&nbsp;305) ' +
      'to Reit im Winkl – 27&nbsp;kilometres.',
    'arr.2t': 'Via the Inn valley',
    'arr.2': 'At the Inntal junction head for Innsbruck as far as the Oberaudorf exit, then via Walchsee and Kössen ' +
      'to Reit im Winkl.',
    'arr.3t': 'From Salzburg',
    'arr.3': 'Take the A&nbsp;8 to the Siegsdorf exit and continue via Ruhpolding to Reit im Winkl.',
    'arr.addr': 'From the house it is about an eight-minute walk to the village centre.',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the ' +
      'OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in our privacy policy',
    'final.pre': 'Directly with your hosts', 'final.title': 'When may we welcome you?',
    'final.text': 'Choose your dates – you will see at once which apartment is free and what your stay costs.',
    'final.or': 'Or give us a call:',
    'foot.aria': 'Legal', 'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Kastner-Wieneke',
    'foot.beta': 'Beta preview – concept &amp; build: Olga Tikhomirova',
    'bk.title': 'Availability &amp; booking', 'bk.step1': 'Dates &amp; apartment', 'bk.step2': 'Your details',
    'bk.step3': 'Confirmation'
  };

  window.KAROLINE = { ROOMS: ROOMS, SEASONS: SEASONS, RULES: RULES, UI: UI, EN: EN };
})();
