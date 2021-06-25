// 핵심
// 가장 밑의 행을 읽으며 각 열의 합의 최대값을 갱신

#include <string>
#include <vector>

using namespace std;

int arr[501][501];

int solution(vector<vector<int>> triangle) {
    int n = triangle.size();
    
    for(int j = 0; j < triangle[n - 1].size(); j++) {
        arr[n - 1][j] = triangle[n - 1][j];
    }
    
    for(int i = triangle.size() - 2; i >= 0; i--) {
      for(int j = 0; j < triangle[i].size(); j++) {
          int bigger = arr[i + 1][j] > arr[i + 1][j + 1] ? arr[i + 1][j] : arr[i + 1][j + 1];
          
          arr[i][j] = triangle[i][j] + bigger;
      }
    }
    
    int answer = arr[0][0];
    
    return answer;
}