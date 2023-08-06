// 폴더와 파일
// 같은 파일 이름 -> 동일한 파일
// 한 폴더 안에 같은 이름 파일 존재 X
// 같은 이름 폴더 두 개 이상 존재 X

// "main 폴더 하위" -> 전체

// input
// N 폴더 개수(1~1,000) M 파일 개수(1~1,000)
// 정보 [상위폴더 이름, 이름, 폴더 or 폴더 X]
// Q 쿼리수 (1~1,000)
// main 기점의 폴더의 경로 정보

// output
// 주어진 폴더 하위에 있는 파일의 종류 개수와 파일 총 개수
// * 파일 종류 -> 같은 파일 여러개여도 하나

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
