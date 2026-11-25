# Journal des modifications

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Versions datées.

## [1.0.0] — 2026-11-25

### Ajouté

- Sources communes aux deux éditions (`src/js`, `src/styles`) et configuration par édition (`src/js/editions/`) ; build vers `dist/egide-france.html` et `dist/egide-global.html`.
- Tests d'intégrité (node:test) et parcours de bout en bout bureau et mobile des deux éditions (Playwright), CI GitHub Actions.
- Publication des deux démonstrations sur GitHub Pages.
- Documentation : architecture (éditions, état partagé, calcul du prix), captures, sécurité, contribution.

### Corrigé

- Démonstrations guidées enchaînées rapidement : une étape différée (arrivée de l'agent) pouvait s'appliquer après la réinitialisation et provoquer une erreur ; les étapes en attente sont désormais annulées.

### Modifié

- En-têtes HTML complétés (description, couleur de thème, icône).
