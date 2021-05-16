const solution = (s) => {
  const answer = [];

  const setStr = s.substring(1, s.length - 1);

  const set = [];

  let subSet = [];
  let num = '';

  for(let i = 0; i < setStr.length; i++) {
    if(setStr[i] === '{')continue;

    if(setStr[i] === '}') {
      subSet.push(num * 1);
      num = '';
      set.push(subSet);
      subSet = [];
    } else if(setStr[i] === ',') {
      if(setStr[i + 1] != '{') subSet.push(num * 1);
      num = '';
    } else {
      num += setStr[i];
    }
  }

  set.sort((a, b) => {
    return a.length - b.length;
  });

  for(let i = 0; i < set.length; i++){
    for(let j = 0; j < set[i].length; j++) {
      const num = set[i][j];
      if(!answer.includes(num)) answer.push(num);
    }
  }

  return answer;
};