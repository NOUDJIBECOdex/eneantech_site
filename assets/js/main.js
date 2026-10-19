/* ==========================================================================
   ENEANTECH — main.js
   - Thème Clair / Sombre (sauvegardé en localStorage)
   - Barre de progression de lecture & Header au scroll
   - Menu mobile fluide
   - Défilement & apparitions animées (ScrollReveal avec delay dynamique)
   - Effet Spotlight lumineux au survol des cartes (.glass)
   - Compteurs numériques animés
   - Filtre des formations interactif
   - Synchronisation des boutons CTA avec les formulaires
   - Envoi Ajax vers Formspree avec confirmation visuelle
   - Passerelle directe devis vers WhatsApp
   ========================================================================== */
(function () {
  'use strict';

  /* ----- CONFIGURATION ----- */
  const CONFIG = {
    whatsappNumber: '237697484074',                    // WhatsApp officiel (+237 697 48 40 74)
    formEndpoint: 'https://formspree.io/f/mqabwajw',    // Formspree relié à nmbaihilamde@gmail.com
    contactEmail: 'nmbaihilamde@gmail.com'
  };

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ==========================================================================
     01. GESTION DU THÈME CLAIR / SOMBRE
     ========================================================================== */
  const themeToggle = $('#theme-toggle');
  const root = document.documentElement;

  const getPreferredTheme = () => {
    const saved = localStorage.getItem('eneantech-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Thème fétiche par défaut : Bleu nuit / Sombre
  };

  const applyTheme = (theme, animate = false) => {
    if (animate) {
      root.classList.add('theme-anim');
      setTimeout(() => root.classList.remove('theme-anim'), 450);
    }
    root.setAttribute('data-theme', theme);
    localStorage.setItem('eneantech-theme', theme);
  };

  // Initialisation immédiate du thème
  applyTheme(getPreferredTheme(), false);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next, true);
    });
  }

  /* ==========================================================================
     02. ANNÉE DU FOOTER & BARRE DE PROGRESSION
     ========================================================================== */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const progressBar = $('#progress');
  const updateProgress = () => {
    if (!progressBar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
    progressBar.style.setProperty('--p', Math.min(Math.max(progress, 0), 1));
  };

  /* ==========================================================================
     03. HEADER AU DÉFILEMENT & BOUTON RETOUR EN HAUT
     ========================================================================== */
  const header = $('#header');
  const toTop = $('#scroll-top');

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 20);
    if (toTop) toTop.classList.toggle('is-visible', y > 500);
    updateProgress();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     04. MENU MOBILE
     ========================================================================== */
  const burger = $('#burger');
  const nav = $('#nav');

  const closeMenu = () => {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    // Fermer le menu sur clic d'un lien standard ou d'un item déroulant (mais pas sur le bouton dropdown)
    $$('.nav__link:not(.nav__link--dropdown), .nav__dropdown-item').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeMenu();
        const dd = $('#nav-solutions');
        if (dd) dd.classList.remove('is-open');
      }
    });
  }

  // Interaction menu déroulant Solutions
  const dropdownBtn = $('#solutions-btn');
  const dropdownItem = $('#nav-solutions');
  if (dropdownBtn && dropdownItem) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownItem.classList.toggle('is-open');
      dropdownBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('is-open');
        dropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     05. LIENS ACTIFS AU SCROLL (SCROLLSPY)
     ========================================================================== */
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('is-active', href === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ==========================================================================
     06. ANIMATIONS AU DÉFILEMENT & PARALLAXE LÉGÈRE
     ========================================================================== */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay ? parseFloat(el.dataset.delay) * 0.15 : 0;
          el.style.setProperty('--d', `${delay}s`);
          el.classList.add('is-visible');

          // Libère les transitions de survol une fois l'animation d'entrée achevée
          setTimeout(() => el.classList.add('is-done'), (delay + 0.9) * 1000);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible', 'is-done'));
  }

  /* ==========================================================================
     07. SPOTLIGHT CURSEUR SUR LES CARTES EN VERRE (.glass)
     ========================================================================== */
  const glassCards = $$('.glass');
  glassCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  });

  /* ==========================================================================
     08. COMPTEURS NUMÉRIQUES ANIMÉS
     ========================================================================== */
  const counters = $$('[data-count]');
  const animateCounter = el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  } else {
    counters.forEach(c => animateCounter(c));
  }

  /* ==========================================================================
     09. FILTRES DES FORMATIONS
     ========================================================================== */
  const formationFilters = $$('#formations .filter');
  const courses = $$('.course');
  formationFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      formationFilters.forEach(b => b.classList.toggle('is-active', b === btn));
      const f = btn.dataset.filter;
      courses.forEach(c => {
        const matches = f === 'all' || c.dataset.category === f;
        c.classList.toggle('is-hidden', !matches);
        if (matches) {
          c.classList.remove('is-visible');
          void c.offsetWidth; // Reflow pour redéclencher l'animation
          c.classList.add('is-visible');
        }
      });
    });
  });

  // Pré-remplissage automatique de la formation lors d'un clic sur "Session présentielle"
  const formationTriggers = $$('[data-formation]');
  const insFormationSelect = $('#ins-formation');
  if (formationTriggers.length > 0 && insFormationSelect) {
    formationTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const formationName = btn.dataset.formation;
        if (!formationName) return;
        for (let i = 0; i < insFormationSelect.options.length; i++) {
          const opt = insFormationSelect.options[i];
          if (opt.value.toLowerCase().includes(formationName.toLowerCase()) || opt.text.toLowerCase().includes(formationName.toLowerCase())) {
            insFormationSelect.selectedIndex = i;
            break;
          }
        }
        insFormationSelect.style.borderColor = 'var(--cyan-400)';
        insFormationSelect.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.4)';
        setTimeout(() => {
          insFormationSelect.style.borderColor = '';
          insFormationSelect.style.boxShadow = '';
        }, 2000);
      });
    });
  }

  /* ==========================================================================
     09-B. FILTRES & MODALE DU PORTFOLIO (NOS RÉALISATIONS)
     ========================================================================== */
  const portfolioFilters = $$('#portfolio-filters .filter');
  const portfolioCards = $$('.portfolio-card');
  portfolioFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      portfolioFilters.forEach(b => b.classList.toggle('is-active', b === btn));
      const f = btn.dataset.filter;
      portfolioCards.forEach(card => {
        const matches = f === 'all' || card.dataset.category === f;
        card.classList.toggle('is-hidden', !matches);
        if (matches) {
          card.classList.remove('is-visible');
          void card.offsetWidth;
          card.classList.add('is-visible');
        }
      });
    });
  });

  // Modal d'aperçu détaillé des projets
  const portfolioModal = $('#portfolio-modal');
  const modalClose = $('#portfolio-modal-close');
  const modalBackdrop = $('#portfolio-modal-backdrop');

  const openPortfolioModal = card => {
    if (!portfolioModal) return;
    const title = card.dataset.title || '';
    const client = card.dataset.client || '';
    const cat = card.dataset.categoryLabel || '';
    const img = card.dataset.image || '';
    const desc = card.dataset.desc || '';
    const challenge = card.dataset.challenge || '';
    const solution = card.dataset.solution || '';
    const metrics = card.dataset.metrics || '';
    const tech = (card.dataset.tech || '').split(',').filter(Boolean);

    const imgEl = $('#modal-project-img');
    if (imgEl) { imgEl.src = img; imgEl.alt = title; }
    const catEl = $('#modal-project-category');
    if (catEl) catEl.textContent = cat;
    const clientEl = $('#modal-project-client');
    if (clientEl) clientEl.textContent = client;
    const titleEl = $('#modal-project-title');
    if (titleEl) titleEl.textContent = title;
    const descEl = $('#modal-project-desc');
    if (descEl) descEl.textContent = desc;
    const chEl = $('#modal-project-challenge');
    if (chEl) chEl.textContent = challenge;
    const solEl = $('#modal-project-solution');
    if (solEl) solEl.textContent = solution;
    const mEl = $('#modal-project-metrics');
    if (mEl) mEl.textContent = metrics;

    const techEl = $('#modal-project-tech');
    if (techEl) {
      techEl.innerHTML = '';
      tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = t.trim();
        techEl.appendChild(span);
      });
    }

    const waEl = $('#modal-project-whatsapp');
    if (waEl) {
      waEl.href = `https://wa.me/237697484074?text=${encodeURIComponent("Bonjour ENEANTECH, je suis intéressé par votre réalisation : " + title)}`;
    }

    portfolioModal.classList.add('is-active');
    portfolioModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closePortfolioModal = () => {
    if (!portfolioModal) return;
    portfolioModal.classList.remove('is-active');
    portfolioModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  portfolioCards.forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      openPortfolioModal(card);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closePortfolioModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closePortfolioModal);

  const modalCta = $('#modal-project-cta');
  if (modalCta) {
    modalCta.addEventListener('click', () => {
      closePortfolioModal();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && portfolioModal && portfolioModal.classList.contains('is-active')) {
      closePortfolioModal();
    }
  });

  /* ==========================================================================
     10. PRÉ-SÉLECTION DEPUIS LES BOUTONS
     ========================================================================== */
  const setSelectValue = (select, value) => {
    if (!select || !value) return;
    const norm = s => s.replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim().toLowerCase();
    const target = norm(value);
    const opt = Array.from(select.options).find(o => norm(o.textContent).includes(target) || norm(o.value).includes(target));
    if (opt) select.value = opt.value || opt.textContent;
  };

  $$('[data-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.service;
      setSelectValue($('#dv-service'), val);
    });
  });

  $$('[data-formation]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.formation;
      setSelectValue($('#ins-formation'), val);
    });
  });

  /* ==========================================================================
     11. ENVOI DES FORMULAIRES (AJAX VERS FORMSPREE)
     ========================================================================== */
  /* ==========================================================================
     11. MODALE DE CONFIRMATION MODERNE & GESTION DES FORMULAIRES
     ========================================================================== */
  const confirmModal = $('#confirm-modal');
  const confirmModalBackdrop = $('#confirm-modal-backdrop');
  const confirmModalClose = $('#confirm-modal-close');
  const confirmModalBtnClose = $('#confirm-modal-btn-close');
  const confirmModalBadge = $('#confirm-modal-badge');
  const confirmModalTitle = $('#confirm-modal-title');
  const confirmModalDesc = $('#confirm-modal-desc');
  const confirmModalWhatsapp = $('#confirm-modal-whatsapp');

  const showConfirmationModal = ({
    badge = 'Transmission réussie',
    title = 'Demande transmise avec succès !',
    description = 'Votre demande a bien été transmise à l\'équipe technique d\'ENEANTECH. Un consultant prendra contact avec vous très rapidement.',
    whatsappMessage = 'Bonjour ENEANTECH, je viens de soumettre une demande sur votre site.',
    isError = false
  } = {}) => {
    if (!confirmModal) return;

    if (isError) {
      confirmModal.classList.add('is-error');
    } else {
      confirmModal.classList.remove('is-error');
    }

    if (confirmModalBadge) confirmModalBadge.textContent = badge;
    if (confirmModalTitle) confirmModalTitle.textContent = title;
    if (confirmModalDesc) confirmModalDesc.textContent = description;

    if (confirmModalWhatsapp) {
      confirmModalWhatsapp.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    }

    confirmModal.classList.add('is-active');
    confirmModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeConfirmationModal = () => {
    if (!confirmModal) return;
    confirmModal.classList.remove('is-active');
    confirmModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (confirmModalClose) confirmModalClose.addEventListener('click', closeConfirmationModal);
  if (confirmModalBtnClose) confirmModalBtnClose.addEventListener('click', closeConfirmationModal);
  if (confirmModalBackdrop) confirmModalBackdrop.addEventListener('click', closeConfirmationModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && confirmModal && confirmModal.classList.contains('is-active')) {
      closeConfirmationModal();
    }
  });

  const handleFormSubmit = (form, submitBtn, type = 'generic') => {
    if (!form || !submitBtn) return;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const originalLabel = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours…';

      try {
        const formData = new FormData(form);
        const res = await fetch(CONFIG.formEndpoint, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (!res.ok) throw new Error('Erreur de transmission');

        const serviceName = form.querySelector('[name="service"]')?.value || form.querySelector('[name="formation"]')?.value || 'un projet';
        form.reset();

        if (type === 'devis') {
          showConfirmationModal({
            badge: 'Devis Chiffré en Préparation',
            title: 'Demande de Devis Transmise !',
            description: 'Merci ! Votre cahier des charges a bien été reçu. L\'équipe d\'ingénierie ENEANTECH analyse votre besoin pour vous transmettre une proposition technique chiffrée sous 24h ouvrées.',
            whatsappMessage: `Bonjour ENEANTECH, je viens d'envoyer une demande de devis sur votre site pour : "${serviceName}". Pouvons-nous échanger ?`
          });
        } else if (type === 'inscription') {
          showConfirmationModal({
            badge: 'Inscription Enregistrée',
            title: 'Bienvenue chez ENEANTECH !',
            description: 'Votre inscription à la formation a été enregistrée avec succès. Notre responsable pédagogique prendra attache avec vous pour valider votre dossier et préparer votre rentrée.',
            whatsappMessage: `Bonjour ENEANTECH, je viens de soumettre mon inscription pour la formation : "${serviceName}". Merci de m'indiquer la suite !`
          });
        } else {
          showConfirmationModal({
            badge: 'Transmission Réussie',
            title: 'Message Envoyé avec Succès !',
            description: 'Votre demande est bien arrivée dans notre boîte de réception. Un consultant ENEANTECH vous répondra très rapidement.',
            whatsappMessage: 'Bonjour ENEANTECH, je viens de vous envoyer un message depuis votre site web.'
          });
        }

      } catch (err) {
        showConfirmationModal({
          badge: 'Avis de Transmission',
          title: 'Erreur réseau temporaire',
          description: 'Un incident de connexion a empêché la validation automatique par le serveur. Vous pouvez nous transmettre votre demande directement sur WhatsApp en 1 clic.',
          whatsappMessage: 'Bonjour ENEANTECH, j\'ai rencontré un souci pour valider mon formulaire sur le site, voici ma demande :',
          isError: true
        });
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  };

  handleFormSubmit($('#devis-form'), $('#dv-submit'), 'devis');
  handleFormSubmit($('#inscription-form'), $('#ins-submit'), 'inscription');

  /* ==========================================================================
     12. DEVIS ENVOYÉ DIRECTEMENT SUR WHATSAPP
     ========================================================================== */
  const whatsappBtn = $('#dv-whatsapp');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const getVal = id => ($(id)?.value || 'Non renseigné').trim();
      const message =
        `Bonjour ENEANTECH,\n` +
        `Je souhaite faire une demande de devis :\n\n` +
        `👤 *Nom :* ${getVal('#dv-nom')}\n` +
        `📧 *E-mail :* ${getVal('#dv-email')}\n` +
        `🛠 *Service :* ${getVal('#dv-service')}\n` +
        `💰 *Budget estimé :* ${getVal('#dv-budget')}\n` +
        `📝 *Projet :* ${getVal('#dv-message')}`;

      const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  /* ==========================================================================
     13. NEWSLETTER DU FOOTER (SOUMISSION MODERNE AVEC POP-UP)
     ========================================================================== */
  const newsletterForm = $('#newsletter-form');
  const newsletterBtn = $('#newsletter-btn');
  const newsletterMsg = $('#newsletter-msg');

  if (newsletterForm && newsletterBtn) {
    newsletterForm.addEventListener('submit', async e => {
      e.preventDefault();
      const originalHtml = newsletterBtn.innerHTML;

      newsletterBtn.disabled = true;
      newsletterBtn.innerHTML = '…';

      try {
        const formData = new FormData(newsletterForm);
        const res = await fetch(CONFIG.formEndpoint, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (!res.ok) throw new Error('Erreur transmission');

        newsletterForm.reset();
        if (newsletterMsg) newsletterMsg.style.display = 'none';

        showConfirmationModal({
          badge: 'Veille Technologique Activée',
          title: 'Abonnement Confirmé !',
          description: 'Félicitations ! Vous recevrez directement par e-mail les actualités technologiques d\'ENEANTECH, nos innovations, nos lancements de projets et le calendrier des sessions certifiantes.',
          whatsappMessage: 'Bonjour ENEANTECH, je viens de m\'abonner à votre newsletter technologique depuis le site.'
        });

      } catch (err) {
        showConfirmationModal({
          badge: 'Abonnement Newsletter',
          title: 'Transmission ralentie',
          description: 'Votre e-mail n\'a pas pu être validé instantanément par le serveur. Vous pouvez nous écrire directement sur WhatsApp pour être inscrit à la liste de diffusion.',
          whatsappMessage: 'Bonjour ENEANTECH, je souhaite m\'inscrire à votre liste de diffusion newsletter.',
          isError: true
        });
      } finally {
        newsletterBtn.disabled = false;
        newsletterBtn.innerHTML = originalHtml;
      }
    });
  }

  /* ==========================================================================
     14. MODALE MENTIONS LÉGALES & CONFIDENTIALITÉ
     ========================================================================== */
  const infoModal = $('#info-modal');
  const infoModalClose = $('#info-modal-close');
  const infoModalBackdrop = $('#info-modal-backdrop');
  const infoModalTitle = $('#info-modal-title');
  const infoModalBadge = $('#info-modal-badge');
  const infoModalBody = $('#info-modal-body');

  const openInfoModal = type => {
    if (!infoModal || !infoModalTitle || !infoModalBody) return;

    if (type === 'legal') {
      if (infoModalBadge) infoModalBadge.textContent = 'Informations légales & statutaires';
      infoModalTitle.textContent = 'Mentions Légales';
      infoModalBody.innerHTML = `
        <div>
          <h4>Dénomination &amp; Raison Sociale</h4>
          <p><strong>ENEANTECH Sarl</strong> — Société à Responsabilité Limitée d'ingénierie informatique, transformation digitale, réseaux &amp; télécoms et formations professionnelles certifiantes.</p>
        </div>
        <div>
          <h4>Siège Social &amp; Localisation</h4>
          <p>Maroua-Pitoaré, Région de l'Extrême-Nord, Cameroun.</p>
        </div>
        <div>
          <h4>Direction &amp; Contacts</h4>
          <p>Direction Générale : M. Noudjibe Martin<br>
          E-mail : <a href="mailto:eneantechnoudjibe@gmail.com" style="color:var(--cyan-400);">eneantechnoudjibe@gmail.com</a><br>
          Téléphone / WhatsApp : +237 697 48 40 74</p>
        </div>
        <div>
          <h4>Hébergement &amp; Sécurité</h4>
          <p>Plateforme hébergée via infrastructure Cloud haute disponibilité avec chiffrement SSL/TLS de bout en bout et surveillance 24/7.</p>
        </div>
      `;
    } else if (type === 'privacy') {
      if (infoModalBadge) infoModalBadge.textContent = 'Protection des données';
      infoModalTitle.textContent = 'Politique de Confidentialité';
      infoModalBody.innerHTML = `
        <div>
          <h4>Protection de votre vie privée</h4>
          <p>ENEANTECH Sarl accorde la plus haute importance à la protection et au respect de vos données personnelles.</p>
        </div>
        <div>
          <h4>Données collectées</h4>
          <p>Les informations transmises (nom, e-mail, téléphone, cahier des charges) lors d'une demande de devis, d'inscription ou d'abonnement newsletter sont uniquement traitées pour répondre à votre sollicitation commerciale ou pédagogique.</p>
        </div>
        <div>
          <h4>Non-divulgation &amp; Sécurité</h4>
          <p>Vos coordonnées ne sont <strong>en aucun cas commercialisées, vendues ou cédées</strong> à des tiers. Nos systèmes respectent les standards rigoureux de sécurité informatique.</p>
        </div>
        <div>
          <h4>Vos droits</h4>
          <p>Vous disposez d'un droit permanent d'accès, de rectification et d'effacement de vos données. Pour l'exercer, contactez-nous à : <a href="mailto:eneantechnoudjibe@gmail.com" style="color:var(--cyan-400);">eneantechnoudjibe@gmail.com</a>.</p>
        </div>
      `;
    }

    infoModal.classList.add('is-active');
    infoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeInfoModal = () => {
    if (!infoModal) return;
    infoModal.classList.remove('is-active');
    infoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const legalBtn = $('#open-legal-modal');
  if (legalBtn) legalBtn.addEventListener('click', () => openInfoModal('legal'));

  const privacyBtn = $('#open-privacy-modal');
  if (privacyBtn) privacyBtn.addEventListener('click', () => openInfoModal('privacy'));

  if (infoModalClose) infoModalClose.addEventListener('click', closeInfoModal);
  if (infoModalBackdrop) infoModalBackdrop.addEventListener('click', closeInfoModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && infoModal && infoModal.classList.contains('is-active')) {
      closeInfoModal();
    }
  });

  // Gestionnaire sécurisé de fallback pour les avatars d'équipe (remplace onerror inline)
  $$('.member__avatar img').forEach(img => {
    img.addEventListener('error', () => {
      img.remove();
    });
  });

})();
