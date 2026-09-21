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
    spanOutput: document.getElementById('outputSpan')
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
    calculator.spanOutput.textContent = "Please create an equation."
}