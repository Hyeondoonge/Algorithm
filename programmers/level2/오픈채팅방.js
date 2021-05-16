const solution = (record) => {
  const answer = [];

  const idWithstates = [];
  const idWithNick = {};

  // 입력 읽기
  record.forEach((e) => {
    const [state, id, nick] = e.split(' ');

    if(state === 'Enter') {
      idWithstates.push([id, state]);
      idWithNick[id] = nick;
    } else if(state === 'Leave') {
      idWithstates.push([id, state]);
    } else {
      idWithNick[id] = nick;
    }
  });

  // 출력
  idWithstates.forEach((e) => {
    const [id, state] = e;
    const nick = idWithNick[id];

    if(state === 'Enter') {
      answer.push(`${nick}님이 들어왔습니다.`);
    } else {
      answer.push(`${nick}님이 나갔습니다.`);
    }
  });
  return answer;
};