// 핵심
// 계산하기 편하게 연산자와 피연산자 각각 따로 저장해두기

// 깨달은 것
// 코테할 때 숏코딩하려 노력하지는 말자..ㅠ
// 오히려 나한텐 해가 될 수 있다.

let visitied;
let operatorOrder = [];

let max = -1;

const findIndex = (operands, index) => {
  const idx = -1;

  for(let i = index + 1; i < operands.length ; i++) {
    if (operands[i] !== null) return i;
  }
  return idx;
};

const usedOperator = (operators) => {
  const usedOp = [];
  if (operators.includes('+')) usedOp.push('+');
  if (operators.includes('-')) usedOp.push('-');
  if (operators.includes('*')) usedOp.push('*');
  return { usedOperator: usedOp };
};

const calc = (operands, operators, operator) => {
  const calcOperands = [...operands];

  for(let i = 0; i < operators.length; i++) {
    if (operators[i] !== operator) continue;
    const index = findIndex(calcOperands, i);
    if (operator === '+') {
      calcOperands[index] = calcOperands[i] + calcOperands[index];
    } else if (operator === '-') {
      calcOperands[index] = calcOperands[i] - calcOperands[index];
    } else {
      calcOperands[index] = calcOperands[i] * calcOperands[index];
    }
    calcOperands[i] = null;
  }
  return calcOperands;
};

const operatorsPerm = (operands, operators, usedOperator) => { // 순열
  const depth = usedOperator.length;

  if (operatorOrder.length === depth) {
    const result = Math.abs(operands[operands.length - 1]);
    max = result > max ? result : max;
    return;
  }

  for(let i = 0; i < depth; i++) {
    if (!visitied[i]) {
      visitied[i] = 1;
      operatorOrder.push(i);

      const calcOperands = calc(operands, operators, usedOperator[i]);

      operatorsPerm(calcOperands, operators, usedOperator);
      operatorOrder.pop();
      visitied[i] = 0;
    }
  }
};  

const solution = (expression) => {
  const operands = [];
  const operators = [];

  let number = '';

  for(let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === '-' || char === '+' || char === '*') {
      operands.push(Number(number));
      operators.push(char);
      number = '';
    } else number += char;
  }
  operands.push(Number(number));

  visitied = new Array(operators.length).fill(0);

  operatorsPerm(operands, operators, usedOperator(operators).usedOperator);

  return max;
};