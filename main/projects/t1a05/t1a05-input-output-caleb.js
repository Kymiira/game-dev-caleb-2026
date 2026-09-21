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
    calculator.button1.value = '1'
    calculator.button2.value = '2'
    calculator.button3.value = '3'
    calculator.buttonAdd.value = '+'
    calculator.button4.value = '4'
    calculator.button5.value = '5'
    calculator.button6.value = '6'
    calculator.buttonSubtract.value = '-'
    calculator.button7.value = '7'
    calculator.button8.value = '8'
    calculator.button9.value = '9'
    calculator.buttonMultiply.value = '*'
    calculator.button0.value = '0'
    calculator.buttonDecimal.value = '.'
    calculator.buttonSubmit.value = 'Enter'
    calculator.buttonDivide.value = '/'
    calculator.spanOutput.textContent = "Please create an equation."
}