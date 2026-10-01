const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let out = document.getElementById('out');

async function simpleLoop() {
    let maxLoop = clamp(parseInt(document.getElementById('maxLoop').value) || 0, 1, 100000);

    for (let loop = 0; loop < maxLoop; loop++) {
        if (loop * 2 > maxLoop) {
            out.value += loop + '\n';
        } else {
            out.value += (loop - (loop * 2)) + '\n';
        }

        await sleep(1); 
    }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let out = document.getElementById('out');
//test hold on
async function simpleLoop() {
    let maxLoop = clamp(parseInt(document.getElementById('maxLoop').value) || 0, 1, 100000);
    out.value = ">> Initializing loop sequence...\n";

    for (let loop = 0; loop < maxLoop; loop++) {
        if (loop * 2 > maxLoop) {
            out.value += `[SYS] ${loop}\n`;
        } else {
            out.value += `[SYS] ${loop - (loop * 2)}\n`;
        }

        out.scrollTop = out.scrollHeight;
        await sleep(1); 
    }
    out.value += ">> Sequence complete.\n";
}

// russian roulette stuff

let outRR = document.getElementById('outRussianRoulette');
let totalChambers = 6;
let bulletPosition = Math.floor(Math.random() * totalChambers) + 1;
let currentChamber = 1;
let isGameOver = false;

function pullTrigger() {
    if (isGameOver) {
        outRR.innerHTML = "the game is over. start a new game.";
        return;
    };
    
    outRR.innerHTML = `(Chamber ${currentChamber})`;

    if (currentChamber === bulletPosition) {
        isGameOver = true;
        outRR.innerHTML = `(Chamber ${currentChamber}) - game over. you were shot, and died.<br>`;
    } else {
        outRR.innerHTML = `(Chamber ${currentChamber}) - you shot, and you survived. carry on.<br>`;
        currentChamber++;
    }
        
    if (currentChamber > totalChambers) {
            outRR.innerHTML += "you survived all 6 chambers, out of luck? most likely. you win.<br>";
            isGameOver = true;
    }
};

function spinCylinder() {
    bulletPosition = Math.floor(Math.random() * totalChambers) + 1;
    currentChamber = 1;
    isGameOver = false;
    outRR.innerHTML = "the cylinder is spun. chambers are randomized again.";
};

function simulateRR() {
    let power = Math.random() * 30;
    let simulations = Math.floor(Math.pow(10, power));
    let safeSimulations = Math.min(simulations, 1000000000);
    let survived = 0;
    
    for (let i = 0; i < safeSimulations; i++) {
        let bullet = Math.floor(Math.random() * 6) + 1;
        let playerChoice = 1;
        if (playerChoice !== bullet) {
            survived++;
        }
    }
    outRR.innerHTML = `simulated <b>${simulations.toExponential(2)}</b> games. <br>you survived <b>${survived}</b> times.`;
}

/*

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let out = document.getElementById('out');

async function simpleLoop() {
    let maxLoop = clamp(parseInt(document.getElementById('maxLoop').value) || 0, 1, 100000);
    out.value = ">> Initializing loop sequence...\n";

    for (let loop = 0; loop < maxLoop; loop++) {
        if (loop * 2 > maxLoop) {
            out.value += `[SYS] ${loop}\n`;
        } else {
            out.value += `[SYS] ${loop - (loop * 2)}\n`;
        }

        // Auto-scroll textarea down to emulate terminal behavior
        out.scrollTop = out.scrollHeight;
        await sleep(1); 
    }
    out.value += ">> Sequence complete.\n";
}

// russian roulette stuff
let outRR = document.getElementById('outRussianRoulette');
let totalChambers = 6;
let bulletPosition = Math.floor(Math.random() * totalChambers) + 1;
let currentChamber = 1;
let isGameOver = false;

function updateCylinderUI() {
    for (let i = 1; i <= totalChambers; i++) {
        let slot = document.getElementById(`slot-${i}`);
        slot.classList.remove('active', 'fired');
        if (i < currentChamber) {
            slot.classList.add('fired');
        } else if (i === currentChamber && !isGameOver) {
            slot.classList.add('active');
        }
    }
}

function pullTrigger() {
    if (isGameOver) {
        outRR.innerHTML = "⚠️ The game is over. Spin the cylinder to start a new game.";
        return;
    }
    
    updateCylinderUI();

    if (currentChamber === bulletPosition) {
        isGameOver = true;
        outRR.innerHTML = `💥 <strong>(Chamber ${currentChamber})</strong> - BANG! Game over. You were shot, and died.`;
        document.getElementById(`slot-${currentChamber}`).classList.add('fired');
    } else {
        outRR.innerHTML = `✨ <strong>(Chamber ${currentChamber})</strong> - *Click*. You survived. Carry on.`;
        currentChamber++;
    }
        
    if (currentChamber > totalChambers && !isGameOver) {
        outRR.innerHTML += "<br>🎉 You survived all 6 chambers out of sheer luck. You win!";
        isGameOver = true;
    }
    updateCylinderUI();
};

function spinCylinder() {
    bulletPosition = Math.floor(Math.random() * totalChambers) + 1;
    currentChamber = 1;
    isGameOver = false;
    outRR.innerHTML = "🔄 The cylinder is spun. Chambers are randomized again. Make your move.";
    
    // Reset slot styling
    for (let i = 1; i <= totalChambers; i++) {
        let slot = document.getElementById(`slot-${i}`);
        slot.classList.remove('fired');
    }
    updateCylinderUI();
};

function simulateRR() {
    let power = Math.random() * 30;
    let simulations = Math.floor(Math.pow(10, power));
    let safeSimulations = Math.min(simulations, 1000000000);
    let survived = 0;
    
    for (let i = 0; i < safeSimulations; i++) {
        let bullet = Math.floor(Math.random() * 6) + 1;
        let playerChoice = 1;
        if (playerChoice !== bullet) {
            survived++;
        }
    }
    outRR.innerHTML = `📊 Simulated <b>${simulations.toExponential(2)}</b> games. <br>You survived <b>${survived.toLocaleString()}</b> times.`;
}

// Initialize cylinder view on load
window.addEventListener('DOMContentLoaded', () => {
    updateCylinderUI();
});

/*