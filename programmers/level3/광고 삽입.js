function solution(play_time, adv_time, logs) {
  play_time = timeToNumber(play_time);
  adv_time = timeToNumber(adv_time);

  const T = Array.from({ length: 100 * 60 * 60 + 1 }, () => 0);

  logs.forEach((log) => {
    const [start, end] = log.split('-').map((time) => timeToNumber(time));
    T[start] += 1;
    T[end] -= 1;
  });

  // 누적합
  for (let i = 1; i < T.length; i++) {
    T[i] += T[i - 1];
  }

  // 누적합
  for (let i = 1; i < T.length; i++) {
    T[i] += T[i - 1];
  }

  let max = { t: 0, play_sum: -Infinity };

  for (let i = 0; i < play_time; i++) {
    let start = i,
      end = i + adv_time;
    if (play_time < end) continue;
    const sum = start === 0 ? T[end] : T[end - 1] - T[start - 1];

    if (max.play_sum < sum) {
      max.play_sum = sum;
      max.t = start;
    }
  }

  return numberToTime(max.t);

  function timeToNumber(time) {
    const [HH, MM, SS] = time.split(':').map(Number);
    return HH * 3600 + MM * 60 + SS;
  }

  function numberToTime(time) {
    const HH = Math.floor(time / 3600) + '';
    time = time % 3600;
    const MM = Math.floor(time / 60) + '';
    time = time % 60;
    const SS = time + '';
    return `${HH.padStart(2, '0')}:${MM.padStart(2, '0')}:${SS.padStart(2, '0')}`;
  }
}
