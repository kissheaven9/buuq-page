/* Gasthof-Hotel Höhensteiger — Inhalte: Zimmerdaten und UI-Texte (Deutsch).
   Preise werden bewusst nicht genannt: Das Haus veröffentlicht keine Preisliste,
   deshalb läuft alles als unverbindliche Anfrage (siehe _unterlagen/FAKTEN.md). */
(function () {
  'use strict';

  /* Zimmerkategorien laut gasthofhoehensteiger.de («Hotel»):
     Classic im Haupthaus (1–5 Personen), Comfort im neuen Hoteltrakt (ab 30 m², 1–6 Personen),
     dazu Familienzimmer mit 3 und 4 Betten. fits = [min, max] Personen. busy = Demo-Auslastung. */
  var ROOMS = [
    {
      id: 'classic', fits: [1, 5], busy: 1,
      imgs: ['classic-1', 'classic-2', 'classic-3'],
      de: {
        name: 'Classic-Zimmer', cap: '1 bis 5 Personen · im Haupthaus',
        short: 'Gemütliche Zimmer im Gasthof – teils mit Balkon, mit Kingsize-, Twin- oder Boxspringbett.',
        text: 'Die Classic-Zimmer liegen im Haupthaus des Gasthofs. Jedes Zimmer hat Bad oder Dusche/WC, TV und Radio; einige haben einen Balkon zum Hof oder zur Straße.',
        equip: ['Frühstück vom Buffet inbegriffen', 'Bad oder Dusche/WC', 'TV und Radio', 'Kostenloses WLAN im ganzen Haus', 'Kostenloser Parkplatz am Haus'],
        alts: ['Classic-Zimmer mit Doppelbett, Vorhängen und Schreibtisch', 'Classic-Zimmer mit Holzbett und Bild über dem Kopfteil', 'Bad mit Dusche, Waschbecken und Margeriten-Motiv']
      }
    },
    {
      id: 'comfort', fits: [1, 6], busy: 2,
      imgs: ['comfort-1', 'comfort-4', 'comfort-2', 'comfort-3'],
      de: {
        name: 'Comfort-Zimmer', cap: '1 bis 6 Personen · im neuen Hoteltrakt',
        short: 'Mindestens 30 m² im neuen Holztrakt – ruhig zum Garten, mit Fußbodenheizung.',
        text: 'Die Comfort-Zimmer liegen im neuen Hoteltrakt aus Holz. Alle Zimmer sind mindestens 30 m² groß und besonders für Familien geeignet – mit Flachbild-TV, Zentral- und Fußbodenheizung und Blick in Park, Hof oder auf die Terrasse.',
        equip: ['Frühstück vom Buffet inbegriffen', 'Mindestens 30 m²', 'Flachbild-TV, Fußbodenheizung', 'Kostenloses WLAN im ganzen Haus', 'Kostenloser Parkplatz am Haus'],
        alts: ['Comfort-Zimmer mit Doppelbett und hellem Holz im neuen Hoteltrakt', 'Comfort-Zimmer mit Bett und indirektem Licht', 'Sitzecke mit Tisch, Bank und Pendelleuchte', 'Bad mit rundem Spiegel und Aufsatz-Waschbecken']
      }
    },
    {
      id: 'familie', fits: [3, 4], busy: 2,
      imgs: ['familie-1', 'familie-2', 'familie-3'],
      de: {
        name: 'Familienzimmer', cap: '3 oder 4 Personen',
        short: 'Mehrere 3- und 4-Bett-Zimmer – viel Platz für Familien mit Kindern.',
        text: 'Für Familien mit Kindern gibt es mehrere 3- und 4-Bett-Zimmer. Geräumig und ruhig, mit Bad oder Dusche/WC; Babybetten stellen wir auf Wunsch dazu.',
        equip: ['Frühstück vom Buffet inbegriffen', '3 oder 4 Betten', 'Bad oder Dusche/WC', 'Kostenloses WLAN im ganzen Haus', 'Kostenloser Parkplatz am Haus'],
        alts: ['Familienzimmer unter dem Dach mit Doppelbett und rotem Sofa', 'Zimmer mit Sofabett und Holzboden', 'Bad mit Dusche und grünem Vorhang']
      }
    }
  ];

  var UI = {
    de: {
      person1: 'Person', personN: 'Personen', night1: 'Nacht', nightN: 'Nächte',
      'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen', 'bw.btn': 'Zimmer suchen',
      'room.details': 'Details und Fotos', 'room.book': 'Anfragen', 'room.bookThis': 'Dieses Zimmer anfragen',
      'room.onreq': 'auf Anfrage', 'room.onreqLabel': 'Übernachtung mit Frühstück',
      'room.night': 'Preis je nach Termin und Personenzahl – das Haus bestätigt Ihre Anfrage.',
      'room.photo': 'Foto', 'room.equip': 'Ausstattung', 'room.prices': 'Preis',
      'room.priceNote': 'Das Haus nennt Ihnen den Preis für Ihren Termin – die Anfrage ist unverbindlich.',
      'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat', 'cal.hintIn': 'Bitte Anreisetag wählen.',
      'cal.hintOut': 'Jetzt den Abreisetag wählen.', 'cal.reset': 'Zurücksetzen',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'bk.guests': 'Gäste', 'bk.persons': 'Personen', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie, was frei ist.',
      'bk.small': 'Passt nicht zur Personenzahl', 'bk.busy': 'An diesen Daten belegt',
      'bk.avail': 'Verfügbar', 'bk.onreq': 'Preis auf Anfrage', 'bk.select': 'Auswählen',
      'bk.none': 'Für diese Daten ist online nichts frei. Rufen Sie uns an: +49 8031 86667.',
      'bk.fine': 'Unverbindliche Anfrage: Preis und Verfügbarkeit bestätigt Ihnen das Haus. Frühstück ist inbegriffen.',
      'bk.summary': 'Ihre Anfrage', 'bk.room': 'Zimmer', 'bk.stay': 'Aufenthalt',
      'bk.price': 'Preis', 'bk.back': '← Zurück zur Auswahl',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.msg': 'Wünsche (optional)',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin einverstanden.',
      'f.submit': 'Unverbindlich anfragen',
      'e.name': 'Bitte Vor- und Nachnamen angeben.', 'e.email': 'Bitte eine gültige E-Mail-Adresse angeben.',
      'e.phone': 'Bitte eine Telefonnummer angeben.', 'e.consent': 'Bitte stimmen Sie der Datenschutzerklärung zu.',
      'ok.title': 'Danke, {name}!', 'ok.text': 'Ihre Zimmeranfrage ist eingegangen. Die Antwort senden wir an {email}.',
      'ok.no': 'Anfragenummer',
      'ok.demo': 'Das ist eine Vorschau: Es wurde nichts angefragt und nichts gesendet. So würde die Bestätigung für Ihre Gäste aussehen.',
      'ok.close': 'Schließen',
      'map.link': 'Größere Karte auf OpenStreetMap',
      't.date': 'Datum', 't.time': 'Uhrzeit', 't.persons': 'Personen', 't.name': 'Name', 't.phone': 'Telefon',
      't.msg': 'Anlass oder Wunsch (optional)',
      't.saeli': 'Für eine Feier oder Gruppe (Stüberl oder Saal gewünscht)',
      't.submit': 'Tisch anfragen', 't.note': 'Wir bestätigen Ihre Reservierung telefonisch.',
      'te.date': 'Bitte ein Datum wählen.', 'te.past': 'Das Datum liegt in der Vergangenheit.',
      'te.name': 'Bitte Ihren Namen angeben.', 'te.phone': 'Bitte eine Telefonnummer für den Rückruf angeben.',
      'tok.title': 'Danke, {name}!', 'tok.text': 'Ihre Tischanfrage für {persons} am {date} um {time} Uhr ist eingegangen. Wir bestätigen telefonisch.',
      'tok.demo': 'Das ist eine Vorschau: Es wurde nichts gesendet und kein Tisch reserviert.'
    }
  };

  window.HOEHENSTEIGER = { ROOMS: ROOMS, UI: UI, T: {}, META: {} };
})();
