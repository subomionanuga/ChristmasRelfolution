class Toolbar{
    constructor(game,imgSrc){
        this.img = new Image();
        this.img.src = imgSrc;
        this.game = game;
        this.counter = 0;
        this.init();
    }

    draw(){
        this.game.ctx.drawImage(this.img, this.counter, 600);
        this.init();
    }

    init(){
        var that = this;
        this.game.canvas.addEventListener('click', (event)  => {
            if(event.x > that.counter && event.x < that.counter + 100 && event.y > 600 && event.y < 700) {
                //if(that.imgSrc == './assets/gbm.png') {
                console.log('im clicked');
                if (that.counter < 3){
                    that.game.addWeapon(new Weapon(0, 700, that));
                }
                that.counter += 1;
               // }
            }
        }, true);
    }

}