/* Landgasthof Sternen, Bühler — Inhalte: Zimmer und Preise (sternen-appenzellerland.ch/zimmer-preise, Zimmerpreisliste 2023),
   Speisekarte «Fit in den Sommer» (aktuelle-Speisekarte.pdf, Juni 2024), Jahresprogramm 2026 (aktuelles-Jahresprogramm.pdf),
   Booking.com (27.10.2026). Deutsch steht im HTML; Englisch über data-i18n. */
(function () {
  'use strict';

  /* Zimmerpreise pro Zimmer und Nacht in CHF inkl. Frühstück, Kurtaxe und MwSt (Website «Zimmer & Preise», 27.10.2026).
     Kinder im Zimmer der Eltern: bis 6 Jahre gratis, 6–12 CHF 40, 13–15 CHF 55; Zusatzbett Erwachsene CHF 55.
     Familienzimmer CHF 160–280 (Zimmerpreisliste 2023): in der Vorschau 160 für zwei Erwachsene plus Kinder-/Zusatzbett-Tarif,
     höchstens 280 – Richtwert, siehe FAKTEN.md. Ab 5 Übernachtungen 10 % Rabatt. */
  var ROOMS = [
    {
      id: 'einzel', base: 100, adultsMin: 1, adultsMax: 1, extraMax: 0, busy: 3,
      imgs: [['zimmer-einzel-1', 600], ['zimmer-einzel-2', 600], ['zimmer-einzel-3', 360]],
      de: {
        name: 'Einzelzimmer mit Dusche', cap: '1 Person', short: 'Einzelbett, Schreibtisch, eigene Dusche/WC – neu im Landhausstil.',
        text: 'Für alle, die allein unterwegs sind: Einzelbett im Landhausstil, Schreibtisch, Flachbild-TV und eigene Dusche/WC. Wie alle Zimmer weg von der Strasse, mit Blick in die Hügel.',
        equip: ['Einzelbett', 'Eigene Dusche/WC, Föhn', 'Flachbild-TV', 'Schreibtisch, Kleiderschrank', 'Kaffeemaschine', 'WLAN', 'Nichtraucher'],
        alts: ['Einzelzimmer mit Holzbett, Sessel und Schreibtisch unter der Dachschräge', 'Badezimmer des Einzelzimmers mit Glasdusche', 'Kleiderschrank aus hellem Holz im Zimmer']
      },
      en: {
        name: 'Single room with shower', cap: '1 guest', short: 'Single bed, desk, private shower/WC – newly furnished in country style.',
        text: 'For those travelling alone: single bed in country style, desk, flat-screen TV and private shower/WC. Like all rooms away from the road, with a view of the hills.',
        equip: ['Single bed', 'Private shower/WC, hairdryer', 'Flat-screen TV', 'Desk, wardrobe', 'Coffee machine', 'Wi-Fi', 'Non-smoking'],
        alts: ['Single room with wooden bed, armchair and desk under the sloping roof', 'Bathroom of the single room with glass shower', 'Light wooden wardrobe in the room']
      }
    },
    {
      id: 'doppel', base: 180, adultsMin: 2, adultsMax: 2, extraMax: 1, busy: 3,
      imgs: [['zimmer-doppel-3', 1400], ['zimmer-doppel-1', 600], ['zimmer-doppel-2', 600], ['zimmer-doppel-bad', 800]],
      de: {
        name: 'Doppelzimmer mit Dusche', cap: '2 Personen · Zusatzbett möglich', short: 'Zwei Betten, Sitzecke, Schreibtisch, eigene Dusche/WC; Zusatzbett für eine dritte Person.',
        text: 'Geräumiges Zimmer mit zwei Betten, Sitzecke und Schreibtisch, eigener Dusche/WC und Flachbild-TV. Ein Zusatzbett für eine dritte Person ist möglich (Erwachsene CHF 55, Kinder nach Alter).',
        equip: ['Zwei Betten', 'Eigene Dusche/WC, Föhn', 'Flachbild-TV', 'Sitzecke, Schreibtisch', 'Kaffeemaschine', 'Zusatzbett möglich', 'WLAN', 'Nichtraucher'],
        alts: ['Doppelzimmer mit Holzbetten, Glasdusche und Blick zur Tür', 'Doppelbett mit weisser Bettwäsche und Bergbild an der Holzwand', 'Schreibtisch mit Stuhl und Fernseher im Doppelzimmer', 'Badezimmer mit Dusche, Lavabo und Holzelementen']
      },
      en: {
        name: 'Double room with shower', cap: '2 guests · extra bed possible', short: 'Two beds, seating area, desk, private shower/WC; extra bed for a third guest.',
        text: 'Spacious room with two beds, seating area and desk, private shower/WC and flat-screen TV. An extra bed for a third guest is possible (adults CHF 55, children by age).',
        equip: ['Two beds', 'Private shower/WC, hairdryer', 'Flat-screen TV', 'Seating area, desk', 'Coffee machine', 'Extra bed possible', 'Wi-Fi', 'Non-smoking'],
        alts: ['Double room with wooden beds, glass shower and view towards the door', 'Double bed with white linen and a mountain picture on the wooden wall', 'Desk with chair and TV in the double room', 'Bathroom with shower, washbasin and wooden elements']
      }
    },
    {
      id: 'familie', base: 160, max: 280, adultsMin: 2, adultsMax: 4, extraMax: 2, busy: 2,
      imgs: [['zimmer-familie-1', 1400], ['zimmer-familie-2', 1400], ['zimmer-familie-3', 1400], ['zimmer-familie-4', 1400], ['zimmer-familie-bad', 1400]],
      de: {
        name: 'Familienzimmer', cap: '2 Erwachsene und bis zu 2 Kinder', short: 'Geräumiges Doppelzimmer, Ankleide, Dusche/WC und ein separat abschliessbares Zimmer mit Kajütenbett (2 m).',
        text: 'Ein geräumiges Doppelzimmer mit Ankleide und Dusche/WC – und dazu ein separat abschliessbares Zimmer mit Kajütenbett (2 m). Sehr gut geeignet für Familien, aber auch für Vereine, Reisegruppen oder Freunde.',
        equip: ['Doppelzimmer mit Ankleide', 'Separates Zimmer mit Kajütenbett (2 m)', 'Eigene Dusche/WC, Föhn', 'Flachbild-TV', 'Kaffeemaschine', 'WLAN', 'Nichtraucher'],
        alts: ['Familienzimmer: Holzbett mit Sessel, blauem Teppich und Stehlampe', 'Kajütenbett aus hellem Holz mit Leiter im separaten Zimmer', 'Schreibtisch mit Kaffeemaschine, Wasserflasche und Tulpe', 'Zimmer mit zwei Betten und Glasdusche unter der Dachschräge', 'Weiss gefliestes Badezimmer mit Dusche und Lavabo']
      },
      en: {
        name: 'Family room', cap: '2 adults and up to 2 children', short: 'Spacious double room, dressing area, shower/WC and a separate lockable room with a bunk bed (2 m).',
        text: 'A spacious double room with dressing area and shower/WC – plus a separate lockable room with a bunk bed (2 m). Ideal for families, but also for clubs, groups or friends.',
        equip: ['Double room with dressing area', 'Separate room with bunk bed (2 m)', 'Private shower/WC, hairdryer', 'Flat-screen TV', 'Coffee machine', 'Wi-Fi', 'Non-smoking'],
        alts: ['Family room: wooden bed with armchair, blue carpet and floor lamp', 'Light wooden bunk bed with ladder in the separate room', 'Desk with coffee machine, water bottle and tulip', 'Room with two beds and glass shower under the sloping roof', 'White-tiled bathroom with shower and washbasin']
      }
    }
  ];
  var CHILD = { u6: 0, c612: 40, c1315: 55 };
  var EXTRA_ADULT = 55;

  /* Speisekarte «Fit in den Sommer» (PDF, 26.06.2024). [de, en, desc_de, desc_en, Preis] */
  var MENU = [
    { id: 'fit', items: [
      ['Frischi’s Hacksteak', 'Frischi’s minced steak', 'hausgemacht, mit Kräuterbutter', 'homemade, with herb butter', '25.00'],
      ['Appenzeller Cordon bleu vom Schwein', 'Appenzeller cordon bleu (pork)', 'mit Mostbröckli und Appenzellerkäse gefüllt', 'filled with Mostbröckli and Appenzeller cheese', '32.50'],
      ['Gebratenes Eglifilet im Bierteig', 'Fried perch fillet in beer batter', 'Brauerei Locher, mit Mandelbutter', 'Locher brewery, with almond butter', '35.00'],
      ['Black-Crevetten', 'Black tiger prawns', 'mit Limettenbutter', 'with lime butter', '33.00'],
      ['Rindsfilet 160 / 200 g', 'Beef fillet 160 / 200 g', 'mit Kräuterbutter', 'with herb butter', '47.00 / 49.00'],
      ['Rösti', 'Rösti', 'mit bunten Salaten und Früchten', 'with mixed salads and fruit', '22.00']
    ] },
    { id: 'vor', items: [
      ['Bouillon mit Flädli', 'Broth with pancake strips', '', '', '9.40'],
      ['Gartenerbsensuppe mit Minze', 'Garden pea soup with mint', 'mit frittierten Egliknusperli', 'with crispy fried perch', '13.50'],
      ['Rindscarpaccio', 'Beef carpaccio', 'im Maggiapfeffer-Thymianmantel, Eierschwämmli, Rucola, Parmesan', 'in Maggia pepper and thyme crust, chanterelles, rocket, parmesan', '19.50'],
      ['Vitello tonnato', 'Vitello tonnato', 'Vorspeise / Hauptgang', 'starter / main course', '19.50 / 26.50'],
      ['Beefsteak Tatar', 'Steak tartare', 'mild, mittel, scharf oder feurig · ½ Portion 22.50', 'mild, medium, hot or fiery · half portion 22.50', '31.50'],
      ['Beefsteak Tatar Café de Paris', 'Steak tartare Café de Paris', 'kurz mit Kräuterbutter überbacken', 'briefly gratinated with herb butter', '32.50']
    ] },
    { id: 'haupt', items: [
      ['Flambierte Kalbsleberli', 'Flambéed calf’s liver', 'mit Salbei, Zwiebeln, Knoblauch und Cognac, Butterröschti · «es het solangs het»', 'with sage, onions, garlic and cognac, butter rösti · while stocks last', '36.50'],
      ['Appenzeller Cordon bleu', 'Appenzeller cordon bleu', 'vom Schwein 33.50 / vom Kalb 39.50, Pommes frites und Gemüse', 'pork 33.50 / veal 39.50, French fries and vegetables', '33.50 / 39.50'],
      ['Kalbsgeschnetzeltes «Zürcher Art»', 'Sliced veal Zurich style', 'an Champignonrahmsauce, Butterröschti', 'with mushroom cream sauce, butter rösti', '39.50'],
      ['Rindsfiletspitzen «Stroganoff»', 'Beef fillet tips Stroganoff', 'mit Spätzli und Broccoli', 'with spaetzle and broccoli', '42.50'],
      ['Zartes Rindsfilet mit Eierschwämmliragout', 'Tender beef fillet with chanterelle ragout', 'hausgemachte Eierschwämmliravioli, Broccoliröösli', 'homemade chanterelle ravioli, broccoli florets', '47.50'],
      ['Zanderfilets «Toscana»', 'Pike-perch fillets Toscana', 'mit Weissweinrisotto und mediterranem Gemüse', 'with white wine risotto and Mediterranean vegetables', '39.00']
    ] },
    { id: 'klassik', items: [
      ['Frischi’s Hackbraten', 'Frischi’s meatloaf', 'mit Kartoffelstock und Gemüse', 'with mashed potatoes and vegetables', '29.50'],
      ['Wurst-Käsesalat garniert', 'Sausage and cheese salad', 'mit bunten Salaten und Zwiebeln · einfach 12.50', 'with mixed salads and onions · plain 12.50', '18.50'],
      ['Schweinsschnitzel paniert', 'Breaded pork escalope', 'mit Pommes frites · vom Kalb 38.00', 'with French fries · veal 38.00', '24.50'],
      ['Weissweinrisotto', 'White wine risotto', 'mit getrockneten Tomaten, Oliven und mediterranem Gemüse', 'with dried tomatoes, olives and Mediterranean vegetables', '28.00']
    ] },
    { id: 'suess', items: [
      ['Möschterli-Teller', 'Möschterli plate', '«e chli vo Allem»', '“a little of everything”', '15.00'],
      ['Hausgemachte Meringues mit Rahm', 'Homemade meringues with cream', 'mit Vanilleglace und Erdbeer-Himbeersorbet 9.50 / 11.50', 'with vanilla ice cream and strawberry-raspberry sorbet 9.50 / 11.50', '7.50 / 9.50'],
      ['Grossmutters «Gschlabber»', 'Grandmother’s “Gschlabber”', 'gebrannte Crème mit Vanilleglace und Früchten', 'caramel cream with vanilla ice cream and fruit', '7.80 / 9.50'],
      ['Warmer Schokoladenkuchen', 'Warm chocolate cake', 'mit geröstetem Pistazienglace und Früchten', 'with roasted pistachio ice cream and fruit', '14.50'],
      ['Käseteller (6 Sorten)', 'Cheese plate (6 kinds)', 'Weich- und Hartkäse mit Garnituren und Schlorzifladen', 'soft and hard cheeses with garnishes and Schlorzifladen', '16.00']
    ] }
  ];

  /* Jahresprogramm 2026 (aktuelles-Jahresprogramm.pdf, 20.08.2026). to = letzter Tag (Vergangenes wird abgeblendet). */
  var PROG = [
    { to: '2026-09-12', de: ['Fr/Sa 11. + 12. September, ab 19 Uhr', 'Alpschwein Metzgete-Buffet', 'Vo de Gerstensoppe, öber grosses Vorspiise-, zom Hauptgang- ond Dessertbüffet – mit Allem, was dazu gehört'], en: ['Fri/Sat 11 + 12 September, from 7 pm', 'Alpine pork “Metzgete” buffet', 'From barley soup over a big starter buffet to the main course and dessert buffet – with everything that goes with it'], price: 'CHF 56' },
    { to: '2026-10-17', de: ['25. September – 11. Oktober', 'Reichhaltiges Wildbuffet', 'Wild aus einheimischer Jagd in mindestens 16 Variationen: Suppe, Vorspeisenbuffet mit Terrinen, Pastete, Tatar, Carpaccio, Hauptgangbuffet und ein riesiges Dessertbuffet. Fr 25.9., Fr 2. + 9.10., Sa 3. + 10.10. um 19 Uhr, So 11.10. um 11.30 Uhr, ev. Fr 16. + Sa 17.10.'], en: ['25 September – 11 October', 'Rich game buffet', 'Game from local hunting in at least 16 variations: soup, starter buffet with terrines, pâté, tartare, carpaccio, main course buffet and a huge dessert buffet. Fri 25.9., Fri 2 + 9.10., Sat 3 + 10.10. at 7 pm, Sun 11.10. at 11.30 am, possibly Fri 16 + Sat 17.10.'], price: 'CHF 110' },
    { to: '2026-10-23', de: ['Fr 23. Oktober, im bSONDERig', 'Wine & Dine – sortenrein und vertikal mit Vogelsanger Weinen', 'Kulinarik in 5 Gängen mit Weinbegleitung'], en: ['Fri 23 October, at bSONDERig', 'Wine & Dine – single-variety and vertical with Vogelsanger wines', 'Five-course dinner with wine pairing'], price: 'CHF 135' },
    { to: '2026-12-31', de: ['25./26./31. Dezember', 'Weihnachts- und Silvestermenus', 'Verschiedene weihnachtliche Menus; an Silvester ein Galamenu im bSONDERig mit Silvesterkläusen'], en: ['25/26/31 December', 'Christmas and New Year’s Eve menus', 'Various festive menus; on New Year’s Eve a gala menu at bSONDERig with the Silvesterkläuse'], price: '' }
  ];

  var UI = {
    de: {
      'open.now': 'Jetzt geöffnet', 'open.until': 'bis {t} Uhr', 'open.closed': 'Heute Ruhetag', 'open.sunday': 'Heute geschlossen (2. Sonntag im Monat)',
      'open.before': 'Heute ab 9 Uhr geöffnet', 'open.after': 'Heute geschlossen', 'open.tomorrow': 'morgen ab 9 Uhr',
      'room.details': 'Fotos & Details', 'room.book': 'Buchen', 'room.bookThis': 'Dieses Zimmer buchen', 'room.night': 'pro Nacht', 'room.from': 'ab',
      'room.equip': 'Ausstattung', 'room.prices': 'Preise pro Nacht', 'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'room.p2': 'Zimmer (Grundpreis)', 'room.pExtra': 'Zusatzbett Erwachsene', 'room.pChild': 'Kinder bis 6 / 6–12 / 13–15 Jahre', 'room.pChildV': 'gratis / CHF 40 / CHF 55',
      'room.pMax': 'Höchstpreis bei voller Belegung',
      'cal.hintIn': 'Anreisetag wählen', 'cal.hintOut': 'Abreisetag wählen', 'cal.reset': 'zurücksetzen', 'cal.prev': 'Vormonat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.closed': 'nicht buchbar', 'cal.ruhe': 'Restaurant-Ruhetag, Anreise möglich', 'cal.sel': 'gewählt',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.adultsNote': 'ab 16 Jahren', 'bk.u6': 'Kinder bis 6 Jahre', 'bk.u6Note': 'gratis im Zimmer der Eltern',
      'bk.c612': 'Kinder 6–12 Jahre', 'bk.c612Note': 'CHF 40 pro Nacht', 'bk.c1315': 'Kinder 13–15 Jahre', 'bk.c1315Note': 'CHF 55 pro Nacht',
      'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie Anreise und Abreise – dann sehen Sie Preis und Verfügbarkeit.',
      'bk.small': 'für diese Gästezahl nicht geeignet', 'bk.busy': 'in diesem Zeitraum belegt', 'bk.total': 'gesamt', 'bk.select': 'Wählen',
      'bk.none': 'In diesem Zeitraum ist kein passendes Zimmer frei. Rufen Sie uns an: +41 71 793 17 58 – vielleicht lässt sich etwas einrichten.',
      'bk.fine': 'Preise pro Zimmer und Nacht inkl. Frühstück, Kurtaxe und MwSt. Ab 5 Übernachtungen 10 % Rabatt. Halbpension (+ CHF 50 pro Person) bitte im Nachrichtenfeld vermerken. Familienzimmer: CHF 160–280 je nach Belegung, Richtwert.',
      'bk.summary': 'Ihre Buchung', 'bk.room': 'Zimmer', 'bk.stay': 'Aufenthalt', 'bk.lineRoom': 'Zimmer', 'bk.lineExtra': 'Zusatzbett Erwachsene', 'bk.lineChild': 'Kinder',
      'bk.lineDisc': 'Rabatt ab 5 Übernachtungen (10 %)', 'bk.price': 'Gesamtpreis', 'bk.back': 'Zurück',
      'bk.ruheNote': 'Anreise am Mittwoch: Das Restaurant hat Ruhetag, Sie erhalten vorab einen Türcode für den Self-Check-in.',
      'person1': 'Gast', 'personN': 'Gäste', 'night1': 'Nacht', 'nightN': 'Nächte', 'child1': 'Kind', 'childN': 'Kinder', 'adult1': 'Erwachsener', 'adultN': 'Erwachsene',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.msg': 'Nachricht (Halbpension, Ankunftszeit, Wünsche)',
      'f.consent': 'Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Buchung verwendet werden (Datenschutz).', 'f.submit': 'Verbindlich buchen',
      'e.name': 'Bitte Vor- und Nachnamen angeben.', 'e.email': 'Bitte eine gültige E-Mail-Adresse angeben.', 'e.phone': 'Bitte eine Telefonnummer angeben.', 'e.consent': 'Bitte bestätigen Sie die Einwilligung.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'Ihre Buchung ist bei uns eingegangen. Die Bestätigung senden wir an {email}.', 'ok.no': 'Buchungsnummer',
      'ok.demo': 'Beta-Vorschau: Dies ist eine Demonstration des Buchungsablaufs. Es wurde nichts gebucht und keine Daten wurden übermittelt.', 'ok.close': 'Schliessen',
      'map.link': 'Auf OpenStreetMap öffnen', 'prog.past': 'vorbei'
    },
    en: {
      'open.now': 'Open now', 'open.until': 'until {t}', 'open.closed': 'Closed today (rest day)', 'open.sunday': 'Closed today (2nd Sunday of the month)',
      'open.before': 'Opens today at 9 am', 'open.after': 'Closed for today', 'open.tomorrow': 'tomorrow from 9 am',
      'room.details': 'Photos & details', 'room.book': 'Book', 'room.bookThis': 'Book this room', 'room.night': 'per night', 'room.from': 'from',
      'room.equip': 'Amenities', 'room.prices': 'Prices per night', 'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo',
      'room.p2': 'Room (base price)', 'room.pExtra': 'Extra bed, adult', 'room.pChild': 'Children under 6 / 6–12 / 13–15', 'room.pChildV': 'free / CHF 40 / CHF 55',
      'room.pMax': 'Maximum price at full occupancy',
      'cal.hintIn': 'Choose arrival date', 'cal.hintOut': 'Choose departure date', 'cal.reset': 'reset', 'cal.prev': 'Previous month', 'cal.next': 'Next month',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.closed': 'not bookable', 'cal.ruhe': 'restaurant closed, arrival possible', 'cal.sel': 'selected',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.adultsNote': '16 years and older', 'bk.u6': 'Children under 6', 'bk.u6Note': 'free in the parents’ room',
      'bk.c612': 'Children 6–12', 'bk.c612Note': 'CHF 40 per night', 'bk.c1315': 'Children 13–15', 'bk.c1315Note': 'CHF 55 per night',
      'bk.less': 'fewer', 'bk.more': 'more',
      'bk.rooms': 'Rooms', 'bk.pickDates': 'Choose arrival and departure to see price and availability.',
      'bk.small': 'not suitable for this number of guests', 'bk.busy': 'booked in this period', 'bk.total': 'total', 'bk.select': 'Select',
      'bk.none': 'No suitable room is available in this period. Call us: +41 71 793 17 58 – perhaps something can be arranged.',
      'bk.fine': 'Prices per room and night incl. breakfast, visitor’s tax and VAT. 10 % discount from 5 nights. Half board (+ CHF 50 per person): please mention it in the message field. Family room: CHF 160–280 depending on occupancy, indicative.',
      'bk.summary': 'Your booking', 'bk.room': 'Room', 'bk.stay': 'Stay', 'bk.lineRoom': 'Room', 'bk.lineExtra': 'Extra bed, adult', 'bk.lineChild': 'Children',
      'bk.lineDisc': 'Discount from 5 nights (10 %)', 'bk.price': 'Total', 'bk.back': 'Back',
      'bk.ruheNote': 'Arrival on Wednesday: the restaurant is closed; you will receive a door code for self check-in in advance.',
      'person1': 'guest', 'personN': 'guests', 'night1': 'night', 'nightN': 'nights', 'child1': 'child', 'childN': 'children', 'adult1': 'adult', 'adultN': 'adults',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.msg': 'Message (half board, arrival time, wishes)',
      'f.consent': 'I agree that my details are used to process the booking (privacy policy).', 'f.submit': 'Book now',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid e-mail address.', 'e.phone': 'Please enter a phone number.', 'e.consent': 'Please confirm your consent.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'We have received your booking. The confirmation will be sent to {email}.', 'ok.no': 'Booking number',
      'ok.demo': 'Beta preview: this is a demonstration of the booking flow. Nothing has been booked and no data has been sent.', 'ok.close': 'Close',
      'map.link': 'Open in OpenStreetMap', 'prog.past': 'past'
    }
  };

  var META = {
    en: { title: 'Landgasthof Sternen, Bühler · Restaurant in Appenzellerland and 8 rooms', desc: 'Landgasthof Sternen in Bühler between St. Gallen and Appenzell: fresh Swiss cooking by Ralph Frischknecht, winter garden, Beizli, garden with playground, Sternenzauber in winter – and 8 rooms from CHF 100 with breakfast. 9.2 out of 10 from 203 reviews on Booking.com.' }
  };

  var T = {
    en: {
      'beta': 'Beta preview — not a final design', 'brand.sub': 'Bühler · Appenzellerland',
      'nav.kueche': 'Kitchen', 'nav.raeume': 'Rooms & events', 'nav.zimmer': 'Guest rooms', 'nav.gastgeber': 'Hosts', 'nav.stimmen': 'Guest reviews', 'nav.anreise': 'Getting here',
      'nav.book': 'Book a room', 'nav.menu': 'Menu', 'lang.aria': 'Language', 'modal.close': 'Close', 'hero.table': 'Reserve a table',
      'hero.kicker': 'Landgasthof Sternen · Dorfstrasse 97, 9055 Bühler AR · 250 m from the station',
      'hero.h1': 'Honest fresh Swiss cooking – and eight rooms upstairs.',
      'hero.h1row': 'Thursday to Monday', 'hero.h1val': '9 am – midnight', 'hero.h2row': 'Tuesday, Wednesday', 'hero.h2val': 'closed', 'hero.h3row': 'Every 2nd Sunday of the month', 'hero.h3val': 'closed',
      'door1.alt': 'Braised beef with sauce, gnocchi and vegetables on a white plate at the Sternen',
      'door1.h2': 'Eating at the Sternen', 'door1.p': 'Frischi’s minced steak, Appenzeller cordon bleu, flambéed calf’s liver – in the winter garden with a view of the hills, in the Beizli or in the garden. In the kitchen: Ralph Frischknecht.',
      'door2.alt': 'Country-style room with wooden bed, armchair, blue carpet and floor lamp',
      'door2.h2': 'Sleeping above the restaurant', 'door2.p': 'Eight cosy country-style rooms, all away from the road. Double room CHF 180, single room CHF 100 – including breakfast and visitor’s tax.',
      'kueche.kicker': 'Kitchen · From the menu', 'kueche.h2': 'Honest, fresh, with a touch of gourmet',
      'kueche.p': 'An excerpt from the menu “Fit in den Sommer” (June 2024, PDF on sternen-appenzellerland.ch). Prices in CHF incl. VAT. Ask in the house for the daily specials and the lunch menu.',
      'karte.g1': 'Fitness plates – with salads and fruit', 'karte.g2': 'To start, starters and tartare', 'karte.g3': 'From the pasture and from the water', 'karte.g4': 'The classics', 'karte.g5': 'Sweet temptation',
      'karte.note': 'Senior portions, vegetarian dishes and a cheese plate with Schlorzifladen are on the menu. Coupes have their own menu.',
      'kueche.alt1': 'Dessert plate with small sweets, berries and chocolate on a glass plate', 'kueche.cap1': 'Möschterli plate: “a little of everything”',
      'kueche.alt2': 'Plate with meat, vegetables and sauce, photographed from above', 'kueche.alt3': 'Starter with tuna, salad and lemon on a white plate',
      'prog.kicker': 'Programme 2026', 'prog.h2': 'Metzgete, game buffet, Wine & Dine, New Year’s Eve',
      'prog.p': 'The house’s programme as published in its PDF. Wine & Dine and the New Year’s Eve gala menu take place at bSONDERig – the Frischknecht family’s second house in Stein AR. Limited seats, reservation on +41 71 793 17 58.',
      'night.kicker': 'Sternenzauber · 6 November 2026 to 28 February 2027', 'night.h2': 'A winter dream under the starry sky',
      'night.p': 'In winter the illuminated dome tent stands in the garden: enjoy and dine well, atmospheric and cosy, with a view of the night sky over Appenzellerland. A very special treat – also as a gift.',
      'night.alt1': 'Blue illuminated dome tent in the garden of the Sternen at dusk', 'night.alt2': 'Set table in the red-lit dome tent with candles', 'night.alt3': 'Green-lit tunnel of the dome tent with tables',
      'raeume.kicker': 'Rooms · For 2 to 70 people', 'raeume.h2': 'Winter garden, Beizli, Sternenjuwel, garden',
      'raeume.p': 'Family celebrations, birthdays, confirmations, wedding and company aperitifs, clubs, meetings: the rooms of the Sternen give you the space you need.',
      'raeume.alt1': 'The winter garden with set tables, red chairs and large windows to the hills', 'raeume.n1': 'à la carte · up to 70 for events', 'raeume.t1': 'Winter garden (hall)',
      'raeume.p1': 'Renovated in summer 2019: very bright, with three large window fronts to the terrace, the playground and the typical Appenzell hills. For family celebrations, birthdays, confirmations and larger events.',
      'raeume.alt2': 'The garden of the Sternen in the sun with parasols, tables and the wooden house', 'raeume.t2': 'Garden',
      'raeume.p2': 'Quiet at the back of the house, away from the road, with an open view of the hills. For leisurely hours, wedding and company aperitifs. The playground is easy to keep an eye on.',
      'raeume.alt3': 'Round wooden table in the Beizli, festively set with glasses and folded napkins', 'raeume.n3': 'seats · max. 16 at one table', 'raeume.t3': 'Beizli',
      'raeume.p3': 'Rustic, cosy, with several niches. After-work beer guests and clubs are very welcome.',
      'raeume.alt4': 'The Sternenjuwel meeting room with long wooden table, red chairs and natural stone wall', 'raeume.n4': 'as a meeting room · banquets up to 12', 'raeume.t4': 'Sternenjuwel',
      'raeume.p4': 'Ideal for smaller groups and banquets in a cosy setting. Large TV, laptop connections. Very quiet – perfect for focused work and meetings.',
      'raeume.cta': 'Enquire about an event',
      'zimmer.kicker': 'Rooms & prices', 'zimmer.h2': 'Eight rooms, all away from the road',
      'zimmer.p': 'Newly furnished in country style, with a view of the typical Appenzell hills. All prices per room and night, including breakfast, visitor’s tax and VAT.',
      'zimmer.score': 'out of 10 from 203 reviews on Booking.com · staff 9.7, cleanliness 9.4 · as of 27 October 2026',
      'pr.th1': 'Room', 'pr.th2': 'Occupancy', 'pr.th3': 'per night', 'pr.r1': 'Single room with shower', 'pr.r1b': '1 guest', 'pr.r2': 'Double room with shower', 'pr.r2b': '2 guests',
      'pr.r3': 'Family room<small>Double room, dressing area, separate room with bunk bed</small>', 'pr.r3s': 'Double room, dressing area, separate room with bunk bed', 'pr.r3b': '2 adults and children',
      'pr.r4': 'Extra bed in the double room', 'pr.r4b': 'adults', 'pr.r5': 'Children in the parents’ room', 'pr.r5b': 'under 6 / 6–12 / 13–15', 'pr.r5c': 'free / CHF&nbsp;40 / CHF&nbsp;55',
      'pr.r6': 'Half board (3 courses)', 'pr.r6b': 'per person', 'pr.r7': 'Full board', 'pr.r7b': 'per person', 'pr.r8': 'From 5 nights', 'pr.r8c': '10 % discount',
      'pr.note': 'All rooms are non-smoking; pets are not allowed in the rooms. Check-in from 12 noon, check-out by 11 am. On Wednesdays (rest day) you receive a door code for self check-in after booking.',
      'host.kicker': 'Hosts', 'host.h2': 'Yvonne and Ralph Frischknecht',
      'host.p1': 'The host couple runs the Sternen together with their children. Ralph Frischknecht is in the kitchen – Frischi’s minced steak and Frischi’s meatloaf carry his name. “Gastronomy with passion. Where the guest is still king.”',
      'host.p2': 'The whole team looks after your wishes – in the restaurant, in the hotel, in the kitchen. The house also trains apprentices: in February 2026 the apprentices spoiled guests for four weeks with their own smaller menu.',
      'host.alt1': 'Hands at the stove: diced potatoes being seasoned in the pan', 'host.alt2': 'Painted Appenzell farmhouse cupboard in green with floral motifs', 'host.alt3': 'Old tiled stove with painted tiles at the entrance',
      'host.f1': 'The house', 'host.f1v': 'Country inn with winter garden, Beizli, Sternenjuwel, garden with playground and 8 rooms – central in Bühler, with a view of the Appenzell hills',
      'host.f2': 'Kitchen', 'host.f2v': 'Honest fresh Swiss cooking with a touch of gourmet; game from local hunting in autumn, alpine pork Metzgete in September',
      'host.f3': 'Second house', 'host.f3v': 'bSONDERig by Frischknecht’s in Stein AR – home of Wine & Dine and the New Year’s Eve gala menu',
      'host.f4': 'Guests say', 'host.f4v': '“Staff always smiles and service is splendid” – Koenraad from the Netherlands, on his third stay (Booking.com)',
      'stimmen.kicker': 'Guest reviews', 'stimmen.h2': '“Always the best, 3rd stay.”',
      'score.sub': 'out of 10 · 203 reviews on Booking.com, as of 27 October 2026',
      'score.b1': 'Staff', 'score.b2': 'Cleanliness', 'score.b3': 'Comfort', 'score.b4': 'Facilities', 'score.b5': 'Location', 'score.b6': 'Wi-Fi', 'score.b7': 'Value for money',
      'score.local': 'On local.ch: 4.8 out of 5 from 241 reviews (27 October 2026).',
      'q1.src': 'Koenraad, Netherlands · third stay · Booking.com',
      'q2': '“Lovely country inn. Everything worked perfectly and the people are all very warm-hearted. A perfect stay. Happy to come back.” (translated from German)', 'q2.src': 'Pascal, Switzerland · Booking.com',
      'q3': '“Very clean rooms, very friendly staff. Breakfast was very good too.” (translated from German)', 'q3.src': 'Thomas, Germany · Booking.com',
      'q4': '“Always a joy at the Sternen – our children love coming here too. Good food, friendly service, fun on the playground – the whole family feels looked after.” (translated from German)', 'q4.src': 'Samuel Berweger, Stein · guest book on sternen-appenzellerland.ch',
      'anreise.kicker': 'Bühler · Appenzellerland', 'anreise.h2': 'Between St. Gallen and Appenzell, 250 m from the station',
      'anreise.p': 'Bühler lies on the St. Gallen – Appenzell railway line. From Bühler station it is 250 metres on foot; if you come by car, parking in front of the house is free. Your hosts will tell you about the guest card for trains and cable cars.',
      'dist.1': 'Bühler station (Appenzeller Bahnen)', 'dist.2': 'Appenzell, Museum Appenzell', 'dist.3': 'St. Gallen, Abbey Library', 'dist.4': 'St. Gallen-Altenrhein airport', 'dist.5': 'Zurich airport',
      'map.p': 'The map loads only after a click (OpenStreetMap, no cookies).', 'map.btn': 'Show map',
      'foot.hours': 'Thursday to Monday 9 am – midnight · Tuesday and Wednesday closed · closed every 2nd Sunday of the month',
      'foot.h2': 'On this page', 'foot.h3': 'Legal', 'foot.privacy': 'Privacy', 'foot.old': 'Current website',
      'bk.title': 'Book a room', 'bk.s1': 'Dates, guests, room', 'bk.s2': 'Your details', 'bk.s3': 'Confirmation'
    }
  };

  window.STERNEN = { ROOMS: ROOMS, CHILD: CHILD, EXTRA_ADULT: EXTRA_ADULT, MENU: MENU, PROG: PROG, UI: UI, T: T, META: META };
})();
