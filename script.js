//instantiate calculator
const calculator = document.querySelector('.calculator');
const calculatorScreen = calculator.querySelector('.calculator__screen');
const calculatorBottom= calculator.querySelector('.calculator__bottom');
const calculatorButtons = calculatorBottom.querySelectorAll('button');

//set inital total;
let oldTotal = 0;
let newTotal = 0;
let tempNum1 = ''; //placeholder check to see if input number is a numerical value
let tempNum2 = ''; //placeholder check to see if input number is a numerical value
let operator = ''; //placeholder variable for operator type

//operation functions
function add(num1, num2) { return num1 + num2; }
function subtract(num1, num2) { return num1 - num2; }
function multiply(num1, num2) { return num1 * num2; }
function divide(num1, num2) { return num1 / num2; }

function updateScreen(value) {
    //clear screen if value is AC
    if (value === "AC") {
        calculatorScreen.textContent = '';
        oldTotal = 0;
        newTotal = 0;
        updateScreen(oldTotal);
    } else {
        calculatorScreen.textContent = value;
    }
}

function operate(operator, num1, num2) {
    let operatorTotal = 0;

    console.log(operator, num1, num2);
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

    return operatorTotal;
}

function displayOutput(e) {
    //happy case

    //1. user clicks on a number button
    const value = e.target.textContent;
    const className = e.target.classList;
    //2. display shows number
    updateScreen(value);

    if (!isNaN(value)) tempNum1 = parseInt(value);

    //3. user clicks on operator
    if (!isNaN(tempNum1) && className.contains('operator')) {
        //4. variable saves operator
        operator = value;
        //5. variable saves first number
        oldTotal = tempNum1;
    }

    //6. user clicks on number
    if (!isNaN(value) && !isNaN(tempNum1)) tempNum2 = parseInt(value);

    //6. user clicks on equal
    if (!isNaN(tempNum2) && className.contains('equal')) {
        newTotal = tempNum2;
        //7. variable saves new total
        oldTotal = operate(operator, oldTotal, newTotal);
        updateScreen(oldTotal);
    }
}

calculatorBottom.addEventListener('click', displayOutput);

//edge cases
//to be added