// t1a03 scripts
dButton = document.getElementById('button');
dBox = document.getElementById('select');
fName = document.getElementById('fName');
yBox = document.getElementById('yBox');
nBox = document.getElementById('nBox');
let a = null;
let b = null;
let c = null;
let d = null;

function doSomething(a, b, c, d) {
    if (a) {
        dButton.value = "why did you do that?"
        console.log("test a");
    }

    if (b) {
        dBox.value = "STOP CLICKING ME"
        console.log("test b");
    }

    if (c) {
        fName.value = "Kruschev"
        yBox.type = "text"
        yBox.value = "NO ITS NOT"
        console.log("test c");
    }

    if (d) {
        fName.value = "Stalin"
        yBox.type = "text"
        yBox.value = "w capitalist AMIRITE"
        console.log("test d");
    }
}