
'use strict';

const flashTimers = new WeakMap();
const outputTimers = new WeakMap();

const flashVisual = (el, outEl, text) => {
    if (outEl && text !== undefined) {
        outEl.textContent = text;
        const oldOutputTimer = outputTimers.get(outEl);
        if (oldOutputTimer) clearTimeout(oldOutputTimer);
        outEl.classList.remove('pulse-out');
        void outEl.offsetWidth;
        outEl.classList.add('pulse-out');
        outputTimers.set(outEl, setTimeout(() => {
            outEl.classList.remove('pulse-out');
            outputTimers.delete(outEl);
        }, 320));
    }

    if (el) {
        const oldFlashTimer = flashTimers.get(el);
        if (oldFlashTimer) clearTimeout(oldFlashTimer);
        el.classList.add('flash-box');
        flashTimers.set(el, setTimeout(() => {
            el.classList.remove('flash-box');
            flashTimers.delete(el);
        }, 350));
    }
};

const getElement = (id) => document.getElementById(id);
const addListener = (el, type, handler, options) => {
    if (el) el.addEventListener(type, handler, options);
};

const boxClick = getElement('boxClick');
const outClick = getElement('outClick');
addListener(boxClick, 'click', () => flashVisual(boxClick, outClick, 'status: clicked'));
addListener(boxClick, 'dblclick', () => flashVisual(boxClick, outClick, 'status: double-clicked'));

const boxMouse = getElement('boxMouse');
const outMouse = getElement('outMouse');
addListener(boxMouse, 'mousedown', (e) => flashVisual(boxMouse, outMouse, `status: mousedown (button ${e.button})`));
addListener(boxMouse, 'mouseup', (e) => flashVisual(boxMouse, outMouse, `status: mouseup (button ${e.button})`));

const boxHover = getElement('boxHover');
const outHover = getElement('outHover');
addListener(boxHover, 'mouseenter', () => flashVisual(boxHover, outHover, 'status: mouseenter'));
addListener(boxHover, 'mouseleave', () => flashVisual(boxHover, outHover, 'status: mouseleave'));

const boxMove = getElement('boxMove');
const outMove = getElement('outMove');
addListener(boxMove, 'mousemove', (e) => {
    if (outMove) outMove.textContent = `x: ${Math.round(e.offsetX)}, y: ${Math.round(e.offsetY)}`;
    if (boxMove) boxMove.classList.add('glow-subtle');
});
addListener(boxMove, 'mouseleave', () => boxMove.classList.remove('glow-subtle'));
addListener(boxMove, 'auxclick', (e) => flashVisual(boxMove, outMove, `status: auxiliary click (button ${e.button})`));

const boxCtx = getElement('boxCtx');
const outCtx = getElement('outCtx');
addListener(boxCtx, 'contextmenu', (e) => {
    e.preventDefault();
    flashVisual(boxCtx, outCtx, 'status: context menu prevented');
});
addListener(boxCtx, 'wheel', (e) => {
    e.preventDefault();
    flashVisual(boxCtx, outCtx, `status: wheel deltaY: ${Math.round(e.deltaY)}`);
}, { passive: false });

const inpKey = getElement('inpKey');
const outKey = getElement('outKey');
addListener(inpKey, 'keydown', (e) => flashVisual(inpKey, outKey, `keydown: ${JSON.stringify(e.key)}`));
addListener(inpKey, 'keyup', (e) => flashVisual(inpKey, outKey, `keyup: ${JSON.stringify(e.key)}`));

const inpChange = getElement('inpChange');
const outChange = getElement('outChange');
addListener(inpChange, 'input', (e) => flashVisual(inpChange, outChange, `input: ${JSON.stringify(e.currentTarget.value)}`));
addListener(inpChange, 'change', (e) => flashVisual(inpChange, outChange, `change: ${JSON.stringify(e.currentTarget.value)}`));

const inpFocus = getElement('inpFocus');
const outFocus = getElement('outFocus');
addListener(inpFocus, 'focus', () => flashVisual(inpFocus, outFocus, 'status: focused'));
addListener(inpFocus, 'blur', () => flashVisual(inpFocus, outFocus, 'status: blurred'));

const inpClip = getElement('inpClip');
const outClip = getElement('outClip');
addListener(inpClip, 'copy', () => flashVisual(inpClip, outClip, 'status: copy event detected'));
addListener(inpClip, 'paste', () => flashVisual(inpClip, outClip, 'status: paste event detected'));

