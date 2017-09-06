'use strict';

Cache.prototype.add||(Cache.prototype.add=function(t){return this.addAll([t])}),Cache.prototype.addAll||(Cache.prototype.addAll=function(t){function e(t){this.name="NetworkError",this.code=19,this.message=t}var r=this;return e.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return t=t.map(function(t){return t instanceof Request?t:t+""}),Promise.all(t.map(function(t){"string"==typeof t&&(t=new Request(t));var r=new URL(t.url).protocol;if("http:"!==r&&"https:"!==r)throw new e("Invalid scheme");return fetch(t.clone())}))}).then(function(e){return Promise.all(e.map(function(e,n){return r.put(t[n],e)}))}).then(function(){return void 0})});

var CACHE_NAME = 'bafrontend';
var CACHE_VERSION = '2.0.5';

var urlsToCache = [
  '/',
  '/scripts/main.js',
  '/styles/main.css',

  '/images/speakers/celina.jpg',
  '/images/speakers/dan.jpg',

  '/images/aerolab.svg',
  '/images/arrow-black.svg',
  '/images/arrow.svg',
  '/images/circles-background.svg',
  '/images/cowntdown.svg',
  '/images/dh-1.jpg',
  '/images/dh-2.jpg',
  '/images/digital-house.svg',
  '/images/github.svg',
  '/images/in-waves-mask-bottom-black.svg',
  '/images/in-waves-mask-bottom.svg',
  '/images/in-waves-mask-top-black.svg',
  '/images/in-waves-mask-top.svg',
  '/images/in-waves-wave-1.svg',
  '/images/in-waves-wave-2.svg',
  '/images/in-waves-wave-3.svg',
  '/images/in-waves-wave-4.svg',
  '/images/in-waves-wave-5.svg',
  '/images/in-waves-wave-6.svg',
  '/images/in-waves-wave-7.svg',
  '/images/in-waves-wave-8.svg',
  '/images/in-waves-wave.svg',
  '/images/locator-black.svg',
  '/images/locator.svg',
  '/images/logo.svg',
  '/images/meetup.svg',
  '/images/mercado-libre.svg',
  '/images/social-sharing.png',
  '/images/twitter-icon.svg'
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
this.addEventListener('activate', function(eve) {
  var currentCacheName = CACHE_NAME + '-v' + CACHE_VERSION;
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
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