// 핵심
// 소팅하면서 최대값을 찾는 것 보다
// 우선순위 큐를 활용하면 시간측면에서 훨씬 효율적으로 풀이 가능

#include <string>
#include <vector>
#include <queue>

using namespace std;

long long solution(int n, vector<int> works) {
  long long answer = 0;
    
  priority_queue<int> q;

  for(int i = 0 ; i < works.size(); i++) {
      q.push(works[i]);
  }
   
  int time = 0;
  
  while (time < n) {
    int top = q.top();
    q.pop();
     
    int cur = top - 1;

    if (cur <= 0) cur = 0;
    q.push(cur);
    time++;
  }

  while(!q.empty()) {
      int top = q.top();
      q.pop();
      answer += top * top;
  }

  return answer;
}