/* ==========================================================================
   ENEANTECH Academy — Script Interactif E-learning & Formations
   Gestion des filtres, modal syllabus & démo YouTube, intégration Chariow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const escapeHtml = (str) => {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // 1. Filtrage interactif des formations
  const filterBtns = document.querySelectorAll('.academy-filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('is-hidden');
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // 2. Base de données des Syllabi & Vidéos Démo
  const COURSES_DATA = {
    'dev-web-mobile': {
      title: 'Full-Stack Web & Mobile Moderne',
      badge: 'Développement Web & Mobile',
      mentor: 'Agbo Martin & Mbaihilamde Noudjibé',
      duration: '10 semaines · 48 leçons',
      price: '35 000 FCFA',
      oldPrice: '60 000 FCFA',
      chariowUrl: 'https://chariow.com', // Remplacer par le lien produit spécifique
      youtubeId: 'dQw4w9WgXcQ', // ID de démo
      description: 'Maîtrisez HTML5, CSS3, JavaScript moderne (ES6+), React, Node.js et Flutter pour bâtir des applications complètes et prêtes pour le marché camerounais.',
      modules: [
        {
          title: 'Module 1 : Fondations Web & Interfaces Réactives',
          lessons: ['HTML5 sémantique & Accessibilité', 'CSS3 Flexbox, Grid & Glassmorphism Pro', 'JavaScript moderne : Fonctions, DOM, Événements & Async']
        },
        {
          title: 'Module 2 : Frontend Avancé avec React & UI Design',
          lessons: ['Composants React, State, Hooks (useState, useEffect)', 'Gestion de panier et catalogue avec stockage local', 'Consommation d\'API REST et gestion du responsive']
        },
        {
          title: 'Module 3 : Backend Node.js & Base de Données',
          lessons: ['Serveur Express & Architecture MVC', 'Base de données PostgreSQL / MySQL & Modélisation', 'Authentification sécurisée JWT & Protection contre les failles']
        },
        {
          title: 'Module 4 : Développement Mobile & Projet Final Certifiant',
          lessons: ['Introduction Flutter & Dart pour Android', 'Déploiement en production sur Cloud (Vercel / VPS)', 'Soutenance de projet pratique devant le jury ENEANTECH']
        }
      ]
    },
    'reseaux-cisco-fibre': {
      title: 'Réseaux Cisco, MikroTik & Soudure Fibre Optique',
      badge: 'Réseaux & Télécoms',
      mentor: 'Mohamadou (Ingénieur Télécoms)',
      duration: '8 semaines · 36 leçons',
      price: '45 000 FCFA',
      oldPrice: '75 000 FCFA',
      chariowUrl: 'https://chariow.com',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'Apprenez la conception d\'infrastructures d\'entreprise, le routage/switching Cisco, les portails captifs MikroTik et la soudure de fibre optique à l\'arc.',
      modules: [
        {
          title: 'Module 1 : Architecture Réseau & Câblage Structuré',
          lessons: ['Modèle OSI, TCP/IP & Plan d\'adressage IPv4/IPv6', 'Sertissage RJ45 Cat6/Cat7 & Baies de brassage', 'Tests de continuité & Réflectométrie de base']
        },
        {
          title: 'Module 2 : Commutation & Routage Cisco (CCNA Pratique)',
          lessons: ['Configuration des Switchs Cisco : VLANs, Trunk 802.1Q', 'Routage inter-VLAN & Protocole OSPF dynamique', 'Sécurisation des ports (Port-Security, DHCP Snooping)']
        },
        {
          title: 'Module 3 : MikroTik & Gestion de Bande Passante',
          lessons: ['Installation RouterOS & Configuration WAN/LAN', 'Portail Captif Hotspot (Gestion des tickets Wi-Fi)', 'QoS, Limitation de bande passante & Pare-feu MikroTik']
        },
        {
          title: 'Module 4 : Fibre Optique & Raccordement à l\'Arc',
          lessons: ['Principes de propagation monomode & multimode', 'Dénudage, clivage de précision et soudure à l\'arc', 'Tiroirs optiques, cassettes de lovage & Mesures au photomètre']
        }
      ]
    },
    'infographie-ui-ux': {
      title: 'Infographie, Identité Visuelle & UI/UX Design',
      badge: 'Design & Direction Artistique',
      mentor: 'Direction Artistique ENEANTECH',
      duration: '6 semaines · 30 leçons',
      price: '30 000 FCFA',
      oldPrice: '50 000 FCFA',
      chariowUrl: 'https://chariow.com',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'Devenez autonome sur Adobe Photoshop, Illustrator et Figma pour concevoir des logos percutants, des affiches professionnelles et des chartes graphiques complètes.',
      modules: [
        {
          title: 'Module 1 : Adobe Illustrator & Création Vectorielle',
          lessons: ['Outil Plume de maître, formes géométriques & vecteurs', 'Création de logos modernes, typographie & déclinaisons', 'Préparation pour l\'impression grand format (CMJN, marges, vectoriel)']
        },
        {
          title: 'Module 2 : Adobe Photoshop & Retouche Photo Élite',
          lessons: ['Détourage complexe, masques de fusion & photomontage', 'Création d\'affiches publicitaires percutantes pour les réseaux', 'Colorimétrie, lumières, ombres réalistes et effets d\'ambiance']
        },
        {
          title: 'Module 3 : UI/UX Design & Prototypage Figma',
          lessons: ['Principes d\'ergonomie, grilles et Design Systems', 'Maquettage d\'applications mobiles et sites web sur Figma', 'Prototypage animé et interaction utilisateur']
        }
      ]
    },
    'cybersecurite-systemes': {
      title: 'Cybersécurité, Pentest & Administration Linux',
      badge: 'Cybersécurité',
      mentor: 'Équipe Systèmes & Sécurité ENEANTECH',
      duration: '8 semaines · 38 leçons',
      price: '40 000 FCFA',
      oldPrice: '70 000 FCFA',
      chariowUrl: 'https://chariow.com',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'Sécurisez des serveurs Linux, maîtrisez les pare-feux, analysez les vulnérabilités de réseaux d\'entreprise et réalisez des tests d\'intrusion éthiques.',
      modules: [
        {
          title: 'Module 1 : Administration Système Linux Avancée',
          lessons: ['Commandes shell essentielles & Scripting Bash', 'Gestion des droits d\'accès, groupes, ACL & utilisateurs', 'Gestion des services systemd, logs (journalctl) & sauvegardes']
        },
        {
          title: 'Module 2 : Sécurité Réseau & Pare-feu pfSense',
          lessons: ['Installation & Déploiement de pfSense / OPNsense', 'Filtrage de paquets, NAT, règles strictes & DMZ', 'Mise en place de VPN sécurisé (OpenVPN / WireGuard)']
        },
        {
          title: 'Module 3 : Audit de Vulnérabilités & Pentest Éthique',
          lessons: ['Cartographie réseau avec Nmap et reconnaissance', 'Analyse de failles avec Nessus & OpenVAS', 'Sensibilisation aux ransomwares et durcissement des serveurs']
        }
      ]
    },
    'bureautique-excel-pro': {
      title: 'Sas Bureautique Pro, Excel Avancé & Gestion',
      badge: 'Bureautique & Business',
      mentor: 'Ramdam Michel (Responsable Opérations)',
      duration: '4 semaines · 22 leçons',
      price: '25 000 FCFA',
      oldPrice: '40 000 FCFA',
      chariowUrl: 'https://chariow.com',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'Automatisez vos rapports et bilans financiers avec Excel avancé (RechercheX, TCD, formules conditionnelles) et maîtrisez les outils collaboratifs cloud.',
      modules: [
        {
          title: 'Module 1 : Excel Avancé & Traitement de Données',
          lessons: ['Fonctions logiques avancées (SI.CONDITIONS, RECHERCHEX, INDEX-EQUIV)', 'Tableaux Croisés Dynamiques (TCD) & Tableaux de bord graphiques', 'Nettoyage automatisé et validation de données volumineuses']
        },
        {
          title: 'Module 2 : Bureautique & Documents Administratifs',
          lessons: ['Word Pro : Publipostage, rapports avec sommaire dynamique', 'PowerPoint : Présentations commerciales percutantes', 'Collaboration d\'équipe sur Google Workspace & OneDrive']
        }
      ]
    },
    'ia-de-a-a-z': {
      title: 'Maîtriser l\'IA de A à Z (Générative & Automatisation)',
      badge: 'Intelligence Artificielle',
      mentor: 'Mbaihilamde Noudjibé & Pôle IA ENEANTECH',
      duration: '4 semaines · 24 leçons',
      price: '15 000 FCFA',
      oldPrice: '30 000 FCFA',
      chariowUrl: 'https://chariow.com',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'Passez de simple utilisateur à expert de l\'Intelligence Artificielle : Prompt Engineering avancé (ChatGPT, Claude), création de visuels pro (Midjourney), automatisation de flux de travail et conception d\'agents IA personnalisés pour WhatsApp et le web.',
      modules: [
        {
          title: 'Module 1 : Fondations des LLMs & Prompt Engineering d\'Élite',
          lessons: ['Comprendre les modèles (GPT-4, Claude 3.5, Gemini, DeepSeek)', 'Techniques de prompting professionnelles (Few-shot, Chain-of-thought, Personas)', 'Création de Custom GPTs métier & configuration d\'instructions système']
        },
        {
          title: 'Module 2 : Création Visuelle, Médias & Contenu Augmenté',
          lessons: ['Génération d\'images vectorielles et réalistes sur Midjourney & DALL-E', 'Clonage de voix, synthèse audio et sous-titrage automatique', 'Stratégie de contenu marketing et rédaction automatisée de qualité']
        },
        {
          title: 'Module 3 : Automatisation No-Code avec l\'IA (Make & Zapier)',
          lessons: ['Connecter l\'IA à Google Sheets, Notion et Gmail', 'Traitement automatique d\'emails, factures et bilans avec l\'IA', 'Extraction intelligente de données depuis des documents PDF']
        },
        {
          title: 'Module 4 : Conception d\'Agents IA, WhatsApp Bot & Certification',
          lessons: ['Création d\'un assistant conversationnel connecté à votre documentation', 'Déploiement d\'un bot IA de service client sur WhatsApp', 'Projet pratique final évalué & délivrance du certificat ENEANTECH']
        }
      ]
    }
  };

  // 3. Modal Syllabus & Aperçu Vidéo
  const modal = document.getElementById('syllabus-modal');
  const modalTitle = document.getElementById('syllabus-modal-title');
  const modalBadge = document.getElementById('syllabus-modal-badge');
  const modalMentor = document.getElementById('syllabus-modal-mentor');
  const modalDuration = document.getElementById('syllabus-modal-duration');
  const modalPrice = document.getElementById('syllabus-modal-price');
  const modalOldPrice = document.getElementById('syllabus-modal-old-price');
  const modalDesc = document.getElementById('syllabus-modal-desc');
  const modalModules = document.getElementById('syllabus-modal-modules');
  const modalChariowBtn = document.getElementById('syllabus-chariow-btn');
  const modalCloseBtn = document.getElementById('syllabus-modal-close');
  const modalBackdrop = document.getElementById('syllabus-modal-backdrop');

  const openSyllabus = (courseId) => {
    const data = COURSES_DATA[courseId];
    if (!data || !modal) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalMentor.textContent = 'Formateur : ' + data.mentor;
    modalDuration.textContent = '⏱️ ' + data.duration;
    modalPrice.textContent = data.price;
    modalOldPrice.textContent = data.oldPrice;
    modalDesc.textContent = data.description;

    // Configurer le lien Chariow
    if (modalChariowBtn) {
      modalChariowBtn.setAttribute('href', data.chariowUrl);
    }

    // Générer les modules HTML de façon sécurisée
    modalModules.innerHTML = data.modules.map((mod, idx) => `
      <div class="syllabus-module-item">
        <div class="syllabus-module-head">
          <div class="syllabus-module-title">${escapeHtml(mod.title)}</div>
          <span class="syllabus-module-badge">${escapeHtml(String(mod.lessons.length))} leçons</span>
        </div>
        <ul class="syllabus-module-lessons">
          ${mod.lessons.map(l => `<li>${escapeHtml(l)}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeSyllabus = () => {
    if (!modal) return;
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.btn--syllabus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-course-id');
      openSyllabus(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSyllabus);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeSyllabus);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
      closeSyllabus();
    }
  });

  // 4. Navigation fluide & ouverture directe de la formation depuis la page d'accueil
  const COURSE_ALIAS_MAP = {
    'infographie-ui-ux': 'infographie-ui-ux',
    'design': 'infographie-ui-ux',
    'course-design': 'infographie-ui-ux',
    'buy-design': 'infographie-ui-ux',

    'dev-web-mobile': 'dev-web-mobile',
    'dev': 'dev-web-mobile',
    'course-dev': 'dev-web-mobile',
    'buy-dev-web': 'dev-web-mobile',

    'reseaux-cisco-fibre': 'reseaux-cisco-fibre',
    'reseaux': 'reseaux-cisco-fibre',
    'course-reseaux': 'reseaux-cisco-fibre',
    'buy-reseaux': 'reseaux-cisco-fibre',

    'cybersecurite-systemes': 'cybersecurite-systemes',
    'cyber': 'cybersecurite-systemes',
    'course-cyber': 'cybersecurite-systemes',
    'buy-cyber': 'cybersecurite-systemes',

    'bureautique-excel-pro': 'bureautique-excel-pro',
    'excel': 'bureautique-excel-pro',
    'course-excel': 'bureautique-excel-pro',
    'buy-excel': 'bureautique-excel-pro',

    'ia-de-a-a-z': 'ia-de-a-a-z',
    'ia': 'ia-de-a-a-z',
    'course-ia': 'ia-de-a-a-z',
    'buy-ia': 'ia-de-a-a-z'
  };

  const handleCourseParamOrHash = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const rawKey = (urlParams.get('course') || window.location.hash.replace('#', '')).trim().toLowerCase();
    if (!rawKey) return;

    const courseId = COURSE_ALIAS_MAP[rawKey] || (COURSES_DATA[rawKey] ? rawKey : null);
    if (!courseId) return;

    const card = document.querySelector(`[data-course-id="${courseId}"]`)?.closest('.course-card') ||
                 document.getElementById('course-' + rawKey) ||
                 document.querySelector('.course-card');

    if (card) {
      const cat = card.getAttribute('data-category');
      if (cat) {
        const correspondingBtn = document.querySelector(`.academy-filter-btn[data-filter="${cat}"]`);
        if (correspondingBtn) correspondingBtn.click();
      }
      setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
        card.style.borderColor = 'var(--cyan-400)';
        card.style.boxShadow = '0 0 35px rgba(6, 182, 212, 0.45)';
        setTimeout(() => {
          card.style.borderColor = '';
          card.style.boxShadow = '';
        }, 3500);
      }, 200);
    }

    // Ouvrir directement la modale de formation correspondante
    setTimeout(() => {
      openSyllabus(courseId);
    }, 380);
  };

  handleCourseParamOrHash();
  window.addEventListener('hashchange', handleCourseParamOrHash);

  // 5. Interception des clics sur "Rejoindre la formation" tant que les vidéos sont en cours d'enregistrement
  const comingSoonModal = document.getElementById('coming-soon-modal');
  const comingSoonCourseName = document.getElementById('coming-soon-coursename');
  const comingSoonWhatsapp = document.getElementById('coming-soon-whatsapp');
  const comingSoonClose = document.getElementById('coming-soon-close');
  const comingSoonBtnClose = document.getElementById('coming-soon-btn-close');
  const comingSoonBackdrop = document.getElementById('coming-soon-backdrop');

  const openComingSoon = (courseName) => {
    if (!comingSoonModal) return;
    if (comingSoonCourseName) {
      comingSoonCourseName.textContent = courseName ? `« ${courseName} »` : '';
    }
    if (comingSoonWhatsapp) {
      const msg = `Bonjour ENEANTECH ! Je souhaite m'inscrire en liste d'attente prioritaire pour la formation "${courseName || 'en ligne'}". Merci de me prévenir dès sa sortie sur YouTube pour bénéficier de la réduction de lancement !`;
      comingSoonWhatsapp.href = `https://wa.me/237697484074?text=${encodeURIComponent(msg)}`;
    }
    // Fermer la modale syllabus si ouverte pour éviter la superposition
    if (modal && modal.classList.contains('is-active')) {
      modal.classList.remove('is-active');
    }
    comingSoonModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeComingSoon = () => {
    if (!comingSoonModal) return;
    comingSoonModal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (comingSoonClose) comingSoonClose.addEventListener('click', closeComingSoon);
  if (comingSoonBtnClose) comingSoonBtnClose.addEventListener('click', closeComingSoon);
  if (comingSoonBackdrop) comingSoonBackdrop.addEventListener('click', closeComingSoon);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && comingSoonModal && comingSoonModal.classList.contains('is-active')) {
      closeComingSoon();
    }
  });

  // Intercepter tout clic sur "Rejoindre la formation" (.btn--enroll)
  document.querySelectorAll('.btn--enroll').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      // Tant que le lien pointe vers l'accueil générique chariow.com, afficher la modale d'attente
      if (!href || href === 'https://chariow.com' || href === '#' || href.endsWith('chariow.com/')) {
        e.preventDefault();
        const card = btn.closest('.course-card');
        const courseTitle = card 
          ? card.querySelector('.course-card__title')?.textContent.trim() 
          : (modalTitle ? modalTitle.textContent.trim() : 'Formation ENEANTECH');
        openComingSoon(courseTitle);
      }
    });
  });
});
