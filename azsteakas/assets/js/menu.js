/* Azsteakas — Speisekarte, Mittagskarte, Öffnungszeiten. Quelle: azsteakas.de + azsteakas.dipago.de, Stand 24.10.2026.
   Preise in Euro inkl. MwSt. und Service. Kennzeichen: veg = vegetarisch, vegan, scharf. */
window.AZ = {
  /* Küche: Mo–Do + So 11:30–21:00, Fr + Sa 11:30–22:00 (laut azsteakas.de). 0 = Sonntag … 6 = Samstag */
  HOURS: [
    { open: '11:30', close: '21:00' },
    { open: '11:30', close: '21:00' },
    { open: '11:30', close: '21:00' },
    { open: '11:30', close: '21:00' },
    { open: '11:30', close: '21:00' },
    { open: '11:30', close: '22:00' },
    { open: '11:30', close: '22:00' }
  ],
  LUNCH: {
    validFrom: '19.10.2026',
    time: 'Montag bis Freitag, 11:30–14:30 Uhr',
    price: 13.5,
    priceVeg: 12.5,
    days: [
      { d: 'Montag', dish: 'Großer, bunter Salat mit einem saftig gegrillten Beef-Burger-Patty, Balsamico-Dressing und Knoblauchbrot',
        veg: 'Crispy Soja Burger „Chicken Style“ mit BBQ-Sauce und Julienne Pommes', vegTag: 'vegan' },
      { d: 'Dienstag', dish: 'Krosse Rinderstreifen vom Grill mit Pfefferrahmsauce und Butterspätzle',
        veg: 'Kässpätzle mit Röstzwiebeln und kleinem grünen Salat', vegTag: 'veg' },
      { d: 'Mittwoch', dish: 'Zarte Medaillons vom Rind mit Kräuterbutter und Ofenkartoffel mit Sauerrahm',
        veg: 'Double Gemüse-Rösti-Taler mit Salatbouquet und Sweet Chili Dip', vegTag: 'vegan' },
      { d: 'Donnerstag', dish: 'Putensteak „low carb“ mit Kräuterbutter und buntem Pfannengemüse',
        veg: 'Buntes Pfannengemüse, Basmatireis, Tomatensauce', vegTag: 'vegan' },
      { d: 'Freitag', dish: 'Knuspriges Hähnchenbrustschnitzel mit lauwarmem Gurken-Kartoffelsalat',
        veg: '2 Crispy Soja Taler mit lauwarmem Gurken-Kartoffelsalat', vegTag: 'vegan' }
    ]
  },
  /* Was Gäste bestellen und fotografieren: aus Rezensionen und Gästefotos (Google, Yelp), Oktober 2026 */
  FAVS: [
    { img: 'ribeye', n: 'Rib-Eye-Steak', p: 'ab 29,00', d: 'Das meistfotografierte Gericht: schön durchzogen, vom Lavasteingrill, 220 / 320 / 500 g.', tab: 'steaks' },
    { img: 'filet', n: 'Filetsteak', p: '33,50', d: '„Perfekt gegart“ – in Rezensionen am häufigsten empfohlen, gern mit Bratkartoffeln.', tab: 'steaks' },
    { img: 'salat', n: 'Salat vom Buffet', p: 'ab 9,90', d: 'Soviel und sooft Sie mögen, vier hausgemachte Dressings – Gäste nennen es „super Salatbuffet“.', tab: 'vorweg' },
    { img: 'burger', n: 'New York Burger', p: '18,90', d: 'Black Angus, Blue Cheese, Bacon, Brioche. Dazu Pommes oder Süßkartoffel-Sticks.', tab: 'mehr' },
    { img: 'suppe', n: 'Curry-Chili-Suppe', p: '9,70', d: 'Mit Sahnetopping und Riesengarnele – der Klassiker zum Einstieg.', tab: 'vorweg' },
    { img: 'dessert', n: 'Dunkle Schokoladenmousse', p: '11,20', d: 'Mit Jack Daniel’s Old No. 7 – das Dessert, das Gäste fotografieren.', tab: 'desserts' }
  ],
  MENU: [
    {
      id: 'vorweg', tab: 'Vorweg', title: 'Vorspeisen, Suppen & Salate',
      photos: [['salat', 'Salat vom Buffet – soviel und sooft Sie mögen'], ['suppe', 'Curry-Chili-Suppe mit Riesengarnele']],
      groups: [
        { h: 'Vorspeisen', items: [
          { n: 'Carpaccio', d: 'Hauchdünne Scheiben vom Rind, Kirschtomate, Trüffelöl, Rucola, frische Champignons, Parmesan und Knoblauchbrot', p: 15.3 },
          { n: 'Garnelenpfännchen', d: 'Garnele, Champignons, Kirschtomate, Knoblauchöl, Chili, Knoblauchbrot', p: 18.7 },
          { n: 'Beeftello Tonnato', d: 'Black Angus Rind, Thunfischsauce, Kapern', p: 16.7 },
          { n: 'Maiskolben', d: 'vom Grill, Kräuterbutter', p: 6.5, t: ['veg'] },
          { n: 'Grüne Oliven', d: 'Knoblauchbrot, Aioli', p: 9.5, t: ['veg'] },
          { n: 'Süßkartoffel-Sticks', d: 'mit Sour-Cream', p: 6.9, t: ['veg'] },
          { n: 'Falafel Bällchen', d: 'mit Sweet Chili Dip', p: 9.8, t: ['vegan'] }
        ] },
        { h: 'Suppen', items: [
          { n: 'Curry-Chili-Suppe', d: 'Sahnetopping, Riesengarnele', p: 9.7 },
          { n: 'Pikante Tomatensuppe', d: 'aus frischen Tomaten, Parmesanspäne', p: 8.6, t: ['veg', 'scharf'] },
          { n: 'Rinderkraftbrühe', d: 'mit Kräuterflädle-Einlage', p: 9.7 },
          { n: 'Kartoffel-Trüffel-Suppe', d: 'mit Kartoffeln aus regionalem Anbau', p: 9.7, t: ['veg'] }
        ] },
        { h: 'Salate', note: 'Große Portion gemischter Salate, frisches Knoblauchbrot, Dressing nach Wahl', items: [
          { n: 'Salat vom Buffet als Vorspeise', d: 'von unserem reichhaltigen Buffet, soviel und sooft Sie mögen – wir berechnen pro Person', p: 9.9, t: ['veg'] },
          { n: 'Salat vom Buffet als Hauptgericht', d: 'von unserem reichhaltigen Buffet, soviel und sooft Sie mögen – wir berechnen pro Person', p: 16, t: ['veg'] },
          { n: 'Salat Ziegenkäse', d: 'gebratener Ziegenkäse mit Honig und Thymian', p: 19.5, t: ['veg'] },
          { n: 'Salat Putenbrust', d: 'gegrillte Putenbrust-Streifen mit Waldbeeren', p: 19.5 },
          { n: 'Salat Rinderfilet', d: 'gegrillte Rinderfiletspitzen', p: 22 },
          { n: 'Salat Knusperhähnchen', d: 'gebackene Hähnchenbrust, Parmesanspäne', p: 19.7 },
          { n: 'Salat Surf & Turf', d: 'Medaillons von Pute und Rind, gegrillte Riesengarnele', p: 22 },
          { n: 'Salat Scampi', d: 'gegrillte King Prawns', p: 22.8 },
          { n: 'Salat Falafel', d: 'große Portion gemischter Salate mit Falafel-Bällchen und veganer Vinaigrette', p: 17.9, t: ['vegan'] }
        ] },
        { h: 'Hausgemachte Dressings', items: [
          { n: 'Vinaigrette', d: 'Essig-Öl-Dressing, Kräuter', t: ['vegan'] },
          { n: 'Balsamico', d: 'Olivenöl, dunkler Balsamico, Dijonsenf, Kräuter', t: ['vegan'] },
          { n: 'Joghurt-Sauerrahm', d: 'Joghurt, Sauerrahm, frischer Schnittlauch', t: ['veg'] },
          { n: 'Azsteakas-Hausdressing', d: 'Mayonnaise, Ketchup, Senf, Joghurt, Knoblauch, Kräuter', t: ['veg'] }
        ] }
      ]
    },
    {
      id: 'steaks', tab: 'Steaks', title: 'Von der Weide',
      photos: [['ribeye', 'Rib-Eye-Steak, medium, mit Knoblauchbrot und Kräuterbutter'], ['filet', 'Filetsteak']],
      intro: 'Unsere Steaks stammen von ganzjährig freilaufenden Rindern aus den besten Gegenden Südamerikas. Die Grammangaben beziehen sich auf das Frischgewicht. Wir grillen über Lavasteinen, ganz nach Ihrem Wunsch: englisch, medium oder durch. Dazu Knoblauchbrot und hausgemachte Kräuterbutter.',
      foot: '* Ab Garstufe medium/durch erlauben wir uns, das Fleisch zu teilen (Butterfly).',
      groups: [
        { h: 'Steaks vom Lavasteingrill', items: [
          { n: 'Hüftsteak', d: 'zart und sehr mager', w: [['180 g*', 22.9], ['260 g*', 27.9]] },
          { n: 'Rib-Eye-Steak', d: 'schön durchzogen mit Fettkern · 500 g nur auf Vorbestellung', w: [['220 g', 29], ['320 g', 42], ['500 g', 63.9]] },
          { n: 'Rumpsteak', d: 'mit typischem Fettrand', w: [['180 g', 26], ['280 g', 39]] },
          { n: 'Filetsteak', d: 'sehr zart, nahezu fettfrei', w: [['160 g*', 33.5]] },
          { n: 'American Tenderloin', d: 'das beste Stück aus der Mitte des Rinderfilets, hoch geschnitten und gegrillt', w: [['220 g*', 46], ['300 g*', 63]] },
          { n: 'Azsteakas Prime Beef', d: 'nach Verfügbarkeit – der ultimative Steakgenuss, eine sorgfältige Auswahl finden Sie in unserem Reifeschrank', ptext: 'Tagespreis' },
          { n: 'Original Surf & Turf', d: 'vom Azsteakas Tenderloin 300 g*, 1 ganze Wildgamba, Sauce Bernaise, buntes Grillgemüse und Kartoffelgratin', p: 79 }
        ] }
      ]
    },
    {
      id: 'mehr', tab: 'Burger & mehr', title: 'Burger & Co., Pfanne und Grill',
      photos: [['burger', 'New York Burger mit Süßkartoffel-Sticks'], ['mixed-grill', 'Mixed Grill mit Ofenkartoffel und Sour-Cream']],
      groups: [
        { h: 'Burger & Co.', note: 'Patties vom täglich frisch gewolften reinen Black-Angus-Rind, medium-durch gegrillt, im Brioche-Brötchen. Dazu Pommes frites.', items: [
          { n: 'Hamburger', d: 'Salatblätter, Salatgurke, hausgemachte Burgersauce', p: 16.9 },
          { n: 'Cheeseburger', d: 'Cheddarcheese, Salatblätter, Salatgurke, hausgemachte Burgersauce', p: 17.9 },
          { n: 'New York Burger', d: 'Blue Cheese, Bacon, Salatblätter, Salatgurke, hausgemachte Burgersauce', p: 18.9 },
          { n: 'Spezialburger', d: 'gebratene Champignons, Cheddarcheese, Bacon, Salatblätter, Salatgurke, Burgersauce', p: 18.9 }
        ] },
        { h: '… und mehr', items: [
          { n: 'Putensteak „low carb“', d: 'fettfrei und kalorienarm, dazu buntes Grillgemüse · 200 g', p: 19.9 },
          { n: 'Rinderfiletspitzen', d: 'Cognac-Pfefferrahmsauce mit grünem Madagaskar-Pfeffer, Kartoffelecken mit Sour-Cream', p: 28.7 },
          { n: 'Zwiebelrostbraten „Deluxe“', d: '180 g Black Angus Hüftsteak vom Lavasteingrill, Röstzwiebeln, Butterspätzle, unsere legendäre Portwein-Thymian-Sauce', p: 32 },
          { n: 'Mixed Grill', d: 'Rinder-, Puten- und Lamm-Medaillons vom Lavagrill, Kräuterbutter und Ofenkartoffel mit Sour-Cream', p: 26.9 },
          { n: 'Feines vom Lamm', d: 'Medaillons aus der Lammhüfte, grüne Bohnen und Kräuterbutter', p: 29.7 },
          { n: '„Bengalische Feuerpfanne“', d: 'geschmorte Rinderstreifen in original bengalischer Sauce, dazu Basmatireis', p: 19.3, t: ['scharf'] },
          { n: 'Surf & Turf', d: 'Rinderfilet ca. 160 g, 3 King Prawns, Grillgemüse, Kartoffelgratin, Sauce Bernaise', p: 55 }
        ] }
      ]
    },
    {
      id: 'wasser', tab: 'Aus dem Wasser', title: 'Scampi, Lachs & Co.',
      groups: [
        { h: 'Aus dem Wasser', items: [
          { n: 'Garnelenpfännchen', d: 'vorweg · Garnele, Champignons, Kirschtomate, Knoblauchöl, Chili, Knoblauchbrot', p: 18.7 },
          { n: 'Salat Surf & Turf', d: 'Medaillons von Pute und Rind, gegrillte Riesengarnele', p: 22 },
          { n: 'Salat Scampi', d: 'gegrillte King Prawns', p: 22.8 },
          { n: '„Scampi Nature“', d: 'King Prawns gebraten, Grillgemüse, Aioli, Cocktailsauce, Knoblauchbrot', p: 26.8 },
          { n: 'Surf & Turf', d: 'Rinderfilet ca. 160 g, 3 King Prawns, Grillgemüse, Kartoffelgratin, Sauce Bernaise', p: 55 },
          { n: 'Lachsfilet vom Grill', d: 'Basmatireis, Tomaten-Basilikum-Sauce', p: 29 }
        ] }
      ]
    },
    {
      id: 'veggie', tab: 'Vegetarisch & vegan', title: 'Vegetarisch & vegan',
      groups: [
        { h: 'Specials', items: [
          { n: 'Veggie Italy-Burger', d: 'Gemüsepatty, Cheddarcheese, Basilikumpesto, Salat, Salatgurke · mit Salt & Vinegar Chips', p: 15.5, t: ['veg'] },
          { n: 'Veggie Champignons', d: 'gebraten in Olivenöl und Knoblauch, Basmatireis mit Tomatensauce, Grillgemüse, Beilagensalat mit veganer Vinaigrette', p: 18.9, t: ['vegan'] },
          { n: 'Veggie Ofenkartoffel', d: 'Sauerrahm, Grillgemüse, Beilagensalat mit veganer Vinaigrette', p: 16.5, t: ['veg'] },
          { n: 'Veganer Mix', d: 'Grillgemüse und Basmatireis mit Curry-Chili-Sauce', p: 17.2, t: ['vegan'] },
          { n: 'Fitness Bowl', d: 'Basmatireis, Kichererbsen, Edamame, Mango, Rucola, vegane Nuggets „Hähnchen Art“, Soja-Dressing, schwarzer Sesam', p: 19.8, t: ['vegan'] },
          { n: 'Salat Falafel', d: 'große Portion gemischter Salate mit Falafel-Bällchen und veganer Vinaigrette', p: 17.9, t: ['vegan'] },
          { n: '2 Gemüse-Rösti', d: 'an knackigem Salatbouquet mit Sweet-Chili-Sauce', p: 16.3, t: ['vegan'] }
        ] },
        { h: 'Vorweg & Suppen', items: [
          { n: 'Salat vom Buffet', d: 'als Vorspeise 9,90 · als Hauptgericht 16,00 – soviel und sooft Sie mögen', ptext: 'ab 9,90', t: ['veg'] },
          { n: 'Maiskolben', d: 'vom Grill, Kräuterbutter', p: 6.5, t: ['veg'] },
          { n: 'Grüne Oliven', d: 'Knoblauchbrot, Aioli', p: 9.5, t: ['veg'] },
          { n: 'Süßkartoffel-Sticks', d: 'mit Sour-Cream', p: 6.9, t: ['veg'] },
          { n: 'Falafel Bällchen', d: 'mit Sweet Chili Dip', p: 9.8, t: ['vegan'] },
          { n: 'Pikante Tomatensuppe', d: 'aus frischen Tomaten, Parmesanspäne', p: 8.6, t: ['veg', 'scharf'] },
          { n: 'Kartoffel-Trüffel-Suppe', d: 'mit Kartoffeln aus regionalem Anbau', p: 9.7, t: ['veg'] },
          { n: 'Salat Ziegenkäse', d: 'gebratener Ziegenkäse mit Honig und Thymian', p: 19.5, t: ['veg'] }
        ] }
      ]
    },
    {
      id: 'kids', tab: 'Kids', title: 'Leckeres für Kids',
      photos: [['kinderstuhl', 'Hochstühle stehen bereit']],
      intro: 'Für Gäste bis 12 Jahre.',
      groups: [
        { h: 'Kids', items: [
          { n: 'Pommes', d: 'Ketchup, Mayo', p: 5, t: ['veg'] },
          { n: 'Chicken Nuggets', d: 'Knuspernuggets, Pommes, Ketchup, Mayo', p: 9.9 },
          { n: 'Kinderburger', d: 'Burgerpatty, Salat, Salatgurke, Burgersauce, Pommes', p: 9.8 },
          { n: 'Kindercheeseburger', d: 'Burgerpatty, Salat, Salatgurke, Cheddarcheese, Burgersauce, Pommes', p: 10.9 },
          { n: 'Knusperschnitzel', d: 'gebackenes Hähnchenschnitzel, Pommes, Ketchup, Mayo', p: 9.9 }
        ] }
      ]
    },
    {
      id: 'beilagen', tab: 'Beilagen & Saucen', title: 'Beilagen, Gemüse & Saucen',
      groups: [
        { h: 'Beilagen', items: [
          { n: 'Ofenkartoffel', d: 'mit Sour-Cream', p: 6.5, t: ['veg'] },
          { n: 'Kartoffelecken', d: 'knusprig gebacken, mit Sour-Cream', p: 6.9, t: ['veg'] },
          { n: 'Kartoffelgratin', d: 'hausgemacht', p: 6.9, t: ['veg'] },
          { n: 'Süßkartoffel-Sticks', d: 'mit Sour-Cream', p: 6.9, t: ['veg'] },
          { n: 'Bratkartoffeln', d: 'mit Zwiebeln', p: 6.9, t: ['veg'] },
          { n: 'Pommes frites', d: '', p: 5, t: ['veg'] },
          { n: 'Basmatireis', d: '', p: 4.5, t: ['vegan'] },
          { n: 'Knoblauchbrot', d: '', p: 2.5, t: ['veg'] },
          { n: 'Kleiner Beilagensalat', d: '', p: 6.9, t: ['veg'] },
          { n: 'Falafel Bällchen', d: 'mit Sweet Chili Dip', p: 9.8, t: ['vegan'] },
          { n: '2 King Prawns', d: 'mit Aioli', p: 10.5 }
        ] },
        { h: 'Gemüse & Saucen', items: [
          { n: 'Buntes Pfannengemüse', d: '', p: 6.9, t: ['vegan'] },
          { n: 'Champignons', d: 'gebraten in Olivenöl und Knoblauch', p: 8.1, t: ['vegan'] },
          { n: 'Grüne Bohnen', d: '', p: 6.5, t: ['veg'] },
          { n: 'Maiskolben', d: 'mit Kräuterbutter', p: 6.5, t: ['veg'] },
          { n: 'Cognac-Pfefferrahmsauce', d: 'grüner Madagaskar-Pfeffer', p: 5 },
          { n: 'Portwein-Thymian-Sauce', d: '', p: 5 },
          { n: 'Sauce Bernaise', d: '', p: 3.8, t: ['veg'] },
          { n: 'Aioli', d: 'hausgemachte Knoblauchcreme', p: 3.3, t: ['veg'] }
        ] }
      ]
    },
    {
      id: 'desserts', tab: 'Desserts', title: 'Danach',
      photos: [['dessert', 'Eis, Sahne und Schokolade – zum Abschluss']],
      groups: [
        { h: 'Desserts', items: [
          { n: 'Crème brûlée', d: 'Tonkabohne, heiße Himbeeren', p: 11.2, t: ['veg'] },
          { n: 'Dunkle Schokoladenmousse', d: 'mit Jack Daniel’s Old No. 7 Whiskey', p: 11.2, t: ['veg'] },
          { n: 'White Manhattan', d: 'weiße Schokolade, Passionsfrucht, Crumble', p: 11, t: ['veg'] },
          { n: 'Hot Love', d: '3 Kugeln Vanilleeis, Sahne, heiße Himbeeren', p: 7.8, t: ['veg'] },
          { n: 'Profiteroles', d: '3 Windbeutel, von dunkler und weißer Schokolade umhüllt, Sahne', p: 10.1, t: ['veg'] },
          { n: 'New York Cheesecake', d: 'Erdbeersauce, Sahne', p: 8.4, t: ['veg'] },
          { n: '1 Kugel Eis', d: 'Vanille, Schokolade, Erdbeere oder Cassis', p: 1.5, t: ['veg'] }
        ] }
      ]
    }
  ]
};
