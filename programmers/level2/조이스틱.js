function solution(name) {
  const N = name.length;

  const visitied = Array.from({ length: name.length }, () => [false, false]);
  let answer = Infinity;

  dfs(0, 0);

  for (let i = 0; i < N; i++) {
    const c = name[i].charCodeAt(0);
    answer += Math.min(Math.abs(c - 65), Math.abs(c - 90) + 1);
  }

  return answer;

  function dfs(i, d) {
    if (
      visitied.every((_, index) => {
        if (name[index] === 'A') return true;
        if (index === 0) return true;
        let prev = index - 1 === -1 ? N - 1 : index - 1;
        let next = index + 1 === N ? 0 : index + 1;
        if (visitied[prev][1] || visitied[next][0]) return true;
      })
    ) {
      answer = Math.min(answer, d);
    }

    let next = N === i + 1 ? 0 : i + 1;
    if (!visitied[i][1]) {
      visitied[i][1] = true;
      dfs(next, d + 1);
      visitied[i][1] = false;
    }

    next = -1 === i - 1 ? N - 1 : i - 1;
    if (!visitied[i][0]) {
      visitied[i][0] = true;
      dfs(next, d + 1);
      visitied[i][0] = false;
    }
  }
}
