// 핵심

// 1. 웅덩이 좌표는 (c, r) -> 열, 행 형태로 입력됨.
// 2. 최단경로 값을 갱신할 때 마다 모듈러 연산을 수행.

#include <string>
#include <vector>
#include <queue>

using namespace std;
    
bool visitied[102][102];
int root[102][102];
int ground[102][102]; // 웅덩이 표시
int dr[] = { 1, 0 };
int dc[] = { 0, 1 };

int solution(int m, int n, vector<vector<int>> puddles) {
    int answer = 0;
    int min = 0;
    
    queue<pair<int, int>> q;
    
    // 웅덩이 표시
    for(int i = 0; i < puddles.size(); i++) {
        int c = puddles[i][0];
        int r = puddles[i][1];
        ground[r][c] = 1;
    }

    for(int i = 1 ; i <= n; i++) {
      for(int j = 1; j <= m; j++) {
        if (i == n && j == m) continue;
        root[i][j] = 1;
      }
    }
    
    q.push({1, 1});
    visitied[1][1] = 1;
    
    while(!q.empty()) {
        int r = q.front().first;
        int c = q.front().second;
        q.pop();
        
        if (r == n && c == m) {
           break;
        }
        
        for(int k = 0; k < 2; k++) {
            int nr = r + dr[k];
            int nc = c + dc[k];
            
            if (nr < 1 || nr > n || nc < 1 || nc > m) continue;
            if (ground[nr][nc] == 1) continue;
            if (visitied[nr][nc]) {
              root[nr][nc] = (root[nr][nc] + root[r][c]) % 1000000007;
              continue;
            } else root[nr][nc] = root[r][c] % 1000000007;
            visitied[nr][nc] = true;
            q.push({ nr, nc });
        }
    }
    return root[n][m];
}