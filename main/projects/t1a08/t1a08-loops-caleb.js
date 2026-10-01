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