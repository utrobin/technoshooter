import * as WHS from '@whs';
import * as THREE from '@three';
import FBXLoaderPack from '../lib/FBXLoader';

const FBXLoader = FBXLoaderPack(THREE);

console.log(FBXLoader);

class GameAPI {
  step(type) {
    this[`step_${type}`]();
  }
}

export default class Game extends GameAPI {
  constructor() {
    super();

    this.modules = {
      element: new WHS.app.ElementModule(),
      scene: new WHS.app.SceneModule(),
      camera: new WHS.app.CameraModule({
        position: {
          x: 0,
          y: 0,
          z: 10
        }
      }),
      rendering: new WHS.app.RenderingModule(),
      controls: new WHS.controls.OrbitModule(),
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

    this.step('initial');
    this.app.start();
  }

  step_initial() {
    const {app} = this;

    new WHS.Model({
      geometry: {
        path: '/static/assets/models/json/harold2.json'
      },
      material: new THREE.MeshBasicMaterial({color: 0x00ff00}),
      useCustomMaterial: true,
      scale: [0.1, 0.1, 0.1]
    }).addTo(app).then(o => {
      console.log(o.native.geometry);
    });

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
}
