let stack = [];
let canvas = document.getElementById('stackCanvas');
let ctx = canvas.getContext('2d');
let stackTop = canvas.height - 20; // Initial top position for the first stack item

// Function to update the visual stack on the canvas
function drawStack() {
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
  document.getElementById('currentStack').innerText = JSON.stringify(stack);
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
  
  // Validate input: Only numbers, operators, or parentheses are allowed
  if (value && isValidInput(value)) {
    stack.push(value);
    drawStack(); // Update the visual representation
    document.getElementById('pushValue').value = ''; // Clear the input
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
    stack.pop();
    drawStack(); // Update the visual representation
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

  return {
    postfix: postfix.join(' '),
    steps
  };
}

// Evaluate a space?separated postfix expression, recording each step
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
    steps.push({
      description,
      result: stack[stack.length - 1],
      stack: [...stack]
    });
  });

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

  // 1) Infix ¡÷ Postfix conversion
  const { postfix, steps } = infixToPostfix(expr);

  // Build HTML for each conversion step
  const conversionHtml = steps
    .map((step, idx) => {
      const tok = step.token;
      // Determine which CSS class to use
      const cls = !isNaN(tok)
        ? 'operand'
        : ['+', '-', '*', '/'].includes(tok)
          ? 'operator'
          : 'parenthesis';
      const coloredToken = `<span class="${cls}">${tok}</span>`;

      return `Step ${idx + 1}: Read ${coloredToken}, `
        + `Stack = [${step.stack.join(', ')}], `
        + `Postfix = ${step.postfix.join(' ')}`;
    })
    .join('<br>');

  document.getElementById('steps').innerHTML = conversionHtml;
  document.getElementById('postfixExpression').innerText = postfix;

  // 2) Evaluate postfix
  const evalResult = evaluatePostfix(postfix);
  const evalHtml = evalResult.steps
    .map((s, idx) =>
      `Step ${idx + 1}: ${s.description}, `
      + `Stack = [${s.stack.join(', ')}], `
      + `Current Result = ${s.result}`
    )
    .join('<br>');

  document.getElementById('evaluationSteps').innerHTML = evalHtml;
  document.getElementById('resultValue').innerText =
    `Final result: ${evalResult.result}`;
}
