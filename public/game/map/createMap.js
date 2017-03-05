import * as WHS from '@whs';
import * as PHYSICS from 'physics-module-ammonext';

export default function createMap(world) {
  const mass = 0;
  const restitution = 1;

  const height = 50;

  const walls = [
    {
      position: [0, height, 500],
      geometry: [1000, 100, 50]
    }, {
      position: [0, height, -500],
      geometry: [1000, 100, 50]
    }, {
      position: [500, height, 0],
      geometry: [50, 100, 1000]
    }, {
      position: [-500, height, 0],
      geometry: [50, 100, 1000]
    }
  ];

  walls.forEach(el => {
    new WHS.Box({
      geometry: el.geometry,
      position: el.position,

      material: new THREE.MeshBasicMaterial({
        color: 0xffffff
      }),

      modules: [
        new PHYSICS.BoxModule({
          mass: mass,
          restitution: restitution
        }),
        new WHS.mesh.TextureModule({
          url: `/static/brick.jpg`,
          repeat: new THREE.Vector2(100, 10)
        })
      ],
    }).addTo(world);
  });

  new WHS.Box({
    geometry: [100, 16, 100],
    position: [0, 8, 0],

    material: new THREE.MeshBasicMaterial({
      color: 0xffffff
    }),

    modules: [
      new PHYSICS.BoxModule({
        mass: mass,
        restitution: restitution
      }),
      new WHS.mesh.TextureModule({
        url: `/static/camouflage.jpeg`,
        repeat: new THREE.Vector2(2, 1)
      })
    ]
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
      position: [el.x, heightTower/2, el.z],

      material: new THREE.MeshBasicMaterial({
        color: 0xffffff
      }),

      modules: [
        new PHYSICS.BoxModule({
          mass: mass,
          restitution: restitution
        }),
        new WHS.mesh.TextureModule({
          url: `/static/camouflage.jpeg`,
          repeat: new THREE.Vector2(2, 1)
        })
      ]
    }).addTo(world);
  });
  //Конец четырех вышек

  // //Начало центральных задних(маленьких) блоков
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
      position: [el.x, heightBlockBack/2, el.z],

      material: new THREE.MeshBasicMaterial({
        color: 0xffffff
      }),

      modules: [
        new PHYSICS.BoxModule({
          mass: mass,
          restitution: restitution
        }),
        new WHS.mesh.TextureModule({
          url: `/static/camouflage.jpeg`,
          repeat: new THREE.Vector2(4, 1)
        })
      ]
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
      position: [el.x, heightBlockNaBlockX + heightBlockNaBlockX/2, el.z],

      material: new THREE.MeshBasicMaterial({
        color: 0xffffff
      }),

      modules: [
        new PHYSICS.BoxModule({
          mass: mass,
          restitution: restitution
        }),
        new WHS.mesh.TextureModule({
          url: `/static/camouflage.jpeg`,
          repeat: new THREE.Vector2(4, 1)
        })
      ]
    }).addTo(world);
  });
  //Конец центральных блок на блоках

  // Начало центральных блоков на блоках
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
      position: [el.x, heightBlockNaBlockZ + heightBlockNaBlockZ/2, el.z],

      material: new THREE.MeshBasicMaterial({
        color: 0xffffff
      }),

      modules: [
        new PHYSICS.BoxModule({
          mass: mass,
          restitution: restitution
        }),
        new WHS.mesh.TextureModule({
          url: `/static/camouflage.jpeg`,
          repeat: new THREE.Vector2(4, 1)
        })
      ]
    }).addTo(world);
  });
  // Конец центральных блок на блоках
}
