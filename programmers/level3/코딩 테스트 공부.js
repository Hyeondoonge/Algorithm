function solution(alg, cop, problems) {
  problems.push([0, 0, 0, 1, 1]);
  problems.push([0, 0, 1, 0, 1]);
  const max_alp = Math.max(alg, ...problems.map((e) => e[0]));
  const max_cop = Math.max(cop, ...problems.map((e) => e[1]));

  const N = 155;
  const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => Infinity));

  dp[alg][cop] = 0;

  for (let i = alg; i <= max_alp; i++) {
    for (let j = cop; j <= max_cop; j++) {
      for (let k = 0; k < problems.length; k++) {
        const [alp_req, cop_req, alp_rwd, cop_rwd, cost] = problems[k];

        if (alp_req <= i && cop_req <= j) {
          const new_alp = Math.min(max_alp, i + alp_rwd);
          const new_cop = Math.min(max_cop, j + cop_rwd);

          dp[new_alp][new_cop] = Math.min(dp[new_alp][new_cop], dp[i][j] + cost);
        }
      }
      dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
      dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);
    }
  }

  return dp[max_alp][max_cop];
}
