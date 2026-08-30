const ORIGIN = 'https://emiliana-restaurante-oficial-6wvhbusc5.vercel.app';
const OFFICIAL = 'https://www.emilianarestaurantebuffetcusco.com.pe';
const FRONTEND_ASSET_VERSION = '20260830-panel-oficial-1';
const OG_IMAGE = 'https://pub-b8f60fa2ac10486ba085807bac3019f1.r2.dev/foto%20principal%20de%20portada%20buffet%20grande/SOSIBLE%202.png';
const LOGO = 'https://pub-b8f60fa2ac10486ba085807bac3019f1.r2.dev/LOGOTIPOS%20EN%20PNG%20TRANSPARENTES/LOGO%20EMILIANA%20DORADO%20CON%20ROJO.png?v=20260811-png';
const DANCE_IMAGE = 'https://pub-b8f60fa2ac10486ba085807bac3019f1.r2.dev/NUEVO%20PERFIL%20DE%20PAGINA%20WEB/BAILE%20DANZA.jpeg?v=20260811-1756';
const AMBIENCE_IMAGE = 'https://pub-b8f60fa2ac10486ba085807bac3019f1.r2.dev/NUEVO%20PERFIL%20DE%20PAGINA%20WEB/GENTE%20COMO%20200%20COMIENDO.png?v=20260811-1756';
const MAP = 'https://www.google.com/maps/place/Restaurante+EMILIANA,+Av+Tullumayo+235,+Cusco+08002/data=!4m2!3m1!1s0x916dd5e1ca556083:0xf58a510c4bd60180';
const WHATSAPP = 'https://wa.me/51951520753';
const OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: '12:00',
  closes: '22:00'
};

const META = {
  '/': {
    title: 'Emiliana Restaurante Buffet Cultural Cusco | Gastronomía, Danzas y Reservas',
    description: 'Emiliana Restaurant Cultural Buffet en Cusco: gastronomía peruana, buffet cultural, música y danzas tradicionales en Av. Tullumayo 235.',
    canonical: `${OFFICIAL}/`,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
  },
  '/danzas': {
    title: 'Danzas tradicionales en Cusco | Emiliana Restaurant',
    description: 'Danzas tradicionales en vivo en Emiliana Restaurant Cultural Buffet, Cusco. Fotografías reales de nuestras presentaciones, música y cultura peruana.',
    canonical: `${OFFICIAL}/danzas`,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
  },
  '/buffet-cultural-cusco': {
    title: 'Buffet cultural en Cusco | Emiliana Restaurant',
    description: 'Buffet cultural en Cusco con gastronomía peruana, música y danzas tradicionales. Visita Emiliana Restaurant en Av. Tullumayo 235.',
    canonical: `${OFFICIAL}/buffet-cultural-cusco`,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
  },
  '/carta': {
    title: 'Carta y gastronomía peruana | Emiliana Restaurant Cusco',
    description: 'Conoce la carta de Emiliana Restaurant en Cusco: cocina peruana, platos cusqueños y alternativas vegetarianas y veganas.',
    canonical: `${OFFICIAL}/carta`,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
  },
  '/reservas': {
    title: 'Reservas | Emiliana Restaurant Cultural Buffet Cusco',
    description: 'Reserva una mesa, una celebración o una visita grupal en Emiliana Restaurant Cultural Buffet, Av. Tullumayo 235, Cusco.',
    canonical: `${OFFICIAL}/reservas`,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
  },
  '/agencias': {
    title: 'Restaurante para agencias y grupos en Cusco | Emiliana',
    description: 'Atención coordinada para agencias de turismo, operadores y grupos en Cusco con buffet cultural, música y danzas tradicionales.',
    canonical: `${OFFICIAL}/agencias`,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
  },
  '/areas': {
    title: 'Áreas de atención | Emiliana Restaurant',
    description: 'Acceso a las áreas de atención y solicitudes de Emiliana Restaurant Cultural Buffet.',
    canonical: `${OFFICIAL}/areas`,
    robots: 'noindex,follow'
  },
  '/publicidad-reservas': {
    title: 'Publicidad y Reservas | Emiliana Restaurant',
    description: 'Solicite una cita o reserva con Emiliana Restaurant y consulte el seguimiento de su expediente privado.',
    canonical: `${OFFICIAL}/publicidad-reservas`,
    robots: 'noindex,follow'
  },
  '/facturas-contabilidad': {
    title: 'Facturas y Contabilidad | Emiliana Restaurant',
    description: 'Área de facturación y contabilidad de Emiliana Restaurant Cultural Buffet.',
    canonical: `${OFFICIAL}/facturas-contabilidad`,
    robots: 'noindex,follow'
  },
  '/administracion': {
    title: 'Administración | Emiliana Restaurant',
    description: 'Área de administración de Emiliana Restaurant Cultural Buffet.',
    canonical: `${OFFICIAL}/administracion`,
    robots: 'noindex,follow'
  }
};

