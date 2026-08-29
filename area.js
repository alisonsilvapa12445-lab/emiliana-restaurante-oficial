/*
 * Emiliana — centralización de solicitudes de las tres áreas.
 * Conserva el diseño original de cada página y sustituye los contactos
 * personales de WhatsApp por el Centro de Solicitudes oficial.
 */
(function () {
  'use strict';

  const ORIGINAL_ORIGIN =
    'https://emiliana-restaurante-oficial-etjm75g81.vercel.app';
  const PORTAL_ORIGIN =
    'https://emiliana-centro-solicitudes-staging.vercel.app';
  const AREA_BY_PATH = {
    '/publicidad-reservas': 'publicidad-reservas',
    '/facturas-contabilidad': 'facturas-contabilidad',
    '/administracion': 'administracion'
  };
  const AREA_LABELS = {
    'publicidad-reservas': 'Publicidad y Reservas',
    'facturas-contabilidad': 'Facturas y Contabilidad',
    administracion: 'Administración'
  };
  let appointmentScrollDone = false;

  const guard = document.createElement('style');
  guard.id = 'emiliana-portal-guard';
  guard.textContent =
    '.wa,.waform,a[href*="wa.me"]:not(.emiliana-expediente-whatsapp),a[href*="api.whatsapp.com"]:not(.emiliana-expediente-whatsapp){display:none!important}';
  document.head.appendChild(guard);

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = '/area-center.css?v=20260824-citas1';
  document.head.appendChild(stylesheet);

  function cleanPath() {
    return window.location.pathname.replace(/\/+$/, '') || '/';
  }

  function portalUrl(area) {
    const query = area ? `?area=${encodeURIComponent(area)}` : '';
    return `${PORTAL_ORIGIN}/portal-publico${query}#solicitud`;
  }

  function createPortalCard(area) {
    const card = document.createElement('section');
    card.className = 'emiliana-request-center';
    card.setAttribute('aria-label', 'Centro de Solicitudes Emiliana');
    card.innerHTML = `
      <div class="emiliana-request-center__mark" aria-hidden="true">E</div>
      <div class="emiliana-request-center__content">
        <span class="emiliana-request-center__kicker">NUEVO CANAL OFICIAL</span>
        <h3>Envíe su solicitud al área de ${AREA_LABELS[area] || 'Emiliana'}</h3>
        <p>Registre sus datos en un solo lugar. Recibirá un código y una clave privada para consultar el avance.</p>
        <ul>
          <li><span>✓</span> Registro inmediato</li>
          <li><span>✓</span> Datos protegidos</li>
          <li><span>✓</span> Seguimiento en línea</li>
        </ul>
        <div class="emiliana-request-center__actions">
          <a class="emiliana-request-center__primary" href="${portalUrl(area)}">INICIAR SOLICITUD <b>→</b></a>
          <a class="emiliana-request-center__secondary" href="${PORTAL_ORIGIN}/seguimiento">CONSULTAR ESTADO</a>
        </div>
      </div>
    `;
    return card;
  }

  function appointmentMarkup() {
    return `
      <div class="emiliana-appointment__intro">
        <span class="emiliana-appointment__kicker">PUBLICIDAD Y RESERVAS</span>
        <h3>Sacar cita con el área</h3>
        <p>Gracias por contactarnos. Complete los datos y recibirá un código privado para consultar su expediente.</p>
      </div>
      <form class="emiliana-appointment__form" id="emilianaAppointmentForm" novalidate>
        <div class="emiliana-appointment__fields">
          <label class="emiliana-appointment__field">
            <span>Nombre <b>*</b></span>
            <input name="fullName" autocomplete="name" maxlength="120" placeholder="Nombre completo" required>
          </label>
          <label class="emiliana-appointment__field">
            <span>Teléfono <b>*</b></span>
            <input name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="30" placeholder="Ej. 987 654 321" required>
          </label>
          <label class="emiliana-appointment__field emiliana-appointment__field--full">
            <span>Correo electrónico</span>
            <input name="email" type="email" autocomplete="email" maxlength="160" placeholder="correo@ejemplo.com">
          </label>
          <label class="emiliana-appointment__field">
            <span>Número de personas <b>*</b></span>
            <input name="people" type="number" min="1" max="1000" inputmode="numeric" placeholder="Ej. 4" required>
          </label>
          <label class="emiliana-appointment__field">
            <span>Fecha <b>*</b></span>
            <input name="date" type="date" required>
          </label>
          <label class="emiliana-appointment__field">
            <span>Hora <b>*</b></span>
            <input name="time" type="time" required>
          </label>
          <label class="emiliana-appointment__field">
            <span>Tipo de servicio <b>*</b></span>
            <select name="service" required>
              <option value="">Seleccione el servicio</option>
              <option value="Reserva individual">Buffet cultural</option>
              <option value="Reserva de grupo">Grupo turístico</option>
              <option value="Agencia de viajes">Agencia u operador</option>
              <option value="Evento o celebración">Celebración o evento</option>
            </select>
          </label>
          <label class="emiliana-appointment__field emiliana-appointment__field--full">
            <span>Adelanto <b>*</b></span>
            <input name="advance" maxlength="120" placeholder="Ej. S/ 200 o pendiente" required>
          </label>
          <label class="emiliana-appointment__field emiliana-appointment__field--full">
            <span>Observaciones</span>
            <textarea name="observations" maxlength="1600" placeholder="Escriba alguna indicación adicional"></textarea>
          </label>
          <label class="emiliana-appointment__field emiliana-appointment__field--full emiliana-appointment__restrictions">
            <span>Restricciones</span>
            <textarea name="restrictions" maxlength="1600" placeholder="Restricciones alimentarias o necesidades especiales"></textarea>
          </label>
        </div>
        <label class="emiliana-appointment__consent">
          <input name="consentCheck" type="checkbox" required>
          <span>Autorizo el uso de estos datos para gestionar mi cita y expediente. <b>*</b></span>
        </label>
        <label class="emiliana-honeypot" aria-hidden="true">
          Sitio web
          <input name="website" tabindex="-1" autocomplete="off">
        </label>
        <p class="emiliana-appointment__status" role="alert" aria-live="polite"></p>
        <button class="emiliana-appointment__submit" type="submit">
          <span>REGISTRAR CITA Y GENERAR EXPEDIENTE</span><b aria-hidden="true">→</b>
        </button>
        <p class="emiliana-appointment__privacy">Los campos marcados con * son obligatorios. Su enlace de seguimiento será privado.</p>
      </form>
    `;
  }

  function localToday() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  }

  function createAppointmentForm() {
    const section = document.createElement('section');
    section.className = 'emiliana-appointment';
    section.id = 'cita';
    section.setAttribute('aria-label', 'Formulario de cita de Publicidad y Reservas');
    section.innerHTML = appointmentMarkup();
    bindAppointmentForm(section);
    return section;
  }

  function appointmentDetails(form) {
    const data = new FormData(form);
    const service = form.elements.service;
    const serviceLabel = service.options[service.selectedIndex]?.text || data.get('service');
    const observations = String(data.get('observations') || '').trim() || 'Sin observaciones';
    const restrictions = String(data.get('restrictions') || '').trim() || 'Sin restricciones informadas';
    return {
      data,
      serviceLabel,
      observations,
      restrictions,
      text: [
        'Gracias por contactarnos.',
        '📌 Para realizar su reserva en EMILIANA restaurant por favor indíquenos:',
        `Nombre: ${String(data.get('fullName') || '').trim()}`,
        `Número de personas: ${String(data.get('people') || '').trim()}`,
        `Fecha y hora: ${String(data.get('date') || '').trim()} · ${String(data.get('time') || '').trim()}`,
        `Tipo de servicio: ${serviceLabel}`,
        `Adelanto: ${String(data.get('advance') || '').trim()}`,
        `Observaciones: ${observations}`,
        `Restricciones: ${restrictions}`,
        'Nos comunicaremos con usted a la brevedad.',
        '¡Gracias por su preferencia!'
      ].join('\n')
    };
  }

  function renderAppointmentSuccess(section, result) {
    section.classList.add('emiliana-appointment--success');
    section.id = 'resultado';
    section.innerHTML = `
      <div class="emiliana-appointment-success" role="status">
        <span class="emiliana-appointment-success__icon" aria-hidden="true">✓</span>
        <span class="emiliana-appointment__kicker">CITA REGISTRADA</span>
        <h3>¡Gracias! Su expediente ya fue creado.</h3>
        <p>Guarde el código y el enlace privado. El área de Publicidad y Reservas utilizará este expediente para atender su cita.</p>
        <div class="emiliana-appointment-success__code">
          <small>CÓDIGO DE EXPEDIENTE</small>
          <strong data-expediente-code></strong>
        </div>
        <div class="emiliana-appointment-success__actions">
          <a class="emiliana-appointment__submit" data-tracking-link>VER SEGUIMIENTO <b aria-hidden="true">→</b></a>
          <a class="emiliana-appointment-success__secondary" data-pdf-link target="_blank" rel="noopener noreferrer">DESCARGAR FICHA PDF</a>
          <a class="emiliana-appointment-success__secondary emiliana-expediente-whatsapp" data-whatsapp-link target="_blank" rel="noopener noreferrer">AVISAR AL ÁREA</a>
        </div>
        <p class="emiliana-appointment__privacy">Por seguridad, el enlace contiene una clave privada. No lo comparta públicamente.</p>
        <button class="emiliana-appointment-success__again" type="button">Registrar otra cita</button>
      </div>
    `;
    section.querySelector('[data-expediente-code]').textContent = result.code || 'Registrado';
    const tracking = section.querySelector('[data-tracking-link]');
    const pdf = section.querySelector('[data-pdf-link]');
    const whatsapp = section.querySelector('[data-whatsapp-link]');
    tracking.href = result.trackingUrl || `${PORTAL_ORIGIN}/seguimiento`;
    if (result.pdfUrl) pdf.href = result.pdfUrl;
    else pdf.hidden = true;
    whatsapp.href = result.whatsappUrl || portalUrl('publicidad-reservas');
    if (!result.whatsappUrl) whatsapp.hidden = true;
    section.querySelector('.emiliana-appointment-success__again').addEventListener('click', function () {
      const fresh = createAppointmentForm();
      section.replaceWith(fresh);
      fresh.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    window.setTimeout(function () {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  }

  function bindAppointmentForm(section) {
    const form = section.querySelector('#emilianaAppointmentForm');
    if (!form) return;
    const date = form.elements.date;
    date.min = localToday();
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const status = form.querySelector('.emiliana-appointment__status');
      const button = form.querySelector('.emiliana-appointment__submit');
      status.textContent = '';
      if (!form.reportValidity()) return;

      const appointment = appointmentDetails(form);
      const payload = new FormData();
      payload.set('area', 'publicidad-reservas');
      payload.set('fullName', String(appointment.data.get('fullName') || '').trim());
      payload.set('phone', String(appointment.data.get('phone') || '').trim());
      payload.set('email', String(appointment.data.get('email') || '').trim());
      payload.set('requestType', String(appointment.data.get('service') || 'Reserva individual'));
      payload.set('preferredResponse', 'telefono');
      payload.set('subject', `Cita / reserva - ${appointment.serviceLabel}`);
      payload.set('details', appointment.text);
      payload.set('meta_eventDate', String(appointment.data.get('date') || ''));
      payload.set('meta_eventTime', String(appointment.data.get('time') || ''));
      payload.set('meta_people', String(appointment.data.get('people') || ''));
      payload.set('meta_advance', String(appointment.data.get('advance') || '').trim());
      payload.set('meta_observations', appointment.observations);
      payload.set('meta_restrictions', appointment.restrictions);
      payload.set('consent', 'si');
      payload.set('website', String(appointment.data.get('website') || ''));

      button.disabled = true;
      button.classList.add('is-loading');
      button.querySelector('span').textContent = 'REGISTRANDO CITA…';
      try {
        const response = await fetch(`${PORTAL_ORIGIN}/api/solicitudes`, {
          method: 'POST',
          body: payload
        });
        const result = await response.json().catch(function () {
          return {};
        });
        if (!response.ok) {
          throw new Error(result.error || 'No pudimos registrar la cita. Inténtelo nuevamente.');
        }
        renderAppointmentSuccess(section, result);
      } catch (error) {
        status.textContent = error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Inténtelo nuevamente.';
        button.disabled = false;
        button.classList.remove('is-loading');
        button.querySelector('span').textContent = 'REGISTRAR CITA Y GENERAR EXPEDIENTE';
      }
    });
  }

  function isReservationsForm(form) {
    const label = (form.dataset.area || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();
    return label === 'reservas' || label === 'reserva';
  }

  function replaceForms(area) {
    document.querySelectorAll('.waform').forEach(function (form) {
      if (form.dataset.portalReplaced === 'true') return;
      form.dataset.portalReplaced = 'true';
      if (area === 'publicidad-reservas' && isReservationsForm(form)) {
        form.replaceWith(createAppointmentForm());
      } else {
        form.replaceWith(createPortalCard(area));
      }
    });
  }

  function replaceContactLinks(area) {
    document
      .querySelectorAll('a[href*="wa.me"]:not(.emiliana-expediente-whatsapp), a[href*="api.whatsapp.com"]:not(.emiliana-expediente-whatsapp), a[href^="tel:"]')
      .forEach(function (link) {
        if (!(link instanceof HTMLAnchorElement)) return;
        const originalHref = link.getAttribute('href') || '';
        if (
          originalHref.startsWith('tel:') &&
          !/(948\D*256\D*500|951\D*520\D*753|984\D*392\D*595)/.test(
            originalHref
          )
        ) {
          return;
        }
        link.href = portalUrl(area);
        link.target = '_self';
        link.rel = '';
        link.classList.add('emiliana-portal-link');
        link.style.removeProperty('display');
        const compact = link.closest('.contact, .contacto, .person, .team');
        if (!compact || link.textContent.trim().length < 38) {
          link.textContent = 'Enviar solicitud en el portal';
        }
      });
  }

  function removeFloatingWhatsApp() {
    document.querySelectorAll('.wa').forEach(function (element) {
      element.remove();
    });
  }

  function replaceVisibleReferences() {
    const replacements = [
      [/948[\s-]?256[\s-]?500/g, 'Centro de Solicitudes'],
      [/951[\s-]?520[\s-]?753/g, 'Centro de Solicitudes'],
      [/984[\s-]?392[\s-]?595/g, 'Centro de Solicitudes'],
      [
        /enviaremos\s+la\s+solicitud\s+preparada\s+al\s+WhatsApp\s+oficial/gi,
        'registraremos su solicitud en el sistema oficial y generaremos su expediente'
      ],
      [/WhatsApp\s+directo/gi, 'Atención en línea'],
      [/Enviar\s+por\s+WhatsApp/gi, 'Registrar solicitud'],
      [/Abrir\s+WhatsApp/gi, 'Ir al Centro de Solicitudes'],
      [/por\s+WhatsApp/gi, 'mediante el portal oficial']
    ];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(function (node) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return;
      let value = node.nodeValue || '';
      replacements.forEach(function (entry) {
        value = value.replace(entry[0], entry[1]);
      });
      if (value !== node.nodeValue) node.nodeValue = value;
    });
  }

  function addAreasPortalCallout() {
    if (cleanPath() !== '/areas' || document.querySelector('.emiliana-areas-callout')) {
      return;
    }
    const heading = Array.from(document.querySelectorAll('h1, h2')).find(
      function (element) {
        return /áreas|areas/i.test(element.textContent || '');
      }
    );
    const areaSection = heading && heading.closest('section');
    const cards =
      document.querySelector('.areas-grid') ||
      (areaSection && areaSection.querySelector('.grid')) ||
      areaSection;
    if (!cards) return;
    const callout = document.createElement('section');
    callout.className = 'emiliana-areas-callout';
    callout.innerHTML = `
      <div class="emiliana-areas-callout__copy">
        <span>CENTRO DE SOLICITUDES EMILIANA</span>
        <h2>Solicitudes, ahora en un solo lugar</h2>
        <p>Seleccione el área y consulte el estado con un código y una clave privada.</p>
      </div>
      <div class="emiliana-areas-callout__actions">
        <a class="emiliana-areas-callout__primary" href="${PORTAL_ORIGIN}/">
          IR AL CENTRO <b aria-hidden="true">→</b>
        </a>
        <a
          class="emiliana-areas-callout__admin"
          href="${PORTAL_ORIGIN}/panel"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Administradores: abrir panel de acceso por área en una pestaña nueva"
        >
          <i class="emiliana-areas-callout__lock" aria-hidden="true"></i>
          ADMINISTRADORES <b aria-hidden="true">↗</b>
        </a>
      </div>
    `;
    cards.insertAdjacentElement('afterend', callout);
  }

  function applyPortalExperience() {
    const area = AREA_BY_PATH[cleanPath()];
    removeFloatingWhatsApp();
    replaceVisibleReferences();
    if (area) {
      replaceForms(area);
      replaceContactLinks(area);
      document.body.classList.add('emiliana-centralized-area');
      if (
        area === 'publicidad-reservas' &&
        !appointmentScrollDone &&
        (new URLSearchParams(window.location.search).get('cita') === '1' ||
          window.location.hash === '#cita')
      ) {
        const appointment = document.querySelector('#cita');
        if (appointment) {
          appointmentScrollDone = true;
          window.setTimeout(function () {
            appointment.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    } else {
      addAreasPortalCallout();
    }
  }

  const originalScript = document.createElement('script');
  originalScript.src = `${ORIGINAL_ORIGIN}/area.js?v=20260813-18`;
  originalScript.async = false;
  originalScript.onload = function () {
    applyPortalExperience();
    [80, 250, 700, 1500].forEach(function (delay) {
      window.setTimeout(applyPortalExperience, delay);
    });

  };
  originalScript.onerror = function () {
    guard.textContent = '';
  };
  document.head.appendChild(originalScript);
})();
