// t1a03 scripts
const dButton = document.getElementById('button');
const dBox = document.getElementById('select');
const fName = document.getElementById('fName');
const yBox = document.getElementById('yBox');
const nBox = document.getElementById('nBox');
const progressBar = document.getElementById('myProgress');
const chaosMeter = document.getElementById('myMeter');
const tArea = document.getElementById('tArea');

function doSomething(action) {
    if (action === 'a') {
        dButton.value = "why did you do that?";
        console.log("test a");
    }

    if (action === 'b') {
        dBox.value = "STOP CLICKING ME";
        console.log("test b");
    }

    if (action === 'c') {
        fName.value = "Kruschev";
        yBox.type = "text";
        yBox.value = "NO ITS NOT";
        console.log("test c");
    }

    if (action === 'd') {
        fName.value = "Stalin";
        yBox.type = "text";
        yBox.value = "w capitalist AMIRITE";
        console.log("test d");
    }

    if (action === 'radio-yes') {
        progressBar.value = 100;
        console.log("test radio-yes");
    }

    if (action === 'radio-no') {
        chaosMeter.value = 1.0;
        console.log("test radio-no");
    }

    if (action === 'textarea-change') {
        tArea.value = "ERROR: Textarea has been hijacked by the Politburo.";
        console.log("test textarea-change");
    }
}