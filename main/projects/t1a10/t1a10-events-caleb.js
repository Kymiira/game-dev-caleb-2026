'use strict';

const touchZone = document.getElementById('touchZone');
const dragSource = document.getElementById('dragSource');
const dropTarget = document.getElementById('dropTarget');
const animTarget = document.getElementById('animTarget');
const testForm = document.getElementById('testForm');
const textInput = document.getElementById('textInput');
const testDetails = document.getElementById('testDetails');
const telemetryOut = document.getElementById('telemetryOut');
const categoriesContainer = document.getElementById('categoriesContainer');
const btnDispatchCustom = document.getElementById('btnDispatchCustom');
const advOut = document.getElementById('advOut');

const eventGroups = {
    lifecycle: ['DOMContentLoaded', 'load', 'beforeunload', 'unload', 'pageshow', 'pagehide', 'visibilitychange', 'hashchange', 'popstate', 'languagechange', 'online', 'offline', 'resize', 'scroll'],
    mouse: ['click', 'dblclick', 'auxclick', 'contextmenu', 'mousedown', 'mouseup', 'mousemove', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'wheel'],
    pointerTouch: ['pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointercancel', 'gotpointercapture', 'lostpointercapture', 'touchstart', 'touchend', 'touchmove', 'touchcancel'],
    keyboardInput: ['keydown', 'keyup', 'keypress', 'compositionstart', 'compositionupdate', 'compositionend', 'input', 'change', 'beforeinput', 'focus', 'blur', 'focusin', 'focusout'],
    formDragClip: ['submit', 'reset', 'invalid', 'copy', 'cut', 'paste', 'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop'],
    animCSS: ['animationstart', 'animationend', 'animationiteration', 'animationcancel', 'transitionstart', 'transitionend', 'transitionrun', 'transitioncancel'],
    networkDevice: ['abort', 'error', 'loadend', 'loadstart', 'progress', 'timeout', 'open', 'message', 'close', 'toggle', 'cancel', 'fullscreenchange', 'fullscreenerror', 'beforeprint', 'afterprint', 'storage', 'messageerror', 'gamepadconnected', 'gamepaddisconnected', 'devicemotion', 'deviceorientation', 'chargingchange', 'levelchange']
};

const counts = {};
const cards = {};

function initMatrix() {
    categoriesContainer.innerHTML = '';
    Object.keys(eventGroups).forEach((cat) => {
        const sec = document.createElement('div');
        sec.className = 'cat-section';
        sec.innerHTML = `<h3 class="cat-title">${cat}</h3><div class="event-grid" id="grid-${cat}"></div>`;
        categoriesContainer.appendChild(sec);
        const grid = sec.querySelector('.event-grid');

        eventGroups[cat].forEach((evt) => {
            counts[evt] = 0;
            const card = document.createElement('div');
            card.className = 'event-card';
            card.id = `card-${evt}`;
            card.innerHTML = `<strong>${evt}</strong><br><span class="count">0</span>`;
            grid.appendChild(card);
            cards[evt] = card;
        });
    });
}

function handleEvt(e) {
    const type = e.type;
    counts[type] = (counts[type] || 0) + 1;
    
    if (cards[type]) {
        cards[type].querySelector('.count').textContent = counts[type];
        cards[type].classList.add('active-pulse');
        setTimeout(() => cards[type].classList.remove('active-pulse'), 150);
    }

    const payload = {
        type: type,
        target: e.target ? (e.target.tagName || 'WINDOW').toLowerCase() : 'unknown',
        timeStamp: Math.round(e.timeStamp),
        bubbles: e.bubbles
    };
    telemetryOut.textContent = JSON.stringify(payload, null, 2);
}

function attachAllListeners() {
    const allEvents = Object.values(eventGroups).flat();

    allEvents.forEach((type) => {
        const preventTypes = ['contextmenu', 'dragover', 'drop'];
        const handler = (e) => {
            if (preventTypes.includes(type)) e.preventDefault();
            handleEvt(e);
        };

        window.addEventListener(type, handler, { passive: false });
        document.addEventListener(type, handler, { passive: false });
        
        [touchZone, dragSource, dropTarget, animTarget, testForm, textInput, testDetails].forEach((el) => {
            if (el) el.addEventListener(type, handler, { passive: false });
        });
    });
}

btnDispatchCustom.addEventListener('click', () => {
    const customEvt = new CustomEvent('videoflac:action', {
        detail: { timestamp: Date.now(), user: 'caleb', scope: '9/9-demo' },
        bubbles: true
    });
    
    document.dispatchEvent(customEvt);
});

document.addEventListener('videoflac:action', (e) => {
    advOut.textContent = `received custom event 'videoflac:action':\n` + JSON.stringify(e.detail, null, 2);
});

initMatrix();
attachAllListeners();