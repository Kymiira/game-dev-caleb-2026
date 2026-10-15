'use strict';
const fnType = document.getElementById('fnType');
const argA = document.getElementById('argA');
const argB = document.getElementById('argB');
const presetSel = document.getElementById('presetSel');
const codeOut = document.getElementById('codeOut');
const resOut = document.getElementById('resOut');
const typesOut = document.getElementById('typesOut');
const whyOut = document.getElementById('whyOut');
const errOut = document.getElementById('errOut');
const batchGrid = document.getElementById('batchGrid');
const btnCountA = document.getElementById('btnCountA');
const btnCountB = document.getElementById('btnCountB');
const btnReset = document.getElementById('btnReset');
const advOut = document.getElementById('advOut');

const presets = [
    { name: '1. standard declaration', style: 'declaration', a: '5', b: '10', code: 'function calc(a, b) {\n    return Number(a) + Number(b);\n}', call: 'calc(5, 10)', run: () => { function calc(a, b) { return Number(a) + Number(b); } return calc(5, 10); } },
    { name: '2. arrow function', style: 'arrow', a: '4', b: '3', code: 'const multiply = (a, b) => Number(a) * Number(b);', call: 'multiply(4, 3)', run: () => { const multiply = (a, b) => Number(a) * Number(b); return multiply(4, 3); } },
    { name: '3. default parameters', style: 'default', a: 'hello', b: '', code: 'function greet(msg, name = "guest") {\n    return `${msg} ${name}`;\n}', call: 'greet("hello")', run: () => { function greet(msg, name = "guest") { return `${msg} ${name}`; } return greet("hello"); } },
    { name: '4. rest parameters', style: 'rest', a: '1', b: '2', code: 'function sumAll(...nums) {\n    return nums.reduce((acc, n) => acc + Number(n), 0);\n}', call: 'sumAll(1, 2, 3, 4)', run: () => { function sumAll(...nums) { return nums.reduce((acc, n) => acc + Number(n), 0); } return sumAll(1, 2, 3, 4); } },
    { name: '5. implicit arrow return', style: 'arrow', a: '6', b: '6', code: 'const square = n => n * n;', call: 'square(6)', run: () => { const square = n => n * n; return square(6); } },
    { name: '6. anonymous map callback', style: 'arrow', a: '1', b: '2', code: '[1, 2, 3].map(x => x * 10)', call: '[1, 2, 3].map(x => x * 10)', run: () => [1, 2, 3].map(x => x * 10).join(', ') },
    { name: '7. recursion (factorial)', style: 'declaration', a: '5', b: '0', code: 'function factorial(n) {\n    return n <= 1 ? 1 : n * factorial(n - 1);\n}', call: 'factorial(5)', run: () => { function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); } return factorial(5); } },
    { name: '8. higher-order currying', style: 'arrow', a: '3', b: '4', code: 'const multiplyBy = factor => num => factor * num;\nconst triple = multiplyBy(3);', call: 'triple(4)', run: () => { const multiplyBy = factor => num => factor * num; const triple = multiplyBy(3); return triple(4); } },
    { name: '9. function expression', style: 'expression', a: '10', b: '4', code: 'const subtract = function(a, b) {\n    return Number(a) - Number(b);\n};', call: 'subtract(10, 4)', run: () => { const subtract = function(a, b) { return Number(a) - Number(b); }; return subtract(10, 4); } },
    { name: '10. object method shorthand', style: 'declaration', a: '8', b: '2', code: 'const math = {\n    add(a, b) { return Number(a) + Number(b); }\n};', call: 'math.add(8, 2)', run: () => { const math = { add(a, b) { return Number(a) + Number(b); } }; return math.add(8, 2); } },
    { name: '11. iife (self invoking)', style: 'arrow', a: '4', b: '5', code: '((a, b) => Number(a) * Number(b))(4, 5)', call: '((a, b) => Number(a) * Number(b))(4, 5)', run: () => ((a, b) => Number(a) * Number(b))(4, 5) },
    { name: '12. ternary guard return', style: 'arrow', a: '8', b: '0', code: 'const checkEven = n => n % 2 === 0 ? "even" : "odd";', call: 'checkEven(8)', run: () => { const checkEven = n => n % 2 === 0 ? "even" : "odd"; return checkEven(8); } },
    { name: '13. destructuring parameters', style: 'declaration', a: 'caleb', b: 'dev', code: 'function formatUser({ first, last }) {\n    return `${first}_${last}`;\n}', call: 'formatUser({ first: "caleb", last: "dev" })', run: () => { function formatUser({ first, last }) { return `${first}_${last}`; } return formatUser({ first: "caleb", last: "dev" }); } },
    { name: '14. pure math function', style: 'arrow', a: '3', b: '4', code: 'const hypotenuse = (a, b) => Math.sqrt(a * a + b * b);', call: 'hypotenuse(3, 4)', run: () => { const hypotenuse = (a, b) => Math.sqrt(a * a + b * b); return hypotenuse(3, 4); } },
    { name: '15. curried adder', style: 'arrow', a: '5', b: '10', code: 'const add = x => y => Number(x) + Number(y);', call: 'add(5)(10)', run: () => { const add = x => y => Number(x) + Number(y); return add(5)(10); } },
    { name: '16. array destructuring param', style: 'arrow', a: '10', b: '20', code: 'const sumPair = ([a, b]) => Number(a) + Number(b);', call: 'sumPair([10, 20])', run: () => { const sumPair = ([a, b]) => Number(a) + Number(b); return sumPair([10, 20]); } },
    { name: '17. object returning arrow', style: 'arrow', a: 'caleb', b: '101', code: 'const makePoint = (x, y) => ({ x, y });', call: 'makePoint("caleb", 101)', run: () => { const makePoint = (x, y) => ({ x, y }); return JSON.stringify(makePoint("caleb", 101)); } },
    { name: '18. early return pattern', style: 'declaration', a: '10', b: '0', code: 'function divide(a, b) {\n    if (Number(b) === 0) return "cannot divide by zero";\n    return Number(a) / Number(b);\n}', call: 'divide(10, 0)', run: () => { function divide(a, b) { if (Number(b) === 0) return "cannot divide by zero"; return Number(a) / Number(b); } return divide(10, 0); } },
    { name: '19. closure counter', style: 'declaration', a: '0', b: '0', code: 'function makeCounter() {\n    let c = 0;\n    return () => ++c;\n}\nconst count = makeCounter(); count();', call: 'count()', run: () => { function makeCounter() { let c = 0; return () => ++c; } const count = makeCounter(); count(); return count(); } },
    { name: '20. first-class function pass', style: 'declaration', a: '5', b: '0', code: 'function exec(fn, val) {\n    return fn(val);\n}', call: 'exec(x => x * 3, 5)', run: () => { function exec(fn, val) { return fn(val); } return exec(x => x * 3, 5); } }
];

