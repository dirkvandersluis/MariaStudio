const kaartData = [
  {
    id: 1,
    naam: "Nothing was lost if Jesus was gained",
    categorie: "bemoediging",
    beschrijving: "Een bemoedigende kaart met handlettering op een felrode achtergrond. Met een gelijnde achterkant om zelf een persoonlijk berichtje te schrijven.",
    imgVoor: "img/kaart-1-voor.png",
    imgAchter: "img/kaart-1-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 2,
    naam: "Happy birthday",
    categorie: "verjaardag",
    beschrijving: "Een vrolijke verjaardagskaart met kleurrijke letters en een slingerillustratie op bordeauxrode achtergrond. Met gelijnde achterkant.",
    imgVoor: "img/kaart-2-voor.png",
    imgAchter: "img/kaart-2-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 3,
    naam: "There's joy in the house of our Lord",
    categorie: "bemoediging",
    beschrijving: "Een speelse kaart met kleurrijke handlettering op felroze achtergrond. Met gelijnde achterkant om zelf iets bij te schrijven.",
    imgVoor: "img/kaart-3-voor.png",
    imgAchter: "img/kaart-3-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 4,
    naam: "I will dwell in the house of the Lord forever",
    categorie: "bemoediging",
    beschrijving: "Een stijlvolle kaart met Psalm 23 op een vrolijk gestreepte achtergrond in roze en groen. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-4-voor.png",
    imgAchter: "img/kaart-4-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 5,
    naam: "Het verloren schaap",
    categorie: "bemoediging",
    beschrijving: "Een lieve kaart met een schaapje, gebaseerd op de gelijkenis van het verloren schaap. Met hot pink rand en gelijnde achterkant.",
    imgVoor: "img/kaart-5-voor.png",
    imgAchter: "img/kaart-5-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 6,
    naam: "If God is for us, who can be against us?",
    categorie: "bemoediging",
    beschrijving: "Een bemoedigende kaart met handlettering en een sierlijk kader op felroze achtergrond. Gebaseerd op Romeinen 8:31. Met een koraalrode gelijnde achterkant om zelf een persoonlijk berichtje te schrijven.",
    imgVoor: "img/kaart-6-voor.png",
    imgAchter: "img/kaart-6-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 7,
    naam: "I love you so much",
    categorie: "liefde",
    beschrijving: "Een lieve kaart met een gele envelop, handgeschreven 'I love you so much' en blauwe bloemen op een felrode achtergrond. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-7-voor.png",
    imgAchter: "img/kaart-7-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 8,
    naam: "Koelkast",
    categorie: "zomaar",
    beschrijving: "Een vrolijke kaart met een groene retro koelkast met gele en rode post-its op een felrode achtergrond. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-8-voor.png",
    imgAchter: "img/kaart-8-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 9,
    naam: "Kandelaar",
    categorie: "zomaar",
    beschrijving: "Een elegante kaart met een roze kandelaar met drie brandende kaarsen op een zachte gele achtergrond. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-9-voor.png",
    imgAchter: "img/kaart-9-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 10,
    naam: "Grachtenpand",
    categorie: "zomaar",
    beschrijving: "Een stijlvolle kaart met een gouden lijntekening van een grachtenpand op een felrode achtergrond. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-10-voor.png",
    imgAchter: "img/kaart-10-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 11,
    naam: "Mumderful",
    categorie: "moeder",
    beschrijving: "Een vrolijke kaart voor een bijzondere moeder. 'Mumderful' in een sierlijk roze kader op een rood-roze gestreepte achtergrond. Met felrode gelijnde achterkant.",
    imgVoor: "img/kaart-11-voor.png",
    imgAchter: "img/kaart-11-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 12,
    naam: "Bloemenpracht",
    categorie: "zomaar",
    beschrijving: "Een vrolijke kaart met een dicht blauw bloemenpatroon over de hele kaart op een felrode achtergrond. Met felrode gelijnde achterkant.",
    imgVoor: "img/kaart-12-voor.png",
    imgAchter: "img/kaart-12-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 13,
    naam: "True rest is found in the Lord",
    categorie: "bemoediging",
    beschrijving: "Een rustgevende kaart met handlettering en een schommelstoel illustratie op bordeauxrode achtergrond. Met lichtroze gelijnde achterkant.",
    imgVoor: "img/kaart-13-voor.png",
    imgAchter: "img/kaart-13-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 14,
    naam: "Be living proof of a living God",
    categorie: "bemoediging",
    beschrijving: "Een krachtige kaart met roze handlettering op een donkere bordeauxrode achtergrond. Met bordeauxrode gelijnde achterkant.",
    imgVoor: "img/kaart-14-voor.png",
    imgAchter: "img/kaart-14-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 15,
    naam: "My fav place is anywhere with you",
    categorie: "liefde",
    beschrijving: "Een romantische kaart met roze handlettering in een groot hart op een donkerblauwe achtergrond. Met bordeauxpaarse gelijnde achterkant.",
    imgVoor: "img/kaart-15-voor.png",
    imgAchter: "img/kaart-15-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  },
  {
    id: 16,
    naam: "Mini-kaartjesset: Sit with Jesus",
    categorie: "bemoediging",
    beschrijving: "Een set van 4 mini-kaartjes, elk een kwart van een normaal kaartformaat (5,85 x 9,1 cm). De set bevat: 'Sit with Jesus', 'And if not, He is still good', 'You, Lord, are a shield around me (Psalm 3:3)' en 'Jesus first'. Je ontvangt 4 losse mini-kaartjes, al uitgeknipt en klaar om te versturen.",
    imgVoor: "img/kaart-16-voor.png",
    imgAchter: "img/kaart-16-achter.png",
    prijs: 4.00,
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
    imgAchter: "img/kaart-17-achter.png",
    prijs: 4.00,
    gepersonaliseerd: false,
    formaat: "11,7 x 18,2 cm"
  }
];

/*
  KAART TOEVOEGEN:
  1. Zet de foto's in img/ als kaart-7-voor.png en kaart-7-achter.png
  2. Kopieer een object hierboven en pas id, naam, categorie, beschrijving en imgVoor/imgAchter aan
  3. prijs is altijd 4.00, tenzij het een gepersonaliseerde kaart is (dan 6.00)
  4. De kaart verschijnt automatisch op kaarten.html en is klikbaar naar kaart-detail.html?id=7
*/
