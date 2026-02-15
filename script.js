(function () {
  'use strict';

  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var featuresTrigger = document.getElementById('features-trigger');
  var featuresMenu = document.getElementById('features-menu');
  var youtubeTrigger = document.getElementById('youtube-trigger');
  var youtubeMenu = document.getElementById('youtube-menu');

  function closeAllDropdowns() {
    if (featuresMenu) featuresMenu.classList.remove('is-open');
    if (featuresTrigger) featuresTrigger.setAttribute('aria-expanded', 'false');
    if (youtubeMenu) youtubeMenu.classList.remove('is-open');
    if (youtubeTrigger) youtubeTrigger.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('is-open', !expanded);
      closeAllDropdowns();
    });

    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  if (featuresTrigger && featuresMenu) {
    featuresTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var expanded = featuresTrigger.getAttribute('aria-expanded') === 'true';
      if (youtubeMenu) youtubeMenu.classList.remove('is-open');
      if (youtubeTrigger) youtubeTrigger.setAttribute('aria-expanded', 'false');
      featuresTrigger.setAttribute('aria-expanded', !expanded);
      featuresMenu.classList.toggle('is-open', !expanded);
    });

    var logoText = document.getElementById('logo-text');
    featuresMenu.addEventListener('click', function (e) {
      var item = e.target.closest('[data-platform]');
      if (item && logoText) {
        var platform = item.getAttribute('data-platform');
        var displayText = platform ? 'CSTesting for ' + platform : 'CSTesting';
        logoText.textContent = displayText;
        try {
          sessionStorage.setItem('cstesting-platform', platform || '');
        } catch (err) {}
        featuresTrigger.setAttribute('aria-expanded', 'false');
        featuresMenu.classList.remove('is-open');
      }
    });
  }

  if (youtubeTrigger && youtubeMenu) {
    youtubeTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var expanded = youtubeTrigger.getAttribute('aria-expanded') === 'true';
      if (featuresMenu) featuresMenu.classList.remove('is-open');
      if (featuresTrigger) featuresTrigger.setAttribute('aria-expanded', 'false');
      youtubeTrigger.setAttribute('aria-expanded', !expanded);
      youtubeMenu.classList.toggle('is-open', !expanded);
    });
  }

  document.addEventListener('click', function (e) {
    if (featuresMenu && featuresMenu.classList.contains('is-open') && !featuresMenu.contains(e.target) && featuresTrigger && !featuresTrigger.contains(e.target)) {
      featuresMenu.classList.remove('is-open');
      featuresTrigger.setAttribute('aria-expanded', 'false');
    }
    if (youtubeMenu && youtubeMenu.classList.contains('is-open') && !youtubeMenu.contains(e.target) && youtubeTrigger && !youtubeTrigger.contains(e.target)) {
      youtubeMenu.classList.remove('is-open');
      youtubeTrigger.setAttribute('aria-expanded', 'false');
    }
  });
})();
