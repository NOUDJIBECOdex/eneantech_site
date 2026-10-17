/* ==========================================================================
   ENEANTECH — blog.js
   Gestion dynamique du Blog, filtres de catégories et modale de lecture d'articles
   ========================================================================== */
(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* 01. GESTION DU THÈME */
  const themeToggle = $('#theme-toggle');
  const root = document.documentElement;

  const applyTheme = (theme, animate = false) => {
    if (animate) {
      root.classList.add('theme-anim');
      setTimeout(() => root.classList.remove('theme-anim'), 450);
    }
    root.setAttribute('data-theme', theme);
    localStorage.setItem('eneantech-theme', theme);
  };

  const savedTheme = localStorage.getItem('eneantech-theme') || 'dark';
  applyTheme(savedTheme, false);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next, true);
    });
  }

  /* 02. MENU MOBILE */
  const burger = $('#burger');
  const nav = $('#nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
    });
  }

  /* 03. HEADER SCROLL & PROGRESSION */
  const header = $('#header');
  const progressBar = $('#progress');
  const toTop = $('#scroll-top');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 20);
    if (toTop) toTop.classList.toggle('is-visible', y > 400);

    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? y / docHeight : 0;
      progressBar.style.setProperty('--p', Math.min(Math.max(progress, 0), 1));
    }
  }, { passive: true });

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 04. BASE DE DONNÉES DES ARTICLES COMPLETS (POUR LE RÉFÉRENCEMENT ET LA LECTURE IMMERSIVE) */
  const ARTICLES = {
    'fibre-optique-cisco-2026': {
      category: 'Réseaux & Télécoms',
      badge: 'Filière d\'Avenir',
      title: 'Pourquoi apprendre la Fibre Optique et les Réseaux Cisco en 2026 à Maroua ?',
      date: '15 Octobre 2026',
      readTime: '4 min de lecture',
      author: 'Mohamadou',
      authorRole: 'Ingénieur Télécoms & Réseaux ENEANTECH',
      authorImg: 'assets/images/team/mohamadou.jpg',
      cover: 'assets/images/services/service-reseaux.jpg',
      whatsappCta: 'Bonjour ENEANTECH, j\'ai lu votre article sur la fibre optique et je souhaite des informations sur la formation Réseaux.',
      body: `
        <p>Le Grand Nord Cameroun et la région de l'Extrême-Nord connaissent une accélération sans précédent du déploiement des infrastructures télécoms. Alors que les entreprises, les banques, les universités et les institutions migrent vers le très haut débit, une pénurie aiguë frappe le marché : <strong>le manque de techniciens qualifiés sur le terrain</strong>.</p>

        <h4>1. La soudure de fibre optique : une compétence rare et surpayée</h4>
        <p>Contrairement aux idées reçues, la fibre optique ne tolère aucune approximation. Réaliser une soudure à l'arc (fusion thermique), utiliser une cliveuse de précision et tester l'atténuation en dB avec un réflectomètre optique (OTDR) sont des compétences que l'université n'enseigne pratiquement jamais en pratique.</p>
        <blockquote>« Chez ENEANTECH, nos apprenants ne regardent pas des vidéos théoriques : ils dénudent la fibre, soudent avec de vraies soudeuses professionnelles et montent des tiroirs optiques dès les premières semaines. »</blockquote>

        <h4>2. La domination des équipements Cisco et MikroTik</h4>
        <p>Dans les PME et grandes institutions de Maroua et Garoua, plus de 80% des architectures reposent sur du matériel Cisco et MikroTik. Savoir configurer un VLAN, sécuriser un pare-feu, router des paquets et déployer un Wi-Fi d'entreprise managé garantit une employabilité immédiate auprès des Fournisseurs d'Accès Internet (FAI) et des banques.</p>

        <div class="article-modal__box">
          <strong>💡 Le conseil de notre expert Réseaux :</strong>
          <p>Si vous aimez le concret, le matériel et le terrain, la filière Réseaux & Télécoms est celle qui offre le taux d'insertion professionnelle le plus rapide. Nos promotions sont limitées à 12 places par session pour garantir une machine et un poste de câblage par étudiant.</p>
        </div>
      `,
      actionBtnText: 'Découvrir la formation Réseaux & Télécoms',
      actionBtnLink: 'index.html#formations'
    },
    'saas-mobile-money-cameroun': {
      category: 'Développement Web & SaaS',
      badge: 'Ingénierie Logicielle',
      title: 'SaaS & E-commerce au Cameroun : Comment intégrer Mobile Money (MTN & Orange) en toute sécurité',
      date: '12 Octobre 2026',
      readTime: '5 min de lecture',
      author: 'Agbo Martin',
      authorRole: 'Lead Développeur Full-Stack ENEANTECH',
      authorImg: 'assets/images/team/agbo-martin.jpg',
      cover: 'assets/images/services/service-web.jpg',
      whatsappCta: 'Bonjour ENEANTECH, je souhaite concevoir une application SaaS avec paiement Mobile Money.',
      body: `
        <p>En Afrique subsaharienne et particulièrement au Cameroun, moins de 5% de la population utilise activement une carte bancaire Visa ou Mastercard pour ses achats en ligne. Si votre plateforme numérique n'accepte pas <strong>Orange Money</strong> et <strong>MTN Mobile Money</strong>, vous vous coupez de 95% de vos revenus potentiels.</p>

        <h4>1. L'architecture d'intégration des paiements locaux</h4>
        <p>Intégrer les APIs Mobile Money exige une rigueur extrême. Entre les coupures de réseau télécoms momentanées et les délais d'approbation USSD sur le téléphone du client, votre backend doit implémenter un système d'états asynchrone (Pending, Confirmed, Expired, Failed) appuyé par des <strong>Webhooks sécurisés</strong> avec validation de signature cryptographique.</p>

        <h4>2. Comment éviter les fraudes et doubles débits</h4>
        <p>Une erreur classique des développeurs débutants est de faire confiance aux données transmises côté client (frontend). Chez ENEANTECH, nos architectures logicielles vérifient chaque transaction côté serveur en interrogeant directement le registre de l'opérateur avec clé d'idempotence unique.</p>

        <div class="article-modal__box">
          <strong>🚀 Vous avez une idée de logiciel ou de SaaS ?</strong>
          <p>Qu'il s'agisse d'un système de gestion hôtelière, d'une plateforme de cours en ligne ou d'une boutique e-commerce, l'équipe d'ingénierie logicielle d'ENEANTECH vous accompagne de la conception du cahier des charges jusqu'au déploiement sécurisé.</p>
        </div>
      `,
      actionBtnText: 'Demander un devis pour votre application',
      actionBtnLink: 'index.html#devis'
    },
    'cybersecurite-failles-pme': {
      category: 'Cybersécurité & Systèmes',
      badge: 'Sécurité & Audit',
      title: 'Cybersécurité des PME : 5 failles critiques qui menacent les entreprises locales',
      date: '08 Octobre 2026',
      readTime: '6 min de lecture',
      author: 'Mbaihilamde Noudjibé',
      authorRole: 'Directeur Technique ENEANTECH',
      authorImg: 'assets/images/team/noudjibe-martin.jpg',
      cover: 'assets/images/services/hero.jpg',
      whatsappCta: 'Bonjour ENEANTECH, je souhaite un audit de cybersécurité pour mon entreprise.',
      body: `
        <p>Nombreux sont les chefs d'entreprise à Maroua ou à Douala qui pensent que les cyberattaques ne visent que les multinationales ou les banques centrales. C'est une illusion dangereuse. En réalité, <strong>les PME constituent la cible numéro un des rançongiciels (ransomwares)</strong> car leurs défenses sont quasi-inexistantes.</p>

        <h4>1. Les 5 vulnérabilités les plus courantes constatées lors de nos audits :</h4>
        <ul>
          <li><strong>Mots de passe faibles ou uniques :</strong> La même combinaison sert à déverrouiller le PC de la comptabilité, le compte e-mail et le routeur Wi-Fi.</li>
          <li><strong>Absence de sauvegardes hors-ligne (3-2-1) :</strong> Si les données sont cryptées par un malware, l'entreprise perd 10 ans d'historique comptable et client.</li>
          <li><strong>Wi-Fi invité et réseau administratif mélangés :</strong> N'importe quel client au salon d'accueil peut intercepter le trafic interne sans segmentation par VLAN.</li>
          <li><strong>Systèmes Windows et logiciels non mis à jour :</strong> Utilisation de versions obsolètes vulnérables aux failles Zero-Day connues.</li>
          <li><strong>Ingénierie sociale & Phishing WhatsApp/Mail :</strong> Des collaborateurs cliquent sur des faux reçus ou des liens piégés.</li>
        </ul>

        <div class="article-modal__box">
          <strong>🛡️ Protégez votre organisation avant l'incident :</strong>
          <p>ENEANTECH réalise des audits complets de vulnérabilité, le durcissement de vos serveurs Linux/Windows et forme votre personnel aux réflexes élémentaires de sécurité numérique.</p>
        </div>
      `,
      actionBtnText: 'Programmer un audit de sécurité informatique',
      actionBtnLink: 'index.html#contact'
    },
    'reconversion-freelance-maroua': {
      category: 'Formations & Carrières',
      badge: 'Success Story & Métiers',
      title: 'Reconversion Numérique : Comment partir de zéro et décrocher son premier contrat freelance',
      date: '01 Octobre 2026',
      readTime: '4 min de lecture',
      author: 'Ramdam Michel',
      authorRole: 'Co-fondateur & Responsable Opérations',
      authorImg: 'assets/images/team/ramdam-michel.jpeg',
      cover: 'assets/images/services/service-infographie.jpg',
      whatsappCta: 'Bonjour ENEANTECH, je souhaite des conseils pour ma reconversion dans le numérique.',
      body: `
        <p>Est-il possible de vivre confortablement du digital depuis Maroua sans avoir fait 5 ans d'études universitaires en informatique ? La réponse est un <strong>OUI catégorique</strong>, à condition de choisir des compétences à fort rendement et de pratiquer sans relâche.</p>

        <h4>1. Pourquoi la théorie académique échoue souvent</h4>
        <p>Trop d'étudiants passent des années à mémoriser des définitions sur papier pour se retrouver désarmés devant un logiciel professionnel. Le marché n'achète pas des diplômes théoriques : <strong>il achète des résultats concrets</strong> (un logo qui sublime une marque, un site web qui charge vite, un réseau qui ne tombe jamais en panne).</p>

        <h4>2. La méthode ENEANTECH : 80% de pratique et un portfolio dès le 2e mois</h4>
        <p>Dès les premières semaines de formation en Infographie ou en Développement Web, nos étudiants travaillent sur des cas réels d'entreprises locales. À la fin de leur cursus, ils ne repartent pas seulement avec une attestation certifiée : ils possèdent un <strong>portfolio professionnel prêt à l'emploi</strong> qu'ils présentent à des clients sur WhatsApp ou sur des plateformes internationales comme Upwork et Fiverr.</p>

        <div class="article-modal__box">
          <strong>🎯 Vous voulez changer de trajectoire en 2026 ?</strong>
          <p>Quel que soit votre âge ou votre niveau d'études initial, nos formateurs vous accompagnent pas à pas avec bienveillance et rigueur. Venez nous rendre visite à Pitoaré pour assister à une démonstration gratuite !</p>
        </div>
      `,
      actionBtnText: 'Rejoindre une session de formation certifiante',
      actionBtnLink: 'index.html#formations'
    }
  };

  /* 05. GESTION DES FILTRES DE CATÉGORIES */
  const filterBtns = $$('.blog-filter-btn');
  const blogCards = $$('.blog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;

      blogCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* 06. MODALE DE LECTURE D'ARTICLE */
  const articleModal = $('#article-modal');
  const articleModalBackdrop = $('#article-modal-backdrop');
  const articleModalClose = $('#article-modal-close');
  const modalCover = $('#article-modal-cover');
  const modalTag = $('#article-modal-tag');
  const modalDate = $('#article-modal-date');
  const modalRead = $('#article-modal-read');
  const modalTitle = $('#article-modal-title');
  const modalAuthorImg = $('#article-modal-author-img');
  const modalAuthorName = $('#article-modal-author-name');
  const modalAuthorRole = $('#article-modal-author-role');
  const modalBody = $('#article-modal-body');
  const modalActionBtn = $('#article-modal-action-btn');
  const modalWaBtn = $('#article-modal-wa-btn');

  const openArticle = articleId => {
    const data = ARTICLES[articleId];
    if (!data || !articleModal) return;

    if (modalCover) modalCover.src = data.cover;
    if (modalTag) modalTag.textContent = data.badge || data.category;
    if (modalDate) modalDate.textContent = data.date;
    if (modalRead) modalRead.textContent = data.readTime;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalAuthorImg) modalAuthorImg.src = data.authorImg;
    if (modalAuthorName) modalAuthorName.textContent = data.author;
    if (modalAuthorRole) modalAuthorRole.textContent = data.authorRole;
    if (modalBody) modalBody.innerHTML = data.body;

    if (modalActionBtn) {
      modalActionBtn.textContent = data.actionBtnText || 'En savoir plus';
      modalActionBtn.href = data.actionBtnLink || 'index.html#contact';
    }

    if (modalWaBtn) {
      const msg = encodeURIComponent(data.whatsappCta || `Bonjour ENEANTECH, je viens de lire l'article : "${data.title}" sur votre blog.`);
      modalWaBtn.href = `https://wa.me/237697484074?text=${msg}`;
    }

    articleModal.classList.add('is-active');
    articleModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeArticle = () => {
    if (!articleModal) return;
    articleModal.classList.remove('is-active');
    articleModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (articleModalClose) articleModalClose.addEventListener('click', closeArticle);
  if (articleModalBackdrop) articleModalBackdrop.addEventListener('click', closeArticle);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && articleModal && articleModal.classList.contains('is-active')) {
      closeArticle();
    }
  });

  // Déclencheurs d'ouverture des articles
  $$('[data-article]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const id = el.dataset.article;
      openArticle(id);
    });
  });

  /* 07. FORMULAIRE NEWSLETTER SUR LA PAGE BLOG */
  const newsletterForm = $('#blog-newsletter-form');
  const newsletterBtn = $('#blog-newsletter-btn');
  const confirmModal = $('#confirm-modal');
  const confirmModalClose = $('#confirm-modal-close');
  const confirmModalBtnClose = $('#confirm-modal-btn-close');
  const confirmModalBackdrop = $('#confirm-modal-backdrop');

  const showConfirm = () => {
    if (!confirmModal) return;
    confirmModal.classList.add('is-active');
    confirmModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const hideConfirm = () => {
    if (!confirmModal) return;
    confirmModal.classList.remove('is-active');
    confirmModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (confirmModalClose) confirmModalClose.addEventListener('click', hideConfirm);
  if (confirmModalBtnClose) confirmModalBtnClose.addEventListener('click', hideConfirm);
  if (confirmModalBackdrop) confirmModalBackdrop.addEventListener('click', hideConfirm);

  if (newsletterForm && newsletterBtn) {
    newsletterForm.addEventListener('submit', async e => {
      e.preventDefault();
      const origText = newsletterBtn.textContent;
      newsletterBtn.disabled = true;
      newsletterBtn.textContent = 'Validation…';

      try {
        const formData = new FormData(newsletterForm);
        await fetch('https://formspree.io/f/mqabwajw', {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });
        newsletterForm.reset();
        showConfirm();
      } catch (err) {
        showConfirm();
      } finally {
        newsletterBtn.disabled = false;
        newsletterBtn.textContent = origText;
      }
    });
  }

})();
