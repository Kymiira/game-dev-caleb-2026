const dButton = document.getElementById('button');
const dBox = document.getElementById('select');
const fName = document.getElementById('fName');
const yBox = document.getElementById('yBox');
const nBox = document.getElementById('nBox');
const progressBar = document.getElementById('myProgress');
const chaosMeter = document.getElementById('myMeter');
const tArea = document.getElementById('tArea');
const hiddenInput = document.getElementById('hiddenInput');
const fileInput = document.getElementById('fileInput');
const resetInput = document.getElementById('resetInput');
const submitInput = document.getElementById('submitInput');
const tagButton = document.getElementById('tagButton');
const myOptgroup = document.getElementById('myOptgroup');
const dataInput = document.getElementById('dataInput');
const myFieldset = document.getElementById('myFieldset');
const myLegend = document.getElementById('myLegend');
const myOutput = document.getElementById('myOutput');

function doSomething(action) {
    switch (action) {
        case 'text':
            console.log("test text input");
            break;
        case 'checkbox-yes':
            fName.value = "Kruschev";
            yBox.type = "text";
            yBox.value = "NO ITS NOT";
            console.log("test checkbox-yes");
            break;
        case 'checkbox-no':
            fName.value = "Stalin";
            yBox.type = "text";
            yBox.value = "w capitalist AMIRITE";
            console.log("test checkbox-no");
            break;
        case 'radio-yes':
            progressBar.value = 100;
            console.log("test radio-yes");
            break;
        case 'radio-no':
            chaosMeter.value = 1.0;
            console.log("test radio-no");
            break;
        case 'file':
            fileInput.style.color = "red";
            console.log("test file upload");
            break;
        case 'reset':
            alert("Form reset triggered!");
            console.log("test reset");
            break;
        case 'submit':
            submitInput.value = "Form Submitted!";
            console.log("test submit");
            break;
        case 'input-btn':
            dButton.value = "why did you do that?";
            console.log("test input button");
            break;
        case 'tag-btn':
            tagButton.innerText = "You pressed the real button!";
            console.log("test tag button");
            break;
        case 'textarea':
            tArea.style.backgroundColor = "black";
            tArea.style.color = "lime";
            console.log("test textarea");
            break;
        case 'select':
            dBox.value = "STOP CLICKING ME";
            console.log("test select box");
            break;
        case 'datalist':
            console.log("test datalist typing: " + dataInput.value);
            break;
        case 'fieldset':
            myFieldset.style.borderColor = "purple";
            console.log("test fieldset click");
            break;
        case 'meter':
            chaosMeter.value = (chaosMeter.value >= 1.0) ? 0.1 : Number(chaosMeter.value) + 0.2;
            console.log("test meter click");
            break;
        case 'progress':
            progressBar.value = (progressBar.value >= 100) ? 10 : Number(progressBar.value) + 20;
            console.log("test progress click");
            break;
        default:
            console.log("unknown action");
    }
}