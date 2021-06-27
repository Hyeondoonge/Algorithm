const cal = (a, b) => {
    const newValues = [];

    for(let i = 0; i < a.length; i++) {
        for(let j= 0; j < b.length; j++) {
            newValues.push(a[i] + b[j]);
            newValues.push(a[i] - b[j]);
            newValues.push(a[i] * b[j]);
            newValues.push(Math.floor(a[i] / b[j]));
        }
    }
    return newValues;
};

const solution = (N, number) => {
    const set = Array.from(new Array(9), () => []);

    // dp를 활용해 
    // 횟수를 증가시키며 가능한 값을 만든다.

    // 횟수 8일 때 까지 모든 set을 만들었으면
    // 완전탐색하며 식을 계산하며 number와 같은 값 발견 시 stop

    for (let i = 1; i <= 8; i++) {
        let d = 1;
        let value = 0;

        for(let j = 1; j <= i; j++) {
            value += d * N;
            d *= 10;
        }
        set[i].push(value);

        for (let j = 1; j < i; j++) {
            set[i] = set[i].concat(cal(set[j], set[i - j]));
        }

        for(let j = 0; j < set[i].length; j++) {
            if (set[i][j] === number) {
                return i;
            }
        }
    }
    return -1;
};