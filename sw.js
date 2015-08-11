'use strict';

importScripts('/serviceworker-cache-polyfill.js');

var CACHE_NAME = 'bafrontend';
var CACHE_VERSION = '0.0.4';

var urlsToCache = [
  '/',
  '/src/css/styles.min.css',
  '/assets/baf-logo.png',
  '/assets/city.png',
  '/assets/community.jpeg',
  '/assets/frontenders.png',
  '/assets/sponsors/auth0.jpeg',
  '/assets/sponsors/aerolab.jpeg',
  '/assets/sponsors/davinci.jpeg',
  '/assets/sponsors/flowics.jpeg',
  '/assets/sponsors/mango.png',
  '/assets/sponsors/mercadolibre.jpeg',
  '/assets/sponsors/px2html.jpeg',
  '/assets/icons/twitter.svg',
  '/assets/icons/github.svg',
  '/assets/icons/linkedin.svg',
  '/assets/Sun/Sun-ExtraLight.ttf',
  '/assets/favicons/favicon.ico'
];

/**
 * Install
 */
this.addEventListener('install', function(eve) {
  var urls = urlsToCache.map(function(url) {
    return new Request(url, {credentials: 'include'});
  });
  eve.waitUntil(
    caches.open(CACHE_NAME + '-v' + CACHE_VERSION)
      .then(function(cache) {
        return cache.addAll(urls);
      })
  );
});

/**
 * Active / Remove old caches
 */
this.addEventListener('active', function(eve) {
  var currentCacheName = CACHE_NAME + '-v' + CACHE_VERSION;
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        if (cacheName.indexOf(CACHE_NAME) == -1) {
          return;
        }

        if (cacheName != currentCacheName) {
          return caches.delete(cacheName);
        }
      })
    );
  });
});

/**
 * Fetch
 */
this.addEventListener('fetch', function(eve) {
  var request = eve.request;
  var url = new URL(request.url);
  eve.respondWith(
    caches.match(request).then(function(response) {
      return response || fetch(request);
    })
  );
});
