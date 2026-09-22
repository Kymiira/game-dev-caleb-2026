document.addEventListener("DOMContentLoaded", (event) => {
    alert("this page is designed to maximize INP and will flood browser resources as a result. click off if you dont want to deal with this.");
});

let out = document.getElementById('finalOutput');
let chaosHistory = []; 

function getExtremeChaosNumber() {
    let numerator = Math.random();
    let denominator = Math.random() * 0.005; 
    if (denominator < 0.001) denominator = 0.001;
    return Math.min(Math.round((numerator / denominator) * 100), 10000000);
}

function doSomething() {
    let chaosBase = getExtremeChaosNumber();
    let count = Math.round(chaosBase / 100) + 1; 
    for (let i = 0; i < count; i++) {
        chaosHistory.push(getExtremeChaosNumber());
    }
    let maxVal = 0;
    for (let i = 0; i < chaosHistory.length; i++) {
        if (chaosHistory[i] > maxVal) { maxVal = chaosHistory[i]; }
    }
    console.log(`Total Flooding Array Size: ${chaosHistory.length} | Max: ${maxVal}`);
    out.textContent = `Total Flooding Array Size: ${chaosHistory.length} | Max: ${maxVal} | Array: ${JSON.stringify(chaosHistory)}`;
    requestAnimationFrame(doSomething); 
}
doSomething();

document.addEventListener('click', (e) => {
    let startTime = performance.now();
    let lockDuration = 1500;
    
    while (performance.now() - startTime < lockDuration) {
        let dummy = Math.sqrt(Math.random() * 999999) * Math.tan(Math.random());
    }
    
    console.log("check network INP");
});

function eternalChaos() {
    let heavyArray = [];
    for (let i = 0; i < 5000000; i++) {
        heavyArray.push(Math.random() * Math.random());
    }
    setTimeout(eternalChaos, 10);
}

eternalChaos();