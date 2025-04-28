let currentLang = 'en';

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  document.getElementById('langToggleBtn').innerText = currentLang === 'en' ? '中文' : 'English';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[currentLang][key];
    if (translation) el.innerHTML = translation;
  });
}

const translations = {
  en: {
    "a": "Infix to Postfix Conversion & Evaluation",
    "b": "Infix to Postfix Conversion and Evaluation",
    "c": "Why Convert Infix to Postfix?",
    "d": "Humans write expressions in \"infix\" form (e.g. 3 + 4 * 5), but computers evaluate them more easily in \"postfix\" form (3 4 5 * +). By converting first and then using a simple stack algorithm, we get:",
    "e": "<strong>No ambiguity</strong>: Postfix removes the need for parentheses or precedence rules.",
    "f": "<strong>One-pass evaluation</strong>: Read left-to-right, push numbers, pop & apply operators.",
    "g": "<strong>Simplicity</strong>: Only a stack is needed -- perfect for compilers.",
    "h": "This tool shows each step -- what token is read, how the stack and output evolve, and how the final result is computed.",
    "i": "What is a Stack?",
    "j": "A stack is a data structure that follows the <strong>Last In, First Out (LIFO)</strong> principle. Think of it like a stack of plates: you can only add (<strong>PUSH</strong>) or remove (<strong>POP</strong>) the plate at the top of the stack.",
    "k": "In this tool, you will interact with a stack: pushing values onto it and popping values off. Follow the on-screen steps to see how a stack works and how it's used in postfix evaluation.",
    "l": "Item to Push:",
    "m": "Current Stack:",
    "n": "Algorithm Rules",
    "o": "Infix => Postfix Conversion",
    "p": "When reading an <span class=\"operand\"><strong>operand</strong></span> (number), add it directly to the postfix expression.",
    "q": "When reading an <span class=\"operator\"><strong>operator</strong></span>, pop from the stack all operators with greater or equal precedence, then push the current operator.",
    "r": "When encountering a <span class=\"parenthesis\"><strong>(</strong></span>, push it onto the stack.",
    "s": "When encountering a <span class=\"parenthesis\"><strong>)</strong></span>, pop from the stack until a matching '(' is found.",
    "t": "At the end of the expression, <strong>pop all remaining operators</strong> from the stack to the postfix expression.",
    "u": "Operator Precedence",
    "v": "<span class=\"operator\">*</span> and <span class=\"operator\">/</span> have precedence <strong>2</strong> (higher).",
    "w": "<span class=\"operator\">+</span> and <span class=\"operator\">-</span> have precedence <strong>1</strong> (lower).",
    "x": "When an operator is read, pop all stack operators with precedence greater than or equal to it before pushing it.",
    "y": "Postfix Evaluation",
    "z": "When reading an <span class=\"operand\"><strong>operand</strong></span>, push it onto the stack.",
    "aa": "When reading an <span class=\"operator\"><strong>operator</strong></span>, pop two operands from the stack, apply the operation, and push the result back onto the stack.",
    "ab": "Enter a mathematical expression:",
    "ac": "Convert and Visualize",
    "ad": "Conversion Process (Infix => Postfix)",
    "ae": "Stack Illustration",
    "af": "Previous Step",
    "ag": "Next Step",
    "ah": "Postfix Expression",
    "ai": "Postfix Evaluation Process",
    "aj": "Stack Illustration",
    "ak": "Previous Step",
    "al": "Next Step",
    "am": "Evaluation Value",
    "an": "Another approach: Expression Tree",
    "ao": "An expression tree is a binary tree used to represent expressions. Each internal node represents an operator, and each leaf node represents an operand. This structure naturally reflects the hierarchy of operations.",
    "ap": "Expression trees allow us to evaluate expressions using tree traversals:",
    "aq": "<strong>In-order traversal</strong>: Reconstructs the original infix expression.",
    "ar": "<strong>Post-order traversal</strong>: Used to evaluate the expression directly, similar to postfix evaluation.",
    "as": "<strong>Pre-order traversal</strong>: Can be used to produce prefix notation.",
    "at": "This approach offers an intuitive, recursive method for parsing and evaluating expressions, especially useful in compilers and interpreters.",
    "au": "Try Expression Tree Demo",
  },  
  zh: {
    "a": "中序轉換後序及數學計算",
    "b": "中序轉換後序及數學計算",
    "c": "為什麼要將中序轉換為後序？",
    "d": "人類用\"中序\"的方式寫算式（例如3 + 4 * 5），但電腦更容易用\"後序\"的方式來計算（3 4 5 * +）。由中序轉後序，然後使用堆疊(Stack)資料結構計算，優點如下：",
    "e": "<strong>運算順序明確、不模糊</strong>：後序不需要括號或優先順序規則。",
    "f": "<strong>一次讀取、直接計算</strong>：從左到右讀取，數字PUSH進入堆疊(Stack)，運算子則將堆疊中的數字POP出來並計算。",
    "g": "<strong>簡單</strong>：只需要一個堆疊(Stack)就可以了，這對編譯器來說是完美的。",
    "h": "這個工具顯示中序轉後序與運算的詳細步驟：讀取的token、堆疊的變化，還有最後的計算結果。",
    "i": "什麼是堆疊？",
    "j": "堆疊是一種資料結構，遵循<strong>後進先出(LIFO)</strong>的原則。想像一下，一疊盤子：你只能添加(<strong>PUSH</strong>)或移除(<strong>POP</strong>)最上面的盤子。",
    "k": "下面這個工具，圖解堆疊(Stack)資料結構，與推入(PUSH)、彈出(POP)的操作原理：將數值推入堆疊，然後從堆疊中彈出數值。請按照螢幕上的步驟來了解堆疊的運作方式，以及它在後序計算中的應用。",
    "l": "要推入(PUSH)的項目：",
    "m": "目前的堆疊(Stack)：",
    "n": "演算法規則",
    "o": "中序 => 後序轉換",
    "p": "每當讀取一個<span class=\"operand\"><strong>運算元</strong></span>（數字），直接將它加入後序表達式中。",
    "q": "每當讀取一個<span class=\"operator\"><strong>運算子</strong></span>，將堆疊中所有優先順序(Priority)大於或等於它的運算子彈出，然後將當前運算子推入堆疊中。",
    "r": "每當讀取一個<span class=\"parenthesis\"><strong>(</strong></span>，將它推入堆疊中。",
    "s": "每當讀取一個<span class=\"parenthesis\"><strong>)</strong></span>，將堆疊中所有運算子彈出，直到找到對應的'('為止。",
    "t": "在表達式結束時，將堆疊中所有剩餘的運算子彈出到後序表達式中。",
    "u": "運算子優先順序",
    "v": "<span class=\"operator\">*</span>和<span class=\"operator\">/</span>的優先順序是<strong>2</strong>（較高）。",
    "w": "<span class=\"operator\">+</span>和<span class=\"operator\">-</span>的優先順序是<strong>1</strong>（較低）。",
    "x": "當讀取一個運算子時，將堆疊中所有優先順序大於或等於它的運算子彈出，然後再將它推入堆疊中。",
    "y": "後序計算",
    "z": "每當讀取一個<span class=\"operand\"><strong>運算元</strong></span>，將它推入堆疊中。",
    "aa": "每當讀取一個<span class=\"operator\"><strong>運算子</strong></span>，將堆疊中兩個運算元彈出(POP)，計算結果後再將它推入(PUSH)堆疊中。",
    "ab": "請輸入數學算式(expression)：",
    "ac": "中序轉後序 視覺化",
    "ad": "轉換過程 (中序 => 後序)",
    "ae": "堆疊(Stack)示意圖",
    "af": "上一步",
    "ag": "下一步",
    "ah": "後序(Postfix)表達式",
    "ai": "後序計算過程",
    "aj": "堆疊(Stack)示意圖",
    "ak": "上一步",
    "al": "下一步",
    "am": "計算結果",
    "an": "另一種方法：算式樹(expression tree)",
    "ao": "算式樹是一種二元樹(binary tree)，用來表示算式。每個內部節點代表一個運算子，而每個葉子節點代表一個運算元(數字)。這種結構自然地反映了運算的層次結構。",
    "ap": "算式樹允許我們使用樹的遍歷來計算表達式：",
    "aq": "<strong>中序(IN-order)遍歷</strong>：重建原本人類使用的數學算式(中序)。",
    "ar": "<strong>後序(POST-order)遍歷</strong>：直接計算數學式，類似於後序計算。",
    "as": "<strong>前序(PRE-order)遍歷</strong>：可以產生前序表示法。(暫不介紹)",
    "at": "這種方法提供了一種直觀的、遞迴(recursion)的方式來解析和計算數學式，特別適用於編譯器。",
    "au": "算式樹 動畫",
  },
};



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
  ctx.font = "16px Arial";
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

  // Record final state
  steps.push({
    token: 'End',
    stack: [],
    postfix: [...postfix]
  });

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
    ctx.font = "16px Arial"; // Set font for the text
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
    ctx.font = "16px Arial";
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

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
    this.eval = null;
  }
}

