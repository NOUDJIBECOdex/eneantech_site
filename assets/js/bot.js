/* ==========================================================================
   ENEANTECH — EneanBot AI Assistant (JavaScript Engine)
   Version : 2.0.0 (Senior Tech Architecture & Academic Advisor)
   - Analyse d'intention pondérée (Priority Scoring NLP)
   - Module d'orientation ultra-sophistiqué pour débutants & novices
   - Roadmaps détaillées pas à pas (Web, Infographie, Réseaux)
   - Synthétiseur audio Web Audio API (effets sonores haute technologie)
   - Persistance de session & accessibilité complète
   ========================================================================== */

(function () {
  'use strict';

  /* ==========================================================================
     01. CONFIGURATION & DONNÉES CLÉS
     ========================================================================== */
  const BOT_CONFIG = {
    name: 'EneanBot',
    title: 'Assistant IA & Mentor ENEANTECH',
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
     03. BASE DE CONNAISSANCES ET MOTEUR SÉMANTIQUE NLP PONDÉRÉ
     ========================================================================== */
  const KNOWLEDGE_BASE = [
    // 0. GUIDE D'ORIENTATION MAJEUR POUR DÉBUTANTS (PRIORITÉ MAXIMALE)
    {
      id: 'beginner_master_guide',
      priority: 120,
      patterns: [
        /d[eé]butant/i,
        /novice/i,
        /commencer/i,
        /par quoi commencer/i,
        /z[eé]ro (niveau|connaissance|base)?/i,
        /partir de z[eé]ro/i,
        /aucune? base/i,
        /pas de base/i,
        /conseils? (pour|sur|entant que|en tant que)? d[eé]butant/i,
        /conseille[ -]moi (pour|en tant que)? d[eé]butant/i,
        /recommandation d[eé]butant/i,
        /je veux d[eé]buter/i,
        /d[eé]buter dans l['\s]informatique/i,
        /quelle formation pour d[eé]buter/i
      ],
      responses: [
        {
          text: `Excellente initiative ! Chez **ENEANTECH**, plus de **70% de nos apprenants aujourd'hui en activité sont partis de zéro absolu**. Notre méthode repose sur **80% de pratique en atelier et un mentorat quotidien**, sans théorie assommante.

Voici notre **Boussole d'Orientation pour Débutant** selon votre profil :

🎨 **1. Profil Créatif & Visuel ➔ Infographie & Design Graphique**
- *Pourquoi c'est idéal :* Aucune ligne de code. Vous apprenez directement avec des outils visuels (Photoshop, Illustrator).
- *Monétisation rapide :* Dès le 1er mois, vous pouvez créer et facturer des logos, affiches et visuels réseaux sociaux pour les commerces locaux.

💻 **2. Profil Bâtisseur & Logique ➔ Développeur Web & Mobile**
- *Pourquoi c'est puissant :* Vous apprenez à construire des sites et logiciels de A à Z. On commence par HTML5 & CSS3 pour voir immédiatement le fruit de votre travail à l'écran.
- *Carrière :* Très forte valeur sur le marché (freelance international sur Upwork, CDI en entreprise).

🌐 **3. Profil Pratique & Matériel ➔ Réseaux & Télécoms**
- *Pourquoi c'est recherché :* Très concret. Vous manipulez des câbles RJ45, des routeurs Cisco/MikroTik et de la fibre optique.
- *Débouchés :* Embauche rapide chez les FAI (Camtel, MTN, Orange), banques, écoles et PME.

🖥️ **4. Le Sas Tremplin : Informatique Générale & Bureautique Pro**
- Si vous n'êtes pas encore à l'aise avec la souris, le clavier et l'environnement Windows, nous commençons par là !

Que souhaitez-vous explorer en priorité ?`,
          actions: [
            { text: '🧭 Faire le mini-diagnostic (2 questions)', query: 'Je veux faire le diagnostic débutant' },
            { text: '🗺️ Roadmap Développeur Web', query: 'Comment devenir développeur en partant de zéro ?' },
            { text: '🎨 Roadmap Infographie', query: 'Comment débuter en infographie ?' },
            { text: '🌐 Roadmap Réseaux', query: 'Comment débuter en réseaux informatiques ?' },
            { text: '💬 Réserver un conseil gratuit WhatsApp', whatsapp: 'Bonjour ENEANTECH, je suis débutant et je souhaite un conseil personnalisé pour m\'orienter.' }
          ]
        }
      ]
    },

    // 0.1 ROADMAP DÉTAILLÉE DÉVELOPPEUR WEB DÉBUTANT
    {
      id: 'beginner_roadmap_web',
      priority: 110,
      patterns: [
        /roadmap (d[eé]v|web|code)/i,
        /comment devenir d[eé]veloppeur/i,
        /d[eé]buter (en|le)? (code|web|programmation)/i,
        /apprendre [aà] coder/i,
        /programme d[eé]v d[eé]butant/i
      ],
      responses: [
        {
          text: `Voici la **feuille de route pas à pas** du développeur débutant chez **ENEANTECH** :

📅 **Mois 1 : Les Fondations Visuelles (Zéro code complexe)**
- Structure du Web & HTML5 sémantique.
- Mise en page moderne avec CSS3 (Flexbox & CSS Grid, responsive design sur smartphone).
- *Livrable du mois :* Vous mettez en ligne votre tout premier site vitrine complet !

📅 **Mois 2 : L'Intelligence & l'Interactivité**
- Logique algorithmique & JavaScript moderne (ES6+).
- Manipulation dynamique de la page, gestion des clics, formulaires interactifs, animations.
- *Livrable du mois :* Une application web interactive (calculateur, to-do list, quiz).

📅 **Mois 3 & 4 : Bases de Données & Backend**
- Serveurs avec Node.js / Express ou Python.
- Bases de données (MySQL / MongoDB) : inscription d'utilisateurs, gestion de comptes sécurisés.

📅 **Mois 5 & 6 : Projets Réels & Professionnalisation**
- Développement d'une plateforme complète (e-commerce avec paiement Mobile Money).
- Versioning Git/GitHub, hébergement Cloud et soutenance finale.`,
          actions: [
            { text: '📝 S\'inscrire au cursus Web', link: '#formations' },
            { text: '💻 Quel ordinateur faut-il avoir ?', query: 'Quel matériel faut-il pour débuter en informatique ?' },
            { text: '💬 Parler au formateur Web', whatsapp: 'Bonjour ENEANTECH, je souhaite m\'inscrire à la formation Développeur Web pour débutants.' }
          ]
        }
      ]
    },

    // 0.2 ROADMAP DÉTAILLÉE INFOGRAPHIE DÉBUTANT
    {
      id: 'beginner_roadmap_infographie',
      priority: 110,
      patterns: [
        /roadmap infographie/i,
        /comment d[eé]buter en infographie/i,
        /d[eé]buter (en|le)? graphisme/i,
        /apprendre (photoshop|illustrator)/i,
        /programme infographie d[eé]butant/i
      ],
      responses: [
        {
          text: `Voici la **progression méthodique en Infographie & Design** conçue pour les débutants :

🎨 **Semaine 1 à 4 : L'Œil & la Maîtrise d'Adobe Photoshop**
- Théorie des couleurs, contrastes et psychologie visuelle.
- Détourage précis, retouche photo professionnelle, montages et affiches publicitaires.

✏️ **Semaine 5 à 8 : Le Dessin Vectoriel avec Adobe Illustrator**
- Conception de logos professionnels vectoriels (qui ne pixelisent jamais).
- Création de pictogrammes, mascottes, typographies personnalisées.

📦 **Mois 3 : Identité de Marque & Supports Print & Web**
- Réalisation d'une charte graphique d'entreprise complète (Brand Book).
- Préparation des fichiers d'impression technique (bâches géantes, flyers, roll-up, t-shirts).
- Initiation au maquettage d'applications modernes avec Figma (UI/UX).`,
          actions: [
            { text: '🎨 Voir le programme Infographie', link: '#formations' },
            { text: '⚡ Est-ce rentable rapidement ?', query: 'Quelle formation rapporte le plus vite ?' },
            { text: '💬 Échanger sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, je suis intéressé par la formation Infographie & Design Graphique.' }
          ]
        }
      ]
    },

    // 0.3 ROADMAP DÉTAILLÉE RÉSEAUX DÉBUTANT
    {
      id: 'beginner_roadmap_reseaux',
      priority: 110,
      patterns: [
        /roadmap r[eé]seau/i,
        /comment d[eé]buter en r[eé]seaux/i,
        /d[eé]buter (en|le)? r[eé]seau/i,
        /programme r[eé]seaux d[eé]butant/i
      ],
      responses: [
        {
          text: `Voici le parcours pratique pour devenir **Technicien & Administrateur Réseaux** sans prérequis :

🔌 **Mois 1 : Les Fondations Physiques & Câblage**
- Comprendre comment fonctionne Internet (Modèle OSI, TCP/IP, adressage IPv4 & IPv6).
- Atelier pratique : sertissage manuel de câbles RJ45 (droits/croisés) et testeurs de câbles.
- Montage d'un réseau local (LAN) d'entreprise avec partage d'imprimantes et fichiers.

📡 **Mois 2 : Configuration des Équipements Professionnels**
- Prise en main de commutateurs (Switches) et routeurs **Cisco & MikroTik**.
- Découpage en réseaux virtuels (VLAN) pour sécuriser les départements d'une entreprise.
- Déploiement de bornes Wi-Fi managées haute portée avec portail captif.

💎 **Mois 3 : Fibre Optique & Sécurité Réseau**
- Pratique de la **soudure optique à l'arc** et mesure de puissance par réflectométrie.
- Mise en place de pare-feu (Firewall), VPN pour relier deux agences distantes et maintenance préventive.`,
          actions: [
            { text: '🌐 Découvrir le pôle Réseaux', link: '#formations' },
            { text: '💼 Quels sont les débouchés Réseaux ?', query: 'Quels sont les débouchés en réseaux télécoms ?' },
            { text: '💬 Contacter l\'équipe Réseaux', whatsapp: 'Bonjour ENEANTECH, je souhaite des infos sur la formation pratique en Réseaux & Fibre Optique.' }
          ]
        }
      ]
    },

    // 0.4 FAQ MATÉRIEL DÉBUTANT : FAUT-IL UN PC ?
    {
      id: 'beginner_faq_hardware',
      priority: 105,
      patterns: [
        /faut[\s-]il un (pc|ordinateur|mac)/i,
        /besoin d['\s]un (ordinateur|pc)/i,
        /quel (pc|ordinateur|mat[eé]riel) (faut[\s-]il|choisir)/i,
        /je n['\s]?ai pas (d['\s]?ordinateur|de pc)/i,
        /configuration (requise|pc)/i
      ],
      responses: [
        {
          text: `C'est une question essentielle ! Voici la réponse concrète :

✅ **Au centre ENEANTECH (Maroua-Pitoaré) :**
Nos salles de formation sont **entièrement équipées d'ordinateurs récents et de bancs d'essai connectés** mis à votre disposition durant toutes vos séances pratiques.

💻 **Pour pratiquer chez vous le soir et les week-ends :**
Avoir votre propre ordinateur portable est un véritable accélérateur.
- **Pour le Dév Web & les Réseaux :** Un PC standard d'occasion suffit largement (processeur Intel Core i3 ou i5, 8 Go de RAM, SSD de 256 Go).
- **Pour l'Infographie (Photoshop / Illustrator) :** Privilégiez un Core i5 ou i7 avec 8 à 16 Go de RAM et un bon écran.

Si vous n'avez pas encore d'ordinateur, nos équipes peuvent également vous conseiller pour trouver un PC fiable et adapté à votre budget à Maroua !`,
          actions: [
            { text: '📍 Venir voir nos salles à Pitoaré', link: '#contact' },
            { text: '💬 Demander conseil sur un modèle de PC', whatsapp: 'Bonjour ENEANTECH, j\'aimerais un conseil pour choisir un bon ordinateur pour ma formation.' }
          ]
        }
      ]
    },

    // 0.5 FAQ DIFFICULTÉ : EST-CE TROP DIFFICILE ?
    {
      id: 'beginner_faq_difficulty',
      priority: 105,
      patterns: [
        /est[\s-]ce (que c['\s]?est )?difficile/i,
        /c['\s]?est dur/i,
        /peur de ne pas y arriver/i,
        /je suis nul/i,
        /niveau requis/i,
        /pr[eé]requis/i
      ],
      responses: [
        {
          text: `Rassurez-vous immédiatement : **non, ce n'est pas difficile si vous êtes bien guidé !**

Chez ENEANTECH, notre pédagogie est pensée pour éliminer la peur :
- **Zéro jargon abstrait :** Tout concept est expliqué avec des analogies du quotidien.
- **Accompagnement individuel :** Nos formateurs sont des professionnels en activité qui se déplacent auprès de chaque apprenant en atelier.
- **Méthode des petits pas :** Chaque jour, vous réalisez un mini-exercice réussi, ce qui vous donne confiance.

La seule chose demandée est la **curiosité** et **1 heure de pratique régulière par jour**. Si vous avez la motivation, nous vous garantissons les résultats !`,
          actions: [
            { text: '🧭 Faire le test d\'orientation', query: 'Je veux faire le diagnostic débutant' },
            { text: '💬 Parler à un conseiller bienveillant', whatsapp: 'Bonjour, je souhaite échanger sur mes aptitudes avant de me lancer dans une formation.' }
          ]
        }
      ]
    },

    // 0.6 FAQ RENTABILITÉ : QUELLE FORMATION RAPPORTE LE PLUS VITE ?
    {
      id: 'beginner_faq_monetization',
      priority: 105,
      patterns: [
        /rapporte le plus vite/i,
        /gagner de l['\s]argent/i,
        /rentable/i,
        /trouver du travail/i,
        /d[eé]bouch[eé]s/i,
        /salaire/i,
        /m[eé]tier d['\s]avenir/i
      ],
      responses: [
        {
          text: `Voici une analyse transparente du marché à Maroua, au Cameroun et à l'international :

⚡ **La plus rapide à rentabiliser : L'Infographie & Design (1 à 2 mois)**
- Dès vos premières semaines, vous pouvez concevoir des logos à 25 000 - 50 000 FCFA, des affiches pour commerces, des faire-part ou des visuels réseaux sociaux. Idéal pour avoir un revenu immédiat en freelance.

🚀 **La plus valorisée à moyen/long terme : Développement Web & Mobile (3 à 6 mois)**
- Un seul site web professionnel pour une entreprise se vend entre 150 000 et 600 000 FCFA. C'est le métier qui ouvre les portes du travail à distance pour des clients partout dans le monde en devises ($ / €).

🏢 **La plus stable en CDI local : Réseaux Informatiques & Fibre Optique**
- Toutes les entreprises de télécoms, FAI, microfinances, banques et ministères ont besoin d'administrateurs réseaux pour maintenir leur connectivité 24h/24.`,
          actions: [
            { text: '🎨 Cursus Infographie', link: '#formations' },
            { text: '💻 Cursus Développeur Web', link: '#formations' },
            { text: '💬 Discuter d\'un projet professionnel', whatsapp: 'Bonjour ENEANTECH, j\'aimerais des conseils sur la filière la plus porteuse pour mon profil.' }
          ]
        }
      ]
    },

    // 1. SALUTATIONS / IDENTITÉ
    {
      id: 'greeting',
      priority: 80,
      patterns: [/^(bonjour|bonsoir|salut|hello|hi|hey|coucou|yo)/i, /qui es[\s-]tu/i, /quel est ton nom/i, /c'est quoi ton role/i],
      responses: [
        {
          text: `Bonjour et bienvenue chez **ENEANTECH Sarl** ! Je suis **EneanBot**, votre assistant et mentor numérique.
Je suis là pour vous conseiller avec précision sur nos formations, vous orienter si vous débutez, ou préparer votre devis informatique en direct.

Comment puis-je vous être utile aujourd'hui ?`,
          actions: [
            { text: '🎓 Débutant : par où commencer ?', query: 'Conseils pour débutant' },
            { text: '💻 Nos Formations Certifiantes', query: 'Quelles sont vos formations ?' },
            { text: '💼 Estimer un projet / Devis', query: 'Combien coûte un site web ?' },
            { text: '📍 Où nous trouver à Maroua ?', query: 'Où se trouve ENEANTECH ?' }
          ]
        }
      ]
    },

    // 2. FORMATIONS GÉNÉRALES
    {
      id: 'formations_general',
      priority: 60,
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
            { text: '🧭 Conseils pour débutant', query: 'Conseils pour débutant' },
            { text: '💻 Dév Web & Mobile', query: 'Parle-moi de la formation dev web' },
            { text: '🌐 Réseaux & Télécoms', query: 'Parle-moi de la formation reseaux' },
            { text: '🎨 Infographie & Design', query: 'Parle-moi de la formation infographie' }
          ]
        }
      ]
    },

    // 3. DÉVELOPPEMENT WEB SPÉCIFIQUE
    {
      id: 'formation_web',
      priority: 75,
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
            { text: '🗺️ Voir la roadmap pour débutant', query: 'Comment devenir développeur en partant de zéro ?' },
            { text: '📝 S\'inscrire au pôle Web', link: '#formations' },
            { text: '💬 Poser une question sur WhatsApp', whatsapp: 'Bonjour, je souhaite m\'inscrire à la formation Développeur Web & Mobile chez ENEANTECH.' }
          ]
        }
      ]
    },

    // 4. RÉSEAUX INFORMATIQUES & TÉLÉCOMS
    {
      id: 'formation_reseaux',
      priority: 75,
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
            { text: '🗺️ Roadmap Réseaux pour débutant', query: 'Comment débuter en réseaux informatiques ?' },
            { text: '🌐 Découvrir le programme Réseaux', link: '#formations' },
            { text: '💬 Contacter le pôle Réseaux sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, je suis intéressé par la formation Réseaux Informatiques & Fibre Optique.' }
          ]
        }
      ]
    },

    // 5. INFOGRAPHIE & DESIGN
    {
      id: 'formation_infographie',
      priority: 75,
      patterns: [/infographie/i, /graphisme/i, /designer/i, /photoshop/i, /illustrator/i, /logo/i, /affiche/i, /ui[\s\/-]?ux/i],
      responses: [
        {
          text: `Le parcours **Infographie & Direction Artistique** forme aux compétences visuelles les plus recherchées :
- **Outils Pro :** Maîtrise complète de la suite Adobe (Photoshop, Illustrator, InDesign).
- **Identité de marque :** Création de logos vectoriels, chartes graphiques et typographies.
- **Communication visuelle :** Affiches publicitaires, visuels réseaux sociaux, roll-up, flyers.
- **UI/UX Design :** Maquettage d'applications et sites avec Figma.`,
          actions: [
            { text: '🗺️ Roadmap Infographie pour débutant', query: 'Comment débuter en infographie ?' },
            { text: '🎨 Voir les détails Infographie', link: '#formations' },
            { text: '💬 Échanger sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, je souhaite des infos sur la formation en Infographie & Design.' }
          ]
        }
      ]
    },

    // 6. CYBERSÉCURITÉ
    {
      id: 'formation_cyber',
      priority: 75,
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
      priority: 80,
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
      priority: 85,
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
      priority: 80,
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
      priority: 80,
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
      priority: 85,
      patterns: [/o[uù] (se trouve|etes|est) eneantech/i, /adresse/i, /localisation/i, /quartier/i, /maroua/i, /num[eé]ro/i, /t[eé]l[eé]phone/i, /whatsapp/i, /email/i, /mail/i, /horaire/i, /contact/i],
      responses: [
        {
          text: `📍 **Localisation :** Quartier Pitoaré, Maroua, Région de l'Extrême-Nord, Cameroun.
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
      priority: 85,
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

    // 13. MINI-DIAGNOSTIC GUIDÉ ÉTAPE PAR ÉTAPE
    {
      id: 'guidance_quiz',
      priority: 100,
      patterns: [/diagnostic d[eé]butant/i, /test d['\s]orientation/i, /aide[\s-]moi [aà] choisir/i, /je ne sais pas quoi choisir/i],
      responses: [
        {
          text: `Passons au diagnostic ! Pour trouver votre filière idéale en 10 secondes, dites-moi ce qui vous attire le plus :

1️⃣ **Option A :** J'aime les visuels, le dessin, les belles affiches et les réseaux sociaux.
2️⃣ **Option B :** J'aime résoudre des énigmes logiques et je veux créer des sites ou des applications.
3️⃣ **Option C :** J'aime toucher au matériel, brancher des câbles, configurer des box et de la fibre optique.
4️⃣ **Option D :** Je veux la compétence qui me permet de trouver des petits contrats le plus vite possible.

Cliquez sur votre réponse ci-dessous :`,
          actions: [
            { text: '🎨 Option A : Visuels & Design', query: 'Je choisis Option A visuels' },
            { text: '💻 Option B : Code & Applications', query: 'Je choisis Option B code' },
            { text: '🌐 Option C : Matériel & Réseau', query: 'Je choisis Option C réseau' },
            { text: '⚡ Option D : Monétisation rapide', query: 'Quelle formation rapporte le plus vite ?' }
          ]
        }
      ]
    },

    // 14. RÉPONSE OPTION A (VISUELS)
    {
      id: 'quiz_opt_a',
      priority: 105,
      patterns: [/option a/i, /visuels? (et|&)? design/i, /j['\s]?aime le design/i],
      responses: [
        {
          text: `🎯 **Diagnostic : Votre voie royale est l'Infographie & Direction Artistique !**

Pourquoi ce choix est parfait pour vous :
- Vous apprendrez la suite Adobe (Photoshop, Illustrator) pour concevoir des logos, affiches, emballages et chartes visuelles.
- **Zéro programmation requise.**
- C'est un métier immédiatement visible et valorisé à Maroua, dans tout le Cameroun et en ligne.`,
          actions: [
            { text: '🗺️ Voir la roadmap Infographie', query: 'Comment débuter en infographie ?' },
            { text: '📝 S\'inscrire au pôle Infographie', link: '#formations' },
            { text: '💬 Poser une question sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, suite au diagnostic j\'ai choisi l\'Infographie & Design.' }
          ]
        }
      ]
    },

    // 15. RÉPONSE OPTION B (CODE)
    {
      id: 'quiz_opt_b',
      priority: 105,
      patterns: [/option b/i, /code (et|&)? applications?/i, /je choisis le profil code/i],
      responses: [
        {
          text: `🎯 **Diagnostic : Votre voie royale est le Développement Web & Mobile !**

Pourquoi ce choix est parfait pour vous :
- Vous allez apprendre à créer des plateformes modernes, des boutiques e-commerce et des applications complètes.
- Vous commencez par HTML5 & CSS3 pour visualiser immédiatement le résultat, avant d'aborder JavaScript et le backend.
- C'est l'une des carrières les plus rémunératrices au monde avec de fortes opportunités en télétravail.`,
          actions: [
            { text: '🗺️ Voir la roadmap Développeur', query: 'Comment devenir développeur en partant de zéro ?' },
            { text: '📝 S\'inscrire au cursus Développeur', link: '#formations' },
            { text: '💬 Échanger avec l\'équipe Web', whatsapp: 'Bonjour ENEANTECH, suite au diagnostic je souhaite m\'inscrire en Développement Web & Mobile.' }
          ]
        }
      ]
    },

    // 16. RÉPONSE OPTION C (RÉSEAU)
    {
      id: 'quiz_opt_c',
      priority: 105,
      patterns: [/option c/i, /mat[eé]riel (et|&)? r[eé]seau/i, /je choisis le profil r[eé]seau/i],
      responses: [
        {
          text: `🎯 **Diagnostic : Votre voie royale est Réseaux Informatiques & Télécoms !**

Pourquoi ce choix est parfait pour vous :
- C'est un métier d'action et de terrain : soudure de fibre optique, câblage de baies de serveurs, configuration de routeurs Cisco & MikroTik.
- La connectivité internet et la fibre optique explosent au Cameroun : les techniciens certifiés sont recherchés en permanence par les entreprises, banques et FAI.`,
          actions: [
            { text: '🗺️ Voir la roadmap Réseaux', query: 'Comment débuter en réseaux informatiques ?' },
            { text: '🌐 Découvrir le cursus Réseaux', link: '#formations' },
            { text: '💬 Contacter le formateur Réseaux', whatsapp: 'Bonjour ENEANTECH, suite au diagnostic je choisis le cursus Réseaux & Télécoms.' }
          ]
        }
      ]
    },

    // 17. REMERCIEMENTS & POLITESSE
    {
      id: 'thanks',
      priority: 60,
      patterns: [/merci/i, /parfait/i, /super/i, /g[eé]nial/i, /top/i, /cool/i, /c['\s]?est not[eé]/i],
      responses: [
        {
          text: `C'est un véritable plaisir ! Chez **ENEANTECH**, nous sommes animés par une devise : *« Former pour impacter, développer pour transformer »*.

N'hésitez pas si vous avez la moindre interrogation, ou venez nous rencontrer directement à Pitoaré !`,
          actions: [
            { text: '🚀 Démarrer mon inscription', link: '#formations' },
            { text: '💬 Échanger sur WhatsApp avec l\'équipe', whatsapp: 'Bonjour ENEANTECH, merci pour ces conseils précieux !' }
          ]
        }
      ]
    }
  ];

  /* Réponse par défaut (Fallback) */
  const FALLBACK_RESPONSE = {
    text: `Je souhaite vous orienter au mieux ! Choisissez le thème qui vous intéresse ci-dessous ou posez-moi votre question plus précisément :`,
    actions: [
      { text: '🧭 Conseils pour débutant', query: 'Conseils pour débutant' },
      { text: '🎓 Toutes nos Formations', query: 'Quelles sont vos formations ?' },
      { text: '💼 Devis & Tarifs Projet', query: 'Combien coûte un site web ?' },
      { text: '💬 Parler à un conseiller humain', whatsapp: 'Bonjour ENEANTECH, j\'aimerais poser une question spécifique à un conseiller.' }
    ]
  };

  /* ==========================================================================
     04. MOTEUR DE MATCHING INTELLIGENT AVEC SCORING DE PRIORITÉ
     ========================================================================== */
  function findBestResponse(userInput) {
    const clean = userInput.trim().toLowerCase();
    let bestMatch = null;
    let highestScore = -1;

    for (const entry of KNOWLEDGE_BASE) {
      const priority = entry.priority || 50;
      let matchCount = 0;

      for (const pattern of entry.patterns) {
        if (pattern.test(clean)) {
          matchCount++;
        }
      }

      if (matchCount > 0) {
        // Le score combine la priorité de l'intention et le nombre de motifs correspondants
        const score = priority + matchCount * 12;
        if (score > highestScore) {
          highestScore = score;
          bestMatch = entry;
        }
      }
    }

    if (bestMatch && bestMatch.responses && bestMatch.responses.length > 0) {
      return bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)];
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
    // Italique : *texte*
    out = out.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Listes à puces
    const lines = out.split('\n');
    let inList = false;
    const formattedLines = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) {
        if (!inList) {
          formattedLines.push('<ul>');
          inList = true;
        }
        formattedLines.push(`<li>${trimmed.substring(2)}</li>`);
      } else {
        if (inList) {
          formattedLines.push('</ul>');
          inList = false;
        }
        if (trimmed.length > 0) {
          formattedLines.push(`<p>${trimmed}</p>`);
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
            <span>✨ Assistant & Mentor IA</span>
            <button class="bot-teaser__close" id="bot-teaser-close" aria-label="Fermer la bulle">&times;</button>
          </div>
          <div>Débutant ou porteur de projet ? <strong>Demandez un conseil personnalisé !</strong></div>
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
              <h4>${BOT_CONFIG.name} <span class="bot-tag">Mentor IA</span></h4>
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
            <p>Je suis votre assistant IA & conseiller d'orientation. Comment puis-je vous guider ?</p>
          </div>
        </div>

        <div class="bot-suggestions" id="bot-suggestions" aria-label="Suggestions de questions rapides">
          <button class="bot-chip" data-q="Conseils pour débutant">🧭 Débutant : par où commencer ?</button>
          <button class="bot-chip" data-q="Quelles sont vos formations ?">🎓 Formations</button>
          <button class="bot-chip" data-q="Combien coûte un site web ?">💼 Devis Projet</button>
          <button class="bot-chip" data-q="Faut-il un ordinateur pour débuter ?">💻 Faut-il un PC ?</button>
          <button class="bot-chip" data-q="Où se trouve ENEANTECH ?">📍 Contact</button>
        </div>

        <footer class="bot-footer">
          <form class="bot-form" id="bot-form">
            <input type="text" class="bot-input" id="bot-input" placeholder="Posez une question ou demandez conseil..." autocomplete="off" maxlength="300" />
            <button type="submit" class="bot-send" id="bot-send" aria-label="Envoyer le message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
          <div class="bot-disclaimer">ENEANTECH Intelligence Artificielle · Orientation & Devis 24/7</div>
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

      // Si premier lancement et aucun message, le bot propose un accueil complet
      if (this.history.length === 0) {
        this.sendBotReply({
          text: `Bonjour ! Je suis **${BOT_CONFIG.name}**, l'assistant et conseiller IA d'**ENEANTECH** à Maroua.\n\nQue vous débutiez complètement en informatique ou que vous ayez un projet d'entreprise, je suis là pour vous guider pas à pas !`,
          actions: [
            { text: '🧭 Débutant : par où commencer ?', query: 'Conseils pour débutant' },
            { text: '🎓 Découvrir toutes nos formations', query: 'Quelles sont vos formations ?' },
            { text: '💼 Estimer un devis de site / logiciel', query: 'Combien coûte un site web ?' },
            { text: '💬 Parler sur WhatsApp', whatsapp: 'Bonjour ENEANTECH, je souhaite échanger avec un conseiller.' }
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

    async handleUserMessage(text) {
      // 1. Ajouter le message utilisateur au DOM
      this.appendUserMessage(text);
      sfx.playSend();
      this.saveMessage('user', text);
      this.scrollToBottom();

      // 2. Afficher indicateur de frappe
      this.showTyping();

      // 3. Appel Hybride : D'abord le Proxy Sécurisé Vercel (/api/chat), sinon le moteur local
      await this.fetchAIResponse(text);
    }

    async fetchAIResponse(text) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: this.history.slice(-4)
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && data.success && data.text) {
            this.hideTyping();
            this.sendBotReply({
              text: data.text,
              actions: [
                { text: '💬 Poursuivre sur WhatsApp', whatsapp: `Bonjour ENEANTECH, suite à mon échange avec EneanBot au sujet de : "${text.slice(0, 50)}", je souhaite échanger avec vous.` },
                { text: '🎓 Découvrir les formations', link: '#formations' },
                { text: '💼 Demander un devis', link: '#devis' }
              ]
            }, true);
            return;
          }
        }
      } catch (err) {
        // En cas d'environnement local sans serveur Vercel, timeout ou 404
      } finally {
        clearTimeout(timeoutId);
      }

      // Si l'API Vercel n'est pas configurée ou indisponible -> Relais instantané par la base locale
      const thinkTime = Math.floor(Math.random() * 200) + 300;
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
        text: `Discussion remise à zéro. En quoi puis-je vous orienter ?`,
        actions: [
          { text: '🧭 Conseils pour débutant', query: 'Conseils pour débutant' },
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