const srcDrag = getElement('srcDrag');
const zoneDrop = getElement('zoneDrop');
const outDrag = getElement('outDrag');
addListener(srcDrag, 'dragstart', (e) => {
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', 'dragged');
    }
    flashVisual(srcDrag, outDrag, 'status: drag started');
});
addListener(srcDrag, 'dragend', () => srcDrag.classList.remove('flash-box'));
addListener(zoneDrop, 'dragenter', (e) => {
    e.preventDefault();
    zoneDrop.classList.add('glow-subtle');
});
addListener(zoneDrop, 'dragover', (e) => {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
});
addListener(zoneDrop, 'dragleave', () => zoneDrop.classList.remove('glow-subtle'));
addListener(zoneDrop, 'drop', (e) => {
    e.preventDefault();
    zoneDrop.classList.remove('glow-subtle');
    const droppedText = e.dataTransfer ? e.dataTransfer.getData('text/plain') : '';
    flashVisual(zoneDrop, outDrag, droppedText ? `status: dropped ${JSON.stringify(droppedText)}` : 'status: drop detected');
});

const boxTouch = getElement('boxTouch');
const outTouch = getElement('outTouch');
addListener(boxTouch, 'touchstart', () => flashVisual(boxTouch, outTouch, 'status: touchstart'), { passive: true });
addListener(boxTouch, 'touchend', () => flashVisual(boxTouch, outTouch, 'status: touchend'), { passive: true });

const boxPointer = getElement('boxPointer');
const outPointer = getElement('outPointer');
addListener(boxPointer, 'pointerdown', (e) => flashVisual(boxPointer, outPointer, `status: pointerdown (${e.pointerType || 'unknown'} pointer)`));
addListener(boxPointer, 'pointerup', (e) => flashVisual(boxPointer, outPointer, `status: pointerup (${e.pointerType || 'unknown'} pointer)`));

const formAction = getElement('formAction');
const inpForm = getElement('inpForm');
const outForm = getElement('outForm');
addListener(formAction, 'submit', (e) => {
    e.preventDefault();
    flashVisual(inpForm, outForm, `status: submitted (${inpForm ? JSON.stringify(inpForm.value) : 'no value'})`);
});
addListener(formAction, 'reset', () => {
    setTimeout(() => flashVisual(inpForm, outForm, 'status: form reset'), 0);
});

const boxAnim = getElement('boxAnim');
const btnTriggerAnim = getElement('btnTriggerAnim');
const outAnim = getElement('outAnim');
addListener(boxAnim, 'animationstart', () => flashVisual(boxAnim, outAnim, 'status: animationstart'));
addListener(boxAnim, 'animationend', () => flashVisual(boxAnim, outAnim, 'status: animationend'));
addListener(btnTriggerAnim, 'click', () => {
    if (!boxAnim) return;
    boxAnim.style.animation = 'none';
    void boxAnim.offsetHeight;
    boxAnim.style.animation = '';
    boxAnim.classList.remove('anim-box');
    void boxAnim.offsetHeight;
    boxAnim.classList.add('anim-box');
});

const boxTrans = getElement('boxTrans');
const outTrans = getElement('outTrans');
addListener(boxTrans, 'transitionstart', () => flashVisual(boxTrans, outTrans, 'status: transitionstart'));
addListener(boxTrans, 'transitionend', () => flashVisual(boxTrans, outTrans, 'status: transitionend'));

const outWin = getElement('outWin');
addListener(window, 'resize', () => flashVisual(null, outWin, `window: ${window.innerWidth} × ${window.innerHeight}`));
addListener(document, 'visibilitychange', () => flashVisual(null, outWin, `visibility: ${document.visibilityState}`));
if (outWin) outWin.textContent = `window: ${window.innerWidth} × ${window.innerHeight}`;

const btnHash = getElement('btnHash');
const outHist = getElement('outHist');
addListener(btnHash, 'click', () => {
    const nextHash = '#test';
    if (window.location.hash === nextHash) {
        flashVisual(btnHash, outHist, 'status: hash is already #test');
    } else {
        window.location.hash = nextHash;
    }
});
addListener(window, 'hashchange', () => flashVisual(btnHash, outHist, `hash: ${window.location.hash || '(empty)'}`));
addListener(window, 'popstate', () => flashVisual(null, outHist, `status: popstate (${window.location.pathname}${window.location.hash})`));

const outNet = getElement('outNet');
const updateNetworkStatus = () => flashVisual(null, outNet, `status: ${navigator.onLine ? 'online' : 'offline'}`);
addListener(window, 'online', updateNetworkStatus);
addListener(window, 'offline', updateNetworkStatus);
if (outNet) outNet.textContent = `status: ${navigator.onLine ? 'online' : 'offline'}`;

const outLoad = getElement('outLoad');
if (outLoad) outLoad.textContent = document.readyState === 'complete' ? 'status: page loaded' : 'status: DOM ready';
addListener(window, 'load', () => flashVisual(null, outLoad, 'status: load complete'));
addListener(document, 'readystatechange', () => {
    if (outLoad && document.readyState === 'complete') flashVisual(null, outLoad, 'status: load complete');
});

