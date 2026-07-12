document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var root = body.getAttribute('data-root') || '';
  var page = body.getAttribute('data-page') || '';
  var isFileProtocol = window.location.protocol === 'file:';

  var headerFallback = '' +
    '<header class="site-header">' +
    '  <div class="site-header-inner">' +
    '    <a href="{{ROOT}}index.html" class="site-logo" aria-label="CreditKarma.in home">' +
    '      <img src="{{ROOT}}assets/img/brand-icon.svg" alt="" width="44" height="44" class="site-logo-icon">' +
    '      <span class="site-logo-text">Credit<em>Karma</em><span class="site-logo-dot">.in</span></span>' +
    '    </a>' +
    '    <button class="site-nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">' +
    '      <span></span><span></span><span></span>' +
    '    </button>' +
    '    <nav class="site-nav" aria-label="Main">' +
    '      <ul class="site-nav-links">' +
    '        <li><a href="{{ROOT}}index.html" data-nav="home">Home</a></li>' +
    '        <li><a href="{{ROOT}}blog/index.html" data-nav="blog">Articles</a></li>' +
    '        <li><a href="{{ROOT}}about.html" data-nav="about">About</a></li>' +
    '        <li><a href="{{ROOT}}contact.html" data-nav="contact">Contact</a></li>' +
    '      </ul>' +
    '      <a href="{{ROOT}}disclaimer.html" class="site-nav-trust">Independent site</a>' +
    '      <a href="{{ROOT}}blog/index.html" class="btn btn-primary btn-sm site-nav-cta">Guides</a>' +
    '    </nav>' +
    '  </div>' +
    '</header>';

  var footerFallback = '' +
    '<footer class="site-footer">' +
    '  <div class="wrap">' +
    '    <div class="footer-top">' +
    '      <div class="footer-brand">' +
    '        <a href="{{ROOT}}index.html" class="site-logo site-logo--footer">' +
    '          <img src="{{ROOT}}assets/img/brand-icon.svg" alt="" width="40" height="40" class="site-logo-icon">' +
    '          <span class="site-logo-text">Credit<em>Karma</em><span class="site-logo-dot">.in</span></span>' +
    '        </a>' +
    '        <p>An independent U.S.-focused information site on credit health, borrowing, and everyday money decisions.</p>' +
    '        <p class="footer-email"><a href="mailto:support@creditkarma.in">support@creditkarma.in</a></p>' +
    '        <p class="footer-address">Office: India</p>' +
    '        <div class="footer-trust">' +
    '          <span>Original guides</span>' +
    '          <span>No account login</span>' +
    '          <span>Not financial advice</span>' +
    '        </div>' +
    '      </div>' +
    '      <div class="footer-links">' +
    '        <div>' +
    '          <h4>Site</h4>' +
    '          <ul>' +
    '            <li><a href="{{ROOT}}blog/index.html">All articles</a></li>' +
    '            <li><a href="{{ROOT}}about.html">About us</a></li>' +
    '            <li><a href="{{ROOT}}contact.html">Contact</a></li>' +
    '          </ul>' +
    '        </div>' +
    '        <div>' +
    '          <h4>Topics</h4>' +
    '          <ul>' +
    '            <li><a href="{{ROOT}}blog/what-is-credit-score.html">Credit scores</a></li>' +
    '            <li><a href="{{ROOT}}blog/fix-credit-report-errors.html">Credit reports</a></li>' +
    '            <li><a href="{{ROOT}}blog/personal-loan-guide.html">Loans</a></li>' +
    '            <li><a href="{{ROOT}}blog/credit-card-tips-beginners.html">Credit cards</a></li>' +
    '            <li><a href="{{ROOT}}blog/budgeting-tips-us-households.html">Budgeting</a></li>' +
    '          </ul>' +
    '        </div>' +
    '        <div>' +
    '          <h4>Legal & Trust</h4>' +
    '          <ul>' +
    '            <li><a href="{{ROOT}}privacy-policy.html">Privacy Policy</a></li>' +
    '            <li><a href="{{ROOT}}terms.html">Terms of Use</a></li>' +
    '            <li><a href="{{ROOT}}disclaimer.html">Disclaimer</a></li>' +
    '            <li><a href="{{ROOT}}about.html">Editorial standards</a></li>' +
    '            <li><a href="{{ROOT}}contact.html">Report a correction</a></li>' +
    '          </ul>' +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '    <div class="footer-bottom">' +
    '      <div class="footer-legal-row">' +
    '        <a href="{{ROOT}}privacy-policy.html">Privacy Policy</a>' +
    '        <a href="{{ROOT}}terms.html">Terms of Use</a>' +
    '        <a href="{{ROOT}}disclaimer.html">Disclaimer</a>' +
    '        <a href="{{ROOT}}about.html">About</a>' +
    '        <a href="{{ROOT}}contact.html">Contact</a>' +
    '      </div>' +
    '      <p>&copy; 2026 CreditKarma.in. All rights reserved.</p>' +
    '      <p class="footer-note">Not affiliated with Intuit Credit Karma, creditkarma.com, or any credit bureau. Educational content only — not financial advice.</p>' +
    '    </div>' +
    '  </div>' +
    '</footer>';

  function inject(id, url) {
    var el = document.getElementById(id);
    if (!el) return Promise.resolve();

    if (isFileProtocol) {
      var fallback = id === 'site-header' ? headerFallback : footerFallback;
      el.innerHTML = fallback.replace(/\{\{ROOT\}\}/g, root);
      if (id === 'site-header') initNav();
      return Promise.resolve();
    }

    return fetch(root + url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.innerHTML = html.replace(/\{\{ROOT\}\}/g, root);
        if (id === 'site-header') initNav();
      })
      .catch(function () {
        var fallback = id === 'site-header' ? headerFallback : footerFallback;
        el.innerHTML = fallback.replace(/\{\{ROOT\}\}/g, root);
        if (id === 'site-header') initNav();
      });
  }

  function initNav() {
    var toggle = document.querySelector('.site-nav-toggle');
    var nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      body.classList.toggle('nav-open', open);
    });

    document.querySelectorAll('.site-nav-links a[data-nav="' + page + '"]').forEach(function (a) {
      a.classList.add('is-active');
    });
  }

  initNav();

  Promise.all([
    inject('site-header', 'partials/header.html'),
    inject('site-footer', 'partials/footer.html')
  ]);
});
