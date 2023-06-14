function solution(sounds) {
  const record = [];
  const index = { q: 0, u: 1, a: 2, c: 3, k: 4 };

  for (let i = 0; i < sounds.length; i++) {
    const sound = sounds[i];

    let idx = -1;

    for (let j = 0; j < record.length; j++) {
      if (record[j].length === 0 && sound === 'q') {
        idx = j;
        break;
      }

      const last = record[j][record[j].length - 1];
      if (index[sound] - index[last] === 1) {
        idx = j;
        break;
      }
    }

    if (idx === -1) {
      record.push('');
      idx = record.length - 1;
    }

    record[idx] += sound;

    if (record[idx].length === 5) {
      record[idx] = '';
    }
  }

  return record.some((r) => r !== '') ? -1 : record.length;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const sounds = input[0];

console.log(solution(sounds));
