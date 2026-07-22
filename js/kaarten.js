const kaartData = [
  {
    id: 1,
    naam: "Nothing was lost if Jesus was gained",
    categorie: "bemoediging",
    beschrijving: "Een bemoedigende kaart met handlettering op een felrode achtergrond. Met een gelijnde achterkant om zelf een persoonlijk berichtje te schrijven.",
    imgVoor: "img/kaart-1-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 2,
    verborgen: true,
    naam: "Happy birthday",
    categorie: "verjaardag",
    beschrijving: "Een vrolijke verjaardagskaart met kleurrijke letters en een slingerillustratie op bordeauxrode achtergrond. Met gelijnde achterkant.",
    imgVoor: "img/kaart-2-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 3,
    naam: "There's joy in the house of our Lord",
    categorie: "bemoediging",
    beschrijving: "Een speelse kaart met kleurrijke handlettering op felroze achtergrond. Met gelijnde achterkant om zelf iets bij te schrijven.",
    imgVoor: "img/kaart-3-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 4,
    naam: "I will dwell in the house of the Lord forever",
    categorie: "bemoediging",
    beschrijving: "Een stijlvolle kaart met Psalm 23 op een vrolijk gestreepte achtergrond in roze en groen. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-4-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 5,
    verborgen: true,
    naam: "Het verloren schaap",
    categorie: "bemoediging",
    beschrijving: "Een lieve kaart met een schaapje, gebaseerd op de gelijkenis van het verloren schaap. Met hot pink rand en gelijnde achterkant.",
    imgVoor: "img/kaart-5-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 6,
    naam: "If God is for us, who can be against us?",
    categorie: "bemoediging",
    beschrijving: "Een bemoedigende kaart met handlettering en een sierlijk kader op felroze achtergrond. Gebaseerd op Romeinen 8:31. Met een koraalrode gelijnde achterkant om zelf een persoonlijk berichtje te schrijven.",
    imgVoor: "img/kaart-6-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 7,
    verborgen: true,
    naam: "I love you so much",
    categorie: "liefde",
    beschrijving: "Een lieve kaart met een gele envelop, handgeschreven 'I love you so much' en blauwe bloemen op een felrode achtergrond. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-7-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 8,
    verborgen: true,
    naam: "Koelkast",
    categorie: "zomaar",
    beschrijving: "Een vrolijke kaart met een groene retro koelkast met gele en rode post-its op een felrode achtergrond. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-8-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 9,
    verborgen: true,
    naam: "Kandelaar",
    categorie: "zomaar",
    beschrijving: "Een elegante kaart met een roze kandelaar met drie brandende kaarsen op een zachte gele achtergrond. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-9-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 10,
    naam: "Grachtenpand",
    categorie: "zomaar",
    beschrijving: "Een stijlvolle kaart met een gouden lijntekening van een grachtenpand op een felrode achtergrond. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-10-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 11,
    naam: "Mumderful",
    categorie: "moeder",
    beschrijving: "Een vrolijke kaart voor een bijzondere moeder. 'Mumderful' in een sierlijk roze kader op een rood-roze gestreepte achtergrond. Met felrode gelijnde achterkant.",
    imgVoor: "img/kaart-11-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 12,
    naam: "Bloemenpracht",
    categorie: "zomaar",
    beschrijving: "Een vrolijke kaart met een dicht blauw bloemenpatroon over de hele kaart op een felrode achtergrond. Met felrode gelijnde achterkant.",
    imgVoor: "img/kaart-12-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 13,
    naam: "True rest is found in the Lord",
    categorie: "bemoediging",
    beschrijving: "Een rustgevende kaart met handlettering en een schommelstoel illustratie op bordeauxrode achtergrond. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-13-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 14,
    verborgen: true,
    naam: "Be living proof of a living God",
    categorie: "bemoediging",
    beschrijving: "Een krachtige kaart met roze handlettering op een donkere bordeauxrode achtergrond. Met bordeauxrode gelijnde achterkant.",
    imgVoor: "img/kaart-14-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 15,
    verborgen: true,
    naam: "My fav place is anywhere with you",
    categorie: "liefde",
    beschrijving: "Een romantische kaart met roze handlettering in een groot hart op een donkerblauwe achtergrond. Met bordeauxpaarse gelijnde achterkant.",
    imgVoor: "img/kaart-15-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 16,
    verborgen: true,
    naam: "Mini-kaartjesset: Sit with Jesus",
    categorie: "bemoediging",
    beschrijving: "Een set van 4 mini-kaartjes, elk een kwart van een normaal kaartformaat (5,85 x 9,1 cm). De set bevat: 'Sit with Jesus', 'And if not, He is still good', 'You, Lord, are a shield around me (Psalm 3:3)' en 'Jesus first'. Je ontvangt 4 losse mini-kaartjes, al uitgeknipt en klaar om te versturen.",
    imgVoor: "img/kaart-16-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    isMiniSet: true,
    aantalInSet: 4,
    formaat: "5,85 x 9,1 cm per kaartje"
  },
  {
    id: 17,
    naam: "He can do a lot with a little",
    categorie: "bemoediging",
    beschrijving: "Een bemoedigende kaart met rode handlettering en een illustratie van een schaal met brood en vis op een zachte gele achtergrond.",
    imgVoor: "img/kaart-17-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 18,
    naam: "I will climb this mountain with my eyes fixed only on You",
    categorie: "bemoediging",
    beschrijving: "Een bemoedigende kaart met fijne handlettering in rosegoud op een diep donkerbruine achtergrond. Voor iemand die voor een zware opgave staat. Met gelijnde achterkant om zelf een berichtje te schrijven.",
    imgVoor: "img/kaart-18-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 19,
    naam: "Vul dit huis met Uw glorie",
    categorie: "zomaar",
    beschrijving: "Een warme kaart met bruin krulschrift op koraalrood. Mooi als kaart bij een verhuizing, een nieuwe woning of een housewarming. Met gelijnde achterkant.",
    imgVoor: "img/kaart-19-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 21,
    verborgen: true,
    naam: "Here I am Lord, send me",
    categorie: "bemoediging",
    beschrijving: "Een kaart met roze handlettering en de omtrek van Zuid-Afrika op olijfbruin. Gemaakt voor wie op zending gaat of een nieuwe roeping volgt. Met gelijnde achterkant.",
    imgVoor: "img/kaart-21-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 22,
    naam: "Everything I have I owe to God",
    categorie: "bemoediging",
    beschrijving: "Een kaart met een patroon van zes roze sierkruisen op donkerbruin, met de tekst onderaan. Een stille kaart over dankbaarheid. Met gelijnde achterkant.",
    imgVoor: "img/kaart-22-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 23,
    verborgen: true,
    naam: "Hineni",
    categorie: "bemoediging",
    beschrijving: "Het Hebreeuwse woord voor 'hier ben ik' uit Genesis 22, in groot roze schrift op bijna zwart groen. Over beschikbaar zijn voor God. Met gelijnde achterkant.",
    imgVoor: "img/kaart-23-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 24,
    naam: "Hoogbouw",
    categorie: "zomaar",
    beschrijving: "Een strakke kaart met een witte lijntekening van een torenflat op diepgroen. Zonder tekst, dus je kunt hem voor elke gelegenheid gebruiken. Met gelijnde achterkant.",
    imgVoor: "img/kaart-24-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 25,
    naam: "Heer, wijs mij Uw weg",
    categorie: "bemoediging",
    beschrijving: "Dun koperkleurig schrift op donkerblauw. Een ingetogen kaart voor iemand die voor een keuze staat, bijvoorbeeld bij een studiekeuze of een nieuwe stap. Met gelijnde achterkant.",
    imgVoor: "img/kaart-25-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 26,
    naam: "U bent met al mijn wegen vertrouwd",
    categorie: "bemoediging",
    beschrijving: "Psalm 139 in roze kwastschrift op olijfbruin. Een kaart die troost geeft aan iemand die het even niet meer weet. Met gelijnde achterkant.",
    imgVoor: "img/kaart-26-voor.png",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 27,
    naam: "Bloemenpatroon",
    categorie: "zomaar",
    beschrijving: "Een vrolijke kaart met een doorlopend blauw bloemenpatroon op karmijnrood. Zonder tekst, dus geschikt voor elk moment. Met gelijnde achterkant.",
    imgVoor: "img/kaart-27-voor.jpg",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 28,
    naam: "Stadsgezicht",
    categorie: "zomaar",
    beschrijving: "Een grafische kaart met een witte lijntekening van kantoorgebouwen op diepgroen. Zonder tekst. Met gelijnde achterkant.",
    imgVoor: "img/kaart-28-voor.jpg",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  },
  {
    id: 31,
    naam: "Rotterdam",
    categorie: "zomaar",
    beschrijving: "Een zwart-wit foto van de Rotterdamse kop van Zuid met een roze ingekleurde watertaxi op de Maas. Met gelijnde achterkant.",
    imgVoor: "img/kaart-31-voor.jpg",
    imgAchter: "img/achterkant.png",
    prijs: 2.50,
    gepersonaliseerd: false,
    formaat: "10,5 x 14,8 cm (A6)"
  }
];

