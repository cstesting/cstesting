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

  function getDocsHrefForPlatform(platform) {
    if (platform === 'NodeJS') return 'features/nodejs/getting-started.html';
    if (platform === 'Java') return 'docs-java.html';
    if (platform === 'Python') return 'docs-python.html';
    if (platform === 'C#') return 'docs-dotnet.html';
    return 'docs.html';
  }

  function applyPlatformToUI(platform) {
    if (logoText) {
      logoText.textContent = platform ? 'CSTesting for ' + platform : 'CSTesting';
    }
    if (docsLink) {
      docsLink.href = getDocsHrefForPlatform(platform);
    }
    var getStartedLinks = document.querySelectorAll('.js-get-started-doc');
    var docHref = platform ? getDocsHrefForPlatform(platform) : '#get-started';
    getStartedLinks.forEach(function (el) {
      el.href = docHref;
    });
  }

  var storedPlatform = getStoredPlatform();
  var isMainPage = !document.body.classList.contains('docs-page');
  if (storedPlatform && docsLink) {
    docsLink.href = getDocsHrefForPlatform(storedPlatform);
  }
  if (storedPlatform && isMainPage) {
    var getStartedLinks = document.querySelectorAll('.js-get-started-doc');
    var docHref = getDocsHrefForPlatform(storedPlatform);
    getStartedLinks.forEach(function (el) {
      el.href = docHref;
    });
  }
  if (storedPlatform) {
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
        e.preventDefault();
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

  /* Doc search (index page only) */
  var docSearchInput = document.getElementById('doc-search-input');
  var searchResults = document.getElementById('search-results');
  var searchWrap = document.getElementById('search-wrap');
  if (docSearchInput && searchResults && searchWrap && isMainPage) {
    var DOC_SEARCH_INDEX = [
      { lang: 'Node.js', title: 'Getting started', url: 'features/nodejs/getting-started.html' },
      { lang: 'Node.js', title: 'Writing tests', url: 'features/nodejs/writing-tests.html' },
      { lang: 'Node.js', title: 'Running and debugging tests', url: 'features/nodejs/running-debugging.html' },
      { lang: 'Node.js', title: 'Page Object Model (POM)', url: 'features/nodejs/page-object-model.html' },
      { lang: 'Node.js', title: 'Config-driven tests', url: 'features/nodejs/config-driven-tests.html' },
      { lang: 'Node.js', title: 'TypeScript', url: 'features/nodejs/typescript.html' },
      { lang: 'Node.js', title: 'Actions', url: 'features/nodejs/actions.html' },
      { lang: 'Node.js', title: 'Annotations and test control', url: 'features/nodejs/annotations-and-test-control.html' },
      { lang: 'Node.js', title: 'Assertions', url: 'features/nodejs/assertions.html' },
      { lang: 'Node.js', title: 'Dialogs', url: 'features/nodejs/dialogs.html' },
      { lang: 'Node.js', title: 'Command line', url: 'features/nodejs/command-line.html' },
      { lang: 'Node.js', title: 'Frames', url: 'features/nodejs/frames.html' },
      { lang: 'Node.js', title: 'Locators', url: 'features/nodejs/locators.html' },
      { lang: 'Node.js', title: 'Navigations', url: 'features/nodejs/navigations.html' },
      { lang: 'Java', title: 'Installation', url: 'docs-java.html' },
      { lang: 'Java', title: 'Writing tests', url: 'docs-java-writing-tests.html' },
      { lang: 'Java', title: 'Running and debugging tests', url: 'docs-java-running-debugging.html' },
      { lang: 'Java', title: 'Test runners', url: 'docs-java-test-runners.html' },
      { lang: 'Java', title: 'Actions', url: 'docs-java-actions.html' },
      { lang: 'Java', title: 'Waits', url: 'docs-java-waits.html' },
      { lang: 'Java', title: 'Assertions', url: 'docs-java-assertions.html' },
      { lang: 'Java', title: 'Dialogs', url: 'docs-java-dialogs.html' },
      { lang: 'Java', title: 'Frames', url: 'docs-java-frames.html' },
      { lang: 'Java', title: 'Locators', url: 'docs-java-locators.html' },
      { lang: 'Java', title: 'Navigations', url: 'docs-java-navigations.html' },
      { lang: 'Java', title: 'Annotations', url: 'docs-java-annotations.html' },
      { lang: 'Python', title: 'Installation', url: 'docs-python.html' },
      { lang: 'Python', title: 'Writing tests', url: 'docs-python-writing-tests.html' },
      { lang: 'Python', title: 'Running and debugging tests', url: 'docs-python-running-debugging.html' },
      { lang: 'Python', title: 'Test runners', url: 'docs-python-test-runners.html' },
      { lang: 'Python', title: 'Actions', url: 'docs-python-actions.html' },
      { lang: 'Python', title: 'Waits', url: 'docs-python-waits.html' },
      { lang: 'Python', title: 'Assertions', url: 'docs-python-assertions.html' },
      { lang: 'Python', title: 'Dialogs', url: 'docs-python-dialogs.html' },
      { lang: 'Python', title: 'Frames', url: 'docs-python-frames.html' },
      { lang: 'Python', title: 'Locators', url: 'docs-python-locators.html' },
      { lang: 'Python', title: 'Navigations', url: 'docs-python-navigations.html' },
      { lang: 'Python', title: 'Lifecycle & hooks', url: 'docs-python-lifecycle.html' },
      { lang: 'C#', title: 'Installation', url: 'docs-dotnet.html' },
      { lang: 'C#', title: 'Writing tests', url: 'docs-dotnet-writing-tests.html' },
      { lang: 'C#', title: 'Running and debugging tests', url: 'docs-dotnet-running-debugging.html' },
      { lang: 'C#', title: 'Test runners', url: 'docs-dotnet-test-runners.html' },
      { lang: 'C#', title: 'Actions', url: 'docs-dotnet-actions.html' },
      { lang: 'C#', title: 'Waits', url: 'docs-dotnet-waits.html' },
      { lang: 'C#', title: 'Assertions', url: 'docs-dotnet-assertions.html' },
      { lang: 'C#', title: 'Dialogs', url: 'docs-dotnet-dialogs.html' },
      { lang: 'C#', title: 'Frames', url: 'docs-dotnet-frames.html' },
      { lang: 'C#', title: 'Locators', url: 'docs-dotnet-locators.html' },
      { lang: 'C#', title: 'Navigations', url: 'docs-dotnet-navigations.html' },
      { lang: 'C#', title: 'NUnit & lifecycle', url: 'docs-dotnet-annotations.html' }
    ];

    function renderSearchResults(query) {
      var q = (query || '').trim().toLowerCase();
      if (!q) {
        searchResults.classList.remove('is-visible');
        searchResults.setAttribute('aria-hidden', 'true');
        searchResults.innerHTML = '';
        return;
      }
      var matches = DOC_SEARCH_INDEX.filter(function (entry) {
        return entry.title.toLowerCase().indexOf(q) !== -1 || entry.lang.toLowerCase().indexOf(q) !== -1;
      });
      var byLang = {};
      matches.forEach(function (entry) {
        if (!byLang[entry.lang]) byLang[entry.lang] = [];
        byLang[entry.lang].push(entry);
      });
      var langOrder = ['Node.js', 'Java', 'Python', 'C#'];
      var html = '';
      if (matches.length === 0) {
        html = '<div class="search-results-empty">No docs match "' + q.replace(/</g, '&lt;') + '"</div>';
      } else {
        langOrder.forEach(function (lang) {
          if (!byLang[lang]) return;
          html += '<div class="search-results-group"><div class="search-results-group-title">' + lang + '</div>';
          byLang[lang].forEach(function (entry) {
            html += '<a class="search-results-item" href="' + entry.url + '" data-url="' + entry.url + '" role="option">' + entry.title + '<small>' + lang + '</small></a>';
          });
          html += '</div>';
        });
      }
      searchResults.innerHTML = html;
      searchResults.classList.add('is-visible');
      searchResults.setAttribute('aria-hidden', 'false');
    }

    docSearchInput.addEventListener('focus', function () {
      searchWrap.classList.add('is-open');
      var q = docSearchInput.value.trim();
      if (q) renderSearchResults(q);
    });
    docSearchInput.addEventListener('input', function () {
      renderSearchResults(docSearchInput.value);
    });
    docSearchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        docSearchInput.blur();
        searchResults.classList.remove('is-visible');
        searchResults.setAttribute('aria-hidden', 'true');
        searchWrap.classList.remove('is-open');
      }
    });

    document.addEventListener('click', function (e) {
      if (searchResults.classList.contains('is-visible') && !searchWrap.contains(e.target)) {
        searchResults.classList.remove('is-visible');
        searchResults.setAttribute('aria-hidden', 'true');
        searchWrap.classList.remove('is-open');
      }
    });
  }

  /* Doc search (inside doc pages – same-language filter for Node.js, Java, Python, C#) */
  var docSearchInputDoc = document.getElementById('doc-search-input');
  var searchResultsDoc = document.getElementById('search-results');
  var searchWrapDoc = document.getElementById('search-wrap');
  if (docSearchInputDoc && searchResultsDoc && searchWrapDoc && !isMainPage) {
    var pathname = window.location.pathname || '';
    var NODEJS_DOC_INDEX = [
      { title: 'Getting started', url: 'getting-started.html' },
      { title: 'Writing tests', url: 'writing-tests.html' },
      { title: 'Running and debugging tests', url: 'running-debugging.html' },
      { title: 'Page Object Model (POM)', url: 'page-object-model.html' },
      { title: 'Config-driven tests', url: 'config-driven-tests.html' },
      { title: 'TypeScript', url: 'typescript.html' },
      { title: 'Actions', url: 'actions.html' },
      { title: 'Annotations and test control', url: 'annotations-and-test-control.html' },
      { title: 'Assertions', url: 'assertions.html' },
      { title: 'Dialogs', url: 'dialogs.html' },
      { title: 'Command line', url: 'command-line.html' },
      { title: 'Frames', url: 'frames.html' },
      { title: 'Locators', url: 'locators.html' },
      { title: 'Navigations', url: 'navigations.html' }
    ];
    var JAVA_DOC_INDEX = [
      { title: 'Installation', url: 'docs-java.html' },
      { title: 'Writing tests', url: 'docs-java-writing-tests.html' },
      { title: 'Running and debugging tests', url: 'docs-java-running-debugging.html' },
      { title: 'Test runners', url: 'docs-java-test-runners.html' },
      { title: 'Actions', url: 'docs-java-actions.html' },
      { title: 'Waits', url: 'docs-java-waits.html' },
      { title: 'Assertions', url: 'docs-java-assertions.html' },
      { title: 'Dialogs', url: 'docs-java-dialogs.html' },
      { title: 'Frames', url: 'docs-java-frames.html' },
      { title: 'Locators', url: 'docs-java-locators.html' },
      { title: 'Navigations', url: 'docs-java-navigations.html' },
      { title: 'Annotations', url: 'docs-java-annotations.html' }
    ];
    var PYTHON_DOC_INDEX = [
      { title: 'Installation', url: 'docs-python.html' },
      { title: 'Writing tests', url: 'docs-python-writing-tests.html' },
      { title: 'Running and debugging tests', url: 'docs-python-running-debugging.html' },
      { title: 'Test runners', url: 'docs-python-test-runners.html' },
      { title: 'Actions', url: 'docs-python-actions.html' },
      { title: 'Waits', url: 'docs-python-waits.html' },
      { title: 'Assertions', url: 'docs-python-assertions.html' },
      { title: 'Dialogs', url: 'docs-python-dialogs.html' },
      { title: 'Frames', url: 'docs-python-frames.html' },
      { title: 'Locators', url: 'docs-python-locators.html' },
      { title: 'Navigations', url: 'docs-python-navigations.html' },
      { title: 'Lifecycle & hooks', url: 'docs-python-lifecycle.html' }
    ];
    var DOTNET_DOC_INDEX = [
      { title: 'Installation', url: 'docs-dotnet.html' },
      { title: 'Writing tests', url: 'docs-dotnet-writing-tests.html' },
      { title: 'Running and debugging tests', url: 'docs-dotnet-running-debugging.html' },
      { title: 'Test runners', url: 'docs-dotnet-test-runners.html' },
      { title: 'Actions', url: 'docs-dotnet-actions.html' },
      { title: 'Waits', url: 'docs-dotnet-waits.html' },
      { title: 'Assertions', url: 'docs-dotnet-assertions.html' },
      { title: 'Dialogs', url: 'docs-dotnet-dialogs.html' },
      { title: 'Frames', url: 'docs-dotnet-frames.html' },
      { title: 'Locators', url: 'docs-dotnet-locators.html' },
      { title: 'Navigations', url: 'docs-dotnet-navigations.html' },
      { title: 'NUnit & lifecycle', url: 'docs-dotnet-annotations.html' }
    ];
    var docSet = null;
    if (pathname.indexOf('nodejs') !== -1) docSet = { index: NODEJS_DOC_INDEX, label: 'Node.js' };
    else if (pathname.indexOf('docs-java') !== -1) docSet = { index: JAVA_DOC_INDEX, label: 'Java' };
    else if (pathname.indexOf('docs-python') !== -1) docSet = { index: PYTHON_DOC_INDEX, label: 'Python' };
    else if (pathname.indexOf('docs-dotnet') !== -1) docSet = { index: DOTNET_DOC_INDEX, label: 'C#' };
    if (docSet) {
      function renderDocSearchResults(query) {
        var q = (query || '').trim().toLowerCase();
        if (!q) {
          searchResultsDoc.classList.remove('is-visible');
          searchResultsDoc.setAttribute('aria-hidden', 'true');
          searchResultsDoc.innerHTML = '';
          return;
        }
        var matches = docSet.index.filter(function (entry) {
          return entry.title.toLowerCase().indexOf(q) !== -1;
        });
        var html = '';
        if (matches.length === 0) {
          html = '<div class="search-results-empty">No context present</div>';
        } else {
          html += '<div class="search-results-group"><div class="search-results-group-title">' + docSet.label + '</div>';
          matches.forEach(function (entry) {
            html += '<a class="search-results-item" href="' + entry.url + '" role="option">' + entry.title + '<small>' + docSet.label + '</small></a>';
          });
          html += '</div>';
        }
        searchResultsDoc.innerHTML = html;
        searchResultsDoc.classList.add('is-visible');
        searchResultsDoc.setAttribute('aria-hidden', 'false');
      }

      docSearchInputDoc.addEventListener('focus', function () {
        searchWrapDoc.classList.add('is-open');
        var q = docSearchInputDoc.value.trim();
        if (q) renderDocSearchResults(q);
      });
      docSearchInputDoc.addEventListener('input', function () {
        renderDocSearchResults(docSearchInputDoc.value);
      });
      docSearchInputDoc.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          docSearchInputDoc.blur();
          searchResultsDoc.classList.remove('is-visible');
          searchResultsDoc.setAttribute('aria-hidden', 'true');
          searchWrapDoc.classList.remove('is-open');
        }
      });

      document.addEventListener('click', function (e) {
        if (searchResultsDoc.classList.contains('is-visible') && !searchWrapDoc.contains(e.target)) {
          searchResultsDoc.classList.remove('is-visible');
          searchResultsDoc.setAttribute('aria-hidden', 'true');
          searchWrapDoc.classList.remove('is-open');
        }
      });
    }
  }
})();
