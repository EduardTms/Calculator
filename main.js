const buttons = [...document.querySelectorAll('button')];
const lowerScreen = document.querySelector('.lowerScreen');
const upperScreen = document.querySelector('.upperScreen');
const errorScreen = document.querySelector('.error');
const equalsBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#AC');
const delBtn = document.querySelector('#DEL');
let numberEntered = 0;
let operation = '';
let nbmLength =0;
let firstNmb = 0;
let secondNmb = 0;

const add = (var1,var2) => {
    return var1 + var2;
};
const subtract = (var1,var2) => {
	return var1 - var2;
};
const multiply = (var1,var2) => {
	return var1 * var2;
};
const divide = (var1,var2) => {
	return var1 / var2;
};

const operate = (var1,var2,operator) => {
    switch (operator){
        case 'add':
            upperScreenDisplay(false);
            return add(var1,var2);
        case 'subtract':
            upperScreenDisplay(false);
            return subtract(var1,var2);
        case 'multiply':
            upperScreenDisplay(false);
            return multiply(var1,var2)
        case 'divide': 
            upperScreenDisplay(false);
            let answer = divide(var1,var2);
            if(answer.toString().length > 13) {
                return answer.toFixed(12);
            }
            return answer;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(Number.isInteger(parseInt(button.value))) {
            inputNumber(button.value);
            nbmLength++;
        } else if(button.id === 'divide' || 
                  button.id === 'multiply' || 
                  button.id === 'subtract' || 
                  button.id === 'add') {
            operation = button.id;
            firstNmb = numberEntered;
            clearDisplayAfterOperationBtn();
            upperScreenDisplay(true);
        }
    })
})

const inputNumber = (number) => {
    // the numberEntered can have a max length of 12
    if(nbmLength < 12) {
        lowerScreen.textContent += number;
        numberEntered = parseInt(lowerScreen.textContent);
    }
}

const clearDisplayAfterOperationBtn = () => {
    lowerScreen.textContent = '';
    numberEntered = 0;
}

const upperScreenDisplay = (bool) => {
    if (bool === true){
    switch (operation){
        case 'add':
            upperScreen.textContent = firstNmb + ' ' + '+';
        case 'subtract':
            upperScreen.textContent = firstNmb + ' ' + '-';
        case 'multiply':
            upperScreen.textContent = firstNmb + ' ' + '*';
        case 'divide': 
        upperScreen.textContent = firstNmb + ' ' + '÷';
        }
    }
    else {
        switch (operation){
            case 'add':
                upperScreen.textContent = firstNmb + ' ' + '+ ' + secondNmb + ' =';
            case 'subtract':
                upperScreen.textContent = firstNmb + ' ' + '- ' + secondNmb + ' =';
            case 'multiply':
                upperScreen.textContent = firstNmb + ' ' + '* ' + secondNmb + ' =';
            case 'divide': 
            upperScreen.textContent = firstNmb + ' ' + '÷ ' + secondNmb + ' =';
            }
    }
}

//ToDo fix this
// it deploys error after 0.5s instead of deploying it for 0.5s
setTimeout(() => {
    if(firstNmb === 0) {
        errorScreen.textContent = "you have to enter a number first";
    } else if(secondNmb === 0) {
        errorScreen.textContent = "you have to enter a number first";
    } else if(operation === '') {
        errorScreen.textContent = 'you must press an operator first';
    }
},500);

equalsBtn.addEventListener('click', () => {
    secondNmb = numberEntered;
    console.log(firstNmb,numberEntered,operation);
    console.log(operate(firstNmb,numberEntered,operation));
    let answer = operate(firstNmb,secondNmb,operation);
    lowerScreen.textContent = answer;
    numberEntered = answer;
});

clearBtn.addEventListener('click', () => {
    lowerScreen.textContent = '';
    upperScreen.textContent = '';
    numberEntered = 0;
    operation = '';
    firstNmb = 0;
    secondNmb = 0;
    nbmLength = 0;
});

delBtn.addEventListener('click', () => {
    lowerScreen.textContent = lowerScreen.textContent.slice(0,-1);
    numberEntered = lowerScreen.textContent;
});