const detToggle = getElement('detToggle');
const outState = getElement('outState');
addListener(detToggle, 'toggle', () => flashVisual(detToggle, outState, `status: ${detToggle.open ? 'open' : 'closed'}`));
if (detToggle && outState) outState.textContent = `status: ${detToggle.open ? 'open' : 'closed'}`;

const btnRec = getElement('btnRec');
const btnStop = getElement('btnStop');
const btnPlay = getElement('btnPlay');
const recStatus = getElement('recStatus');
const macroOut = getElement('macroOut');
const macroCursor = getElement('macroCursor');

let isRecording = false;
let isPlaying = false;
let recordedEvents = [];
let recordingStartedAt = 0;
let playbackTimers = [];

const trackedTypes = [
    'click', 'dblclick', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave',
    'mousemove', 'auxclick', 'contextmenu', 'wheel', 'keydown', 'keyup', 'input',
    'change', 'focus', 'blur', 'copy', 'paste', 'dragstart', 'dragenter',
    'dragover', 'drop', 'dragend', 'touchstart', 'touchend', 'pointerdown',
    'pointerup', 'submit', 'reset', 'animationstart', 'animationend',
    'transitionstart', 'transitionend', 'toggle'
];

const trackableSelector = '.sandbox-box, .sandbox-input, button, details, summary, form';

const shouldSkipTarget = (target) => {
    return !(target instanceof Element) || !!target.closest('#macroPanel') || !target.closest(trackableSelector);
};

const updateRecorderControls = () => {
    if (btnRec) btnRec.disabled = isRecording || isPlaying;
    if (btnStop) btnStop.disabled = !isRecording;
    if (btnPlay) btnPlay.disabled = !recordedEvents.length || isRecording || isPlaying;
};

const renderRecordedEvents = () => {
    if (macroOut) {
        macroOut.textContent = recordedEvents.length
            ? JSON.stringify(recordedEvents, null, 2)
            : 'recorded event stream will appear here...';
    }
    updateRecorderControls();
};

const serializeEvent = (e, targetEl) => ({
    t: Math.max(0, Math.round(performance.now() - recordingStartedAt)),
    type: e.type,
    id: targetEl.id || null,
    value: 'value' in targetEl ? targetEl.value : null,
    checked: 'checked' in targetEl ? targetEl.checked : null,
    open: targetEl instanceof HTMLDetailsElement ? targetEl.open : null,
    key: typeof e.key === 'string' ? e.key : null,
    code: typeof e.code === 'string' ? e.code : null,
    button: Number.isFinite(e.button) ? e.button : 0,
    buttons: Number.isFinite(e.buttons) ? e.buttons : 0,
    clientX: Number.isFinite(e.clientX) ? e.clientX : null,
    clientY: Number.isFinite(e.clientY) ? e.clientY : null,
    deltaX: Number.isFinite(e.deltaX) ? e.deltaX : 0,
    deltaY: Number.isFinite(e.deltaY) ? e.deltaY : 0,
    pointerType: e.pointerType || null
});

trackedTypes.forEach((type) => {
    document.addEventListener(type, (e) => {
        if (!isRecording || isPlaying || shouldSkipTarget(e.target)) return;
        const targetEl = e.target.closest(trackableSelector);
        if (!targetEl || !targetEl.id) return;

        recordedEvents.push(serializeEvent(e, targetEl));
        if (recStatus) recStatus.textContent = `recording... (${recordedEvents.length} events captured)`;
        if (macroOut) macroOut.textContent = JSON.stringify(recordedEvents, null, 2);
    }, true);
});

const stopRecording = () => {
    isRecording = false;
    if (btnRec) btnRec.classList.remove('flash-box');
    if (recStatus) recStatus.textContent = `recorded ${recordedEvents.length} event${recordedEvents.length === 1 ? '' : 's'}`;
    renderRecordedEvents();
};

addListener(btnRec, 'click', () => {
    if (isPlaying) return;
    recordedEvents = [];
    recordingStartedAt = performance.now();
    isRecording = true;
    if (btnRec) btnRec.classList.add('flash-box');
    if (recStatus) recStatus.textContent = 'recording active... interact with the event demos';
    if (macroOut) macroOut.textContent = 'recording event sequence...';
    updateRecorderControls();
});

addListener(btnStop, 'click', stopRecording);

