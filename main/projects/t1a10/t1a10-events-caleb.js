'use strict';

const boxClick = document.getElementById('boxClick');
const outClick = document.getElementById('outClick');
boxClick.addEventListener('click', () => outClick.textContent = 'status: clicked');
boxClick.addEventListener('dblclick', () => outClick.textContent = 'status: double-clicked');

const boxMouse = document.getElementById('boxMouse');
const outMouse = document.getElementById('outMouse');
boxMouse.addEventListener('mousedown', () => outMouse.textContent = 'status: mousedown');
boxMouse.addEventListener('mouseup', () => outMouse.textContent = 'status: mouseup');

const boxHover = document.getElementById('boxHover');
const outHover = document.getElementById('outHover');
boxHover.addEventListener('mouseenter', () => outHover.textContent = 'status: mouseenter');
boxHover.addEventListener('mouseleave', () => outHover.textContent = 'status: mouseleave');

const boxMove = document.getElementById('boxMove');
const outMove = document.getElementById('outMove');
boxMove.addEventListener('mousemove', (e) => outMove.textContent = `x: ${e.offsetX}, y: ${e.offsetY}`);
boxMove.addEventListener('auxclick', () => outMove.textContent = 'status: middle-clicked');

const boxCtx = document.getElementById('boxCtx');
const outCtx = document.getElementById('outCtx');
boxCtx.addEventListener('contextmenu', (e) => { e.preventDefault(); outCtx.textContent = 'status: contextmenu'; });
boxCtx.addEventListener('wheel', (e) => { e.preventDefault(); outCtx.textContent = `status: wheel deltaY: ${e.deltaY}`; });

const inpKey = document.getElementById('inpKey');
const outKey = document.getElementById('outKey');
inpKey.addEventListener('keydown', (e) => outKey.textContent = `keydown: "${e.key}"`);
inpKey.addEventListener('keyup', (e) => outKey.textContent = `keyup: "${e.key}"`);

const inpChange = document.getElementById('inpChange');
const outChange = document.getElementById('outChange');
inpChange.addEventListener('input', (e) => outChange.textContent = `input: "${e.target.value}"`);
inpChange.addEventListener('change', (e) => outChange.textContent = `change: "${e.target.value}"`);

const inpFocus = document.getElementById('inpFocus');
const outFocus = document.getElementById('outFocus');
inpFocus.addEventListener('focus', () => outFocus.textContent = 'status: focused');
inpFocus.addEventListener('blur', () => outFocus.textContent = 'status: blurred');

const inpClip = document.getElementById('inpClip');
const outClip = document.getElementById('outClip');
inpClip.addEventListener('copy', () => outClip.textContent = 'status: copied');
inpClip.addEventListener('paste', () => outClip.textContent = 'status: pasted');

const srcDrag = document.getElementById('srcDrag');
const zoneDrop = document.getElementById('zoneDrop');
const outDrag = document.getElementById('outDrag');
srcDrag.addEventListener('dragstart', (e) => e.dataTransfer.setData('text', 'dragged'));
zoneDrop.addEventListener('dragover', (e) => e.preventDefault());
zoneDrop.addEventListener('drop', (e) => { e.preventDefault(); outDrag.textContent = 'status: dropped successfully'; });

const boxTouch = document.getElementById('boxTouch');
const outTouch = document.getElementById('outTouch');
boxTouch.addEventListener('touchstart', () => outTouch.textContent = 'status: touchstart');
boxTouch.addEventListener('touchend', () => outTouch.textContent = 'status: touchend');

const boxPointer = document.getElementById('boxPointer');
const outPointer = document.getElementById('outPointer');
boxPointer.addEventListener('pointerdown', () => outPointer.textContent = 'status: pointerdown');
boxPointer.addEventListener('pointerup', () => outPointer.textContent = 'status: pointerup');

const formAction = document.getElementById('formAction');
const outForm = document.getElementById('outForm');
formAction.addEventListener('submit', (e) => { e.preventDefault(); outForm.textContent = 'status: submitted'; });
formAction.addEventListener('reset', () => outForm.textContent = 'status: reset');

