/* 
 * Developer: Molla Samser
 * Organization: RSK World
 * Website: https://rskworld.in
 * YouTube Channel: http://www.youtube.com/@rskworldin?sub_confirmation=1
 */

var StoreTotal = "";
var chain = "";
var memory = 0;
var shouldResetScreen = false;

document.getElementById("0").onclick = function() { appendNumber("0"); };
document.getElementById("1").onclick = function() { appendNumber("1"); };
document.getElementById("2").onclick = function() { appendNumber("2"); };
document.getElementById("3").onclick = function() { appendNumber("3"); };
document.getElementById("4").onclick = function() { appendNumber("4"); };
document.getElementById("5").onclick = function() { appendNumber("5"); };
document.getElementById("6").onclick = function() { appendNumber("6"); };
document.getElementById("7").onclick = function() { appendNumber("7"); };
document.getElementById("8").onclick = function() { appendNumber("8"); };
document.getElementById("9").onclick = function() { appendNumber("9"); };
document.getElementById("decimal").onclick = function() { appendNumber("."); };

document.getElementById("AC").onclick = function() { myFunctionAC(); };
document.getElementById("CE").onclick = function() { myFunctionCE(); };
document.getElementById("plus").onclick = function() { appendOperator("+"); };
document.getElementById("minus").onclick = function() { appendOperator("-"); };
document.getElementById("x").onclick = function() { appendOperator("*"); };
document.getElementById("divide").onclick = function() { appendOperator("/"); };
document.getElementById("equals").onclick = function() { myFunctionEquals(); };

document.getElementById("MRC").onclick = function() { myFunctionMRC(); };
document.getElementById("mMinus").onclick = function() { myFunctionMMinus(); };
document.getElementById("mPlus").onclick = function() { myFunctionMPlus(); };
document.getElementById("sqrt").onclick = function() { myFunctionSqrt(); };
document.getElementById("plusMinus").onclick = function() { myFunctionPlusMinus(); };
document.getElementById("%").onclick = function() { myFunctionPercent(); };

function updateDisplay() {
  document.getElementById("Output").innerHTML = StoreTotal || "0";
  document.getElementById("History").innerHTML = chain;
}

function appendNumber(numStr) {
  if (shouldResetScreen) {
    StoreTotal = "";
    shouldResetScreen = false;
  }
  
  if (numStr === "." && StoreTotal.includes(".")) return;
  if (StoreTotal === "0" && numStr !== ".") StoreTotal = "";
  
  StoreTotal += numStr;
  chain += numStr;
  updateDisplay();
}

function appendOperator(opStr) {
  if (chain === "" && StoreTotal === "") return;
  
  if (/[\+\-\*\/]$/.test(chain) && shouldResetScreen) {
    chain = chain.substring(0, chain.length - 1) + opStr;
  } else {
    chain += opStr;
  }
  
  shouldResetScreen = true;
  updateDisplay();
}

function myFunctionEquals() {
  if (chain === "") return;
  try {
    var evalChain = chain;
    if (/[\+\-\*\/]$/.test(evalChain)) {
      evalChain = evalChain.substring(0, evalChain.length - 1);
    }
    
    var result = eval(evalChain);
    var formattedResult = parseFloat(result.toPrecision(8)).toString();
    
    document.getElementById("History").innerHTML = chain + "=";
    document.getElementById("Output").innerHTML = formattedResult;
    
    StoreTotal = formattedResult;
    chain = formattedResult;
    shouldResetScreen = true;
  } catch(e) {
    document.getElementById("Output").innerHTML = "Error";
    StoreTotal = "";
    chain = "";
    shouldResetScreen = true;
  }
}

function myFunctionAC() {
  StoreTotal = "";
  chain = "";
  shouldResetScreen = false;
  updateDisplay();
}

function myFunctionCE() {
  if (StoreTotal !== "") {
    var index = chain.lastIndexOf(StoreTotal);
    if (index !== -1 && index === chain.length - StoreTotal.length) {
      chain = chain.substring(0, index);
    }
    StoreTotal = "";
  }
  updateDisplay();
}

function modifyCurrentNumber(callback) {
  if (StoreTotal !== "") {
    var num = parseFloat(StoreTotal);
    var newVal = callback(num);
    if (newVal === "Error" || isNaN(newVal)) {
      document.getElementById("Output").innerHTML = "Error";
      StoreTotal = "";
      chain = "";
      shouldResetScreen = true;
      return;
    }
    var newValStr = newVal.toString();
    
    var index = chain.lastIndexOf(StoreTotal);
    if (index !== -1 && index === chain.length - StoreTotal.length) {
      chain = chain.substring(0, index) + newValStr;
    } else {
      chain = newValStr;
    }
    
    StoreTotal = newValStr;
    updateDisplay();
  }
}

function myFunctionPercent() {
  modifyCurrentNumber(function(num) { return num / 100; });
}

function myFunctionSqrt() {
  modifyCurrentNumber(function(num) { return num >= 0 ? parseFloat(Math.sqrt(num).toPrecision(8)) : "Error"; });
}

function myFunctionPlusMinus() {
  modifyCurrentNumber(function(num) { return -num; });
}

function flashScreen() {
  var screen = document.getElementById("Output");
  var oldColor = screen.style.color || "";
  screen.style.color = "#fff";
  setTimeout(function() { screen.style.color = oldColor; }, 100);
}

function myFunctionMPlus() {
  var val = 0;
  if (StoreTotal !== "") val = parseFloat(StoreTotal);
  else if (chain !== "") {
    try { val = parseFloat(eval(chain)); } catch(e) {}
  }
  memory += val;
  shouldResetScreen = true;
  flashScreen();
}

function myFunctionMMinus() {
  var val = 0;
  if (StoreTotal !== "") val = parseFloat(StoreTotal);
  else if (chain !== "") {
    try { val = parseFloat(eval(chain)); } catch(e) {}
  }
  memory -= val;
  shouldResetScreen = true;
  flashScreen();
}

function myFunctionMRC() {
  var memStr = memory.toString();
  
  if (/[\+\-\*\/]$/.test(chain)) {
    chain += memStr;
  } else if (chain === "") {
    chain = memStr;
  } else {
    var index = chain.lastIndexOf(StoreTotal);
    if (index !== -1 && index === chain.length - StoreTotal.length) {
      chain = chain.substring(0, index) + memStr;
    } else {
      chain = memStr;
    }
  }
  
  StoreTotal = memStr;
  shouldResetScreen = true;
  updateDisplay();
}