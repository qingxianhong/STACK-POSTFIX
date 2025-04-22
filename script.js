let stack = [];
let canvas = document.getElementById('stackCanvas');
let ctx = canvas.getContext('2d');
let stackTop = canvas.height - 20; // Initial top position for the first stack item

function drawStack(animatedIndex = -1, animationType = '') {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  stack.forEach((value, index) => {
    let color = getColor(value);
    let x = 150;
    let y = stackTop - (index * 30);

    // If animation type is "push" and it's the latest element
    if (animationType === 'push' && index === animatedIndex) {
      animatePush(x, y, value, color);
    } 
    // If animation type is "pop" and it's the one being removed
    else if (animationType === 'pop' && index === animatedIndex) {
      animatePop(x, y, value, color);
    } 
    else {
      drawStackElement(x, y, value, color);
    }
  });

  // Update the current stack display
  document.getElementById('currentStack').innerText = JSON.stringify(stack);
}

// helper to draw static elements
function drawStackElement(x, y, value, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 100, 25);
  ctx.fillStyle = "#fff";
  ctx.fillText(value, x + 10, y + 17);
}

function animatePush(x, y, value, color) {
  let startX = 0;
  let currentX = startX;
  let endX = x;

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw existing stack (excluding last pushed element)
    stack.forEach((v, i) => {
      if (i < stack.length - 1) {
        drawStackElement(150, stackTop - (i * 30), v, getColor(v));
      }
    });

    // Animate the new element from left to position
    ctx.fillStyle = color;
    ctx.fillRect(currentX, y, 100, 25);
    ctx.fillStyle = "#fff";
    ctx.fillText(value, currentX + 10, y + 17);

    document.getElementById('currentStack').innerText = JSON.stringify(stack);

    currentX += 10;
    if (currentX < endX) {
      requestAnimationFrame(step);
    } else {
      drawStack(); // Final draw
    }
  }

  step();
}

function animatePop(x, y, value, color, onComplete) {
  let currentX = x;
  let endX = 300;

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all stack elements
    stack.forEach((v, i) => {
      drawStackElement(150, stackTop - (i * 30), v, getColor(v));
    });

    // Animate the popped element
    ctx.fillStyle = color;
    ctx.fillRect(currentX, y, 100, 25);
    ctx.fillStyle = "#fff";
    ctx.fillText(value, currentX + 10, y + 17);

    document.getElementById('currentStack').innerText = JSON.stringify(stack);

    currentX += 10;
    if (currentX < endX) {
      requestAnimationFrame(step);
    } else {
      onComplete(); // Call the callback to actually pop
    }
  }

  step();
}

// Helper function to determine color for stack elements
function getColor(value) {
  if (!isNaN(value)) {
    return "red"; // Operand (number)
  } else if (['+', '-', '*', '/'].includes(value)) {
    return "blue"; // Operator
  } else if (['(', ')'].includes(value)) {
    return "green"; // Parenthesis
  }
  return "black"; // Default
}

// Function to push value onto the stack
function pushToStack() {
  let value = document.getElementById('pushValue').value.trim();
  
  if (value && isValidInput(value)) {
    stack.push(value);
    drawStack(stack.length - 1, 'push');
    document.getElementById('pushValue').value = '';
  } else {
    alert("Invalid input. Please enter a number, operator (+, -, *, /), or parentheses.");
  }
}

// Function to check if the input is valid
function isValidInput(value) {
  return !isNaN(value) || ['+', '-', '*', '/', '(', ')'].includes(value);
}

// Function to pop value from the stack
function popFromStack() {
  if (stack.length > 0) {
    const poppedIndex = stack.length - 1;
    const poppedValue = stack[poppedIndex];
    const y = stackTop - (poppedIndex * 30);
    const color = getColor(poppedValue);

    // Run animation first, then pop from stack
    animatePop(150, y, poppedValue, color, () => {
      stack.pop();
      drawStack(); // Redraw after animation
    });
  } else {
    alert("Stack is empty!");
  }
}

// Determine operator precedence
function precedence(op) {
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;
  return 0;
}

// Split the expression into tokens so multi?digit numbers stay intact
function tokenize(expr) {
  const tokens = [];
  let numberBuffer = '';

  for (const ch of expr.replace(/\s+/g, '')) {
    if (/\d/.test(ch)) {
      numberBuffer += ch;
    } else {
      if (numberBuffer) {
        tokens.push(numberBuffer);
        numberBuffer = '';
      }
      tokens.push(ch);
    }
  }
  if (numberBuffer) tokens.push(numberBuffer);
  return tokens;
}

