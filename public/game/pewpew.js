export default class Pew {
  constructor(conf) {
    console.time("1");
    this.canvas = document.getElementById(conf.canvas);
    this.context = this.canvas.getContext("2d");
    this.interval = null;
    this.handImg = document.getElementById(conf.hand);
  }

  start() {
    this.interval = setInterval(() => {
      this.resize();
      this.draw();
    }, 32);
  }

  stop() {
    clearInterval(this.interval);
    this.clear();
  }

  clear() {
    let canvas = this.canvas;
    let context = this.context;

    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  resize() {
    let canvas = this.canvas;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  draw() {
    let canvas = this.canvas;
    let context = this.context;
    let img = this.handImg;

    context.drawImage(img, canvas.width / 3, canvas.height / 2, canvas.width / 2, canvas.height / 2);
  }

}
