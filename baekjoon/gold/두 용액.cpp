#include <iostream>
#include <algorithm>
#include <queue>
#include <math.h>

using namespace std;

int arr[100001];

int main () {
  int n;
  scanf("%d", &n);

  for(int i = 0; i < n; i++) {
    scanf("%d", &arr[i]);
  }

  sort(arr, arr + n);

  int l = 0, r = n - 1;

  while((r - l) >= 0) {
  int m = (r + l) / 2;

  if (arr[m] >= 0) r -= 1;
  else l += 1;
}

int lastM = r - 1, lastP = n - 1;

l = 0; r += 1;

int sum = arr[l] + arr[r];
int answer = 2000000000;
int ansArr[2];

queue <pair <pair<int, int>, int> > q;

q.push({{ l, r }, sum });

while (!q.empty()) {
  int left = q.front().first.first; 
  int right = q.front().first.second;
  int sum = q.front().second;
  q.pop();

  if (answer > abs(sum)) {
    answer = abs(sum);
    ansArr[0] = arr[left];
    ansArr[1] = arr[right];
  }

  if (left == lastM || right == lastP) continue;

  q.push({{left + 1, right}, arr[right] + arr[left] + 1});
  q.push({{left, right + 1}, arr[left] + arr[right + 1]});
};

  printf("%d %d", ansArr[0], ansArr[1]);

  return 0;
}