// Convert infix tokens to postfix, recording each step
function infixToPostfix(infix) {
  const stack = [];
  const postfix = [];
  const steps = [];

  const tokens = tokenize(infix);

  tokens.forEach((token, i) => {
    if (!isNaN(token)) {
      // Operand
      postfix.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        postfix.push(stack.pop());
      }
      stack.pop(); // remove '('
    } else {
      // Operator
      while (
        stack.length &&
        precedence(stack[stack.length - 1]) >= precedence(token)
      ) {
        postfix.push(stack.pop());
      }
      stack.push(token);
    }

    // Record current token, stack snapshot, and postfix snapshot
    steps.push({
      token,
      stack: [...stack],
      postfix: [...postfix]
    });
  });

  // Pop any remaining operators
  while (stack.length) {
    postfix.push(stack.pop());
  }

  //Save the steps and initialize the first step
  N_evaluationStepsData = steps;
  N_currentStepIndex = 0;
  N_updateEvaluationStep(N_currentStepIndex);
  
  return {
    postfix: postfix.join(' '),
    steps
  };
}

// Evaluate a space-separated postfix expression, recording each step
function evaluatePostfix(postfixStr) {
  const stack = [];
  const steps = [];
  const tokens = postfixStr.split(' ');

  tokens.forEach((token) => {
    let description;
    if (!isNaN(token)) {
      stack.push(Number(token));
      description = `<span class="push">Pushed ${token}</span>`;
    } else {
      const b = stack.pop();
      const a = stack.pop();
      let result;
      switch (token) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = a / b; break;
      }
      stack.push(result);
      description = `
        <span class="pop">Popped ${a}</span> and 
        <span class="pop">Popped ${b}</span>, 
        <span class="operator">${token}</span> applied, 
        <span class="push">Pushed ${result}</span>
      `;
    }
    // Store the stack state and description for each step
    steps.push({
      description,
      result: stack[stack.length - 1],
      stack: [...stack]
    });
  });

  // Save the steps and initialize the first step
  evaluationStepsData = steps;
  currentStepIndex = 0;
  updateEvaluationStep(currentStepIndex);
  
  return { result: stack.pop(), steps };
}

function isValidInfix(expression) {
  // Regular expression to check for invalid characters
  const validChars = /^[0-9+\-*/()\s]+$/;
  if (!validChars.test(expression)) {
    alert('Invalid characters detected! Only numbers, operators (+, -, *, /), and parentheses are allowed.');
    return false;
  }

  // Check for balanced parentheses
  let balance = 0;
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === '(') balance++;
    if (expression[i] === ')') balance--;
    if (balance < 0) {  // More closing parentheses than opening
      alert('Mismatched parentheses detected!');
      return false;
    }
  }

  if (balance !== 0) {
    alert('Mismatched parentheses detected!');
    return false;
  }

  // Check for invalid operator placement (e.g., "+ *", "3 + + 5")
  const operatorPattern = /([+\-*/]{2,})|([+\-*/]$)|(^[+\-*/])/;
  if (operatorPattern.test(expression)) {
    alert('Invalid operator usage! Please ensure operators are placed correctly.');
    return false;
  }

  // Check for empty expression or only whitespace
  if (expression.trim() === "") {
    alert('Empty expression detected! Please enter a valid expression.');
    return false;
  }

  return true;
}

// Main entry point when user clicks ¡§Convert and Visualize¡¨
function processExpression() {
  const expr = document.getElementById('expression').value.trim();
  if (!expr) {
    alert('Please enter a mathematical expression');
    return;
  }

  // Validate the infix expression
  if (!isValidInfix(expr)) {
    return;  // Stop if the expression is invalid
  }

  // 1) Infix to Postfix conversion
  const { postfix, steps } = infixToPostfix(expr);

  N_updateEvaluationStep(0); // Initialize the first step
  document.getElementById('postfixExpression').innerText = postfix;

  // 2) Evaluate postfix
  const evalResult = evaluatePostfix(postfix);
  // Show only the first step in the evaluation process
  updateEvaluationStep(0);

  document.getElementById('resultValue').innerText =
    `Final result: ${evalResult.result}`;
}

