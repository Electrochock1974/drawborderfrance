# Publication DBF + verrou d’intégrité

Le script lit au démarrage :

`https://raw.githubusercontent.com/Electrochock1974/drawborderfrance/main/version-min.json`

Dépôt : https://github.com/Electrochock1974/drawborderfrance

## Avant chaque release GreasyFork

1. Monter `// @version` dans `dbf.js`
2. `node tools/empreinte.js` → copier l’empreinte
3. Ajouter l’entrée dans `version-min.json` (`empreintes["x.y.z"]`)
4. Pousser `version-min.json` (et le dépôt) sur GitHub **avant** ou en même temps que GreasyFork
5. Publier `dbf.js` sur [GreasyFork #8138](https://greasyfork.org/scripts/8138)

## Retirer une version

Monter `min` au-dessus des versions à invalider. Les clients encore sur une version `< min` voient le bandeau « retirée ».

## Limite

Le contrôle tourne dans le navigateur : il bloque une copie modifiée ou périmée, pas quelqu’un qui retire le bloc `_vm*`.
