// t1a03 scripts
dButton = document.getElementById('button');
dBox = document.getElementById('select');
fName = document.getElementById('fName');
yBox = document.getElementById('yBox');
nBox = document.getElementById('nBox');
let a = false
let b = false
let c = false
let d = false

function doSomething(a, b) {
    if (a) {
        dButton.value = "why did you do that?"
    }

    if (b) {
        dBox.value = "STOP CLICKING ME"
    }

    if (c) {
        fName.value = "Kruschev"
        yBox.type = "text"
        yBox.value = "NO ITS NOT"
    }

    if (d) {
        fName.value = "Stalin"
        yBox.type = "text"
        yBox.value = "w capitalist AMIRITE"
    }
}