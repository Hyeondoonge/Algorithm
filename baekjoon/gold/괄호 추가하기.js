// 수식 계산의 최대값을 출력하는 것이 목표이다.
// 출력값의 범위가 나와있으므로 결과의 초기값은 범위의 최소값이 되게한다. 

const solution = (n, exp) => {
  const operator = [];
  const operand = [];

  for(let i = 0; i < n; i++) {
    if (i % 2) operator.push(exp[i]);
    else operand.push(parseInt(exp[i]));
  }

  let answer = Number.NEGATIVE_INFINITY;
  const bracket_index = new Array(operator.length).fill(false);

  const comb = (d, before_bracket) => {
    if (d === operator.length) {
      let new_operand = [...operand];

      for(let i = 0; i < operator.length; i++) {
        if (bracket_index[i] === false) continue;
        if (operator[i] === '+') {
          new_operand[i + 1] = new_operand[i] + new_operand[i + 1];
        } else if (operator[i] === '-') {
          new_operand[i + 1] = new_operand[i] - new_operand[i + 1]
        } else {
          new_operand[i + 1] = new_operand[i] * new_operand[i + 1]
        }
        new_operand[i] = null;
      }

      new_operand = new_operand.filter((o) => o !== null); // o가 수라면 거른다. 정수 0도 포함될 수 있다.
      const new_operator = operator.filter((o, index) => bracket_index[index] === false);

      let result = new_operand[0];

      for(let i = 0; i < new_operator.length; i++) {
        if (new_operator[i] === '+') {
          result += new_operand[i + 1];
        } else if (new_operator[i] === '-') {
          result -= new_operand[i + 1];
        } else {
          result *= new_operand[i + 1];
        }
      }

      answer = answer > result ? answer : result;

      return;
    }
    
    comb(d + 1, 0);

    if (!before_bracket) {
      bracket_index[d] = true;
      comb(d + 1, 1);
      bracket_index[d] = false;
    }
  };

  comb(0, 0);

  
  console.log(answer === -0 ? 0 : answer);
};

const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');

solution(parseInt(input[0]), input[1]);

