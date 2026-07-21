// INSTAGRAM_HANDLE and INSTAGRAM_URL are defined in js/config.js

// Instagram ondersteunt geen directe DM-links met vooringevulde tekst.
// We tonen een popup met een kant-en-klaar bericht dat de klant kopieert.

function toonBestellingPopup(kaartnaam, prijs, gepersonaliseerd) {
  const prijsLabel = gepersonaliseerd
    ? `€ 6,00 (gepersonaliseerd)`
    : `€ ${prijs.toFixed(2).replace('.', ',')}`;

  const bericht = gepersonaliseerd
    ? `Hoi Rosalie! Ik wil graag een gepersonaliseerde kaart bestellen. Kunnen we samen kijken naar een ontwerp dat past bij mijn idee? (€ 6,00)`
    : `Hoi Rosalie! Ik wil graag de kaart "${kaartnaam}" bestellen (${prijsLabel}). Is die nog beschikbaar?`;

  const bestaand = document.querySelector('.dm-overlay');
  if (bestaand) bestaand.remove();

  const overlay = document.createElement('div');
  overlay.className = 'dm-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Bestelling plaatsen');
  overlay.innerHTML = `
    <div class="dm-popup">
      <button class="dm-sluit" aria-label="Sluiten">&#x2715;</button>
      <p class="dm-titel">Bijna klaar!</p>
      <p class="dm-uitleg">Kopieer dit bericht en stuur het via Instagram DM naar <strong>@${INSTAGRAM_HANDLE}</strong>. Verzendkosten hoor je bij de bevestiging, gratis vanaf &euro; 40,00.</p>
      <div class="dm-bericht" id="dm-tekst">${bericht}</div>
      <button class="dm-kopieer" id="dm-kopieer-btn">Kopieer bericht</button>
      <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="dm-naar-insta">Ga naar Instagram &rarr;</a>
      ${WHATSAPP_NUMMER ? `<a href="https://wa.me/${WHATSAPP_NUMMER}?text=${encodeURIComponent(bericht)}" target="_blank" rel="noopener noreferrer" class="dm-naar-whatsapp">Bestellen via WhatsApp</a>` : ''}
    </div>
  `;

  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  overlay.querySelector('.dm-sluit').addEventListener('click', () => overlay.remove());

  document.body.appendChild(overlay);

  overlay.querySelector('#dm-kopieer-btn').addEventListener('click', function () {
    navigator.clipboard.writeText(document.getElementById('dm-tekst').textContent)
      .then(() => { this.textContent = 'Gekopieerd!'; setTimeout(() => this.textContent = 'Kopieer bericht', 2000); })
      .catch(() => { this.textContent = 'Selecteer de tekst hierboven'; });
  });

  overlay.querySelector('.dm-sluit').focus();
}
