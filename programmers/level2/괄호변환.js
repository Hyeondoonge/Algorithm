// 핵심
// 1. 스택 활용해서 올바른 괄호 문자열인지 판단
// 2. 제시된 문제 그대로 구현

const isCorrect = (s) => {
  const stack = [];
  let top = -1;

  for(let i = 0; i < s.length; i++){
      if(s[i] == '(') {
          stack.push(s[i]);
          top++;
      }
      else {
          if(stack.length == 0) return false;
          stack.pop();
      }
  }
  if(stack.length > 0) return false;
  return true;
}

const change = (s) => {
  let newstr = '';

  for(let i = 0; i < s.length; i++){
    newstr += s[i] === '(' ? ')' : '(';
  }

  return newstr;
}

const recursive = (p) => {
  let l = 0, r = 0, idx = -1;

  if(p === '') return '';

  for(let i = 0; i < p.length; i++) {
      if(p[i] == '(') l++;
      if(p[i] == ')') r++;
      if(l == r) {
          idx = i;
          break;
      }
  }
  
  const u = p.slice(0, idx + 1);
  const v = p.slice(idx + 1);

  let org = '';

  if(isCorrect(u)) {
      org = u + recursive(v);
      return org;
  }
    let str = '(' + recursive(v) + ')';
    const nu = change(u.substring(1, u.length - 1));
    str = str.concat(nu);

    return str;
}

function solution(p) {
  const answer = recursive(p);
  return answer;
}