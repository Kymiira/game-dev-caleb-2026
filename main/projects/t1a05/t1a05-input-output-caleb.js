let currentEquation = "";

calculator = {
    button1: document.getElementById('1Button'),
    button2: document.getElementById('2Button'),
    button3: document.getElementById('3Button'),
    buttonAdd: document.getElementById('additionButton'),
    button4: document.getElementById('4Button'),
    button5: document.getElementById('5Button'),
    button6: document.getElementById('6Button'),
    buttonSubtract: document.getElementById('subtractionButton'),
    button7: document.getElementById('7Button'),
    button8: document.getElementById('8Button'),
    button9: document.getElementById('9Button'),
    buttonMultiply: document.getElementById('multiplyButton'),
    button0: document.getElementById('0Button'),
    buttonDecimal: document.getElementById('decimalButton'),
    buttonSubmit: document.getElementById('submitButton'),
    buttonDivide: document.getElementById('divideButton'),
    buttonClear: document.getElementById('clearButton'),
    spanOutput: document.getElementById('outputSpan'),
    calculatorContainer: document.querySelector('.funky-table')
};

document.addEventListener("DOMContentLoaded", init);
function init() {
    calculator.button1.textContent = '1'
    calculator.button2.textContent = '2'
    calculator.button3.textContent = '3'
    calculator.buttonAdd.textContent = '+'
    calculator.button4.textContent = '4'
    calculator.button5.textContent = '5'
    calculator.button6.textContent = '6'
    calculator.buttonSubtract.textContent = '-'
    calculator.button7.textContent = '7'
    calculator.button8.textContent = '8'
    calculator.button9.textContent = '9'
    calculator.buttonMultiply.textContent = '*'
    calculator.button0.textContent = '0'
    calculator.buttonDecimal.textContent = '.'
    calculator.buttonSubmit.textContent = 'Enter'
    calculator.buttonDivide.textContent = '/'
    calculator.buttonClear.textContent = 'C'
    calculator.spanOutput.textContent = "Please create an equation."
}

calculator.calculatorContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const buttonText = event.target.textContent;
        handleButtonPress(buttonText);
    }
});

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '.', '/'].includes(key)) {
        handleButtonPress(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleButtonPress('Enter');
    } else if (key === 'Backspace') {
        currentEquation = currentEquation.slice(0, -1);
        calculator.spanOutput.textContent = currentEquation || "Please create an equation.";
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        handleButtonPress('C');
    }
});

function handleButtonPress(value) {
    console.log(value);
    if (value === 'Enter') {
        try {
            let result = eval(currentEquation);
            calculator.spanOutput.textContent = result;
            currentEquation = String(result);
        } catch (error) {
            calculator.spanOutput.textContent = "error";
            currentEquation = "";
        }
    } else if (value === 'C') {
        currentEquation = "";
        calculator.spanOutput.textContent = "Please create an equation.";
    } else {
        if (calculator.spanOutput.textContent === "Please create an equation." || calculator.spanOutput.textContent === "error") {
            currentEquation = "";
        }
        currentEquation += value;
        calculator.spanOutput.textContent = currentEquation;
    }
}