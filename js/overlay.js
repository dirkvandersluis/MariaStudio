/* ============================================================
   OVERLAY
   Gedeelde open/sluit-logica voor modale overlays (bundel-kiezer,
   lightbox). Regelt focus trap, focus terugzetten, scroll lock en
   sluiten via Escape of klik op de achtergrond.
   ============================================================ */

let overlayHuidig = null;
let overlayLaatstActief = null;
let overlayKeydownHandler = null;

function overlayFocusbareElementen(container) {
  // Bewust geen offsetParent-check: die geeft altijd null voor afstammelingen
  // van een position:fixed element (wat elke overlay hier is), ook als ze
  // gewoon zichtbaar zijn. De grootte van de bounding box is hier wel
  // betrouwbaar.
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter(function (el) {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
}

/**
 * Opent een overlay: element moet al in de DOM staan (bijvoorbeeld net met
 * document.body.appendChild toegevoegd). Zet focus in de overlay, trapt Tab
 * en Shift+Tab binnen de overlay, sluit op Escape of klik op de achtergrond,
 * en zet de paginascroll vast tot sluitOverlay() wordt aangeroepen.
 * @param {HTMLElement} overlayEl
 */
function openOverlay(overlayEl) {
  if (overlayHuidig) sluitOverlay();

  overlayLaatstActief = document.activeElement;
  overlayHuidig = overlayEl;
  document.body.classList.add('scroll-locked');

  overlayEl.addEventListener('click', function (e) {
    if (e.target === overlayEl) sluitOverlay();
  });

  overlayKeydownHandler = function (e) {
    if (e.key === 'Escape') {
      sluitOverlay();
      return;
    }
    if (e.key !== 'Tab') return;

    const focusbaar = overlayFocusbareElementen(overlayEl);
    if (focusbaar.length === 0) return;
    const eerste = focusbaar[0];
    const laatste = focusbaar[focusbaar.length - 1];

    if (e.shiftKey && document.activeElement === eerste) {
      e.preventDefault();
      laatste.focus();
    } else if (!e.shiftKey && document.activeElement === laatste) {
      e.preventDefault();
      eerste.focus();
    }
  };
  document.addEventListener('keydown', overlayKeydownHandler);

  const focusbaar = overlayFocusbareElementen(overlayEl);
  (focusbaar[0] || overlayEl).focus();
}

/** Sluit de huidige overlay: verwijdert hem, herstelt scroll en zet focus terug. */
function sluitOverlay() {
  if (!overlayHuidig) return;

  overlayHuidig.remove();
  document.body.classList.remove('scroll-locked');

  if (overlayKeydownHandler) {
    document.removeEventListener('keydown', overlayKeydownHandler);
    overlayKeydownHandler = null;
  }

  if (overlayLaatstActief && document.body.contains(overlayLaatstActief)) {
    overlayLaatstActief.focus();
  }
  overlayLaatstActief = null;
  overlayHuidig = null;
}
