const canAcrossRoad = (road, L) => {
  const n = road.length;
  const isInstalled = new Array(n).fill(false);

  // 성공적으로 설치하면 true, 그렇지 않으면 false 반환
  const installedToRight = (index, height, L) => {
    for(let i = 1; i <= L; i++) {
      if (index + i >= n) return false; // 범위 벗어날 때
      if (road[index + i] !== height) return false;
      if (isInstalled[index + i]) return false;
      isInstalled[index + i] = true;
    }
    return true;
  }
  
  const installedToLeft = (index, height, L) => {
    for(let i = 1; i <= L; i++) {
      if (index - i < 0) return false;
      if (road[index - i] !== height) return false;
      if (isInstalled[index - i]) return false;
      isInstalled[index - i] = true;
    }
    return true;
  }

  let a = 0, b = a + 1;

  while (a < n - 1) {
      if (road[a] === road[b]) { // 2, 2, 2 ... 
        a += 1;
        b = a + 1;
        continue;
      }

      let installed = false;

      if (road[a] - 1 === road[b]) { // 2, 1, 1 ...
        installed = installedToRight(a, road[b], L)
        a += L;
        b = a + 1;
      }
      else if (road[a]=== road[b] - 1 ) { // 1, 1, 2
        installed = installedToLeft(b, road[a], L);
        a += 1;
        b = a + 1;
      }

      if (!installed) return false;
    }
  return true;
};

const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const [n, L] = input[0].split(' ').map((e) => parseInt(e));
const heights = [];

for(let i = 0; i < n; i++) {
  heights.push(input[i + 1].split(' ').map((e) => parseInt(e)))
}

let answer = 0;

for(let i = 0; i < n; i++) {
  const road = heights[i];
  if (canAcrossRoad(road, L)) answer += 1;
}


for(let j = 0; j < n; j++) {
  const road = [];
  for(let i = 0; i < n; i++) {
    road.push(heights[i][j]); 
  }
  if (canAcrossRoad(road, L)) answer += 1;
}

console.log(answer);