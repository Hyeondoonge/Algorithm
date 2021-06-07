const solution = (n, words) => {
  const answer = [];

  let index = 0;
  let loop = 1;

  while (index + n <= words.length) {
   const prev_words = words.slice(0, index);

   for (let i = 0; i < n; i++) {
    if (prev_words.includes(words[index + i])
    || (index + i >= 1 && words[index + i][0] !== words[index + i - 1][words[index + i - 1].length - 1])) {
      answer.push(i + 1);
      answer.push(loop);
      return answer;
    }
   }
   loop += 1;
   index += n;
  }
  if (answer.length === 0) return [0, 0];
};