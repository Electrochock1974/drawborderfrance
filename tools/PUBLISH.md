# Publication DBF + verrou d’intégrité

Le script lit au démarrage :

`https://raw.githubusercontent.com/Electrochock1974/drawborderfrance/main/version-min.json`

Dépôt : https://github.com/Electrochock1974/drawborderfrance

## Règles du verrou

- Empreinte ≠ publiée → **script bloqué** (copie modifiée), même pour le mainteneur  
  → monter `@version`, tester, puis enregistrer la nouvelle empreinte
- Version absente de `version-min.json` → bloqué, **sauf** mainteneur (test avant pub)
- Version `< min` → bloqué (retirée) — **bloque aussi les vieux clients** qui n’ont pas encore la logique « latest »
- Version `< max(empreintes)` → bloqué (mise à jour publiée)
- GitHub injoignable → démarrage (fail-open)

## Avant chaque release GreasyFork

1. Monter `// @version` dans `dbf.js`
2. Installer / recharger dans Tampermonkey, ouvrir WME (mainteneur : démarre en « non publiée »)
3. Console : copier le hash  
   `empreintes["x.y.z"] = "<hash>"`  
   (**référence navigateur** — pas `node tools/empreinte.js`)
4. Ajouter l’entrée dans `version-min.json`, **mettre `min` à cette version**, et pousser sur GitHub  
   → dès que `min` / la nouvelle empreinte est en ligne, les anciennes versions sont bloquées
5. Publier `dbf.js` sur [GreasyFork #8138](https://greasyfork.org/scripts/8138)

## Retirer une version

Monter `min` au-dessus des versions à invalider (en pratique : `min` = dernière version publiée).  
Les clients encore en dessous voient le bandeau « obsolète » et ne démarrent pas.

## Limite

Le contrôle tourne dans le navigateur : il bloque une copie modifiée ou périmée, pas quelqu’un qui retire le bloc `_vm*`.
