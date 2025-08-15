let buffer = "0";
let runningTotal = 0;
let previousOperator = null;

const screen = document.querySelector(".screen");
function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  reRender();
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperator(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}

function flushOperator(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  }
  console.log(runningTotal);
}

function handleSymbol(symbol) {
  if (symbol === "C") {
    console.log(symbol);
    buffer = "0";
  } else if (symbol === "←") {
    if (buffer.length === 1) {
      buffer = "0";
    } else {
      buffer = buffer.substring(0, buffer.length - 1);
    }
  } else if (symbol === "=") {
    if (previousOperator === null) {
      return;
    }

    flushOperator(parseInt(buffer));
    previousOperator = null;
    buffer = "" + runningTotal;
    runningTotal = 0;
  } else if (
    symbol === "+" ||
    symbol === "-" ||
    symbol === "×" ||
    symbol === "÷"
  ) {
    handleMath(symbol);
  }
}

function reRender() {
  screen.innerText = buffer;
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
