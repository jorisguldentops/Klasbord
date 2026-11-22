// Klasbord: bewaart de app en de PDF-lezer op het toestel, zodat alles ook zonder wifi werkt.
// Verhoog VERSIE als je iets aanpast, dan haalt de tablet de nieuwe versie op.
const VERSIE = 'klasbord-v2';
const KERN = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png',
  './pdfjs/pdf.min.mjs',
  './pdfjs/pdf.worker.min.mjs',
  './pdfjs/wasm/jbig2.wasm',
  './pdfjs/wasm/jbig2_nowasm_fallback.js',
  './pdfjs/wasm/openjpeg.wasm',
  './pdfjs/wasm/openjpeg_nowasm_fallback.js',
  './pdfjs/wasm/qcms_bg.wasm',
  './pdfjs/standard_fonts/FoxitDingbats.pfb',
  './pdfjs/standard_fonts/FoxitFixed.pfb',
  './pdfjs/standard_fonts/FoxitFixedBold.pfb',
  './pdfjs/standard_fonts/FoxitFixedBoldItalic.pfb',
  './pdfjs/standard_fonts/FoxitFixedItalic.pfb',
  './pdfjs/standard_fonts/FoxitSerif.pfb',
  './pdfjs/standard_fonts/FoxitSerifBold.pfb',
  './pdfjs/standard_fonts/FoxitSerifBoldItalic.pfb',
  './pdfjs/standard_fonts/FoxitSerifItalic.pfb',
  './pdfjs/standard_fonts/FoxitSymbol.pfb',
  './pdfjs/standard_fonts/LiberationSans-Bold.ttf',
  './pdfjs/standard_fonts/LiberationSans-BoldItalic.ttf',
  './pdfjs/standard_fonts/LiberationSans-Italic.ttf',
  './pdfjs/standard_fonts/LiberationSans-Regular.ttf',
  './pdfjs/iccs/CGATS001Compat-v2-micro.icc'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIE).then(c => Promise.allSettled(KERN.map(u => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSIE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Eerst uit de cache (snel, ook offline), op de achtergrond bijwerken.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const ok = url.origin === location.origin || url.host.startsWith('fonts.g');
  if (!ok) return;
  e.respondWith(caches.open(VERSIE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: url.origin === location.origin });
    const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit || Response.error());
    return hit || net;
  }));
});
