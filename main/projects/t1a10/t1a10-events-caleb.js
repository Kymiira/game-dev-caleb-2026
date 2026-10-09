'use strict';

const flashVisual = (el, outEl, text) => {
    if (outEl) {
        outEl.textContent = text;
        outEl.classList.add('pulse-out');
        setTimeout(() => outEl.classList.remove('pulse-out'), 300);
    }
    if (el) {
        el.classList.add('flash-box');
        setTimeout(() => el.classList.remove('flash-box'), 300);
    }
};

const boxClick = document.getElementById('boxClick');
const outClick = document.getElementById('outClick');
boxClick.addEventListener('click', (e) => flashVisual(boxClick, outClick, 'status: clicked'));
boxClick.addEventListener('dblclick', (e) => flashVisual(boxClick, outClick, 'status: double-clicked'));

const boxMouse = document.getElementById('boxMouse');
const outMouse = document.getElementById('outMouse');
boxMouse.addEventListener('mousedown', (e) => flashVisual(boxMouse, outMouse, 'status: mousedown'));
boxMouse.addEventListener('mouseup', (e) => flashVisual(boxMouse, outMouse, 'status: mouseup'));

const boxHover = document.getElementById('boxHover');
const outHover = document.getElementById('outHover');
boxHover.addEventListener('mouseenter', (e) => flashVisual(boxHover, outHover, 'status: mouseenter'));
boxHover.addEventListener('mouseleave', (e) => flashVisual(boxHover, outHover, 'status: mouseleave'));

const boxMove = document.getElementById('boxMove');
const outMove = document.getElementById('outMove');
boxMove.addEventListener('mousemove', (e) => {
    outMove.textContent = `x: ${e.offsetX}, y: ${e.offsetY}`;
    boxMove.classList.add('glow-subtle');
});
boxMove.addEventListener('mouseleave', () => boxMove.classList.remove('glow-subtle'));
boxMove.addEventListener('auxclick', (e) => flashVisual(boxMove, outMove, 'status: middle-clicked'));

const boxCtx = document.getElementById('boxCtx');
const outCtx = document.getElementById('outCtx');
boxCtx.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    flashVisual(boxCtx, outCtx, 'status: contextmenu');
});
boxCtx.addEventListener('wheel', (e) => {
    e.preventDefault();
    flashVisual(boxCtx, outCtx, `status: wheel deltaY: ${e.deltaY}`);
});

const inpKey = document.getElementById('inpKey');
const outKey = document.getElementById('outKey');
inpKey.addEventListener('keydown', (e) => flashVisual(inpKey, outKey, `keydown: "${e.key}"`));
inpKey.addEventListener('keyup', (e) => flashVisual(inpKey, outKey, `keyup: "${e.key}"`));

const inpChange = document.getElementById('inpChange');
const outChange = document.getElementById('outChange');
inpChange.addEventListener('input', (e) => flashVisual(inpChange, outChange, `input: "${e.target.value}"`));
inpChange.addEventListener('change', (e) => flashVisual(inpChange, outChange, `change: "${e.target.value}"`));

const inpFocus = document.getElementById('inpFocus');
const outFocus = document.getElementById('outFocus');
inpFocus.addEventListener('focus', () => flashVisual(inpFocus, outFocus, 'status: focused'));
inpFocus.addEventListener('blur', () => flashVisual(inpFocus, outFocus, 'status: blurred'));

const inpClip = document.getElementById('inpClip');
const outClip = document.getElementById('outClip');
inpClip.addEventListener('copy', () => flashVisual(inpClip, outClip, 'status: copied'));
inpClip.addEventListener('paste', () => flashVisual(inpClip, outClip, 'status: pasted'));

