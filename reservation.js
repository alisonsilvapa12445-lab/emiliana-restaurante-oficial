
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
/* Emiliana — formulario de citas conectado a la base de Marketing y Ventas. */
        `Nombre: ${get('Nombre')}`,
        `Teléfono: ${get('Telefono')}`,
        `Correo electrónico: ${get('Email') || 'No indicado'}`,
        `Número de personas: ${get('Personas')}`,
        `Fecha y hora: ${formatDate(get('Fecha'))} - ${get('Hora')}`,
        `Tipo de servicio: ${service}`,
        `Adelanto: ${get('Adelanto')}`,
        `Observaciones: ${observations}`,
        `Restricciones: ${restrictions}`,
        '',
        'Nos comunicaremos con usted a la brevedad.',
        '¡Gracias por su preferencia!'
      ].join('\n');

      const payload = new FormData();
      payload.set('area', 'publicidad-reservas');
      payload.set('fullName', get('Nombre'));
      payload.set('phone', get('Telefono'));
      payload.set('email', get('Email'));
      payload.set('requestType', REQUEST_TYPE_BY_SERVICE[service] || 'Reserva individual');
      payload.set('preferredResponse', 'telefono');
      payload.set('subject', `Cita / reserva - ${service}`);
      payload.set('details', details);
      payload.set('meta_eventDate', get('Fecha'));
      payload.set('meta_eventTime', get('Hora'));
      payload.set('meta_people', get('Personas'));
      payload.set('meta_advance', get('Adelanto'));
      payload.set('meta_observations', observations);
      payload.set('meta_restrictions', restrictions);
      payload.set('consent', 'si');
      payload.set('website', get('website'));

      const button = form.querySelector('button[type="submit"]');
      const status = form.querySelector('.reservation-form__status');
      const translation = TRANSLATIONS[readLanguage()] || TRANSLATIONS.es;
      status.textContent = '';
      button.disabled = true;
      button.textContent = translation.submitting || TRANSLATIONS.es.submitting;

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
        renderDatabaseSuccess(form, result);
      } catch (error) {
        status.textContent = error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Inténtelo nuevamente.';
        button.disabled = false;
        button.textContent = translation.submit || TRANSLATIONS.es.submit;
      }
    };
    form.dataset.databaseReady = 'marketing-sales';

    applyTranslation(readLanguage());
    document.addEventListener('click', function (event) {
      const option = event.target.closest?.('.language-option[data-language]');
      if (!option) return;
      window.setTimeout(function () {
        applyTranslation(option.dataset.language);
      }, 30);
    });
    window.addEventListener('storage', function (event) {
      if (event.key === STORAGE_KEY) applyTranslation(event.newValue || 'es');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installAppointmentForm, { once: true });
  } else {
    installAppointmentForm();
  }
})();
