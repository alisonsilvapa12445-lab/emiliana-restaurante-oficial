import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [area, reservation, siteFix, proxy, rawConfig] = await Promise.all([
  readFile(new URL('../area.js', import.meta.url), 'utf8'),
  readFile(new URL('../reservation.js', import.meta.url), 'utf8'),
  readFile(new URL('../site-fix.js', import.meta.url), 'utf8'),
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
assert.match(
  siteFix,
  /const ADMIN_PANEL_URL =\s*'https:\/\/www\.emilianarestaurantebuffetcusco\.com\.pe\/panel';/,
  'site-fix.js debe crear directamente el enlace oficial',
);
assert.doesNotMatch(
  siteFix,
  /\.tupaq\.chatgpt\.site\/panel/,
  'site-fix.js no debe conservar el panel antiguo',
);
assert.match(area, /if \(result\.pdfUrl\) pdf\.href = result\.pdfUrl;\s*else pdf\.hidden = true;/, 'El PDF opcional debe ocultarse cuando no existe');
assert.match(reservation, /if \(result\.pdfUrl\) pdf\.href = result\.pdfUrl;\s*else pdf\.hidden = true;/, 'El PDF opcional de reservas debe ocultarse');
assert.match(proxy, /const PROXY_PATHS = new Set\(Object\.keys\(META\)\);/, 'El proxy debe limitar sus rutas');
assert.match(proxy, /new URL\(path, `\$\{ORIGIN\}\/`\)/, 'El proxy debe usar la API URL estándar');
assert.match(proxy, /AbortSignal\.timeout\(12000\)/, 'El proxy debe limitar el tiempo de espera');
assert.match(
  proxy,
  /const FRONTEND_ASSET_VERSION = '20260830-panel-oficial-1';/,
  'Las correcciones del panel deben invalidar recursos antiguos',
);
assert.match(proxy, /function versionFrontendScripts\(html\)/, 'El HTML debe versionar los scripts corregidos');
assert.match(proxy, /NO_STORE_UI_PATHS\.has\(path\)/, 'Las áreas internas no deben almacenarse en caché');

const frontendScriptHeaders = config.headers.find(
  ({ source }) => source === '/(area|reservation|site-fix).js',
);
assert.ok(frontendScriptHeaders, 'Los scripts corregidos deben tener cabeceras de revalidación');
assert.equal(
  frontendScriptHeaders.headers.find(({ key }) => key === 'Cache-Control')?.value,
  'public, max-age=0, must-revalidate',
  'Los scripts corregidos deben revalidarse siempre',
);
const internalUiHeaders = config.headers.find(
  ({ source }) => source === '/(areas|publicidad-reservas|facturas-contabilidad|administracion)',
);
assert.equal(
  internalUiHeaders?.headers.find(({ key }) => key === 'Cache-Control')?.value,
  'no-store',
  'Las áreas internas no deben usar una copia almacenada',
);

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
