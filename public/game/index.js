import * as UTILS from './base/global';
import GlitchPass from './glick';
import createMap from './base/map';
import generateTable from './base/generateTable';
import Pew from './pewpew';

let pewConfig = {
  canvas: "pew-pew",
  hand: "pew-hand",
  shoot: "pew-shoot"
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
    this.killed = false;
    this.leaderboard = false;

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
          if (!this.leaderboard) {
            generateTable(data.players, this.id);
            this.leaderboard = true;
          }

          if (data.shot) {
            console.log('В тебя попали');
            this.toggleGlick(0);
            setTimeout(() => {
              this.toggleGlick(1)
            }, 500)
          }

          if (document.querySelector('.hp').innerHTML != data.hp) {
            document.querySelector('.hp').innerHTML = data.hp;
          }

          if (data.hp === 0) {
            let time = 3;

            const interval = setInterval( () => {
              if (time === -1) {
                clearInterval(interval);
                return
              }
              document.querySelector('.time-reborn').innerHTML = time;
              time--;

            } , 1000);

            document.querySelector('.time-reborn').innerHTML = time;

            document.querySelector('.blocker-kill').style.display = 'block';
            this.killed = true;

            setTimeout(() => {
              document.querySelector('.blocker-kill').style.display = 'none';
              this.killed = false;

              function getRandomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
              }

              const coordinate = [
                {x: 344, y: 3, z: -393},
                {x: 401, y: 3, z: 390},
                {x: -472, y: 3, z: 408},
                {x: -449, y: 3, z: -461}
              ];
              this.player.position.copy(coordinate[getRandomNumber(0, 3)]);
            }, 3100)
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
                }, 4000);

                this.world.remove(this.players[`id${element.id}`]);
                setTimeout(() => {
                  this.players[`id${element.id}`].addTo(this.world);
                }, 3000);
              });
              generateTable(data.players, this.id);
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
      if(this.killed) {
        return;
      }

      pew.shoot();

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

    window.addEventListener('keydown', event => {
      if (event.keyCode === 9) {
        event.preventDefault();
        document.querySelector('.leaderboard').style.display = 'block';
      }
    });

    window.addEventListener('keyup', event => {
      if (event.keyCode === 9) {
        event.preventDefault();
        document.querySelector('.leaderboard').style.display = 'none';
      }
    });

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
      if (this.killed) {
        position = {
          x: -9999,
          y: -9999,
          z: -9999
        }
      }

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

      mass: 3,

      material: {
        color: UTILS.$colors.mesh,
        kind: 'lambert'
      },

      position: [100, 3, 100]
    });

    this.player.addTo(this.world);
  }

  start() {
    this.world.start();

    this.world.setControls(new WHS.FirstPersonControls(this.player, {
      speed: 5,
      ypos: -50
    }));
  }
}

var app = null;

function bootstrap() {
  app.start();
  setTimeout(() => {
    document.querySelector('.main-block').style.display = 'none';
    clearInterval(globalInterval);
  }, 1000);
}

function configure() {
  return new Promise((resolve) => {
    app = new Game(Config);
    resolve(true);
  });
}

configure().then(() => bootstrap());
