#include <iostream>
#include <vector>
#include <queue>
#include <limits.h>

using namespace std;

vector< pair <int, int> > adjList[51];
priority_queue<pair<int, pair <int, int> > > q;
int parent[101];

int find(int u) {
  if (u == parent[u]) return u;
  return find(parent[u]);
}

void merge(int u, int v) {
  u = find(u); v = find(v);
  if (u == v) return;
  parent[u] = v;
}

int solution(int n, vector<vector<int>> costs) {
    int answer = 0;

    // 비용을 기준으로하는 우선순위 큐
    for(int i = 0; i < costs.size(); i++) {
      int a = costs[i][0];
      int b = costs[i][1];
      int cost = costs[i][2];

      q.push({-cost, {a, b}});
    }

    int king = -1;

    while(!q.empty()) {
      int cost = q.top().first;
      int a = q.top().second.first;
      int b = q.top().second.second;
      q.pop();

      king = a;

      int pa = find(a);
      int pb = find(b);

      int pk = find(king);

      if (pk != pa || pk != pb) {
        answer += cost;
        merge(pa, pk);
        merge(pb, pk);
      }
    }
    return answer;
}