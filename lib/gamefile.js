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
        this.input.on('pointerdown', () => this.scene.start('scene6'));
        }
    }

class Scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }

    preload() {
        this.load.image('bg1', 'images/random_street.jpg');
        this.load.spritesheet('alfred', 'images/alfredmove.png', {frameWidth: 1796, frameHeight: 1796});
    }

    create() {
        this.cameras.main.fadeIn(1000);
        let bg1 = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg1')
        .setOrigin(0.5)
        bg1.setScale(2)

        let alfred = this.physics.add.image(200, 200, 'alfred');

        let cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('alfred', {start: 1, end: 2}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'standing',
            frames: [ { key: 'alfred', frame: 0 } ],
            frameRate: 20,
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('alfred', {start: 1, end: 2}),
            frameRate: 10,
            repeat: -1
        })

        this.input.on('pointerdown', () => this.scene.start('scene2'));
    }

    update() {
        const {left, right} = this.cursors;

        if (left.isDown) {
            this.player.anims.play('left', true);
        }

        else if (right.isDown) {
            this.player.anims.play('right', true);
        }
        else {
            this.player.anims.play('standing');
        }

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
        this.cameras.main.fadeIn(1000);
        let bg2 = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg2')
        .setOrigin(0.5)
        bg2.setScale(3.7)

        this.input.on('pointerdown', () => this.scene.start('scene4'));
    }
}

// this scene displays tips and loading screen
// scene 4: complete
class Scene4 extends Phaser.Scene {
    constructor() {
        super('scene4');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#705335');
    }
    create() {
        this.cameras.main.fadeIn(1000);
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

        let tip3 = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Can the screen change already? Please.')
        .setOrigin(0.5)
        .setFontSize(30)
        .setFontFamily('Comic Sans MS');
        tip3.setStroke('#000000', 8);
        tip3.alpha = 0
        
        // tip1 settings
        this.add.tween({
            targets: tip,
            alpha: 0,
            delay: 2000, 
            duration: 2000,
        })
        // tip2 settings-part1
        this.add.tween({
            targets: tip2,
            alpha: 1,
            delay: 4000,
            duration: 2000,
        })
        // tip2 settings-part2
        this.add.tween({
            targets: tip2,
            alpha: 0,
            delay: 6000,
            duration: 2000,
        })
        // tip3 settings
        this.add.tween({
            targets: tip3,
            alpha: 1,
            delay: 8000,
            duration: 2000,
        })
        // square settings
        this.add.tween({
            targets: square,
            duration: 2000,
            repeat: -1,
            angle: 360,
        })

        this.time.delayedCall(10000, () => {
            this.cameras.main.fadeOut(3000);
        });

        this.time.delayedCall(11000, () => this.scene.start('scene5'));
    }
}

class Scene5 extends Phaser.Scene {
    constructor() {
        super('scene5');
    }

    preload() {
        this.load.image('bg3', 'images/random_alley.jpg')
    }

    create() {
        this.cameras.main.fadeIn(1000);
        this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg3')
        .setOrigin(0.5)

        this.input.on('pointerdown', () => this.scene.start('scene6'));
    }
}

class Scene6 extends Phaser.Scene {
    constructor() {
        super('scene6');
    }

    preload() {
        this.load.image('bg4', 'images/background_weapon.png')
        this.load.image('sword', 'images/sword.png')
    }

    create() {

        this.cameras.main.fadeIn(1000);
        this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg4')
        .setOrigin(0.5)
        let sword = this.add.image(this.cameras.main.width/2, this.cameras.main.height/1.7, 'sword')
        .setOrigin(0.5)
        .setScale(0.7)
        let x = this.add.text(this.cameras.main.width/2, this.cameras.main.height/4.5, 'New Weapon Achieved!')
        .setOrigin(0.5)
        .setFontSize(70)
        .setFontFamily('Impact');
        x.setStroke('#000000', 16);
        x.setInteractive();

        this.add.tween({
            targets: x,
            scale: 1.05,
            duration: 500,
            yoyo: true,
            alpha: {from: 0, to: 1},
            repeat: -1
        })

        this.add.tween({
            targets: sword,
            scale: 0.9,
            duration: 500,
            yoyo: true,
            repeat: -1
        })

        this.time.delayedCall(3000, () => {
            this.cameras.main.fadeOut(3000);
        });
    }
}

new Phaser.Game({
    width: 980,
    height: 640,
    scene: [Intro, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6],
})