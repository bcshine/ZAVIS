// 서비스 워커 등록
const CACHE_NAME = 'zavis-v1';
const urlsToCache = [
  './',
  './index.html',
  './mp1.png',
  './manifest.json',
  './sw.js'
];

// 설치 이벤트
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// fetch 이벤트 
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에서 찾으면 반환, 없으면 네트워크 요청
        return response || fetch(event.request);
      }
    )
  );
}); 