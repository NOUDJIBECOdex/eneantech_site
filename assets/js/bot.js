/* ==========================================================================
   ENEANTECH — EneanBot AI Assistant (JavaScript Engine)
   Version : 1.0.0 (Senior Tech Architecture)
   - Analyse d'intention en langage naturel (NLP léger, zéro latence)
   - Synthétiseur audio Web Audio API (effets sonores haute technologie)
   - Recommandations intelligentes, devis estimatifs & passerelle WhatsApp
   - Persistance de session & accessibilité complète
   ========================================================================== */

(function () {
  'use strict';

  /* ==========================================================================
     01. CONFIGURATION & DONNÉES CLÉS
     ========================================================================== */
  const BOT_CONFIG = {
    name: 'EneanBot',
    title: 'Assistant IA ENEANTECH',
    agencyPhone: '+237 697 48 40 74',
    whatsappNumber: '237697484074',
    email: 'eneantechnoudjibe@gmail.com',
    location: 'Maroua-Pitoaré, Région de l\'Extrême-Nord, Cameroun',
    soundEnabledKey: 'eneantech-bot-sound',
    sessionKey: 'eneantech-bot-history',
    teaserDismissKey: 'eneantech-bot-teaser-dismissed'
  };

  /* ==========================================================================
     02. SYNTHÉTISEUR SONORE AUDIO WEB (ZÉRO FICHIER AUDIO EXTERNE)
     ========================================================================== */
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem(BOT_CONFIG.soundEnabledKey) !== 'false';
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem(BOT_CONFIG.soundEnabledKey, this.enabled ? 'true' : 'false');
      if (this.enabled) this.playSend();
      return this.enabled;
    }

    playOpen() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.18);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.19);
    }

    playSend() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    }

    playReceive() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [
        { freq: 480, time: 0, dur: 0.08 },
        { freq: 720, time: 0.08, dur: 0.12 }
      ].forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, now + note.time);
        gain.gain.setValueAtTime(0.07, now + note.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + note.time);
        osc.stop(now + note.time + note.dur);
      });
    }
  }

  const sfx = new SoundFX();

  /* ==========================================================================
     03. BASE DE CONNAISSANCES ET MOTEUR SÉMANTIQUE NLP
     ========================================================================== */
  const KNOWLEDGE_BASE = [
    // 1. SALUTATIONS / IDENTITÉ
    {
      id: 'greeting',
      patterns: [/^(bonjour|bonsoir|salut|hello|hi|hey|coucou|yo)/i, /qui es[\s-]tu/i, /quel est ton nom/i, /c'est quoi ton role/i],
      responses: [
        {
          text: `Bonjour ! Je suis **EneanBot**, l'assistant virtuel intelligent d'**ENEANTECH Sarl** à Maroua. Je suis conçu pour vous orienter, répondre à vos questions sur nos formations et préparer vos devis informatiques en temps réel.`,
          actions: [
            { text: '🎓 Découvrir les formations', query: 'Quelles sont vos formations ?' },
            { text: '💼 Estimer un projet', query: 'Combien coûte un site web ?' },
            { text: '📍 Où vous trouver ?', query: 'Où se trouve ENEANTECH ?' }
          ]
        }
      ]
    },

    // 2. FORMATIONS GÉNÉRALES
    {
      id: 'formations_general',
      patterns: [/formation/i, /apprendre/i, /cours/i, /etudier/i, /certificat/i, /attestation/i, /filiere/i, /programme/i],
      responses: [
        {
          text: `Chez **ENEANTECH**, nous formons les futurs talents du numérique avec **80% de pratique** sur des projets réels. 

Nos pôles de formation certifiants :
- **Développement Web & Mobile** (HTML, CSS, JS, React, Node, Python, PHP)
- **Réseaux & Télécoms** (Fibre optique, Cisco, MikroTik, Câblage)
- **Infographie & Design Graphique** (Photoshop, Illustrator, Branding)
- **Cybersécurité & Systèmes** (Linux, Pare-feu, Sécurisation)
- **Bureautique Pro & Gestion** (Pack Office, Excel Avancé)

Quelle filière vous attire le plus ?`,
          actions: [
            { text: '💻 Dév Web & Mobile', query: 'Parle-moi de la formation dev web' },
            { text: '🌐 Réseaux & Télécoms', query: 'Parle-moi de la formation reseaux' },
            { text: '🎨 Infographie & Design', query: 'Parle-moi de la formation infographie' },
            { text: '🔒 Cybersécurité', query: 'Parle-moi de la formation cybersecurite' }
          ]
        }
      ]
    },

    // 3. DÉVELOPPEMENT WEB & MOBILE
    {
      id: 'formation_web',
      patterns: [/d[eé]v(eloppement)?[\s-]web/i, /d[eé]veloppeur/i, /coder/i, /programmation/i, /frontend/i, /backend/i, /fullstack/i, /react/i, /python/i, /javascript/i],
      responses: [
        {
          text: `Le parcours **Développeur Web & Mobile** vous apprend à concevoir des applications modernes et des plateformes robustes :
- **Frontend :** HTML5, CSS3 Moderne, JavaScript (ES6+), React.js.
- **Backend & BDD :** Node.js / Express ou Python / Django, MySQL & MongoDB.
- **Pratique :** Vous sortez avec **3 projets professionnels en ligne** pour votre portfolio.
- **Durée :** 3 à 6 mois (selon formule intensive ou standard).
- **Certification :** Attestation officielle certifiée ENEANTECH.`,
          actions: [
            { text: '📝 S\'inscrire au pôle Web', link: '#formations' },
            { text: '💬 Poser une question sur WhatsApp', whatsapp: 'Bonjour, je souhaite m\'inscrire à la formation Développeur Web & Mobile chez ENEANTECH.' }
          ]
        }
      ]
    },

    // 4. RÉSEAUX INFORMATIQUES & TÉLÉCOMS
    {
      id: 'formation_reseaux',
      patterns: [/r[eé]seau/i, /t[eé]l[eé]com/i, /fibre[\s-]optique/i, /cisco/i, /mikrotik/i, /routeur/i, /c[aâ]blage/i],
      responses: [
        {
          text: `Le parcours **Réseaux & Télécoms** est piloté par nos ingénieurs télécoms :
- **Architecture Réseau :** Modèle OSI, adressage IPv4/IPv6, sous-réseaux.
- **Équipements :** Configuration de commutateurs (Switches) & routeurs **Cisco & MikroTik**.
- **Fibre & Câblage :** Soudure optique, réflectométrie et câblage structuré RJ45.
- **Sécurité Réseau :** VPN, VLAN, contrôle d'accès et Wi-Fi managé d'entreprise.
- **Idéal pour :** Devenir Administrateur Réseau, Technicien Fibre ou Support IT.`,
          actions: [
            { text: '🌐 Découvrir le programme Réseaux', link: '#formations' },
            { text: '💬 Contacter le pôle Réseaux sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, je suis intéressé par la formation Réseaux Informatiques & Fibre Optique.' }
          ]
        }
      ]
    },

    // 5. INFOGRAPHIE & DESIGN
    {
      id: 'formation_infographie',
      patterns: [/infographie/i, /graphisme/i, /designer/i, /photoshop/i, /illustrator/i, /logo/i, /affiche/i, /ui[\s\/-]?ux/i],
      responses: [
        {
          text: `Le parcours **Infographie & Direction Artistique** forme aux compétences visuelles les plus recherchées :
- **Outils Pro :** Maîtrise complète de la suite Adobe (Photoshop, Illustrator, InDesign).
- **Identité de marque :** Création de logos vectoriels, chartes graphiques et typographies.
- **Communication visuelle :** Affiches publicitaires, visuels réseaux sociaux, roll-up, flyers.
- **UI/UX Design :** Maquettage d'applications et sites avec Figma.`,
          actions: [
            { text: '🎨 Voir les détails Infographie', link: '#formations' },
            { text: '💬 Échanger sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, je souhaite des infos sur la formation en Infographie & Design.' }
          ]
        }
      ]
    },

    // 6. CYBERSÉCURITÉ
    {
      id: 'formation_cyber',
      patterns: [/cyber/i, /s[eé]curit[eé]/i, /hacker/i, /hacking/i, /pentest/i, /pare[\s-]feu/i, /linux/i],
      responses: [
        {
          text: `Le pôle **Cybersécurité & Systèmes** protège les données et infrastructures critiques :
- **Systèmes Linux :** Administration avancée et scripts bash.
- **Défense & Audit :** Détection de vulnérabilités, pare-feu (Firewall), durcissement des serveurs.
- **Cryptographie & Protocoles :** Sécurisation TLS/SSL, VPN, gestion des identités.
- **Sensibilisation :** Prévention contre le phishing, ransomware et ingénierie sociale.`,
          actions: [
            { text: '🔒 Explorer le pôle Cyber', link: '#formations' },
            { text: '💬 Poser une question sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, j\'aimerais des renseignements sur le cursus Cybersécurité.' }
          ]
        }
      ]
    },

    // 7. PRIX & TARIFS FORMATIONS
    {
      id: 'tarifs_formations',
      patterns: [/combien co[uû]te une? formation/i, /prix (des |d['\s])?formations?/i, /tarif (des |d['\s])?formations?/i, /frais d['\s]inscription/i, /co[uû]t (des |d['\s])?cours/i],
      responses: [
        {
          text: `Nos tarifs de formation sont pensés pour être **accessibles et progressifs** avec facilités de paiement par tranches :
- **Initiation & Bureautique :** à partir de 25 000 FCFA / mois.
- **Infographie & Design :** à partir de 35 000 FCFA / mois.
- **Développement Web / Réseaux :** de 45 000 à 75 000 FCFA / mois selon le cycle.
- **Pack Spécial Étudiants & Groupes :** réductions disponibles sur demande.

Les inscriptions se font en ligne ou directement à notre agence à Pitoaré.`,
          actions: [
            { text: '💳 Voir la grille des tarifs', link: '#tarifs' },
            { text: '💬 Demander les dates de la prochaine rentrée', whatsapp: 'Bonjour ENEANTECH, quels sont les tarifs et dates de la prochaine rentrée de formation ?' }
          ]
        }
      ]
    },

    // 8. DEVIS SITE WEB / LOGICIEL / SERVICES
    {
      id: 'devis_services',
      patterns: [/cr[eé]er un site/i, /combien co[uû]te un site/i, /prix d['\s]un site/i, /tarif d['\s]un site/i, /devis/i, /e[\s-]commerce/i, /application mobile/i, /logiciel/i, /budget/i],
      responses: [
        {
          text: `Nous concevons des solutions numériques sur-mesure pour les entreprises :
- **Site Vitrine Professionnel :** Design responsive, ultra-rapide, SEO optimisé (dès 150 000 FCFA).
- **Site E-commerce / Vente en ligne :** Gestion des stocks, paiements Mobile Money (Orange Money / MTN MoMo) dès 350 000 FCFA.
- **Application Web & Logiciel de gestion :** ERP, gestion commerciale, portail client sur devis personnalisé.
- **Délai moyen :** 1 à 4 semaines avec accompagnement et garantie de maintenance.`,
          actions: [
            { text: '📑 Configurer un devis en ligne', link: '#devis' },
            { text: '🚀 Lancer mon devis sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, je souhaite obtenir un devis pour la création d\'un site web / logiciel.' }
          ]
        }
      ]
    },

    // 9. CÂBLAGE RÉSEAU & AUDIT ENTREPRISE
    {
      id: 'services_reseau',
      patterns: [/c[aâ]bler/i, /installer le wifi/i, /interconnexion/i, /r[eé]seau entreprise/i, /d[eé]ploiement fibre/i, /parc informatique/i],
      responses: [
        {
          text: `Notre pôle **Infrastructures Réseaux & Télécoms** intervient directement sur site :
- Audit et diagnostic de votre réseau existant.
- Câblage structuré en armoire de brassage (RJ45 Cat 6/7, fibre optique).
- Déploiement de Wi-Fi haute densité sécurisé pour bureaux, hôtels et campus.
- Interconnexion sécurisée entre plusieurs agences (VPN d'entreprise).`,
          actions: [
            { text: '📞 Demander une visite technique', whatsapp: 'Bonjour ENEANTECH, nous avons besoin d\'une intervention ou d\'un devis pour notre réseau d\'entreprise.' }
          ]
        }
      ]
    },

    // 10. CRÉATION DE LOGO / GRAPHISME ENTREPRISE
    {
      id: 'services_graphisme',
      patterns: [/faire un logo/i, /cr[eé]ation de logo/i, /prix logo/i, /charte graphique/i, /b[aâ]che/i, /affiche publicitaire/i],
      responses: [
        {
          text: `Donnez une dimension mémorable à votre marque :
- **Création de Logo Professionnel :** 3 propositions créatives vectorielles + déclinaisons couleur/noir&blanc (dès 35 000 FCFA).
- **Pack Identité Complète :** Logo, charte graphique, cartes de visite, papier en-tête.
- **Supports Print & Digital :** Affiches, dépliants, bâches, habillage réseaux sociaux.`,
          actions: [
            { text: '🎨 Commander un pack graphique', whatsapp: 'Bonjour ENEANTECH, je souhaite commander la création d\'un logo ou d\'une charte graphique.' }
          ]
        }
      ]
    },

    // 11. OÙ SE TROUVE ENEANTECH / CONTACT
    {
      id: 'contact_location',
      patterns: [/o[uù] (se trouve|etes|est) eneantech/i, /adresse/i, /localisation/i, /quartier/i, /maroua/i, /num[eé]ro/i, /t[eé]l[eé]phone/i, /whatsapp/i, /email/i, /mail/i, /horaire/i, /contact/i],
      responses: [
        {
          text: `📍 **Localisation :** Quartier Pitoaré, Maroua, Cameroun.
📞 **Téléphone / WhatsApp officiel :** **+237 697 48 40 74**
✉️ **Email officiel :** eneantechnoudjibe@gmail.com
🕒 **Horaires d'ouverture :** Du Lundi au Samedi, de 08h00 à 18h00.

Vous pouvez passer directement à notre agence ou nous écrire d'un clic !`,
          actions: [
            { text: '💬 Ouvrir WhatsApp', whatsapp: 'Bonjour ENEANTECH, je souhaite échanger avec un conseiller.' },
            { text: '✉️ Envoyer un message', link: '#contact' },
            { text: '📞 Appeler (+237 697 48 40 74)', tel: '+237697484074' }
          ]
        }
      ]
    },

    // 12. L'ÉQUIPE DIRIGEANTE
    {
      id: 'team',
      patterns: [/fondateur/i, /directeur/i, /qui dirige/i, /noudjib[eé]/i, /mbaihilamde/i, /michel/i, /mohamadou/i, /agbo/i, /[eé]quipe/i, /staff/i],
      responses: [
        {
          text: `**ENEANTECH** est dirigée par une équipe d'ingénieurs passionnés :
- **Mbaihilamde Noudjibé :** Fondateur & Directeur Technique (Architecture Cloud & Vision Technologique).
- **Ramdam Michel :** Co-fondateur & Responsable Opérations (Gestion stratégique & Partenariats).
- **Mohamadou :** Co-fondateur & Ingénieur Télécoms & Réseaux (Infrastructures, Fibre & Connectivité).
- **Agbo Martin :** Co-fondateur & Lead Développeur (Architecture Web, Mobile & DevOps).`,
          actions: [
            { text: '👥 Voir l\'équipe en détail', link: '#apropos' },
            { text: '💬 Contacter la direction', whatsapp: 'Bonjour Monsieur Noudjibé, je contacte la direction d\'ENEANTECH.' }
          ]
        }
      ]
    },

    // 13. ORIENTATION / "JE NE SAIS PAS QUOI CHOISIR"
    {
      id: 'guidance_quiz',
      patterns: [/je ne sais pas quoi choisir/i, /quelle formation choisir/i, /aide[\s-]moi [aà] choisir/i, /conseille[\s-]moi/i, /d[eé]butant/i, /par quoi commencer/i, /orientation/i],
      responses: [
        {
          text: `Pas d'inquiétude, c'est ma spécialité ! Dites-moi ce qui vous correspond le plus parmi ces 4 profils :

1. **Le Créatif :** Vous aimez le dessin, les belles images, les couleurs et les réseaux sociaux.
2. **Le Bâtisseur / Logique :** Vous voulez créer des sites, des applications et résoudre des problèmes de code.
3. **L'Ingénieur Pratique :** Vous préférez manipuler les câbles, les routeurs, la fibre et faire marcher internet.
4. **Le Protecteur :** Vous voulez sécuriser les systèmes et contrer les cyberattaques.

Quel est votre profil préféré ?`,
          actions: [
            { text: '1. Profil Créatif', query: 'Je choisis le profil créatif' },
            { text: '2. Profil Bâtisseur / Code', query: 'Je choisis le profil bâtisseur et code' },
            { text: '3. Profil Réseau & Matériel', query: 'Je choisis le profil réseau' },
            { text: '4. Profil Protecteur Cyber', query: 'Je choisis le profil cybersécurité' }
          ]
        }
      ]
    },

    // 14. CHOIX DU PROFIL CRÉATIF
    {
      id: 'quiz_creative',
      patterns: [/profil cr[eé]atif/i, /j['\s]?aime le design/i, /je choisis le profil cr[eé]atif/i],
      responses: [
        {
          text: `Excellent choix ! Le parcours fait pour vous est **Infographie & Direction Artistique**.
Vous apprendrez la suite Adobe (Photoshop, Illustrator), la typographie, la création de marques et le design digital. C'est un métier immédiatement monétisable en freelance ou en entreprise à Maroua et à l'international !`,
          actions: [
            { text: '🎨 Découvrir la formation Infographie', link: '#formations' },
            { text: '💬 Discuter avec le formateur Design', whatsapp: 'Bonjour ENEANTECH, après orientation j\'ai choisi la formation en Infographie & Design.' }
          ]
        }
      ]
    },

    // 15. CHOIX DU PROFIL BÂTISSEUR
    {
      id: 'quiz_builder',
      patterns: [/profil b[aâ]tisseur/i, /profil code/i, /je choisis le profil b[aâ]tisseur/i],
      responses: [
        {
          text: `Superbe ambition ! Le parcours idéal pour vous est **Développeur Web & Mobile Full-Stack**.
Vous apprendrez à coder des applications complètes de A à Z. Les développeurs formés chez nous construisent de vrais logiciels opérationnels dès les premières semaines !`,
          actions: [
            { text: '💻 Voir le cursus Développeur', link: '#formations' },
            { text: '💬 Échanger sur WhatsApp avec l\'équipe Web', whatsapp: 'Bonjour ENEANTECH, je souhaite m\'inscrire au cursus Développeur Web & Mobile.' }
          ]
        }
      ]
    },

    // 16. CHOIX DU PROFIL RÉSEAU
    {
      id: 'quiz_network',
      patterns: [/profil r[eé]seau/i, /je choisis le profil r[eé]seau/i],
      responses: [
        {
          text: `Génial ! Le parcours taillé pour vous est **Réseaux Informatiques & Télécoms**.
Vous manipulerez de véritables baies de brassage, des switches Cisco, des routeurs MikroTik et des soudures de fibre optique. La demande pour les techniciens réseaux certifiés au Cameroun est immense !`,
          actions: [
            { text: '🌐 Consulter le programme Réseaux', link: '#formations' },
            { text: '💬 Poser vos questions sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, je choisis le cursus Réseaux Informatiques & Télécoms.' }
          ]
        }
      ]
    },

    // 17. REMERCIEMENTS & POLITESSE
    {
      id: 'thanks',
      patterns: [/merci/i, /parfait/i, /super/i, /g[eé]nial/i, /top/i, /cool/i, /c['\s]?est not[eé]/i],
      responses: [
        {
          text: `C'est un grand plaisir ! Chez **ENEANTECH**, nous croyons qu'une technologie de pointe doit toujours s'accompagner d'un service irréprochable. Avez-vous une autre question ?`,
          actions: [
            { text: '🚀 Démarrer mon projet maintenant', link: '#devis' },
            { text: '💬 Rejoindre notre communauté WhatsApp', whatsapp: 'Bonjour ENEANTECH, je souhaite rejoindre vos canaux d\'actualités et formations.' }
          ]
        }
      ]
    }
  ];

  /* Réponse par défaut (Fallback) */
  const FALLBACK_RESPONSE = {
    text: `Je n'ai pas saisi tous les détails de votre demande, mais je peux vous guider avec précision ! Choisissez l'un des sujets ci-dessous ou échangez en direct avec l'un de nos ingénieurs sur WhatsApp :`,
    actions: [
      { text: '🎓 Nos Formations', query: 'Quelles sont vos formations ?' },
      { text: '💼 Devis & Tarifs', query: 'Combien coûte un site web ?' },
      { text: '📍 Adresse & Contact', query: 'Où se trouve ENEANTECH ?' },
      { text: '💬 Parler à un conseiller humain', whatsapp: 'Bonjour ENEANTECH, j\'aimerais poser une question spécifique à un conseiller.' }
    ]
  };

  /* ==========================================================================
     04. MOTEUR DE MATCHING INTELLIGENT
     ========================================================================== */
  function findBestResponse(userInput) {
    const clean = userInput.trim().toLowerCase();

    for (const entry of KNOWLEDGE_BASE) {
      for (const pattern of entry.patterns) {
        if (pattern.test(clean)) {
          const res = entry.responses[Math.floor(Math.random() * entry.responses.length)];
          return res;
        }
      }
    }
    return FALLBACK_RESPONSE;
  }

  /* Formateur Markdown simple et sécurisé */
  function formatMarkdown(text) {
    let out = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Gras : **texte**
    out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Listes à puces
    const lines = out.split('\n');
    let inList = false;
    const formattedLines = [];

    for (const line of lines) {
      if (line.trim().startsWith('- ')) {
        if (!inList) {
          formattedLines.push('<ul>');
          inList = true;
        }
        formattedLines.push(`<li>${line.trim().substring(2)}</li>`);
      } else {
        if (inList) {
          formattedLines.push('</ul>');
          inList = false;
        }
        if (line.trim().length > 0) {
          formattedLines.push(`<p>${line}</p>`);
        }
      }
    }
    if (inList) formattedLines.push('</ul>');
    return formattedLines.join('');
  }

  /* ==========================================================================
     05. CONTRÔLEUR D'INTERFACE UTILISATEUR (UI CONTROLLER)
     ========================================================================== */
  class EneanBotUI {
    constructor() {
      this.isOpen = false;
      this.history = [];
      this.initDOM();
      this.bindEvents();
      this.loadHistory();
      this.setupTeaser();
    }

    initDOM() {
      // 1. Bouton Lanceur flottant
      const launcher = document.createElement('div');
      launcher.className = 'bot-launcher';
      launcher.id = 'bot-launcher';
      launcher.innerHTML = `
        <div class="bot-teaser" id="bot-teaser" style="display:none;" role="status">
          <div class="bot-teaser__header">
            <span>✨ Assistant IA Actif</span>
            <button class="bot-teaser__close" id="bot-teaser-close" aria-label="Fermer la bulle">&times;</button>
          </div>
          <div>Besoin d'un conseil, d'une formation ou d'un devis instantané ? <strong>Je suis là !</strong></div>
        </div>
        <button class="bot-launcher__btn" id="bot-open-btn" aria-label="Ouvrir l'assistant IA EneanBot" aria-expanded="false">
          <span class="bot-launcher__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 2a3 3 0 0 0-3 3v1a7 7 0 0 0-7 7v1a2 2 0 0 0 2 2h1a7 7 0 0 0 14 0h1a2 2 0 0 0 2-2v-1a7 7 0 0 0-7-7V5a3 3 0 0 0-3-3z"/>
              <circle cx="9" cy="13" r="1.2" fill="currentColor"/>
              <circle cx="15" cy="13" r="1.2" fill="currentColor"/>
              <path d="M10 17c.8.6 1.8.9 2 .9s1.2-.3 2-.9"/>
            </svg>
          </span>
          <span class="bot-launcher__badge" title="Assistant en ligne 24h/24"></span>
        </button>
      `;

      // 2. Fenêtre de discussion
      const windowEl = document.createElement('div');
      windowEl.className = 'bot-window';
      windowEl.id = 'bot-window';
      windowEl.setAttribute('role', 'dialog');
      windowEl.setAttribute('aria-label', 'Discussion avec EneanBot');
      windowEl.innerHTML = `
        <header class="bot-header">
          <div class="bot-header__identity">
            <div class="bot-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 2a3 3 0 0 0-3 3v1a7 7 0 0 0-7 7v1a2 2 0 0 0 2 2h1a7 7 0 0 0 14 0h1a2 2 0 0 0 2-2v-1a7 7 0 0 0-7-7V5a3 3 0 0 0-3-3z"/>
                <circle cx="9" cy="13" r="1.2" fill="currentColor"/>
                <circle cx="15" cy="13" r="1.2" fill="currentColor"/>
                <path d="M10 17c.8.6 1.8.9 2 .9s1.2-.3 2-.9"/>
              </svg>
            </div>
            <div class="bot-header__info">
              <h4>${BOT_CONFIG.name} <span class="bot-tag">IA 2.0</span></h4>
              <div class="bot-header__status">Connecté · Maroua</div>
            </div>
          </div>
          <div class="bot-header__actions">
            <button class="bot-btn-icon ${sfx.enabled ? 'is-active' : ''}" id="bot-sound-toggle" title="Activer / Désactiver le son" aria-label="Son">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            </button>
            <button class="bot-btn-icon" id="bot-reset" title="Réinitialiser la discussion" aria-label="Réinitialiser">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
            </button>
            <button class="bot-btn-icon" id="bot-close" title="Fermer l'assistant" aria-label="Fermer">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </header>

        <div class="bot-body" id="bot-messages" role="log" aria-live="polite">
          <div class="bot-welcome">
            <p><strong>Bienvenue chez ENEANTECH Sarl !</strong></p>
            <p>Je suis votre assistant IA interactif. Que souhaitez-vous découvrir ?</p>
          </div>
        </div>

        <div class="bot-suggestions" id="bot-suggestions" aria-label="Suggestions de questions rapides">
          <button class="bot-chip" data-q="Quelles sont vos formations ?">🎓 Formations</button>
          <button class="bot-chip" data-q="Combien coûte un site web ?">💼 Devis Site Web</button>
          <button class="bot-chip" data-q="Quelle formation choisir ?">🧭 Orientation</button>
          <button class="bot-chip" data-q="Qui dirige ENEANTECH ?">👥 L'Équipe</button>
          <button class="bot-chip" data-q="Où se trouve ENEANTECH ?">📍 Contact</button>
        </div>

        <footer class="bot-footer">
          <form class="bot-form" id="bot-form">
            <input type="text" class="bot-input" id="bot-input" placeholder="Posez une question à l'IA..." autocomplete="off" maxlength="300" />
            <button type="submit" class="bot-send" id="bot-send" aria-label="Envoyer le message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
          <div class="bot-disclaimer">ENEANTECH Intelligence Artificielle · Réponse instantanée</div>
        </footer>
      `;

      document.body.appendChild(launcher);
      document.body.appendChild(windowEl);

      this.dom = {
        launcher,
        openBtn: document.getElementById('bot-open-btn'),
        teaser: document.getElementById('bot-teaser'),
        teaserClose: document.getElementById('bot-teaser-close'),
        window: windowEl,
        messages: document.getElementById('bot-messages'),
        suggestions: document.getElementById('bot-suggestions'),
        form: document.getElementById('bot-form'),
        input: document.getElementById('bot-input'),
        closeBtn: document.getElementById('bot-close'),
        resetBtn: document.getElementById('bot-reset'),
        soundToggle: document.getElementById('bot-sound-toggle')
      };
    }

    bindEvents() {
      // Ouverture / fermeture
      this.dom.openBtn.addEventListener('click', () => this.toggle());
      this.dom.closeBtn.addEventListener('click', () => this.close());
      this.dom.teaser.addEventListener('click', (e) => {
        if (e.target !== this.dom.teaserClose) {
          this.open();
          this.hideTeaser(true);
        }
      });
      this.dom.teaserClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideTeaser(true);
      });

      // Mute / Unmute
      this.dom.soundToggle.addEventListener('click', () => {
        const enabled = sfx.toggle();
        this.dom.soundToggle.classList.toggle('is-active', enabled);
      });

      // Reset
      this.dom.resetBtn.addEventListener('click', () => {
        this.clearHistory();
      });

      // Envoi formulaire
      this.dom.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = this.dom.input.value.trim();
        if (!val) return;
        this.dom.input.value = '';
        this.handleUserMessage(val);
      });

      // Chips de suggestions
      this.dom.suggestions.addEventListener('click', (e) => {
        const chip = e.target.closest('.bot-chip');
        if (!chip) return;
        const q = chip.getAttribute('data-q');
        if (q) this.handleUserMessage(q);
      });

      // Clics sur boutons d'actions au sein des messages
      this.dom.messages.addEventListener('click', (e) => {
        const btn = e.target.closest('.bot-action-btn');
        if (!btn) return;

        const query = btn.getAttribute('data-query');
        const link = btn.getAttribute('data-link');
        const wa = btn.getAttribute('data-whatsapp');
        const tel = btn.getAttribute('data-tel');

        if (query) {
          this.handleUserMessage(query);
        } else if (link) {
          this.close();
          const targetEl = document.querySelector(link);
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        } else if (wa) {
          const url = `https://wa.me/${BOT_CONFIG.whatsappNumber}?text=${encodeURIComponent(wa)}`;
          window.open(url, '_blank', 'noopener,noreferrer');
        } else if (tel) {
          window.location.href = `tel:${tel}`;
        }
      });

      // Fermeture avec la touche Échap
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }

    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    }

    open() {
      this.isOpen = true;
      this.dom.window.classList.add('is-open');
      this.dom.openBtn.setAttribute('aria-expanded', 'true');
      this.hideTeaser(false);
      sfx.playOpen();
      setTimeout(() => this.dom.input.focus(), 250);
      this.scrollToBottom();

      // Si premier lancement et aucun message, bot dit bonjour
      if (this.history.length === 0) {
        this.sendBotReply({
          text: `Bonjour et bienvenue chez **ENEANTECH Sarl** ! Je suis **${BOT_CONFIG.name}**, votre copilote numérique.\n\nComment puis-je vous accompagner aujourd'hui ?`,
          actions: [
            { text: '🎓 Explorer nos formations', query: 'Quelles sont vos formations ?' },
            { text: '💼 Demander un devis projet', query: 'Combien coûte un site web ?' },
            { text: '🧭 M\'aider à choisir ma filière', query: 'Quelle formation choisir ?' },
            { text: '💬 Parler sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, je souhaite poser une question à votre équipe.' }
          ]
        }, false);
      }
    }

    close() {
      this.isOpen = false;
      this.dom.window.classList.remove('is-open');
      this.dom.openBtn.setAttribute('aria-expanded', 'false');
    }

    setupTeaser() {
      const dismissed = sessionStorage.getItem(BOT_CONFIG.teaserDismissKey);
      if (dismissed) return;

      setTimeout(() => {
        if (!this.isOpen) {
          this.dom.teaser.style.display = 'block';
        }
      }, 4200);
    }

    hideTeaser(permanentForSession = false) {
      this.dom.teaser.style.display = 'none';
      if (permanentForSession) {
        sessionStorage.setItem(BOT_CONFIG.teaserDismissKey, 'true');
      }
    }

    handleUserMessage(text) {
      // 1. Ajouter le message utilisateur au DOM
      this.appendUserMessage(text);
      sfx.playSend();
      this.saveMessage('user', text);
      this.scrollToBottom();

      // 2. Afficher indicateur de frappe
      this.showTyping();

      // 3. Simuler réflexion de l'IA (délai réaliste de 450 à 750ms)
      const thinkTime = Math.floor(Math.random() * 300) + 450;
      setTimeout(() => {
        this.hideTyping();
        const reply = findBestResponse(text);
        this.sendBotReply(reply, true);
      }, thinkTime);
    }

    appendUserMessage(text) {
      const time = this.getCurrentTime();
      const div = document.createElement('div');
      div.className = 'bot-msg bot-msg--user';
      div.innerHTML = `
        <div class="bot-msg__bubble">
          ${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          <div class="bot-msg__time">${time}</div>
        </div>
      `;
      this.dom.messages.appendChild(div);
    }

    sendBotReply(replyObj, playAudio = true) {
      const time = this.getCurrentTime();
      const div = document.createElement('div');
      div.className = 'bot-msg bot-msg--bot';

      let actionsHtml = '';
      if (replyObj.actions && replyObj.actions.length > 0) {
        actionsHtml = '<div class="bot-actions">';
        replyObj.actions.forEach(a => {
          let extraAttrs = '';
          let isWa = false;
          if (a.query) extraAttrs = `data-query="${a.query.replace(/"/g, '&quot;')}"`;
          else if (a.link) extraAttrs = `data-link="${a.link}"`;
          else if (a.whatsapp) {
            extraAttrs = `data-whatsapp="${a.whatsapp.replace(/"/g, '&quot;')}"`;
            isWa = true;
          } else if (a.tel) extraAttrs = `data-tel="${a.tel}"`;

          actionsHtml += `
            <button class="bot-action-btn ${isWa ? 'bot-action-btn--wa' : ''}" ${extraAttrs}>
              ${isWa ? '<svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M21 11.5a8.4 8.4 0 01-12.4 7.4L3 21l2.1-5.6A8.4 8.4 0 1121 11.5z"/></svg>' : ''}
              ${a.text}
            </button>
          `;
        });
        actionsHtml += '</div>';
      }

      div.innerHTML = `
        <div class="bot-msg__avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 2a3 3 0 0 0-3 3v1a7 7 0 0 0-7 7v1a2 2 0 0 0 2 2h1a7 7 0 0 0 14 0h1a2 2 0 0 0 2-2v-1a7 7 0 0 0-7-7V5a3 3 0 0 0-3-3z"/>
          </svg>
        </div>
        <div class="bot-msg__bubble">
          ${formatMarkdown(replyObj.text)}
          ${actionsHtml}
          <div class="bot-msg__time">${time}</div>
        </div>
      `;

      this.dom.messages.appendChild(div);
      if (playAudio) sfx.playReceive();
      this.saveMessage('bot', replyObj);
      this.scrollToBottom();
    }

    showTyping() {
      if (document.getElementById('bot-typing-indicator')) return;
      const typing = document.createElement('div');
      typing.className = 'bot-typing';
      typing.id = 'bot-typing-indicator';
      typing.innerHTML = `<span></span><span></span><span></span>`;
      this.dom.messages.appendChild(typing);
      this.scrollToBottom();
    }

    hideTyping() {
      const typing = document.getElementById('bot-typing-indicator');
      if (typing) typing.remove();
    }

    scrollToBottom() {
      setTimeout(() => {
        this.dom.messages.scrollTop = this.dom.messages.scrollHeight;
      }, 50);
    }

    getCurrentTime() {
      const now = new Date();
      return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }

    saveMessage(sender, content) {
      this.history.push({ sender, content, time: this.getCurrentTime() });
      try {
        sessionStorage.setItem(BOT_CONFIG.sessionKey, JSON.stringify(this.history));
      } catch (e) {
        // storage overflow fallback
      }
    }

    loadHistory() {
      try {
        const saved = sessionStorage.getItem(BOT_CONFIG.sessionKey);
        if (saved) {
          this.history = JSON.parse(saved);
          this.history.forEach(item => {
            if (item.sender === 'user') {
              this.appendUserMessage(item.content);
            } else if (item.sender === 'bot') {
              this.sendBotReply(item.content, false);
            }
          });
        }
      } catch (e) {
        this.history = [];
      }
    }

    clearHistory() {
      sessionStorage.removeItem(BOT_CONFIG.sessionKey);
      this.history = [];
      this.dom.messages.innerHTML = `
        <div class="bot-welcome">
          <p><strong>Discussion réinitialisée.</strong></p>
          <p>Posez n'importe quelle question pour recommencer !</p>
        </div>
      `;
      this.sendBotReply({
        text: `Discussion remise à zéro. En quoi puis-je vous aider ?`,
        actions: [
          { text: '🎓 Formations', query: 'Quelles sont vos formations ?' },
          { text: '💼 Devis & Tarifs', query: 'Combien coûte un site web ?' }
        ]
      }, false);
    }
  }

  // Initialisation dès que le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new EneanBotUI());
  } else {
    new EneanBotUI();
  }
})();
