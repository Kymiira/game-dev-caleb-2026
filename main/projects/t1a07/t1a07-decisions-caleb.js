'use strict';
const typeA = document.getElementById('typeA');
const typeB = document.getElementById('typeB');
const valA = document.getElementById('valA');
const valB = document.getElementById('valB');
const opSel = document.getElementById('opSel');
const presetSel = document.getElementById('presetSel');
const codeOut = document.getElementById('codeOut');
const resOut = document.getElementById('resOut');
const typesOut = document.getElementById('typesOut');
const whyOut = document.getElementById('whyOut');
const errOut = document.getElementById('errOut');
const noInput = ['null', 'undefined', 'nan'];
const hints = { int: 'whole number like 5', float: 'decimal like 5.5', string: 'any text', bool: 'true or false', array: 'json like [1,2]' };
const presets = [
    ['5 == "5"', 'int', '5', '==', 'string', '5'],
    ['5 === "5"', 'int', '5', '===', 'string', '5'],
    ['0 == ""', 'int', '0', '==', 'string', ''],
    ['0 == false', 'int', '0', '==', 'bool', 'false'],
    ['"1" == true', 'string', '1', '==', 'bool', 'true'],
    ['null == undefined', 'null', '', '==', 'undefined', ''],
    ['null === undefined', 'null', '', '===', 'undefined', ''],
    ['null == 0', 'null', '', '==', 'int', '0'],
    ['nan == nan', 'nan', '', '==', 'nan', ''],
    ['[] == false', 'array', '[]', '==', 'bool', 'false'],
    ['[] == ""', 'array', '[]', '==', 'string', ''],
    ['[] == []', 'array', '[]', '==', 'array', '[]'],
    ['5 === 5.0', 'int', '5', '===', 'float', '5'],
    ['"abc" !== "ABC"', 'string', 'abc', '!==', 'string', 'ABC']
];

function parse(kind, text) {
    switch (kind) {
        case 'int':
            if (!/^-?\d+$/.test(text.trim())) throw new Error(`"${text}" is not a valid int`);
            return String(parseInt(text, 10));
        case 'float': {
            if (!/^-?\d+(\.\d+)?$/.test(text.trim())) throw new Error(`"${text}" is not a valid float`);
            const s = String(Number(text));
            return s.includes('.') || s.includes('e') ? s : s + '.0';
        }
        case 'string':
            return JSON.stringify(text);
        case 'bool': {
            const t = text.trim().toLowerCase();
            if (t !== 'true' && t !== 'false') throw new Error('bool must be true or false');
            return t;
        }
        case 'array': {
            let arr;
            try {
                arr = JSON.parse(text.trim() || '[]');
            } catch (e) {
                throw new Error('array must be valid json like [1,2]');
            }
            if (!Array.isArray(arr)) throw new Error('that json is not an array');
            return JSON.stringify(arr);
        }
        case 'null':
            return 'null';
        case 'undefined':
            return 'undefined';
        case 'nan':
            return 'NaN';
        default:
            throw new Error(`unknown type ${kind}`);
    }
}

function kindOf(v) {
    if (v === null) return 'null';
    if (Array.isArray(v)) return 'array';
    if (Number.isNaN(v)) return 'nan';
    return typeof v;
}

function why(op, va, vb) {
    const ta = kindOf(va);
    const tb = kindOf(vb);
    const strict = op.length === 3;
    const base = strict ? '===' : '==';
    const flip = op[0] === '!' ? ' (the ! flips the result)' : '';
    const nullish = ['null', 'undefined'];
    let msg;
    if (ta === 'nan' || tb === 'nan') {
        msg = 'nan is never equal to anything, not even itself. use Number.isNaN() to check for it';
    } else if (ta === 'array' && tb === 'array') {
        msg = 'two separate arrays are different objects so they never match, even with the same contents';
    } else if (ta === tb) {
        msg = `both are ${ta} so ${base} just compares the values`;
        if (ta === 'number') msg += '. int and float are the same type in js';
    } else if (strict) {
        msg = `${ta} and ${tb} are different types so === says no without converting anything`;
    } else if (nullish.includes(ta) || nullish.includes(tb)) {
        msg = 'null and undefined are only == to each other and nothing else';
    } else {
        msg = `${ta} and ${tb} are different types so == converts them first (usually to numbers) then compares`;
    }
    return msg + flip;
}

function run() {
    const op = opSel.value;
    errOut.classList.remove('has-err');
    try {
        const ca = parse(typeA.value, valA.value);
        const cb = parse(typeB.value, valB.value);
        const src = `let a = ${ca};\nlet b = ${cb};\nlet out;\n\nif (a ${op} b) {\n    out = "if ran";\n} else {\n    out = "else ran";\n}`;
        codeOut.textContent = src;
        const va = new Function(`return ${ca}`)();
        const vb = new Function(`return ${cb}`)();
        const out = new Function(`${src}\nreturn out;`)();
        resOut.textContent = out;
        resOut.className = out === 'if ran' ? 'hint-true' : 'hint-false';
        typesOut.textContent = `typeof a = ${typeof va}, typeof b = ${typeof vb}`;
        whyOut.textContent = why(op, va, vb);
        errOut.textContent = 'none';
    } catch (e) {
        codeOut.textContent = `if (a ${op} b) {\n    ...\n} else {\n    ...\n}`;
        resOut.textContent = 'fix the input above';
        resOut.className = 'hint-err';
        typesOut.textContent = '-';
        whyOut.textContent = '-';
        errOut.textContent = e.message;
        errOut.classList.add('has-err');
    }
}

function sync(typeSel, val) {
    const off = noInput.includes(typeSel.value);
    val.disabled = off;
    val.placeholder = off ? 'no value needed' : hints[typeSel.value];
}

function edit() {
    presetSel.value = '';
    sync(typeA, valA);
    sync(typeB, valB);
    run();
}

function usePreset() {
    if (presetSel.value === '') return;
    const p = presets[Number(presetSel.value)];
    typeA.value = p[1];
    valA.value = p[2];
    opSel.value = p[3];
    typeB.value = p[4];
    valB.value = p[5];
    sync(typeA, valA);
    sync(typeB, valB);
    run();
}

presets.forEach((p, i) => presetSel.add(new Option(p[0], i)));
[typeA, typeB, opSel].forEach((el) => el.addEventListener('change', edit));
[valA, valB].forEach((el) => el.addEventListener('input', edit));
presetSel.addEventListener('change', usePreset);
sync(typeA, valA);
sync(typeB, valB);
run();