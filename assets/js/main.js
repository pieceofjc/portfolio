(function() {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var YEAR_EL = document.getElementById('year');

  function getStoredTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function setStoredTheme(value) {
    try { localStorage.setItem('theme', value); } catch (e) {}
  }

  function getPreferredTheme() {
    var stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    setStoredTheme(theme);
  }

  function initTheme() {
    applyTheme(getPreferredTheme());
    if (toggle) {
      toggle.addEventListener('click', function() {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  }

  function initYear() {
    if (YEAR_EL) YEAR_EL.textContent = String(new Date().getFullYear());
  }

  function initSmoothAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      });
    });
  }

  function init() {
    initTheme();
    initYear();
    initSmoothAnchor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


