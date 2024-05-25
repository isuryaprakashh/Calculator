const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');
const toggleButton = document.getElementById('toggle');
const body = document.body;

let currentValue = '0';
let prevValue = null;
let operator = null;
let isNewOperation = true;

function calculate(op, a, b) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    if (isNaN(num1) || isNaN(num2)) {
        return null;
    }
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '×':
            return num1 * num2;
        case '÷':
            return num1 / num2;
        case '%':
            return num1 % num2;
        default:
            return null;
    }
}

function updateDisplay(value, op = null) {
    let displayValue = value;
    if (op !== null && !isNewOperation) {
        displayValue = `${prevValue} ${op} ${currentValue}`;
    }
    result.textContent = displayValue;
}

function clearDisplay() {
    currentValue = '0';
    prevValue = null;
    operator = null;
    isNewOperation = true;
    updateDisplay(currentValue);
}

function handleNumber(number) {
    if (currentValue === '0' || isNewOperation) {
        currentValue = number.toString();
        isNewOperation = false;
    } else {
        currentValue += number.toString();
    }
    updateDisplay(currentValue);
}

function handleOperator(op) {
    if (prevValue === null) {
        prevValue = currentValue;
        operator = op;
        isNewOperation = true;
        updateDisplay(prevValue, op);
    } else {
        const res = calculate(operator, prevValue, currentValue);
        if (res === null) {
            return;
        }
        prevValue = res.toString();
        operator = op;
        currentValue = '0';
        isNewOperation = true;
        updateDisplay(prevValue, op);
    }
}

function handleDecimal() {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay(currentValue);
    }
}

function handleNegate() {
    currentValue = (-parseFloat(currentValue)).toString();
    updateDisplay(currentValue);
}

function handleEquals() {
    if (prevValue !== null && operator !== null) {
        const res = calculate(operator, prevValue, currentValue);
        if (res === null) {
            return;
        }
        prevValue = null;
        operator = null;
        currentValue = res.toString();
        isNewOperation = true;
        updateDisplay(currentValue);
    }
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        switch (value) {
            case 'AC':
                clearDisplay();
                break;
            case '±':
                handleNegate();
                break;
            case '.':
                handleDecimal();
                break;
            case '=':
                handleEquals();
                break;
            case '+':
            case '-':
            case '×':
            case '÷':
            case '%':
                handleOperator(value);
                break;
            default:
                handleNumber(parseInt(value));
        }
    });
});

toggleButton.addEventListener('click', toggleTheme);