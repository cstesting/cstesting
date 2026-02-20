(function () {
  'use strict';

  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var featuresTrigger = document.getElementById('features-trigger');
  var featuresMenu = document.getElementById('features-menu');
  var youtubeTrigger = document.getElementById('youtube-trigger');
  var youtubeMenu = document.getElementById('youtube-menu');
  var logoText = document.getElementById('logo-text');
  var docsLink = document.getElementById('docs-link');

  function getStoredPlatform() {
    try {
      return sessionStorage.getItem('cstesting-platform') || '';
    } catch (e) {
      return '';
    }
  }

  function applyPlatformToUI(platform) {
    if (logoText) {
      logoText.textContent = platform ? 'CSTesting for ' + platform : 'CSTesting';
    }
    if (docsLink) {
      docsLink.href = platform === 'Java' ? 'docs-java.html' : 'docs.html';
    }
  }

  var storedPlatform = getStoredPlatform();
  var isMainPage = !document.body.classList.contains('docs-page');
  if (storedPlatform) {
    if (docsLink) {
      docsLink.href = storedPlatform === 'Java' ? 'docs-java.html' : 'docs.html';
    }
    if (!isMainPage && logoText) {
      logoText.textContent = 'CSTesting for ' + storedPlatform;
    }
  }

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

    featuresMenu.addEventListener('click', function (e) {
      var item = e.target.closest('[data-platform]');
      if (item) {
        var platform = item.getAttribute('data-platform') || '';
        try {
          sessionStorage.setItem('cstesting-platform', platform);
        } catch (err) {}
        applyPlatformToUI(platform);
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
