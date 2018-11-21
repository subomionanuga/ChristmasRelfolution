class Toolbar{
    constructor(game,imgSrc, x, y){
        this.img = new Image();
        this.img.src = imgSrc;
        this.game = game;
        this.elementX = x;
        this.y = y;
        this.init();
    }

    draw(){
        this.game.ctx.drawImage(this.img, this.elementX, this.y);
        this.displayScore();
    }

    displayScore(){
        this.game.ctx.fillStyle = 'blue'
        this.game.ctx.font = "20px Arial";
        this.game.ctx.fillText(` ${this.game.chrstmasSpirit}`, 725, 650);
    
    }
    init(){
        this.game.canvas.addEventListener('mousedown', (event)  => {
            if(event.x > this.elementX && event.x < this.elementX + 100 && event.y > this.y && event.y < (this.y + 100) && this.game.christmasSpirit >= 50) {
                this.game.addWeapon(new GingerbreadMan(0, 600, this.game));
                this.game.christmasSpirit -= 50; 
            }
        }, true);
    }

}