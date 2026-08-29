/* Emiliana — formulario de citas conectado a la base de Marketing y Ventas. */
(function () {
  'use strict';

  const STORAGE_KEY = 'emiliana-language-v2';
  const PORTAL_ORIGIN = 'https://emiliana-centro-solicitudes-staging.vercel.app';
  const REQUEST_TYPE_BY_SERVICE = {
    'Buffet cultural': 'Reserva individual',
    'Grupo turístico': 'Reserva de grupo',
    'Agencia u operador': 'Agencia de viajes',
    'Celebración o evento': 'Evento o celebración'
  };
  const TRANSLATIONS = {
    es: {
      sectionLabel: 'RESERVAS', title: 'Sacar cita.', thankYou: 'Gracias por contactarnos.',
      instruction: '📌 Para realizar su reserva en EMILIANA restaurant por favor indíquenos:',
      listName: 'Nombre', listPeople: 'Número de personas', listDateTime: 'Fecha y hora',
      listService: 'Tipo de servicio', listAdvance: 'Adelanto', listObservations: 'Observaciones',
      listRestrictions: 'Restricciones', response: 'Nos comunicaremos con usted a la brevedad.',
      preference: '¡Gracias por su preferencia!', nameLabel: 'Nombre', phoneLabel: 'Teléfono',
      emailLabel: 'Correo electrónico', peopleLabel: 'Número de personas',
      dateLabel: 'Fecha', timeLabel: 'Hora', serviceLabel: 'Tipo de servicio', advanceLabel: 'Adelanto',
      observationsLabel: 'Observaciones', restrictionsLabel: 'Restricciones',
      namePlaceholder: 'Nombre completo', phonePlaceholder: 'Ej. 987 654 321',
      emailPlaceholder: 'correo@ejemplo.com', peoplePlaceholder: 'Ej. 4',
      servicePlaceholder: 'Seleccione el servicio', serviceBuffet: 'Buffet cultural',
      serviceTour: 'Grupo turístico', serviceAgency: 'Agencia u operador',
      serviceCelebration: 'Celebración o evento', advancePlaceholder: 'Ej. S/ 200 o pendiente',
      observationsPlaceholder: 'Escriba alguna indicación adicional',
      restrictionsPlaceholder: 'Restricciones alimentarias o necesidades especiales',
      consent: 'Autorizo el uso de mis datos para gestionar la cita y el expediente.',
      submit: 'Registrar cita y generar expediente', submitting: 'Registrando cita…'
    },
    en: {
      sectionLabel: 'RESERVATIONS', title: 'Book an appointment.', thankYou: 'Thank you for contacting us.',
      instruction: '📌 To make your reservation at EMILIANA restaurant, please provide:',
      listName: 'Name', listPeople: 'Number of guests', listDateTime: 'Date and time',
      listService: 'Type of service', listAdvance: 'Deposit', listObservations: 'Notes',
      listRestrictions: 'Restrictions', response: 'We will contact you shortly.',
      preference: 'Thank you for choosing us!', nameLabel: 'Name', phoneLabel: 'Phone',
      emailLabel: 'Email', peopleLabel: 'Number of guests',
      dateLabel: 'Date', timeLabel: 'Time', serviceLabel: 'Type of service', advanceLabel: 'Deposit',
      observationsLabel: 'Notes', restrictionsLabel: 'Restrictions',
      namePlaceholder: 'Full name', phonePlaceholder: 'E.g. 987 654 321',
      emailPlaceholder: 'email@example.com', peoplePlaceholder: 'E.g. 4',
      servicePlaceholder: 'Select a service', serviceBuffet: 'Cultural buffet',
      serviceTour: 'Tour group', serviceAgency: 'Agency or tour operator',
      serviceCelebration: 'Celebration or event', advancePlaceholder: 'E.g. S/ 200 or pending',
      observationsPlaceholder: 'Add any relevant notes',
      restrictionsPlaceholder: 'Dietary restrictions or special requirements',
      consent: 'I authorize the use of my data to manage the appointment and case.',
      submit: 'Register appointment and create case', submitting: 'Registering appointment…'
    },
    fr: {
      sectionLabel: 'RÉSERVATIONS', title: 'Prendre rendez-vous.', thankYou: 'Merci de nous avoir contactés.',
      instruction: '📌 Pour effectuer votre réservation au restaurant EMILIANA, veuillez indiquer :',
      listName: 'Nom', listPeople: 'Nombre de personnes', listDateTime: 'Date et heure',
      listService: 'Type de service', listAdvance: 'Acompte', listObservations: 'Observations',
      listRestrictions: 'Restrictions', response: 'Nous vous contacterons dans les plus brefs délais.',
      preference: 'Merci de votre confiance !', nameLabel: 'Nom', phoneLabel: 'Téléphone',
      emailLabel: 'E-mail', peopleLabel: 'Nombre de personnes',
      dateLabel: 'Date', timeLabel: 'Heure', serviceLabel: 'Type de service', advanceLabel: 'Acompte',
      observationsLabel: 'Observations', restrictionsLabel: 'Restrictions',
      namePlaceholder: 'Nom complet', phonePlaceholder: 'Ex. 987 654 321',
      emailPlaceholder: 'courriel@exemple.com', peoplePlaceholder: 'Ex. 4',
      servicePlaceholder: 'Sélectionnez le service', serviceBuffet: 'Buffet culturel',
      serviceTour: 'Groupe touristique', serviceAgency: 'Agence ou tour-opérateur',
      serviceCelebration: 'Célébration ou événement', advancePlaceholder: 'Ex. S/ 200 ou en attente',
      observationsPlaceholder: 'Ajoutez une indication utile',
      restrictionsPlaceholder: 'Restrictions alimentaires ou besoins particuliers',
      consent: 'J’autorise l’utilisation de mes données pour gérer le rendez-vous et le dossier.',
      submit: 'Enregistrer le rendez-vous', submitting: 'Enregistrement…'
    },
    it: {
      sectionLabel: 'PRENOTAZIONI', title: 'Prenota appuntamento.', thankYou: 'Grazie per averci contattato.',
      instruction: '📌 Per effettuare la prenotazione presso EMILIANA restaurant, indica:',
      listName: 'Nome', listPeople: 'Numero di persone', listDateTime: 'Data e ora',
      listService: 'Tipo di servizio', listAdvance: 'Acconto', listObservations: 'Note',
      listRestrictions: 'Restrizioni', response: 'Ti contatteremo al più presto.',
      preference: 'Grazie per averci scelto!', nameLabel: 'Nome', phoneLabel: 'Telefono',
      emailLabel: 'E-mail', peopleLabel: 'Numero di persone',
      dateLabel: 'Data', timeLabel: 'Ora', serviceLabel: 'Tipo di servizio', advanceLabel: 'Acconto',
      observationsLabel: 'Note', restrictionsLabel: 'Restrizioni',
      namePlaceholder: 'Nome completo', phonePlaceholder: 'Es. 987 654 321',
      emailPlaceholder: 'email@esempio.com', peoplePlaceholder: 'Es. 4',
      servicePlaceholder: 'Seleziona il servizio', serviceBuffet: 'Buffet culturale',
      serviceTour: 'Gruppo turistico', serviceAgency: 'Agenzia o tour operator',
      serviceCelebration: 'Celebrazione o evento', advancePlaceholder: 'Es. S/ 200 o in attesa',
      observationsPlaceholder: 'Scrivi eventuali indicazioni',
      restrictionsPlaceholder: 'Restrizioni alimentari o esigenze particolari',
      consent: 'Autorizzo l’uso dei miei dati per gestire l’appuntamento e la pratica.',
      submit: 'Registra appuntamento', submitting: 'Registrazione…'
    },
    de: {
      sectionLabel: 'RESERVIERUNGEN', title: 'Termin vereinbaren.', thankYou: 'Vielen Dank für Ihre Nachricht.',
      instruction: '📌 Für Ihre Reservierung im EMILIANA Restaurant teilen Sie uns bitte Folgendes mit:',
      listName: 'Name', listPeople: 'Anzahl der Gäste', listDateTime: 'Datum und Uhrzeit',
      listService: 'Art des Services', listAdvance: 'Anzahlung', listObservations: 'Hinweise',
      listRestrictions: 'Einschränkungen', response: 'Wir melden uns schnellstmöglich bei Ihnen.',
      preference: 'Vielen Dank für Ihr Vertrauen!', nameLabel: 'Name', phoneLabel: 'Telefon',
      emailLabel: 'E-Mail', peopleLabel: 'Anzahl der Gäste',
      dateLabel: 'Datum', timeLabel: 'Uhrzeit', serviceLabel: 'Art des Services', advanceLabel: 'Anzahlung',
      observationsLabel: 'Hinweise', restrictionsLabel: 'Einschränkungen',
      namePlaceholder: 'Vollständiger Name', phonePlaceholder: 'Z. B. 987 654 321',
      emailPlaceholder: 'email@beispiel.de', peoplePlaceholder: 'Z. B. 4',
      servicePlaceholder: 'Service auswählen', serviceBuffet: 'Kulturbuffet',
      serviceTour: 'Reisegruppe', serviceAgency: 'Agentur oder Reiseveranstalter',
      serviceCelebration: 'Feier oder Veranstaltung', advancePlaceholder: 'Z. B. S/ 200 oder ausstehend',
      observationsPlaceholder: 'Weitere Hinweise eingeben',
      restrictionsPlaceholder: 'Ernährungseinschränkungen oder besondere Bedürfnisse',
      consent: 'Ich stimme der Nutzung meiner Daten zur Bearbeitung des Termins und Vorgangs zu.',
      submit: 'Termin registrieren', submitting: 'Termin wird registriert…'
    },
    pt: {
      sectionLabel: 'RESERVAS', title: 'Agendar reserva.', thankYou: 'Obrigado por entrar em contato.',
      instruction: '📌 Para realizar sua reserva no EMILIANA restaurant, informe:',
      listName: 'Nome', listPeople: 'Número de pessoas', listDateTime: 'Data e hora',
      listService: 'Tipo de serviço', listAdvance: 'Adiantamento', listObservations: 'Observações',
      listRestrictions: 'Restrições', response: 'Entraremos em contato o mais breve possível.',
      preference: 'Obrigado pela preferência!', nameLabel: 'Nome', phoneLabel: 'Telefone',
      emailLabel: 'E-mail', peopleLabel: 'Número de pessoas',
      dateLabel: 'Data', timeLabel: 'Hora', serviceLabel: 'Tipo de serviço', advanceLabel: 'Adiantamento',
      observationsLabel: 'Observações', restrictionsLabel: 'Restrições',
      namePlaceholder: 'Nome completo', phonePlaceholder: 'Ex. 987 654 321',
      emailPlaceholder: 'email@exemplo.com', peoplePlaceholder: 'Ex. 4',
      servicePlaceholder: 'Selecione o serviço', serviceBuffet: 'Buffet cultural',
      serviceTour: 'Grupo turístico', serviceAgency: 'Agência ou operadora',
      serviceCelebration: 'Celebração ou evento', advancePlaceholder: 'Ex. S/ 200 ou pendente',
      observationsPlaceholder: 'Escreva alguma informação adicional',
      restrictionsPlaceholder: 'Restrições alimentares ou necessidades especiais',
      consent: 'Autorizo o uso dos meus dados para gerir a reserva e o processo.',
      submit: 'Registrar reserva', submitting: 'Registrando reserva…'
    },
    zh: {
      sectionLabel: '预订', title: '立即预约。', thankYou: '感谢您联系我们。',
      instruction: '📌 如需预订 EMILIANA restaurant，请提供以下信息：',
      listName: '姓名', listPeople: '人数', listDateTime: '日期和时间',
      listService: '服务类型', listAdvance: '订金', listObservations: '备注',
      listRestrictions: '限制与特殊需求', response: '我们会尽快与您联系。',
      preference: '感谢您的选择！', nameLabel: '姓名', phoneLabel: '电话',
      emailLabel: '电子邮件', peopleLabel: '人数',
      dateLabel: '日期', timeLabel: '时间', serviceLabel: '服务类型', advanceLabel: '订金',
      observationsLabel: '备注', restrictionsLabel: '限制与特殊需求',
      namePlaceholder: '完整姓名', phonePlaceholder: '例如 987 654 321',
      emailPlaceholder: 'email@example.com', peoplePlaceholder: '例如 4',
      servicePlaceholder: '请选择服务', serviceBuffet: '文化自助餐',
      serviceTour: '旅游团体', serviceAgency: '旅行社或旅游运营商',
      serviceCelebration: '庆祝活动或宴会', advancePlaceholder: '例如 S/ 200 或待确认',
      observationsPlaceholder: '请输入其他说明',
      restrictionsPlaceholder: '饮食限制或特殊需求',
      consent: '我授权使用我的信息来处理预约和档案。',
      submit: '登记预约并生成档案', submitting: '正在登记预约…'
    },
    ja: {
      sectionLabel: 'ご予約', title: '予約する。', thankYou: 'お問い合わせありがとうございます。',
      instruction: '📌 EMILIANA restaurant のご予約には、以下をご入力ください：',
      listName: 'お名前', listPeople: '人数', listDateTime: '日付と時間',
      listService: 'サービスの種類', listAdvance: '前金', listObservations: '備考',
      listRestrictions: '制限・特別なご要望', response: '担当者より速やかにご連絡いたします。',
      preference: 'ご利用ありがとうございます！', nameLabel: 'お名前', phoneLabel: '電話番号',
      emailLabel: 'メール', peopleLabel: '人数',
      dateLabel: '日付', timeLabel: '時間', serviceLabel: 'サービスの種類', advanceLabel: '前金',
      observationsLabel: '備考', restrictionsLabel: '制限・特別なご要望',
      namePlaceholder: '氏名', phonePlaceholder: '例：987 654 321',
      emailPlaceholder: 'email@example.com', peoplePlaceholder: '例：4',
      servicePlaceholder: 'サービスを選択', serviceBuffet: '文化ビュッフェ',
      serviceTour: '旅行グループ', serviceAgency: '旅行会社・ツアーオペレーター',
      serviceCelebration: 'お祝い・イベント', advancePlaceholder: '例：S/ 200 または未定',
      observationsPlaceholder: '追加のご要望をご記入ください',
      restrictionsPlaceholder: '食事制限または特別なご要望',
      consent: '予約と案件の管理に個人情報を使用することに同意します。',
      submit: '予約を登録', submitting: '予約を登録中…'
    },
    ko: {
      sectionLabel: '예약', title: '예약하기.', thankYou: '문의해 주셔서 감사합니다.',
      instruction: '📌 EMILIANA restaurant 예약을 위해 다음 정보를 입력해 주세요:',
      listName: '성명', listPeople: '인원', listDateTime: '날짜 및 시간',
      listService: '서비스 유형', listAdvance: '예약금', listObservations: '비고',
      listRestrictions: '제한 및 특별 요청', response: '빠른 시일 내에 연락드리겠습니다.',
      preference: '이용해 주셔서 감사합니다!', nameLabel: '성명', phoneLabel: '전화번호',
      emailLabel: '이메일', peopleLabel: '인원',
      dateLabel: '날짜', timeLabel: '시간', serviceLabel: '서비스 유형', advanceLabel: '예약금',
      observationsLabel: '비고', restrictionsLabel: '제한 및 특별 요청',
      namePlaceholder: '성명', phonePlaceholder: '예: 987 654 321',
      emailPlaceholder: 'email@example.com', peoplePlaceholder: '예: 4',
      servicePlaceholder: '서비스 선택', serviceBuffet: '문화 뷔페',
      serviceTour: '관광 단체', serviceAgency: '여행사 또는 투어 운영사',
      serviceCelebration: '기념 행사 또는 이벤트', advancePlaceholder: '예: S/ 200 또는 미정',
      observationsPlaceholder: '추가 요청 사항을 입력하세요',
      restrictionsPlaceholder: '식이 제한 또는 특별 요청',
      consent: '예약 및 접수 관리를 위한 개인정보 사용에 동의합니다.',
      submit: '예약 등록', submitting: '예약 등록 중…'
    }
  };

  function readLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && TRANSLATIONS[stored]) return stored;
    } catch {}
    return 'es';
  }

  function applyTranslation(language) {
    const section = document.querySelector('#reservas');
    const translation = TRANSLATIONS[language] || TRANSLATIONS.es;
    if (!section) return;

    section.lang = TRANSLATIONS[language] ? language : 'es';
    section.querySelectorAll('[data-reservation-i18n]').forEach(function (element) {
      const key = element.dataset.reservationI18n;
      const value = translation[key] || TRANSLATIONS.es[key];
      if (value) element.textContent = value;
    });
    section.querySelectorAll('[data-reservation-placeholder]').forEach(function (element) {
      const key = element.dataset.reservationPlaceholder;
      const value = translation[key] || TRANSLATIONS.es[key];
      if (value) element.setAttribute('placeholder', value);
    });
  }

  function formatDate(value) {
    const parts = String(value || '').split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : value;
  }

  function successCopy(language) {
    const copy = {
      es: {
        kicker: 'CITA REGISTRADA EN MARKETING Y VENTAS',
        title: '¡Su expediente fue creado correctamente!',
        text: 'La cita ya se encuentra guardada en la base de datos. Conserve este código privado para consultar el avance.',
        code: 'CÓDIGO DE EXPEDIENTE', tracking: 'Ver seguimiento', pdf: 'Descargar ficha PDF',
        again: 'Registrar otra cita', privacy: 'No comparta públicamente el enlace privado de seguimiento.'
      },
      en: {
        kicker: 'APPOINTMENT REGISTERED WITH MARKETING AND SALES',
        title: 'Your case was created successfully!',
        text: 'The appointment is now stored in the database. Keep this private code to check its progress.',
        code: 'CASE CODE', tracking: 'View tracking', pdf: 'Download PDF record',
        again: 'Register another appointment', privacy: 'Do not share the private tracking link publicly.'
      }
    };
    return copy[language] || copy.es;
  }

  function renderDatabaseSuccess(form, result) {
    const language = readLanguage();
    const copy = successCopy(language);
    const success = document.createElement('section');
    success.className = 'reservation-success';
    success.id = 'resultado-reserva';
    success.setAttribute('role', 'status');
    success.innerHTML = `
      <span class="reservation-success__icon" aria-hidden="true">✓</span>
      <span class="ey reservation-success__kicker"></span>
      <h3></h3>
      <p class="reservation-success__lead"></p>
      <div class="reservation-success__code">
        <small></small>
        <strong data-reservation-code></strong>
      </div>
      <div class="reservation-success__actions">
        <a class="btn" data-reservation-tracking></a>
        <a class="btn dark" data-reservation-pdf target="_blank" rel="noopener noreferrer"></a>
      </div>
      <p class="reservation-success__privacy"></p>
      <button class="reservation-success__again" type="button"></button>
    `;
    success.querySelector('.reservation-success__kicker').textContent = copy.kicker;
    success.querySelector('h3').textContent = copy.title;
    success.querySelector('.reservation-success__lead').textContent = copy.text;
    success.querySelector('.reservation-success__code small').textContent = copy.code;
    success.querySelector('[data-reservation-code]').textContent = result.code || 'Registrado';
    const tracking = success.querySelector('[data-reservation-tracking]');
    const pdf = success.querySelector('[data-reservation-pdf]');
    tracking.textContent = copy.tracking;
    tracking.href = result.trackingUrl || `${PORTAL_ORIGIN}/seguimiento`;
    pdf.textContent = copy.pdf;
    if (result.pdfUrl) pdf.href = result.pdfUrl;
    else pdf.hidden = true;
    success.querySelector('.reservation-success__privacy').textContent = copy.privacy;
    const again = success.querySelector('.reservation-success__again');
    again.textContent = copy.again;
    again.addEventListener('click', function () {
      window.location.reload();
    });
    form.replaceWith(success);
    window.setTimeout(function () {
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  }

  function installAppointmentForm() {
    const form = document.getElementById('resForm');
    if (!(form instanceof HTMLFormElement)) return;

    const date = form.querySelector('input[name="Fecha"]');
    if (date) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      date.min = now.toISOString().slice(0, 10);
    }

    form.onsubmit = async function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const get = function (key) {
        return String(data.get(key) || '').trim();
      };
      const observations = get('Observaciones') || 'Sin observaciones';
      const restrictions = get('Restricciones') || 'Ninguna indicada';
      const service = get('Tipo');
      const details = [
        'Gracias por contactarnos.',
        '📌 Para realizar su reserva en EMILIANA restaurant por favor indíquenos:',
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
