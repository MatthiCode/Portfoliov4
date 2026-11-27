# Musée Matthieu Bayle, portfolio

Portfolio en forme de musée : 7 salles, noir / blanc / gris, couleur uniquement dans les photos.
HTML + CSS + JS, GSAP + ScrollTrigger + Lenis (hébergés dans `vendor/`, aucun build, pas de 3D).

## Voir le site en local
```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

## Tout modifier au même endroit : `js/data.js`
- `me` : email, liens (LinkedIn, GitHub, Instagram), photo plein fond du hall (`hero`, fichier `assets/hero.jpg`)
- `oeuvres` : les 15 sites (les premiers sont dans la galerie, tous sont dans le registre)
  - champs : `titre`, `annee`, `secteur`, `outils`, `role`, `image`, `lien` (optionnel, rend la ligne cliquable)
  - supprime `placeholder: true` pour retirer l'étiquette « Fiche d'exemple »
- `fabrik`, `competences`, `parcours`, `horsEcran`

## Remplacer les visuels de remplacement par tes photos
Dépose le fichier au chemin indiqué dans `data.js` (ex. `assets/oeuvres/01.jpg`,
`assets/hors-ecran/montagne.jpg`, `assets/fabrik.jpg`). S'il existe, il remplace automatiquement le paysage généré.
Formats conseillés : JPG/WebP, 1600 px de large max, < 300 Ko si possible.

## Publier sur GitHub Pages
Réglages du dépôt → Pages → branche à publier. Le site est alors disponible à l'adresse `https://matthicode.github.io/Portfoliov4/`.
