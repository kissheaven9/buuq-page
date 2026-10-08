/* Pension Gemshorn — Daten und Texte (DE/EN). Preise: Buchungssystem des Hauses, 10.–13.07.2027, pro Zimmer und Nacht
   mit Frühstück; p[2]/p[3]/p[4] = Preis bei 2/3/4 Erwachsenen. Kind 4–12: +38 €/Nacht, Halbpension: +19 €/Person/Nacht. */
window.GEMSHORN = {
  ROOMS: [
    {
      id: 'dz', cap: 2, busy: 3, p: { 2: 120 }, imgs: ['dz-1', 'dz-2', 'dz-3', 'dz-4'],
      de: {
        name: 'Doppelzimmer mit Balkon', cap: '18 m² · 2 Personen', short: 'Doppelbett, Balkon, ruhige Seite',
        text: 'Doppelbett, Sitzecke, viel Stauraum. Das Zimmer liegt auf der ruhigen Seite des Hauses, der Balkon mit Sitzplatz schaut auf die Berge.',
        equip: ['Balkon mit Bergblick', 'Dusche und WC', 'Badekosmetik, Föhn', 'Sat-TV', 'WLAN kostenlos', 'Sitzecke', 'Schallschutz', 'Kleiderschrank'],
        alts: ['Doppelzimmer mit Holzbett und grün karierter Bettwäsche', 'Handtuchrolle und Keks auf dem Bett', 'Schreibtisch mit Regal und Lederstuhl', 'Doppelbett vor Holzlamellenwand mit zwei Hängeleuchten']
      },
      en: {
        name: 'Double room with balcony', cap: '18 m² · 2 guests', short: 'double bed, balcony, quiet side',
        text: 'Double bed, seating corner, plenty of storage. The room is on the quiet side of the house; the balcony with seating faces the mountains.',
        equip: ['Balcony with mountain view', 'Shower and WC', 'Toiletries, hairdryer', 'Satellite TV', 'Free Wi-Fi', 'Seating corner', 'Soundproofing', 'Wardrobe'],
        alts: ['Double room with wooden bed and green checked bedding', 'Rolled towel and biscuit on the bed', 'Desk with shelf and leather chair', 'Double bed in front of a wooden slat wall with two pendant lamps']
      }
    },
    {
      id: 'suite', cap: 4, busy: 3, p: { 2: 136, 3: 213, 4: 231 }, imgs: ['suite-1', 'suite-2', 'suite-3', 'suite-4'],
      de: {
        name: 'Vierbett-Suite mit Balkon', cap: '30 m² · bis 4 Personen', short: 'zwei Schlafzimmer, je ein Doppelbett',
        text: 'Zwei getrennte Schlafzimmer mit je einem Doppelbett, dazwischen das Bad. Für Familien mit zwei Kindern oder zwei Paare. Der Balkon mit Sitzplatz schaut ins Zillertal.',
        equip: ['Zwei getrennte Schlafzimmer', 'Balkon mit Talblick', 'Dusche und WC', 'Badekosmetik, Föhn', 'Sat-TV', 'WLAN kostenlos', 'Sitzecke', 'Schallschutz'],
        alts: ['Schlafzimmer der Suite mit Doppelbett, Fenster zum Tal und Bergbild', 'Zweites Schlafzimmer mit Holzbett und Fenster', 'Blick vom Balkon über die Dächer ins Zillertal', 'Bett mit grün karierten Kissen unter drei Bergbildern']
      },
      en: {
        name: 'Four-bed suite with balcony', cap: '30 m² · up to 4 guests', short: 'two bedrooms, a double bed in each',
        text: 'Two separate bedrooms with a double bed each, the bathroom in between. For families with two children or two couples. The balcony with seating looks down the Zillertal.',
        equip: ['Two separate bedrooms', 'Balcony with valley view', 'Shower and WC', 'Toiletries, hairdryer', 'Satellite TV', 'Free Wi-Fi', 'Seating corner', 'Soundproofing'],
        alts: ['Suite bedroom with double bed, window to the valley and mountain picture', 'Second bedroom with wooden bed and window', 'View from the balcony over the roofs into the Zillertal', 'Bed with green checked pillows below three mountain pictures']
      }
    },
    {
      id: 'famb', cap: 4, busy: 3, p: { 2: 131, 3: 180, 4: 222 }, imgs: ['famb-1', 'famb-2', 'famb-3', 'famb-4'],
      de: {
        name: 'Familienzimmer mit Balkon', cap: '30 m² · bis 4 Personen', short: 'zwei Schlafzimmer, Dachgeschoss, neu renoviert',
        text: 'Neu renoviert, unter dem Dach: zwei Schlafzimmer mit je einem Doppelbett, das Bad in einem davon. Vom Balkon sehen Sie auf die Gerlossteinwand.',
        equip: ['Zwei Schlafzimmer', 'Balkon, Blick auf die Gerlossteinwand', 'Dusche und WC', 'Badekosmetik, Föhn', 'Sat-TV', 'WLAN kostenlos', 'Sitzecke', 'Wohnbereich'],
        alts: ['Neu renoviertes Familienzimmer im Dachgeschoss mit Holzbett und Dachfenster', 'Nachttischlampe und Karokissen', 'Schlafzimmer mit Dachschräge, Fernseher und Birkenmotiv', 'Schreibtisch mit Lederstuhl am Fenster']
      },
      en: {
        name: 'Family room with balcony', cap: '30 m² · up to 4 guests', short: 'two bedrooms, attic floor, newly renovated',
        text: 'Newly renovated, under the roof: two bedrooms with a double bed each, the bathroom in one of them. From the balcony you look at the Gerlossteinwand.',
        equip: ['Two bedrooms', 'Balcony facing the Gerlossteinwand', 'Shower and WC', 'Toiletries, hairdryer', 'Satellite TV', 'Free Wi-Fi', 'Seating corner', 'Living area'],
        alts: ['Newly renovated attic family room with wooden bed and skylight', 'Bedside lamp and checked pillow', 'Bedroom with sloping ceiling, TV and birch motif', 'Desk with leather chair by the window']
      }
    },
    {
      id: 'fam', cap: 4, busy: 2, p: { 2: 131, 3: 180, 4: 222 }, imgs: ['fam-1', 'fam-2', 'fam-3', 'fam-4'],
      de: {
        name: 'Familienzimmer ohne Balkon', cap: '30 m² · bis 4 Personen', short: 'zwei Schlafzimmer, Talblick',
        text: 'Neu renoviert, für Familien mit Kindern: zwei Schlafzimmer mit je einem Doppelbett, dazwischen eine Lamellenwand aus Holz. Das Bad liegt in einem der Schlafzimmer. Kein Balkon, dafür der Blick geradeaus ins Zillertal.',
        equip: ['Zwei Schlafzimmer', 'Talblick', 'Dusche und WC', 'Badekosmetik, Föhn', 'Sat-TV', 'WLAN kostenlos', 'Sitzecke', 'Viel Stauraum'],
        alts: ['Familienzimmer mit Holzlamellenwand zwischen zwei Schlafbereichen und kariertem Teppich', 'Schlafzimmer mit Dachfenster und Holzbett', 'Blick durch die Lamellenwand auf das zweite Bett', 'Handtuchrolle mit Mannerschnitte auf dem Bett']
      },
      en: {
        name: 'Family room without balcony', cap: '30 m² · up to 4 guests', short: 'two bedrooms, valley view',
        text: 'Newly renovated, for families with children: two bedrooms with a double bed each, divided by a wooden slat wall. The bathroom is in one of the bedrooms. No balcony, but a straight view down the Zillertal.',
        equip: ['Two bedrooms', 'Valley view', 'Shower and WC', 'Toiletries, hairdryer', 'Satellite TV', 'Free Wi-Fi', 'Seating corner', 'Plenty of storage'],
        alts: ['Family room with wooden slat wall between two sleeping areas and checked carpet', 'Bedroom with skylight and wooden bed', 'View through the slat wall to the second bed', 'Rolled towel with a Manner wafer on the bed']
      }
    },
    {
      id: 'stock', cap: 4, busy: 2, p: { 2: 136, 3: 169, 4: 216 }, imgs: ['stock-1', 'stock-2', 'stock-3', 'stock-4'],
      de: {
        name: 'Vierbettzimmer mit Stockbett', cap: '30 m² · bis 4 Personen', short: 'Doppelbett und Etagenbett, Balkon',
        text: 'Für Familien mit kleinen Kindern: die Eltern schlafen im Doppelbett, die Kinder im Etagenbett im Zimmer nebenan. Balkon mit Sitzplatz und Bergblick.',
        equip: ['Zwei Schlafzimmer', 'Etagenbett für Kinder', 'Balkon mit Bergblick', 'Dusche und WC', 'Badekosmetik, Föhn', 'Sat-TV', 'WLAN kostenlos', 'Sitzecke'],
        alts: ['Kinderschlafzimmer mit Etagenbett aus Holz und Balkontür', 'Schreibtisch mit zwei roten Stühlen und Holzschrank', 'Schlafzimmer mit Doppelbett, Vorhang und Bergbild', 'Badekosmetik in Tuben auf dem Holzregal']
      },
      en: {
        name: 'Four-bed room with bunk bed', cap: '30 m² · up to 4 guests', short: 'double bed and bunk bed, balcony',
        text: 'For families with small children: parents sleep in the double bed, the children in the bunk bed in the room next door. Balcony with seating and mountain view.',
        equip: ['Two bedrooms', 'Bunk bed for children', 'Balcony with mountain view', 'Shower and WC', 'Toiletries, hairdryer', 'Satellite TV', 'Free Wi-Fi', 'Seating corner'],
        alts: ['Children’s bedroom with wooden bunk bed and balcony door', 'Desk with two red chairs and wooden wardrobe', 'Bedroom with double bed, curtain and mountain picture', 'Toiletries in tubes on the wooden shelf']
      }
    },
    {
      id: 'drei', cap: 3, busy: 2, p: { 2: 122, 3: 170 }, imgs: ['drei-2', 'drei-1', 'drei-3', 'drei-4'],
      de: {
        name: 'Dreibettzimmer mit Balkon', cap: '30 m² · bis 3 Personen', short: 'Doppelbett und Einzelbett in zwei Zimmern',
        text: 'Für ein Paar mit einem Kind oder drei Freunde: im ersten Schlafzimmer ein Doppelbett, im zweiten ein Einzelbett. Tisch, Kleiderschrank, eigenes Bad. Vom Balkon schauen Sie ins Tal.',
        equip: ['Zwei Schlafzimmer', 'Balkon mit Talblick', 'Dusche und WC', 'Badekosmetik, Föhn', 'Sat-TV', 'WLAN kostenlos', 'Tisch und Kleiderschrank', 'Schallschutz'],
        alts: ['Einzelbett im zweiten Schlafzimmer mit Holzwand und kariertem Bezug', 'Schreibtisch mit Lederstuhl und Holztür', 'Blick vom Balkon über die Dächer ins Zillertal', 'Doppelbett mit Fernseher und Holzwand']
      },
      en: {
        name: 'Triple room with balcony', cap: '30 m² · up to 3 guests', short: 'double bed and single bed in two rooms',
        text: 'For a couple with one child or three friends: a double bed in the first bedroom, a single bed in the second. Table, wardrobe, own bathroom. From the balcony you look down the valley.',
        equip: ['Two bedrooms', 'Balcony with valley view', 'Shower and WC', 'Toiletries, hairdryer', 'Satellite TV', 'Free Wi-Fi', 'Table and wardrobe', 'Soundproofing'],
        alts: ['Single bed in the second bedroom with wooden wall and checked cover', 'Desk with leather chair and wooden door', 'View from the balcony over the roofs into the Zillertal', 'Double bed with TV and wooden wall']
      }
    },
    {
      id: 'vier', cap: 4, busy: 2, p: { 2: 131, 3: 180, 4: 222 }, imgs: ['vier-1', 'vier-2', 'vier-3'],
      de: {
        name: 'Vierbettzimmer ohne Balkon', cap: '30 m² · bis 4 Personen', short: 'zwei Schlafzimmer, eines mit zwei Einzelbetten',
        text: 'Zwei getrennte Schlafzimmer: eines mit Doppelbett, eines mit zwei Einzelbetten. Für Familien oder vier Freunde, die getrennt schlafen wollen. Kein Balkon, dafür Blick ins Tal.',
        equip: ['Zwei Schlafzimmer', 'Zwei Einzelbetten im zweiten Zimmer', 'Talblick', 'Dusche und WC', 'Badekosmetik, Föhn', 'Sat-TV', 'WLAN kostenlos', 'Sitzecke'],
        alts: ['Schlafzimmer mit zwei Einzelbetten, Fenster ins Tal und Holzschrank', 'Doppelbett mit Schreibtisch unter der Dachschräge', 'Schlafzimmer mit Dachfenster und Fernseher']
      },
      en: {
        name: 'Four-bed room without balcony', cap: '30 m² · up to 4 guests', short: 'two bedrooms, one with two single beds',
        text: 'Two separate bedrooms: one with a double bed, one with two single beds. For families or four friends who want to sleep apart. No balcony, but a view of the valley.',
        equip: ['Two bedrooms', 'Two single beds in the second room', 'Valley view', 'Shower and WC', 'Toiletries, hairdryer', 'Satellite TV', 'Free Wi-Fi', 'Seating corner'],
        alts: ['Bedroom with two single beds, window to the valley and wooden wardrobe', 'Double bed with desk under the sloping ceiling', 'Bedroom with skylight and TV']
      }
    },
    {
      id: 'apart', cap: 4, busy: 3, p: { 2: 136, 3: 180, 4: 222 }, imgs: ['apart-1', 'apart-2', 'apart-3', 'apart-4'],
      de: {
        name: 'Apartment mit Wohnraum', cap: '28 m² · 2 bis 4 Personen', short: 'Doppelbett und Schlafsofa, Balkon, 3. Stock',
        text: 'Schlafzimmer mit Doppelbett und ein Wohnraum mit Schlafsofa: zu zweit haben Sie ein eigenes Wohnzimmer, mit Kindern wird das Sofa zum Bett. Balkon mit Sitzplatz. Das Apartment liegt im dritten Stock ohne Lift.',
        equip: ['Wohnraum mit Schlafsofa', 'Balkon mit Bergblick', 'Dusche und WC', 'Badekosmetik, Föhn, Schminkspiegel', 'Sat-TV', 'WLAN kostenlos', 'Sitzecke', 'Schallschutz'],
        alts: ['Wohnraum des Apartments mit grauem Sofa, rundem Tisch und Wein', 'Zwei Gläser auf dem schwarzen Tisch vor der Balkontür', 'Schreibplatz am Fenster', 'Schlafzimmer mit Holzbett unter der Dachschräge']
      },
      en: {
        name: 'Apartment with living room', cap: '28 m² · 2 to 4 guests', short: 'double bed and sofa bed, balcony, 3rd floor',
        text: 'Bedroom with double bed and a living room with sofa bed: as a couple you have your own living room, with children the sofa becomes a bed. Balcony with seating. The apartment is on the third floor, no lift.',
        equip: ['Living room with sofa bed', 'Balcony with mountain view', 'Shower and WC', 'Toiletries, hairdryer, make-up mirror', 'Satellite TV', 'Free Wi-Fi', 'Seating corner', 'Soundproofing'],
        alts: ['Living room of the apartment with grey sofa, round table and wine', 'Two glasses on the black table by the balcony door', 'Writing place by the window', 'Bedroom with wooden bed under the sloping ceiling']
      }
    }
  ],

  UI: {
    de: {
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen', 'bw.btn': 'Verfügbarkeit prüfen',
      adult1: 'Erwachsener', adultN: 'Erwachsene', kid1: 'Kind', kidN: 'Kinder', night1: 'Nacht', nightN: 'Nächte',
      'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto', 'room.equip': 'Ausstattung',
      'room.from': 'ab', 'room.pn': 'pro Nacht für 2 Personen mit Frühstück',
      'room.priceNote': 'Preis laut Buchungssystem des Hauses für Juli 2027, inkl. Frühstücksbuffet. Winterpreise auf Anfrage.',
      'room.bookThis': 'Dieses Zimmer buchen',
      'cal.hintIn': 'Wählen Sie den Anreisetag.', 'cal.hintOut': 'Wählen Sie jetzt den Abreisetag.', 'cal.reset': 'Zurücksetzen',
      'cal.prev': 'Vormonat', 'cal.next': 'Nächster Monat', 'cal.free': 'frei', 'cal.busy': 'ausgebucht', 'cal.sel': 'gewählt',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kidsLabel': 'Kinder', 'bk.kidsSub': '4 bis 12 Jahre, 38 € pro Nacht',
      'bk.hp': 'Halbpension dazu: 19 € pro Person und Nacht (Suppe, Salatbuffet, zwei Hauptgerichte zur Wahl)',
      'bk.babies': 'Kleinkinder bis 3 Jahre wohnen kostenlos – bitte im Nachrichtenfeld angeben. Einzelbelegung in dieser Vorschau zum Preis für zwei Personen.',
      'bk.less': 'weniger', 'bk.more': 'mehr', 'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie zuerst An- und Abreise.',
      'bk.small': 'Für diese Gästezahl zu klein', 'bk.busy': 'Im gewählten Zeitraum belegt', 'bk.total': 'gesamt', 'bk.pnShort': 'pro Nacht',
      'bk.select': 'Auswählen', 'bk.none': 'In diesem Zeitraum ist kein passendes Zimmer frei. Bitte wählen Sie andere Daten.',
      'bk.incl': 'Preise pro Zimmer inkl. Frühstücksbuffet und MwSt.; Ortstaxe laut Gemeinde kommt vor Ort dazu.',
      'bk.engine': 'Dies ist eine Vorschau – verbindlich buchen Sie im <a href="{url}" target="_blank" rel="noopener noreferrer">Buchungssystem des Hauses</a>.',
      'bk.summary': 'Ihre Buchung', 'bk.room': 'Zimmer', 'bk.stay': 'Aufenthalt',
      'bk.roomLine': 'Zimmer · {n} à {p}', 'bk.kidLine': '{k} × Kind · {n} à {p}', 'bk.hpLine': 'Halbpension · {g} Pers. · {n} à {p}',
      'bk.price': 'Gesamtpreis', 'bk.pay': 'Bezahlung im Haus. Kostenlose Stornierung laut Bedingungen des Hauses.',
      'bk.back': '← Zurück zur Zimmerwahl',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.arrival': 'Voraussichtliche Ankunftszeit',
      'f.msg': 'Nachricht an uns (Kleinkinder, Allergien, Wünsche)',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung der Buchung einverstanden.',
      'f.submit': 'Verbindlich buchen',
      'e.name': 'Bitte Vor- und Nachnamen eingeben.', 'e.email': 'Bitte eine gültige E-Mail-Adresse eingeben.',
      'e.phone': 'Bitte eine Telefonnummer eingeben.', 'e.consent': 'Bitte bestätigen Sie die Datenschutzerklärung.',
      'ok.title': 'Danke, {name} – wir freuen uns auf Sie!', 'ok.text': 'Die Bestätigung geht an {email}.',
      'ok.no': 'Buchungsnummer',
      'ok.demo': 'Dies ist eine Beta-Vorschau der neuen Website. Es wurde nichts gebucht und keine Daten wurden übertragen. Eine echte Buchung machen Sie im <a href="{url}" target="_blank" rel="noopener noreferrer">Buchungssystem der Pension Gemshorn</a>.',
      'ok.close': 'Schließen', 'map.link': 'Auf OpenStreetMap öffnen'
    },
    en: {
      'bw.in': 'Check-in', 'bw.out': 'Check-out', 'bw.guests': 'Guests', 'bw.pick': 'Select date', 'bw.btn': 'Check availability',
      adult1: 'adult', adultN: 'adults', kid1: 'child', kidN: 'children', night1: 'night', nightN: 'nights',
      'room.photo': 'Photo', 'gal.prev': 'Previous photo', 'gal.next': 'Next photo', 'room.equip': 'Amenities',
      'room.from': 'from', 'room.pn': 'per night for 2 guests with breakfast',
      'room.priceNote': 'Price from the house’s booking system for July 2027, breakfast buffet included. Winter prices on request.',
      'room.bookThis': 'Book this room',
      'cal.hintIn': 'Select your check-in day.', 'cal.hintOut': 'Now select your check-out day.', 'cal.reset': 'Reset',
      'cal.prev': 'Previous month', 'cal.next': 'Next month', 'cal.free': 'available', 'cal.busy': 'fully booked', 'cal.sel': 'selected',
      'bk.guests': 'Guests', 'bk.adults': 'Adults', 'bk.kidsLabel': 'Children', 'bk.kidsSub': '4 to 12 years, €38 per night',
      'bk.hp': 'Add half board: €19 per person and night (soup, salad buffet, choice of two main courses)',
      'bk.babies': 'Children up to 3 stay free – please mention them in the message field. Single occupancy in this preview at the price for two.',
      'bk.less': 'fewer', 'bk.more': 'more', 'bk.rooms': 'Rooms', 'bk.pickDates': 'First select check-in and check-out.',
      'bk.small': 'Too small for this number of guests', 'bk.busy': 'Occupied for the selected dates', 'bk.total': 'total', 'bk.pnShort': 'per night',
      'bk.select': 'Select', 'bk.none': 'No suitable room is available for these dates. Please choose other dates.',
      'bk.incl': 'Prices per room incl. breakfast buffet and VAT; the local visitor’s tax is paid on site.',
      'bk.engine': 'This is a preview – to book, use the <a href="{url}" target="_blank" rel="noopener noreferrer">house’s booking system</a>.',
      'bk.summary': 'Your booking', 'bk.room': 'Room', 'bk.stay': 'Stay',
      'bk.roomLine': 'Room · {n} at {p}', 'bk.kidLine': '{k} × child · {n} at {p}', 'bk.hpLine': 'Half board · {g} guests · {n} at {p}',
      'bk.price': 'Total', 'bk.pay': 'Payment at the house. Free cancellation according to the house’s terms.',
      'bk.back': '← Back to room selection',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.arrival': 'Expected arrival time',
      'f.msg': 'Message to us (small children, allergies, wishes)',
      'f.consent': 'I have read the <a href="datenschutz.html" target="_blank">privacy policy</a> and agree to the processing of my data for this booking.',
      'f.submit': 'Book now',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid e-mail address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please confirm the privacy policy.',
      'ok.title': 'Thank you, {name} – see you soon!', 'ok.text': 'The confirmation will be sent to {email}.',
      'ok.no': 'Booking number',
      'ok.demo': 'This is a beta preview of the new website. Nothing has been booked and no data has been transmitted. For a real booking use the <a href="{url}" target="_blank" rel="noopener noreferrer">booking system of Pension Gemshorn</a>.',
      'ok.close': 'Close', 'map.link': 'Open on OpenStreetMap'
    }
  },

  EN: {
    beta: 'Beta preview — not a final design', 'brand.sub': 'Guesthouse · Hainzenberg',
    'nav.location': 'Location', 'nav.rooms': 'Rooms', 'nav.food': 'Food', 'nav.seasons': 'Summer &amp; winter', 'nav.arrival': 'Getting here', 'nav.reviews': 'Guests',
    'cta.book': 'Book', menu: 'Menu', close: 'Close',
    'hero.alt1': 'Hiker with a red backpack on a rocky ridge above the Zillertal',
    'hero.alt2': 'View from the balcony of the Gerlosstein cable car base station, the yellow piste fence and the Gerlossteinwand',
    'hero.line': 'Suites and rooms at the Zillertal Arena&#160;· Hainzenberg',
    'f1.title': 'Hainzenberg, above Zell am Ziller',
    'f1.text': 'The house stands in Dörfl at around 930 metres, five kilometres above Zell am Ziller on the Gerlos road. From the balconies you look down the Zillertal and up to the Gerlossteinwand.',
    'f2.title': 'to the Gerlosstein cable car',
    'f2.text': 'From the front door to the base station it is about 40 metres. In summer (4 June to 18 October 2026, 8.30 am to 5 pm) the gondola takes you to the alpine pastures, the Almflieger zip lines and the via ferrata on the Gerlosstein. In winter the Gerlosstein family ski area starts here, with five lifts and a baby lift.',
    'f3.title': 'toboggan run at the door',
    'f3.text': 'The longest toboggan run in the Zillertal starts at the top station at 1,650 metres and ends 715 metres lower, next to the house. Floodlit at night except Wednesdays and Sundays. Toboggans for hire at the base station.',
    'f4.title': 'of slopes in the Zillertal Arena',
    'f4.text': 'Zell, Gerlos, Königsleiten and Hochkrimml: 150 kilometres of slopes and 52 lifts, the largest ski area in the Zillertal. Your way in is the Gerlosstein cable car next to the house.',
    'haus.alt': 'Pension Gemshorn: three-storey house with wooden balconies and geraniums on the hillside in Dörfl',
    'haus.cap': 'Dörfl 393 – the house on the Gerlos road. Meadow on the left, base station on the right.',
    'kuh.alt': 'Decorated cow at the autumn cattle drive in the Zillertal', 'kuh.cap': 'Cattle drive in the Zillertal, late September.',
    'rooms.title': '13 rooms, most with two bedrooms',
    'rooms.lead': 'Prices per room and night for two guests with breakfast buffet, from the house’s booking system for July 2027. Half board €19 per person and night extra. Winter prices on request.',
    'r.dz.alt': 'Double room with wooden bed, green checked bedding and wooden slat wall', 'r.dz.name': 'Double room with balcony',
    'r.dz.facts': '18 m² · 2 guests · balcony with mountain view', 'r.dz.text': 'Double bed, seating corner, plenty of storage. On the quiet side of the house.',
    'r.suite.alt': 'Suite bedroom with double bed, window to the valley and mountain picture', 'r.suite.name': 'Four-bed suite with balcony',
    'r.suite.facts': '30 m² · two separate bedrooms, a double bed in each · up to 4 guests', 'r.suite.text': 'For families or two couples. From the balcony you look down the Zillertal.',
    'r.famb.alt': 'Newly renovated attic family room with wooden bed and skylight', 'r.famb.name': 'Family room with balcony',
    'r.famb.facts': '30 m² · two bedrooms · up to 4 guests · attic floor', 'r.famb.text': 'Newly renovated. Balcony facing the Gerlossteinwand.',
    'r.fam.alt': 'Family room with wooden slat wall between two sleeping areas and checked carpet', 'r.fam.name': 'Family room without balcony',
    'r.fam.facts': '30 m² · two bedrooms · up to 4 guests · valley view', 'r.fam.text': 'Newly renovated, for families with children. The bathroom is in one of the two bedrooms.',
    'r.stock.alt': 'Children’s bedroom with wooden bunk bed and balcony door', 'r.stock.name': 'Four-bed room with bunk bed',
    'r.stock.facts': '30 m² · double bed and bunk bed in two rooms · up to 4 guests · balcony', 'r.stock.text': 'For families with small children: parents in one room, the children in the bunk bed next door.',
    'r.drei.alt': 'Single bed in the second bedroom with wooden wall and checked cover', 'r.drei.name': 'Triple room with balcony',
    'r.drei.facts': '30 m² · double bed and single bed in two rooms · up to 3 guests', 'r.drei.text': 'For a couple with one child or three friends. Balcony with valley view.',
    'r.vier.alt': 'Bedroom with two single beds, window to the valley and wooden wardrobe', 'r.vier.name': 'Four-bed room without balcony',
    'r.vier.facts': '30 m² · two bedrooms, one with two single beds · up to 4 guests · valley view', 'r.vier.text': 'For families or four friends who want to sleep apart.',
    'r.apart.alt': 'Living room of the apartment with grey sofa, round table and wine', 'r.apart.name': 'Apartment with living room',
    'r.apart.facts': '28 m² · double bed and sofa bed · 2 to 4 guests · balcony · 3rd floor', 'r.apart.text': 'As a couple you have your own living room; with children the sofa becomes a bed. Third floor, no lift.',
    'rooms.from': 'from', 'rooms.pn': 'per night for 2 guests', 'rooms.book': 'Book', 'rooms.details': 'Details and photos',
    'rooms.directTitle': 'Book direct',
    'rooms.direct': '“Book direct and you always get the lowest price” – that is what the house’s booking system says. In this preview children aged 4 to 12 pay €38 per night, children up to 3 stay free.',
    'rooms.equipTitle': 'In every room',
    'rooms.e1': 'Shower and WC', 'rooms.e2': 'Toiletries and hairdryer', 'rooms.e3': 'Satellite TV', 'rooms.e4': 'Free Wi-Fi', 'rooms.e5': 'Seating corner', 'rooms.e6': 'Mountain view', 'rooms.e7': 'Soundproofing', 'rooms.e8': 'Towels and bed linen',
    'food.title': 'Tyrolean cooking, Czech beer, Italian pizza',
    'food.text': 'Our cooks make Käsespätzle, Germknödel and Schnitzel, plus Czech classics. The pizza follows the recipe of our Italian friend Maci, the pizzaiolo. On tap: Zillertal beer and Pilsner Urquell. If you are coeliac or vegan, let us know in advance.',
    'food.r1': 'Breakfast buffet', 'food.r1v': 'included, even for one night', 'food.r2': 'Half board', 'food.r2v': 'soup, salad buffet, choice of two mains, €19 per person',
    'food.r3': 'À la carte', 'food.r3v': 'afternoons and evenings, also for non-residents', 'food.r4': 'Winter 2026/27', 'food.r4v': '12 December to 29 March, daily 2 pm to 9 pm',
    'food.alt1': 'Käsespätzle with fried onions in a black bowl', 'food.cap1': 'Käsespätzle, straight from the kitchen.',
    'food.alt2': 'A mug of Pilsner Urquell on a wooden coaster', 'food.cap2': 'Pilsner Urquell on tap.',
    'well.title': 'Sauna and hot tub after the slopes',
    'well.text': 'A small spa for up to eight people: Finnish sauna, infrared sauna, relaxation room and a hot tub on the terrace. If you want to stay in shape, you can also train.',
    'well.r1': 'Finnish sauna', 'well.r2': 'Infrared sauna', 'well.r3': 'Hot tub on the terrace', 'well.r4': 'In winter', 'well.r4v': 'daily, included in the room rate', 'well.r5': 'In summer', 'well.r5v': 'on request, €8 per person',
    'well.alt1': 'Loungers with blue headrests in the relaxation room', 'well.alt2': 'Shower area of the spa with slate wall and towels',
    'summer.alt': 'Mountain biker on the road under the cables of the Gerlosstein cable car, the Zillertal behind',
    'summer.title': 'Summer', 'summer.sub': 'Cable car 4 June – 18 October 2026',
    'summer.l1': 'Gerlosstein cable car, 8.30 am – 5 pm', 'summer.l2': 'Almflieger Gerlosstein, four zip lines', 'summer.l2v': 'top station',
    'summer.l3': 'Via ferrata on the Gerlosstein', 'summer.l4': 'Hiking trails in the Zillertal', 'summer.l5': 'Bike tours and single trails of the Zillertal Arena', 'summer.l5v': 'from the house',
    'summer.l6': 'Lakes and outdoor pools in the valley', 'summer.l6v': 'by car', 'summer.l7': 'Groups, clubs, motorbike tours', 'summer.l7v': 'welcome',
    'summer.note': 'Spa in summer on request, €8 per person.',
    'winter.alt': 'View from the balcony down the Zillertal with snow-covered peaks',
    'winter.title': 'Winter', 'winter.sub': 'Restaurant 12 December 2026 – 29 March 2027',
    'winter.l1': 'Gerlosstein ski area, five lifts and a baby lift', 'winter.l2': 'Zillertal Arena, 52 lifts', 'winter.l3': 'Gerlosstein toboggan run, floodlit at night',
    'winter.l4': 'Toboggan hire at the base station', 'winter.l5': 'Sauna, infrared and hot tub', 'winter.l5v': 'daily, included', 'winter.l6': 'Restaurant and pizza', 'winter.l6v': '2 pm – 9 pm',
    'winter.l7': 'Half board', 'winter.l7v': '€19 per person',
    'winter.note': 'Winter prices are not yet in the booking system – just ask us.',
    'rev.q1': '“The location close to the lift is brilliant. Breakfast gave us a very good start to the day.”', 'rev.q1src': 'Beate, Germany · Booking.com (translated from German)',
    'rev.q2': '“Great breakfast, tasty and varied dinner. Very friendly staff, everything clean, parking right in front of the guesthouse.”', 'rev.q2src': 'Uwe, Germany · Booking.com (translated)',
    'rev.q3src': 'Steve, United Kingdom · Booking.com',
    'rev.q4': '“We felt courteously, warmly and attentively looked after – and were spoiled with an abundant, fine breakfast buffet and delicious dinners. We will be back!”', 'rev.q4src': 'Hannesschläger, Austria · Booking.com (translated)',
    'rev.score': 'out of 10 on Booking.com, 114 reviews. Staff 9.7 · Cleanliness 9.4 · Location 9.2 · Facilities 9.1 · Value 8.9. Retrieved 7 October 2026. <a href="https://www.booking.com/hotel/at/pension-gemshorn.en-gb.html" target="_blank" rel="noopener noreferrer">Read all reviews</a>',
    'host.title': 'A piece of the Czech Republic in the heart of the Alps',
    'host.text': 'That is what the team calls its house. Julian Wahler runs the guesthouse, Šárka Martínková takes your reservation. The kitchen is Tyrolean and Czech, both beers are on tap, and whoever arrives by bike, motorbike, skis or toboggan will find someone who knows the way.',
    'host.r1': 'Manager', 'host.r2': 'Reservations', 'host.r3': 'Phone', 'host.r5': 'Booking system', 'host.r5v': 'German, English, Czech',
    'host.alt1': 'Two staff members in dirndls with trays in front of the house', 'host.alt2': 'Snack board with bacon, cheese, grapes and pretzels',
    'arr.title': 'Getting here',
    'arr.1t': 'By car', 'arr.1': 'Inntal motorway A12, exit Zillertal, the B169 to Zell am Ziller, then the Gerlos road B165 towards Gerlos. After about five kilometres you reach Dörfl: the house stands next to the base station of the Gerlosstein cable car. Parking right in front of the guesthouse.',
    'arr.2t': 'By train and bus', 'arr.2': 'Take the Zillertalbahn from Jenbach to Zell am Ziller, then the bus towards Gerlos to the stop “Gerlossteinbahn” – it is right in front of the house.',
    'arr.3t': 'Address',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in the privacy policy',
    'foot.privacy': 'Privacy', 'foot.photos': 'Photos: Pension Gemshorn (gemshorn.eu)', 'foot.beta': 'Beta preview – concept &amp; implementation: Olga Tikhomirova',
    'bk.title': 'Book a room', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation'
  }
};
