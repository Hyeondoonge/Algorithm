  const visitied = []; // 칼럼에 대한 방문 여부
  const minimal = [];
  const log = [];
  let tuples = [];
  let candidate = [];

  const miniCheck = (log) => { // 최소성 체크
    let success = true;

    for(let i = 0; i < log.length; i++) { // 하나 뺐을 때, isValid 만족하는 거 하나라도 있으면 최소성 만족 X
      const copiedLog = [...log];
      copiedLog.splice(i, 1);

      if (isValid(copiedLog)) {
        success = false;
        break;
      }
    }
    return success;
  };

  const isValid = (log) => {
    for(let i = 0; i < tuples.length - 1; i++) {
      for(let j = i + 1; j < tuples.length; j++) {
        let valid = false;
        for(let k = 0; k < log.length; k++) {
          if (tuples[i][log[k]] !== tuples[j][log[k]]) {
            valid = true;
            break;
          }
        }
        if (!valid) {
          return false;
        }
      }
    }
    return true;
  };

  const dfs = (index, depth, c) => {
    if (depth === c) {
      return;
    }

    for(let i = index + 1; i < c; i++) {
      if (visitied[i]) continue;

      visitied[i] = 1;
      log.push(i);

      if (isValid(log)) {
        if (miniCheck(log)) candidate.push([...log]);
      } else dfs(i, depth + 1, c);

      visitied[i] = 0;
      log.pop();
    }
  };

  const solution = (relation) => {
    tuples = relation;
    dfs(-1, 0, relation[0].length);

    return candidate.length;
  };