function solution(plans) {
  const N = plans.length;
  const answer = [];

  for (let i = 0; i < N; i++) {
    const [HH, MM] = plans[i][1].split(':').map(Number);
    plans[i][1] = HH * 60 + MM;
    plans[i][2] = Number(plans[i][2]);
  }

  plans.sort((a, b) => a[1] - b[1]);

  const stack = [];
  let idx = 0;
  let cur_time = -1;

  while (idx < N) {
    if (!stack.length) {
      cur_time = plans[idx][1];
      stack.push(plans[idx++]);
      continue;
    }

    const top = stack[stack.length - 1];

    if (cur_time + top[2] < plans[idx][1]) {
      stack.pop();
      answer.push(top[0]);
      cur_time = cur_time + top[2];
    } else if (cur_time + top[2] === plans[idx][1]) {
      stack.pop();
      answer.push(top[0]);
      cur_time = plans[idx][1];
      stack.push(plans[idx++]);
    } else {
      stack[stack.length - 1][2] -= plans[idx][1] - cur_time;
      cur_time = plans[idx][1];
      stack.push(plans[idx++]);
    }
  }

  while (stack.length) {
    const [name] = stack.pop();
    answer.push(name);
  }

  return answer;
}
