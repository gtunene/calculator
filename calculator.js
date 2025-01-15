let displayValue = "0"; // Current value on the display
let firstOperand = null; // First operand
let operator = null; // Operator
let secondOperand = false; // Whether the second operand is being entered

// Update the display with the current value
function updateDisplay() {
  const display = document.getElementById("display");
  if (!display) {
    console.error("Display element not found");
    return;
  }
  display.textContent = displayValue;
}

// Initialize display on load
updateDisplay();

// Handle button presses (numbers and operators)
function press(value) {
  if (!isNaN(value) || value === ".") {
    // Handle numbers and decimal points
    if (secondOperand) {
      displayValue = value; // Start a new value
      secondOperand = false;
    } else {
      displayValue = displayValue === "0" ? value : displayValue + value; // Append
    }
  } else {
    // Handle operators
    handleOperator(value);
  }
  updateDisplay();
}

// Handle operator logic
function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && secondOperand) {
    operator = nextOperator; // Replace operator
    return;
  }

  if (firstOperand == null) {
    firstOperand = value;
  } else if (operator) {
    const result = calculateResult(firstOperand, value, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = result;
  }

  secondOperand = true; // Mark ready for next input
  operator = nextOperator;
}

// Perform calculations
function calculateResult(first, second, operator) {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      return second !== 0 ? first / second : "Error"; // Prevent division by zero
    default:
      return second;
  }
}

// Handle "=" button
function calculate() {
  if (operator && !secondOperand) {
    const value = parseFloat(displayValue);
    const result = calculateResult(firstOperand, value, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = null;
    operator = null;
    secondOperand = false;
  }
  updateDisplay();
}

// Handle currency conversion
function convert(type) {
  const value = parseFloat(displayValue);
  if (isNaN(value)) {
    console.error("Invalid number for conversion");
    return;
  }

  if (type === "toeur") {
    displayValue = (value * 0.85).toFixed(2); // Example: USD to EUR conversion
  } else if (type === "tousd") {
    displayValue = (value * 1.18).toFixed(2); // Example: EUR to USD conversion
  }

  updateDisplay();
}

// Add IVA (Value-Added Tax)
function addIva() {
  const value = parseFloat(displayValue);
  if (isNaN(value)) {
    console.error("Invalid number for IVA calculation");
    return;
  }

  const iva = value * 0.21; // Example: 21% VAT
  displayValue = (value + iva).toFixed(2);

  updateDisplay();
}

function resetDisplay() {
    displayValue = "0"; // Reset display value
    firstOperand = null; // Clear first operand
    operator = null; // Clear operator
    secondOperand = false; // Reset input state
    updateDisplay(); // Update the display
  }
  