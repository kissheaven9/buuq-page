/* Gasthof Lindenquell — Konzeptprojekt von BUUQ. Fiktives Haus: Zimmer, Preise und Texte sind erfunden.
   rate = Preis pro Zimmer und Nacht inkl. Frühstück [Nebensaison, Hauptsaison]. busy = Demo-Auslastung. */
(function () {
  'use strict';

  var ROOMS = [
    {
      id: 'einzel', size: 16, max: 1, busy: 2,
      rate: [69, 75],
      imgs: ['zimmer-einzel', 'bad'],
      de: {
        name: 'Einzelzimmer',
        cap: '1 Person',
        short: 'Ruhig zum Hof gelegen, mit Schreibtisch – für die Durchreise oder ein paar Arbeitstage im Dorf.',
        text: 'Unsere Einzelzimmer liegen zum ruhigen Innenhof: ein breites Bett, Schreibtisch am Fenster, ' +
          'Dusche und WC. Das Frühstück mit Brot vom Dorfbäcker ist im Preis enthalten.',
        alts: ['Einzelzimmer mit Holzmöbeln und Fenster zum Hof', 'Bad mit Dusche und Waschtisch aus Marmor']
      }
    },
    {
      id: 'doppel', size: 24, max: 2, busy: 1,
      rate: [98, 110],
      imgs: ['zimmer-doppel', 'bad'],
      de: {
        name: 'Doppelzimmer mit Balkon',
        cap: '1–2 Personen',
        short: 'Holzbett, Sitzecke und Balkon mit Geranien zur Dorfstraße. Morgens fällt das erste Licht über den Kirchturm herein.',
        text: 'Auf rund 24 m² ein Doppelbett aus Holz, Sitzecke, Balkon zur Dorfstraße, Dusche und WC. ' +
          'Vom Balkon sehen Sie die Linde und den Kirchturm. Frühstück inklusive.',
        alts: ['Doppelzimmer mit Holzbett, Sitzecke und Balkontür', 'Bad mit Dusche und Waschtisch aus Marmor']
      }
    },
    {
      id: 'familie', size: 32, max: 4, busy: 3,
      rate: [135, 149],
      imgs: ['zimmer-familie'],
      de: {
        name: 'Familienzimmer',
        cap: '2–4 Personen',
        short: 'Doppelbett und zwei Einzelbetten in zwei Räumen unter dem Dach – Platz für Kinder und Gepäck.',
        text: 'Zwei Räume unter dem Dach: vorne das Doppelbett mit Balkon, hinten zwei Einzelbetten für die Kinder. ' +
          'Dazu Dusche und WC, ein Babybett auf Wunsch und das Frühstück für alle.',
        alts: ['Familienzimmer mit Doppelbett und Balkontür']
      }
    }
  ];

  var SEASON_HIGH = [['07-01', '08-31'], ['12-20', '12-31'], ['01-01', '01-06']];
  var CLOSED = [];          /* Betriebsferien: im Konzeptprojekt keine */
  var HB = 24;              /* Halbpension pro Person und Nacht */
  var CITY_TAX = 1.8;       /* Kurbeitrag pro Person ab 16 Jahren und Nacht */
  var CITY_TAX_AGE = 16;

  var UI = {
    de: {
      locale: 'de-DE', approx: 'ca.',
      'bw.title': 'Direkt buchen', 'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste',
      'bw.pick': 'Datum wählen', 'bw.btn': 'Verfügbarkeit prüfen',
      'bw.note': 'Demo – keine echte Buchung · Zimmer ab 69 € inkl. Frühstück',
      adult1: 'Erwachsener', adultN: 'Erwachsene', kid1: 'Kind', kidN: 'Kinder',
      night1: 'Nacht', nightN: 'Nächte', person1: 'Person', personN: 'Personen',
      'room.from': 'ab', 'room.pp': 'pro Zimmer / Nacht', 'room.details': 'Details & Fotos', 'room.book': 'Zimmer buchen',
      'room.bookThis': 'Dieses Zimmer buchen', 'room.equip': 'Ausstattung',
      'room.equipList': ['Dusche / WC', 'Federbetten', 'Kostenloses WLAN', 'TV', 'Föhn'],
      'room.equipBalkon': 'Balkon', 'room.equipFamilie': 'Zwei Räume',
      'room.bb': 'mit Frühstück', 'room.hb': 'Halbpension + 24 € pro Person',
      'room.priceNote': 'Preis pro Zimmer und Nacht inkl. Frühstück, je nach Saison. Zzgl. Kurbeitrag 1,80 € ab 16 Jahren.',
      'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
      'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
      'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
      'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
      'cal.reset': 'Auswahl zurücksetzen',
      'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder (bis 17 Jahre)',
      'bk.age': 'Alter Kind', 'bk.less': 'weniger', 'bk.more': 'mehr',
      'bk.board': 'Verpflegung', 'bk.bb': 'Mit Frühstück', 'bk.hb': 'Halbpension',
      'bk.bbHint': 'Frühstück 7.30–10 Uhr, im Zimmerpreis enthalten', 'bk.hbHint': 'Dazu ein 3-Gang-Menü am Abend, 24 € pro Person',
      'bk.toRooms': 'Zimmer anzeigen', 'bk.rooms': 'Zimmer wählen',
      'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl zu klein',
      'bk.noSingle': 'Einzelnutzung nicht verfügbar',
      'bk.total': 'gesamt', 'bk.perNight': 'pro Zimmer / Nacht',
      'bk.single': '',
      'bk.kidsNote': 'Kinder im Zimmer der Eltern übernachten ohne Aufpreis.',
      'bk.tax': 'Kurbeitrag, vor Ort zu zahlen',
      'bk.season': 'Demo – keine echte Buchung, Preise sind Beispiele.',
      'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie Zeitraum oder Gästezahl.',
      'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
      'bk.boardT': 'Verpflegung', 'bk.price': 'Gesamtpreis', 'bk.priceAdults': 'Gesamtpreis',
      'bk.incl': 'Frühstück inklusive.',
      'bk.cancel': 'Kostenlos stornierbar bis sieben Tage vor Anreise.',
      'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail-Adresse', 'f.phone': 'Telefon',
      'f.msg': 'Wünsche oder Ankunftszeit (optional)',
      'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener noreferrer">' +
        'Datenschutzerklärung</a> gelesen und bin einverstanden.',
      'f.submit': 'Demo-Buchung abschließen',
      'e.name': 'Bitte geben Sie Ihren Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'e.phone': 'Bitte geben Sie eine Telefonnummer an, unter der wir Sie erreichen.',
      'e.consent': 'Bitte stimmen Sie der Datenschutzerklärung zu.',
      'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'So sähe die Bestätigung aus: Sie ginge an {email}.',
      'ok.no': 'Buchungsnummer', 'ok.demo': 'Demo – keine echte Buchung: Dies ist ein Konzeptprojekt von BUUQ. ' +
        'Es wurde nichts gebucht und keine E-Mail versendet.',
      'ok.close': 'Schließen', close: 'Schließen', menu: 'Menü',
      'map.link': 'In OpenStreetMap öffnen', 'map.popup': 'Kirchweg 4, 83707 Brunnreith'
    }
  };

  window.LQ = {
    ROOMS: ROOMS, UI: UI, SEASON_HIGH: SEASON_HIGH, CLOSED: CLOSED, HB: HB,
    CITY_TAX: CITY_TAX, CITY_TAX_AGE: CITY_TAX_AGE,
    MAP: { lat: 47.7180, lon: 11.6900, name: 'Gasthof Lindenquell' }
  };
})();
