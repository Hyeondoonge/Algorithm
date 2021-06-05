// 핵심
// 지문 잘 읽기.
// 1. 갈 수 있는 경로가 여러 개 일때 사전순으로 첫 번째 해당하는 경로를 출력
//    해야하므로 사전에 오름차순으로 정렬된 인접리스트를 구성
// 2. 경로가 되기 위한 조건 -> 모든 티켓을 사용
//                     -> 모든 나라를 방문

const visitiedCountry = {};
const adjList = {};
const path = [];
const answer = [];

const isAllVisitied = () => {
  let result = true;
  for(const key in visitiedCountry) {
    if(!visitiedCountry[key]) {
      result = false;
      break;
    }
  }
  return result;
};

const dfs = (country, depth, targetDepth) => {
  if (isAllVisitied() && depth === targetDepth) {
    answer.push([...path]);
    return;
  }

  if (!adjList[country]) return;

  for(let i = 0; i < adjList[country].length; i++) {
    const next = adjList[country][i];
    if (next.visitied) continue;
    next.visitied = true;
    visitiedCountry[next.to] = true;
    path.push(next.to);

    dfs(next.to, depth + 1, targetDepth);

    next.visitied = false;
    path.pop();
    visitiedCountry[next.to] = false;
  }
} 

const solution = (tickets) => {
  for(let i = 0; i <tickets.length; i++) {
    const from = tickets[i][0];
    const to = tickets[i][1];

    if (from in adjList) adjList[from].push({ to, visitied: false });
    else {
      adjList[from] = [{ to, visitied: false }];
      visitiedCountry[from] = false;
      visitiedCountry[to] = false;
    }
  }

  for (const key in adjList) {
    adjList[key].sort((a, b) => {
      if (a.to < b.to) return -1;
      else return 1;
    });
  }

  visitiedCountry["ICN"] = true;
  path.push("ICN");

  for (let i = 0; i < adjList["ICN"].length; i++) {
    const next = adjList["ICN"][i];
    if (next.visitied) continue;
    next.visitied = true;
    visitiedCountry[next.to] = true;
    path.push(next.to);

    dfs(next.to, 1, tickets.length);
    
    path.pop();
    next.visitied = false;
    visitiedCountry[next.to] = false;
  }

  return answer[0];
}
