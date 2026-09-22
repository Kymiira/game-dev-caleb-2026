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
  
  let count = Math.min(Math.round(getExtremeChaosNumber() / 10000), 100);
  for (let i = 0; i < count; i++) {
    x.array[i] = getExtremeChaosNumber();
  }

  function doSomethingElse(arr) {
    let maxVal = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > maxVal) { maxVal = arr[i];}
    }
    return maxVal;
  }
  x.temp = doSomethingElse(x.array);
  
  console.log("Array:", x.array, "Max:", x.temp);
  x.out.textContent = `Array: ${JSON.stringify(x.array)} | Max: ${x.temp}`;
    
  setTimeout(doSomething, 1);
}
doSomething();