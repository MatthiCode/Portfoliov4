/* ==========================================================================
   MUSÉE MATTHIEU BAYLE : données
   Tout le contenu éditable est ici. Pour remplacer un visuel généré par une
   vraie photo, renseigne `image: "assets/ton-fichier.jpg"` : si le fichier
   existe il est affiché, sinon le paysage de remplacement est généré.
   Les entrées marquées `placeholder: true` sont des exemples à remplacer.
   ========================================================================== */

window.MUSEE = {
  me: {
    nom: "Matthieu Bayle",
    // Remplace par ton vrai email / liens
    email: "ei.matthieub@gmail.com",
    liens: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "GitHub", href: "https://github.com/MatthiCode" },
      { label: "Instagram", href: "https://www.instagram.com/" }
    ],
    portrait: { image: "assets/matthieu.jpg", scene: "dawn", seed: 7 }
  },

  // Les 15 sites : les 6 premiers sont exposés dans la galerie, tous figurent dans le registre.
  oeuvres: [
    { titre: "Site vitrine, artisan",        annee: "2025", secteur: "Artisanat",       outils: "HTML · CSS · JS · Figma", role: "Design + développement", scene: "dawn",    seed: 11, image: "assets/oeuvres/01.jpg", placeholder: true },
    { titre: "Refonte, restaurant",          annee: "2025", secteur: "Restauration",    outils: "UI/UX · Intégration",     role: "Design + développement", scene: "glacier", seed: 23, image: "assets/oeuvres/02.jpg", placeholder: true },
    { titre: "Landing page, coach sportif",  annee: "2025", secteur: "Sport",           outils: "GSAP · Figma",            role: "Design + développement", scene: "dusk",    seed: 35, image: "assets/oeuvres/03.jpg", placeholder: true },
    { titre: "Site, association locale",     annee: "2025", secteur: "Associatif",      outils: "HTML · CSS · JS",         role: "Développement",          scene: "forest",  seed: 47, image: "assets/oeuvres/04.jpg", placeholder: true },
    { titre: "Vitrine, photographe",         annee: "2026", secteur: "Création",        outils: "UI/UX · Intégration",     role: "Design + développement", scene: "storm",   seed: 59, image: "assets/oeuvres/05.jpg", placeholder: true },
    { titre: "Site, commerce de proximité",  annee: "2026", secteur: "Commerce",        outils: "HTML · CSS · JS",         role: "Design + développement", scene: "gold",    seed: 71, image: "assets/oeuvres/06.jpg", placeholder: true },
    { titre: "Projet client",  annee: "2025", secteur: "À renseigner", placeholder: true },
    { titre: "Projet client",  annee: "2025", secteur: "À renseigner", placeholder: true },
    { titre: "Projet client",  annee: "2025", secteur: "À renseigner", placeholder: true },
    { titre: "Projet client",  annee: "2025", secteur: "À renseigner", placeholder: true },
    { titre: "Projet client",  annee: "2026", secteur: "À renseigner", placeholder: true },
    { titre: "Projet client",  annee: "2026", secteur: "À renseigner", placeholder: true },
    { titre: "Projet client",  annee: "2026", secteur: "À renseigner", placeholder: true },
    { titre: "Projet client",  annee: "2026", secteur: "À renseigner", placeholder: true },
    { titre: "Projet client",  annee: "2026", secteur: "À renseigner", placeholder: true }
  ],

  fabrik: {
    nom: "Fabrik Ta Pépite",
    image: "assets/fabrik.jpg",
    scene: "gold",
    seed: 5,
    etapes: [
      { t: "Le concept", r: "Camp de base",     d: "Une compote énergisante, pensée comme un vrai produit : un besoin, une cible, une promesse." },
      { t: "L'identité", r: "Première crête",     d: "Nom, univers visuel et positionnement construits sous Figma, de la recherche documentaire aux déclinaisons." },
      { t: "L'équipe", r: "La cordée",       d: "Un projet mené à plusieurs : répartition des rôles, décisions collectives, défense d'une idée commune." },
      { t: "Le jury", r: "Le sommet",        d: "Une présentation finale devant un jury. Convaincre, c'est aussi un savoir-faire." }
    ]
  },

  ambitions: [
    { titre: "Une agence",        texte: "Réunir design, développement et stratégie sous un même toit, pour des projets qui durent.", progression: 25, ouverture: "Ouverture prévue, date à définir" },
    { titre: "Des SaaS",          texte: "Transformer des problèmes récurrents en produits utiles, simples et bien finis.",            progression: 15, ouverture: "En cours de réflexion" },
    { titre: "Indépendance",      texte: "Construire une activité qui me laisse la liberté de choisir mes projets et mes équipes.",     progression: 40, ouverture: "Chantier ouvert" }
  ],

  competences: [
    { domaine: "Développement web",         outils: "HTML · CSS · JavaScript · Git / GitHub · VS Code", niveau: 4 },
    { domaine: "UI / UX",                   outils: "Figma · Adobe Illustrator · Photoshop",            niveau: 4 },
    { domaine: "Communication visuelle",    outils: "Illustrator · Photoshop",                          niveau: 3 },
    { domaine: "Audiovisuel",               outils: "Caméra · Prise de son · DaVinci Resolve",          niveau: 3 },
    { domaine: "Création de contenu",       outils: "Rédaction · Réseaux sociaux",                      niveau: 3 },
    { domaine: "Marketing numérique",       outils: "Cible · Proposition de valeur · Conversion",       niveau: 2 },
    { domaine: "Gestion de projet",         outils: "Organisation · Étapes · Suivi client",             niveau: 3 }
  ],

  parcours: [
    { date: "2022",        titre: "Premier portfolio",              texte: "Le début de l'aventure : construire en ligne pour apprendre." },
    { date: "2024",        titre: "Premiers sites, premiers clients", texte: "Callisthénie, badminton, PSC1, et les premières missions web." },
    { date: "2025",        titre: "Freelance",                      texte: "Développeur web & designer UI/UX indépendant." },
    { date: "2026",        titre: "BUT MMI, Lannion",              texte: "IUT de Lannion, Université de Rennes. West Fest, Fabrik Ta Pépite, 15 sites livrés." },
    { date: "2029",        titre: "Prochaine salle",                texte: "Diplôme en poche, et l'agence en ligne de mire." }
  ],

  horsEcran: [
    { titre: "La montagne",    legende: "Mon terrain de jeu préféré. Respirer, voir loin, rester humble.", scene: "glacier", seed: 101, image: "assets/hors-ecran/montagne.jpg" },
    { titre: "Callisthénie",   legende: "Depuis 2024. Du poids du corps, de la patience, de la régularité.", scene: "storm",   seed: 113, image: "assets/hors-ecran/callisthenie.jpg" },
    { titre: "Badminton",      legende: "Coordination, réactivité, et un peu de stratégie.",                 scene: "dusk",    seed: 127, image: "assets/hors-ecran/badminton.jpg" },
    { titre: "Projet à deux",  legende: "Construire une vie et des projets à deux. L'équilibre avant tout.", scene: "gold",    seed: 139, image: "assets/hors-ecran/duo.jpg" },
    { titre: "Le matin",       legende: "Curieux et autodidacte : toujours quelque chose à apprendre.",      scene: "dawn",    seed: 151, image: "assets/hors-ecran/matin.jpg" }
  ]
};
