const solution = (msg) => {
  const answer = [];

  const dict = {};

  for(let i = 0; i < 26; i++) {
    const c = String.fromCharCode(65 + i);
    dict[c] = i + 1;
  }

  let number = 27;

  let msgIndex = 0;

  while (msgIndex < msg.length) {
    let token = msg[msgIndex];
    
    let matchIndex = msgIndex;

    for(let i = msgIndex + 1; i < msg.length; i++) { // 가장 긴 문자열을 찾는다
      if (!dict[token + msg[i]]) break;
      matchIndex = i;
      token += msg[i];
    }
    answer.push(dict[token]);
    dict[token + msg[matchIndex + 1]] = number++;// 새로운 색인번호 등록
    
    msgIndex = matchIndex + 1;
  }

  return answer;
};