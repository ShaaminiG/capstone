/* Accessible nav toggle + theme toggle + year + small project search */
(function () {
  const root = document.documentElement;

  // Theme toggle (extra)
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;

  if (themeBtn) {
    const syncLabel = () => {
      const mode = root.dataset.theme || 'auto';
      themeBtn.setAttribute('aria-label', `Toggle theme (current: ${mode})`);
    };
    syncLabel();

    themeBtn.addEventListener('click', () => {
      const current = root.dataset.theme;
      const next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem('theme', next);
      syncLabel();
    });
  }

  // Mobile nav toggle
  const navBtn = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  if (navBtn && navLinks) {
    navBtn.addEventListener('click', () => {
      const open = navLinks.getAttribute('data-open') === 'true';
      navLinks.setAttribute('data-open', String(!open));
      navBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  // Current year
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // Project search filter (extra)
  const search = document.querySelector('[data-project-search]');
  const cards = [...document.querySelectorAll('[data-project-card]')];
  if (search && cards.length) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      cards.forEach(card => {
        const hay = (card.getAttribute('data-keywords') || '').toLowerCase();
        card.style.display = hay.includes(q) ? '' : 'none';
      });
    });
  }
})();
