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
assert.doesNotMatch(html, /localStorage|sessionStorage|indexedDB|document\.cookie/);
assert.doesNotMatch(html, /<script[^>]+src=/i);
assert.doesNotMatch(html, /<link[^>]+href=/i);
assert.doesNotMatch(html, /<img[^>]+src=/i);

const allowedUserNavigation = new Set([
  'https://emiliana-carta-2026-2027.vercel.app/',
  'https://www.emilianarestaurantebuffetcusco.com.pe/',
  'https://www.google.com/maps/search/?api=1&query=Emiliana+Restaurant+Av.+Tullumayo+235+Cusco',
  'https://wa.me/51951520753?text=Hola%20Emiliana%2C%20quisiera%20informaci%C3%B3n%20sobre%20una%20reserva.',
]);
const discoveredExternalUrls = new Set(
  [...html.matchAll(/https:\/\/[^"'<>\s]+/g)].map((match) => match[0]),
);
assert.deepEqual(
  discoveredExternalUrls,
  allowedUserNavigation,
  'Solo se permiten los enlaces de navegación aprobados para carta, web, mapa y WhatsApp.',
);
assert.match(
  html,
  /target="_blank" rel="noopener noreferrer"/,
  'Los enlaces externos deben abrirse de forma aislada y únicamente por acción del usuario.',
);
assert.match(html, /Quiero descargar la carta en quechua/);
assert.match(html, /I want to download the menu in Quechua/);
assert.match(html, /Runasimipi mikhuna qillqata uraykachiyta munani/);
assert.match(html, /const MENU_LANGUAGES = \[/);
assert.match(html, /id="messageInput"/);

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'Debe existir un único script local incrustado.');
assert.doesNotThrow(
  () => new Function(scripts[0][1]),
  'El JavaScript del laboratorio debe tener sintaxis válida.',
);

console.log('Verificación de /bot-pruebas completada: sin IA, red ni persistencia.');
