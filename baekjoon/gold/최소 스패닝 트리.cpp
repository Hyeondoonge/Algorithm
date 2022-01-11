#include <iostream>
#include <vector>
#include <queue>
#include <limits.h>

using namespace std;

int parent[10001];
bool isInTree[10001];
priority_queue<pair<int, pair <int, int> > > q;

int find(int u) {
  if (u == parent[u]) return u;
  return find(parent[u]);
}

void merge(int u, int v) {
  u = find(u); v = find(v);
  if (u == v) return;
  parent[u] = v;  
}

int main() {
  int v, e;
  scanf("%d %d", &v, &e);

  for(int i = 1; i <= v; i++) {
    parent[i] = i;
  }

  for(int i = 0; i < e; i++) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    q.push({ -c, { a, b }});
  }

  int answer = 0;

  while (!q.empty()) {
    int a = q.top().second.first;
    int b = q.top().second.second;
    int c = -q.top().first;
    q.pop();

    int ap = find(a);
    int bp = find(b);
    
    if (ap != bp) {
      merge(a, b);
      answer += c;
    }
  }

  printf("%d", answer);

  return 0;
}