const steps_TREE = [];

function addStep(fn, delay = 500) {
  steps_TREE.push({ fn, delay });
}

async function runSteps() {
  for (const step of steps_TREE) {
    step.fn();
    await new Promise(resolve => setTimeout(resolve, step.delay));
  }
}

function toPostfix(tokens) {
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const output = [];
  const ops = [];

  tokens.forEach(token => {
    if (!isNaN(token)) {
      output.push(token);
    } else if (token === '(') {
      ops.push(token);
    } else if (token === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') {
        output.push(ops.pop());
      }
      ops.pop(); // Remove '('
    } else {
      while (ops.length && precedence[ops[ops.length - 1]] >= precedence[token]) {
        output.push(ops.pop());
      }
      ops.push(token);
    }
  });

  while (ops.length) {
    output.push(ops.pop());
  }
  return output;
}

function buildTree(postfix) {
  const stack = [];
  postfix.forEach(token => {
    if (!isNaN(token)) {
      stack.push(new TreeNode(token));
    } else {
      const right = stack.pop();
      const left = stack.pop();
      const node = new TreeNode(token);
      node.left = left;
      node.right = right;
      stack.push(node);
    }
  });
  return stack.pop();
}

function assignPositions(node, depth = 0, pos = { x: 0 }) {
  if (!node) return;
  assignPositions(node.left, depth + 1, pos);
  node.x = pos.x * 80 + 50;
  node.y = depth * 100 + 50;
  pos.x += 1;
  assignPositions(node.right, depth + 1, pos);
}