const PROXY_PATHS = new Set(Object.keys(META));
const NO_STORE_UI_PATHS = new Set([
  '/areas',
  '/publicidad-reservas',
  '/facturas-contabilidad',
  '/administracion'
]);

function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function setTag(html, regex, replacement) {
  return regex.test(html) ? html.replace(regex, replacement) : html.replace('</head>', `${replacement}</head>`);
}

function versionFrontendScripts(html) {
  return html
    .replace(
      /\/area\.js(?:\?[^"'<>\s]*)?/gi,
      `/area.js?v=${FRONTEND_ASSET_VERSION}`
    )
    .replace(
      /\/site-fix\.js(?:\?[^"'<>\s]*)?/gi,
      `/site-fix.js?v=${FRONTEND_ASSET_VERSION}`
    );
}

function restaurantSchema(description) {
  return {
    '@type': 'Restaurant',
    '@id': `${OFFICIAL}/#restaurant`,
    name: 'Emiliana Restaurant Cultural Buffet',
    alternateName: 'Emiliana Restaurant',
    url: `${OFFICIAL}/`,
    image: [OG_IMAGE, AMBIENCE_IMAGE, DANCE_IMAGE],
    logo: LOGO,
    telephone: '+51951520753',
    email: 'emilianarestaurant.cusco@gmail.com',
    description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Tullumayo 235',
      addressLocality: 'Cusco',
      addressRegion: 'Cusco',
      postalCode: '08002',
      addressCountry: 'PE'
    },
    openingHoursSpecification: OPENING_HOURS,
    servesCuisine: ['Cocina peruana', 'Cocina cusqueña'],
    hasMap: MAP,
    menu: `${OFFICIAL}/carta`,
    acceptsReservations: true,
    currenciesAccepted: 'PEN',
    sameAs: [
      'https://www.facebook.com/emilianarestaurant.cusco/',
      'https://www.instagram.com/emilianarestaurante/',
      'https://www.tiktok.com/@emilianarestaurante'
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: `${OFFICIAL}/reservas`
    }
  };
}

const LANDING_CONTENT = {
  '/buffet-cultural-cusco': {
    eyebrow: 'GASTRONOMÍA Y CULTURA VIVA',
    heading: 'Buffet cultural en Cusco',
    lead: 'Una experiencia que reúne sabores peruanos, hospitalidad cusqueña, música y danzas tradicionales en un solo lugar.',
    image: OG_IMAGE,
    imageAlt: 'Buffet cultural de Emiliana Restaurant en Cusco',
    sections: [
      ['Una experiencia completa', 'Emiliana ofrece una propuesta pensada para quienes desean conocer la gastronomía peruana y la cultura del Cusco alrededor de la mesa. El buffet se acompaña con presentaciones tradicionales que convierten el almuerzo o la cena en una experiencia memorable.'],
      ['Ideal para familias y grupos', 'El espacio recibe familias, viajeros, delegaciones y grupos coordinados por agencias. Para visitas numerosas recomendamos reservar previamente y comunicar restricciones alimentarias o necesidades especiales.'],
      ['Ubicación y horario', 'Estamos en Av. Tullumayo 235, Cusco 08002. Atendemos todos los días de 12:00 a 22:00.']
    ],
    primaryLabel: 'Reservar mesa',
    primaryHref: `${OFFICIAL}/reservas`,
    secondaryLabel: 'Ver carta',
    secondaryHref: `${OFFICIAL}/carta`
  },
  '/carta': {
    eyebrow: 'SABORES DEL PERÚ',
    heading: 'Carta y gastronomía peruana',
    lead: 'Platos peruanos y cusqueños preparados para compartir una experiencia auténtica en el corazón de Cusco.',
    image: AMBIENCE_IMAGE,
    imageAlt: 'Ambiente y gastronomía de Emiliana Restaurant en Cusco',
    sections: [
      ['Cocina peruana y cusqueña', 'Nuestra propuesta reúne entradas, sopas, fondos, guarniciones, postres y bebidas inspirados en recetas peruanas y sabores regionales. La oferta puede variar según la temporada y la disponibilidad de ingredientes.'],
      ['Alternativas para distintos comensales', 'Contamos con opciones vegetarianas y veganas. Si tienes alergias o restricciones alimentarias, indícalas al realizar la reserva para que el equipo pueda orientarte adecuadamente.'],
      ['Buffet y servicio para grupos', 'Además de la carta, Emiliana ofrece una experiencia de buffet cultural y coordinación anticipada para grupos, celebraciones y agencias de turismo.']
    ],
    primaryLabel: 'Abrir la carta completa',
    primaryHref: `${OFFICIAL}/#carta`,
    secondaryLabel: 'Conocer el buffet',
    secondaryHref: `${OFFICIAL}/buffet-cultural-cusco`
  },
  '/reservas': {
    eyebrow: 'PLANIFICA TU VISITA',
    heading: 'Reservas en Emiliana Restaurant',
    lead: 'Reserva una mesa, coordina una celebración o solicita atención para un grupo en nuestro restaurante cultural de Cusco.',
    image: OG_IMAGE,
    imageAlt: 'Reserva en Emiliana Restaurant Cultural Buffet Cusco',
    sections: [
      ['Información necesaria', 'Para gestionar tu solicitud indícanos nombre, teléfono, número de personas, fecha, hora, tipo de servicio, observaciones y restricciones alimentarias.'],
      ['Confirmación de la reserva', 'El envío del formulario registra la solicitud. Nuestro equipo se comunicará contigo para revisar la disponibilidad y confirmar los detalles de la atención.'],
      ['Contacto directo', 'También puedes escribir por WhatsApp al +51 951 520 753. Para grupos y fechas especiales recomendamos coordinar con anticipación.']
    ],
    primaryLabel: 'Completar formulario',
    primaryHref: `${OFFICIAL}/#reservas`,
    secondaryLabel: 'Escribir por WhatsApp',
    secondaryHref: WHATSAPP
  },
  '/agencias': {
    eyebrow: 'AGENCIAS · OPERADORES · GRUPOS',
    heading: 'Restaurante para agencias y grupos en Cusco',
    lead: 'Coordinación organizada para integrar gastronomía peruana y cultura viva en el itinerario de sus pasajeros.',
    image: DANCE_IMAGE,
    imageAlt: 'Danzas tradicionales para agencias y grupos en Emiliana Cusco',
    sections: [
      ['Propuesta para visitantes', 'Emiliana combina buffet cultural, música y danzas tradicionales en un ambiente preparado para recibir viajeros y delegaciones.'],
      ['Coordinación anticipada', 'Nuestro equipo atiende solicitudes de agencias, operadores y grupos para organizar fecha, hora, número de pasajeros y requerimientos alimentarios.'],
      ['Información comercial', 'Puede revisar la presentación para agencias o solicitar una cita con el área de Publicidad y Reservas para preparar la visita.']
    ],
    primaryLabel: 'Ver propuesta para agencias',
    primaryHref: `${OFFICIAL}/#agencias`,
    secondaryLabel: 'Solicitar una cita',
    secondaryHref: `${OFFICIAL}/publicidad-reservas?cita=1#cita`
  }
};

function renderLandingPage(path) {
  const meta = META[path];
  const content = LANDING_CONTENT[path];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      restaurantSchema(META['/'].description),
      {
        '@type': 'WebPage',
        '@id': `${meta.canonical}#webpage`,
        url: meta.canonical,
        name: meta.title,
        description: meta.description,
        inLanguage: 'es-PE',
        about: { '@id': `${OFFICIAL}/#restaurant` },
        isPartOf: { '@id': `${OFFICIAL}/#website` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${OFFICIAL}/` },
            { '@type': 'ListItem', position: 2, name: content.heading, item: meta.canonical }
          ]
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${OFFICIAL}/#website`,
        url: `${OFFICIAL}/`,
        name: 'Emiliana Restaurant Cultural Buffet',
        inLanguage: 'es-PE',
        publisher: { '@id': `${OFFICIAL}/#restaurant` }
      }
    ]
  };
  const sectionHtml = content.sections.map(([title, text]) =>
    `<article><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></article>`
  ).join('');

  return `<!doctype html>
<html lang="es-PE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  <meta name="robots" content="${escapeHtml(meta.robots)}">
  <link rel="canonical" href="${meta.canonical}">
  <link rel="alternate" hreflang="es-PE" href="${meta.canonical}">
  <link rel="alternate" hreflang="x-default" href="${meta.canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_PE">
  <meta property="og:site_name" content="Emiliana Restaurant Cultural Buffet">
  <meta property="og:title" content="${escapeHtml(meta.title)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:url" content="${meta.canonical}">
  <meta property="og:image" content="${content.image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(meta.title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.description)}">
  <meta name="twitter:image" content="${content.image}">
  <link rel="icon" href="${LOGO}" type="image/png">
  <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
  <style>
    :root{--wine:#7e1720;--wine-dark:#3b0d12;--gold:#c99a48;--cream:#f7f0e3;--ink:#261a17;--muted:#705f59}*{box-sizing:border-box}body{margin:0;background:var(--cream);color:var(--ink);font-family:Georgia,'Times New Roman',serif}a{color:inherit}.top{background:var(--wine-dark);border-bottom:1px solid rgba(201,154,72,.55)}.nav{max-width:1120px;margin:auto;min-height:84px;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:flex;align-items:center;text-decoration:none;color:#fff;font-family:Arial,sans-serif;font-weight:700;letter-spacing:.08em}.brand img{width:104px;height:60px;object-fit:contain}.nav nav{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:18px}.nav nav a{color:#f8ebd2;text-decoration:none;font:600 13px/1 Arial,sans-serif;letter-spacing:.04em}.hero{min-height:560px;display:grid;grid-template-columns:1.05fr .95fr;background:linear-gradient(135deg,var(--wine-dark),var(--wine))}.hero-copy{padding:82px max(32px,calc((100vw - 1120px)/2));padding-right:64px;color:#fff;align-self:center}.eyebrow{display:block;color:#e3bd73;font:700 12px/1.2 Arial,sans-serif;letter-spacing:.18em;margin-bottom:18px}.hero h1{font-size:clamp(42px,6vw,76px);line-height:.98;margin:0 0 24px;max-width:760px}.hero p{font:400 19px/1.7 Arial,sans-serif;color:#f1dfcf;max-width:650px}.hero img{width:100%;height:100%;min-height:560px;object-fit:cover}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}.button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:4px;background:var(--gold);color:#24140f;text-decoration:none;font:700 14px/1 Arial,sans-serif}.button.secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.6)}.content{max-width:1120px;margin:auto;padding:72px 24px}.intro{max-width:760px;margin-bottom:38px}.intro h2{font-size:36px;margin:0 0 14px}.intro p,.cards p{font:400 17px/1.75 Arial,sans-serif;color:var(--muted)}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.cards article{background:#fff;border:1px solid #e7d5ba;border-top:4px solid var(--gold);padding:28px;box-shadow:0 14px 35px rgba(67,33,23,.08)}.cards h2{font-size:24px;margin:0 0 12px}.facts{background:#efe2cf;border-top:1px solid #dfc6a2;border-bottom:1px solid #dfc6a2}.facts-in{max-width:1120px;margin:auto;padding:30px 24px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;font:600 15px/1.5 Arial,sans-serif}.facts span{display:block;color:var(--wine);font-size:12px;letter-spacing:.12em;margin-bottom:5px}.foot{background:#211311;color:#e8d8c6}.foot-in{max-width:1120px;margin:auto;padding:34px 24px;display:flex;justify-content:space-between;gap:28px;align-items:center}.foot nav{display:flex;flex-wrap:wrap;gap:18px}.foot a{color:#e8d8c6;font:600 13px/1 Arial,sans-serif}.foot small{font:400 13px/1.5 Arial,sans-serif;color:#bba898}@media(max-width:820px){.nav{align-items:flex-start}.nav nav{gap:12px}.hero{grid-template-columns:1fr}.hero-copy{padding:64px 24px}.hero img{min-height:330px;max-height:430px}.cards{grid-template-columns:1fr}.facts-in{grid-template-columns:1fr}.foot-in{align-items:flex-start;flex-direction:column}}@media(max-width:520px){.nav{display:block}.nav nav{justify-content:flex-start;margin-top:12px}.hero h1{font-size:44px}.hero p{font-size:17px}}
  </style>
</head>
<body>
  <header class="top"><div class="nav"><a class="brand" href="${OFFICIAL}/"><img src="${LOGO}" alt="Logo de Emiliana Restaurant Cultural Buffet"><span>EMILIANA RESTAURANT</span></a><nav aria-label="Navegación principal"><a href="${OFFICIAL}/">Inicio</a><a href="${OFFICIAL}/carta">Carta</a><a href="${OFFICIAL}/buffet-cultural-cusco">Buffet</a><a href="${OFFICIAL}/danzas">Danzas</a><a href="${OFFICIAL}/reservas">Reservas</a></nav></div></header>
  <main>
    <section class="hero"><div class="hero-copy"><span class="eyebrow">${escapeHtml(content.eyebrow)}</span><h1>${escapeHtml(content.heading)}</h1><p>${escapeHtml(content.lead)}</p><div class="actions"><a class="button" href="${content.primaryHref}">${escapeHtml(content.primaryLabel)}</a><a class="button secondary" href="${content.secondaryHref}">${escapeHtml(content.secondaryLabel)}</a></div></div><img src="${content.image}" alt="${escapeHtml(content.imageAlt)}" width="1200" height="900" fetchpriority="high"></section>
    <section class="content"><div class="intro"><span class="eyebrow" style="color:var(--wine)">EMILIANA · CUSCO, PERÚ</span><h2>Gastronomía, cultura y hospitalidad</h2><p>Información oficial para planificar tu visita a Emiliana Restaurant Cultural Buffet.</p></div><div class="cards">${sectionHtml}</div></section>
    <section class="facts"><div class="facts-in"><div><span>DIRECCIÓN</span>Av. Tullumayo 235 · Cusco 08002</div><div><span>HORARIO</span>Todos los días · 12:00–22:00</div><div><span>RESERVAS</span><a href="tel:+51951520753">+51 951 520 753</a></div></div></section>
  </main>
  <footer class="foot"><div class="foot-in"><small>© 2026 Emiliana Restaurant Cultural Buffet · Cusco, Perú</small><nav aria-label="Información del restaurante"><a href="${OFFICIAL}/agencias">Agencias y grupos</a><a href="${MAP}" rel="noopener" target="_blank">Cómo llegar</a><a href="${WHATSAPP}" rel="noopener" target="_blank">WhatsApp</a></nav></div></footer>
</body>
</html>`;
}

function addSeoNavigation(html) {
  const navigation = `<section class="emiliana-seo-links" aria-labelledby="emilianaSeoTitle"><style>.emiliana-seo-links{background:#211311;color:#f3e5d2;padding:34px 22px;border-top:1px solid rgba(201,154,72,.45)}.emiliana-seo-links__in{max-width:1180px;margin:auto}.emiliana-seo-links h2{margin:0 0 18px;font-size:25px}.emiliana-seo-links nav{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.emiliana-seo-links a{display:block;padding:16px;border:1px solid rgba(201,154,72,.42);color:#f3e5d2;text-decoration:none;font-weight:700}.emiliana-seo-links a:hover{background:#7e1720}@media(max-width:760px){.emiliana-seo-links nav{grid-template-columns:1fr 1fr}}@media(max-width:460px){.emiliana-seo-links nav{grid-template-columns:1fr}}</style><div class="emiliana-seo-links__in"><h2 id="emilianaSeoTitle">Planifica tu experiencia en Emiliana</h2><nav aria-label="Información de Emiliana"><a href="/buffet-cultural-cusco">Buffet cultural en Cusco</a><a href="/carta">Carta y gastronomía</a><a href="/reservas">Reservas</a><a href="/agencias">Agencias y grupos</a></nav></div></section>`;
  return html.includes('emiliana-seo-links') ? html : html.replace('</main>', `${navigation}</main>`);
}

function patchHtml(html, path) {
  const meta = META[path] || META['/'];
  html = html.replace(/<html\s+lang=(['"])?es\1?>/i, '<html lang="es-PE">');
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = setTag(
    html,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}">`
  );
  html = setTag(
    html,
    /<meta\s+name=["']robots["'][^>]*>/i,
    `<meta name="robots" content="${escapeHtml(meta.robots)}">`
  );
  html = setTag(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${meta.canonical}">`
  );
  html = setTag(
    html,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}">`
  );
  html = setTag(
    html,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}">`
  );
  html = setTag(
    html,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${meta.canonical}">`
  );
  html = setTag(
    html,
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${OG_IMAGE}">`
  );

  const extras = [
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
    `<link rel="alternate" hreflang="es-PE" href="${meta.canonical}">`,
    `<link rel="alternate" hreflang="x-default" href="${meta.canonical}">`
  ].join('');

  // Remove duplicates before adding our canonical social/locale extras.
  html = html
    .replace(/<meta\s+name=["']twitter:title["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:description["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:image["'][^>]*>/gi, '')
    .replace(/<link\s+rel=["']alternate["'][^>]*hreflang=["'](?:es-PE|x-default)["'][^>]*>/gi, '');

  let schema;
  if (path === '/') {
    schema = {
      '@context': 'https://schema.org',
      '@graph': [
        restaurantSchema(meta.description),
        {
          '@type': 'WebSite',
          '@id': `${OFFICIAL}/#website`,
          url: `${OFFICIAL}/`,
          name: 'Emiliana Restaurant Cultural Buffet',
          inLanguage: 'es-PE',
          publisher: { '@id': `${OFFICIAL}/#restaurant` }
        }
      ]
    };
  } else if (path === '/danzas') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${OFFICIAL}/danzas#webpage`,
      url: `${OFFICIAL}/danzas`,
      name: meta.title,
      description: meta.description,
      inLanguage: 'es-PE',
      about: { '@id': `${OFFICIAL}/#restaurant` },
      isPartOf: { '@id': `${OFFICIAL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${OFFICIAL}/` },
          { '@type': 'ListItem', position: 2, name: 'Danzas tradicionales', item: `${OFFICIAL}/danzas` }
        ]
      }
    };
  }

  const schemaTag = schema
    ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
    : '';

  // Vercel image optimizer on the frozen origin stays available even if this wrapper changes.
  html = html.replace(/(["'=\s])\/_vercel\/image/g, `$1${ORIGIN}/_vercel/image`);

  // Improve a few high-value image descriptions on the home page without changing layout.
  if (path === '/') {
    html = html
      .replace(/alt="Emiliana Restaurant Cultural Buffet"/, 'alt="Logo de Emiliana Restaurant Cultural Buffet en Cusco"')
      .replace(/alt="Emiliana Restaurant Cultural Buffet"/, 'alt="Buffet cultural de Emiliana Restaurant en Cusco"')
      .replace(/alt="Emiliana Restaurant Cultural Buffet"/, 'alt="Ambiente de Emiliana Restaurant Cultural Buffet en Cusco"')
      .replace(/alt="Emiliana Restaurant Cultural Buffet"/, 'alt="Danzas tradicionales en Emiliana Restaurant Cusco"')
      .replace(/alt="Emiliana Restaurant Cultural Buffet"/, 'alt="Tradición y cultura en Emiliana Restaurant Cusco"');
    html = addSeoNavigation(html);
  }

  html = versionFrontendScripts(html);
  return html.replace('</head>', `${extras}${schemaTag}</head>`);
}

function sendRobots(res, headOnly = false) {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    `Sitemap: ${OFFICIAL}/sitemap.xml`,
    ''
  ].join('\n');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  setSecurityHeaders(res);
  res.end(headOnly ? undefined : body);
}

function sendSitemap(res, headOnly = false) {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    `  <url><loc>${OFFICIAL}/</loc><lastmod>2026-08-25</lastmod><image:image><image:loc>${OG_IMAGE.replace(/&/g, '&amp;')}</image:loc><image:title>Emiliana Restaurant Cultural Buffet en Cusco</image:title></image:image></url>\n` +
    `  <url><loc>${OFFICIAL}/buffet-cultural-cusco</loc><lastmod>2026-08-25</lastmod><image:image><image:loc>${OG_IMAGE.replace(/&/g, '&amp;')}</image:loc><image:title>Buffet cultural en Cusco</image:title></image:image></url>\n` +
    `  <url><loc>${OFFICIAL}/carta</loc><lastmod>2026-08-25</lastmod><image:image><image:loc>${AMBIENCE_IMAGE.replace(/&/g, '&amp;')}</image:loc><image:title>Carta y gastronomía peruana de Emiliana</image:title></image:image></url>\n` +
    `  <url><loc>${OFFICIAL}/danzas</loc><lastmod>2026-08-25</lastmod><image:image><image:loc>https://pub-b8f60fa2ac10486ba085807bac3019f1.r2.dev/MAS%20FOTOS%20DANZAS/DSC07325.jpg</image:loc><image:title>Danzas tradicionales en Emiliana Restaurant Cusco</image:title></image:image></url>\n` +
    `  <url><loc>${OFFICIAL}/reservas</loc><lastmod>2026-08-25</lastmod></url>\n` +
    `  <url><loc>${OFFICIAL}/agencias</loc><lastmod>2026-08-25</lastmod><image:image><image:loc>${DANCE_IMAGE.replace(/&/g, '&amp;')}</image:loc><image:title>Atención para agencias y grupos en Cusco</image:title></image:image></url>\n` +
    `</urlset>\n`;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  setSecurityHeaders(res);
  res.end(headOnly ? undefined : body);
}

module.exports = async function handler(req, res) {
  const method = String(req.method || 'GET').toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, HEAD');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    setSecurityHeaders(res);
    return res.end('Método no permitido.');
  }

  const special = req.query.special;
  if (special === 'robots') return sendRobots(res, method === 'HEAD');
  if (special === 'sitemap') return sendSitemap(res, method === 'HEAD');

  const path = String(req.query.path || '/');
  if (!PROXY_PATHS.has(path)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    setSecurityHeaders(res);
    return res.end('Ruta no permitida.');
  }

  if (LANDING_CONTENT[path]) {
    const meta = META[path];
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Link', `<${meta.canonical}>; rel="canonical"`);
    res.setHeader('X-Robots-Tag', meta.robots);
    res.setHeader('Content-Language', 'es-PE');
    setSecurityHeaders(res);
    return res.end(method === 'HEAD' ? undefined : renderLandingPage(path));
  }
  const upstreamUrl = new URL(path, `${ORIGIN}/`);

  try {
    const upstream = await fetch(upstreamUrl, {
      method,
      headers: {
        'user-agent': req.headers['user-agent'] || 'Mozilla/5.0',
        'accept-language': req.headers['accept-language'] || 'es-PE,es;q=0.9'
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(12000)
    });

    const contentType = upstream.headers.get('content-type') || 'text/html; charset=utf-8';
    let body = method === 'HEAD' ? '' : await upstream.text();
    if (contentType.includes('text/html')) body = patchHtml(body, path);

    res.statusCode = upstream.status;
    res.setHeader('Content-Type', contentType);
    res.setHeader(
      'Cache-Control',
      NO_STORE_UI_PATHS.has(path)
        ? 'no-store'
        : 'public, s-maxage=300, stale-while-revalidate=3600'
    );
    res.setHeader('Vary', 'Accept-Encoding');
    const meta = META[path];
    if (meta) {
      res.setHeader('Link', `<${meta.canonical}>; rel="canonical"`);
      res.setHeader('X-Robots-Tag', meta.robots);
    }
    setSecurityHeaders(res);
    res.end(method === 'HEAD' ? undefined : body);
  } catch (error) {
    res.statusCode = error && error.name === 'TimeoutError' ? 504 : 502;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    setSecurityHeaders(res);
    res.end('No se pudo cargar temporalmente el contenido de Emiliana.');
  }
};
