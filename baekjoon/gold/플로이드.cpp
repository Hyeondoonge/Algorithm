#include <iostream>
#include <vector>
#include <queue>
#include <limits.h>
#include <memory.h>

using namespace std;

priority_queue< pair <int, int> > q;

int cost[101];
int w[101][101];
bool visitied[101];
int n, m;

void update(int start) {
  cost[start] = 0;
  q.push({ 0, start });

  while(!q.empty()) {
    int c = q.top().first;
    int v = q.top().second;
	  q.pop();

    if (visitied[v]) continue;
    visitied[v] = true;

    for(int k = 1; k <= n; k++) {
      if (w[v][k] > 0) {
        int pathC = c - w[v][k];
        cost[k] = cost[k] > pathC ? cost[k] : pathC;
        q.push({ cost[k], k });
      }
    }
  }
}

int main() {
  scanf("%d\n%d", &n, &m);

  for(int i = 0; i < m; i++) {
  	int s, e, c;
    scanf("%d %d %d", &s, &e, &c);
    
    if (w[s][e] == 0 || w[s][e] > c) w[s][e] = c;
  }
  
  for(int i = 1; i <= n; i++) {
    for(int j = 1; j <= n; j++) {
      cost[j] = INT_MIN;
    }

    update(i);
    
    for(int j = 1; j <= n; j++) {
    	if (cost[j] == INT_MIN) printf("0 ");
  		else printf("%d ", -cost[j]);
  	}
  	
  	printf("\n");
  	
    memset(visitied, false, n + 1);
    memset(cost, INT_MIN, n + 1);
  }

  return 0;
}