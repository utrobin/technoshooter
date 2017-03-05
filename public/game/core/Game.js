import * as WHS from '@whs';
import * as THREE from '@three';
import * as PHYSICS from 'physics-module-ammonext';
import { getCoordinates, minRandom, maxRandom } from '../tools/getCoordinates';
import FBXLoaderPack from '../lib/FBXLoader';
import createMap from '../map/createMap';

window.WHS = WHS;

const FBXLoader = FBXLoaderPack(THREE);

const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const address = `${protocol}//${location.host}/api/game`;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Game {
  constructor() {
    this.modules = {
      element: new WHS.app.ElementModule(),
      scene: new WHS.app.SceneModule(),
      camera: new WHS.app.CameraModule({
        far: 3000,
        position: {
          x: 0,
          y: 100,
          z: 100
        }
      }),
      rendering: new WHS.app.RenderingModule( ),
      autoresize: new WHS.app.ResizeModule()
    };

    const {element, scene, camera, rendering, controls, autoresize} = this.modules;

    this.app = new WHS.App([
      element,
      scene,
      camera,
      rendering,
      controls,
      autoresize
    ]);

    this.addPlane(this.app);
    this.createPlayer();
    createMap(this.app);

    this.initial();
  }

  addPlane(world, size = 1200) {
    return new WHS.Plane({
      geometry: {
        width: size,
        height: size
      },

      modules: [
        new PHYSICS.PlaneModule({
          mass: 0
        }),
        new WHS.mesh.TextureModule({
          url: `/static/green.jpg`,
          repeat: new THREE.Vector2(300, 300)
        })
      ],

      material: new THREE.MeshPhongMaterial({color: 0x447F8B}),

      rotation: {
        x: -Math.PI / 2
      }
    }).addTo(world);
  }

  addObject() {
    createMap(this.app);
  }

  initial() {
    const {app} = this;

    // new WHS.Model({
    //   geometry: {
    //     path: '/static/assets/models/json/harold2.json'
    //   },
    //   material: new THREE.MeshBasicMaterial({color: 0x00ff00}),
    //   useCustomMaterial: true,
    //   scale: [0.1, 0.1, 0.1]
    // }).addTo(app);

    // new WHS.Sphere({
    //   material: new THREE.MeshLambertMaterial({color: 0xffffff})
    // }).addTo(app);

    new WHS.AmbientLight({
      light: {
        intensity: 0.8
      }
    }).addTo(app);
  }

  afterLoading() {
    document.querySelector('.main-block').style.display = 'none';
  }

  createPlayer() {
    const coordinate = getCoordinates[getRandomNumber(minRandom, maxRandom)];

    this.player = new WHS.Sphere({
      geometry: {
        radius: 3,
        widthSegments: 32,
        heightSegments: 32
      },
      position: [coordinate.x, coordinate.y, coordinate.z],

      modules: [
        new PHYSICS.BoxModule({
          mass: 3,
          restitution: 0.1
        }),
      ],

      material: new THREE.MeshBasicMaterial({
        color: 0xffffff
      }),
    });

    this.player.addTo(this.app);
  }

  start() {
    this.app.start();

    console.log(this.player)
    this.app.applyModule(
      new PHYSICS.FirstPersonModule(this.player, {
        speed: 500,
        ypos: 150
      }),
    );
    // this.world.setControls(new WHS.FirstPersonControls(this.player, {
    //   speed: 5,
    //   ypos: -50
    // }));
  }
}
