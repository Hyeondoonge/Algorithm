// 분류: 구현
// 풀이시간: 1:00~2:42

// 문서의 위치
// 열쇠
// 상하좌우로 이동

// input
// T(1~100)
// h 높이 (2~100) w 너비 (2~100)
// building[i][j] (. - 빈칸, * - 벽, $ - 문서, 알파벳 대문자 - 문, 알파벳 소문자 - 열쇠)
// 열쇠로 대응하는 모든 문을 열 수 있다
// 상근이가 보유하고 있는 열쇠, 하나도 없다면 "0"

// 상근이는 가장자리 벽이 아닌 곳을 통해 빌딩을 드나들 수 있음
// 문을 열수 있는 각 열쇠는 0개 이상

// output
// 훔필 수 있는 최대 문서 개수

function solution(H, W, map, inputKeys) {
  const visitied = Array.from({ length: H }, () => Array.from({ length: W }, () => false));

  const di = [-1, 1, 0, 0];
  const dj = [0, 0, -1, 1];

  let keys = 0;

  for (let i = 0; i < inputKeys.length; i++) {
    keys = getKey(keys, inputKeys[i]);
  }

  const queue = [];

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (1 <= i && 1 <= j && i <= H - 2 && j <= W - 2) continue;
      if (map[i][j] === "*") continue;
      queue.push([i, j]);
    }
  }

  const door = Array.from({ length: 27 }, () => []);

  let letter = 0;
  let idx = 0;

  while (idx < queue.length) {
    const [i, j] = queue[idx++];

    if (visitied[i][j]) continue;
    if (isDoor(i, j) && !openDoor(keys, map[i][j])) {
      door[index(i, j)].push([i, j]);
      continue;
    }

    visitied[i][j] = true;
    if (isLetter(i, j)) {
      letter += 1;
    } else if (isKey(i, j)) {
      keys = getKey(keys, map[i][j]);

      for (let k = door[index(i, j)].length - 1; k >= 0; k--) {
        const [ni, nj] = door[index(i, j)].pop();
        queue.push([ni, nj]);
      }
    }

    for (let k = 0; k < 4; k++) {
      const ni = i + di[k];
      const nj = j + dj[k];
      // ni, nj 조건 검사
      if (ni < 0 || H <= ni || nj < 0 || W <= nj) continue;
      if (map[ni][nj] === "*") continue;

      queue.push([ni, nj]);
    }
  }

  return letter;

  function index(i, j) {
    const alpha = map[i][j];
    if (isDoor(i, j)) return alpha.charCodeAt(0) - 65;
    return alpha.charCodeAt(0) - 97;
  }

  function getKey(original, key) {
    const code = key.charCodeAt(0) - 97;
    const bikey = 1 << code;

    return original | bikey;
  }

  function openDoor(key, door) {
    const code = door.charCodeAt(0) - 65;
    const bidoor = 1 << code;

    if ((key & bidoor) === bidoor) {
      return true;
    }
    return false;
  }

  function isLetter(i, j) {
    return map[i][j] === "$";
  }

  function isDoor(i, j) {
    return "A" <= map[i][j] && map[i][j] <= "Z";
  }

  function isKey(i, j) {
    return "a" <= map[i][j] && map[i][j] <= "z";
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let idx = 0;
let T = Number(input[idx++]);
let answer = "";

while (T--) {
  const [H, W] = input[idx++].split(" ").map(Number);
  const map = input.slice(idx, idx + H);
  idx += H;
  const inputKeys = input[idx++];
  answer += `${solution(H, W, map, inputKeys === 0 ? [] : inputKeys)}\n`;
}

console.log(answer);
