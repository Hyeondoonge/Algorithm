// 핵심
// 초기에 진입 순서대로 routes배열을 정렬한다.
// why ?
// 

const camera = [];

const placeCamera = (route) => {
  if (camera.length === 0) {
    camera.push({ min: route[0], max: route[1] });
    return;
  }

  for(let i = 0; i < camera.length; i++) {
    if ((camera[i].min <= route[0] && route[0] <= camera[i].max)
    || camera[i].min <= route[1] && route[1] <= camera[i].max) {
      const min = camera[i].min > route[0] ? camera[i].min : route[0];
      const max = camera[i].max < route[1] ? camera[i].max : route[1];
      camera[i] = { min, max };
      return;
    }
  }
  camera.push({min: route[0], max: route[1]});
};

const solution = (routes) => {
  // routes.sort((a, b) => a[0] - b[0]);

  for(let i = 0; i < routes.length; i++) {
    placeCamera(routes[i]);
  }

  console.log(camera);

  return camera.length;
};

solution([[-5,-3] ,[-20,15], [-18,-13], [-14,-5]]);