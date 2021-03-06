// 핵심
// 1. 90, 180, 270도 회전은 90도 회전 하나로 가능하다.
// 2. key의 이동범위를 정확하게 계산한다. (어림하지 말 것)

const rotate90 = (key) => {
    const rotatedKey = [];

    const m = key.length;

    for(let j = 0; j < m; j++) {
        const r = [];
        for(let i = m - 1; i >= 0; i--) {
            r.push(key[i][j]);
        }
        rotatedKey.push(r);
    }
    return rotatedKey;
};

const compare = (key, board, home, {r, c}) => {
    let find = 0;
    const m = key.length;

    for(let i = 0; i < m; i++){
        for(let j = 0; j < m; j++){
            if(board[i + r][j + c] === -1) continue;
            if(key[i][j] === 0) continue;
            if(board[i + r][j + c] === 0) find++;
            else return false;
        }
    }
    if(find === home) return true;
    else return false;
}

const search = (key, lock) => {
    // lock위에 key를 놓는다.
    // 완전 탐색을 하며 적절한 위치를 찾는다.

    // key가 lock을 벗어나도 상관은 없지만, 돌기인 부분과 맞다으면 안됨.
    // 위 조건을 만족하면서 홈 - 돌기 맞춰지면 ok
    const board = Array.from(new Array(100), () => new Array(100).fill(-1));
    const n = lock.length;
    const m = key.length;

    let home = 0;
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            board[i + 25][j + 25] = lock[i][j];
            if (lock[i][j] == 0) home++;
        }
    }
    
    if(home === 0) return true;
    // 25, 25부터 lock 복사
    
    for(let i = 0; i < 100 - m; i++){
        for(let j = 0; j < 100 - m; j++) {
            let r = i;
            let c = j;

            const res = compare(key, board, home, {r, c});
            if (res) return true;
        }
    }
    return false;
}

const solution = (key, lock) => {
    let answer = false;

    answer = search(key, lock);
    if(answer) return true;

    let rotatedKey = rotate90(key);
    answer = search(rotatedKey, lock);
    if(answer) return true;

    rotatedKey = rotate90(rotatedKey);
    answer = search(rotatedKey, lock);
    if(answer) return true;

    rotatedKey = rotate90(rotatedKey);
    answer = search(rotatedKey, lock);

    return answer;
};