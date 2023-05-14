// intro scene: complete
class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }

    create() {
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, "Click to start!")
        .setOrigin(0.5)
        .setFontSize(70)
        .setFontFamily('Comic Sans MS');
        this.input.on('pointerdown', () => this.scene.start('scene1'));
        }
    }

class Scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }

    preload() {
        this.load.image('bg1', 'images/random_street.jpg');
    }

    create() {
        let bg1 = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg1')
        .setOrigin(0.5)
        bg1.setScale(2)

        this.input.on('pointerdown', () => this.scene.start('scene2'));
    }
}


class Scene2 extends Phaser.Scene {
    constructor() {
        super('scene2');
    }

    preload() {

    }

    create() {
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/5, 'Level Completed!')
        .setOrigin(0.5)
        .setFontSize(100)
        .setFontFamily('Impact');
        this.add.text(this.cameras.main.width/3, this.cameras.main.height*0.4, 'Time:')
        .setOrigin(0.5)
        .setFontSize(50)
        .setFontFamily('Impact');
        this.add.text(this.cameras.main.width/3, this.cameras.main.height*0.5, 'Score:')
        .setOrigin(0.5)
        .setFontSize(50)
        .setFontFamily('Impact');
        this.add.text(this.cameras.main.width/3, this.cameras.main.height * 0.6, 'Items Collected:')
        .setOrigin(0.5)
        .setFontSize(50)
        .setFontFamily('Impact');

        this.input.on('pointerdown', () => this.scene.start('scene3'));
    }
}

class Scene3 extends Phaser.Scene {
    constructor() {
        super('scene3');
    }

    preload() {
        this.load.image('bg2', 'images/blurry_street.jpg')
    }

    create() {
        let bg2 = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg2')
        .setOrigin(0.5)
        bg2.setScale(3.7)

        this.input.on('pointerdown', () => this.scene.start('scene4'));
    }
}

class Scene4 extends Phaser.Scene {
    constructor() {
        super('scene4');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#705335');
    }
    create() {
        let loading = this.add.text(this.cameras.main.width/3, this.cameras.main.height/1.3, 'Loading')
        .setOrigin(0.5)
        .setFontSize(100)
        .setFontFamily('Impact');
        loading.setStroke('#000000', 16);

        let square = this.add.rectangle(this.cameras.main.width/1.5, this.cameras.main.height/1.3, 75, 75, 0xc9bdbd)
        square.setStrokeStyle(6, 0x000000)

        let tip = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'To run like the wind, tap the left or right key')
        .setOrigin(0.5)
        .setFontSize(30)
        .setFontFamily('Comic Sans MS');
        tip.setStroke('#000000', 8);

        let tip2 = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Jorge Gonzalez made this tween')
        .setOrigin(0.5)
        .setFontSize(30)
        .setFontFamily('Comic Sans MS');
        tip2.setStroke('#000000', 8);
        tip2.alpha = 0

        this.add.tween({
            targets: tip,
            delay: 3000,
            alpha: {from: 1, to: 0},
            duration: 2000,
        })

        this.add.tween({
            targets: tip2,
            alpha: {from: 0, to: 1},
            duration: 2000,
        })

        this.add.tween({
            targets: square,
            duration: 2000,
            repeat: -1,
            angle: 360,
        })
    }
}

class Scene5 extends Phaser.Scene {
    constructor() {
        super('scene5');
    }
}

class Scene6 extends Phaser.Scene {
    constructor() {
        super('scene6');
    }
}

new Phaser.Game({
    width: 980,
    height: 640,
    scene: [Intro, Scene1, Scene2, Scene3, Scene4],
})