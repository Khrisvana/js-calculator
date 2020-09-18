var state = true;
class Calculator {
	constructor(previousOutputText,currentOutputText){
		this.previousOutputText = previousOutputText;
		this.currentOutputText = currentOutputText;
		this.operatorList = ['+','-','x','/'];
		this.clear();
	}

	clear() {
		this.previousOutput = '';
		this.currentOutput = '';
		state = true;
	}

	delete() {
		if (this.currentOutput.includes('.', this.currentOutput.length-1)) {state = true;}
		var del = this.currentOutput.slice(0,-1);
		this.currentOutput = del;
	}

	appendNumber(number) {
		if (this.currentOutput === '' && number === '.') {number = '0.'}
		if (number === '0' && this.currentOutput.length === 1 && this.currentOutput.includes('0', this.currentOutput.length-1)) {return}

		for (var i = 0; i < this.operatorList.length; i++) {
			if (number === '.' && this.currentOutput.includes(this.operatorList[i], this.currentOutput.length-1)) {
				return;
			}
			if (number === '0' && this.currentOutput.includes('0', this.currentOutput.length-1) && this.currentOutput.includes(this.operatorList[i], this.currentOutput.length-2)) {
				return;
			}
		}
		if (this.currentOutput.includes('.', this.currentOutput.length-1)) {state = false;}
		if (state === false && number === '.') {
			return;
		}

		this.currentOutput = this.currentOutput.toString() + number.toString();
	}

	updateDisplay() {
		this.currentOutputText.innerText = this.currentOutput;
		this.previousOutputText.innerText = this.previousOutput;
	}

	chooseOperator(operator) {
		for (var i = 0; i < this.operatorList.length; i++) {
			if (operator === this.operatorList[i] && this.currentOutput === '' || this.currentOutput.includes(this.operatorList[i], this.currentOutput.length-1)) {return}
		}
		if (this.currentOutput.includes('.', this.currentOutput.length-1)) {return}	
		this.currentOutput = this.currentOutput.toString() + operator.toString();
		state = true;
	}

	equal() {
		if (this.currentOutput === this.previousOutput) {return}
		if (this.currentOutput !== '') {
			var  result = this.currentOutput.replaceAll('x','*');
			this.previousOutput = this.currentOutput;
			this.currentOutput = eval(result).toString();
		}
		this.history();
	}

	history() {
		const history = document.querySelector('[data-history]');
		var h = document.createElement('p');
		var br = document.createElement('br');
		var hText = document.createTextNode(this.previousOutput.toString());
		var hText2 = document.createTextNode(" = " + this.currentOutput.toString());

		h.appendChild(hText);
		h.appendChild(br);
		h.appendChild(hText2);

		history.appendChild(h);
	}

}

const showHistoryBtn = document.querySelector('[data-show-history]');
const numberBtn = document.querySelectorAll('[data-num]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equal]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const previousOutputText = document.querySelector('[data-previous-output]');
const currentOutputText = document.querySelector('[data-current-output]');
const clearHistoryBtn = document.querySelector('[data-clear-history]');

const calculator = new Calculator(previousOutputText,currentOutputText);

numberBtn.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operatorBtn.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperator(button.innerText);
		calculator.updateDisplay();
	});
});

clearBtn.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
	calculator.delete();
	calculator.updateDisplay();
});


equalBtn.addEventListener('click', () => {
	calculator.equal();
	calculator.updateDisplay();
});

showHistoryBtn.addEventListener('click' , () => {
	const container = document.querySelector('#container-history');

	if (showHistoryBtn.innerText === 'Close History') {
		container.style.display = 'none';
		showHistoryBtn.innerText = 'Show History';
	} else {
		container.style.display = 'block';
		showHistoryBtn.innerText = 'Close History';
	}
});

clearHistoryBtn.addEventListener('click' , () => {
	const history = document.querySelector('[data-history]');
	history.innerText = '';
});