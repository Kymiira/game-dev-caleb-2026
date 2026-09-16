function doSomething() {
  
  let x = {
    out: document.getElementById('finalOutput'),
    array: [],
    temp: 0
  };
  
  let count = Math.round((Math.round(((Math.random() / Math.random()) + (Math.random() / Math.random()) + (Math.random() / Math.random()) + (Math.random() / Math.random())))*100));
  for (let i = 0; i < count; i++) {
    x.array[i] = Math.round(((Math.random() / Math.random()) + (Math.random() / Math.random()) + (Math.random() / Math.random()) + (Math.random() / Math.random())));
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
  x.out.value = JSON.stringify(x.array);
    
  requestAnimationFrame(doSomething);
}
doSomething();