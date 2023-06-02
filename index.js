//main math operations
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

//addition operations
const plusMinus = (a=>(-1)*Number(a));
const percent = (b,a =1)=> (Number(a)*(Number(b)/100));

//global variables 
let otherNum;
let operationResult;
let operator;
let displayText = "";
let isDisplaySum = false;
let pressedSideKey = false;

//Constants
const allButtons = document.querySelectorAll("button");
const nonOperator = ["AC","+/-","%","=","."];
const display = document.querySelector(".display>div")




//Main 
const wrapper = document.querySelector(".container");

wrapper.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
const pressedKey = event.target.textContent
console.log(pressedKey);

if(display.textContent.includes(".") && pressedKey == "."){
    return;
}

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

 //Button actions
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

if(pressedKey == "=" && operator != undefined){
    displayText=operate(otherNum,displayText,operator);
    isDisplaySum=true;
    operator = undefined;
    popEffect(event.target,"topPop");
    showText(displayText);
    }

if(pressedKey == "=" && operator == undefined){
    popEffect(event.target,"topPop");
    popEffect(display,"timeOut"); 
}

if(!isNaN(pressedKey)|| pressedKey == "."){                     
    popEffect(event.target,"mainButtonPop");
    if(!isDisplaySum){                  
        displayText = displayText + pressedKey;
        showText(displayText);
     }else {                
        displayText = pressedKey;
        showText(displayText);
        isDisplaySum = false;
    }
} else {

if(isNaN(pressedKey) &&
   !nonOperator.includes(pressedKey)){           
   if(operator !== undefined){
        otherNum =  operate(otherNum,displayText,operator);
        displayText = "";
        isDisplaySum = true;
        operator = pressedKey;
        showText(otherNum);
   } else {                        
        otherNum = displayText;
        displayText= "";
        popEffect(display,"timeOut")
        operator = (pressedKey);
        isDisplaySum = false;
    }
    }
}
console.log(
"otherNum: " + otherNum + 
"\n operator: "+ operator + 
"\n displayText: "+ displayText+ 
"\n result: "+operationResult);
});

// Other functions
function popEffect (item,classAdd) { 
    item.classList.toggle(classAdd);
    setTimeout(function() {
        item.classList.toggle(classAdd);
        },
        80)};

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
    console.log(result);
    return(result);

}

function resetAC () {
    otherNum=undefined;
    operator=undefined;
    displayText=0;
    document.querySelector(".display>div").textContent = displayText ;
    isDisplaySum = false;
    console.log("Reset");
}

function showText (someText){
    if(someText == "." || someText == "Error"){display.textContent = someText.substring(0,7);
    } else {
        if(isNaN(display.textContent=(Math.round(someText*100000)/100000))){
            display.textContent = "Error"
        } else {
        display.textContent=`${(Math.round(someText*100000)/100000)}`.substring(0,7);
        }
    }
};

//show current time
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

  
// Error Function
 function returnError (error){
    display.textContent = "Error";

    let rows =  document.querySelectorAll('.row');
    rows.forEach(row => {
        row.classList.add("dim-effect")  
    });

    document.querySelector(".siri").innerHTML= "<img src='./images/siri.gif' alt=''>"
  
    siriText.push(error);
    let count = 0;


    let getText = setInterval(function(){
        count +=1;

        if(count === errorArray1.length-1){
            clearInterval(getText)
        }

        siriText.push(errorArray1[count]);
        
        document.querySelector(".siriText").textContent = siriText.join(" ");

        },500);

    let audio = new Audio('./audio/GLaDOS-558187.wav');
    
    audio.play();

    let resetCalc = setTimeout(function(){
        window.location.reload()},5000);
    
    resetCalc
    
 }


 
let errorMessage1 = " not possible. Please make a valid request"
let errorArray1 = errorMessage1.split(" ");
let siriText= [];

