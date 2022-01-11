// 

#include <iostream>
#include <vector>
#include <queue>

using namespace std;

priority_queue<int> q;

int main() {
  int n, answer = 0;
  scanf("%d", &n);

  for(int i = 0; i < n; i++) {
    int num;
    scanf("%d", &num);
    q.push(-num);
  }

  if (n == 1) {
    printf("%d", -q.top());
    return 0;
  }

  while (q.size() > 1) {
    int a = q.top();
    int b = q.top();

    int sum = -(a + b);

    answer += sum;

    q.push(sum);
  }

  printf("%d", answer);

  return 0;
}