#include <iostream>
#include <string>

using namespace std;

int main () {
  string tissue;
  string angel;
  string devil;

  cin >>tissue >>angel >> devil;

  unsigned int dp[2][100][20] = {};

  for(int i = 0; i < angel.size(); i++) {
    if (tissue[0] == angel[i]) dp[0][i][0] = 1;
    if (tissue[0] == devil[i]) dp[1][i][0] = 1;
  }

  for(int i = 1; i < tissue.size(); i++) {
    char t = tissue[i];

    for(int k = 0; k <angel.size(); k++) {
      if (t != angel[k]) continue;
      for(int j = 0; j < k; j++) {
        dp[0][k][i] += dp[1][j][i - 1];
      }
    }

  for(int k = 0; k <devil.size(); k++) {
      if (t != devil[k]) continue;
      for(int j = 0; j< k; j++) {
        dp[1][k][i] += dp[0][j][i - 1];
      }
    }
  }

  unsigned int answer= 0;

  for(int k = 0; k< angel.size(); k++) {
    answer += dp[0][k][tissue.size() - 1];
    answer += dp[1][k][tissue.size() - 1];
  }

  cout << answer;

  return 0;
};