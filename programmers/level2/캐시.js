// 핵심
// cachesize가 극단적으로 0일 경우,
// 이 경우 만의 로직이 필요함 (우연히 맞은 tc에 속으면 안된다.)

const solution = (cacheSize, cities) => {
  let answer = 0;
  const queue = [];

  if (cacheSize === 0) {
    return cities.length * 5;
  }

  cities.forEach((city) => {
    const toUpper = city.toUpperCase();

    if (queue.includes(toUpper)) { // hit
      answer += 1;
      const idx = queue.indexOf(toUpper);
      queue.splice(idx, 1);
      queue.push(toUpper);
    } else { // miss
      if (queue.length === cacheSize) queue.shift();
      answer += 5;
      queue.push(toUpper);
    }
  });

  return answer;
};