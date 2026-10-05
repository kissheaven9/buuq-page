/* Gasthof Hirsch — Inhalte: Zimmerarten, UI-Texte (DE/EN), Übersetzung der Seite.
   Deutsch steht direkt im HTML (SEO), Englisch wird über data-i18n eingesetzt. */
(function () {
  'use strict';

  /* Das Haus hat keine aktuelle Preisliste veröffentlicht (siehe FAKTEN.md). Darum gibt es hier KEINE Preise:
     Die Zimmeranfrage läuft ohne Betrag, den Preis nennt das Haus. busy = Demo-Auslastung. */
  var ROOMS = [
    {
      id: 'einzel', max: 1, busy: 2,
      de: { name: 'Einzelzimmer', cap: '1 Person', short: 'Einfach und zweckmäßig – für eine Nacht auf der Durchreise oder die Arbeitswoche in der Gegend.', points: ['Frühstück im Haus', 'Wirtshaus im Haus'] },
      en: { name: 'Single room', cap: '1 guest', short: 'Simple and practical – for a night on the road or a working week in the area.', points: ['Breakfast in the house', 'Inn in the same house'] }
    },
    {
      id: 'doppel', max: 2, busy: 1,
      de: { name: 'Doppelzimmer', cap: '1–2 Personen', short: 'Einfach und originell eingerichtet – für ein paar Tage im Westallgäu.', points: ['Frühstück im Haus', 'Wirtshaus im Haus'] },
      en: { name: 'Double room', cap: '1–2 guests', short: 'Simply and originally furnished – for a few days in the Westallgäu.', points: ['Breakfast in the house', 'Inn in the same house'] }
    }
  ];

  var UI = {
    de: {
      person1: 'Person', personN: 'Personen', night1: 'Nacht', nightN: 'Nächte',
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen', 'bw.btn': 'Zimmer anfragen',
      'room.ask': 'Anfragen', 'zt.room': 'Zimmer', 'zt.for': 'Für', 'zt.incl': 'Dazu', 'zt.price': 'Preis', 'room.price': 'Preis auf Anfrage', 'room.priceNote': 'Den aktuellen Preis nennt Ihnen das Haus mit der Antwort.',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat', 'cal.hintIn': 'Bitte Anreisetag wählen.',
      'cal.hintOut': 'Jetzt den Abreisetag wählen.', 'cal.reset': 'Zurücksetzen',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'bk.guests': 'Gäste', 'bk.persons': 'Personen', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie, was frei ist.',
      'bk.small': 'Passt nicht zur Personenzahl', 'bk.busy': 'An diesen Daten belegt', 'bk.free': 'Frei', 'bk.select': 'Auswählen',
      'bk.none': 'Für diese Daten ist online nichts frei. Rufen Sie uns an: 08381 7601.',
      'bk.fine': 'Unverbindliche Anfrage. Den Preis nennt Ihnen das Haus mit der Antwort. Mehr als zwei Personen? Bitte rufen Sie an.',
      'bk.summary': 'Ihre Anfrage', 'bk.room': 'Zimmer', 'bk.stay': 'Aufenthalt', 'bk.price': 'Preis', 'bk.priceV': 'nennt das Haus',
      'bk.back': '← Zurück zur Auswahl',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.msg': 'Wünsche oder Ankunftszeit (optional)',
      'f.firma': 'Ich reise beruflich und brauche eine Rechnung auf die Firma',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin einverstanden.',
      'f.submit': 'Anfrage senden',
      'e.name': 'Bitte Vor- und Nachnamen angeben.', 'e.email': 'Bitte eine gültige E-Mail-Adresse angeben.',
      'e.phone': 'Bitte eine Telefonnummer angeben.', 'e.consent': 'Bitte stimmen Sie der Datenschutzerklärung zu.',
      'ok.title': 'Danke, {name}!', 'ok.text': 'Ihre Zimmeranfrage ist eingegangen. Die Antwort mit dem Preis senden wir an {email}.',
      'ok.no': 'Anfragenummer',
      'ok.demo': 'Das ist eine Vorschau: Es wurde nichts gebucht und nichts gesendet. So würde die Bestätigung für Ihre Gäste aussehen.',
      'ok.close': 'Schließen', 'ok.firma': 'Rechnung auf die Firma gewünscht',
      'map.link': 'Größere Karte auf OpenStreetMap',
      'open.now': 'Jetzt geöffnet bis {t} Uhr', 'open.later': 'Heute geöffnet ab {t} Uhr', 'open.done': 'Heute bereits geschlossen', 'open.rest': 'Heute Ruhetag',
      'open.h': 'Heute: {h}', 'open.next': 'Wieder geöffnet: {d}, ab 9:30 Uhr', 'open.and': ' und ',
      't.date': 'Datum', 't.time': 'Uhrzeit', 't.persons': 'Personen', 't.name': 'Name', 't.phone': 'Telefon', 't.msg': 'Anlass oder Wunsch (optional)',
      't.feier': 'Es geht um eine Familienfeier oder größere Runde',
      't.submit': 'Tisch anfragen', 't.note': 'Montag und Dienstag ist Ruhetag. Abends geöffnet am Mittwoch, Freitag und Samstag.',
      'te.date': 'Bitte ein Datum wählen.', 'te.past': 'Das Datum liegt in der Vergangenheit.',
      'te.rest': 'Montag und Dienstag ist Ruhetag. Bitte einen anderen Tag wählen.',
      'te.time': 'An diesem Tag ist nur von 9:30 bis 14:00 Uhr geöffnet. Bitte eine frühere Uhrzeit wählen.',
      'te.name': 'Bitte Ihren Namen angeben.', 'te.phone': 'Bitte eine Telefonnummer für den Rückruf angeben.',
      'tok.title': 'Danke, {name}!', 'tok.text': 'Ihre Tischanfrage für {persons} am {date} um {time} Uhr ist eingegangen. Wir bestätigen telefonisch.',
      'tok.demo': 'Das ist eine Vorschau: Es wurde nichts gesendet und kein Tisch reserviert.'
    },
    en: {
      person1: 'guest', personN: 'guests', night1: 'night', nightN: 'nights',
      'bw.in': 'Arrival', 'bw.out': 'Departure', 'bw.guests': 'Guests', 'bw.pick': 'Choose date', 'bw.btn': 'Request a room',
      'room.ask': 'Request', 'zt.room': 'Room', 'zt.for': 'For', 'zt.incl': 'Included', 'zt.price': 'Price', 'room.price': 'Price on request', 'room.priceNote': 'The house will tell you the current price in its reply.',
      'cal.prev': 'Previous month', 'cal.next': 'Next month', 'cal.hintIn': 'Please choose your arrival date.',
      'cal.hintOut': 'Now choose your departure date.', 'cal.reset': 'Reset',
      'cal.free': 'available', 'cal.busy': 'booked', 'cal.sel': 'your selection',
      'bk.guests': 'Guests', 'bk.persons': 'Guests', 'bk.less': 'fewer', 'bk.more': 'more',
      'bk.rooms': 'Rooms', 'bk.pickDates': 'Choose arrival and departure to see what is available.',
      'bk.small': 'Does not match the number of guests', 'bk.busy': 'Booked on these dates', 'bk.free': 'Available', 'bk.select': 'Select',
      'bk.none': 'Nothing is available online for these dates. Please call us: +49 8381 7601.',
      'bk.fine': 'Non-binding request. The house will tell you the price in its reply. More than two guests? Please call us.',
      'bk.summary': 'Your request', 'bk.room': 'Room', 'bk.stay': 'Stay', 'bk.price': 'Price', 'bk.priceV': 'quoted by the house',
      'bk.back': '← Back to selection',
      'f.name': 'First and last name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.msg': 'Requests or arrival time (optional)',
      'f.firma': 'I am travelling for work and need an invoice in my company’s name',
      'f.consent': 'I have read the <a href="datenschutz.html" target="_blank" rel="noopener">privacy policy</a> and agree.',
      'f.submit': 'Send request',
      'e.name': 'Please enter your first and last name.', 'e.email': 'Please enter a valid e-mail address.',
      'e.phone': 'Please enter a phone number.', 'e.consent': 'Please agree to the privacy policy.',
      'ok.title': 'Thank you, {name}!', 'ok.text': 'We have received your room request. We will send our reply with the price to {email}.',
      'ok.no': 'Request number',
      'ok.demo': 'This is a preview: nothing has been booked and nothing has been sent. This is what the confirmation would look like for your guests.',
      'ok.close': 'Close', 'ok.firma': 'Company invoice requested',
      'map.link': 'Larger map on OpenStreetMap',
      'open.now': 'Open now until {t}', 'open.later': 'Open today from {t}', 'open.done': 'Already closed today', 'open.rest': 'Closed today',
      'open.h': 'Today: {h}', 'open.next': 'Open again: {d}, from 9:30', 'open.and': ' and ',
      't.date': 'Date', 't.time': 'Time', 't.persons': 'Guests', 't.name': 'Name', 't.phone': 'Phone', 't.msg': 'Occasion or request (optional)',
      't.feier': 'This is about a family celebration or a larger group',
      't.submit': 'Request a table', 't.note': 'Closed on Mondays and Tuesdays. Open in the evening on Wednesdays, Fridays and Saturdays.',
      'te.date': 'Please choose a date.', 'te.past': 'This date is in the past.',
      'te.rest': 'We are closed on Mondays and Tuesdays. Please choose another day.',
      'te.time': 'On this day we are only open from 9:30 to 14:00. Please choose an earlier time.',
      'te.name': 'Please enter your name.', 'te.phone': 'Please enter a phone number so we can call you back.',
      'tok.title': 'Thank you, {name}!', 'tok.text': 'We have received your table request for {persons} on {date} at {time}. We will confirm by phone.',
      'tok.demo': 'This is a preview: nothing has been sent and no table has been reserved.'
    }
  };

  var META = {
    en: {
      title: 'Gasthof Hirsch · Inn and guest rooms in Heimenkirch, Westallgäu',
      desc: 'Gasthof Hirsch in Heimenkirch, Lindauer Straße 1: hearty home-style cooking, beer terrace and simple guest rooms, run by the Gaul family. Open Wednesday to Sunday. Request a table or a room directly.'
    }
  };

  var EN = {
    skip: 'Skip to content', beta: 'Beta preview — not a finished design', menu: 'Menu', close: 'Close',
    'nav.aria': 'Main navigation', 'lang.aria': 'Language',
    'nav.1': 'Kitchen', 'nav.2': 'The house', 'nav.3': 'Staying over', 'nav.4': 'Surroundings', 'nav.5': 'Getting here',
    'cta.table': 'Request a table', 'cta.room': 'Request a room',
    'deck.alt': 'Wrought-iron inn sign “Gasthof Hirsch” with a copper stag and a lantern against a blue sky',
    'deck.cap': 'Our sign on Lindauer Straße',
    'deck.lead': 'Honest home-style cooking. Wednesday to Sunday, right in the middle of Heimenkirch.',
    'deck.adr': 'The Gaul family · Lindauer Straße 1 · 88178 Heimenkirch',
    'bw.aria': 'Request a room',
    'ze.cap': 'Opening hours', 'ze.th1': 'Day', 'ze.th2': 'Daytime', 'ze.th3': 'Evening', 'ze.zu': 'Closed',
    'wd.0': 'Sunday', 'wd.1': 'Monday', 'wd.2': 'Tuesday', 'wd.3': 'Wednesday', 'wd.4': 'Thursday', 'wd.5': 'Friday', 'wd.6': 'Saturday',
    'src.g2018': 'Google review, 2018', 'src.g2019': 'Google review, 2019', 'src.g2020': 'Google review, 2020',
    'ku.title': 'From the kitchen',
    'ku.rate': 'out of 5 stars from around 240 reviews on Google. As of 5 October 2026.',
    'ku.lead': '“Gut bürgerliches Essen” – honest home-style cooking – is what we say about our kitchen, and we leave it at that. Our guests describe what arrives on the plate.',
    'ku.1t': 'Venison goulash with Spätzle', 'ku.2t': 'Roast beef with onions', 'ku.3t': 'Currywurst with chips', 'ku.4t': 'And the portions',
    'ku.note.t': 'The menu will appear here soon',
    'ku.note': 'Note on the preview: this is where the finished website shows the current menu – daily dishes, seasonal menu and drinks, easy to update. So far the house has not published a menu online, so this space is deliberately left empty in the preview.',
    'ku.feier': 'Family celebration or a larger group? It is best to give us a quick call: <a href="tel:+4983817601">+49 8381 7601</a>',
    'haus.title': 'The house',
    'haus.alt': 'Gasthof Hirsch in Heimenkirch: dark shingle-clad house with green shutters and the inn sign on the gable',
    'haus.cap': 'Lindauer Straße 1 · Photo: Markt Heimenkirch',
    'haus.1': 'The Hirsch stands in the middle of Heimenkirch: a dark shingle-clad house with green shutters and, on the gable, the wrought-iron sign with the copper stag.',
    'haus.2': 'Here the Gaul family runs a traditional inn with hearty home-style cooking, a beer terrace and simple, original guest rooms.',
    'buch.title': 'From the guest book',
    'rev.link': 'Read all reviews on Google', 'rev.src': 'Quotes from Google reviews, as of 5 October 2026',
    'zi.title': 'Staying over',
    'zi.lead': 'The house has simple, original single and double rooms – for a night on the road or a few days in the Westallgäu. In the morning there is a generous breakfast.',
    'zi.note.t': 'Prices and photos to follow',
    'zi.note': 'Note on the preview: the number of rooms, their facilities, current prices and photos will be added by the house. Until then the request works without a price – the Gaul family will quote it in their reply.',
    'um.title': 'Around Heimenkirch',
    'um.lead': 'Green meadows, quiet woods and gently rolling hills: the countryside around Heimenkirch is a paradise for walkers and cyclists.',
    'um.1t': 'Meckatzer Löwenbräu', 'um.1': 'The family-run brewery has its roots in Heimenkirch. Brewery tours are offered in the hamlet of Meckatz.',
    'um.2t': 'Walking and cycling', 'um.2': 'Numerous trails lead through the 20 hamlets with their farms. In summer: outdoor pool and tennis courts.',
    'um.3t': 'In winter', 'um.3': 'Groomed cross-country trails, tobogganing, ice-stock sport and winter walks.',
    'um.4t': 'Worth seeing', 'um.4': 'Syrgenstein Castle, the parish church of St. Margaretha, the local history room and four chapels in the hamlets.',
    'um.src': 'Source: Markt Heimenkirch and the Westallgäu accommodation directory.',
    'arr.title': 'The way to&nbsp;us',
    'arr.1': 'The Hirsch is in the centre of Heimenkirch in the district of Lindau, in the Bavarian Westallgäu. You will recognise the house by its dark shingle façade and the sign with the stag.',
    'arr.route': 'Plan your route', 'arr.coord': 'Coordinates: 47.62948, 9.90274',
    'map.text': 'The map is loaded from OpenStreetMap. Your IP address is transmitted to the servers of the OpenStreetMap Foundation.',
    'map.btn': 'Load map', 'map.more': 'More in the privacy policy',
    'foot.privacy': 'Privacy', 'foot.legal': 'Legal',
    'foot.photos': 'Photos: Gasthof Hirsch (inn sign) and Markt Heimenkirch (view of the house)',
    'foot.beta': 'Beta preview – concept &amp; implementation: Olga Tikhomirova',
    'bk.title': 'Request a room', 'bk.step1': 'Dates &amp; room', 'bk.step2': 'Your details', 'bk.step3': 'Confirmation',
    'tb.title': 'Request a table'
  };

  window.HIRSCH = { ROOMS: ROOMS, UI: UI, T: { en: EN }, META: META };
})();
