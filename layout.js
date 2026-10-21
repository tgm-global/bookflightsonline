/*
 * Shared header + footer for every page.
 * Edit this one file and all pages update.
 *
 * Use on any page:
 *   <link rel="stylesheet" href="assets/site.css">
 *   <script src="assets/layout.js" defer></script>
 * For pages inside a subfolder add data-root="../" to the script tag.
 */
(function () {
  var CONFIG = {
    brand: 'bookflights.online',
    phoneDisplay: '[1-800-000-0000]',   // shown on screen, e.g. 1-800-000-0000
    phoneTel: '1-800-000-0000',                     // digits for the call link, e.g. 18000000000
    nav: [['Flights', 'index.html#search'], ['Popular routes', 'index.html#routes']],
    footerText: 'We may earn a commission when you book through our links, at no extra cost to you.',
    footerLinks: [ ['Terms & privacy', '#']]
  };

  var s = document.currentScript;
  var root = (s && s.getAttribute('data-root')) || '';
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function href(h) { return h === '#' ? '#' : root + h; }

  var phoneHref = CONFIG.phoneTel ? 'tel:+' + CONFIG.phoneTel.replace(/\D/g, '') : '#';
  var phone = '<a class="phone" href="' + phoneHref + '" aria-label="Call us at ' + esc(CONFIG.phoneDisplay) + '"><small>Call us</small><strong>' + esc(CONFIG.phoneDisplay) + '</strong></a>';

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML =
    '<div class="wrap bar">' +
      '<a class="logo" href="' + root + 'index.html"><i><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l18-7-7 18-2.5-7.5z"/></svg></i>' + esc(CONFIG.brand) + '</a>' +
      '<nav class="site-nav" aria-label="Main">' +
        CONFIG.nav.map(function (n) { return '<a href="' + esc(href(n[1])) + '">' + esc(n[0]) + '</a>'; }).join('') +
      '</nav>' +
      phone +
    '</div>';

  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML =
    '<div class="wrap bar">' +
      '<div><span class="brand">' + esc(CONFIG.brand) + '</span><p>' + esc(CONFIG.footerText) + '</p></div>' +
      '<div class="links">' + CONFIG.footerLinks.map(function (l) { return '<a href="' + esc(href(l[1])) + '">' + esc(l[0]) + '</a>'; }).join('') + '</div>' +
      phone +
    '</div>';

  document.body.insertBefore(header, document.body.firstChild);
  document.body.appendChild(footer);

  // Keep page content clear of the fixed header and footer, whatever their height.
  function measure() {
    var r = document.documentElement.style;
    r.setProperty('--hh', header.offsetHeight + 'px');
    r.setProperty('--fh', footer.offsetHeight + 'px');
  }
  measure();
  window.addEventListener('resize', measure);
  if (window.ResizeObserver) { var ro = new ResizeObserver(measure); ro.observe(header); ro.observe(footer); }

  // Mark the current page in the menu.
  var file = (location.pathname.split('/').pop() || 'index.html');
  Array.prototype.forEach.call(header.querySelectorAll('.site-nav a'), function (a) {
    var f = a.getAttribute('href').split('#')[0].split('/').pop();
    if (f === file && a.getAttribute('href').indexOf('#') < 0) a.setAttribute('aria-current', 'page');
  });
})();
