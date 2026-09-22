function getExtremeChaosNumber() {
    let numerator = Math.random();
    let denominator = Math.random();
    if (denominator < 0.001) denominator = 0.001;
    let chaoticVal = (numerator / denominator) * (Math.random() > 0.5 ? 100 : 1);
    return Math.min(Math.round(chaoticVal), 10000000);
}

function doSomething() {
    let x = {
        out: document.getElementById('finalOutput'),
        array: [],
        temp: 0
    };
    
    let chaosBase = getExtremeChaosNumber();

    let count = Math.round(chaosBase / 100) + 1; 

    for (let i = 0; i < count; i++) {
        x.array[i] = getExtremeChaosNumber();
    }

    function doSomethingElse(arr) {
        let maxVal = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > maxVal) { maxVal = arr[i]; }
        }
        return maxVal;
    }

    x.temp = doSomethingElse(x.array);
    
    console.log(`Array Size: ${count} | Max Value: ${x.temp}`);
    if(x.out) x.out.textContent = `Array Size: ${count} | Max: ${x.temp}`;
    
    setTimeout(doSomething, 1); 
}

doSomething();