const calculatorScreen = document.querySelector('h1');
const pressedButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-button');

let firstNumber = 0;
let operatorValue = '';
let nextNumber = false;

function sendNumber(number) {
    if (nextNumber) {
        calculatorScreen.textContent = number;
        nextNumber = false;
    } else {
        const displayedNumber = calculatorScreen.textContent;
        calculatorScreen.textContent = displayedNumber === '0' ? number : displayedNumber + number;
    }
}

function addDecimalNumber() {
    if (nextNumber) return;
    if (!calculatorScreen.textContent.includes('.')) {
        calculatorScreen.textContent = `${calculatorScreen.textContent}.`;
    }
}
/* Calculate values */
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,

};


function includeOperator(operator) {
    const currentNumber = Number(calculatorScreen.textContent);
    if (operatorValue && nextNumber) {
        operatorValue = operator;
        return;
    }
    if (!firstNumber) {
        firstNumber = currentNumber;
    } else {
        console.log(firstNumber, operatorValue, currentNumber);
        const calculationResult = calculate[operatorValue](firstNumber, currentNumber);
        calculatorScreen.textContent = Math.round((calculationResult * 10000), 4) / 10000;
        firstNumber = calculationResult;
    }
    nextNumber = true;
    operatorValue = operator;

}

/* Even Listeners for pressed buttons */
pressedButtons.forEach((pressedButton) => {
    if (pressedButton.classList.length === 0) {
        pressedButton.addEventListener('click', () => sendNumber(pressedButton.value));
    } else if (pressedButton.classList.contains('operator')) {
        pressedButton.addEventListener('click', () => includeOperator(pressedButton.value));
    } else if (pressedButton.classList.contains('decimal')) {
        pressedButton.addEventListener('click', () => addDecimalNumber());
    }
});

/* Resetting values */
function resetValues() {
    let firstNumber = 0;
    let operatorValue = '';
    let nextNumber = false;

    calculatorScreen.textContent = '0';
}

clearButton.addEventListener('click', resetValues);