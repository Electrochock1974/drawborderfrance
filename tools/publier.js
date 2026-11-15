#!/usr/bin/env node
/**
 * Génère la version GreasyFork : en-tête userscript intact (@grant, @connect…),
 * corps sans commentaires ligne/bloc (chaînes, templates et regex préservés).
 *
 * Usage :
 *   node tools/publier.js
 *   node tools/publier.js chemin/sortie.user.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'dbf.js');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'dist', 'WME-Draw-Borders-France.user.js'));

function isMetaLine(line) {
    return /^\/\/\s*@\w+/.test(line) || /^\/\/\s*==\/?UserScript==/.test(line);
}

function extractHeader(src) {
    const start = src.indexOf('// ==UserScript==');
    const endMark = '// ==/UserScript==';
    const end = src.indexOf(endMark);
    if (start < 0 || end < 0) {
        throw new Error('Bloc // ==UserScript== … // ==/UserScript== introuvable');
    }
    const raw = src.slice(start, end + endMark.length);
    const lines = raw.split(/\r?\n/);
    const kept = lines.filter(function (l) {
        const t = l.trim();
        if (!t) return false;
        return isMetaLine(t);
    });
    return kept.join('\n') + '\n';
}

const KEY_BEFORE_RE = {
    return: 1, case: 1, throw: 1, else: 1, typeof: 1, void: 1,
    delete: 1, new: 1, await: 1, yield: 1, in: 1, of: 1, instanceof: 1
};

/** true si `/` peut démarrer un littéral regexp (heuristique JS). */
function canStartRegex(prev, lastWord) {
    if (lastWord && KEY_BEFORE_RE[lastWord]) return true;
    if (!prev) return true;
    if (/[)}\].\w$]/.test(prev)) return false;
    return true;
}

function stripComments(code) {
    let out = '';
    let i = 0;
    const n = code.length;
    let inLine = false;
    let inBlock = false;
    let inS = null; // ', " or `
    let esc = false;
    let tpl = 0;
    let inRegex = false;
    let reClass = false;
    let lastEmit = '';
    let lastWord = '';
    let word = '';

    const emit = function (ch) {
        out += ch;
        if (/[A-Za-z0-9_$]/.test(ch)) {
            word += ch;
            lastEmit = ch;
            return;
        }
        if (word) {
            lastWord = word;
            word = '';
        } else if (!/\s/.test(ch)) {
            lastWord = '';
        }
        if (!/\s/.test(ch)) lastEmit = ch;
    };

    while (i < n) {
        const c = code[i];
        const n1 = code[i + 1] || '';

        if (inLine) {
            if (c === '\n') {
                inLine = false;
                emit(c);
            }
            i++;
            continue;
        }
        if (inBlock) {
            if (c === '*' && n1 === '/') {
                inBlock = false;
                i += 2;
                continue;
            }
            if (c === '\n') emit('\n');
            i++;
            continue;
        }
        if (inRegex) {
            emit(c);
            if (esc) {
                esc = false;
                i++;
                continue;
            }
            if (c === '\\') {
                esc = true;
                i++;
                continue;
            }
            if (c === '[') reClass = true;
            else if (c === ']' && reClass) reClass = false;
            else if (c === '/' && !reClass) {
                inRegex = false;
                i++;
                while (i < n && /[gimsuy]/.test(code[i])) {
                    emit(code[i]);
                    i++;
                }
                continue;
            }
            i++;
            continue;
        }
        if (inS) {
            emit(c);
            if (esc) {
                esc = false;
                i++;
                continue;
            }
            if (c === '\\') {
                esc = true;
                i++;
                continue;
            }
            if (inS === '`' && c === '$' && n1 === '{') {
                tpl++;
                emit(n1);
                i += 2;
                continue;
            }
            if (inS === '`' && c === '}' && tpl) {
                tpl--;
                i++;
                continue;
            }
            if (c === inS && (inS !== '`' || tpl === 0)) inS = null;
            i++;
            continue;
        }

        if (c === '/' && n1 === '/') {
            inLine = true;
            i += 2;
            continue;
        }
        if (c === '/' && n1 === '*') {
            inBlock = true;
            i += 2;
            continue;
        }
        if (c === '/' && canStartRegex(lastEmit, lastWord)) {
            inRegex = true;
            reClass = false;
            emit(c);
            i++;
            continue;
        }
        if (c === '"' || c === "'" || c === '`') {
            inS = c;
            emit(c);
            i++;
            continue;
        }
        emit(c);
        i++;
    }
    return out;
}

function tidyBody(body) {
    return body
        .replace(/\r\n/g, '\n')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/^\n+/, '\n')
        .replace(/\n*$/, '\n');
}

const src = fs.readFileSync(SRC, 'utf8');
const header = extractHeader(src);
const endMark = '// ==/UserScript==';
const bodyStart = src.indexOf(endMark) + endMark.length;
const body = tidyBody(stripComments(src.slice(bodyStart)));

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, header + body, 'utf8');

const linesIn = src.split(/\n/).length;
const linesOut = (header + body).split(/\n/).length;
console.log('OK', path.relative(ROOT, OUT));
console.log('lignes', linesIn, '→', linesOut);
