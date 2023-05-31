const add = ((a,b)=> a+b);
const subtract = ((a,b)=> a-b);
const multiply = ((a,b)=>a*b);
const divide = ((a,b)=>a/b);


let num1 = 2;
let num2 = 3;
let operator = add;

const operate = function(num1,num2,operator){
    if(operator = "add")add(num1,num2);
    if(operator = "subtract")subtract(num1,num2);
    if(operator = "multiply")multuply(num1,num2);
    if(operator = "divide")divide(num1,num2);
}

alert(operate(num1,num2));