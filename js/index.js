class Calculator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.readyToReset = false;
        this.clear();
    };

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };
    
    added(number) {
        if (number === '.' && this.currentOperand.toString().includes('.')) return;
        this.currentOperand = this.currentOperand.toString().padStart(1, '0') + number.toString();
    };

    choose(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '' && this.operation !== undefined) {
            this.compute();
        }
        if (operation === '^') {
            this.operation = '^';
        }
        else if (this.previousOperand !== '' && this.operation === undefined) {
            this.operation += operation 
        }
        else {
            this.operation = operation;
        }
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(curr)) return;

        const length = (number) => {
            return (number % 1).toString().length - 2;
        }

        const degree = (x, y) => {
            if (y === 0) return x = 1;
            return y === 1 ? x : x * degree(x, y - 1);
        }


        if (this.operation === '+') {
            computation = prev + curr;
            if (prev % 1 !== 0 && curr % 1 !== 0) {
                computation = computation.toFixed(Math.max(length(prev), length(curr)));
            }
        }
        else if (this.operation === '-') {
            computation = prev - curr;
        }
        else if (this.operation === '*') {
            computation = prev * curr;
            if (prev % 1 !== 0 && curr % 1 !== 0) {
                computation = computation.toFixed(length(prev) + length(curr));
            }
        }
        else if (this.operation === '÷') {
            computation = prev / curr;
        }
        else if (this.operation === '^') {
            computation = degree(prev, curr);
            if (prev % 1 !== 0) {
                computation = computation.toFixed(length(prev) * curr);
            }
        }

        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    };

    getDisplay(number) {
        const stringNumber = number.toString();
        const integer = parseFloat(stringNumber.split('.')[0]);
        const decimal = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integer)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integer.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimal != null) {
            return `${integerDisplay}.${decimal}`
        }
        else {
            return integerDisplay
        }
    };

    update() {
        this.current.innerHTML = this.getDisplay(this.currentOperand)
        if (this.operation != null) {
            this.previous.innerHTML = this.getDisplay(this.previousOperand) +this.operation;
        }
        else {
            this.previous.innerHTML = '';
        }
    };
    negative() {
        this.currentOperand *= -1;
    }
    sqrt() {
        const curr = parseFloat(this.currentOperand);
        if (isNaN(curr)) return;
        if (curr < 0) {
            alert("Не стоит извлекать корень квадратный из отрицательного числа");
            return;
        }
        else {
            this.currentOperand = Math.sqrt(curr);
            this.readyToReset = true;
            this.operation = undefined;
        }
    }
}

const numberBtn = document.querySelectorAll('[number]');
const operationBtn = document.querySelectorAll('[operation]');
const resultBtn = document.querySelector('[result]');
const deleteBtn = document.querySelector('[delete]');
const allClearBtn = document.querySelector('[allClear]');
const negativeBtn = document.querySelector('[negative]');
const squareRootBtn = document.querySelector('[squareRoot]');

const previous = document.querySelector('[previous]');
const current = document.querySelector('[current]');

const calculator = new Calculator(previous, current);

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previousOperand === '' &&
            calculator.currentOperand !== '' &&
            calculator.readyToReset) {
            calculator.currentOperand = '';
            calculator.readyToReset = false;
        }
        calculator.added(button.innerHTML);
        calculator.update();
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choose(button.innerHTML);
        calculator.update();
    })
})

resultBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.update()
})

allClearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.update()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.update()
})

negativeBtn.addEventListener('click', () => {
    calculator.negative();
    calculator.update()
})

squareRootBtn.addEventListener('click', () => {
    calculator.sqrt();
    calculator.update()
})