// Function to update the visual stack on the canvas during conversion
function N_drawEvaluationStack(stack) {
  let canvas = document.getElementById('N_evaluationStackCanvas');
  let ctx = canvas.getContext('2d');
  let stackTop = canvas.height - 20; // Initial top position for the first stack item
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  stack.forEach((value, index) => {
    // Set color based on value type
    let color = getColor(value);

    ctx.fillStyle = color; // Set the color for the stack element
    ctx.fillRect(150, stackTop - (index * 30), 100, 25); // Draw rectangle (stack item)
    ctx.fillStyle = "#fff"; // Color the text white for readability
    ctx.fillText(value, 160, stackTop - (index * 30) + 17); // Draw the value inside the rectangle
    ctx.fillStyle = color; // Reset color for the next item
  });

  // Update the current stack display
  document.getElementById('N_currentEvaluationStack').innerText = JSON.stringify(stack);
}

// Function to update the visual stack on the canvas during evaluation
function drawEvaluationStack(stack) {
  let canvas = document.getElementById('evaluationStackCanvas');
  let ctx = canvas.getContext('2d');
  let stackTop = canvas.height - 20; // Initial top position for the first stack item
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  stack.forEach((value, index) => {
    // Set color based on value type
    let color = getColor(value);

    ctx.fillStyle = color; // Set the color for the stack element
    ctx.fillRect(150, stackTop - (index * 30), 100, 25); // Draw rectangle (stack item)
    ctx.fillStyle = "#fff"; // Color the text white for readability
    ctx.fillText(value, 160, stackTop - (index * 30) + 17); // Draw the value inside the rectangle
    ctx.fillStyle = color; // Reset color for the next item
  });

  // Update the current stack display
  document.getElementById('currentEvaluationStack').innerText = JSON.stringify(stack);
}

let N_evaluationStepsData = []; // Store all evaluation steps
let N_currentStepIndex = 0; // Track the current step

// Function to update the evaluation steps and stack for N_evaluation
function N_updateEvaluationStep(stepIndex) {
  if (stepIndex < 0 || stepIndex >= N_evaluationStepsData.length) return;

  const step = N_evaluationStepsData[stepIndex];
  const prevStep = N_evaluationStepsData[stepIndex - 1];
  const currentStack = step.stack;
  const prevStack = prevStep ? prevStep.stack : [];

  const tok = step.token;
  const cls = !isNaN(tok)
    ? 'operand'
    : ['+', '-', '*', '/'].includes(tok)
      ? 'operator'
      : 'parenthesis';
  const coloredToken = `<span class="${cls}">${tok}</span>`;

  document.getElementById('steps').innerHTML = `
    Step ${stepIndex + 1}: Read ${coloredToken},
    Stack = [${step.stack.join(', ')}],
    Postfix = ${step.postfix.join(' ')}
  `;

  document.getElementById('N_prevStepBtn').disabled = stepIndex === 0;
  document.getElementById('N_nextStepBtn').disabled = stepIndex === N_evaluationStepsData.length - 1;

  //Animate if it's a push or pop
  if (prevStep) {
    if (currentStack.length > prevStack.length) {
      // PUSH detected
      const newItem = currentStack[currentStack.length - 1];
      N_animateEvalPush(newItem);
    } else if (currentStack.length < prevStack.length) {
      // POP detected
      const poppedValue = prevStack[prevStack.length - 1];
      N_animateEvalPop(poppedValue);
    } else {
      N_drawEvaluationStack(currentStack);
    }
  }
  else {
    N_drawEvaluationStack(currentStack); // First step
  }
  document.getElementById('N_currentEvaluationStack').innerText = JSON.stringify(currentStack);
}

let evaluationStepsData = []; // Store all evaluation steps
let currentStepIndex = 0; // Track the current step

// Function to update the evaluation steps and stack
function updateEvaluationStep(stepIndex) {
  if (stepIndex < 0 || stepIndex >= evaluationStepsData.length) return;

  const step = evaluationStepsData[stepIndex];
  const prevStep = evaluationStepsData[stepIndex - 1];
  const currentStack = step.stack;
  const prevStack = prevStep ? prevStep.stack : [];

  document.getElementById('evaluationSteps').innerHTML = `
    Step ${stepIndex + 1}: ${step.description}, 
    Stack = [${step.stack.join(', ')}], 
    Current Result = ${step.result}
  `;

  document.getElementById('prevStepBtn').disabled = stepIndex === 0;
  document.getElementById('nextStepBtn').disabled = stepIndex === evaluationStepsData.length - 1;

  // Animate if it's a push or pop
  if (prevStep) {
    if (currentStack.length > prevStack.length) {
      // PUSH detected
      const newItem = currentStack[currentStack.length - 1];
      animateEvalPush(newItem);
    } else if (currentStack.length < prevStack.length) {
      // POP detected
      const poppedValue = prevStack[prevStack.length - 1];
      animateEvalPop(poppedValue);
    } else {
      drawEvaluationStack(currentStack);
    }
  } else {
    drawEvaluationStack(currentStack); // First step
  }

  document.getElementById('currentEvaluationStack').innerText = JSON.stringify(currentStack);
}


