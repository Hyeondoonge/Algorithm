// 핵심
// 차량의 무게와 진입한 시간을 함께 기록해서
// 진입한 지 특정 시간(= 다리의 길이)만큼 지나면 fifo방식으로 처리

const solution = (bridge_length, weight, truck_weights) => {
  const bridge = [];
  const trucks = [...truck_weights];

  let time = 0;

  while (bridge.length !== 0 || trucks.length !== 0) {
    time++;
    if (bridge.length > 0 && time - bridge[0].time >= bridge_length) bridge.shift();

    let weight_sum = 0;
    for (let i = 0; i < bridge.length; i++) {
      weight_sum += bridge[i].weight;
    }

    if (weight_sum + trucks[0] <= weight) {
      const truck = trucks.shift();
      bridge.push({weight: truck, time});
    }
  }

  return time;
}