const makeReplayEvent = (ev) => {
    const mouseTypes = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave', 'mousemove', 'auxclick', 'contextmenu'];
    const pointerTypes = ['pointerdown', 'pointerup'];
    const touchTypes = ['touchstart', 'touchend'];

    if (mouseTypes.includes(ev.type)) {
        const options = {
            bubbles: !['mouseenter', 'mouseleave'].includes(ev.type),
            cancelable: true,
            clientX: ev.clientX ?? 0,
            clientY: ev.clientY ?? 0,
            button: ev.button || 0,
            buttons: ev.buttons || 0
        };
        return new MouseEvent(ev.type, options);
    }

    if (ev.type === 'wheel') {
        return new WheelEvent('wheel', {
            bubbles: true,
            cancelable: true,
            deltaX: ev.deltaX || 0,
            deltaY: ev.deltaY || 0
        });
    }

    if (ev.type === 'keydown' || ev.type === 'keyup') {
        return new KeyboardEvent(ev.type, {
            bubbles: true,
            cancelable: true,
            key: ev.key || '',
            code: ev.code || ''
        });
    }

    if (pointerTypes.includes(ev.type) && typeof PointerEvent !== 'undefined') {
        return new PointerEvent(ev.type, {
            bubbles: true,
            cancelable: true,
            clientX: ev.clientX ?? 0,
            clientY: ev.clientY ?? 0,
            pointerType: ev.pointerType || 'mouse',
            button: ev.button || 0,
            buttons: ev.buttons || 0
        });
    }

    if (touchTypes.includes(ev.type)) {
        return new Event(ev.type, { bubbles: true, cancelable: true });
    }

    if (ev.type === 'input' && typeof InputEvent !== 'undefined') {
        return new InputEvent('input', {
            bubbles: true,
            cancelable: false,
            inputType: 'insertText',
            data: null
        });
    }

    const nonBubbling = ['focus', 'blur', 'invalid', 'toggle'];
    const cancelable = ['submit', 'reset', 'dragstart', 'dragenter', 'dragover', 'drop', 'copy', 'paste'];

    return new Event(ev.type, {
        bubbles: !nonBubbling.includes(ev.type),
        cancelable: cancelable.includes(ev.type)
    });
};

const waitForPlayback = (ms) => new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    playbackTimers.push(timer);
});

const replayMacro = async () => {
    if (isRecording || isPlaying || !recordedEvents.length) return;

    isPlaying = true;
    updateRecorderControls();

    if (recStatus) recStatus.textContent = 'replaying recorded events in real time...';
    if (macroOut) macroOut.textContent = 'replaying event sequence...';
    if (macroCursor) macroCursor.classList.add('active');

    const playbackStartedAt = performance.now();
    let replayed = 0;
    let skipped = 0;

    try {
        for (const ev of recordedEvents) {
            const eventTime = Number.isFinite(ev.t) ? ev.t : 0;
            const delay = Math.max(0, playbackStartedAt + eventTime - performance.now());

            if (delay > 0) await waitForPlayback(delay);

            const el = ev.id ? getElement(ev.id) : null;

            if (!el) {
                skipped += 1;
                continue;
            }

            if (macroCursor && Number.isFinite(ev.clientX) && Number.isFinite(ev.clientY)) {
                macroCursor.style.left = `${ev.clientX}px`;
                macroCursor.style.top = `${ev.clientY}px`;
                macroCursor.classList.remove('ripple');
                void macroCursor.offsetWidth;
                macroCursor.classList.add('ripple');
            }

            const card = el.closest('.pair-card');
            const outEl = card ? card.querySelector('.pair-out') : null;

            if (ev.value !== null && 'value' in el && ['keydown', 'keyup', 'input', 'change', 'focus', 'blur'].includes(ev.type)) {
                el.value = ev.value;
            }

            if (ev.checked !== null && 'checked' in el) el.checked = ev.checked;
            if (ev.open !== null && el instanceof HTMLDetailsElement) el.open = ev.open;

            if (ev.type === 'click' && el instanceof HTMLElement) {
                el.click();
            } else if (ev.type === 'focus' && typeof el.focus === 'function') {
                el.focus();
            } else if (ev.type === 'blur' && typeof el.blur === 'function') {
                el.blur();
            } else if (ev.type === 'input' || ev.type === 'change') {
                el.dispatchEvent(makeReplayEvent(ev));
            } else if (ev.type === 'submit' && el instanceof HTMLFormElement) {
                el.dispatchEvent(makeReplayEvent(ev));
            } else {
                el.dispatchEvent(makeReplayEvent(ev));
            }

            flashVisual(el, outEl, `status: replayed ${ev.type}`);
            replayed += 1;
        }
    } finally {
        playbackTimers.forEach((timer) => clearTimeout(timer));
        playbackTimers = [];
        isPlaying = false;

        if (macroCursor) {
            macroCursor.classList.remove('ripple');
            macroCursor.classList.remove('active');
        }

        if (recStatus) recStatus.textContent = `playback complete (${replayed} replayed, ${skipped} skipped)`;

        renderRecordedEvents();
    }
};

addListener(btnPlay, 'click', replayMacro);
renderRecordedEvents();