function buildDynamicFn(kind, va, vb) {
    switch (kind) {
        case 'declaration':
            return {
                src: `function combine(a, b) {\n    return String(a) + " " + String(b);\n}\ncombine("${va}", "${vb}");`,
                exec: () => { function combine(a, b) { return String(a) + " " + String(b); } return combine(va, vb); },
                explanation: 'standard hoisted function declaration executed with arguments'
            };
        case 'arrow':
            return {
                src: `const combine = (a, b) => \`${va}${vb}\`;\ncombine("${va}", "${vb}");`,
                exec: () => { const combine = (a, b) => `${a} ${b}`; return combine(va, vb); },
                explanation: 'concise ES6 arrow function with implicit return'
            };
        case 'expression':
            return {
                src: `const combine = function(a, b) {\n    return String(a) + " & " + String(b);\n};\ncombine("${va}", "${vb}");`,
                exec: () => { const combine = function(a, b) { return String(a) + " & " + String(b); }; return combine(va, vb); },
                explanation: 'anonymous function assigned to a variable expression'
            };
        case 'default':
            return {
                src: `function greet(a = "guest", b = "welcome") {\n    return \`\${a} -> \${b}\`;\n}\ngreet("${va || 'guest'}", "${vb || 'welcome'}");`,
                exec: () => { function greet(a = "guest", b = "welcome") { return `${a} -> ${b}`; } return greet(va || undefined, vb || undefined); },
                explanation: 'uses fallback default parameter values if arguments are omitted'
            };
        case 'rest':
            return {
                src: `function collect(...items) {\n    return items.join(" + ");\n}\ncollect("${va}", "${vb}");`,
                exec: () => { function collect(...items) { return items.join(" + "); } return collect(va, vb); },
                explanation: 'gathers dynamic arguments into a single rest array parameter'
            };
        default:
            throw new Error('unknown function style');
    }
}

function run() {
    errOut.classList.remove('has-err');
    try {
        const kind = fnType.value;
        const va = argA.value;
        const vb = argB.value;
        const fnObj = buildDynamicFn(kind, va, vb);
        
        codeOut.textContent = fnObj.src;
        const res = fnObj.exec();
        resOut.textContent = String(res);
        resOut.className = 'hint-true';
        typesOut.textContent = typeof res;
        whyOut.textContent = fnObj.explanation;
        errOut.textContent = 'none';
    } catch (e) {
        codeOut.textContent = 'function failed to run';
        resOut.textContent = 'fix the inputs above';
        resOut.className = 'hint-err';
        typesOut.textContent = '-';
        whyOut.textContent = '-';
        errOut.textContent = e.message;
        errOut.classList.add('has-err');
    }
}

function edit() {
    presetSel.value = '';
    run();
}

function usePreset() {
    if (presetSel.value === '') return;
    const p = presets[Number(presetSel.value)];
    fnType.value = p.style;
    argA.value = p.a;
    argB.value = p.b;
    run();
}

function renderBatchGrid() {
    batchGrid.innerHTML = '';
    presets.forEach((p, idx) => {
        try {
            const res = p.run();
            const card = document.createElement('div');
            card.className = 'batch-card batch-true';
            card.innerHTML = `<strong>#${idx + 1}: ${p.name}</strong><br><code>${p.call}</code><br><span>result: ${res}</span>`;
            batchGrid.appendChild(card);
        } catch (e) {
            console.error(`preset ${idx} error:`, e);
        }
    });
}

function createCounterFactory(start = 0) {
    let count = start;
    return {
        increment: () => ++count,
        get: () => count,
        reset: () => { count = start; return count; }
    };
}

const counterA = createCounterFactory(0);
const counterB = createCounterFactory(100);

function updateAdvView() {
    advOut.textContent = `counter a (starts at 0)   => private count: ${counterA.get()}\ncounter b (starts at 100) => private count: ${counterB.get()}\n\nboth counters hold distinct, encapsulated state via closures!`;
}

btnCountA.addEventListener('click', () => { counterA.increment(); updateAdvView(); });
btnCountB.addEventListener('click', () => { counterB.increment(); updateAdvView(); });
btnReset.addEventListener('click', () => { counterA.reset(); counterB.reset(); updateAdvView(); });

presets.forEach((p, i) => presetSel.add(new Option(p.name, i)));
[fnType, argA, argB].forEach((el) => el.addEventListener('input', edit));
presetSel.addEventListener('change', usePreset);

run();
renderBatchGrid();
updateAdvView();