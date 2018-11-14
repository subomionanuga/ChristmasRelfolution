
class Elf {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.x = 50;
    this.y = Math.floor(Math.random() * 6) * 100 + 50;
    this.dx = 2;
    this.draw();
  }
  
  draw() {
    let img = new Image();
    img.src = ('./elf.png');
    this.ctx.drawImage(img, this.x, this.y);
  }

  update() {
    if(this.x < this.canvas.width) {
      this.x += this.dx;
    }
    this.draw();
  }
}
