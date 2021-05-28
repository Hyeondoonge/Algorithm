// 핵심
// 1. 완탐으로 2 x 2만큼의 동일한 문자 존재여부 확인
// 이때, 겹치는 문자열 대비해서 문자 지우는 건 탐색이 끝난 후 수행.
// 2. 3중포문으로 board상에서 y축 옮길 위치 탐색

const moveToBottom = (board) => {
  for(let j = 0; j < board[0].length; j++) {
    for(let i = board.length - 1; i >= 0; i --) {
        if (board[i][j] == ' ') continue;

        let to = -1;

        for(let k = i + 1; k < board.length; k++) {
          if (board[k][j] === ' ') {
            to = k;
          } else break;
        }

        if (to !== -1) {
        board[to][j] = board[i][j];
        board[i][j] = ' ';
      }
    }
  }
  return board;
};

const pop = (board, willErase) => {
  let cnt = 0;

  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[0].length; j++) {
      if (willErase[i][j]) {
        board[i][j] = ' ';
        cnt++;
      }
    }
  }
  return {board, cnt};
}

const solution = (m, n, board) => {
  let answer = 0;

  let willErase = Array.from(Array(m), () => Array(n).fill(false));

  for (let i = 0 ; i < board.length; i++) {
    board[i] = Array.from(board[i]);
  }

  while(true) {
    let exit = true;

    for(let i = 0; i < m - 1; i++) {
      for(let j = 0; j < n - 1; j++) {
        if (board[i][j] === ' ') continue;
  
        if ((board[i][j] === board[i][j + 1])
        && (board[i][j] === board[i + 1][j])
        && (board[i][j] === board[i + 1][j + 1])) {
          willErase[i][j] = willErase[i][j + 1] = willErase[i + 1][j] = willErase[i + 1][j + 1] = true;
          exit = false;
        }
      }
    }
    if (exit) break;
  
    const { board: poppedBoard, cnt } = pop(board, willErase);

    board = moveToBottom(poppedBoard);
  
    willErase = willErase.map(() => Array(n).fill(false));

    answer += cnt;
  }
  return answer;
};