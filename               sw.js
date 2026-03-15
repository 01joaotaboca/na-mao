const cacheName = 'agro-palma-v1';

// Lista de arquivos para salvar no celular (incluindo as bibliotecas de PDF)
const assets = [
  './',
  './index.html',
  './icon.png',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js'
];

// Instala o Service Worker e armazena tudo no cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Armazenando arquivos para uso offline');
      return cache.addAll(assets);
    })
  );
});

// Responde às requisições mesmo sem internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
