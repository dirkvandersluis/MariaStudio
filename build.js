/* ============================================================
   BUILD.JS
   Plain Node, geen dependencies. Genereert per kaart in kaartData
   een statische pagina op /kaarten/<slug>.html met echte title,
   meta description, og-tags en JSON-LD, zodat scrapers (die geen
   JS uitvoeren) per kaart een eigen preview en description zien
   in plaats van de generieke kaart-detail.html-inhoud.

   Draai met: node build.js
   Idempotent: opnieuw draaien geeft hetzelfde resultaat, en oude
   bestanden in /kaarten/ die niet meer bij een kaart horen worden
   verwijderd.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const KAARTEN_DIR = path.join(ROOT, 'kaarten');

/* ------------------------------------------------------------------
   DATA LADEN
   js/config.js en js/kaarten.js zijn gewone browser-scripts (geen
   modules), dus we lezen ze als tekst en evalueren ze samen met
   new Function, met een expliciete return van wat we nodig hebben.
   config.js is beveiligd met een typeof-guard rond het enige stukje
   dat "document" gebruikt, dus dat evalueert hier zonder fouten.
   ------------------------------------------------------------------ */
function laadData() {
  const configSrc  = fs.readFileSync(path.join(ROOT, 'js', 'config.js'), 'utf8');
  const kaartenSrc = fs.readFileSync(path.join(ROOT, 'js', 'kaarten.js'), 'utf8');

  const body = configSrc + '\n' + kaartenSrc + '\n' +
    'return { kaartData, VERZENDING, PRIJZEN, SITE, MIN_KAART_PRIJS_IN_BUNDEL, CATEGORIE_LABELS, formatEuro, voorraadBadgeHtml };';

  const fn = new Function(body);
  return fn();
}

/* ------------------------------------------------------------------
   HULPFUNCTIES
   ------------------------------------------------------------------ */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(s) {
  return s
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const PILL_KLASSEN = {
  verjaardag:  'pill-verjaardag',
  bemoediging: 'pill-bemoediging',
  liefde:      'pill-liefde',
  zomaar:      'pill-zomaar',
  moeder:      'pill-moeder'
};

/** Controleert dat elke kaart een geldige, unieke slug heeft. Gooit een fout bij problemen. */
function controleerSlugs(kaartData) {
  const gezien = new Map();
  kaartData.forEach(kaart => {
    if (!kaart.slug) {
      throw new Error(`Kaart ${kaart.id} ("${kaart.naam}") heeft geen slug.`);
    }
    const verwacht = slugify(kaart.naam);
    if (kaart.slug !== verwacht) {
      console.warn(`Let op: slug "${kaart.slug}" van kaart ${kaart.id} komt niet overeen met de afgeleide slug "${verwacht}" van naam "${kaart.naam}".`);
    }
    if (gezien.has(kaart.slug)) {
      throw new Error(`Dubbele slug "${kaart.slug}" voor kaarten ${gezien.get(kaart.slug)} en ${kaart.id}.`);
    }
    gezien.set(kaart.slug, kaart.id);
  });
}

/* ------------------------------------------------------------------
   PAGINA-TEMPLATE
   ------------------------------------------------------------------ */
function paginaHtml(kaart, data) {
  const { SITE, VERZENDING, MIN_KAART_PRIJS_IN_BUNDEL, formatEuro, voorraadBadgeHtml } = data;

  const naam        = escapeHtml(kaart.naam);
  const beschrijving = escapeHtml(kaart.beschrijving);
  const paginaUrl    = `${SITE.URL}/kaarten/${kaart.slug}.html`;
  const afbeeldingUrl = `${SITE.URL}/${kaart.imgVoor}`;
  const titel        = `${naam} | ${SITE.NAAM}`;

  const pillKlasse     = PILL_KLASSEN[kaart.categorie] || 'pill-bemoediging';
  const categorieLabel = kaart.categorie.charAt(0).toUpperCase() + kaart.categorie.slice(1);
  const uitverkocht    = kaart.voorraad === 0;

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: kaart.naam,
    image: afbeeldingUrl,
    description: kaart.beschrijving,
    offers: {
      '@type': 'Offer',
      price: kaart.prijs.toFixed(2),
      priceCurrency: 'EUR',
      availability: uitverkocht ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      url: paginaUrl
    }
  }).replace(/</g, '\\u003c');

  const miniSetBlok = kaart.isMiniSet ? `
        <div class="detail-miniset-info">
          Je ontvangt ${kaart.aantalInSet} losse mini-kaartjes, al uitgeknipt. Elk kaartje is 5,85 x 9,1 cm, een kwart van een normaal kaartformaat.
        </div>
      ` : '';

  const actiesBlok = uitverkocht
    ? '<p class="detail-uitverkocht">Tijdelijk uitverkocht</p>'
    : '<button class="btn-cart" id="btn-cart-detail">Voeg toe aan mandje</button>';

  const snelBlok = uitverkocht ? '' : `
              <button type="button" class="btn-snel" id="btn-snel-detail">Snel bestellen</button>`;

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titel}</title>
  <meta name="description" content="${beschrijving}">

  <meta property="og:title" content="${titel}">
  <meta property="og:description" content="${beschrijving}">
  <meta property="og:image" content="${afbeeldingUrl}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${paginaUrl}">
  <meta property="og:site_name" content="${escapeHtml(SITE.NAAM)}">
  <meta property="og:locale" content="nl_NL">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${titel}">
  <meta name="twitter:description" content="${beschrijving}">
  <meta name="twitter:image" content="${afbeeldingUrl}">
  <link rel="canonical" href="${paginaUrl}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/favicon.svg">

  <script type="application/ld+json">${jsonLd}</script>
