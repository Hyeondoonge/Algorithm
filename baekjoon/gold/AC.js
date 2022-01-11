const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const tc = parseInt(input[0]);

for(let i = 0 ; i < tc; i++) {
  const command = Array.from(input[i * 3 + 1]);
  const m = input[i * 3 + 2];
  const arr = input[i * 3 + 3].substring(1, input[i * 3 + 3].length - 1).split(',');

  if (arr[0] === '') arr.shift();

  let reverse = false;
  let l = 0, r = arr.length - 1;

  let valid = true;
  
  for(let i = 0; i < command.length; i++) {
    if (command[i] === 'R') reverse = !reverse;
    else {
      if (r < l) {
        valid = false;
        break;
      }
      if (reverse) r--;
      else l++;
    }
  }

  if (!valid) console.log('error');
  else if (r < l) {
    console.log('[]');
  }
  else {
    let answer = '[';

    if (reverse) {
      for(let i = r; i > l; i--) {
        answer += arr[i] + ',';
      }
      answer += arr[l];
    } else {
      for(let i = l; i < r; i++) {
        answer += arr[i] + ',';
      }
      answer += arr[r];
    }
    answer += ']';
    console.log(answer);
  }
}