function solution(n, weak, dist) {
  const W = weak.length;
  const D = dist.length;

  dist.sort((a, b) => b - a);

  const visitied = Array.from({ length: W }, () => false);

  let answer = Infinity;

  dfs(0);

  return answer === Infinity ? -1 : answer;

  function allCheck() {
    return !visitied.some((e) => !e);
  }

  function dfs(d) {
    if (allCheck()) {
      answer = Math.min(answer, d);
      return;
    }

    if (d === D) {
      return;
    }

    let copy_visitied = [...visitied];

    for (let i = 0; i < W; i++) {
      if (visitied[i]) continue;
      visitied[i] = true;

      const s = weak[i];
      let e = (s + dist[d]) % n;

      // 시계
      for (let j = 0; j < W; j++) {
        if (s < e && s <= weak[j] && weak[j] <= e) {
          visitied[j] = true;
        }
        if (s > e && (s <= weak[j] || weak[j] <= e)) {
          visitied[j] = true;
        }
      }

      dfs(d + 1);
      visitied[i] = false;

      for (let j = 0; j < W; j++) {
        visitied[j] = copy_visitied[j];
      }
    }
  }
}
