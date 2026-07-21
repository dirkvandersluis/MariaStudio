(function () {
  // INSTAGRAM_HANDLE and INSTAGRAM_URL are defined in js/config.js

  // Determine active page from pathname
  const path = window.location.pathname;
  const pagina = path.includes('kaarten.html') || path.includes('kaart-detail.html')
    ? 'kaarten'
    : path.includes('bundels.html')
      ? 'bundels'
      : path.includes('contact.html')
        ? 'contact'
        : 'home';

  function actief(naam) {
    return pagina === naam ? ' class="active"' : '';
  }

  // ---- NAV ---------------------------------------------------------------
  const navEl = document.getElementById('site-nav');
  if (navEl) {
    navEl.setAttribute('role', 'navigation');
    navEl.setAttribute('aria-label', 'Hoofdnavigatie');
    navEl.innerHTML = `
      <a href="index.html" class="nav-logo-link">
        <img src="img/logo.png" alt="Maria Studio" class="nav-logo" width="160" height="44">
      </a>
      <div class="nav-right">
        <button class="nav-hamburger" id="hamburger" aria-label="Menu openen" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="nav-links">
          <li><a href="index.html"${actief('home')}>Home</a></li>
          <li><a href="kaarten.html"${actief('kaarten')}>Kaarten</a></li>
          <li><a href="bundels.html"${actief('bundels')}>Bundels</a></li>
          <li><a href="contact.html"${actief('contact')}>Contact</a></li>
        </ul>
        <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer"
           class="nav-insta" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        </a>
        <button class="nav-mandje" id="nav-mandje-btn" aria-label="Winkelmandje">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span class="mandje-counter">0</span>
        </button>
      </div>
    `;

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');
    hamburger.addEventListener('click', function () {
      const isOpen = this.classList.toggle('open');
      navLinks.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Mandje knop
    document.getElementById('nav-mandje-btn').addEventListener('click', function () {
      if (typeof toonMandje === 'function') toonMandje();
    });
  }

  // ---- FOOTER ------------------------------------------------------------
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = `
      <div class="footer-inner">
        <div class="footer-col">
          <p class="site-footer__brand">Maria Studio</p>
          <p class="site-footer__tagline">Handgemaakte kaarten met liefde gemaakt</p>
          <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer"
             class="site-footer__ig">@${INSTAGRAM_HANDLE}</a>
        </div>
        <nav class="footer-nav" aria-label="Sitemap">
          <a href="index.html">Home</a>
          <a href="kaarten.html">Kaarten</a>
          <a href="bundels.html">Bundels</a>
          <a href="contact.html">Contact</a>
        </nav>
        <div class="footer-col footer-info">
          <p>Formaat: 11,7 x 18,2 cm</p>
          <p>Prijs: &euro; 2,50 per kaart</p>
          <p>Bundels: vanaf &euro; 2,00 per kaart</p>
          <p>Gepersonaliseerd: &euro; 6,00</p>
          <p>Verzending: gratis vanaf &euro; 40,00</p>
          <!-- KVK-nummer toevoegen zodra ingeschreven -->
        </div>
      </div>
      <p class="footer-copy">&copy; 2025 Maria Studio &mdash; Rosalie Maria van der Sluis</p>
    `;
  }

  // ---- ESCAPE sluit popups -----------------------------------------------
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    const overlay = document.querySelector('.dm-overlay, .mandje-overlay, .lightbox-overlay, .kiezer-overlay');
    if (overlay) overlay.remove();
  });

  // ---- BESTELLING knoppen (data-* aanpak) --------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.bestelling-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (typeof toonBestellingPopup === 'function') {
          toonBestellingPopup(
            btn.dataset.naam,
            parseFloat(btn.dataset.prijs),
            btn.dataset.gepersonaliseerd === 'true'
          );
        }
      });
    });
  });
})();
