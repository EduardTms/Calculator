const buttons = [...document.querySelectorAll('button')];
const lowerScreen = document.querySelector('.lowerScreen');
const upperScreen = document.querySelector('.upperScreen');
const errorScreen = document.querySelector('.error');
const equalsBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#AC');
const delBtn = document.querySelector('#DEL');
const decimalBtn = document.querySelector('#point');
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
// Take input from every button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.id === 'divide' || 
           button.id === 'multiply' || 
           button.id === 'subtract' || 
           button.id === 'add') 
           {
                operation = button.id;
                firstNmb = numberEntered;
                decimalBtn.disabled = 'false';
                clearDisplayAfterOperationBtn();
                upperScreenDisplay(true);
            }
        inputNumber(button.value);
        nbmLength++;
    })
})

// Populate the display when number buttons are clicked
const inputNumber = (number) => {
    // the numberEntered can have a max length of 12
    if(nbmLength < 12) {
        lowerScreen.textContent += number;
        numberEntered = parseFloat(lowerScreen.textContent);
        multiplePointsError();
    }
}

// Clears Lower display after Operation Button is clicked
const clearDisplayAfterOperationBtn = () => {
    lowerScreen.textContent = '';
    numberEntered = 0;
}

// AC Button, resets everything
const fullClear = () => {
    lowerScreen.textContent = '';
    upperScreen.textContent = '';
    numberEntered = 0;
    operation = '';
    firstNmb = 0;
    secondNmb = 0;
    nbmLength = 0;
}

// Populates the upper part of the Screen with the operation that was performed
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

// Errors
const error = () => {
    if(firstNmb === 0 || firstNmb === NaN || secondNmb === 0 || (firstNmb !== 0 && operation === '') || lowerScreen.textContent === NaN) {
        errorScreen.textContent = "You did something wrong! Try again";
        fullClear();
    }  
}

const multiplePointsError = () => {
    if(lowerScreen.textContent.indexOf('.') !== lowerScreen.textContent.lastIndexOf('.')) {
        errorScreen.textContent = "Number can't contain multiple decimal points";
        fullClear();
    }
}


// Equals button
// 1. saves second Nmb in secondNmb var
// 2. gives an error if something is wrong (see error function)
// 3. saves operation answer in a var
// 4. displays answer
// 5. saves answer as the numberEntered (or firstNmb in case of further calculations)
equalsBtn.addEventListener('click', () => {
    secondNmb = numberEntered;
    error();
    setTimeout(() => {
        errorScreen.textContent = '';
    },2000);
    let answer = operate(firstNmb,secondNmb,operation);
    lowerScreen.textContent = answer;
    numberEntered = answer;
});

clearBtn.addEventListener('click', fullClear);

// Deletes the last number from the screen
delBtn.addEventListener('click', () => {
    lowerScreen.textContent = lowerScreen.textContent.slice(0,-1);
    numberEntered = lowerScreen.textContent;
});


