import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [area, reservation, proxy, rawConfig] = await Promise.all([
  readFile(new URL('../area.js', import.meta.url), 'utf8'),
  readFile(new URL('../reservation.js', import.meta.url), 'utf8'),
  readFile(new URL('../api/seo-proxy.js', import.meta.url), 'utf8'),
  readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
]);

const config = JSON.parse(rawConfig);
const rewrites = new Map(config.rewrites.map(({ source, destination }) => [source, destination]));

for (const [name, source] of [
  ['area.js', area],
  ['reservation.js', reservation],
]) {
  assert.match(source, /const PORTAL_ORIGIN = window\.location\.origin;/, `${name} debe usar el dominio actual`);
  assert.match(source, /\/api\/solicitudes/, `${name} debe enviar solicitudes a la API`);
  assert.match(source, /function trackingUrl\(value\)/, `${name} debe normalizar el enlace privado`);
  assert.doesNotMatch(source, /emiliana-centro-solicitudes-staging\.vercel\.app/, `${name} no debe mostrar el dominio técnico`);
  assert.doesNotMatch(source, /emiliana-centro-solicitudes\.tupaq\.chatgpt\.site/, `${name} no debe usar el portal anterior`);
}

assert.match(area, /\/portal-publico\$\{query\}#solicitud/, 'El enlace debe abrir el formulario público');
assert.match(
  area,
  /const OFFICIAL_ORIGIN =\s*'https:\/\/www\.emilianarestaurantebuffetcusco\.com\.pe';/,
  'El panel administrativo debe usar el origen oficial fijo',
);
assert.match(area, /new MutationObserver\(/, 'Los enlaces tardíos deben observarse');
assert.match(
  area,
  /url\.hostname\.endsWith\('\.tupaq\.chatgpt\.site'\)/,
  'Debe detectar cualquier subdominio antiguo de Tupaq',
);
assert.match(area, /path !== '\/panel'/, 'Solo debe corregir la ruta del panel antiguo');
assert.match(
  area,
  /link\.href = `\$\{OFFICIAL_ORIGIN\}\/panel`;/,
  'El panel antiguo debe reemplazarse por el panel oficial',
);
assert.match(area, /link\.target = '_blank';/, 'El panel debe abrirse en una pestaña nueva');
assert.match(area, /link\.rel = 'noopener noreferrer';/, 'El panel debe aislar la pestaña nueva');
assert.match(
  area,
  /link\.setAttribute\('aria-label', ADMIN_PANEL_ARIA_LABEL\);/,
  'El enlace corregido debe conservar una etiqueta accesible',
);
assert.match(area, /if \(result\.pdfUrl\) pdf\.href = result\.pdfUrl;\s*else pdf\.hidden = true;/, 'El PDF opcional debe ocultarse cuando no existe');
assert.match(reservation, /if \(result\.pdfUrl\) pdf\.href = result\.pdfUrl;\s*else pdf\.hidden = true;/, 'El PDF opcional de reservas debe ocultarse');
assert.match(proxy, /const PROXY_PATHS = new Set\(Object\.keys\(META\)\);/, 'El proxy debe limitar sus rutas');
assert.match(proxy, /new URL\(path, `\$\{ORIGIN\}\/`\)/, 'El proxy debe usar la API URL estándar');
assert.match(proxy, /AbortSignal\.timeout\(12000\)/, 'El proxy debe limitar el tiempo de espera');

assert.equal(
  rewrites.get('/'),
  '/api/seo-proxy?path=/',
  'La portada debe pasar por la capa SEO local',
);
assert.equal(
  rewrites.get('/:path*'),
  'https://emiliana-restaurante-oficial-6wvhbusc5.vercel.app/:path*',
  'Las rutas de la web deben conservar la versión pública verificada',
);

const backend = 'https://emiliana-centro-solicitudes-staging.vercel.app';
for (const [source, path] of [
  ['/portal-publico', '/portal-publico'],
  ['/seguimiento', '/seguimiento'],
  ['/panel', '/panel'],
  ['/css/styles.css', '/css/styles.css'],
  ['/js/:path*', '/js/:path*'],
  ['/api/health', '/api/health'],
  ['/api/solicitudes', '/api/solicitudes'],
  ['/api/solicitudes/:path*', '/api/solicitudes/:path*'],
  ['/api/seguimiento/:path*', '/api/seguimiento/:path*'],
]) {
  assert.equal(rewrites.get(source), `${backend}${path}`, `Ruta ausente o incorrecta: ${source}`);
}

for (const source of ['/', '/danzas', '/carta', '/reservas', '/agencias', '/areas']) {
  assert.match(rewrites.get(source), /^\/api\/seo-proxy\?/, `Ruta SEO ausente: ${source}`);
}

console.log('Verificación de integración completada correctamente.');
