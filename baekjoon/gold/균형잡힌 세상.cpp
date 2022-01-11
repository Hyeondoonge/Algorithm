#include <iostream>
#include <cstring>

using namespace std; 

char str[101];
char stack[101]; // () -> 1,  [] -> 3, 4

int main (){

  scanf("%s", str);

  while (strcmp(str, ".") != 0) {
    int top = 0;
    memset(str, '\0', 101);

    for(int i = 0; i < strlen(str); i++) {
      if (str[i] == '(') stack[top++] = '(';
      else if (str[i] == ')' && stack[top] == '(') stack[top--] = '\0';
      else if (str[i] == '[') stack[top++] = '[';
      else if (str[i] == ']' && stack[top] == '[') stack[top--] = '\0';
      else break;
    }

    if (strlen(str) > 0) printf("NO");
    else printf("YES");

    scanf("%s", str);
  }

  return 0;
}