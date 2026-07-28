const MANDJE_KEY = 'mariastudio_mandje';

function getMandjeData() {
  try {
    return JSON.parse(localStorage.getItem(MANDJE_KEY)) || [];
  } catch {
    return [];
  }
}

function slaMandjeOp(mandje) {
  localStorage.setItem(MANDJE_KEY, JSON.stringify(mandje));
  updateMandjeCounter();
}

/* ------------------------------------------------------------------
   TOEVOEGEN
   ------------------------------------------------------------------ */

function voegToeAanMandje(kaartId) {
  const mandje = getMandjeData();
  const kaart = kaartData.find(k => k.id === kaartId);
  if (!kaart) return;

  const bestaand = mandje.find(item => item.id === kaartId);
  if (bestaand) {
    bestaand.aantal += 1;
  } else {
    mandje.push({ id: kaartId, aantal: 1 });
  }
  slaMandjeOp(mandje);
  toonMandjeBevestiging(kaart.naam);
}

/**
 * Voegt een bundel toe aan het mandje.
 * @param {string} bundelId    id uit bundelData
 * @param {number[]} [gekozen] ids van zelfgekozen kaarten, alleen bij type 'kies'
 */
function voegBundelToeAanMandje(bundelId, gekozen) {
  const mandje = getMandjeData();
  const bundel = vindBundel(bundelId);
  if (!bundel) return;

  // Een zelf samengestelde set is elke keer uniek, dus die krijgt een eigen regel.
  const regelId = bundel.type === 'kies' ? `${bundel.id}-${Date.now()}` : bundel.id;
  const bestaand = bundel.type === 'vast' ? mandje.find(item => item.id === bundel.id) : null;

  if (bestaand) {
    bestaand.aantal += 1;
  } else {
    const item = { id: regelId, bundelId: bundel.id, aantal: 1 };
    if (gekozen && gekozen.length) item.gekozen = gekozen.slice();
    mandje.push(item);
  }
  slaMandjeOp(mandje);
  toonMandjeBevestiging(bundel.naam);
}

/**
 * Leest naam, prijs en (voor bundels) de kaartnamen live uit kaartData/bundelData.
 * Zo staat de kaartnaam maar op een plek en werkt een naamswijziging daar altijd door,
 * ook voor regels die al in het mandje zaten voordat de naam werd aangepast.
 */
function regelInfo(item) {
  if (item.bundelId) {
    const b = vindBundel(item.bundelId);
    if (!b) return null;
    const ids = item.gekozen && item.gekozen.length ? item.gekozen : (b.kaartIds || []);
    const kaarten = ids.map(id => (kaartData.find(k => k.id === id) || {}).naam).filter(Boolean);
    return { naam: b.naam, prijs: b.prijs, aantalKaarten: b.aantalKaarten, isBundel: true, kaarten };
  }
  const k = kaartData.find(k => k.id === item.id);
  if (!k) return null;
  return { naam: k.naam, prijs: k.prijs, aantalKaarten: 1, isBundel: false, kaarten: [] };
}

function verwijderUitMandje(regelId) {
  const mandje = getMandjeData().filter(item => String(item.id) !== String(regelId));
  slaMandjeOp(mandje);
}

function pasAantalAan(regelId, delta) {
  const mandje = getMandjeData();
  const item = mandje.find(i => String(i.id) === String(regelId));
  if (!item) return;
  item.aantal += delta;
  if (item.aantal <= 0) {
    slaMandjeOp(mandje.filter(i => String(i.id) !== String(regelId)));
  } else {
    slaMandjeOp(mandje);
  }
}

/* ------------------------------------------------------------------
   TOTALEN
   Rekent met VERZENDING uit js/bundels.js
   ------------------------------------------------------------------ */

function mandjeTotalen(mandje) {
  const subtotaal    = mandje.reduce((som, item) => som + ((regelInfo(item) || {}).prijs || 0) * item.aantal, 0);
  const aantalKaarten = mandje.reduce((som, item) => som + (((regelInfo(item) || {}).aantalKaarten || 1) * item.aantal), 0);
  const verzending   = berekenVerzending(aantalKaarten, subtotaal);
  return {
    subtotaal,
    aantalKaarten,
    verzending,
    totaal: subtotaal + verzending,
    tekort: totGratisVerzending(subtotaal)
  };
}

function updateMandjeCounter() {
  const mandje = getMandjeData();
  const totaal = mandje.reduce((sum, item) => sum + (((regelInfo(item) || {}).aantalKaarten || 1) * item.aantal), 0);
  document.querySelectorAll('.mandje-counter').forEach(el => {
    el.textContent = totaal;
    el.style.display = totaal > 0 ? 'flex' : 'none';
  });
}

