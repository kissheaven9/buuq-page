/* Hotel Seeweid — Konzeptprojekt von BUUQ. Fiktives Haus: Zimmer, Preise und UI-Texte sind Beispielangaben.
   Ohne Backend: Verfügbarkeit und Buchung werden im Browser simuliert. */
(function () {
  'use strict';

  /* Beispieltarife: pro Person und Nacht in CHF inkl. Frühstück. Halbpension +38 pro Person.
     Kinder im Zusatzbett im Zimmer der Eltern: bis 5 gratis, bis 11 Jahre 50 %, bis 15 Jahre 30 % Ermässigung. */
  var PP = 115, EZ = 138, HP = 38;
  var KIDS = [
    { id: 'k5', pct: 0 },
    { id: 'k11', pct: 50 },
    { id: 'k15', pct: 70 }
  ];

  var ROOMS = [
    {
      id: 'dz', adults: 2, kids: 2, busy: 3, perPerson: PP, room: 2 * PP,
      imgs: ['zimmer-dz-1', 'zimmer-dz-2'],
      de: {
        name: 'Doppelzimmer Seeseite', cap: '2 Personen · Balkon · Dusche, WC',
        text: 'Helles Doppelzimmer mit Eichenboden, grossem Bett und Schreibtisch. Die Balkontür geht auf den See hinaus, auf dem Balkon stehen zwei Sessel und ein Tisch für das Frühstück. Kinder schlafen im Zusatzbett im Zimmer der Eltern.',
        equip: ['Balkon mit Seeblick', 'Dusche und WC', 'Doppelbett 180 cm', 'Schreibtisch', 'WLAN inklusive', 'Lift im Haus'],
        alts: ['Doppelzimmer mit weissem Bett, Leselampe und offener Balkontür zum See', 'Balkon mit zwei Korbsesseln und Frühstückstisch, dahinter der See im Morgenlicht']
      }
    },
    {
      id: 'ez', adults: 1, kids: 0, busy: 2, perPerson: EZ, room: EZ,
      imgs: ['zimmer-ez-1', 'zimmer-ez-2'],
      de: {
        name: 'Einzelzimmer Seeseite', cap: '1 Person · Balkon · Dusche, WC',
        text: 'Ruhiges Einzelzimmer auf der Seeseite mit breitem Bett, Schreibtisch und eigenem Balkon. Morgens scheint die Sonne über den Bergen direkt ins Zimmer.',
        equip: ['Balkon mit Seeblick', 'Dusche und WC', 'Bett 140 cm', 'Schreibtisch', 'WLAN inklusive', 'Lift im Haus'],
        alts: ['Balkon mit Korbsessel, Blumen und Blick auf den See im Morgenlicht', 'Offene Balkontür mit Blick auf See und Berge']
      }
    }
  ];

  var UI = {
    'night1': 'Nacht', 'nightN': 'Nächte', 'adult1': 'Erwachsener', 'adultN': 'Erwachsene',
    'kid1': 'Kind', 'kidN': 'Kinder',
    'room.night': 'pro Nacht', 'room.equip': 'Ausstattung',
    'room.prices': 'Beispieltarife', 'room.photo': 'Foto', 'room.bookThis': 'Dieses Zimmer buchen',
    'room.pRoom': 'Zimmer mit Frühstück', 'room.pHp': 'Halbpension, Zuschlag', 'room.pp': 'pro Person', 'room.forTwo': 'für zwei Personen',
    'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
    'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
    'cal.hintIn': 'Bitte Anreisetag wählen', 'cal.hintOut': 'Bitte Abreisetag wählen', 'cal.reset': 'Zurücksetzen',
    'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
    'bk.guests': 'Personen', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder bis 15 Jahre', 'bk.less': 'weniger', 'bk.more': 'mehr',
    'bk.kidAge': 'Alter Kind', 'k5': 'bis 5 Jahre – gratis', 'k11': '6 bis 11 Jahre – 50 % Ermässigung', 'k15': '12 bis 15 Jahre – 30 % Ermässigung',
    'bk.hp': 'Halbpension', 'bk.hpNote': 'Viergangmenü im Panorama-Restaurant, CHF 38 pro Person und Nacht',
    'bk.kidsNote': 'Kinder schlafen im Zusatzbett im Zimmer der Eltern.',
    'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie die freien Zimmer und den Preis.',
    'bk.small': 'Für diese Personenzahl nicht geeignet', 'bk.ezKids': 'Einzelzimmer: eine Person, ohne Zusatzbett', 'bk.busy': 'In diesem Zeitraum belegt',
    'bk.total': 'gesamt', 'bk.select': 'Auswählen',
    'bk.none': 'In diesem Zeitraum ist kein passendes Zimmer frei. Bitte wählen Sie andere Tage.',
    'bk.fine': 'Demo – keine echte Buchung. Beispielpreise in CHF inkl. Frühstück, Service und MwSt.',
    'bk.summary': 'Ihre Buchung', 'bk.room': 'Zimmer', 'bk.stay': 'Zeitraum',
    'bk.lineRoom': 'Zimmer mit Frühstück', 'bk.lineKids': 'Kinder im Zusatzbett', 'bk.lineHp': 'Halbpension', 'bk.price': 'Gesamtbetrag', 'bk.back': 'Zurück',
    'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.msg': 'Wünsche, Anreisezeit (optional)',
    'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen. Mir ist klar, dass dies eine Demo ist und nichts übermittelt wird.',
    'f.submit': 'Demo-Buchung abschliessen',
    'e.name': 'Bitte geben Sie Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
    'e.phone': 'Bitte geben Sie eine Telefonnummer an.', 'e.consent': 'Bitte bestätigen Sie den Hinweis.',
    'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'Auf einer echten Website ginge jetzt eine Bestätigung an {email}. Anreise ab 15 Uhr, Abreise bis 11 Uhr.',
    'ok.no': 'Demo-Buchungsnummer', 'ok.demo': 'Demo – keine echte Buchung: Es wurde nichts gebucht, nichts gespeichert und nichts versendet.',
    'ok.close': 'Schliessen',
    'open.now': 'Jetzt geöffnet', 'open.closed': 'Heute Ruhetag', 'open.until': 'bis {t}',
    'open.before': 'Öffnet um {t}', 'open.after': 'Heute geschlossen',
    'sun.rise': 'Sonnenaufgang', 'sun.set': 'Sonnenuntergang', 'sun.today': 'heute am See',
    'bl.err': 'Bitte Anreise und Abreise wählen – die Abreise liegt nach der Anreise.'
  };

  window.SEEWEID = { ROOMS: ROOMS, KIDS: KIDS, PP: PP, EZ: EZ, HP: HP, UI: UI };
})();
