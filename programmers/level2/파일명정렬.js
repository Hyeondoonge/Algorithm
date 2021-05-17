// 핵심
// 1. 문자열 파싱. (감을 믿지 말고 항상 정확하게 파싱됐는지 출력해서 확인하자.)
// 2. 기본 정렬이 문자열 정렬이므로 toLowerCase나 toUpperCase활용해서 정렬

const solution = (files) => {
  let parsed = [...files];

  parsed = files.map((file) => {
    let header = '', hIdx = 0;
    for(let i = 0; i < file.length; i++) {
      if ('0' <= file[i] && file[i] <= '9') { // 숫자
        header = file.slice(0, i);
        hIdx = i;
        break;
      }
    }

    let number = '', nIdx = 0;

    for(let i = hIdx; i < hIdx + 5; i++) {
      if ('0' <= file[i] && file[i] <= '9') { // 숫자
        nIdx = i;
      } else break;
    }
    console.log(nIdx);
    number = file.slice(hIdx, nIdx + 1);

    return {
      header,
      number: parseInt(number),
      tail: file.slice(nIdx + 1),
      file
    }
  });

  parsed.sort((a, b) => {
    if (a.header.toLowerCase() < b.header.toLowerCase()) return -1;
    if (b.header.toLowerCase() < a.header.toLowerCase()) return 1;
    else {
        if (a.number > b.number) return 1;
        if (a.number < b.number) return -1;
        else return 0;
    }
  })

  const answer = parsed.map(({ file }) => file);

  return answer;
}