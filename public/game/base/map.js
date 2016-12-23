import * as UTILS from './global';

export default function createMap(world) {
  const height = 50;
  //Начало четырех базовых стен
  new WHS.Box({
    geometry: [1000, 100, 50],
    mass: 999999,

    material: {
      color: UTILS.$colors.mesh,
      kind: 'lambert',
      map: WHS.texture('/static/brick.jpg', {repeat: {x: 100, y: 10}}),
    },

    position: [0, height, 500]
  }).addTo(world);

  new WHS.Box({
    geometry: [1000, 100, 50],
    mass: 999999,

    material: {
      color: UTILS.$colors.mesh,
      kind: 'lambert',
      map: WHS.texture('/static/brick.jpg', {repeat: {x: 100, y: 10}}),
    },

    position: [0, height, -500]
  }).addTo(world);

  new WHS.Box({
    geometry: [50, 100, 1000],
    mass: 999999,

    material: {
      color: UTILS.$colors.mesh,
      kind: 'lambert',
      map: WHS.texture('/static/brick.jpg', {repeat: {x: 100, y: 10}}),
    },

    position: [500, height, 0]
  }).addTo(world);

  new WHS.Box({
    geometry: [50, 100, 1000],
    mass: 999999,

    material: {
      color: UTILS.$colors.mesh,
      kind: 'lambert',
      map: WHS.texture('/static/brick.jpg', {repeat: {x: 100, y: 10}}),
    },

    position: [-500, height, 0]
  }).addTo(world);
  //Конец четырех базовых стен

  new WHS.Box({
    geometry: [100, 50, 100],
    mass: 999999,

    material: {
      color: UTILS.$colors.mesh,
      kind: 'lambert',
      map: WHS.texture('/static/camouflage.jpeg', {repeat: {x: 3, y: 3}}),
    },

    position: [300, height, 70]
  }).addTo(world);

  // new WHS.Box({
  //   geometry: [100, 10, 50],
  //   mass: 999999,
  //
  //   material: {
  //     color: UTILS.$colors.mesh,
  //     kind: 'lambert',
  //     map: WHS.texture('/static/tx2.jpg', {repeat: {x: 1, y: 1}}),
  //   },
  //
  //   position: [-300, 1, 70]
  // }).addTo(this.world);
  //
  // new WHS.Box({
  //   geometry: [50, 10, 40],
  //   mass: 999999,
  //
  //   material: {
  //     color: UTILS.$colors.mesh,
  //     kind: 'lambert',
  //     map: WHS.texture('/static/tx2.jpg', {repeat: {x: 1, y: 1}}),
  //   },
  //
  //   position: [-300, 1, -70]
  // }).addTo(this.world);
}