import * as UTILS from './global';

export default function createMap(world) {
  const height = 50;
  const mass = 999999;
  //Начало четырех базовых стен
  new WHS.Box({
    geometry: [1000, 100, 50],
    mass: mass,

    material: {
      color: UTILS.$colors.mesh,
      kind: 'lambert',
      map: WHS.texture('/static/brick.jpg', {repeat: {x: 100, y: 10}}),
    },

    position: [0, height, 500]
  }).addTo(world);

  new WHS.Box({
    geometry: [1000, 100, 50],
    mass: mass,

    material: {
      color: UTILS.$colors.mesh,
      kind: 'lambert',
      map: WHS.texture('/static/brick.jpg', {repeat: {x: 100, y: 10}}),
    },

    position: [0, height, -500]
  }).addTo(world);

  new WHS.Box({
    geometry: [50, 100, 1000],
    mass: mass,

    material: {
      color: UTILS.$colors.mesh,
      kind: 'lambert',
      map: WHS.texture('/static/brick.jpg', {repeat: {x: 100, y: 10}}),
    },

    position: [500, height, 0]
  }).addTo(world);

  new WHS.Box({
    geometry: [50, 100, 1000],
    mass: mass,

    material: {
      color: UTILS.$colors.mesh,
      kind: 'lambert',
      map: WHS.texture('/static/brick.jpg', {repeat: {x: 100, y: 10}}),
    },

    position: [-500, height, 0]
  }).addTo(world);
  //Конец четырех базовых стен

  new WHS.Box({
    geometry: [100, 16, 100],
    mass: mass,

    material: {
      color: UTILS.$colors.mesh,
      kind: 'lambert',
      map: WHS.texture('/static/camouflage.jpeg', {repeat: {x: 2, y: 1}}),
    },

    position: [0, 8, 0]
  }).addTo(world);

  //Четыре длинные вышки
  const heightTower = 70;
  const constPositionTower = 300;
  const squareTowerGeometry = {
    x: 200,
    y: heightTower,
    z: 200
  };

  const squareTowerPosition = [
    {
      x: constPositionTower,
      z: constPositionTower
    },
    {
      x: constPositionTower,
      z: -constPositionTower
    },
    {
      x: -constPositionTower,
      z: constPositionTower
    },
    {
      x: -constPositionTower,
      z: -constPositionTower
    },

  ];

  squareTowerPosition.forEach((el) => {
    new WHS.Box({
      geometry: [squareTowerGeometry.x, squareTowerGeometry.y, squareTowerGeometry.z],
      mass: mass,

      material: {
        color: UTILS.$colors.mesh,
        kind: 'lambert',
        map: WHS.texture('/static/camouflage.jpeg', {repeat: {x: 3, y: 3}}),
      },

      position: [el.x, heightTower/2, el.z]
    }).addTo(world);
  });
  //Конец четырех вышек

  //Начало центральных задних(маленьких) блоков
  const heightBlockBack = 16;
  const constPositionBlockBack = 300;
  const squareBlockBackGeometry = {
    x: 200,
    y: heightBlockBack,
    z: 200
  };

  const squareBlockBackPosition = [
    {
      x: constPositionBlockBack,
      z: 0
    },
    {
      x: -constPositionBlockBack,
      z: 0
    },
    {
      x: 0,
      z: constPositionBlockBack
    },
    {
      x: 0,
      z: -constPositionBlockBack
    },

  ];

  squareBlockBackPosition.forEach((el) => {
    new WHS.Box({
      geometry: [squareBlockBackGeometry.x, squareBlockBackGeometry.y, squareBlockBackGeometry.z],
      mass: mass,

      material: {
        color: UTILS.$colors.mesh,
        kind: 'lambert',
        map: WHS.texture('/static/camouflage.jpeg', {repeat: {x: 4, y: 1}}),
      },

      position: [el.x, heightBlockBack/2, el.z]
    }).addTo(world);
  });
  //Конец центральных задних(маленьких) блоков

  //Начало центральных блоков на блоках
  const heightBlockNaBlockX = 16;
  const constPositionBlockNaBlockX = 250;
  const squareBlockNaBlockXGeometry = {
    x: 200,
    y: heightBlockNaBlockX,
    z: 100
  };

  const squareBlockNaBlockXPosition = [
    {
      x: 0,
      z: constPositionBlockNaBlockX
    },
    {
      x: 0,
      z: -constPositionBlockNaBlockX
    },
  ];

  squareBlockNaBlockXPosition.forEach((el) => {
    new WHS.Box({
      geometry: [squareBlockNaBlockXGeometry.x, squareBlockNaBlockXGeometry.y, squareBlockNaBlockXGeometry.z],
      mass: mass,

      material: {
        color: UTILS.$colors.mesh,
        kind: 'lambert',
        map: WHS.texture('/static/camouflage.jpeg', {repeat: {x: 4, y: 1}}),
      },

      position: [el.x, heightBlockNaBlockX + heightBlockNaBlockX/2, el.z]
    }).addTo(world);
  });
  //Конец центральных блок на блоках

  //Начало центральных блоков на блоках
  const heightBlockNaBlockZ = 16;
  const constPositionBlockNaBlockZ = 250;
  const squareBlockNaBlockZGeometry = {
    x: 100,
    y: heightBlockNaBlockZ,
    z: 200
  };

  const squareBlockNaBlockZPosition = [
    {
      x: constPositionBlockNaBlockZ,
      z: 0
    },
    {
      x: -constPositionBlockNaBlockZ,
      z: 0
    },
  ];

  squareBlockNaBlockZPosition.forEach((el) => {
    new WHS.Box({
      geometry: [squareBlockNaBlockZGeometry.x, squareBlockNaBlockZGeometry.y, squareBlockNaBlockZGeometry.z],
      mass: mass,

      material: {
        color: UTILS.$colors.mesh,
        kind: 'lambert',
        map: WHS.texture('/static/camouflage.jpeg', {repeat: {x: 4, y: 1}}),
      },

      position: [el.x, heightBlockNaBlockZ + heightBlockNaBlockZ/2, el.z]
    }).addTo(world);
  });
  //Конец центральных блок на блоках
}
