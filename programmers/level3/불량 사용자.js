const library = [];
const list = [];

const visitied = {};

const matchedIds = [];

// 같은 원소가 하나도 없으면 true
const isValid = (list) => {
  return library.every((l) => l.some((e, index) => e !== list[index]));
}

const dfs = (d, depth) => {
  if (d === depth) {
    const newList = [...list];
    newList.sort();
    if(isValid(newList)) {
      library.push(newList);
    }
    return;
  }

  for(let i = 0; i < matchedIds[d].length; i++) {
    const id = matchedIds[d][i];
    if (visitied[id]) continue;
    visitied[id] = true;
    list.push(id);
    dfs(d + 1, depth);
    list.pop();
    visitied[id] = false;
  }
};

const solution = (user_id, banned_id) => {
  let answer = 0;

  user_id.forEach((id) => {
    visitied[id] = false;
  });

  banned_id.forEach((bid, index) => {
    matchedIds[index] = [];
    user_id.forEach((uid) => {
      let matched = true;
      for(let i = 0; i < uid.length; i++) {
        if (bid[i] === '*') continue;
        if (bid[i] !== uid[i]) {
          matched = false;
          break;
        }
      }
      if (uid.length !== bid.length) matched = false;
      if (matched) {
        matchedIds[index].push(uid);
      }
    })
  })

  dfs(0, banned_id.length);

  return answer;
}