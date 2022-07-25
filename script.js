let currentNum = ""
let previousNum = "";
let operator = "";

const currentDisplayNumber = document.querySelector('.currentNumber');
const previousDisplayNumber = document.querySelector('.previousNumber');

window.addEventListener('keydown', handlekeyPress)

const numberButtons = document.querySelectorAll('.btn');

const operators = document.querySelectorAll('.operator');

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () =>{
  addDecimal();
})

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearScreen)

const del = document.querySelector('.delete');
del.addEventListener('click', delNumber)


const equals = document.querySelector('.equals')
equals.addEventListener('click', () =>{
  if(currentNum != "" && previousNum != ""){
    operate();
  }
});

numberButtons.forEach(input => { input.addEventListener ('click', (e) =>{
    handleNumber(e.target.textContent);
  })
});

function handleNumber(number){
  if (currentNum !== "" && previousNum !== "" && operator ===""){
    previousNum = "";
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum.length <= 10){
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
  }
}

operators.forEach(input => { input.addEventListener ('click', (e) =>{
  handleOperator(e.target.textContent);
})
});

function handleOperator(op){
  if (previousNum  === ""){
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === ""){
    operatorCheck(op);
  } else {
    operate();
    operator = op;
    currentDisplayNumber.textContent = "";
    previousDisplayNumber.textContent = previousNum +" " + operator;
  }
}

function operatorCheck(text){
  operator = text;
  previousDisplayNumber.textContent = previousNum +" " + operator;
  currentDisplayNumber.textContent = "";
  currentNum = "";
}

function add(a,b){
  return a + b;
}
function subtract(a,b){
  return a - b;
}
function multiply(a,b){
  return a * b;
}
function divide(a,b){
  return a / b;
}

function operate(){
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if (operator === "+"){
    previousNum = add(previousNum, currentNum);
  } else if (operator === "-"){
    previousNum = subtract(previousNum, currentNum);
  } else if (operator === "*"){
    previousNum = multiply(previousNum, currentNum);
  } else if (operator === "/"){
      if (currentNum<= 0){
      previousNum = "Error!"
      displayResults();
      return;
    }
    previousNum = divide(previousNum, currentNum)
  }

  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResults();
}

function roundNumber(num){
  return Math.round(num * 1000000) /1000000
}
function displayResults(){
  if (previousNum.length <= 11 ){
    currentDisplayNumber.textContent = previousNum;
  } else{
    currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
  }
  previousDisplayNumber.textContent = "";
  operator = "";
  currentNum = "";
}

function clearScreen(){
  currentNum = ""
  previousNum = "";
  operator = "";
  previousDisplayNumber.textContent = "";
  currentDisplayNumber.textContent = "";
}

function delNumber(){
  currentNum = currentNum.toString();
  currentNum = currentNum.slice(0, -1);
  currentDisplayNumber.textContent = currentNum;
}

function addDecimal(){
  if (!currentNum.includes(".")){
    currentNum+= "."
    currentDisplayNumber.textContent = currentNum;
  }
}

function handlekeyPress(e){
  e.preventDefault();
  if (e.key>=0 && e.key <=9){
    handleNumber(e.key);
  }
  if (e.key === "Enter" || e.key === "=" && currentNum != "" && previousNum != ""){
    operate();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*" ){
    handleOperator(e.key);
  }
  if (e.key === "."){
    addDecimal(e.key);
  }
  if (e.key === "Space bar"){
    clearScreen(e.key);
  }
  if (e.key === "Backspace"){
    delNumber(e.key);
  }
}