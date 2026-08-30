/*
 * Emiliana — ajustes puntuales de portada e integración administrativa.
 * Se conserva sin cambios el JavaScript original del sitio.
 */
(function () {
  'use strict';

  const NEW_WELCOME_IMAGE =
    'https://pub-b8f60fa2ac10486ba085807bac3019f1.r2.dev/NUEVO%20PERFIL%20DE%20PAGINA%20WEB/NUEVA%20FOTO%20PARA%20LA%20PORTADA%20EMILIANA.jpeg?v=20260820-2010';
  const ADMIN_PANEL_URL =
    'https://www.emilianarestaurantebuffetcusco.com.pe/panel';
  const CARTA_ADMIN_URL = '/admin';
  const AGENCY_LANGUAGE_STORAGE_KEY = 'emiliana-language-v2';
  const AGENCY_TRANSLATIONS = {
    es: {
      kicker: 'AGENCIAS · OPERADORES · GRUPOS',
      titleLead: 'Una experiencia cultural',
      titleEm: 'pensada para sus pasajeros.',
      intro: 'Emiliana reúne gastronomía peruana, buffet cultural, música y danzas tradicionales en un espacio preparado para recibir grupos con una atención cercana y organizada.',
      quickLabel: 'ACCESOS PARA AGENCIAS',
      dossierEyebrow: 'INFORMACIÓN COMERCIAL',
      dossier: 'Ver y descargar dossier',
      visitEyebrow: 'ATENCIÓN PERSONALIZADA',
      visit: 'Sacar cita',
      proposalLabel: 'PROPUESTA PARA AGENCIAS',
      infoTitle: 'Cusco se disfruta también alrededor de la mesa.',
      lead: 'Integre a su itinerario una experiencia que combina sabores del Perú y cultura viva. Nuestro equipo acompaña la coordinación de cada visita para ofrecer una recepción ordenada y memorable.',
      benefit1Title: 'Buffet cultural',
      benefit1Text: 'Variedad gastronómica peruana para una experiencia completa.',
      benefit2Title: 'Música y danzas',
      benefit2Text: 'Una propuesta que conecta a los visitantes con la tradición cusqueña.',
      benefit3Title: 'Atención para grupos',
      benefit3Text: 'Coordinación anticipada para agencias, delegaciones y operadores.',
      mediaLabel: 'CONOZCA EMILIANA',
      mediaTitle: 'Gastronomía y cultura en un solo lugar.',
      mediaText: 'Reproduzca la presentación sin salir de esta página.',
      footerGroups: 'Grupos y agencias',
      quickAria: 'Accesos rápidos para agencias',
      dossierAria: 'Abrir el dossier para agencias en una pestaña nueva',
      visitAria: 'Ir al formulario para sacar una cita',
      videoTitle: 'Presentación de Emiliana Restaurant Cultural Buffet'
    },
    en: {
      kicker: 'AGENCIES · TOUR OPERATORS · GROUPS',
      titleLead: 'A cultural experience',
      titleEm: 'designed for your guests.',
      intro: 'Emiliana brings together Peruvian cuisine, a cultural buffet, music and traditional dance in a venue prepared to welcome groups with attentive, well-organized service.',
      quickLabel: 'AGENCY RESOURCES',
      dossierEyebrow: 'COMMERCIAL INFORMATION',
      dossier: 'View and download dossier',
      visitEyebrow: 'PERSONAL ASSISTANCE',
      visit: 'Book appointment',
      proposalLabel: 'PROPOSAL FOR AGENCIES',
      infoTitle: 'Cusco can also be enjoyed around the table.',
      lead: 'Add to your itinerary an experience that brings together the flavors of Peru and living culture. Our team coordinates every visit to provide an organized and memorable welcome.',
      benefit1Title: 'Cultural buffet',
      benefit1Text: 'A variety of Peruvian cuisine for a complete experience.',
      benefit2Title: 'Music and dance',
      benefit2Text: 'An experience that connects visitors with Cusco tradition.',
      benefit3Title: 'Group service',
      benefit3Text: 'Advance coordination for agencies, delegations and tour operators.',
      mediaLabel: 'DISCOVER EMILIANA',
      mediaTitle: 'Gastronomy and culture in one place.',
      mediaText: 'Watch the presentation without leaving this page.',
      footerGroups: 'Groups and agencies',
      quickAria: 'Quick access for agencies',
      dossierAria: 'Open the agency dossier in a new tab',
      visitAria: 'Go to the appointment form',
      videoTitle: 'Emiliana Restaurant Cultural Buffet presentation'
    },
    fr: {
      kicker: 'AGENCES · TOUR-OPÉRATEURS · GROUPES',
      titleLead: 'Une expérience culturelle',
      titleEm: 'pensée pour vos voyageurs.',
      intro: 'Emiliana réunit cuisine péruvienne, buffet culturel, musique et danses traditionnelles dans un espace conçu pour accueillir les groupes avec un service attentionné et organisé.',
      quickLabel: 'ACCÈS POUR LES AGENCES',
      dossierEyebrow: 'INFORMATIONS COMMERCIALES',
      dossier: 'Voir et télécharger le dossier',
      visitEyebrow: 'ACCUEIL PERSONNALISÉ',
      visit: 'Prendre rendez-vous',
      proposalLabel: 'PROPOSITION POUR LES AGENCES',
      infoTitle: 'Cusco se savoure aussi autour de la table.',
      lead: 'Intégrez à votre itinéraire une expérience qui associe les saveurs du Pérou et la culture vivante. Notre équipe coordonne chaque visite pour offrir un accueil fluide et mémorable.',
      benefit1Title: 'Buffet culturel',
      benefit1Text: 'Une cuisine péruvienne variée pour une expérience complète.',
      benefit2Title: 'Musique et danses',
      benefit2Text: 'Une proposition qui relie les visiteurs à la tradition de Cusco.',
      benefit3Title: 'Accueil des groupes',
      benefit3Text: 'Coordination anticipée pour agences, délégations et tour-opérateurs.',
      mediaLabel: 'DÉCOUVREZ EMILIANA',
      mediaTitle: 'Gastronomie et culture en un seul lieu.',
      mediaText: 'Regardez la présentation sans quitter cette page.',
      footerGroups: 'Groupes et agences',
      quickAria: 'Accès rapides pour les agences',
      dossierAria: 'Ouvrir le dossier agences dans un nouvel onglet',
      visitAria: 'Accéder au formulaire de rendez-vous',
      videoTitle: 'Présentation d’Emiliana Restaurant Cultural Buffet'
    },
    it: {
      kicker: 'AGENZIE · TOUR OPERATOR · GRUPPI',
      titleLead: 'Un’esperienza culturale',
      titleEm: 'pensata per i vostri ospiti.',
      intro: 'Emiliana unisce cucina peruviana, buffet culturale, musica e danze tradizionali in uno spazio attrezzato per accogliere gruppi con un servizio attento e organizzato.',
      quickLabel: 'ACCESSI PER LE AGENZIE',
      dossierEyebrow: 'INFORMAZIONI COMMERCIALI',
      dossier: 'Visualizza e scarica il dossier',
      visitEyebrow: 'ASSISTENZA PERSONALIZZATA',
      visit: 'Prenota appuntamento',
      proposalLabel: 'PROPOSTA PER LE AGENZIE',
      infoTitle: 'Cusco si vive anche intorno alla tavola.',
      lead: 'Inserite nel vostro itinerario un’esperienza che unisce i sapori del Perù e la cultura viva. Il nostro team coordina ogni visita per offrire un’accoglienza ordinata e memorabile.',
      benefit1Title: 'Buffet culturale',
      benefit1Text: 'Una varietà di cucina peruviana per un’esperienza completa.',
      benefit2Title: 'Musica e danze',
      benefit2Text: 'Una proposta che avvicina i visitatori alla tradizione di Cusco.',
      benefit3Title: 'Servizio per gruppi',
      benefit3Text: 'Coordinamento anticipato per agenzie, delegazioni e tour operator.',
      mediaLabel: 'SCOPRI EMILIANA',
      mediaTitle: 'Gastronomia e cultura in un unico luogo.',
      mediaText: 'Guarda la presentazione senza uscire da questa pagina.',
      footerGroups: 'Gruppi e agenzie',
      quickAria: 'Accessi rapidi per le agenzie',
      dossierAria: 'Apri il dossier per le agenzie in una nuova scheda',
      visitAria: 'Vai al modulo di prenotazione',
      videoTitle: 'Presentazione di Emiliana Restaurant Cultural Buffet'
    },
    de: {
      kicker: 'AGENTUREN · REISEVERANSTALTER · GRUPPEN',
      titleLead: 'Ein kulturelles Erlebnis',
      titleEm: 'für Ihre Gäste konzipiert.',
      intro: 'Emiliana verbindet peruanische Küche, Kulturbuffet, Musik und traditionelle Tänze in einem für Gruppen vorbereiteten Ambiente mit aufmerksamem und organisiertem Service.',
      quickLabel: 'ZUGÄNGE FÜR AGENTUREN',
      dossierEyebrow: 'GESCHÄFTSINFORMATIONEN',
      dossier: 'Dossier ansehen und herunterladen',
      visitEyebrow: 'PERSÖNLICHE BETREUUNG',
      visit: 'Termin vereinbaren',
      proposalLabel: 'ANGEBOT FÜR AGENTUREN',
      infoTitle: 'Cusco lässt sich auch am Tisch erleben.',
      lead: 'Ergänzen Sie Ihre Reiseroute um ein Erlebnis, das Perus Aromen mit lebendiger Kultur verbindet. Unser Team koordiniert jeden Besuch für einen geordneten und unvergesslichen Empfang.',
      benefit1Title: 'Kulturbuffet',
      benefit1Text: 'Vielfältige peruanische Küche für ein umfassendes Erlebnis.',
      benefit2Title: 'Musik und Tänze',
      benefit2Text: 'Ein Angebot, das Gäste mit der Tradition Cuscos verbindet.',
      benefit3Title: 'Service für Gruppen',
      benefit3Text: 'Frühzeitige Abstimmung für Agenturen, Delegationen und Reiseveranstalter.',
      mediaLabel: 'EMILIANA ENTDECKEN',
      mediaTitle: 'Gastronomie und Kultur an einem Ort.',
      mediaText: 'Sehen Sie die Präsentation direkt auf dieser Seite.',
      footerGroups: 'Gruppen und Agenturen',
      quickAria: 'Schnellzugänge für Agenturen',
      dossierAria: 'Agentur-Dossier in einem neuen Tab öffnen',
      visitAria: 'Zum Terminformular wechseln',
      videoTitle: 'Präsentation von Emiliana Restaurant Cultural Buffet'
    },
    pt: {
      kicker: 'AGÊNCIAS · OPERADORES · GRUPOS',
      titleLead: 'Uma experiência cultural',
      titleEm: 'pensada para seus passageiros.',
      intro: 'A Emiliana reúne gastronomia peruana, buffet cultural, música e danças tradicionais em um espaço preparado para receber grupos com atendimento próximo e organizado.',
      quickLabel: 'ACESSOS PARA AGÊNCIAS',
      dossierEyebrow: 'INFORMAÇÃO COMERCIAL',
      dossier: 'Ver e baixar o dossiê',
      visitEyebrow: 'ATENDIMENTO PERSONALIZADO',
      visit: 'Agendar reserva',
      proposalLabel: 'PROPOSTA PARA AGÊNCIAS',
      infoTitle: 'Cusco também se aprecia ao redor da mesa.',
      lead: 'Inclua em seu roteiro uma experiência que une os sabores do Peru e a cultura viva. Nossa equipe coordena cada visita para oferecer uma recepção organizada e memorável.',
      benefit1Title: 'Buffet cultural',
      benefit1Text: 'Variedade da gastronomia peruana para uma experiência completa.',
      benefit2Title: 'Música e danças',
      benefit2Text: 'Uma proposta que conecta os visitantes à tradição de Cusco.',
      benefit3Title: 'Atendimento a grupos',
      benefit3Text: 'Coordenação antecipada para agências, delegações e operadores.',
      mediaLabel: 'CONHEÇA A EMILIANA',
      mediaTitle: 'Gastronomia e cultura em um só lugar.',
      mediaText: 'Assista à apresentação sem sair desta página.',
      footerGroups: 'Grupos e agências',
      quickAria: 'Acessos rápidos para agências',
      dossierAria: 'Abrir o dossiê para agências em uma nova aba',
      visitAria: 'Ir ao formulário de reserva',
      videoTitle: 'Apresentação do Emiliana Restaurant Cultural Buffet'
    },
    zh: {
      kicker: '旅行社 · 旅游运营商 · 团体',
      titleLead: '一场文化体验',
      titleEm: '专为您的宾客而设计。',
      intro: 'Emiliana 将秘鲁美食、文化自助餐、音乐和传统舞蹈融为一体，并以周到、有序的服务迎接各类团体。',
      quickLabel: '旅行社快捷入口',
      dossierEyebrow: '商务资料',
      dossier: '查看并下载资料册',
      visitEyebrow: '专属服务',
      visit: '预约',
      proposalLabel: '旅行社合作方案',
      infoTitle: '在餐桌旁，也能感受库斯科。',
      lead: '将秘鲁风味与鲜活文化相结合的体验加入您的行程。我们的团队会提前协调每次到访，确保接待有序且令人难忘。',
      benefit1Title: '文化自助餐',
      benefit1Text: '丰富多样的秘鲁美食，带来完整体验。',
      benefit2Title: '音乐与舞蹈',
      benefit2Text: '让访客与库斯科传统文化相连。',
      benefit3Title: '团体接待',
      benefit3Text: '为旅行社、代表团和运营商提供提前协调。',
      mediaLabel: '了解 EMILIANA',
      mediaTitle: '美食与文化汇聚一处。',
      mediaText: '无需离开本页面即可观看介绍。',
      footerGroups: '团体与旅行社',
      quickAria: '旅行社快捷入口',
      dossierAria: '在新标签页打开旅行社资料册',
      visitAria: '前往预约表单',
      videoTitle: 'Emiliana Restaurant Cultural Buffet 介绍'
    },
    ja: {
      kicker: '旅行会社 · ツアーオペレーター · 団体',
      titleLead: '文化を味わう体験',
      titleEm: '大切なお客様のために。',
      intro: 'Emilianaでは、ペルー料理、文化ビュッフェ、音楽、伝統舞踊を、団体のお客様に配慮した整然かつ丁寧なサービスとともにお楽しみいただけます。',
      quickLabel: '旅行会社向けメニュー',
      dossierEyebrow: '営業資料',
      dossier: '資料を見る・ダウンロード',
      visitEyebrow: '個別対応',
      visit: '予約する',
      proposalLabel: '旅行会社向けご提案',
      infoTitle: '食卓を囲みながら、クスコを満喫。',
      lead: 'ペルーの味と生きた文化が一つになった体験を旅程に加えてください。スムーズで心に残るお迎えのため、担当チームが事前に調整いたします。',
      benefit1Title: '文化ビュッフェ',
      benefit1Text: '多彩なペルー料理を楽しむ充実した体験。',
      benefit2Title: '音楽と舞踊',
      benefit2Text: 'クスコの伝統を身近に感じられるプログラム。',
      benefit3Title: '団体対応',
      benefit3Text: '旅行会社、団体、ツアーオペレーター向けの事前調整。',
      mediaLabel: 'EMILIANAについて',
      mediaTitle: '美食と文化を一つの場所で。',
      mediaText: 'このページ内で紹介動画をご覧いただけます。',
      footerGroups: '団体・旅行会社',
      quickAria: '旅行会社向けクイックアクセス',
      dossierAria: '旅行会社向け資料を新しいタブで開く',
      visitAria: '予約フォームへ移動',
      videoTitle: 'Emiliana Restaurant Cultural Buffet 紹介動画'
    },
    ko: {
      kicker: '여행사 · 투어 운영사 · 단체',
      titleLead: '문화가 살아 있는 경험',
      titleEm: '소중한 고객을 위해 준비했습니다.',
      intro: 'Emiliana는 페루 요리, 문화 뷔페, 음악과 전통 무용을 세심하고 체계적인 단체 서비스와 함께 제공합니다.',
      quickLabel: '여행사 전용 메뉴',
      dossierEyebrow: '영업 자료',
      dossier: '자료 보기 및 다운로드',
      visitEyebrow: '맞춤 상담',
      visit: '예약하기',
      proposalLabel: '여행사 제안',
      infoTitle: '식탁에서도 쿠스코를 온전히 경험하세요.',
      lead: '페루의 맛과 살아 있는 문화가 어우러진 경험을 일정에 추가해 보세요. 저희 팀이 방문을 미리 조율하여 체계적이고 기억에 남는 환영을 준비합니다.',
      benefit1Title: '문화 뷔페',
      benefit1Text: '다양한 페루 요리로 완성되는 풍성한 경험.',
      benefit2Title: '음악과 무용',
      benefit2Text: '방문객을 쿠스코의 전통과 이어 주는 프로그램.',
      benefit3Title: '단체 서비스',
      benefit3Text: '여행사, 대표단 및 투어 운영사를 위한 사전 조율.',
      mediaLabel: 'EMILIANA 알아보기',
      mediaTitle: '미식과 문화를 한곳에서.',
      mediaText: '페이지를 벗어나지 않고 소개 영상을 시청하세요.',
      footerGroups: '단체 및 여행사',
      quickAria: '여행사 빠른 메뉴',
      dossierAria: '여행사 자료를 새 탭에서 열기',
      visitAria: '예약 양식으로 이동',
      videoTitle: 'Emiliana Restaurant Cultural Buffet 소개 영상'
    }
  };

  let adminButtonsObserver = null;
  let agencyLanguageReady = false;

  function readAgencyLanguage() {
    try {
      const stored = localStorage.getItem(AGENCY_LANGUAGE_STORAGE_KEY);
      if (stored && AGENCY_TRANSLATIONS[stored]) return stored;
    } catch {}
    return 'es';
  }

  function applyAgencyTranslation(language) {
    const section = document.querySelector('#agencias');
    const translation = AGENCY_TRANSLATIONS[language] || AGENCY_TRANSLATIONS.es;
    if (!section) return;

    section.querySelectorAll('[data-agency-i18n]').forEach(function (element) {
      const key = element.dataset.agencyI18n;
      if (translation[key]) element.textContent = translation[key];
    });

    section.lang = AGENCY_TRANSLATIONS[language] ? language : 'es';
    section.querySelector('.agency-quick-actions')?.setAttribute(
      'aria-label',
      translation.quickAria
    );
    section.querySelectorAll('a[href*="emiliana-guia-2026"]').forEach(function (link) {
      link.setAttribute('aria-label', translation.dossierAria);
    });
    section.querySelectorAll('[data-appointment-link]').forEach(function (link) {
      link.setAttribute('aria-label', translation.visitAria);
    });
    section.querySelector('.agency-player iframe')?.setAttribute(
      'title',
      translation.videoTitle
    );
  }

  function installAgencyLanguageSupport() {
    applyAgencyTranslation(readAgencyLanguage());
    if (agencyLanguageReady) return;

    agencyLanguageReady = true;
    document.addEventListener('click', function (event) {
      const option = event.target.closest?.('.language-option[data-language]');
      if (!option) return;
      window.setTimeout(function () {
        applyAgencyTranslation(option.dataset.language);
      }, 0);
    });
    window.addEventListener('storage', function (event) {
      if (event.key === AGENCY_LANGUAGE_STORAGE_KEY) {
        applyAgencyTranslation(event.newValue || 'es');
      }
    });
  }

  function keepAgenciesInternal() {
    const agencyLink = Array.from(
      document.querySelectorAll('header .links > a')
    ).find(function (link) {
      const label = (link.textContent || '').trim();
      const href = link.getAttribute('href') || '';
      return /^agencias$/i.test(label) || /emiliana-guia-2026/i.test(href);
    });

    if (!(agencyLink instanceof HTMLAnchorElement)) return;

    agencyLink.href = '#agencias';
    agencyLink.dataset.v = 'agencias';
    agencyLink.removeAttribute('target');
    agencyLink.removeAttribute('rel');
    agencyLink.setAttribute('aria-label', 'Abrir sección para agencias');
  }

  function replaceWelcomeImage() {
    const image = document.querySelector(
      '#homeWelcome .cards .photo:first-child img'
    );

    if (!(image instanceof HTMLImageElement)) return;

    image.removeAttribute('srcset');
    image.removeAttribute('sizes');
    image.removeAttribute('data-image-optimized');
    image.src = NEW_WELCOME_IMAGE;
    image.dataset.originalSrc = NEW_WELCOME_IMAGE;
    image.alt = 'Comensales disfrutando el ambiente de Emiliana';
    image.decoding = 'async';
    image.loading = 'lazy';
    image.style.objectPosition = 'center center';
  }

  function addAreasAdminButton() {
    const areaSection = document.querySelector('#areas');
    if (!areaSection || areaSection.querySelector('.emiliana-home-areas-admin')) {
      return;
    }

    const heading = areaSection.querySelector('.head');
    if (!heading) return;

    const adminButton = document.createElement('a');
    adminButton.className = 'emiliana-home-areas-admin';
    adminButton.href = ADMIN_PANEL_URL;
    adminButton.target = '_blank';
    adminButton.rel = 'noopener noreferrer';
    adminButton.setAttribute(
      'aria-label',
      'Administradores: abrir panel de acceso por área en una pestaña nueva'
    );
    adminButton.innerHTML = `
      <i class="emiliana-home-areas-admin__lock" aria-hidden="true"></i>
      <span>ADMINISTRADORES</span>
      <b aria-hidden="true">↗</b>
    `;
    heading.appendChild(adminButton);
  }

  function addCartaAdminButton() {
    const cartaSection = document.querySelector('#carta');
    if (!cartaSection || cartaSection.querySelector('.emiliana-home-carta-admin')) {
      return;
    }

    const actions = cartaSection.querySelector('.tabs');
    if (!actions) return;

    const adminButton = document.createElement('a');
    adminButton.className = 'emiliana-home-carta-admin';
    adminButton.href = CARTA_ADMIN_URL;
    adminButton.target = '_blank';
    adminButton.rel = 'noopener noreferrer';
    adminButton.setAttribute(
      'aria-label',
      'Administrar carta: abrir acceso privado en una pestaña nueva'
    );
    adminButton.innerHTML = `
      <i class="emiliana-home-carta-admin__lock" aria-hidden="true"></i>
      <span>ADMINISTRAR CARTA</span>
      <b aria-hidden="true">↗</b>
    `;
    actions.appendChild(adminButton);
  }

  function keepAdminButtonsVisible() {
    keepAgenciesInternal();
    addAreasAdminButton();
    addCartaAdminButton();

    if (adminButtonsObserver || !document.body) return;

    adminButtonsObserver = new MutationObserver(function () {
      addAreasAdminButton();
      addCartaAdminButton();
    });
    adminButtonsObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /* El script se carga con defer: normalmente el documento ya está completo. */
  replaceWelcomeImage();
  keepAdminButtonsVisible();
  installAgencyLanguageSupport();
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      function () {
        replaceWelcomeImage();
        keepAdminButtonsVisible();
        installAgencyLanguageSupport();
      },
      { once: true }
    );
  }
  window.addEventListener('hashchange', keepAdminButtonsVisible);

  /* Carga todas las funciones actuales: idiomas, carta, áreas, reservas, etc. */
  const originalScript = document.createElement('script');
  originalScript.src =
    'https://emiliana-restaurante-oficial-etjm75g81.vercel.app/site-fix.js?v=20260813-18';
  originalScript.async = false;
  originalScript.onload = function () {
    keepAdminButtonsVisible();
    installAgencyLanguageSupport();
    [80, 250, 700, 1500].forEach(function (delay) {
      window.setTimeout(function () {
        keepAdminButtonsVisible();
        applyAgencyTranslation(readAgencyLanguage());
      }, delay);
    });
  };
  document.head.append(originalScript);
})();
