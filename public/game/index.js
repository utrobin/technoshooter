import * as UTILS from './base/global';

// Выбираем по какому протоколу будет производиться соединение
const protocol = window.location.protocol === 'https:' ?
  'wss:' : 'ws:';
// Составляем адрес, по которому будет призводиться соединение
const address = `${protocol}//${location.host}/api/game`;
console.log('Создаём новый WebSocket:', address);
const ws = new WebSocket(address);
// обработчик открытия соединения
ws.onopen = function (event) {
  // выводим сообщение, что соединение установлено
  console.log("Соединено");
  loop();
};

let id = -1;
let players = {};

ws.onmessage = function (event) {
  const content = JSON.parse(event.data);
  const data = JSON.parse(content.data);

  switch (content.type) {
    case "InitializePlayer":
      id = data;
      break;
    case "Snapshot":
      data.players.forEach((player) => {
        const playerId = player.id;
        if (playerId == id) {
          return;
        }

        if (player.position == null) {
          console.log("Враг без координат");
          return;
        }

        const x = player.position.x;
        const y = player.position.y;
        const z = player.position.z;

        if (players[`id${playerId}`] === undefined) {
          players[`id${playerId}`] = new WHS.Sphere({
            geometry: {
              radius: 3,
              widthSegments: 32,
              heightSegments: 32
            },

            mass: 2, // Mass of physics object.

            material: {
              color: UTILS.$colors.mesh,
              kind: 'lambert'
            },

            position: [x,y,z],
          });

          players[`id${playerId}`].addTo(world);
        }
        else {
          players[`id${playerId}`].position.set(x,y,z);
        }
      });
      break;
    case "RemovePlayer":
      world.remove(players[`id${data}`]);
      break;
  }

};

// обработчик закрытия сокета
ws.onclose = function (event) {
  if (event.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения');
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
  // вывод на экран сообщения о закрытии соединения
  window.header.innerText = 'Соединение закрыто';
  window.wrapper.hidden = true;
  id = -1;
};
// обработчик ошибок в сокете
ws.onerror = function (error) {
  console.log('Ошибка ' + error.message);
};


let world = new WHS.World({
  ...UTILS.$world,

  camera: {
    position: {
      z: 10
    }
  }
});

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 2, // Mass of physics object.

  material: {
    color: UTILS.$colors.mesh,
    kind: 'lambert'
  },

  position: [0, -1, 0]
});

sphere.addTo(world);

// const material = new THREE.MeshPhongMaterial({color: UTILS.$colors.mesh});
//
// for (let i = 0; i < 30; i++) {
//   new WHS.Box({
//     geometry: [10 + Math.random() * 90, 10 + Math.random() * 90, 10 + Math.random() * 90],
//     material,
//     position: [Math.random() * 1000 - 500, 100, Math.random() * 1000 - 500]
//   }).addTo(world);
// }

UTILS.addPlane(world, 1000);
UTILS.addBasicLights(world);

world.setControls(new WHS.FirstPersonControls(sphere, {
  speed: 3,
  ypos: -10
}));

function loop () {
  return new WHS.Loop(() => {
    const x = sphere.position["x"];
    const y = sphere.position["y"];
    const z = sphere.position["z"];
    let coords = {
      'x': x,
      'y': y,
      'z': z
    };
    let json = {
      type: "ru.javajava.mechanics.base.UserSnap",
      data: {
        'position': coords,
        'id': id
      }
    };
    ws.send(JSON.stringify(json));
  }).start(world);
}

world.start(); // Start animations and physics simulation.
