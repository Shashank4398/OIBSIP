document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    let operator = '';
    let currentInput = '';
    let previousInput = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                clearDisplay();
            } else if (value === '=') {
                calculate();
            } else if (button.classList.contains('operator')) {
                setOperator(value);
            } else {
                addToDisplay(value);
            }
        });
    });

    function clearDisplay() {
        display.value = '';
        currentInput = '';
        previousInput = '';
        operator = '';
    }

    function calculate() {
        if (previousInput && currentInput && operator) {
            let result;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);

            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    result = prev / current;
                    break;
                default:
                    return;
            }

            display.value = result;
            currentInput = result.toString();
            previousInput = '';
            operator = '';
            resultDisplayed = true;
        }
    }

    function setOperator(op) {
        if (currentInput) {
            if (resultDisplayed) {
                resultDisplayed = false;
            } else {
                calculate();
            }
            previousInput = currentInput;
            currentInput = '';
            operator = op;
            display.value = '';
        }
    }

    function addToDisplay(value) {
        if (resultDisplayed) {
            currentInput = value;
            resultDisplayed = false;
        } else {
            currentInput += value;
        }
        display.value = currentInput;
    }
});
