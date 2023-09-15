#include <iostream>
#include <vector>

using namespace std;

struct test {
  int k;
  int s;
};

int max(int a, int b) {
  return a > b ? a :b;
}

int main() {
  int N; int T;
  vector<test> tests;

  scanf("%d %d", &N, &T);
  for(int i = 0; i < T; i++) {
    int K; int S;
    scanf("%d %d", &K, &S);

    tests.push_back({ K, S });
  }

  vector<int> dp(T+1);

  for(int i = 0; i <N; i++) {
    test test = tests[i];
    int K = test.k;
    int S = test.s;
    for(int j = T; j >= K; j--) {
      dp[j] = max(dp[j], dp[j - K] + S);
    }
  }

  int answer = 0;

  for(int i = 1; i <= T; i++) {
    answer = max(dp[i], answer);
  }

  printf("%d", answer);

  return 0;
};