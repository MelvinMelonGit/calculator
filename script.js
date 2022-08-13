//instantiate calculator
const calculator = document.querySelector('.calculator');
const calculatorScreen = calculator.querySelector('.calculator__screen');
const calculatorBottom= calculator.querySelector('.calculator__bottom');
const calculatorButtons = calculatorBottom.querySelectorAll('button');

//operation functions
function add(num1, num2) { return num1 + num2; }
function subtract(num1, num2) { return num1 - num2; }
function multiply(num1, num2) { return num1 * num2; }
function divide(num1, num2) { return num1 / num2; }

function operate(operator, num1, num2) {
    if (operator === "add") add(num1, num2);
    if (operator === "subtract") subtract(num1, num2);
    if (operator === "multiply") multiply(num1, num2);
    if (operator === "divide") divide(num1, num2);
}

function displayOutput(e) {
    const target = e.target.textContent;
    calculatorScreen.textContent = target;
}

calculatorBottom.addEventListener('click', displayOutput);