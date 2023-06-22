function solution(folder_info, queries) {
  const graph = {};

  for (let i = 0; i < folder_info.length; i++) {
    const [parent, name, isFolder] = folder_info[i].split(' ');
    if (!graph[parent]) {
      graph[parent] = [];
    }
    graph[parent].push([name, isFolder === '1' ? true : false]);
  }

  const history = [];
  const file_info = {};

  dfs('main', true);

  let answer = '';

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    answer += `${file_info[query].type} ${file_info[query].count}\n`;
  }

  return answer;

  function dfs(name, isFolder) {
    if (!graph[name]) {
      if (isFolder) {
        file_info[history.join('/') + '/' + name] = { type: 0, count: 0 };
        return {};
      } else return { [name]: 1 };
    }

    const sub_file_info = {};

    history.push(name);

    for (let i = 0; i < graph[name].length; i++) {
      const child = graph[name][i];
      const result = dfs(...child);

      for (const key in result) {
        if (sub_file_info[key]) {
          sub_file_info[key] += result[key];
        } else {
          sub_file_info[key] = result[key];
        }
      }
    }

    let count = 0;
    for (const key in sub_file_info) {
      count += sub_file_info[key];
    }

    file_info[history.join('/')] = { type: Object.keys(sub_file_info).length, count };

    history.pop();

    return sub_file_info;
  }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const folder_info = input.slice(1, N + M + 1);
const queries = input.slice(N + M + 2);

console.log(solution(folder_info, queries));
