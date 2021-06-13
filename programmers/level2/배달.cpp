#include <iostream>
#include <vector>
#include <queue>
#include <limits.h>

using namespace std;

vector< pair <int, int> > adjList[51];
priority_queue< pair <int, int> > q;
int cost[51];
bool visitied[51];

int solution(int N, vector<vector<int> > road, int K) {
    for(int i = 0; i < road.size(); i++) {
        int a = road[i][0], b = road[i][1];
        int c = road[i][1];

        adjList[a].push_back({ b, c });
        adjList[b].push_back({ a, c });
    }

    for(int i = 1; i <= N; i++) {
        cost[i] = INT_MIN;
    }

    q.push({ 0, 1 }); // 비용, 시작점

    while (!q.empty()) {
        int c = q.top().first;
        int v = q.top().second;
        q.pop();

        if (visitied[v]) continue;
        visitied[v] = 1;

        for(int i = 0; i < adjList[v].size(); i++) {
            int adjV = adjList[v][i].first;
            int adjC = adjList[v][i].second;

            if (c - adjC > cost[adjV]) {
                cost[adjV] = -adjC;
            }
            q.push({ adjC, adjV });
        }
    }

    int answer = 0;

    for (int i = 1; i <= N; i++) {
        if (cost[i] <= K) answer++;
    }
    return answer;
}