function toonMandjeBevestiging(naam) {
  const bestaand = document.querySelector('.mandje-toast');
  if (bestaand) bestaand.remove();

  const toast = document.createElement('div');
  toast.className = 'mandje-toast';
  toast.innerHTML = `"${naam}" toegevoegd aan je mandje. <button>Bekijk mandje</button>`;
  toast.querySelector('button').addEventListener('click', toonMandje);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ------------------------------------------------------------------
   MANDJE TONEN
   ------------------------------------------------------------------ */

function toonMandje() {
  const mandje = getMandjeData();
  const bestaand = document.querySelector('.mandje-overlay');
  if (bestaand) bestaand.remove();

  if (mandje.length === 0) {
    const leeg = document.createElement('div');
    leeg.className = 'mandje-overlay';
    leeg.setAttribute('role', 'dialog');
    leeg.setAttribute('aria-modal', 'true');
    leeg.setAttribute('aria-label', 'Winkelmandje');
    leeg.innerHTML = `
      <div class="mandje-popup">
        <button class="dm-sluit" aria-label="Sluiten">&#x2715;</button>
        <p class="dm-titel">Je mandje is leeg</p>
        <a href="${SITE_BASIS}kaarten.html" class="mandje-leeg-link">Bekijk alle kaarten</a>
      </div>`;
    leeg.querySelector('.dm-sluit').addEventListener('click', () => leeg.remove());
    leeg.addEventListener('click', e => { if (e.target === leeg) leeg.remove(); });
    document.body.appendChild(leeg);
    leeg.querySelector('.dm-sluit').focus();
    return;
  }

  const t = mandjeTotalen(mandje);
  const regels = mandje.map(item => ({ item, info: regelInfo(item) })).filter(r => r.info);

  const berichtRegels = regels.map(({ item, info }) => {
    const regel = `- ${info.naam} x${item.aantal} (${formatEuro(info.prijs * item.aantal)})`;
    return info.isBundel && info.kaarten.length
      ? regel + '\n' + info.kaarten.map(n => `    * ${n}`).join('\n')
      : regel;
  }).join('\n');

  const verzendRegel = t.verzending === 0
    ? 'Verzending: gratis'
    : `Verzending: ${formatEuro(t.verzending)}`;

  const volledigBericht =
    `Hoi Rosalie! Ik wil graag het volgende bestellen:\n${berichtRegels}\n` +
    `Subtotaal: ${formatEuro(t.subtotaal)}\n${verzendRegel}\nTotaal: ${formatEuro(t.totaal)}\n\n` +
    `Kun je me laten weten of alles beschikbaar is?`;

  const gratisBalk = t.tekort > 0
    ? `<p class="mandje-gratis-melding">Nog <strong>${formatEuro(t.tekort)}</strong> tot gratis verzending.</p>`
    : `<p class="mandje-gratis-melding mandje-gratis-behaald">Je bestelling wordt gratis verzonden.</p>`;

  const overlay = document.createElement('div');
  overlay.className = 'mandje-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Winkelmandje');
  overlay.innerHTML = `
    <div class="mandje-popup">
      <button class="dm-sluit" aria-label="Sluiten">&#x2715;</button>
      <p class="dm-titel">Je mandje</p>
      <ul class="mandje-lijst">
        ${regels.map(({ item, info }) => `
          <li>
            <span class="mandje-item-naam">
              ${info.naam}
              ${info.isBundel ? `<span class="mandje-item-sub">${info.aantalKaarten} kaarten${info.kaarten.length ? ': ' + info.kaarten.join(', ') : ''}</span>` : ''}
            </span>
            <div class="mandje-item-ctrl">
              <div class="mandje-aantal-ctrl">
                <button class="mandje-min" data-id="${item.id}" aria-label="${info.naam} min">-</button>
                <span class="mandje-aantal">${item.aantal}</span>
                <button class="mandje-plus" data-id="${item.id}" aria-label="${info.naam} plus">+</button>
              </div>
              <span class="mandje-item-prijs">${formatEuro(info.prijs * item.aantal)}</span>
              <button class="mandje-verwijder" data-id="${item.id}" aria-label="${info.naam} verwijderen">&#x2715;</button>
            </div>
          </li>`).join('')}
      </ul>

      <div class="mandje-kosten">
        <div class="mandje-kosten-regel">
          <span>Subtotaal (${t.aantalKaarten} kaart${t.aantalKaarten === 1 ? '' : 'en'})</span>
          <span>${formatEuro(t.subtotaal)}</span>
        </div>
        <div class="mandje-kosten-regel">
          <span>Verzending</span>
          <span>${t.verzending === 0 ? 'gratis' : formatEuro(t.verzending)}</span>
        </div>
        <div class="mandje-kosten-regel mandje-totaal">
          <span>Totaal</span>
          <span>${formatEuro(t.totaal)}</span>
        </div>
      </div>

      ${gratisBalk}

      <p class="dm-uitleg">Kopieer dit bericht en stuur het naar <strong>@by.rosaliemaria</strong> op Instagram:</p>
      <div class="dm-bericht" id="mandje-tekst">${volledigBericht}</div>
      <button class="dm-kopieer" id="mandje-kopieer-btn">Kopieer bericht</button>
      <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener" class="dm-naar-insta">Ga naar Instagram</a>
      ${WHATSAPP_NUMMER ? `<a href="https://wa.me/${WHATSAPP_NUMMER}?text=${encodeURIComponent(volledigBericht)}" target="_blank" rel="noopener noreferrer" class="dm-naar-whatsapp">Bestellen via WhatsApp</a>` : ''}
    </div>`;

  overlay.querySelector('.dm-sluit').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  overlay.querySelectorAll('.mandje-verwijder').forEach(btn => {
    btn.addEventListener('click', () => {
      verwijderUitMandje(btn.dataset.id);
      overlay.remove();
      toonMandje();
    });
  });

  overlay.querySelectorAll('.mandje-min').forEach(btn => {
    btn.addEventListener('click', () => {
      pasAantalAan(btn.dataset.id, -1);
      overlay.remove();
      toonMandje();
    });
  });

  overlay.querySelectorAll('.mandje-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      pasAantalAan(btn.dataset.id, 1);
      overlay.remove();
      toonMandje();
    });
  });

  overlay.querySelector('#mandje-kopieer-btn').addEventListener('click', function () {
    navigator.clipboard.writeText(document.getElementById('mandje-tekst').textContent)
      .then(() => { this.textContent = 'Gekopieerd!'; setTimeout(() => this.textContent = 'Kopieer bericht', 2000); });
  });

  document.body.appendChild(overlay);
  overlay.querySelector('.dm-sluit').focus();
}

document.addEventListener('DOMContentLoaded', updateMandjeCounter);
