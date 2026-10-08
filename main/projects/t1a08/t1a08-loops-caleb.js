const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let out = document.getElementById('out');

async function simpleLoop() {
    let maxLoop = clamp(parseInt(document.getElementById('maxLoop').value) || 0, 1, 100000);

    for (let loop = 0; loop < maxLoop; loop++) {
        if (loop * 2 > maxLoop) {
            out.value += `${loop}\n`;
        } else {
            out.value += `${loop - (loop * 2)}\n`;
        }

        out.scrollTop = out.scrollHeight;
        await sleep(1); 
    }
    out.value += "sequence complete.\n";
}

let outRR = document.getElementById('outRussianRoulette');
let totalChambers = 6;
let bulletPosition = Math.floor(Math.random() * totalChambers) + 1;
let currentChamber = 1;
let isGameOver = false;

function updateCylinderUI() {
    for (let i = 1; i <= totalChambers; i++) {
        let slot = document.getElementById(`slot-${i}`);
        if (!slot) continue;
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
        outRR.innerHTML = "the game is over. spin the cylinder to start a new game.";
        return;
    }
    
    updateCylinderUI();

    if (currentChamber === bulletPosition) {
        isGameOver = true;
        outRR.innerHTML = `<strong>(Chamber ${currentChamber})</strong> game over.`;
        let firedSlot = document.getElementById(`slot-${currentChamber}`);
        if (firedSlot) firedSlot.classList.add('fired');
    } else {
        outRR.innerHTML = `<strong>(Chamber ${currentChamber})</strong> - you survived this round`;
        currentChamber++;
    }
        
    if (currentChamber > totalChambers && !isGameOver) {
        outRR.innerHTML += "<br>you survived and have won";
        isGameOver = true;
    }
    updateCylinderUI();
};

function spinCylinder() {
    bulletPosition = Math.floor(Math.random() * totalChambers) + 1;
    currentChamber = 1;
    isGameOver = false;
    outRR.innerHTML = "chambers are randomized";
    
    for (let i = 1; i <= totalChambers; i++) {
        let slot = document.getElementById(`slot-${i}`);
        if (slot) slot.classList.remove('fired');
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
    outRR.innerHTML = `simulated <b>${simulations.toExponential(2)}</b> games. <br>survived <b>${survived.toLocaleString()}</b> times.`;
}

window.addEventListener('DOMContentLoaded', () => {
    updateCylinderUI();
});