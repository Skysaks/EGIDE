# Architecture

ÉGIDE est une démonstration produit en JavaScript sans dépendance, livrée en deux fichiers HTML autonomes — édition France et édition Global — construits depuis les mêmes sources. Ce document décrit la chaîne de build, le mécanisme d'édition, l'état partagé entre les quatre applications et le calcul des prix.

## De `src/` à `dist/`

```
src/*.html ───────┐
src/styles/*.css  ├─ scripts/build.mjs ──► dist/egide-france.html, dist/egide-global.html
src/fonts/*.woff2 ┤     • <link rel="stylesheet"> → <style> (url() des polices → data:font/woff2)
src/js/*.js ──────┘     • <script src> d'un même data-bundle → un seul <script>
```

- Le gabarit référence les fichiers comme une page web classique ; les balises qui partagent un `data-bundle` sont concaténées dans l'ordre, sans séparateur. Le résultat est un script classique unique : les déclarations d'un module sont visibles de tous, comme dans un fichier d'un seul tenant.
- `npm run build -- --check` reconstruit en mémoire et compare octet par octet avec `dist/egide-france.html` et `dist/egide-global.html` ; la CI échoue au moindre écart.
- `scripts/lib.mjs` porte aussi les contrôles : ressources externes (balises `src`/`href`, `url()`, `@import`, `import()`) et données personnelles (adresses, jetons, liens privés, termes locaux d'un fichier `.prive-termes.txt` jamais publié).

## Modules

| Fichier | Rôle |
|---|---|
| `editions/france.js · editions/global.js` | `CFG` : marché, langue et ville par défaut, clé de stockage, villes (devise, coefficient de prix, coordonnées, numéros d'urgence, quartiers, lieux, agents fictifs et leurs langues) |
| `02-noyau.js` | traductions `L(fr, en)`, icônes, préférences (`localStorage`, clé propre à l'édition), utilitaires |
| `03-villes.js` | lieux et agents de la ville courante, positions sur la carte schématique |
| `04-gammes-prix.js` | six gammes, contextes, calcul du devis |
| `05-etat.js` | état global `S` : client (`c`), agent (`a`), entreprise (`b`), opérations (`o`) |
| `06-graphiques.js` | graphiques SVG maison (courbes, barres, anneaux) |
| `07-donnees-demo.js` | séries déterministes pour les tableaux de bord |
| `08-app-client.js` | application client : réservation, suivi, code de rencontre, SOS, fin de mission, activité |
| `09-app-agent.js` | application agent : en ligne, briefing, mission, planning, revenus, documents |
| `10-portail-entreprise.js` | portail entreprise : budget, voyageurs, approbations, politique, factures |
| `11-console-operations.js` | console : missions en direct, alertes, vérification des agents, tarification |
| `12-reglages-routeur.js` | réglages, routeur des quatre vues, démonstrations guidées, horloge, démarrage |

## Éditions

Chaque gabarit (`src/france.html`, `src/global.html`) ne diffère que par sa langue, son titre et le premier module chargé : `editions/france.js` ou `editions/global.js`. Ce module déclare `CFG` ; tous les modules suivants sont communs et ne lisent le marché qu'à travers lui. Le test `aucun fichier orphelin` garantit qu'aucun module commun n'est oublié par l'un des deux gabarits.

## Quatre applications, un état

```
S.c  client ──── réserve ───► S.o.missions ◄─── console d'opérations (S.o)
S.a  agent  ──── accepte ───►      │
S.b  entreprise ─ approuve ──►     └── SOS client → alerte en direct dans la console
```

Les quatre vues lisent et écrivent le même objet `S` : la démonstration montre ainsi les effets croisés (une mission réservée apparaît en opérations, un SOS remonte en direct). Une horloge d'une seconde fait avancer les missions en cours et rafraîchit la console quand elle est visible.

## Calcul du prix

```
base = tarif horaire de la gamme × coefficient de la ville × heures × (1 + 25 % par protégé au-delà du seuil de la gamme)
HT   = base × majoration de nuit (22 h – 6 h) × majoration de forte demande de la ville
TTC  = HT + frais de service (4,90) + TVA 20 % sur HT et frais
```

Les gammes Événement et Renforcée ne sont pas tarifées en ligne : devis en moins d'une heure, ou étude sur dossier. Les majorations sont réglables depuis la console d'opérations.

## Démonstrations guidées

Les sept démonstrations (`demo(v)`) placent l'application client dans un état précis, parfois en plusieurs temps (réservation puis arrivée de l'agent). Leurs étapes différées sont enregistrées et annulées au lancement d'une autre démonstration, pour qu'une étape en retard ne s'applique jamais à un état déjà réinitialisé.

## Tests

| Fichier | Vérifie |
|---|---|
| `tests/build.test.mjs` | `dist/` à jour, document complet (langue, encodage, viewport, titre, description), aucune ressource externe, aucun fichier orphelin dans `src/`, aucune donnée personnelle |
| `tests/e2e/app.spec.mjs` | ouverture hors ligne sans erreur ni requête, absence de débordement horizontal, parcours des quatre applications, des sept démonstrations guidées, du changement de langue et du panneau de réglages, pour chaque édition ; en 1440 × 900 et en 390 × 844 tactile |

Les parcours sont décrits dans `build.config.json` (`e2e.flows`), ce qui garde le fichier de test générique.
