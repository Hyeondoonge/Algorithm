// 핵심
// 동일한 인형 연속 2번의 경우 stack을 활용하여 처리

function solution(board, moves) {
  const line = new Array(board.length);
  const bascket = []; // stack

  for(let j = 0; j < board.length; j++) {
    line[j + 1] = [];
    for(let i = 0; i < board.length; i++) {
        if (board[i][j] === 0) continue;
        line[j + 1].push(board[i][j]);
    }
  }

  let answer = 0;

  for(let i = 0; i < moves.length; i++) {
    const lineNumber = moves[i];
    if (line[lineNumber].length === 0) continue;
    
    const d = line[lineNumber].shift();
    
    if (bascket.length >= 1 && bascket[bascket.length - 1] === d) {
      answer += 2;
      bascket.pop();
    } else bascket.push(d);
  }
  
  return answer;
};