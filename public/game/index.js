import * as UTILS from './base/global';
import GlitchPass from './glick';
import createMap from './base/map';
import Pew from './pewpew';

let pewConfig = {
  canvas: "pew-pew",
  hand: "pew-hand"
};

let pew = new Pew(pewConfig);
pew.start();

const Config = {
  ...UTILS.$world,

  camera: {
    far: 1500,
    position: {
      z: 10
    }
  },

  modules: {
    rendering: false
  }
};

const protocol = window.location.protocol === 'https:' ?
  'wss:' : 'ws:';
const address = `${protocol}//${location.host}/api/game`;

class Game {
  constructor(options) {
    this.world = new WHS.World(options);

    UTILS.addPlane(this.world, 1300);
    UTILS.addBasicLights(this.world);

    this.ws = new WebSocket(address);

    this.id = -1;
    this.players = {};

    this.addObject();
    this.connect();
    this.createPostProcessing();

    this.createPlayer();
  }

  addObject() {
    createMap(this.world);

  }

  connect() {
    this.ws.onopen = () => {
      console.log("Соединено");
      this.loop();
    };

    this.ws.onmessage = (event) => {
      const content = JSON.parse(event.data);
      const data = JSON.parse(content.data);

      switch (content.type) {
        case "InitializePlayer":
          this.id = data;
          break;
        case "Snapshot":
          if (data.shot) {
            console.log('В тебя попали');
            this.toggleGlick(0);
            setTimeout(() => {
              this.toggleGlick(1)
            }, 500)
          }

          data.players.forEach((el) => {
            if (el.victims.length > 0) {
              el.victims.forEach((element) => {
                const message = `
                  <div class="one-message">
                    <div class="one-message__wrapper">
                      <span class="killer">${el.login}</span>
                      &nbsp;убил&nbsp;
                      <span class="victim">${element.login}</span>
                    </div>
                  </div>
                `;

                let div = document.createElement('div');
                div.innerHTML = message;
                document.querySelector('.message').appendChild(div);
                setTimeout(() => {
                  document.querySelector('.message').removeChild(div)
                }, 30000);

                this.world.remove(this.players[`id${element.id}`]);
                setTimeout(() => {
                  this.players[`id${element.id}`].addTo(this.world);
                }, 3000);
              })
            }
          });



          data.players.forEach((player) => {
            const playerId = player.id;
            if (playerId == this.id) {
              return;
            }

            if (player.position == null) {
              console.log("Враг без координат");
              return;
            }

            const pp = player.position;

            if (this.players[`id${playerId}`] === undefined) {
              this.players[`id${playerId}`] = new WHS.Sphere({
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

                position: pp,
              });

              this.players[`id${playerId}`].addTo(this.world);
            }
            else {
              this.players[`id${playerId}`].position.copy(pp);
            }
          });
          break;
        case "RemovePlayer":
          data.forEach((el) => {
            this.world.remove(this.players[`id${el}`]);
            delete this.players[`id${el}`];
          });
          break;
      }
    };

    this.ws.onclose = (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      }
      else {
        console.log('Обрыв соединения');
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
      // вывод на экран сообщения о закрытии соединения
      window.header.innerText = 'Соединение закрыто';
      window.wrapper.hidden = true;
      id = -1;
    };

    this.ws.onerror = (error) => {
      console.log('Ошибка ' + error.message);
    };
  }

  loop() {
    window.addEventListener('mousedown', () => {
      if (typeof this.world.controls.getDirection == 'function') {
        let camera = {
          'x': this.world.controls.getDirection().x,
          'y': this.world.controls.getDirection().y,
          'z': this.world.controls.getDirection().z
        };

        const {x, y, z} = this.player.position;

        let position = {x, y, z};

        let json = {
          type: "ru.javajava.mechanics.base.UserSnap",
          data: {
            position,
            camera,
            id: this.id,
            firing: true
          }
        };

        this.ws.send(JSON.stringify(json));
      }
    }, this);

    return new WHS.Loop(() => {
      const {x, y, z} = this.player.position;

      let camera = {
        x: 0,
        y: 0
      };

      if (typeof this.world.controls.getDirection == 'function') {
        camera = {
          x: this.world.controls.getDirection().x,
          y: this.world.controls.getDirection().y,
          z: this.world.controls.getDirection().z
        };

        // camera = world.controls.getDirection().toArray
      }

      let position = {x, y, z};

      let json = {
        type: "ru.javajava.mechanics.base.UserSnap",
        data: {
          position,
          id: this.id,
          camera,
          firing: false
        }
      };

      this.ws.send(JSON.stringify(json));
    }).start(this.world);
  }

  createPostProcessing() {
    this.world.$rendering = new WHS.PostProcessor(this.world.params);
    this.postProcessor = this.world.$rendering;

    this.postProcessor.createRenderPass(false);
    this.postProcessor.createPass(composer => {
      const pass = new GlitchPass('Glitch');
      pass.renderToScreen = true;

      pass.changeGlick = 1;
      composer.addPass(pass);

      this.toggleGlick = value => {
        pass.changeGlick = value;
      };
    });
  }

  createPlayer() {
    this.player = new WHS.Sphere({
      geometry: {
        radius: 3,
        widthSegments: 32,
        heightSegments: 32
      },

      mass: 5,

      material: {
        color: UTILS.$colors.mesh,
        kind: 'lambert'
      },

      position: [0, -1, 0]
    });

    this.player.addTo(this.world);
  }

  start() {
    this.world.start();

    this.world.setControls(new WHS.FirstPersonControls(this.player, {
      speed: 4,
      ypos: -10
    }));

    // setTimeout(() => {
    //   console.log('gfg');
    //   this.world.setControls(new WHS.OrbitControls())
    // }, 5000);

    // setTimeout(() => {
    //   this.createPlayer();
    //   this.world.setControls(new WHS.FirstPersonControls(this.player, {
    //   speed: 4,
    //   ypos: -10
    // }));}, 10000);
  }
}

var app = null;

function bootstrap() {
  app.start()
}

function configure() {
  return new Promise((resolve) => {
    app = new Game(Config);
    resolve(true);
  });
}

configure().then(() => bootstrap());
