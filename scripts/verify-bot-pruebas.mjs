import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [html, rawConfig] = await Promise.all([
  readFile(new URL('../bot-pruebas.html', import.meta.url), 'utf8'),
  readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
]);

const config = JSON.parse(rawConfig);
const rewrites = new Map(
  config.rewrites.map(({ source, destination }) => [source, destination]),
);
const routeIndex = config.rewrites.findIndex(({ source }) => source === '/bot-pruebas');
const catchAllIndex = config.rewrites.findIndex(({ source }) => source === '/:path*');
const headers = config.headers.find(
  ({ source }) => source === '/(bot-pruebas|bot-pruebas.html)',
);
const headerValue = (key) =>
  headers?.headers.find((header) => header.key === key)?.value;

assert.equal(
  rewrites.get('/bot-pruebas'),
  '/bot-pruebas.html',
  'La ruta de laboratorio debe servir el archivo local.',
);
assert.ok(routeIndex >= 0, 'La ruta /bot-pruebas debe existir.');
assert.ok(
  catchAllIndex < 0 || routeIndex < catchAllIndex,
  'La ruta de laboratorio debe declararse antes de la ruta general.',
);
assert.ok(headers, 'El laboratorio debe tener cabeceras de seguridad propias.');
assert.equal(
  headerValue('Cache-Control'),
  'no-store',
  'El laboratorio no debe almacenarse en caché.',
);
assert.equal(
  headerValue('X-Robots-Tag'),
  'noindex, nofollow, noarchive',
  'El laboratorio no debe indexarse.',
);
assert.match(
  headerValue('Content-Security-Policy') || '',
  /connect-src 'none'/,
  'La política debe bloquear conexiones salientes.',
);
assert.match(
  headerValue('Content-Security-Policy') || '',
  /form-action 'none'/,
  'La política debe bloquear envíos de formularios.',
);
assert.equal(
  headerValue('Referrer-Policy'),
  'no-referrer',
  'El laboratorio no debe enviar información de referencia.',
);

assert.match(html, /<title>Laboratorio del Bot \| Emiliana<\/title>/);
assert.match(html, /Consumo de IA: S\/ 0/);
assert.match(html, /No se creó ninguna reserva real/);
assert.match(html, /connect-src 'none'/);
assert.match(html, /noindex,nofollow,noarchive/);
assert.doesNotMatch(html, /<form\b/i, 'No debe existir un formulario enviable.');
assert.doesNotMatch(html, /\bfetch\s*\(/, 'No debe llamar a una API.');
assert.doesNotMatch(html, /XMLHttpRequest|WebSocket|EventSource|sendBeacon/);
assert.doesNotMatch(html, /api\.openai\.com|Authorization\s*:/i);
assert.doesNotMatch(html, /https?:\/\//i, 'No debe cargar recursos externos.');
assert.doesNotMatch(html, /localStorage|sessionStorage|indexedDB|document\.cookie/);
assert.doesNotMatch(html, /<script[^>]+src=/i);
assert.doesNotMatch(html, /<link[^>]+href=/i);
assert.doesNotMatch(html, /<img[^>]+src=/i);

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'Debe existir un único script local incrustado.');
assert.doesNotThrow(
  () => new Function(scripts[0][1]),
  'El JavaScript del laboratorio debe tener sintaxis válida.',
);

console.log('Verificación de /bot-pruebas completada: sin IA, red ni persistencia.');
