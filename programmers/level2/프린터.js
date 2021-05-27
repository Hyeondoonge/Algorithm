// 핵심
// 본인 보다 높은 우선순위 알아낼 때, 출력된 요소들 제외한 요소들을 대상으로 찾아내야 함.

function solution(priorities, location) {
  let stack = new Array(priorities.length).fill(0);
  stack = stack.map((e, index) => index);

  const print = [];

  while(stack.length !== 0) {
    const element = stack.shift();
    const topPriority = priorities[element];
  
    const cantPrint = stack.some((index) => { // 있는 거 제외
      if (element === index) return false;
      return topPriority < priorities[index];  
    });

    if (cantPrint) stack.push(element);
    else print.push(element);
  }

  return print.indexOf(location) + 1;
}