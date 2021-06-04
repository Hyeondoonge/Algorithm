const sameTokenLength = (set, token) => {
  const start = set.indexOf(token);

  let index = start;
  while (set[index] === token) {
    index++;
  }
  return index - start;
};

const solution = (str1, str2) => {
  const setA = [];
  const setB = [];

  str1 = str1.toUpperCase();
  str2 = str2.toUpperCase();

  // 밑에서 소문자와의 비교를 하지 않기위해 미리 대문자로 통일한다
  for(let i = 0 ; i < str1.length - 1; i++) {
    if (('A' <= str1[i] && str1[i] <= 'Z') && ('A' <= str1[i + 1] && str1[i + 1] <= 'Z')) {
      const c = str1[i] + str1[i + 1];
      setA.push(c);
    }
  }

  for(let i = 0 ; i < str2.length - 1; i++) {
    if (('A' <= str2[i] && str2[i] <= 'Z') && ('A' <= str2[i + 1] && str2[i + 1] <= 'Z')) {
      const c = str2[i] + str2[i + 1];
      setB.push(c);
    }
  }

  if (setA.length == 0 && setB.length == 0) return 65536;

  setA.sort();
  setB.sort();

  let commonLength = 0;

  for(let i = 0; i < setA.length; i++) {
    const token = setA[i];
    const sameLengthA = sameTokenLength(setA, token);

    if (setB.includes(token)) {
      const sameLengthB = sameTokenLength(setB, token);
      commonLength += Math.min(sameLengthA, sameLengthB);

      i += (sameLengthA - 1);
      // i가 예상치 못하게 증가하는 경우를 고려한다
    }
  }

  let sumLength = setA.length + setB.length - commonLength;

  return Math.floor(commonLength / sumLength * 65536);
};

console.log(solution("FRANCE", "french"));