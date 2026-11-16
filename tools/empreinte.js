#!/usr/bin/env node
/**
 * Calcule l'empreinte SHA-256 de l'enveloppe _wmeIntegre (même algo que dbf.js).
 *
 * Usage :
 *   node tools/empreinte.js
 *   node tools/empreinte.js ../dbf.js
 *   node tools/empreinte.js ../dist/WME-Draw-Borders-France.user.js
 *
 * Préfère Function#toString() via eval (aligné Tampermonkey) ; repli extraction fichier.
 *
 * Publication : node tools/publier.js → dist/*.user.js puis empreinte sur dist.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const file = path.resolve(process.argv[2] || path.join(__dirname, '..', 'dbf.js'));
const src = fs.readFileSync(file, 'utf8');

function normalize(fnText) {
    return String(fnText).replace(/\r\n/g, '\n').split('\n')
        .filter((l) => !/^\/\/ @(downloadURL|updateURL)\b/.test(l))
        .join('\n');
}

function hashText(fnText) {
    return crypto.createHash('sha256').update(normalize(fnText), 'utf8').digest('hex');
}

/** Empreinte via toString() — source de vérité proche du navigateur. */
function viaToString(source) {
    const endMark = '// ==/UserScript==';
    const idx = source.indexOf(endMark);
    let code = (idx >= 0 ? source.slice(idx + endMark.length) : source).replace(/^\uFEFF/, '').trim();
    if (!/\(function\s+_wmeIntegre\s*\(/.test(code)) return null;
    code = code.replace(/\)\s*\(\s*\)\s*;?\s*$/, ')');
    let fn;
    try {
        fn = eval(code); // eslint-disable-line no-eval
    } catch (e) {
        return null;
    }
    if (typeof fn !== 'function') return null;
    return {
        method: 'toString',
        text: Function.prototype.toString.call(fn),
        hash: hashText(Function.prototype.toString.call(fn))
    };
}

/** Repli : découpe fichier sur accolades (peut diverger si parse { } imperfect). */
function viaFileSlice(source) {
    const marker = 'function _wmeIntegre()';
    const start = source.indexOf(marker);
    if (start < 0) return null;
    let i = source.indexOf('{', start);
    if (i < 0) return null;
    let depth = 0;
    let inLine = false;
    let inBlock = false;
    let inS = null;
    let esc = false;
    let tpl = 0;
    const endLimit = source.length;
    for (; i < endLimit; i++) {
        const c = source[i];
        const n = source[i + 1] || '';
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
    const text = source.slice(start, i);
    return { method: 'file-slice', text: text, hash: hashText(text) };
}

const primary = viaToString(src) || viaFileSlice(src);
if (!primary) {
    console.error('Impossible de calculer l’empreinte pour', file);
    process.exit(1);
}

const verMatch = src.match(/\/\/\s*@version\s+(\S+)/);
const version = verMatch ? verMatch[1] : '?';

console.log('fichier   :', file);
console.log('version   :', version);
console.log('méthode   :', primary.method);
console.log('octets    :', Buffer.byteLength(normalize(primary.text), 'utf8'));
console.log('empreinte :', primary.hash);
console.log('');
console.log('À coller dans version-min.json → empreintes["' + version + '"] :');
console.log(JSON.stringify(primary.hash));
