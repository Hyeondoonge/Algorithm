// 핵심
// 1. 원소 개수가 적기 때문에 모든 순열을 만들 수 있고, 조건에 맞는 경우를 카운팅
// 2. 두 원소간의 간격이 음수로 나올 경우가 있으므로 절대값 취해 줌.

#include <string>
#include <vector>
#include <cstdlib>

using namespace std;
  
vector<char> log;
int answer = 0;

bool isValid (vector<string> data) {
    char friends[] = { 'A', 'C', 'F', 'J', 'M', 'N', 'R', 'T' };
    bool result = true;
    
    for(int i = 0; i < data.size(); i++) {
        char f = data[i][0], s = data[i][2];
        char opr = data[i][3];
        char opn = data[i][4] - 48;
        
        char fIdx = -1, sIdx = -1;
        
        for(int j = 0; j < 8; j++) {
            char fr = friends[log[j]];
            
            if (f == fr) fIdx = j;
            if (s == fr) sIdx = j;
        }
        
        int diff = abs(sIdx - fIdx) - 1;
        
        if (opr == '=' && diff != opn) {
            result = false;
            break;
        } else if (opr == '>' && diff <= opn) {
            result = false;
            break;
        } else if (opr == '<' && diff >= opn) {
            result = false;
            break;
        }
    }
    return result;
}

void dfs (int d, int depth, bool visitied[], vector<string> data) {
  if (d == depth) {
    if(isValid(data)) answer += 1;
    return;
  }

  for(int i = 0; i < 8; i++) {
    if (visitied[i]) continue;
    visitied[i] = true;
    log.push_back(i);

    dfs(d + 1, depth, visitied, data);

    visitied[i] = false;
    log.pop_back();
  }
}

int solution(int n, vector<string> data) {
    bool visitied[] = { 0, 0, 0, 0, 0, 0, 0, 0 };

    answer = 0;

    dfs(0, 8, visitied, data);
    
    return answer;
}