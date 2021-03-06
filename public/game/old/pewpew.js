class Shoot {
  constructor() {
    this.cond = 0;
    this.dispersionX = 2 * Math.random() - 1;
    this.dispersionY = 2 * Math.random() - 1;
  }

  next() {
    return ++this.cond;
  }

  num() {
    return this.cond;
  }
}


export default class Pew {
  constructor(conf) {
    console.time("1");
    this.canvas = document.getElementById(conf.canvas);
    this.context = this.canvas.getContext("2d");
    this.interval = null;
    this.handImg = document.getElementById(conf.hand);
    this.shootImg = document.getElementById(conf.shoot);

    this.handErrorIter = 0.0;
    this.shoots = [];
  }

  start() {
    this.interval = setInterval(() => {
      this.handErrorIter = (this.handErrorIter + 0.05) % (2 * Math.PI);
      this.shoots.forEach((el, iter, arr)=> {
        if (el.num() > 12) {
          arr.splice(iter, 1);
        }
      });
      this.resize();
      this.clear();
      this.draw();
    }, 50);
  }

  shoot() {
    this.shoots.push(new Shoot());
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
    let shootImg = this.shootImg;
    let width = canvas.width;
    let height = canvas.height;
    let error = this.handErrorIter;

    this.shoots.forEach((el) => {
      let iter = el.next();
      context.drawImage(shootImg,
        39 * iter, 0,
        39, 40,
        width / 1.8 - 0.005 * width * Math.cos(error),
        height / 1.75 - 0.01 * height * (Math.sin(2 * error) - 1),
        width / 20,
        height / 20);

    });

    context.drawImage(img,
      width / 1.85 - 0.005 * width * Math.cos(error),
      height / 1.9 - 0.02 * height * (Math.sin(2 * error) - 1),
      width / 1.8,
      height / 1.8);
  }

}