/*
  KAART TOEVOEGEN:
  1. Zet de voorkant in img/ als kaart-N-voor.png (of .jpg)
  2. Kopieer een object hierboven en pas id, naam, categorie, beschrijving en imgVoor aan.
     imgAchter is voor alle kaarten hetzelfde gedeelde vel: img/achterkant.png
  3. prijs is altijd 2.50, tenzij het een gepersonaliseerde kaart is (dan 6.00)
  4. De kaart verschijnt automatisch op kaarten.html en is klikbaar naar kaart-detail.html?id=N
  5. Zet verborgen: true om een kaart tijdelijk uit de winkel te halen zonder hem te verwijderen

  LET OP bij de nieuwe kaarten van juli 2026:
  - De ids 20, 29 en 30 zijn bewust overgeslagen. De bijbehorende afbeeldingen in img/
    zijn opnieuw ingescande versies van kaarten die al bestonden als id 17, 13 en 3.
    Ze zijn niet als los product toegevoegd om dubbele listings te voorkomen.
  - Kaart 27, 28 en 31 hebben een .jpg voorkant in plaats van .png. Als PNG bleven ze
    boven de 300kb. De achterkanten zijn wel .png.
  - Kaart 31 (Rotterdam) staat sinds juli 2026 op zichtbaar: wordt verkocht. Let op: er
    staat een logo van vastgoedbedrijf DHG op de stadsfoto; op verzoek toch opgenomen.
*/
