/* ============================================================
   main.js — Michael Bunker Portfolio
   ============================================================ */

/**
 * Highlights the nav link that matches the current page filename.
 * Falls back to 'home' if no match is found.
 */
function setActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop().replace('.html', '') || 'index';

  // Map filenames → nav link IDs
  const pageMap = {
    index:   'nav-home',
    home:    'nav-home',
    work:    'nav-work',
    hobbies: 'nav-hobbies',
    now:     'nav-now',
    contact: 'nav-contact',
  };

  const activeId = pageMap[filename] ?? 'nav-home';

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const activeLink = document.getElementById(activeId);
  if (activeLink) activeLink.classList.add('active');
}

/**
 * Toggles a work card open/closed.
 * Clicking an already-open card closes it.
 * Clicking a new card closes any previously-open card first.
 *
 * @param {HTMLElement} card
 */
function toggleCard(card) {
  const drawer  = card.querySelector(':scope > .work-card-drawer');
  const isOpen  = card.classList.contains('open');

  // Close all open cards
  document.querySelectorAll('.work-card.open').forEach(c => c.classList.remove('open'));

  // If this card had no drawer, or it was already open, stop here (acts as close)
  if (!drawer || isOpen) return;

  card.classList.add('open');

  // Smoothly scroll the drawer into view after CSS transition
  setTimeout(() => {
    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 420);
}

/**
 * Basic contact form handler.
 * Wire up to a real backend (Formspree, Netlify Forms, etc.) in production.
 */
function handleSubmit() {
  const name  = document.getElementById('f-name')?.value?.trim();
  const email = document.getElementById('f-email')?.value?.trim();

  if (!name || !email) {
    alert('Please fill in at least your name and email.');
    return;
  }

  // TODO: Replace this with a real fetch() POST to your form endpoint
  alert(`Thanks, ${name}! Wire this form up to Formspree or Netlify Forms to make it fully live.`);
}

// Run on every page
document.addEventListener('DOMContentLoaded', setActiveNav);
