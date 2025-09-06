const CACHE_NAME = 'books-of-madih-v12'; // رقم جديد
const urlsToCache = [
  '/BooksOfMadih/',
  '/BooksOfMadih/index.html',
  '/BooksOfMadih/app.js',
  '/BooksOfMadih/css/style.css',
  '/BooksOfMadih/manifest.json',
  '/BooksOfMadih/images/icon-192.png',
  '/BooksOfMadih/images/icon-512.png',
  '/BooksOfMadih/pdf/b1.pdf',
  '/BooksOfMadih/pdf/b2.pdf',
  '/BooksOfMadih/pdf/b3.pdf',
  '/BooksOfMadih/pdf/b4.pdf',
  '/BooksOfMadih/pdf/b5.pdf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // تجاهل طلبات PDF لتفادي مشاكل التوجيه
  if (event.request.url.endsWith('.pdf')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});