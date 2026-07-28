const INSTAGRAM_HANDLE = 'by.rosaliemaria';
const INSTAGRAM_URL    = 'https://www.instagram.com/' + INSTAGRAM_HANDLE;
// Fill in Rosalie's WhatsApp number (with country code, no +, no spaces) to enable the WhatsApp button.
// Example: const WHATSAPP_NUMMER = '31612345678';
// Leave empty string to hide the WhatsApp option.
const WHATSAPP_NUMMER = '31641608254';
const MAIL_ADRES      = 'vandersluisrosalie@outlook.com';

/* ============================================================
   SITE
   ============================================================ */
const SITE = {
  URL:  'https://maria-studio.nl',
  NAAM: 'Maria Studio'
};

/* ============================================================
   PRIJZEN
   Single source of truth voor kaartprijzen. Wijzig hier, de rest
   van de site rekent en toont hiermee via formatEuro()/data-cfg.
   ============================================================ */
const PRIJZEN = {
  LOS:              2.50,  // prijs van een losse kaart
  GEPERSONALISEERD: 6.00   // prijs van een gepersonaliseerde kaart
};

/* ============================================================
   VERZENDKOSTEN
   Pas hier de bedragen aan, de rest van de site rekent hiermee.
   Simpele regel, stand juli 2026: 1 kaart een tarief, 2 of meer
   kaarten een ander tarief. Daarboven geldt de gratis-drempel.
   ============================================================ */
const VERZENDING = {
  GRATIS_VANAF:      40.00,  // vanaf dit orderbedrag is verzenden gratis
  EEN_KAART:          1.70,  // verzendkosten bij precies 1 kaart
  MEERDERE_KAARTEN:   3.00   // verzendkosten bij 2 kaarten of meer
};

/** Ondergrens per kaart in een bundel, dat is de grens die Rosalie hanteert. */
const MIN_KAART_PRIJS_IN_BUNDEL = 2.00;

/* ============================================================
   PADEN
   Kaartpagina's staan op /kaarten/<slug>.html, een map dieper dan de
   rest van de site. Interne links en afbeeldingen die daar ook
   moeten werken, gebruiken deze prefix.
   ============================================================ */
const SITE_BASIS = (typeof window !== 'undefined' && /\/kaarten\/[^/]+\.html$/.test(window.location.pathname))
  ? '../'
  : '';

/* ============================================================
   CATEGORIE-LABELS
   Koppelt de categorie-key uit kaartData aan het zichtbare label
   op de filterbalk. Voeg hier een regel toe zodra een nieuwe
   categorie in kaartData verschijnt.
   ============================================================ */
const CATEGORIE_LABELS = {
  verjaardag:  'Verjaardag',
  bemoediging: 'Christelijk',
  liefde:      'Liefde',
  zomaar:      'Zomaar',
  moeder:      'Moeder'
};

/** Formateert een bedrag als euro volgens nl-NL, bijvoorbeeld 2.5 -> "€ 2,50". */
const euroFormatter = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
function formatEuro(n) {
  return euroFormatter.format(n);
}

/**
 * Vult elk element met [data-cfg] op DOMContentLoaded met een geformatteerd
 * bedrag. data-cfg is een pad naar een bestaande config-waarde, bijvoorbeeld
 * "PRIJZEN.LOS" of "VERZENDING.GRATIS_VANAF".
 *
 * Werkt alleen voor waardes die al bestaan op het moment dat de pagina klaar
 * is met laden. Content die pas daarna door JS wordt ingevoegd (kaartenraster,
 * mandje, bundels) gebruikt formatEuro() rechtstreeks in de eigen template,
 * omdat vulConfigSpans() dan al geweest is.
 */
function vulConfigSpans() {
  const roots = { PRIJZEN: PRIJZEN, VERZENDING: VERZENDING, MIN_KAART_PRIJS_IN_BUNDEL: MIN_KAART_PRIJS_IN_BUNDEL };
  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    const pad = el.dataset.cfg.split('.');
    let waarde = roots[pad[0]];
    for (let i = 1; i < pad.length; i++) {
      if (waarde == null) break;
      waarde = waarde[pad[i]];
    }
    if (typeof waarde === 'number') el.textContent = formatEuro(waarde);
  });
}
// typeof-guard zodat build.js dit bestand in Node kan evalueren (geen document daar).
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', vulConfigSpans);
}
