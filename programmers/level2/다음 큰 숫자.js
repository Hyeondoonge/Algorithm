function solution(n) {
  let next = n + 1;

  while (1) {
    const next2bi = next.toString(2);
    const n2bi = n.toString(2);

    let nextOne = 0, nOne = 0;
    for (let i = 0; i < next2bi.length; i++) {
      if (next2bi[i] === "1") nextOne += 1;
    }

    for (let i = 0; i < n2bi.length; i++) {
      if (n2bi[i] === "1") nOne += 1;
    }

    if (nextOne === nOne) break;

    next += 1;
  }
  console.log(next);
  return next;
}

solution(1000000);