let display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = null;
let waitingForNewOperand = false;
let fullExpression = '';

function updateDisplay() {
    if (fullExpression) {
        display.textContent = fullExpression;
    } else {
        display.textContent = currentInput;
    }
}

function appendToDisplay(value) {
    if (waitingForNewOperand && !['+', '-', '*', '/'].includes(value)) {
        currentInput = value;
        waitingForNewOperand = false;
        fullExpression = previousInput + ' ' + getOperatorSymbol(operator) + ' ' + value;
    } else {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            // Handle operators
            if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
                return;
            }
            
            // Prevent multiple decimal points
            if (value === '.' && currentInput.includes('.')) {
                return;
            }
            
            currentInput += value;
            
            // Update full expression if we're building the second number
            if (operator && previousInput !== null) {
                fullExpression = previousInput + ' ' + getOperatorSymbol(operator) + ' ' + currentInput;
            }
        }
    }
    updateDisplay();
}

function getOperatorSymbol(op) {
    switch(op) {
        case '*': return '×';
        case '/': return '÷';
        default: return op;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (previousInput === null) {
        previousInput = inputValue;
        // Show the first number with operator immediately
        fullExpression = inputValue + ' ' + getOperatorSymbol(nextOperator) + ' ';
    } else if (operator) {
        const currentValue = previousInput || 0;
        const newValue = performCalculation(currentValue, inputValue, operator);

        currentInput = String(newValue);
        previousInput = newValue;
        // Show new result with new operator
        fullExpression = newValue + ' ' + getOperatorSymbol(nextOperator) + ' ';
        updateDisplay();
    }

    waitingForNewOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function performCalculation(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            if (secondOperand === 0) {
                alert('Cannot divide by zero!');
                return firstOperand;
            }
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function calculate() {
    const inputValue = parseFloat(currentInput);

    if (previousInput !== null && operator) {
        const newValue = performCalculation(previousInput, inputValue, operator);
        
        // Show the complete expression first, then the result
        display.textContent = fullExpression + ' = ' + newValue;
        
        currentInput = String(newValue);
        previousInput = null;
        operator = null;
        waitingForNewOperand = true;
        fullExpression = '';
    }
}

function clearDisplay() {
    currentInput = '0';
    previousInput = null;
    operator = null;
    waitingForNewOperand = false;
    fullExpression = '';
    updateDisplay();
}

function clearEntry() {
    currentInput = '0';
    if (operator && previousInput !== null) {
        fullExpression = previousInput + ' ' + getOperatorSymbol(operator) + ' ';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }
});

// Initialize display
updateDisplay();