function drawTreeSteps(ctx, node, updateScrollPosition) {
  if (!node) return;

  drawTreeSteps(ctx, node.left, updateScrollPosition);

  // Draw left child node
  if (node.left) {
    addStep(() => {
      ctx.beginPath();
      ctx.arc(node.left.x, node.left.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = getColor(node.left.value);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(node.left.value, node.left.x, node.left.y + 5);

      // Update the scroll position after drawing
      updateScrollPosition(node.left);
    }, 400);
  }

  // Draw current node (parent)
  addStep(() => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = getColor(node.value);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(node.value, node.x, node.y + 5);

    // Update the scroll position after drawing
    updateScrollPosition(node);
  }, 400);

  // Draw right child node
  if (node.right) {
    addStep(() => {
      ctx.beginPath();
      ctx.arc(node.right.x, node.right.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = getColor(node.right.value);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(node.right.value, node.right.x, node.right.y + 5);

      // Update the scroll position after drawing
      updateScrollPosition(node.right);
    }, 400);
  }

  // After all nodes are drawn ¡X draw edges
  addStep(() => {
    ctx.strokeStyle = "#000";

    const r = 20; // node radius
    if (node.left) {
      const dx = node.left.x - node.x;
      const dy = node.left.y - node.y;
      const dist = Math.hypot(dx, dy);
      const offsetX = (dx / dist) * r;
      const offsetY = (dy / dist) * r;
      ctx.beginPath();
      ctx.moveTo(node.x + offsetX, node.y + offsetY);
      ctx.lineTo(node.left.x - offsetX, node.left.y - offsetY);
      ctx.stroke();
    }
    if (node.right) {
      const dx = node.right.x - node.x;
      const dy = node.right.y - node.y;
      const dist = Math.hypot(dx, dy);
      const offsetX = (dx / dist) * r;
      const offsetY = (dy / dist) * r;
      ctx.beginPath();
      ctx.moveTo(node.x + offsetX, node.y + offsetY);
      ctx.lineTo(node.right.x - offsetX, node.right.y - offsetY);
      ctx.stroke();
    }
  }, 400);

  drawTreeSteps(ctx, node.right, updateScrollPosition);
} 

function evaluateTreeSteps(node, updateScrollPosition) {
  if (!node.left && !node.right) {
    addStep(() => {
      node.eval = parseFloat(node.value);
      updateScrollPosition(node);  // Update scroll position after leaf evaluation
    }, 500);

    // Highlight leaf node
    addStep(() => {
      const ctx = document.getElementById("treeCanvas").getContext("2d");
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
      ctx.strokeStyle = "orange";
      ctx.lineWidth = 3;
      ctx.stroke();
      updateScrollPosition(node);  // Update scroll position after drawing the node
    }, 300);

    // Optional: redraw node to remove highlight
    addStep(() => {
      const ctx = document.getElementById("treeCanvas").getContext("2d");
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = getColor(node.value);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(node.value, node.x, node.y + 5);
      updateScrollPosition(node);  // Update scroll position after redraw
    }, 300);

    return;
  }

  // Recursive steps for left and right children
  evaluateTreeSteps(node.left, updateScrollPosition);
  evaluateTreeSteps(node.right, updateScrollPosition);

  // Highlight current node
  addStep(() => {
    const ctx = document.getElementById("treeCanvas").getContext("2d");
    ctx.beginPath();
    ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 3;
    ctx.stroke();
    updateScrollPosition(node);  // Update scroll position after highlighting
  }, 300);

  // Evaluate node
  addStep(() => {
    const left = node.left.eval;
    const right = node.right.eval;
    switch (node.value) {
      case '+': node.eval = left + right; break;
      case '-': node.eval = left - right; break;
      case '*': node.eval = left * right; break;
      case '/': node.eval = left / right; break;
    }
    updateScrollPosition(node);  // Update scroll position after evaluation
  }, 500);

  // Show evaluation result next to the node (without fade-in effect)
  addStep(() => {
    const ctx = document.getElementById("treeCanvas").getContext("2d");
    ctx.fillStyle = "red";  // Set text color
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    const resultText = `= ${node.eval}`;

    // Background for the result to make it stand out
    const textWidth = ctx.measureText(resultText).width;
    const textHeight = 20; // height of the text box
    const padding = 5; // space around the text

    // Draw a background rectangle for the result
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"; // semi-transparent black
    ctx.fillRect(node.x + 35 - textWidth / 2 - padding, node.y + 30 - textHeight / 2 - padding, textWidth + padding * 2, textHeight + padding * 2);

    // Draw the result text
    ctx.fillStyle = "red";
    ctx.fillText(resultText, node.x + 35, node.y + 30);  // Draw text slightly below the node
    updateScrollPosition(node);  // Update scroll position after displaying result
  }, 500);

  // Optional: redraw the node to clean up highlight
  addStep(() => {
    const ctx = document.getElementById("treeCanvas").getContext("2d");
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = getColor(node.value);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(node.value, node.x, node.y + 5);
    updateScrollPosition(node);  // Update scroll position after redraw
  }, 300);
}    

let treeCanvasMutex = 1;
async function showExpressionTreeDemo() {
  if (!treeCanvasMutex) {
    return; // Prevent multiple clicks
  }
  treeCanvasMutex = 0; // Lock the canvas
  steps_TREE.length = 0;

  const input = document.getElementById("expression").value;
  if (!input) {
    return;
  }
  const tokens = tokenize(input);
  const postfix = toPostfix(tokens);
  const root = buildTree(postfix);
  assignPositions(root);

  const canvas = document.getElementById("treeCanvas");
  const container = document.querySelector(".T_canvas-container");
  const ctx = canvas.getContext("2d");

  // Get tree bounds and resize canvas
  const bounds = getTreeBounds(root);
  canvas.width = bounds.width;
  canvas.height = bounds.height;

  // Clear canvas and prepare for drawing
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Function to update the scroll position of the container
  function updateScrollPosition(node) {
    const container = document.querySelector(".T_canvas-container");

    // Adjust scroll position to center the node on screen if it's near the edge
    const buffer = 100; // Padding before scrolling
    if (node.x > container.scrollLeft + container.clientWidth - buffer) {
      container.scrollLeft = node.x - container.clientWidth + buffer;
    }
    if (node.y > container.scrollTop + container.clientHeight - buffer) {
      container.scrollTop = node.y - container.clientHeight + buffer;
    }
    if (node.x < container.scrollLeft + buffer) {
      container.scrollLeft = node.x - buffer;
    }
    if (node.y < container.scrollTop + buffer) {
      container.scrollTop = node.y - buffer;
    }
  }

  drawTreeSteps(ctx, root, updateScrollPosition);
  evaluateTreeSteps(root, updateScrollPosition);
  await runSteps();
  treeCanvasMutex = 1; // Unlock the canvas
}

function getTreeBounds(node) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

  function traverse(n) {
    if (!n) return;
    if (n.x < minX) minX = n.x;
    if (n.x > maxX) maxX = n.x;
    if (n.y < minY) minY = n.y;
    if (n.y > maxY) maxY = n.y;
    traverse(n.left);
    traverse(n.right);
  }

  traverse(node);
  return { width: maxX + 50, height: maxY + 50 }; // Padding for safety
}
