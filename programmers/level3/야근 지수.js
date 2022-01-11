const solution = (works, n) => {
  var answer = 0;

  let time = 0;

  let copiedWorks = [...works].sort((a, b) => b - a);

  while (time < n) {
    copiedWorks[0] -= 1;

    if (copiedWorks[0] <= 0) copiedWorks[0] = 0;
    copiedWorks.sort((a, b) => b - a);
    time++;
  }

  console.log(copiedWorks);

  answer = copiedWorks.forEach((num) => answer += num * num);

  console.log(answer);

  return answer;
}

solution([4, 3, 3], 4);