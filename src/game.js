class Game {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.elves = [];
		this.bullets = [];
		this.weapons = [];
		this.christmasSpirit = 150;
		this.toolbarElements = [];
		this.spawnChance = 4;
		this.spawnSpeed = 5500; // ms
		this.spawnInterval;
		this.score = 0;
		this.inGame = true;
		this.dragDrop = new DragDrop(this);
		this.music = new Sound("assets/audio/JingleBellRock.mp3", 0.4, true)
		this.initElves();
		this.update();
	}

	initElves() {
		clearInterval(this.spawnInterval);
		this.spawnInterval = setInterval(() => {
			if (this.inGame) {
				this.addElf();
			}
		}, this.spawnSpeed);
	}

	update() {
		this.music.play();

		if (this.inGame) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			this.toolbarElements.forEach((element) => {
				element.draw();
			});
			this.weapons.forEach((weapon) => {
				weapon.update(this.ctx);
			});
			this.bullets.forEach((bullet) => {
				bullet.update(this.ctx);
				collision.bulletHitsSide(bullet, this);
			});
			this.elves.forEach((elf) => {
				elf.update(this.ctx);
				collision.elfHitsRightWall(elf, this);
				collision.elfHitsWeapon(elf, this);
				collision.elfHitsBullet(elf, this);
			});

			requestAnimationFrame(() => {
				this.update();
			});
		} else {
			this.endGame()
		}
	}

	addToolbarElements(imgSrc, x, y) {
		this.toolbarElements.push(new ToolbarElement(this, imgSrc, x, y));
	}

	addElf() {
		if(this.score >= 10 && this.score < 15 ) {
			this.initElves();
			this.spawnSpeed = 3000;
			this.spawnChance = 3;
		} else if(this.score >= 15 && this.score < 20) {
			this.initElves();
			this.spawnSpeed = 2000;
			this.spawnChance = 2;
		} else if(this.score > 20) {
			this.initElves();
			this.spawnChance = 2;
			this.spawnSpeed = 100;
		}
		if(Math.floor(Math.random() * 5) < this.spawnChance) {
			this.elves.push(new Elf(this, './assets/red-elf.png', 6, 0.5));

		} else {
			this.elves.push(new Elf(this, './assets/green-elf.png', 11, 0.3));
		}
	}

	removeElf(elf) {
		this.elves.splice(this.elves.indexOf(elf), 1);
	};

	addBullet(bullet) {
		this.bullets.push(bullet);
	}

	removeBullet(bullet) {
		this.bullets.splice(this.bullets.indexOf(bullet), 1);
	};

	addWeapon(weapon) {
		this.weapons.push(weapon)
	};

	removeWeapon(weapon) {
		this.weapons.splice(this.weapons.indexOf(weapon), 1);
	};

	endGame() {
		let canvasBG = document.getElementById("canvas-bg");
		let ctxBG = canvasBG.getContext('2d');
		ctxBG.clearRect(0, 0, canvasBG.width, canvasBG.height);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.font = "30px Lobster";
		setBG('bg_main.png', canvasBG);
		setTB('toolbar_bg.png', canvasBG);

		if (this.score == 1) {
			renderText(`You've renegotiated ${this.score} contract!`, this.canvas);
		} else {
			renderText(`You've renegotiated ${this.score} contracts!`, this.canvas);
		};
		this.music.stop();
	};
}
