const display = document.querySelector(".display_result");

const numButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");
const numAndOperatorButtons = document.querySelectorAll(".numbers, .operators");
const clearButton = document.querySelector("#AC");
const deleteButton = document.querySelector("#C");
const equalButton = document.querySelector("#equal");

let firstValue = "";
let secondValue = "";

let firstIndexValue = "";
let secondIndexValue = "";
let firstOperand = "";
let secondOperand = "";
let operator = "";
let tempArray = [];
let needToReset = false;

clearButton.addEventListener("click", () => {
  clearScreen();
});

deleteButton.addEventListener("click", () => {
  deleteLast();
});

equalButton.addEventListener("click", () => {
  calculate();
});

numAndOperatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (needToReset === true) {
      clearScreen();
      needToReset = false;
    }
    tempArray.push(e.target.id);
    console.log(tempArray);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {

  })
})

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (display.textContent === "0") {
      display.textContent = "";
    }
    display.innerHTML = tempArray.join("");
  });
});

function clearScreen() {
  display.textContent = "0";
  tempArray = [];
  inputarr = [];
}

function deleteLast() {
  if (display.textContent.length === 1) {
    display.textContent = "0";
  } else {
  display.textContent = display.textContent.slice(0, -1);
  }
  tempArray = tempArray.slice(0, -1);
}

function divide(a , b) {
  if (b === 0) {
    alert("You can't divide by zero!");
    return NaN;
  }
  display.textContent += "÷";
  return a / b;
}

function multiply(a , b) {
  display.textContent += "*";
  return a * b;
}

function subtract(a , b) {
  display.textContent += "-";
  return a - b;
}

function add(a , b) {
  display.textContent += "+";
  return a + b;
}

function validatePEMDAS(inputs){
  let modifiedInputs = inputs
  if(modifiedInputs.includes("÷")){
    modifiedInputs = runOpp(modifiedInputs,"÷",divide)
  } 
  if (modifiedInputs.includes("*")){
    modifiedInputs = runOpp(modifiedInputs,"*",multiply)
  } 
  if (modifiedInputs.includes("+")){
    modifiedInputs = runOpp(modifiedInputs,"+",add)
  } 
  if (modifiedInputs.includes("-")){
    modifiedInputs = runOpp(modifiedInputs,"-",subtract)
  }
  return modifiedInputs;
}
function runOpp(inputarr,oppSymbol,oppCallback){
  while(inputarr.includes(oppSymbol)){

    let firstOperand = "";
    let secondOperand = "";
    const indexOpp = inputarr.indexOf(oppSymbol);
    for (let i = 0; i < indexOpp; i++) {
      firstOperand += inputarr[i];
    }
    for (let j = indexOpp + 1; j < inputarr.length; j++) {
      secondOperand += inputarr[j];
    }
    const result = oppCallback(Number(firstOperand), Number(secondOperand));
    inputarr.splice(0, inputarr.length, result.toString()); // Convert result back to string
  }
  return inputarr
}

function calculate() {
  let firstOperand = "";
  let secondOperand = "";
  const result = validatePEMDAS(tempArray)
  display.innerHTML = Math.round(Number(result.join("")) * 100) / 100;
  needToReset = true;
}