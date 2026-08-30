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
