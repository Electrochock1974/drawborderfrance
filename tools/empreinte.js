#!/usr/bin/env node
/**
 * Calcule l'empreinte SHA-256 de l'enveloppe _wmeIntegre (même algo que dbf.js).
 *
 * Usage :
 *   node tools/empreinte.js
 *   node tools/empreinte.js ../dbf.js
 *
 * ⚠️ Approximation Node. La source de vérité est le hash affiché en console WME :
 *   [WME Draw Borders France v…] empreinte <hash>
 *   ( _wmeIntegre.toString() côté Tampermonkey peut différer de l’extraction fichier. )
 *
 * Publication GreasyFork : node tools/publier.js → dist/*.user.js
 * (empreinte à prendre sur la version dist installée dans le navigateur).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const file = path.resolve(process.argv[2] || path.join(__dirname, '..', 'dbf.js'));
const src = fs.readFileSync(file, 'utf8');

const marker = 'function _wmeIntegre()';
const start = src.indexOf(marker);
if (start < 0) {
    console.error('Introuvable: function _wmeIntegre() dans', file);
    process.exit(1);
}

// Extraire le corps { … } équilibré (ignore { } dans chaînes / templates / commentaires)
let i = src.indexOf('{', start);
if (i < 0) {
    console.error('Accolade ouvrante introuvable');
    process.exit(1);
}
let depth = 0;
let inLine = false;
let inBlock = false;
let inS = null;
let esc = false;
let tpl = 0;
const endLimit = src.length;
for (; i < endLimit; i++) {
    const c = src[i];
    const n = src[i + 1] || '';
    if (inLine) {
        if (c === '\n') inLine = false;
        continue;
    }
    if (inBlock) {
        if (c === '*' && n === '/') { inBlock = false; i++; }
        continue;
    }
    if (inS) {
        if (esc) { esc = false; continue; }
        if (c === '\\') { esc = true; continue; }
        if (inS === '`' && c === '$' && n === '{') { tpl++; i++; continue; }
        if (inS === '`' && c === '}' && tpl) { tpl--; continue; }
        if (c === inS && (inS !== '`' || tpl === 0)) inS = null;
        continue;
    }
    if (c === '/' && n === '/') { inLine = true; i++; continue; }
    if (c === '/' && n === '*') { inBlock = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { inS = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
        depth--;
        if (depth === 0) { i++; break; }
    }
}

const fnText = src.slice(start, i);
const normalized = fnText.replace(/\r\n/g, '\n').split('\n')
    .filter((l) => !/^\/\/ @(downloadURL|updateURL)\b/.test(l))
    .join('\n');

const hash = crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');

const verMatch = src.match(/\/\/\s*@version\s+(\S+)/);
const version = verMatch ? verMatch[1] : '?';

console.log('fichier   :', file);
console.log('version   :', version);
console.log('octets    :', Buffer.byteLength(normalized, 'utf8'));
console.log('empreinte :', hash);
console.log('');
console.log('À coller dans version-min.json → empreintes["' + version + '"] :');
console.log(JSON.stringify(hash));
