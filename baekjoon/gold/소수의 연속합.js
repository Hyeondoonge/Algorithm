const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const n = parseInt(input[0]);
const isPrime = new Array(n + 1).fill(1);
const primeNumbers = [];

// 지우기  
for(let i = 2 ; i <= n ; i++){
  // 이미 지워진 경우  
  if(isPrime[i] == 0) continue;
  
  // 지워지지 않은 경우 자기자신을 제외한 수부터 배수 지우기  
  for(let j = i + i ; j <= n ; j = j + i){
    if(isPrime[j] == 0) continue;
    else isPrime[j] = 0;	// 지우기 (0으로 저장) 
  } 
}

isPrime[0] = isPrime[1] = 0;

for (let i = 1; i <= n; i++) {
  if (isPrime[i]) primeNumbers.push(i);
}

let l = 0, r = 0;
let sum = primeNumbers[l];

let answer = 0;

while (l <= r && r < primeNumbers.length) {
  if (sum > n) {
    sum -= primeNumbers[l++];
  }
  else {
    if (sum === n) {
      answer += 1;
    }
    sum += primeNumbers[++r];
  }
}

console.log(answer);

