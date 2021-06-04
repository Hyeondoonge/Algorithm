const solution = (s) => {

  const stack = [];
  let top = -1;

  for(let c of s) {
    if (stack[top] === c) {
      stack.pop();
      top--;
    } else {
      stack.push(c);
      top++;
    }
  }

  if (stack.length === 0) return 1;
  else return 0;
};