/* ============================================================
   VERZENDKOSTEN
   Pas hier de bedragen aan, de rest van de site rekent hiermee.
   Tarieven PostNL, stand juli 2026.
   ============================================================ */
const VERZENDING = {
  GRATIS_VANAF:        40.00,  // vanaf dit orderbedrag is verzenden gratis
  BRIEFPOST:            2.80,  // 1 tot en met 4 kaarten, gewone briefpost
  BRIEVENBUSPAKJE:      4.39,  // 5 kaarten of meer, brievenbuspakje
  KAARTEN_VOOR_PAKJE:      5   // vanaf dit aantal kaarten geldt het brievenbuspakje
};

/**
 * Verzendkosten voor een order.
 * @param {number} aantalKaarten  totaal aantal kaarten in het mandje
 * @param {number} subtotaal      orderbedrag zonder verzendkosten
 * @returns {number} verzendkosten in euro
 */
function berekenVerzending(aantalKaarten, subtotaal) {
  if (aantalKaarten <= 0) return 0;
  if (subtotaal >= VERZENDING.GRATIS_VANAF) return 0;
  return aantalKaarten >= VERZENDING.KAARTEN_VOOR_PAKJE
    ? VERZENDING.BRIEVENBUSPAKJE
    : VERZENDING.BRIEFPOST;
}

/** Bedrag dat nog nodig is voor gratis verzending, 0 als de drempel al gehaald is. */
function totGratisVerzending(subtotaal) {
  return Math.max(0, VERZENDING.GRATIS_VANAF - subtotaal);
}

/* ============================================================
   BUNDELS
   losseKaartPrijs is 2,50. In een bundel kost een kaart nooit
   minder dan 2,00, dat is de ondergrens die Rosalie hanteert.
   ============================================================ */
const LOSSE_KAART_PRIJS = 2.50;
const MIN_KAART_PRIJS_IN_BUNDEL = 2.00;

const bundelData = [
  {
    id: 'set-bemoediging',
    type: 'vast',
    naam: 'Themaset Bemoediging',
    ondertitel: 'Vijf kaarten om iemand een hart onder de riem te steken',
    beschrijving: 'Vijf kaarten met een bemoedigende tekst, uitgezocht om te geven aan iemand die het even zwaar heeft of die je wilt laten weten dat je aan hem of haar denkt.',
    aantalKaarten: 5,
    prijs: 11.00,
    kaartIds: [6, 1, 3, 17, 26]
  },
  {
    id: 'set-sterkte',
    type: 'vast',
    naam: 'Themaset Sterkte',
    ondertitel: 'Vijf kaarten voor moeilijke tijden',
    beschrijving: 'Vijf ingetogen kaarten voor bij ziekte, verlies of een periode waarin het tegenzit. Rustige kleuren en teksten die troost geven zonder overdreven vrolijk te doen.',
    aantalKaarten: 5,
    prijs: 11.00,
    kaartIds: [18, 13, 25, 14, 5]
  },
  {
    id: 'set-zomaar',
    type: 'vast',
    naam: 'Themaset Zomaar',
    ondertitel: 'Vijf kaarten zonder tekst, voor elk moment',
    beschrijving: 'Vijf kaarten met alleen een illustratie en geen vaste boodschap. Handig om achter de hand te hebben, want je kunt ze voor elke gelegenheid gebruiken.',
    aantalKaarten: 5,
    prijs: 11.00,
    kaartIds: [8, 9, 10, 12, 24]
  },
  {
    id: 'mix-10',
    type: 'kies',
    naam: 'Kies zelf 10 kaarten',
    ondertitel: 'Stel je eigen set samen',
    beschrijving: 'Kies tien kaarten uit de hele collectie en stel je eigen set samen. Handig als je een voorraadje wilt aanleggen met precies de kaarten die bij jou passen.',
    aantalKaarten: 10,
    prijs: 21.00
  },
  {
    id: 'variety-15',
    type: 'kies',
    naam: 'Variety box',
    ondertitel: 'Vijftien kaarten voor elke gelegenheid',
    beschrijving: 'Vijftien kaarten door de hele collectie heen, zodat je voor elke gelegenheid iets in huis hebt. De voordeligste manier om kaarten te kopen.',
    aantalKaarten: 15,
    prijs: 30.00,
    voorstelIds: [2, 7, 15, 11, 8, 9, 10, 12, 24, 1, 6, 18, 23, 26, 13]
  }
];

/** Wat de kaarten los bij elkaar zouden kosten. */
function losseSom(bundel) {
  return bundel.aantalKaarten * LOSSE_KAART_PRIJS;
}

/** Kortingspercentage, afgerond op hele procenten. */
function bundelKorting(bundel) {
  return Math.round((1 - bundel.prijs / losseSom(bundel)) * 100);
}

/** Prijs per kaart binnen de bundel. */
function prijsPerKaart(bundel) {
  return bundel.prijs / bundel.aantalKaarten;
}

/** Zoekt een bundel op id. */
function vindBundel(id) {
  return bundelData.find(b => b.id === id);
}

/* Controle bij het laden: waarschuw in de console als een bundel onder de
   ondergrens van 2,00 per kaart zakt of naar een kaart verwijst die niet bestaat. */
(function controleerBundels() {
  if (typeof kaartData === 'undefined') return;
  bundelData.forEach(b => {
    if (prijsPerKaart(b) < MIN_KAART_PRIJS_IN_BUNDEL) {
      console.warn(`Bundel "${b.naam}" komt op ${prijsPerKaart(b).toFixed(2)} per kaart, onder de ondergrens van ${MIN_KAART_PRIJS_IN_BUNDEL.toFixed(2)}.`);
    }
    (b.kaartIds || b.voorstelIds || []).forEach(id => {
      if (!kaartData.find(k => k.id === id)) {
        console.warn(`Bundel "${b.naam}" verwijst naar kaart ${id} die niet bestaat.`);
      }
    });
    if (b.kaartIds && b.kaartIds.length !== b.aantalKaarten) {
      console.warn(`Bundel "${b.naam}" heeft ${b.kaartIds.length} kaarten maar zegt ${b.aantalKaarten}.`);
    }
  });
})();

/*
  BUNDEL TOEVOEGEN OF AANPASSEN:
  1. type 'vast' betekent een vaste selectie, vul kaartIds met de juiste ids
  2. type 'kies' betekent dat de klant zelf kiest, vul alleen aantalKaarten
  3. De doorgestreepte prijs en het bespaarpercentage worden automatisch berekend
  4. Houd prijs / aantalKaarten op minimaal 2,00, anders verschijnt er een waarschuwing
     in de console
*/
