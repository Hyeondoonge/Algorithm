function solution(html) {
  html = html.replace(/(<main>|<\/main>)/g, '');
  const paragraphs = html.match(/<div[^>]*>(.*?)<\/div>/g, '');
  let answer = '';

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const title = paragraph.substring(
      /title=/.exec(paragraph).index + 7,
      /">/.exec(paragraph).index
    );
    answer += `title : ${title}\n`;
    const statements = paragraph.match(/<p>(.*?)<\/p>/g, '');

    for (let j = 0; j < statements.length; j++) {
      let format = statements[j].replace(/<\/?.*?>/g, '');
      format = format.trimStart().trimEnd();
      format = format.replace(/\s+/g, ' ');
      answer += `${format}\n`;
    }
  }
  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(solution(input[0]));
