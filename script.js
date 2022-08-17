//instantiate calculator
const calculator = document.querySelector('.calculator');
const calculatorScreen = calculator.querySelector('.calculator__screen');
const calculatorBottom= calculator.querySelector('.calculator__bottom');
const calculatorButtons = calculatorBottom.querySelectorAll('button');

//set inital total;
let prevValue = 0; //placeholder check to see if input number is a numerical value
let nextValue = 0; //placeholder check to see if input number is a numerical value
let operator = null;
//instatiate initial screen state
calculatorScreen.textContent = prevValue;

//operation functions
function add(num1, num2) { return num1 + num2; }
function subtract(num1, num2) { return num1 - num2; }
function multiply(num1, num2) { return num1 * num2; }
function divide(num1, num2) { return num1 / num2; }

function updateScreen(value) {
    calculatorScreen.textContent = value;
}
//refactor with reduce for continuous chained operations
function operate(operator, num1, num2) {
    let operatorTotal = 0;

    if (operator === "+") {
        operatorTotal = add(num1, num2);
    }
    if (operator === "-") {
        operatorTotal = subtract(num1, num2);
    } 
    if (operator === "*") {
        operatorTotal = multiply(num1, num2);
    }
    if (operator === "/") {
        operatorTotal = divide(num1, num2);
    }
    //check for zero division error
    if (operatorTotal === Infinity || isNaN(operatorTotal)) operatorTotal =  "Not a number!";

    return operatorTotal;
}

function displayOutput(e) {
    //happy case
    //1. identify the target button
    const target = e.target.textContent;
    const targetClass = e.target.classList;

    //if target is AC zero everything
    if (target === "AC") {
        prevValue = 0;
        nextValue = 0;
        operator = null;
    }

    //2. if target is number, display it. if next value is a number, concatenate with previous value
    if (prevValue === 0 && operator === null && targetClass.contains('number')) {
        prevValue = target;
    } else if (prevValue !== 0 && operator === null && targetClass.contains('number')) {
        prevValue += `${target}`;
    }

    //3. if target is operator, save it as a variable
    if (targetClass.contains('operator')) {
        if (operator === null) operator = target;
        if (operator === "*" || operator === "/") {
            if (nextValue === 0) return; //disable multiplication or division of zero for first operation
        }
        //use the previous saved operator for calculation, not the current one
        prevValue = operate(operator, parseInt(prevValue), parseInt(nextValue));
        nextValue = 0;
        operator = target;
    }

    //4. operator variable needs to be available before accessing 2nd number
    if (nextValue === 0 && operator !== null && targetClass.contains('number')) {
        nextValue = target;
    } else if (nextValue !== 0 && operator !== null && targetClass.contains('number')) {
        nextValue += `${target}`;
    }

    //5. if target is equal, evaluate total
    if (operator !== null && targetClass.contains('equal')) {
        prevValue = operate(operator, parseInt(prevValue), parseInt(nextValue));
        operator = null;
        nextValue = 0;
    }
    //if there is a 2nd value, update the screen to show the second number instead. Else always show the existing number
    nextValue === 0 ? updateScreen(prevValue) : updateScreen(nextValue);
}

calculatorBottom.addEventListener('click', displayOutput);

//edge cases to be added - like decimals, etc...