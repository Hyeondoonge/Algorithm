let arr;

const move = (c, num, index) => {
  num = num * 1;

  if (c === 'D') {
    for(let i = index + 1; i < arr.length; i++) {
      if (arr[i] === 'O') num--;
      if (num === 0) return i;
    }
  } else {
    for(let i = index - 1; i >= 0; i--) {
      if (arr[i] === 'O') num--;
      if (num === 0) return i;
    }
  }
};

function solution(n, k, cmd) {
  arr = new Array(n).fill('O');
  const stack = [];
  let index = k;

  for(let i = 0; i < cmd.length; i++) {
    const [c, num] = cmd[i].split(" ");

    if (c === 'D' || c === 'U') {
      index = move(c, num, index);
    } else if (c === 'C') {

      arr[index] = 'X';
      stack.push(index);

      let last = true;

      for(let i = index + 1; i < arr.length; i++) {
        if (arr[i] === 'O') {
          index = i;
          last = false;
          break;
        }
      }

      if (last) {
        for(let i = index - 1; i >= 0; i--) {
          if (arr[i] === 'O') {
            index = i;
            break;
          }
        }
      }

      // 뒤에 삭제된 개수로 따지도록 변경

      // 마지막인덱스인지 체크만으로 해결하지 못함.
    } else if(c === 'Z'){
      const idx = stack.pop();
      arr[idx] = 'O';
    }
  }
  console.log(arr.join(''));
};

solution(8, 2, ["D 2","C","U 3","C","D 4","C","U 2","Z","Z","U 1","C"]);