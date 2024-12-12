// Ajouter une fonction globale pour initialiser la calculatrice
window.initializeCalculator = (shadowRoot) => {
    class Calculator {
        constructor() {
            this.previousOperand = '';
            this.currentOperand = '0';
            this.operation = undefined;
            this.resultDisplayed = false;
        }

        clear() {
            this.previousOperand = '';
            this.currentOperand = '0';
            this.operation = undefined;
            this.resultDisplayed = false;
        }

        delete() {
            if (this.currentOperand === '0') return;
            if (this.resultDisplayed) {
                this.clear();
            } else if (this.currentOperand.length === 1) {
                this.currentOperand = '0';
            } else {
                this.currentOperand = this.currentOperand.slice(0, -1);
            }
        }

        appendNumber(number) {
            if (this.resultDisplayed) {
                this.currentOperand = number;
                this.resultDisplayed = false;
                return;
            }
            if (this.currentOperand === '0' && number !== '.') {
                this.currentOperand = number;
            } else if (number === '.' && this.currentOperand.includes('.')) {
                return;
            } else {
                this.currentOperand += number;
            }
        }

        chooseOperation(operation) {
            if (this.currentOperand === '0' && this.previousOperand === '') return;
            if (this.resultDisplayed) {
                this.previousOperand = this.currentOperand;
                this.resultDisplayed = false;
            } else if (this.previousOperand !== '') {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '0';
        }

        compute() {
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return;

            let computation;
            switch (this.operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '−':
                    computation = prev - current;
                    break;
                case '×':
                    computation = prev * current;
                    break;
                case '÷':
                    if (current === 0) {
                        showMessage("C'est impossible ce que tu me demandes brozer !");
                        return;
                    }
                    computation = prev / current;
                    break;
                case '%':
                    computation = prev % current;
                    break;
                default:
                    return;
            }

            this.currentOperand = computation.toString();
            this.operation = undefined;
            this.previousOperand = '';
            this.resultDisplayed = true;
        }

        updateDisplay() {
            shadowRoot.querySelector('.current-operand').textContent = this.currentOperand;
            if (this.operation != null) {
                shadowRoot.querySelector('.previous-operand').textContent = `${this.previousOperand} ${this.operation}`;
            } else {
                shadowRoot.querySelector('.previous-operand').textContent = '';
            }
        }
    }

    function showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            background-color: #444;
            color: #fff;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 10px;
            font-family: Arial, sans-serif;
            font-size: 1rem;
            text-align: center;
            opacity: 1;
            transition: opacity 0.5s ease-out;
        `;

        const container = shadowRoot.getElementById('message-container');
        container.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 500);
        }, 3000);
    }

    const calculator = new Calculator();
    calculator.clear();
    calculator.updateDisplay();

    shadowRoot.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            const value = button.dataset.value;

            if (type === 'clear') {
                calculator.clear();
            } else if (type === 'delete') {
                calculator.delete();
            } else if (type === 'equals') {
                calculator.compute();
            } else if (type === 'operator') {
                calculator.chooseOperation(value);
            } else if (type === 'number') {
                calculator.appendNumber(value);
            }
            calculator.updateDisplay();
        });
    });

    shadowRoot.querySelector('[data-type="special"]').addEventListener('click', () => {
        showMessage("Tu crois vraiment que j'ai fais la calculatrice scientifique ? !");
    });
};