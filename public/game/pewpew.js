export default class Pew {
  constructor(conf) {
    console.time("1");
    this.canvas = document.getElementById(conf.canvas);
    this.context = this.canvas.getContext("2d");
    this.interval = null;
    this.handImg = document.getElementById(conf.hand);

    this.handErrorIter = 0.0;
  }

  start() {
    this.interval = setInterval(() => {
      this.handErrorIter = (this.handErrorIter + 0.05) % (2 * Math.PI);
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
    let width = canvas.width;
    let height = canvas.height;
    let error = this.handErrorIter;

    context.drawImage(img,
      width / 3 - 0.005 * width * Math.cos(error),
      height / 2 - 0.01 * height * (Math.sin(2 * error) - 1),
      width / 2,
      height / 2);
  }

}