const boxAnim = document.getElementById('boxAnim');
const btnTriggerAnim = document.getElementById('btnTriggerAnim');
const outAnim = document.getElementById('outAnim');
boxAnim.addEventListener('animationstart', () => outAnim.textContent = 'status: animationstart');
boxAnim.addEventListener('animationend', () => outAnim.textContent = 'status: animationend');
btnTriggerAnim.addEventListener('click', () => {
    boxAnim.style.animation = 'none';
    boxAnim.offsetHeight;
    boxAnim.style.animation = 'pulseAnim 1s ease';
});

const boxTrans = document.getElementById('boxTrans');
const outTrans = document.getElementById('outTrans');
boxTrans.addEventListener('transitionstart', () => outTrans.textContent = 'status: transitionstart');
boxTrans.addEventListener('transitionend', () => outTrans.textContent = 'status: transitionend');

const outWin = document.getElementById('outWin');
window.addEventListener('resize', () => outWin.textContent = `w: ${window.innerWidth}, h: ${window.innerHeight}`);
document.addEventListener('visibilitychange', () => outWin.textContent = `visibility: ${document.visibilityState}`);

const btnHash = document.getElementById('btnHash');
const outHist = document.getElementById('outHist');
btnHash.addEventListener('click', () => window.location.hash = 'test');
window.addEventListener('hashchange', () => outHist.textContent = `hash: ${window.location.hash}`);
window.addEventListener('popstate', () => outHist.textContent = 'status: popstate');

const outNet = document.getElementById('outNet');
window.addEventListener('online', () => outNet.textContent = 'status: online');
window.addEventListener('offline', () => outNet.textContent = 'status: offline');

const outLoad = document.getElementById('outLoad');
window.addEventListener('load', () => outLoad.textContent = 'status: load complete');
document.addEventListener('DOMContentLoaded', () => outLoad.textContent = 'status: DOMContentLoaded');

const detToggle = document.getElementById('detToggle');
const outState = document.getElementById('outState');
detToggle.addEventListener('toggle', () => outState.textContent = `status: ${detToggle.open ? 'open' : 'closed'}`);

const btnRec = document.getElementById('btnRec');
const btnStop = document.getElementById('btnStop');
const btnPlay = document.getElementById('btnPlay');
const recStatus = document.getElementById('recStatus');
const macroOut = document.getElementById('macroOut');

let isRecording = false;
let recordedEvents = [];

const trackedTypes = ['click', 'input', 'change', 'keydown'];
trackedTypes.forEach((type) => {
    document.addEventListener(type, (e) => {
        if (!isRecording) return;
        if (e.target.closest('#macroPanel')) return;
        recordedEvents.push({
            type: e.type,
            tag: e.target.tagName.toLowerCase(),
            id: e.target.id || null,
            value: e.target.value || null,
            time: Date.now()
        });
        recStatus.textContent = `recording... (${recordedEvents.length} events captured)`;
    });
});

btnRec.addEventListener('click', () => {
    isRecording = true;
    recordedEvents = [];
    btnRec.disabled = true;
    btnStop.disabled = false;
    btnPlay.disabled = true;
    recStatus.textContent = 'recording active... interact anywhere';
});

btnStop.addEventListener('click', () => {
    isRecording = false;
    btnRec.disabled = false;
    btnStop.disabled = true;
    btnPlay.disabled = recordedEvents.length === 0;
    recStatus.textContent = `recorded ${recordedEvents.length} events`;
    macroOut.textContent = JSON.stringify(recordedEvents, null, 2);
});

btnPlay.addEventListener('click', () => {
    recStatus.textContent = 'replaying macro...';
    macroOut.textContent = 'replaying event sequence...';
    
    recordedEvents.forEach((ev, idx) => {
        setTimeout(() => {
            if (ev.id) {
                const el = document.getElementById(ev.id);
                if (el) {
                    el.classList.add('flash-box');
                    setTimeout(() => el.classList.remove('flash-box'), 300);
                    if (ev.value !== null && 'value' in el) {
                        el.value = ev.value;
                    }
                }
            }
            if (idx === recordedEvents.length - 1) {
                recStatus.textContent = 'playback complete';
            }
        }, idx * 400);
    });
});