// 핵심
// 그림으로 시뮬레이션해보고 규칙 찾기

const solution = (n, a, b) => {
  let ra = a;
  let rb = b;

  let round = 0;

  while (ra != rb) {
    ra = ra % 2 === 0 ? ra / 2 : (ra + 1) / 2;
    rb = rb % 2 === 0 ? rb / 2 : (rb + 1) / 2; 

    round++;
  }
  return round;
};