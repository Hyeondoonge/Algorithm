#pragma warning(disable:4996)
#include<stdio.h>

int t[16], p[16];
int n, answer = 0;

void DFS(int day, int pay) { 
	answer = answer > pay ? answer : pay;
	for (int i = day + t[day]; i <= n; i++) {
		if (i + t[i] <= n + 1) DFS(i, pay + p[i]);
	}
}

int main() {
	scanf("%d", &n);

	for (int i = 1; i <= n; i++) {
		scanf("%d %d", &t[i], &p[i]);
	}

	for (int i = 1; i <= n; i++) {
		if(i+t[i] <= n+1) DFS(i, p[i]); 
	}

	printf("%d", answer);

	return 0;
}