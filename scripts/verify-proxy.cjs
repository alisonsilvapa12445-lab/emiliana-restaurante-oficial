const assert = require('node:assert/strict');
const handler = require('../api/seo-proxy');

const fetchCalls = [];
global.fetch = async (url, options) => {
  fetchCalls.push({ url: String(url), options });
  return {
    status: 200,
    headers: {
      get(name) {
        return name.toLowerCase() === 'content-type' ? 'text/html; charset=utf-8' : null;
      },
    },
    async text() {
      return '<!doctype html><html lang="es"><head><title>Anterior</title><meta name="description" content="Anterior"><meta name="robots" content="index"><link rel="canonical" href="https://example.invalid"><meta property="og:title" content="Anterior"><meta property="og:description" content="Anterior"><meta property="og:url" content="https://example.invalid"><meta property="og:image" content="https://example.invalid/image.jpg"></head><body><main><h1>Emiliana</h1></main><script src="/area.js"></script><script src="/site-fix.js?v=20260813-18" defer></script></body></html>';
    },
  };
};

function invoke(query, method = 'GET') {
  return new Promise((resolve, reject) => {
    const headers = new Map();
    const req = { method, query, headers: {} };
    const res = {
      statusCode: 200,
      setHeader(name, value) {
        headers.set(name.toLowerCase(), value);
      },
      end(body) {
        resolve({ status: this.statusCode, headers, body: body || '' });
      },
    };
    Promise.resolve(handler(req, res)).catch(reject);
  });
}

(async () => {
  const home = await invoke({ path: '/' });
  assert.equal(home.status, 200);
  assert.equal(fetchCalls[0].url, 'https://emiliana-restaurante-oficial-6wvhbusc5.vercel.app/');
  assert.match(home.body, /<title>Emiliana Restaurant \| Buffet Cultural en Cusco<\/title>/);
  assert.match(home.body, /rel="canonical" href="https:\/\/www\.emilianarestaurantebuffetcusco\.com\.pe\/"/);
  assert.match(home.body, /application\/ld\+json/);
  assert.match(home.body, /emiliana-seo-links/);
  assert.equal(home.headers.get('x-content-type-options'), 'nosniff');

  const landing = await invoke({ path: '/carta' });
  assert.equal(landing.status, 200);
  assert.match(landing.body, /Carta y gastronomía peruana/);

  const areas = await invoke({ path: '/areas' });
  assert.equal(areas.status, 200);
  assert.match(areas.body, /\/area\.js\?v=20260830-panel-oficial-1/);
  assert.match(areas.body, /\/site-fix\.js\?v=20260830-panel-oficial-1/);
  assert.doesNotMatch(areas.body, /site-fix\.js\?v=20260813-18/);
  assert.equal(areas.headers.get('cache-control'), 'no-store');

  const robots = await invoke({ special: 'robots' });
  assert.equal(robots.status, 200);
  assert.match(robots.body, /Sitemap: https:\/\/www\.emilianarestaurantebuffetcusco\.com\.pe\/sitemap\.xml/);

  const invalidPath = await invoke({ path: '/no-permitida' });
  assert.equal(invalidPath.status, 400);

  const invalidMethod = await invoke({ path: '/' }, 'POST');
  assert.equal(invalidMethod.status, 405);
  assert.equal(invalidMethod.headers.get('allow'), 'GET, HEAD');

  const head = await invoke({ path: '/carta' }, 'HEAD');
  assert.equal(head.status, 200);
  assert.equal(head.body, '');

  console.log('Verificación del proxy SEO completada correctamente.');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
