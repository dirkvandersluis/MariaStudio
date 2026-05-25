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

function voegToeAanMandje(kaartId) {
  const mandje = getMandjeData();
  const kaart = kaartData.find(k => k.id === kaartId);
  if (!kaart) return;

  const bestaand = mandje.find(item => item.id === kaartId);
  if (bestaand) {
    bestaand.aantal += 1;
  } else {
    mandje.push({ id: kaartId, naam: kaart.naam, prijs: kaart.prijs, aantal: 1 });
  }
  slaMandjeOp(mandje);
  toonMandjeBevestiging(kaart.naam);
}

function verwijderUitMandje(kaartId) {
  const mandje = getMandjeData().filter(item => item.id !== kaartId);
  slaMandjeOp(mandje);
}

function pasAantalAan(kaartId, delta) {
  const mandje = getMandjeData();
  const item = mandje.find(i => i.id === kaartId);
  if (!item) return;
  item.aantal += delta;
  if (item.aantal <= 0) {
    slaMandjeOp(mandje.filter(i => i.id !== kaartId));
  } else {
    slaMandjeOp(mandje);
  }
}

function updateMandjeCounter() {
  const mandje = getMandjeData();
  const totaal = mandje.reduce((sum, item) => sum + item.aantal, 0);
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
        <a href="kaarten.html" class="mandje-leeg-link">Bekijk alle kaarten</a>
      </div>`;
    leeg.querySelector('.dm-sluit').addEventListener('click', () => leeg.remove());
    leeg.addEventListener('click', e => { if (e.target === leeg) leeg.remove(); });
    document.body.appendChild(leeg);
    leeg.querySelector('.dm-sluit').focus();
    return;
  }

  const totaalPrijs = mandje.reduce((sum, item) => sum + (item.prijs * item.aantal), 0);
  const berichtRegels = mandje.map(item =>
    `- ${item.naam} x${item.aantal} (€ ${(item.prijs * item.aantal).toFixed(2).replace('.', ',')})`
  ).join('\n');
  const volledigBericht = `Hoi Rosalie! Ik wil graag de volgende kaarten bestellen:\n${berichtRegels}\nTotaal: € ${totaalPrijs.toFixed(2).replace('.', ',')}\n\nKun je me laten weten of alles beschikbaar is?`;

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
        ${mandje.map(item => `
          <li>
            <span class="mandje-item-naam">${item.naam}</span>
            <div class="mandje-item-ctrl">
              <div class="mandje-aantal-ctrl">
                <button class="mandje-min" data-id="${item.id}" aria-label="${item.naam} min">-</button>
                <span class="mandje-aantal">${item.aantal}</span>
                <button class="mandje-plus" data-id="${item.id}" aria-label="${item.naam} plus">+</button>
              </div>
              <span class="mandje-item-prijs">&euro;&nbsp;${(item.prijs * item.aantal).toFixed(2).replace('.', ',')}</span>
              <button class="mandje-verwijder" data-id="${item.id}" aria-label="${item.naam} verwijderen">&#x2715;</button>
            </div>
          </li>`).join('')}
      </ul>
      <div class="mandje-totaal">Totaal: &euro; ${totaalPrijs.toFixed(2).replace('.', ',')}</div>
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
      verwijderUitMandje(parseInt(btn.dataset.id, 10));
      overlay.remove();
      toonMandje();
    });
  });

  overlay.querySelectorAll('.mandje-min').forEach(btn => {
    btn.addEventListener('click', () => {
      pasAantalAan(parseInt(btn.dataset.id, 10), -1);
      overlay.remove();
      toonMandje();
    });
  });

  overlay.querySelectorAll('.mandje-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      pasAantalAan(parseInt(btn.dataset.id, 10), 1);
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
