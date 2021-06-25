// 핵심
// 1. 행의 위치에 따라 다음 행과의 차이값이 결정되므로 이를 얻기 위한 getFloor 함수
// 2. 꼭지점 재 방문 시 다음 loop 수행하고 같은 과정을 반복할 수 있도록 함
// 3. 범위를 벗어난 인덱스 방문 or 이미 방문된 인덱스 방문에 대한 처리를 해줘야함. (범위체크 후 방문 됐는지 체크!)

// ⭐️ 코드를 일관성있게 짜면 덜 실수한다는 것 명심하자...!

const getFloor = (n) => { // 인덱스에 대한 층 수
  n += 1;

  let floor = 1;
  let cnt = 1;
  let b = 2;

  while (true) {
    if (n <= cnt) break;
    floor++;
    cnt += b++;
  }

  return floor;
};

const solution = (n) => {
  const visitied = new Array(n * (n + 1) / 2).fill(false);
  const arr =  new Array(n * (n + 1) / 2).fill(0);
  
  let num = 1;
  let loop = 0;

  while (visitied.some((v) => !v)) {

    let index = -1;

    for(let i = 0; i < visitied.length; i++) {
      if (!visitied[i]) {
        index = i;
        break;
      }
    }

    // 방문과 동시에 값 삽입
    visitied[index] = 1;
    arr[index] = num++;

    let curFloor = getFloor(index);

    while (curFloor !== n - loop) {
      index += curFloor;
      
      if (visitied[index]) break;

      visitied[index] = 1;
      arr[index] = num++;
      curFloor = getFloor(index); 
    }
    
    index += 1;

    while (arr[index] !== undefined && visitied[index] === false) {
      visitied[index] = 1;
      arr[index] = num++;
      index += 1;
    }

    index -= 1;

    curFloor = getFloor(index);
    index -= curFloor;

    while (arr[index] !== undefined && visitied[index] === false) {
      visitied[index] = 1;
      arr[index] = num++;

      curFloor = getFloor(index);
      index -= curFloor;
    }
    loop += 1;
  }
  return arr;
};