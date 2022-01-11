function solution(N, stages) {
  const state = new Array(N + 2).fill(0);
  
  for(let i = 0; i < stages.length; i++) {
    state[stages[i]] += 1;
  }
  const reach = new Array(N + 1);

  reach[N] = {
    stage: N,
    r: state[N] + state[N + 1],
  };

  for(let i = N - 1; i >= 1; i--) {
    reach[i] = {
      stage: i,
      r: reach[i + 1].r + state[i],
    }
  }

  reach.sort((a, b) => {
    const failA = a.r === 0 ? 0 : state[a.stage] / a.r;
    const failB = b.r === 0 ? 0 : state[b.stage] / b.r;

    if (failA > failB) return -1;
    else if (failA < failB) return 1;
    else return a.stage - b.stage;
  });

  const answer = [];
  for(let i = 0; i < reach.length - 1; i++) {
    answer.push(reach[i].stage);
  }

  console.log(answer);
  return answer;
}

solution(4, [3, 3, 3, 3, 3]);