function N_showNextStep() {
  if (N_currentStepIndex < N_evaluationStepsData.length - 1) {
    N_currentStepIndex++;
    N_updateEvaluationStep(N_currentStepIndex);
  }
}

// Function to move to the next step
function showNextStep() {
  if (currentStepIndex < evaluationStepsData.length - 1) {
    currentStepIndex++;
    updateEvaluationStep(currentStepIndex);
  }
}

function N_showPreviousStep() {
  if (N_currentStepIndex > 0) {
    N_currentStepIndex--;
    N_updateEvaluationStep(N_currentStepIndex);
  }
}

// Function to move to the previous step
function showPreviousStep() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    updateEvaluationStep(currentStepIndex);
  }
}

function N_animateEvalPush(value, onComplete) {
  let canvas = document.getElementById('N_evaluationStackCanvas');
  let ctx = canvas.getContext('2d');
  let stackTop = canvas.height - 20;

  let x = 0;
  let y = stackTop - (N_evaluationStepsData[N_currentStepIndex].stack.length - 1) * 30;
  let targetX = 150;

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    N_drawEvaluationStack(N_evaluationStepsData[N_currentStepIndex].stack.slice(0, -1)); // Previous stack

    ctx.fillStyle = getColor(value);
    ctx.fillRect(x, y, 100, 25);
    ctx.fillStyle = "#fff";
    ctx.fillText(value, x + 10, y + 17);

    x += 10;
    if (x < targetX) {
      requestAnimationFrame(step);
    } else {
      N_drawEvaluationStack(N_evaluationStepsData[N_currentStepIndex].stack);
      onComplete && onComplete();
    }
  }

  step();
}

function animateEvalPush(value, onComplete) {
  let canvas = document.getElementById('evaluationStackCanvas');
  let ctx = canvas.getContext('2d');
  let stackTop = canvas.height - 20;

  let x = 0;
  let y = stackTop - (evaluationStepsData[currentStepIndex].stack.length - 1) * 30;
  let targetX = 150;

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEvaluationStack(evaluationStepsData[currentStepIndex].stack.slice(0, -1)); // Previous stack

    ctx.fillStyle = getColor(value);
    ctx.fillRect(x, y, 100, 25);
    ctx.fillStyle = "#fff";
    ctx.fillText(value, x + 10, y + 17);

    x += 10;
    if (x < targetX) {
      requestAnimationFrame(step);
    } else {
      drawEvaluationStack(evaluationStepsData[currentStepIndex].stack);
      onComplete && onComplete();
    }
  }

  step();
}

function N_animateEvalPop(poppedValue, onComplete) {
  let canvas = document.getElementById('N_evaluationStackCanvas');
  let ctx = canvas.getContext('2d');
  let stackTop = canvas.height - 20;
  let x = 150;
  let y = stackTop - N_evaluationStepsData[N_currentStepIndex - 1].stack.length * 30;
  let endX = 300;

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    N_drawEvaluationStack(N_evaluationStepsData[N_currentStepIndex - 1].stack);

    ctx.fillStyle = getColor(poppedValue);
    ctx.fillRect(x, y, 100, 25);
    ctx.fillStyle = "#fff";
    ctx.fillText(poppedValue, x + 10, y + 17);

    x += 10;
    if (x < endX) {
      requestAnimationFrame(step);
    } else {
      N_drawEvaluationStack(N_evaluationStepsData[N_currentStepIndex].stack);
      onComplete && onComplete();
    }
  }

  step();
}

function animateEvalPop(poppedValue, onComplete) {
  let canvas = document.getElementById('evaluationStackCanvas');
  let ctx = canvas.getContext('2d');
  let stackTop = canvas.height - 20;
  let x = 150;
  let y = stackTop - evaluationStepsData[currentStepIndex - 1].stack.length * 30;
  let endX = 300;

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEvaluationStack(evaluationStepsData[currentStepIndex - 1].stack);

    ctx.fillStyle = getColor(poppedValue);
    ctx.fillRect(x, y, 100, 25);
    ctx.fillStyle = "#fff";
    ctx.fillText(poppedValue, x + 10, y + 17);

    x += 10;
    if (x < endX) {
      requestAnimationFrame(step);
    } else {
      drawEvaluationStack(evaluationStepsData[currentStepIndex].stack);
      onComplete && onComplete();
    }
  }

  step();
}
