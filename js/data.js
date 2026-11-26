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
    hero: { image: "assets/hero.jpg", scene: "dawn", seed: 7, wide: true }
  },

  // Projets exposés. `vedette: true` = dans la galerie ; tous sont dans le registre.
  // `ratio` : proportion du cadre. `lien` : page du projet (le dépôt GitHub par défaut,
  // remplace par l'adresse du site en ligne si tu en as une).
  oeuvres: [
    { titre: "Armor Calistenics, site du collectif", annee: "2026", secteur: "Sport, collectif", outils: "HTML, CSS, JS", role: "Cofondateur, design et développement", image: "assets/oeuvres/armor-site.jpg", ratio: "16 / 9", scene: "storm", seed: 31, lien: "https://github.com/MatthiCode/ArmorCallisthenics", vedette: true },
    { titre: "Armor Calistenics, identité visuelle", secteur: "Identité visuelle", outils: "Logo, Typographies, Palette", role: "Cofondateur, direction artistique", image: "assets/oeuvres/armor-identite.jpg", ratio: "16 / 9", scene: "dusk", seed: 17, vedette: true },
    { titre: "Corde de mains", annee: "2026", secteur: "Expérience interactive", outils: "JavaScript, MediaPipe, Canvas, Web Audio", role: "Conception et développement", image: "assets/oeuvres/corde-de-mains.jpg", ratio: "16 / 9", scene: "glacier", seed: 43, lien: "https://github.com/MatthiCode/Effetinsta", vedette: true },
    { titre: "Le Petit Prince, affiche", secteur: "Création graphique", role: "Design graphique", image: "assets/oeuvres/petit-prince.jpg", ratio: "2 / 3", scene: "dusk", seed: 53, vedette: true },
    { titre: "Squeezie, illustration", secteur: "Création graphique", outils: "Illustration vectorielle", role: "Design graphique", image: "assets/oeuvres/squeezie.jpg", ratio: "16 / 9", scene: "gold", seed: 61, vedette: true },
    { titre: "Portfolio v3", annee: "2026", secteur: "Portfolio", outils: "GSAP, Lenis, Three.js", role: "Design et développement", scene: "forest", seed: 71, lien: "https://github.com/MatthiCode/matthv3" }
  ],

  fabrik: {
    nom: "Freiz",
    image: "assets/freiz.jpg",
    scene: "forest",
    seed: 5
  },


  outils: ["Figma", "HTML", "CSS", "JavaScript", "Git", "GitHub", "VS Code", "Illustrator", "Photoshop", "DaVinci Resolve", "GSAP", "Three.js"],

  competences: [
    { domaine: "Développement web",         outils: "HTML, CSS, JavaScript, Git / GitHub, VS Code", niveau: 4 },
    { domaine: "UI / UX",                   outils: "Figma, Adobe Illustrator, Photoshop",            niveau: 4 },
    { domaine: "Communication visuelle",    outils: "Illustrator, Photoshop",                          niveau: 3 },
    { domaine: "Audiovisuel",               outils: "Caméra, Prise de son, DaVinci Resolve",          niveau: 3 },
    { domaine: "Création de contenu",       outils: "Rédaction, Réseaux sociaux",                      niveau: 3 },
    { domaine: "Marketing numérique",       outils: "Cible, Proposition de valeur, Conversion",       niveau: 2 },
    { domaine: "Gestion de projet",         outils: "Organisation, Étapes, Suivi client",             niveau: 3 }
  ],

  parcours: [
    { date: "2022",        titre: "Premier portfolio",              texte: "Le début de l'aventure : construire en ligne pour apprendre." },
    { date: "2024",        titre: "Premiers sites, premiers clients", texte: "Callisthénie, badminton, PSC1, et les premières missions web." },
    { date: "2025",        titre: "Freelance",                      texte: "Développeur web & designer UI/UX indépendant." },
    { date: "2026",        titre: "BUT MMI, Lannion",              texte: "IUT de Lannion, Université de Rennes. West Fest, Fabrik Ta Pépite, 15 sites livrés." },
    { date: "2029",        titre: "La suite",                texte: "Diplôme en poche, et l'agence en ligne de mire." }
  ],

};
