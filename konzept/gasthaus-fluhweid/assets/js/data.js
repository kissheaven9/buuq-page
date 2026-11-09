/* Gasthaus Fluhweid — Konzeptprojekt von BUUQ. Fiktives Haus: Zimmer, Preise, Karte und Texte sind erfunden. */
(function () {
  'use strict';

  /* Saison jedes Jahr gleich: Winter 20.12.–31.03., Sommer 15.06.–20.10. Betriebsferien 10.04.–05.05. Sonst Zwischensaison. */
  var SEASONS = [
    { from: '12-20', to: '12-31', s: 'saison' },
    { from: '01-01', to: '03-31', s: 'saison' },
    { from: '06-15', to: '10-20', s: 'saison' }
  ];
  var CLOSED = [{ from: '04-10', to: '05-05' }];

  /* Preise pro Zimmer und Nacht in CHF, inkl. Frühstück. prices[persons] = { zwischen, saison }. extra = Zusatzbett. */
  var ROOMS = [
    {
      id: 'standard', max: 3, busy: 3, extra: 45,
      prices: { 1: { zwischen: 130, saison: 145 }, 2: { zwischen: 170, saison: 190 } },
      imgs: ['zimmer-1', 'zimmer-3', 'zimmer-2'],
      de: {
        name: 'Doppel unter dem Dach', cap: '1–3 Personen · Dusche/WC',
        short: 'Sechs Zimmer unter den alten Balken: Arvenholz, bemalter Nachttisch, karierte Vorhänge, Dusche/WC.',
        text: 'Die Zimmer unter dem Dach von 1904: Balken über dem Bett, Holz an allen Wänden, bemalte Nachttische und ein Fenster zu den Bergen. Eigene Dusche/WC, ein kleiner Tisch mit zwei Stühlen. Mit Zusatzbett auch für Familien.',
        equip: ['Eigene Dusche/WC, Föhn', 'Kleiner Tisch mit zwei Stühlen', 'Fenster Richtung Berge', 'Zusatzbett möglich (CHF 45)', 'WLAN'],
        alts: ['Doppelzimmer unter der Dachschräge mit Holzbalken, Doppelbett mit Wolldecke und Fenster mit Blick auf verschneite Gipfel', 'Bett mit bestickten Kissen und bemaltem Nachttisch mit Lampe', 'Fenster mit rot-weiss karierten Vorhängen, Holzstuhl und Tisch mit Wiesenblumen']
      }
    },
    {
      id: 'kammer', max: 1, busy: 2,
      prices: { 1: { zwischen: 95, saison: 110 } },
      imgs: ['zimmer-3'],
      de: {
        name: 'Kammer', cap: '1 Person · Dusche/WC',
        short: 'Drei kleine Einzelzimmer mit französischem Bett und eigener Dusche/WC.',
        text: 'Die Kammer für alle, die allein unterwegs sind: französisches Bett (140 cm), bemalter Nachttisch, eigene Dusche/WC. Klein, still und warm.',
        equip: ['Französisches Bett, 140 cm', 'Eigene Dusche/WC', 'Bemalter Nachttisch', 'WLAN'],
        alts: ['Bett mit bestickten Kissen neben einem bemalten Nachttisch']
      }
    },
    {
      id: 'berg', max: 2, busy: 4,
      prices: { 1: { zwischen: 170, saison: 185 }, 2: { zwischen: 210, saison: 235 } },
      imgs: ['zimmer-2', 'zimmer-1'],
      de: {
        name: 'Bergblick', cap: '2 Personen · Dusche/WC',
        short: 'Drei grössere Zimmer mit Sitzecke am Fenster.',
        text: 'Die drei grösseren Zimmer an der Südseite: Sitzecke am Fenster, freier Blick auf die Gipfel, eigene Dusche/WC.',
        equip: ['Eigene Dusche/WC, Föhn', 'Sitzecke am Fenster', 'Freier Blick nach Süden', 'WLAN'],
        alts: ['Fenster mit karierten Vorhängen und Blick auf die Berge, davor Tisch und Holzstuhl', 'Doppelzimmer unter der Dachschräge mit Holzbalken und Bergblick']
      }
    }
  ];

  /* Karte: [Gericht, Preis CHF] */
  var MENU = [
    { id: 'wild', items: [
      ['Rehpfeffer mit Spätzli, Rotkraut und Marroni', '39.00'],
      ['Hirschschnitzel an Wacholderrahmsauce', '42.00'],
      ['Gemspfeffer nach Art des Hauses', '38.00'],
      ['Rehrücken, ab 2 Personen, in zwei Gängen', '56.00 p.P.'],
      ['Wildteller vegetarisch: Spätzli, Rotkraut, Rosenkohl, Birne', '26.00']
    ] },
    { id: 'roesti', items: [
      ['Rösti mit Spiegelei', '21.00'],
      ['Rösti mit Speck und Bergkäse', '25.00'],
      ['Rösti mit Waldpilzen an Rahmsauce', '27.00'],
      ['Rösti mit Bratwurst und Zwiebelsauce', '27.00']
    ] },
    { id: 'alp', items: [
      ['Alpkäse vom Nachbarhof, gehobelt', '18.00'],
      ['Trockenfleisch und Bergkäse', '27.50'],
      ['Käsefondue, ab 2 Personen', '29.00 p.P.'],
      ['Gerstensuppe', '12.00']
    ] },
    { id: 'dessert', items: [
      ['Meringue mit Doppelrahm', '11.00'],
      ['Apfelküchlein mit Vanillesauce', '12.50'],
      ['Vermicelles mit Rahm', '12.00']
    ] }
  ];

  var UI = {
    'person1': 'Person', 'personN': 'Personen', 'night1': 'Nacht', 'nightN': 'Nächte',
    'room.details': 'Zimmer ansehen', 'room.book': 'Buchen', 'room.night': 'pro Nacht', 'room.equip': 'Ausstattung',
    'room.prices': 'Preise pro Zimmer und Nacht, inkl. Frühstück', 'room.photo': 'Foto', 'room.bookThis': 'Dieses Zimmer buchen',
    'room.p1': '1 Person', 'room.p2': '2 Personen', 'room.zw': 'Zwischensaison', 'room.sa': 'Saison',
    'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
    'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
    'cal.hintIn': 'Bitte Anreisetag wählen', 'cal.hintOut': 'Bitte Abreisetag wählen', 'cal.reset': 'Zurücksetzen',
    'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.closed': 'Betriebsferien', 'cal.sel': 'Ihre Auswahl',
    'bk.guests': 'Personen', 'bk.persons': 'Personen im Zimmer', 'bk.less': 'weniger', 'bk.more': 'mehr',
    'bk.extraNote': '3 Personen: Doppel unter dem Dach mit Zusatzbett (CHF 45 pro Nacht).',
    'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie die freien Zimmer und den Preis.',
    'bk.small': 'Für diese Personenzahl nicht geeignet', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.noprice': 'Für diesen Zeitraum bitte anfragen.',
    'bk.total': 'gesamt', 'bk.select': 'Auswählen',
    'bk.none': 'In diesem Zeitraum ist kein passendes Zimmer frei. Bitte wählen Sie andere Tage.',
    'bk.fine': 'Preise pro Zimmer und Nacht in CHF, inkl. Frühstück und MwSt. Demo – keine echte Buchung.',
    'bk.summary': 'Ihre Buchung', 'bk.room': 'Zimmer', 'bk.stay': 'Zeitraum',
    'bk.lineRoom': 'Zimmer inkl. Frühstück', 'bk.lineExtra': 'Zusatzbett', 'bk.price': 'Gesamtbetrag', 'bk.back': 'Zurück',
    'bk.nightsZw': 'Zwischensaison', 'bk.nightsSa': 'Saison',
    'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.msg': 'Wünsche, Anreisezeit (optional)',
    'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen. Mir ist klar, dass dies eine Demo ist und nichts gebucht wird.',
    'f.submit': 'Demo-Buchung abschliessen',
    'e.name': 'Bitte geben Sie Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
    'e.phone': 'Bitte geben Sie eine Telefonnummer an.', 'e.consent': 'Bitte bestätigen Sie den Hinweis.',
    'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'In einer echten Website ginge jetzt eine Bestätigung an {email}. Check-in ab 14 Uhr, Check-out bis 11 Uhr.',
    'ok.no': 'Demo-Buchungsnummer', 'ok.demo': 'Demo – keine echte Buchung: Es wurde nichts gebucht, nichts gespeichert und nichts versendet.',
    'ok.close': 'Schliessen',
    'open.now': 'Jetzt geöffnet', 'open.closed': 'Heute Ruhetag', 'open.holiday': 'Betriebsferien bis 5. Mai', 'open.until': 'bis {t} Uhr',
    'open.before': 'Öffnet um 9 Uhr', 'open.after': 'Heute geschlossen'
  };

  window.FLUHWEID = { SEASONS: SEASONS, CLOSED: CLOSED, ROOMS: ROOMS, MENU: MENU, UI: UI };
})();