const srcDrag = document.getElementById('srcDrag');
const zoneDrop = document.getElementById('zoneDrop');
const outDrag = document.getElementById('outDrag');
srcDrag.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', 'dragged');
    srcDrag.classList.add('flash-box');
});
zoneDrop.addEventListener('dragover', (e) => e.preventDefault());
zoneDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    flashVisual(zoneDrop, outDrag, 'status: dropped successfully');
});

const boxTouch = document.getElementById('boxTouch');
const outTouch = document.getElementById('outTouch');
boxTouch.addEventListener('touchstart', () => flashVisual(boxTouch, outTouch, 'status: touchstart'));
boxTouch.addEventListener('touchend', () => flashVisual(boxTouch, outTouch, 'status: touchend'));

const boxPointer = document.getElementById('boxPointer');
const outPointer = document.getElementById('outPointer');
boxPointer.addEventListener('pointerdown', () => flashVisual(boxPointer, outPointer, 'status: pointerdown'));
boxPointer.addEventListener('pointerup', () => flashVisual(boxPointer, outPointer, 'status: pointerup'));

const formAction = document.getElementById('formAction');
const inpForm = document.getElementById('inpForm');
const outForm = document.getElementById('outForm');
formAction.addEventListener('submit', (e) => {
    e.preventDefault();
    flashVisual(inpForm, outForm, 'status: submitted');
});
formAction.addEventListener('reset', () => flashVisual(inpForm, outForm, 'status: reset'));

const boxAnim = document.getElementById('boxAnim');
const btnTriggerAnim = document.getElementById('btnTriggerAnim');
const outAnim = document.getElementById('outAnim');
boxAnim.addEventListener('animationstart', () => outAnim.textContent = 'status: animationstart');
boxAnim.addEventListener('animationend', () => flashVisual(boxAnim, outAnim, 'status: animationend'));
btnTriggerAnim.addEventListener('click', () => {
    boxAnim.style.animation = 'none';
    boxAnim.offsetHeight;
    boxAnim.style.animation = 'pulseAnim 1s ease';
});

const boxTrans = document.getElementById('boxTrans');
const outTrans = document.getElementById('outTrans');
boxTrans.addEventListener('transitionstart', () => outTrans.textContent = 'status: transitionstart');
boxTrans.addEventListener('transitionend', () => flashVisual(boxTrans, outTrans, 'status: transitionend'));

const outWin = document.getElementById('outWin');
window.addEventListener('resize', () => flashVisual(null, outWin, `w: ${window.innerWidth}, h: ${window.innerHeight}`));
document.addEventListener('visibilitychange', () => flashVisual(null, outWin, `visibility: ${document.visibilityState}`));

const btnHash = document.getElementById('btnHash');
const outHist = document.getElementById('outHist');
btnHash.addEventListener('click', () => window.location.hash = 'test');
window.addEventListener('hashchange', () => flashVisual(btnHash, outHist, `hash: ${window.location.hash}`));
window.addEventListener('popstate', () => flashVisual(null, outHist, 'status: popstate'));

const outNet = document.getElementById('outNet');
window.addEventListener('online', () => flashVisual(null, outNet, 'status: online'));
window.addEventListener('offline', () => flashVisual(null, outNet, 'status: offline'));

const outLoad = document.getElementById('outLoad');
window.addEventListener('load', () => flashVisual(null, outLoad, 'status: load complete'));
document.addEventListener('DOMContentLoaded', () => flashVisual(null, outLoad, 'status: DOMContentLoaded'));

const detToggle = document.getElementById('detToggle');
const outState = document.getElementById('outState');
detToggle.addEventListener('toggle', () => flashVisual(detToggle, outState, `status: ${detToggle.open ? 'open' : 'closed'}`));

const btnRec = document.getElementById('btnRec');
const btnStop = document.getElementById('btnStop');
const btnPlay = document.getElementById('btnPlay');
const recStatus = document.getElementById('recStatus');
const macroOut = document.getElementById('macroOut');
const macroCursor = document.getElementById('macroCursor');

let isRecording = false;
let recordedEvents = [];

