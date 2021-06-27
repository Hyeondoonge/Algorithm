// 핵심
// 1. 5, 5를 출발점으로 하는 2차원 배열 생성
// 2. 방문되지 않은 새로운 길을 지날 때, 인접 좌표를 담는 배열에 양방향으로 좌표를 삽입 

const solution = (dirs) => {
  let answer = 0;

  const command = Array.from(dirs);
  const visitied = Array.from(new Array(11), () =>  Array.from(new Array(11), () => []));

  let r = 5, c = 5;
  
  for(let i = 0; i < command.length; i++) {
    let nr = r, nc = c;

    switch (command[i]) {
      case 'U' :
        nr -= 1;
        break;
      case 'D' :
        nr += 1;
        break;
      case 'L' :
        nc -= 1;
        break;
      case 'R' :
        nc += 1;
        break;
    }

    if (nr < 0 || nr > 10 || nc < 0 || nc > 10) continue;

    let back = false;

    for(let j = 0; j < visitied[r][c].length; j++) {
      if (visitied[r][c][j][0] === nr && visitied[r][c][j][1] === nc) { // 왔던 길
        back = true;
        break;
      }
    }

    if (!back) {
      visitied[r][c].push([nr, nc]);
      visitied[nr][nc].push([r, c]);
      answer += 1;
    }
    r = nr;
    c = nc;
  }
  return answer;
};