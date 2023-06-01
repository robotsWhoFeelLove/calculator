const add = ((a,b)=> Number(a)+Number(b));
const subtract = ((a,b)=> Number(a)-Number(b));
const multiply = ((a,b)=>Number(a)*Number(b));
const divide = (a, b) => {
    if (b == 0) {
        returnError("divide by zero");
    } else {
        return(a/b);
    }
}


const plusMinus = (a=>(-1)*Number(a));
const percent = (b,a =1)=> (Number(a)*(Number(b)/100));
let otherNum;
let operationResult;
let operator;
let displayText = "";
let runningTotal = 0;
let isDisplaySum = false;

let pressedSideKey = false;
const allButtons = document.querySelectorAll("button");
const nonOperator = ["AC","+/-","%","=","."];
const display = document.querySelector(".display>div")
const roundResult = function (result){
    return(Math.round(result*100)/100)
}
function getTime() {
    let date = new Date();
    let hour = date.getHours();
        hour = (hour > 12 ? hour - 12 : hour)

    let min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

    document.querySelector(".time").textContent = hour + ":" + min;    
}
const calClock = setInterval(getTime,1000);
calClock;

const wrapper = document.querySelector(".container");

wrapper.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
const pressedKey = event.target.textContent
console.log(pressedKey);
//Decorative effects
if(event.target.classList.contains("top")){
    popEffect(event.target,"topPop");
}
if(!event.target.classList.contains("top") && pressedSideKey || 
    pressedKey == "AC" && pressedSideKey){
    document.querySelector(".sideEffect").classList.toggle("sideEffect");
    pressedSideKey = false;
}
if(event.target.classList.contains("side") && pressedKey != "="){
    event.target.classList.toggle("sideEffect");
    pressedSideKey = true;
 }

if (pressedKey == "AC"){resetAC()}
if (pressedKey == "+/-" &&
    displayText!= "") {
        displayText = plusMinus(displayText);
        showText(displayText);
    }
if (pressedKey == "%") {
    displayText = percent(displayText,otherNum);
    showText(displayText);
    }    
if(pressedKey == "="){
    displayText=operate(otherNum,displayText,operator);
    isDisplaySum=true;
    operator = undefined;
    popEffect(event.target,"topPop");
    showText(displayText);
    }
if(!isNaN(pressedKey)|| pressedKey == "."){                      console.log("!isNAN");
    popEffect(event.target,"mainButtonPop");
    if(!isDisplaySum){                  console.log("!isDisplaySum");
        // if(display.textContent == 0){displayText = pressedKey.replace(".","0.");}
        // else {
            displayText = displayText + pressedKey; //}
        showText(displayText);
     }else {                console.log("else of !isDisplaySum");
        displayText = pressedKey;
        showText(displayText);
        isDisplaySum = false;
    }
} else {
if(isNaN(pressedKey) &&
   !nonOperator.includes(pressedKey)){             console.log("isNaN Not nonOperator");
   if(operator !== undefined){console.log(operator);
        otherNum =  operate(otherNum,displayText,operator);
        displayText = "";
        isDisplaySum = true;
        operator = pressedKey;
        showText(otherNum);
   } else {                         console.log("else of operator !== undefined");
    otherNum = displayText;
    displayText= "";
    popEffect(display,"timeOut")
    operator = (pressedKey);
    isDisplaySum = false;
    }
    }

}
    

console.log("otherNum: " + otherNum +  "\n operator: "+ operator + "\n runningTotal: "+runningTotal + "\n displayText: "+displayText+ "\n result: "+operationResult);
});

function newFunction() {
    document.querySelector(".time");
}

function popEffect (item,classAdd) { 
    item.classList.toggle(classAdd);
    setTimeout(function() {
    item.classList.toggle(classAdd);
    },80)};




function operate(num1,num2,operator){
    let result;
    if(operator == "+") result = add(num1,num2);
    if(operator == "-") result = subtract(num1,num2);
    if(operator == "x") result = multiply(num1,num2);
    if(operator == "÷") result = divide(num1,num2);

    otherNum = undefined;
    operationResult = result;
    operator = undefined;
    console.log(operator);
    console.log(result);             //undefined;
    return(result);

}

function resetAC () {
    otherNum=undefined;
    operator=undefined;
    displayText=0;
    document.querySelector(".display>div").textContent = displayText ;
    isDisplaySum = true;
    console.log("Reset");
}

function showText (someText){
    if(someText == "." || someText == "Error"){display.textContent = someText;
    } else {
        if(isNaN(display.textContent=(Math.round(someText*100)/100))){
            display.textContent = "Error"
        } else {
        display.textContent=(Math.round(someText*1000)/1000);
        }
    }
};
   
 function returnError (error){
    display.textContent = "Error";
    let rows = document.getElementsByClassName('row');

while(rows[0]) {
    rows[0].parentNode.removeChild(rows[0]);
}

    document.querySelector(".siri").innerHTML= "<img src='./images/siri.gif' alt=''>"
  
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("siriMessage");
    siriText.push(error);
   let count = 0;

   let audio = new Audio('./audio/GLaDOS-558187.wav');
    let getText = setInterval(function(){
        count +=1;

        if(count === errorArray1.length-1){
            clearInterval(getText)
        }
    siriText.push(errorArray1[count]);
    document.querySelector(".siriText").textContent = siriText.join(" ");
    // if (count === errorArray1.length-1){
    //     errorArray2 = errorMessage2.split(" ");
    // }
    },500);
    audio.play();

    let resetCalc = setTimeout(function(){
        window.location.reload()},5000);
    resetCalc()
    
 }


 
let errorMessage1 = " not possible. Please make a valid request"
let errorMessage2 = " not possible. Please see this article for more details: https://en.wikipedia.org/wiki/Division_by_zero"
let errorArray1 = errorMessage1.split(" ");
let siriText= [];
function go (){siriText.push(errorArray1[0])};