const trackedTypes = [
    'click', 'dblclick', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave',
    'contextmenu', 'wheel', 'keydown', 'keyup', 'input', 'change', 'focus',
    'blur', 'copy', 'paste', 'drop', 'touchstart', 'touchend', 'pointerdown', 'pointerup'
];

trackedTypes.forEach((type) => {
    document.addEventListener(type, (e) => {
        if (!isRecording) return;
        if (e.target.closest('#macroPanel')) return;
        const targetEl = e.target.closest('.sandbox-box, .sandbox-input, button, details');
        if (!targetEl || !targetEl.id) return;

        recordedEvents.push({
            type: e.type,
            id: targetEl.id,
            value: targetEl.value !== undefined ? targetEl.value : null,
            key: e.key || null,
            clientX: e.clientX || window.innerWidth / 2,
            clientY: e.clientY || window.innerHeight / 2
        });
        recStatus.textContent = `recording... (${recordedEvents.length} events captured)`;
    }, true);
});

btnRec.addEventListener('click', () => {
    isRecording = true;
    recordedEvents = [];
    btnRec.disabled = true;
    btnStop.disabled = false;
    btnPlay.disabled = true;
    recStatus.textContent = 'recording active... interact anywhere';
    btnRec.classList.add('flash-box');
});

btnStop.addEventListener('click', () => {
    isRecording = false;
    btnRec.disabled = false;
    btnStop.disabled = true;
    btnPlay.disabled = recordedEvents.length === 0;
    recStatus.textContent = `recorded ${recordedEvents.length} events`;
    macroOut.textContent = JSON.stringify(recordedEvents, null, 2);
    btnRec.classList.remove('flash-box');
});

btnPlay.addEventListener('click', () => {
    recStatus.textContent = 'replaying macro with full visual feedback on every event...';
    macroOut.textContent = 'replaying event sequence...';
    macroCursor.classList.add('active');
    
    recordedEvents.forEach((ev, idx) => {
        setTimeout(() => {
            if (ev.clientX && ev.clientY) {
                macroCursor.style.left = `${ev.clientX}px`;
                macroCursor.style.top = `${ev.clientY}px`;
                macroCursor.classList.add('ripple');
                setTimeout(() => macroCursor.classList.remove('ripple'), 300);
            }

            const el = document.getElementById(ev.id);
            if (el) {
                const card = el.closest('.pair-card');
                const outEl = card ? card.querySelector('.pair-out') : null;

                el.classList.add('flash-box');
                setTimeout(() => el.classList.remove('flash-box'), 400);

                if (ev.type === 'click') {
                    el.click();
                    if (outEl) flashVisual(el, outEl, 'status: replayed click');
                } else if (ev.type === 'dblclick') {
                    el.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
                    if (outEl) flashVisual(el, outEl, 'status: replayed dblclick');
                } else if (ev.type === 'input' || ev.type === 'change') {
                    if (ev.value !== null && 'value' in el) {
                        el.value = ev.value;
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                        if (outEl) flashVisual(el, outEl, `value: "${ev.value}"`);
                    }
                } else if (ev.type === 'keydown' || ev.type === 'keyup') {
                    if (ev.key && 'value' in el) {
                        el.value += ev.key.length === 1 ? ev.key : '';
                        el.dispatchEvent(new KeyboardEvent(ev.type, { key: ev.key, bubbles: true }));
                        if (outEl) flashVisual(el, outEl, `${ev.type}: "${ev.key}"`);
                    }
                } else {
                    el.dispatchEvent(new Event(ev.type, { bubbles: true }));
                    if (outEl) flashVisual(el, outEl, `status: replayed ${ev.type}`);
                }
            }

            if (idx === recordedEvents.length - 1) {
                recStatus.textContent = 'playback complete with full visual feedback';
                setTimeout(() => macroCursor.classList.remove('active'), 1000);
            }
        }, idx * 600);
    });
});