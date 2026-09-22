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
    
    requestAnimationFrame(doSomething); 
}

doSomething();