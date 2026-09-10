(function () {
  'use strict';

  const disclosures = Array.from(document.querySelectorAll('.site-disclosure'));
  disclosures.forEach(function (details) {
    details.addEventListener('toggle', function () {
      if (!details.open) return;
      disclosures.forEach(function (other) { if (other !== details) other.open = false; });
      if (details.classList.contains('site-search')) details.querySelector('input[type="search"]').focus();
    });
    details.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      details.open = false;
      details.querySelector('summary').focus();
    });
  });
  document.addEventListener('click', function (event) {
    disclosures.forEach(function (details) {
      if (details.open && !details.contains(event.target)) details.open = false;
    });
  });
  document.addEventListener('focusin', function (event) {
    disclosures.forEach(function (details) {
      if (details.open && !details.contains(event.target)) details.open = false;
    });
  });

  const desktop = window.matchMedia('(min-width: 48rem)');
  desktop.addEventListener('change', function () {
    const menu = document.querySelector('.mobile-menu');
    if (menu) menu.open = false;
  });

  // Only overflowing tables need an extra keyboard stop.
  const tables = document.querySelectorAll('.table-scroll');
  function updateTable(region) {
    const overflow = region.scrollWidth > region.clientWidth + 1;
    region.dataset.overflow = String(overflow);
    if (overflow) region.setAttribute('tabindex', '0');
    else region.removeAttribute('tabindex');
  }
  const observer = new ResizeObserver(function (entries) {
    entries.forEach(function (entry) { updateTable(entry.target); });
  });
  tables.forEach(function (region) { updateTable(region); observer.observe(region); });
})();
