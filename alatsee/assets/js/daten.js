/* ALATSEE Hotel & Restaurant, Füssen — Inhalte: Zimmer und UI-Texte (nur Deutsch).
   Quellen: hotel-alatsee.de (Seiten Start, Hotel, Restaurant, Umgebung, Kontakt, Impressum; 24.11.2026),
   restaurantguru.com / de.restaurantguru.com (Portalnoten und Gästestimmen; 24.11.2026).
   Zimmerpreise werden vom Haus nicht veröffentlicht — darum überall „auf Anfrage“. */
(function () {
  'use strict';

  /* Kinder laut hotel-alatsee.de/hotel: bis 3 Jahre frei, bis 12 Jahre halber Preis. */
  var KIDS = [
    { id: 'k3' },   /* bis 3 Jahre: frei */
    { id: 'k12' },  /* 4 bis 12 Jahre: halber Preis */
    { id: 'k13' }   /* ab 13 Jahren: voller Preis */
  ];

  var ROOMS = [
    {
      id: 'land', adults: 3, kids: 2, busy: 3,
      imgs: ['zimmer-dz-900', 'zimmer-dz2-900', 'zimmer-ez-900', 'zimmer-fam-900', 'zimmer-wasch-505', 'zimmer-fenster-900', 'bad-900'],
      name: 'Landhauszimmer', cap: '1–3 Personen · Waschbecken im Zimmer · Dusche/Bad auf der Etage',
      text: 'Gästezimmer im gemütlichen Landhausstil: Betten aus hellem Holz, Waschbecken im Zimmer, vor dem Fenster der Wald. Die Duschen und Bäder auf der Etage wurden 2011 komplett renoviert. Es gibt Zimmer für eine, zwei oder drei Personen.',
      equip: ['Waschbecken im Zimmer', 'Dusche/Bad auf der Etage (renoviert 2011)', 'Landhausmöbel aus Holz', 'Frühstück inklusive', 'Haustiere willkommen (9 € pro Nacht)', 'Sportstudio Füssen kostenlos'],
      alts: ['Landhauszimmer mit Doppelbett aus hellem Holz und Schrankwand',
        'Doppelzimmer mit Holzbett, roten Teppichboden und Fenster mit rosa Vorhängen',
        'Einzelzimmer mit Bett, Kleiderschrank und Waschbecken mit Spiegel',
        'Dreibettzimmer mit Doppelbett und separatem Einzelbett am Fenster',
        'Zimmer mit Einzelbett, Holztür und eigenem Waschbecken',
        'Zimmerfenster mit Blick in den Wald, davor Tisch mit Wasserflaschen',
        'Renoviertes Duschbad auf der Etage mit Waschbecken und Handtüchern']
    },
    {
      id: 'apart', adults: 2, kids: 2, busy: 2,
      imgs: ['apart-schlaf-900', 'apart-wohnen-505'],
      name: 'Apartment', cap: 'bis 4 Personen · eigenes Duschbad · Schlafzimmer + Wohnzimmer',
      text: 'Das renovierte Apartment hat ein Schlafzimmer und ein Wohnzimmer mit Schlafcouch, dazu SAT-TV und ein 2016 saniertes Badezimmer mit Dusche. Ideal für Familien oder einen längeren Aufenthalt am See.',
      equip: ['Eigenes Duschbad (saniert 2016)', 'Schlafzimmer + Wohnzimmer mit Schlafcouch', 'SAT-TV', 'Frühstück inklusive', 'Haustiere willkommen (9 € pro Nacht)', 'Sportstudio Füssen kostenlos'],
      alts: ['Schlafzimmer des Apartments mit Doppelbett und Nachttischlampen',
        'Wohnzimmer des Apartments mit Schlafcouch, Sessel und Zimmerpflanze']
    }
  ];

  var UI = {
    'person1': 'Person', 'personN': 'Personen', 'night1': 'Nacht', 'nightN': 'Nächte', 'adult1': 'Erwachsener', 'adultN': 'Erwachsene',
    'kid1': 'Kind', 'kidN': 'Kinder',
    'room.details': 'Zimmer ansehen', 'room.book': 'Anfragen', 'room.equip': 'Ausstattung',
    'room.prices': 'Preise', 'room.photo': 'Foto', 'room.bookThis': 'Dieses Zimmer anfragen',
    'room.pRoom': 'Übernachtung mit Frühstück', 'room.pOnReq': 'auf Anfrage',
    'room.pHp': 'Halbpension, Zuschlag', 'room.pHpV': '29,50 € pro Person (3-Gang-Menü)',
    'gal.prev': 'Vorheriges Foto', 'gal.next': 'Nächstes Foto',
    'cal.prev': 'Vorheriger Monat', 'cal.next': 'Nächster Monat',
    'cal.hintIn': 'Bitte Anreisetag wählen', 'cal.hintOut': 'Bitte Abreisetag wählen', 'cal.reset': 'Zurücksetzen',
    'cal.free': 'frei', 'cal.busy': 'belegt', 'cal.sel': 'Ihre Auswahl',
    'bk.guests': 'Personen', 'bk.adults': 'Erwachsene', 'bk.kids': 'Kinder bis 12 Jahre', 'bk.less': 'weniger', 'bk.more': 'mehr',
    'bk.kidAge': 'Alter Kind', 'k3': 'bis 3 Jahre – frei', 'k12': '4 bis 12 Jahre – halber Preis', 'k13': 'ab 13 Jahren – voller Preis',
    'bk.hp': 'Halbpension', 'bk.hpNote': '3-Gang-Menü am Abend, 29,50 € pro Person und Tag',
    'bk.kidsNote': 'Kinder bis 3 Jahre übernachten frei, bis 12 Jahre zum halben Preis (laut hotel-alatsee.de).',
    'bk.rooms': 'Zimmer', 'bk.pickDates': 'Wählen Sie An- und Abreise – dann sehen Sie, welche Zimmer frei sind.',
    'bk.small': 'Für diese Personenzahl nicht geeignet', 'bk.busy': 'In diesem Zeitraum belegt',
    'bk.onReq': 'auf Anfrage', 'bk.withBreakfast': 'inkl. Frühstück', 'bk.select': 'Auswählen',
    'bk.none': 'In diesem Zeitraum ist kein passendes Zimmer frei. Bitte wählen Sie andere Tage oder rufen Sie uns an: +49 8362 6205.',
    'bk.fine': 'Die Zimmerpreise nennt Ihnen das Haus auf Anfrage – inkl. Frühstück und MwSt., zzgl. Kurtaxe. Haustiere 9 € pro Nacht, Einzel-Nacht-Zuschlag 10,50 €. Stornierung bis 7 Tage vor Anreise kostenfrei.',
    'bk.summary': 'Ihre Anfrage', 'bk.room': 'Zimmer', 'bk.stay': 'Zeitraum',
    'bk.lineHp': 'Halbpension gewünscht', 'bk.priceNote': 'Den Gesamtpreis nennt Ihnen das Haus mit der Antwort auf Ihre Anfrage.',
    'bk.back': 'Zurück',
    'f.name': 'Vor- und Nachname', 'f.email': 'E-Mail', 'f.phone': 'Telefon', 'f.msg': 'Wünsche, Haustier, Anreisezeit (optional)',
    'f.consent': 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden.',
    'f.submit': 'Anfrage senden',
    'e.name': 'Bitte geben Sie Vor- und Nachnamen an.', 'e.email': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
    'e.phone': 'Bitte geben Sie eine Telefonnummer an.', 'e.consent': 'Bitte bestätigen Sie die Datenschutzerklärung.',
    'ok.title': 'Vielen Dank, {name}!', 'ok.text': 'In der fertigen Website geht Ihre Anfrage jetzt an das Haus, und Sie erhalten eine Bestätigung an {email}. Das Haus antwortet mit Preis und verfügbaren Zimmern.',
    'ok.no': 'Anfragenummer', 'ok.demo': 'Dies ist eine Beta-Vorschau: Es wurde nichts angefragt, nichts gespeichert und nichts versendet.',
    'ok.close': 'Schließen', 'map.link': 'In OpenStreetMap öffnen',
    'open.now': 'Jetzt geöffnet', 'open.closed': 'Heute Ruhetag', 'open.until': 'bis {t}',
    'open.before': 'Öffnet um {t}', 'open.after': 'Heute geschlossen',
    'open.urlaub': 'Betriebsurlaub bis 3.12.2026',
    'sun.rise': 'Sonnenaufgang', 'sun.set': 'Sonnenuntergang', 'sun.today': 'heute am Alatsee',
    'bl.err': 'Bitte Anreise und Abreise wählen – die Abreise liegt nach der Anreise.'
  };

  window.ALATSEE = { ROOMS: ROOMS, KIDS: KIDS, UI: UI };
})();