</head>
<body class="blush-top">

  <a href="#main" class="skip-link">Ga naar inhoud</a>

  <!-- NAVIGATIE -->
  <nav class="site-nav" id="site-nav"></nav>

  <!-- KAART-DETAIL INHOUD (statisch gegenereerd door build.js) -->
  <div id="detail-inhoud">
    <section class="detail-section" id="main">
      <div class="detail-grid">

        <div class="detail-images">
          <img
            id="detail-hoofd-img"
            src="../${kaart.imgVoor}"
            alt="Voorkant: ${naam}"
            class="detail-main-img"
            loading="eager"
            fetchpriority="high"
            width="400" height="500"
          >

          <div class="detail-thumbnail-row">
            <div class="detail-thumb-wrap">
              <img
                src="../${kaart.imgVoor}"
                alt="Voorkant"
                class="detail-thumb actief"
                loading="lazy"
                width="160" height="200"
                data-src="../${kaart.imgVoor}"
                data-alt="Voorkant: ${naam}"
              >
              <span class="detail-thumb-label">Voorkant</span>
            </div>
            <div class="detail-thumb-wrap">
              <img
                src="../${kaart.imgAchter}"
                alt="Achterkant"
                class="detail-thumb"
                loading="lazy"
                width="160" height="200"
                data-src="../${kaart.imgAchter}"
                data-alt="Achterkant: ${naam}"
              >
              <span class="detail-thumb-label">Achterkant &mdash; beschrijfbaar</span>
            </div>
          </div>
        </div>

        <div class="detail-info">
          <p class="detail-breadcrumb"><a href="../kaarten.html">Kaarten</a> / ${naam}</p>

          <span class="detail-pill ${pillKlasse}">${categorieLabel}</span>
          <h1 class="detail-naam">${naam}</h1>

          <p class="detail-prijs-groot">${formatEuro(kaart.prijs)}</p>
          ${voorraadBadgeHtml(kaart)}
          <p class="detail-meta">Formaat: ${escapeHtml(kaart.formaat)}</p>
          <p class="detail-meta">Verzending: gratis vanaf ${formatEuro(VERZENDING.GRATIS_VANAF)}, daaronder ${formatEuro(VERZENDING.EEN_KAART)}</p>
          <p class="detail-meta"><a href="../bundels.html">Voordeliger in een bundel, vanaf ${formatEuro(MIN_KAART_PRIJS_IN_BUNDEL)} per kaart</a></p>

          <hr class="detail-divider">

          <p class="detail-beschrijving">${beschrijving}</p>
          ${miniSetBlok}

          <hr class="detail-divider">

          <div class="detail-actions">
            ${actiesBlok}
          </div>${snelBlok}
        </div>

      </div>
    </section>
  </div>

  <!-- FOOTER -->
  <footer class="site-footer" id="site-footer"></footer>

  <script src="../js/config.js" defer></script>
  <script src="../js/overlay.js" defer></script>
  <script src="../js/kaarten.js" defer></script>
  <script src="../js/bundels.js" defer></script>
  <script src="../js/instagram.js" defer></script>
  <script src="../js/mandje.js" defer></script>
  <script src="../js/components.js" defer></script>
  <script>
  (function () {
    document.addEventListener('DOMContentLoaded', function () {
      function openLightbox(src, alt) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Afbeelding vergroot');

        const sluitBtn = document.createElement('button');
        sluitBtn.className = 'lightbox-sluit';
        sluitBtn.setAttribute('aria-label', 'Sluiten');
        sluitBtn.textContent = '✕';
        sluitBtn.addEventListener('click', sluitOverlay);

        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', alt);

        overlay.appendChild(sluitBtn);
        overlay.appendChild(img);

        document.body.appendChild(overlay);
        openOverlay(overlay);
      }

      function wisselAfbeelding(src, alt, gekliktElement) {
        const hoofd = document.getElementById('detail-hoofd-img');
        hoofd.src = src;
        hoofd.alt = alt;
        document.querySelectorAll('.detail-thumb').forEach(t => t.classList.remove('actief'));
        gekliktElement.classList.add('actief');
      }

      const cartBtn = document.getElementById('btn-cart-detail');
      if (cartBtn) cartBtn.addEventListener('click', () => voegToeAanMandje(${JSON.stringify(kaart.id)}));

      const snelBtn = document.getElementById('btn-snel-detail');
      if (snelBtn) snelBtn.addEventListener('click', () => toonBestellingPopup(${JSON.stringify(kaart.naam)}, ${JSON.stringify(kaart.prijs)}, false));

      document.querySelectorAll('.detail-thumb').forEach(thumb => {
        thumb.addEventListener('click', function () {
          wisselAfbeelding(this.dataset.src, this.dataset.alt, this);
        });
      });

      const hoofdImg = document.getElementById('detail-hoofd-img');
      if (hoofdImg) hoofdImg.addEventListener('click', function () {
        openLightbox(this.src, this.alt);
      });

      document.querySelectorAll('.detail-main-img, .detail-thumb').forEach(img => {
        img.addEventListener('error', function () {
          this.style.display = 'none';
          if (this.closest('.detail-thumb-wrap')) {
            this.closest('.detail-thumb-wrap').style.display = 'none';
          }
        });
      });
    });
  })();
  </script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------
   SITEMAP
   ------------------------------------------------------------------ */
