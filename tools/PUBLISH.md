# Publication DBF + verrou d’intégrité

Le script lit au démarrage :

`https://raw.githubusercontent.com/Electrochock1974/drawborderfrance/main/version-min.json`

Dépôt : https://github.com/Electrochock1974/drawborderfrance

## Avant chaque release GreasyFork

1. Monter `// @version` dans `dbf.js`
2. Installer / recharger le script dans Tampermonkey, ouvrir WME
3. En console, copier le hash de la ligne  
   `[WME Draw Borders France v…] empreinte <hash>`  
   (**c’est la référence** — `node tools/empreinte.js` peut différer de Tampermonkey)
4. Ajouter l’entrée dans `version-min.json` (`empreintes["x.y.z"] = "<hash>"`)
5. Pousser `version-min.json` sur GitHub **avant** ou avec GreasyFork
6. Publier `dbf.js` sur [GreasyFork #8138](https://greasyfork.org/scripts/8138)

## Retirer une version

Monter `min` au-dessus des versions à invalider. Les clients encore sur une version `< min` voient le bandeau « retirée ».

## Limite

Le contrôle tourne dans le navigateur : il bloque une copie modifiée ou périmée, pas quelqu’un qui retire le bloc `_vm*`.
