/* Familienhotel Almgrund — Konzeptprojekt von BUUQ. Fiktives Haus, fiktive Preise, Bilder KI-generiert.
   Zimmer und UI-Texte. Preise pro Zimmer und Nacht inkl. Frühstücksbuffet, zzgl. Gästetaxe 2,50 € pro Person
   und Nacht ab 15 Jahren. Saisonzeiten siehe season() in app.js. cap = Personen höchstens. busy = Demo-Auslastung. */
(function () {
  'use strict';

  var ROOMS = [
    {
      id: 'dz', cap: 3, busy: 2, from: 142,
      rates: { neben: 142, saison: 158, haupt: 176 },
      imgs: ['zimmer-dz', 'bad-wanne'],
      name: 'Doppelzimmer mit Balkon',
      capText: 'für 2 Personen, Zustellbett möglich',
      short: 'Doppelbett, Bad mit Wanne, Balkon zum Tal.',
      text: 'Altholz an der Wand, Leinen am Fenster, ein breites Doppelbett und ein Sessel für den Abend. ' +
        'Das Bad hat Wanne und Doppelwaschtisch, der Balkon schaut ins Tal. Für ein Kind stellen wir ' +
        'ein Zustell- oder Babybett dazu.',
      equip: ['Doppelbett 180 × 200 cm', 'Bad mit Badewanne und Doppelwaschtisch', 'Balkon zum Tal',
        'Zustell- oder Babybett auf Wunsch', 'Flachbild-TV', 'Kostenfreies WLAN'],
      alts: ['Doppelzimmer mit Altholzwand, Doppelbett mit grüner Decke und Balkontür',
        'Bad mit Badewanne, Waschtisch aus Holz und Fenster zum Wald']
    },
    {
      id: 'twin', cap: 3, busy: 3, from: 136,
      rates: { neben: 136, saison: 152, haupt: 168 },
      imgs: ['zimmer-twin', 'bad-dusche'],
      name: 'Zweibettzimmer mit Balkon',
      capText: 'für 2 Personen, Zustellbett möglich',
      short: 'Zwei Einzelbetten, Dusche, Balkon mit Blumenkästen.',
      text: 'Zwei getrennte Betten, salbeigrüne Wand, Schreibtisch und Sitzecke am Fenster. ' +
        'Das Bad hat eine bodengleiche Dusche, der Balkon trägt im Sommer Geranien. ' +
        'Gut für Geschwister, Großeltern mit Enkel oder Freunde auf Wandertour.',
      equip: ['Zwei Einzelbetten 90 × 200 cm', 'Bad mit bodengleicher Dusche', 'Balkon mit Blumenkästen',
        'Zustellbett auf Wunsch', 'Flachbild-TV', 'Kostenfreies WLAN'],
      alts: ['Zweibettzimmer mit zwei Betten, grünen Kissen und Balkontür',
        'Bad mit Aufsatzwaschbecken aus Stein und gläserner Dusche']
    }
  ];

  var UI = {
    'bw.in': 'Anreise', 'bw.out': 'Abreise', 'bw.guests': 'Gäste', 'bw.pick': 'Datum wählen',
    'bw.btn': 'Verfügbarkeit prüfen',
    adult1: 'Erwachsener', adultN: 'Erwachsene', kid1: 'Kind', kidN: 'Kinder',
    night1: 'Nacht', nightN: 'Nächte',
    'room.from': 'ab', 'room.pn': 'pro Zimmer und Nacht',
    'room.bookThis': 'Dieses Zimmer buchen', 'room.equip': 'Ausstattung',
    'room.priceNote': 'inkl. Frühstücksbuffet, zzgl. Gästetaxe 2,50 € pro Person und Nacht (ab 15 Jahren)',
    'room.photo': 'Foto', 'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
    'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
    'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
    'cal.hintIn': 'Bitte wählen Sie Ihren Anreisetag.', 'cal.hintOut': 'Jetzt den Abreisetag wählen.',
    'cal.reset': 'Auswahl zurücksetzen',
    'bk.guests': 'Gäste', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder (bis 17 Jahre)',
    'bk.age': 'Alter Kind', 'bk.less': 'weniger', 'bk.more': 'mehr',
    'bk.rooms': 'Zimmer für Ihren Zeitraum', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie Preis und Verfügbarkeit.',
    'bk.select': 'Auswählen', 'bk.busy': 'In diesem Zeitraum belegt', 'bk.small': 'Für diese Gästezahl zu klein',
    'bk.total': 'gesamt', 'bk.incl': 'inkl. Frühstücksbuffet und Gästetaxe',
    'bk.none': 'Für diese Kombination ist leider kein Zimmer frei. Bitte ändern Sie Zeitraum oder Gästezahl.',
    'bk.back': 'Zurück', 'bk.summary': 'Ihre Buchung', 'bk.stay': 'Zeitraum', 'bk.room': 'Zimmer',
    'bk.price': 'Gesamtpreis', 'bk.pay': 'Zahlung vor Ort, bar oder mit Karte.',
    'bk.cancel': 'Kostenfrei stornierbar bis 14 Tage vor Anreise (Beispielbedingungen).',
    'bk.nights': 'Zimmer', 'bk.single': 'Einzelnutzung Doppelzimmer', 'bk.tax': 'Gästetaxe',
    'bk.extra': 'Zustellbett', 'bk.extraFree': 'Kinderbett (bis 5 Jahre)',
    'bk.taxLine': '{n} × {nights} Nächte × 2,50 €', 'bk.taxLine1': '{n} × 1 Nacht × 2,50 €',
    'bk.demo': 'Demo – keine echte Buchung. Es werden keine Daten gesendet oder gespeichert.',
    'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail-Adresse', 'f.phone': 'Telefon',
    'f.arrival': 'Voraussichtliche Ankunftszeit (optional)',
    'f.msg': 'Wünsche oder Fragen (optional)',
    'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener noreferrer">' +
      'Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben zur Abwicklung der Buchung einverstanden.',
    'f.submit': 'Demo-Buchung abschließen',
    'e.name': 'Bitte geben Sie Ihren Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
    'e.phone': 'Bitte geben Sie eine Telefonnummer an, unter der wir Sie erreichen.',
    'e.consent': 'Bitte stimmen Sie der Datenschutzerklärung zu.',
    'ok.title': 'Vielen Dank, {name}!',
    'ok.text': 'So sieht die Bestätigung für Ihre Gäste aus. Im echten Betrieb ginge sie jetzt an {email}.',
    'ok.no': 'Buchungsnummer',
    'ok.demo': 'Demo – keine echte Buchung. Konzeptprojekt von BUUQ: Es wurde nichts gebucht und keine E-Mail versendet.',
    'ok.close': 'Schließen',
    'g.date': 'Zeitraum oder Datum', 'g.n': 'Personen', 'g.msg': 'Was Sie brauchen (Zimmer, Frühstück, Feier, Programm)',
    'g.org': 'Familie, Verein oder Firma (optional)', 'g.submit': 'Demo-Anfrage senden',
    'g.ok': 'Vielen Dank, {name}. Im echten Betrieb käme das Angebot an {email}.',
    'e.date': 'Bitte nennen Sie einen Zeitraum.', 'e.n': 'Bitte geben Sie die Personenzahl an (ab 8).'
  };

  window.ALMGRUND = { ROOMS: ROOMS, UI: UI };
})();
