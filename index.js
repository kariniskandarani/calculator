
//functions for addition, Subtraction,division and multiplication
const add=(...args)=>{
    return args.reduce((a,b)=>a+b);
 }
 
 const subtract=(...args)=>{
     return args.reduce((a,b)=>a-b);
 }
 
 const multiply=(...args)=>{
     return args.reduce((a,b)=>a*b);
 }
 
 const divide=(...args)=>{
     return args.reduce((a,b)=>a/b);
 }
 console.log(multiply(1,2));

let displayValue='0';
let operand1= null;
let operand2=null;
let operator1=null;
let operator2=null;
let result = null;
//gets all the button elements and store them in buttons
let buttons=document.querySelectorAll('button');

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});
 
function updateDisplay() {
    const display = document.querySelector('.display');
    display.innerText = displayValue;
    //limiting the number of digits that can be displayed 
    //User can only type a number with 9 digits maximum
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}

updateDisplay();


function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equal')) {
                inputEquals();
                updateDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                updateDisplay();
        }
    )}
}

clickButton();

function inputOperand(operand) {
    if(operator1 === null) {
        if(displayValue === '0' || displayValue === 0) {
            //1st click - handles first operand input
            displayValue = operand;
        } else if(displayValue === operand1) {
            //starts new operation after inputEquals()
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        //3rd/5th click - inputs to operand2
        if(displayValue === operand1) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }

    
}
function inputOperator(operator) {
    if(operator1 != null && operator2 === null) {
        //4th click - handles input of second operator
        operator2 = operator;
        operand2= displayValue;
        result = operate(Number(operand1), Number(operand2), operator1);
        displayValue = roundAccurately(result, 15).toString();
        operand1= displayValue;
        result = null;
    } else if(operator1 != null && operator2 != null) {
        //6th click - new operator2
        operand2= displayValue;
        result = operate(Number(operand1), Number(operand2), operator2);
        operator2 = operator;
        displayValue = roundAccurately(result, 15).toString();
        operand1= displayValue;
        result = null;
    } else { 
        //2nd click - handles first operator input
        operator1 = operator;
        operand1= displayValue;
    }
}
function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if(operator1 === null) {
        displayValue = displayValue;
    } else if(operator2 != null) {
        //handles final result
        operand2= displayValue;
        result = operate(Number(operand1), Number(operand2), operator2);
        if(result === 'lol') {
            displayValue = 'lol';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            operand1= displayValue;
            operand2= null;
            operator1 = null;
            operator2 = null;
            result = null;
        }
    } else {
        //handles first operation
        operand2= displayValue;
        result = operate(Number(operand1), Number(operand2), operator1);
        if(result === 'lol') {
            displayValue = 'lol';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            operand1= displayValue;
            operand2= null;
            operator1 = null;
            operator2 = null;
            result = null;
        }
    }
}
function inputDecimal(dot) {
    if(displayValue === operand1|| displayValue === operand2) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function inputPercent(num) {
    displayValue = (num/100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = '0';
    operand1= null;
    operand2= null;
    operator1 = null;
    operator2 = null;
    result = null;
}

function inputBackspace() {
    if(operand1!= null) {
        operand1= null;
        updateDisplay();
    }
}

function operate(x, y, op) {
    if(op === '+') {
         return add(x,y);
    } else if(op === '-') {
         return subtract(x,y);
    } else if(op === '*') {
         return multiply(x,y);
    } else {
         return divide(x,y);
        }
    
}
console.log(operate(1,1,'+'));

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}