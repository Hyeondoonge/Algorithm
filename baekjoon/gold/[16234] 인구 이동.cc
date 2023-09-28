#pragma warning(disable:4996)
#include <stdio.h>
#include <memory.h>
#include <cmath>
#include <queue>

using namespace std;

int n, left, right;
int arr[51][51];
bool visitied[51][51];

int dr[] = { 0, 0, -1, 1 };
int dc[] = { -1, 1, 0, 0 };

vector<pair<int, int> > flag;

bool bfs(int i, int j) {
	int sum = 0;
	int country = 0;

	queue<pair<int, int> > q;
	q.push({ i, j });
	visitied[i][j] = true;

	while (!q.empty()) {
		int r =q.front().first;
		int c = q.front().second;
		q.pop();

		flag.push_back({ r, c });
		sum += arr[r][c];
		country++;

		for (int k = 0; k < 4; k++) {
			int nr = r + dr[k];
			int nc = c + dc[k];
			if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
			if (visitied[nr][nc]) continue;
			if (left > abs(arr[r][c] - arr[nr][nc]) || abs(arr[r][c] - arr[nr][nc]) > right) continue;
			visitied[nr][nc] = true;
			q.push({ nr, nc }); // 국경선 및 나라
		}
	}

	int newP = sum / country;

	for (int i = 0; i < flag.size(); i++) {
		int r = flag[i].first;
		int c = flag[i].second;
		arr[r][c] = newP;
	}
	flag.clear();
	return country > 1;
}

int main() {
	scanf("%d %d %d", &n, &left, &right);

	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			scanf("%d", &arr[i][j]);
		}
	}

	int answer = 0;

	while (1) {
		// 연합국가
		bool keep = false;

		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				if (!visitied[i][j]) {
					bool res = bfs(i, j);
					if (!keep) {
						keep = res;
					}
				}
			}
		}
		for (int i = 0; i < n; i++) {
			memset(visitied, false, sizeof(visitied));
		}

		if (!keep) break;

		answer++;
	}

	printf("%d", answer);

	return 0;
}