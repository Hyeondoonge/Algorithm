// 핵심
// C# 같은 음에 유의해야함.
// 멜로디를 배열(원소는 음)로 만듦 (문자열로 만들어버리면 비교하기 힘들어서..)

const melodyParse = (melody) => {
  const melodyArr = [];

  for (let i = 0; i < melody.length; i++) {
    if (melody[i] === '#') continue;
    if (melody[i] !== 'E' || melody !== 'F') {
      if(i + 1 < melody.length && melody[i + 1] === '#') {
        melodyArr.push(melody[i]+'#');
        continue;
      }
    }
    melodyArr.push(melody[i]);
  }

  return melodyArr;
}

const isMatch = (source, target) => {
  for(let i = 0; i < source.length - target.length + 1; i++) {
    const compare = source.slice(i, i + target.length).every((c, index) => c === target[index]);
    if (compare) {
      return true;
    }
  }
  return false;
};

const solution = (m, musicinfos) => {
  const candidates = [];

  musicinfos.forEach((info, index) => {
    const [start, end, title, melody] = info.split(',');
    const [startHour, startMinutes] = start.split(':').map((e => parseInt(e)));
    const [endHour, endMinutes] = end.split(':').map((e => parseInt(e)));

    const diff = ((endHour - startHour) * 60 + (endMinutes - startMinutes));
    const melodyArr = melodyParse(melody);

    let memory = [];

    if (melodyArr.length >= diff) {
      memory = melodyArr.slice(0, diff);
      if (isMatch(memory, melodyParse(m))) candidates.push({ title, diff, index });
    } else {
      const t = melodyArr;
      for(let i = 0; i < Math.floor(diff / melodyArr.length); i++) {
        memory = memory.concat(t);
      }
      for(let i = 0; i < diff % melodyArr.length; i++) {
        memory.push(melodyArr[i]);
      }
      if (isMatch(memory, melodyParse(m))) candidates.push({ title, diff, index });
    }
  });

  candidates.sort((a, b) => {
    if (a.diff === b.diff) return ((a, b) => a.index - b.index);
    else return b.diff - a.diff;
  })

  if(candidates.length === 0) return '(None)';
  else return candidates[0].title;
};