function sitemapXml(kaartData, SITE) {
  const vandaag = new Date().toISOString().slice(0, 10);

  const statischePaginas = [
    '',
    'kaarten.html',
    'bundels.html',
    'contact.html',
    'kaart-detail.html'
  ];

  const urls = [
    ...statischePaginas.map(p => `${SITE.URL}/${p}`),
    ...kaartData.map(k => `${SITE.URL}/kaarten/${k.slug}.html`)
  ];

  const items = urls.map(loc => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${vandaag}</lastmod>\n  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

/* ------------------------------------------------------------------
   _REDIRECTS
   Oude gedeelde links (kaart-detail.html?id=N) gaan naar de nieuwe
   slug-URL. Een id die niet meer bestaat valt terug op /kaarten.html
   in plaats van dood te lopen. Netlify verwerkt regels van boven naar
   beneden en gebruikt de eerste match, dus de specifieke id-regels
   moeten voor de algemene staan.
   ------------------------------------------------------------------ */
function redirectsBestand(kaartData) {
  const specifiek = kaartData
    .map(k => `/kaart-detail.html?id=${k.id}  /kaarten/${k.slug}.html  301`)
    .join('\n');
  const algemeen = '/kaart-detail.html?id=:id  /kaarten.html  301';
  return `${specifiek}\n${algemeen}\n`;
}

/* ------------------------------------------------------------------
   MAIN
   ------------------------------------------------------------------ */
function main() {
  const data = laadData();
  const { kaartData, SITE } = data;

  controleerSlugs(kaartData);

  if (!fs.existsSync(KAARTEN_DIR)) fs.mkdirSync(KAARTEN_DIR, { recursive: true });

  const verwachteBestanden = new Set(kaartData.map(k => `${k.slug}.html`));

  // Oude bestanden opruimen die niet meer bij een kaart horen.
  const bestaande = fs.readdirSync(KAARTEN_DIR).filter(f => f.endsWith('.html'));
  let verwijderd = 0;
  bestaande.forEach(f => {
    if (!verwachteBestanden.has(f)) {
      fs.unlinkSync(path.join(KAARTEN_DIR, f));
      verwijderd++;
      console.log('Verwijderd (hoort niet meer bij een kaart):', f);
    }
  });

  // Kaartpagina's schrijven.
  kaartData.forEach(kaart => {
    const html = paginaHtml(kaart, data);
    fs.writeFileSync(path.join(KAARTEN_DIR, `${kaart.slug}.html`), html);
  });

  // Sitemap schrijven.
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemapXml(kaartData, SITE));

  // _redirects schrijven (oude kaart-detail.html?id=N links).
  fs.writeFileSync(path.join(ROOT, '_redirects'), redirectsBestand(kaartData));

  console.log(`Klaar. ${kaartData.length} kaartpagina's geschreven in /kaarten/, ${verwijderd} oude verwijderd, sitemap.xml en _redirects bijgewerkt.`);
}

main();
