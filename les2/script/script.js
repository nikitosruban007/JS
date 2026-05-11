let display = document.getElementById('display');

function appendValue(i) {
    const allowed = '0123456789+-*/.';
    const ops = '+-*/';

    if (!allowed.includes(i)) return;

    if (display.value === 'Error' || display.value === 'NaN') {
        clearDisplay();
    }

    const lastChar = display.value.slice(-1);

    if (i === '.') {
        const parts = display.value.split(/[\+\-\*\/]/);
        const currentNumber = parts[parts.length - 1];

        if (currentNumber.includes('.')) {
            return;
        }

        if (currentNumber === '') {
            display.value += '0.';
            return;
        }

        display.value += i;
        return;
    }

    if (ops.includes(i)) {
        if (display.value === '') {
            display.value = '0' + i;
            return;
        }
        if (ops.includes(lastChar)) {
            display.value = display.value.slice(0, -1) + i;
            return;
        }
        if (lastChar === '.') {
            display.value = display.value.slice(0, -1) + i;
            return;
        }

        display.value += i;
        return;
    }

    if (display.value === '0') {
        display.value = i;
        return;
    }

    display.value += i;
}

function clearDisplay() {
    display.value = '';
}

function formatResult(val) {
    return parseFloat(Number(val).toFixed(10));
}

function calculate() {
    try {
        display.value = formatResult(eval(display.value));
    } catch (e) {
        display.value = 'Error';
    }
}

function cleanExpression(expr) {
    return expr.replace(/[\+\-\*\/]+$/, '');
}

display.addEventListener('keydown', (e) => {
    const allowedKeys = '0123456789+-*/.BackspaceEnter';

    if (!allowedKeys.includes(e.key)) return;

    if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
        return;
    }

    if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
        return;
    }

    e.preventDefault();
    appendValue(e.key);
});

function deleteLast() {
    if (display.value === 'Error' || display.value === 'NaN') {
        clearDisplay();
        return;
    }
    display.value = display.value.slice(0, -1);
}

function getSquare() {
    try {
        let currentVal = eval(cleanExpression(display.value));
        display.value = formatResult(currentVal ** 2);
    } catch (e) {
        display.value = "Error";
    }
}

function getSquareRoot() {
    try {
        let currentVal = eval(cleanExpression(display.value));
        display.value = formatResult(Math.sqrt(currentVal));
    } catch (e) {
        display.value = "Error";
    }
}

function oneDividedByI() {
    try {
        let currentVal = eval(cleanExpression(display.value));
        display.value = formatResult(1 / currentVal);
    } catch (e) {
        display.value = "Error";
    }
}

function plusMinus() {
    try {
        let currentVal = eval(cleanExpression(display.value));
        display.value = formatResult(currentVal * -1);
    } catch (e) {
        display.value = "Error";
    }
}

function calculatePercentage() {
    if (display.value === 'Error' || display.value === '') {
        return;
    }

    const regex = /(.*)([\+\-\*\/])([\d\.]+)$/;
    const match = display.value.match(regex);

    if (match) {
        let baseExpr = match[1];
        let operator = match[2];
        let lastNum = parseFloat(match[3]);

        if (baseExpr === '') {
            display.value = 0;
            return;
        }

        try {
            let baseVal = eval(cleanExpression(baseExpr));
            let percentVal;

            if (operator === '+' || operator === '-') {
                percentVal = baseVal * (lastNum / 100);
            } else {
                percentVal = lastNum / 100;
            }

            display.value = baseExpr + operator + formatResult(percentVal);
        } catch (e) {
            display.value = 'Error';
        }
        return;
    }

    display.value = 0;
}