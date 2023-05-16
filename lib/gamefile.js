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
        this.input.on('pointerdown', () => this.scene.start('scene2'));
        }
    }

class Scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }

    preload() {
        this.load.image('bg1', 'images/random_street.jpg');
        this.load.image('alfred', 'images/alfred.png');
        this.load.image('arrow', 'images/arrow.png');
    }

    create() {
        this.cameras.main.fadeIn(1000);
        let bg1 = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg1')
        .setOrigin(0.5)
        bg1.setScale(2)

        this.platforms = this.physics.add.staticGroup();
        
        let street = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/1.03, 980, 40, 0x8D948D)
        street.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(street, true);
        street.body.immovable = true;
        this.platforms.add(street);

        let p1 = this.add.rectangle(500, 405, 100, 390, 0xD6AE01)
        p1.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p1, true);
        p1.body.immovable = true;
        this.platforms.add(p1);

        let p2 = this.add.rectangle(300, 475, 100, 250, 0xD6AE01)
        p2.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p2, true);
        p2.body.immovable = true;
        this.platforms.add(p2);

        let p3 = this.add.rectangle(200, 525, 100, 150, 0xD6AE01)
        p3.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p3, true);
        p3.body.immovable = true;
        this.platforms.add(p3);

        let p4 = this.add.rectangle(600, 475, 100, 250, 0xD6AE01)
        p4.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p4, true);
        p4.body.immovable = true;
        this.platforms.add(p4);

        let p5 = this.add.rectangle(800, 525, 100, 150, 0xD6AE01)
        p5.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p5, true);
        p5.body.immovable = true;
        this.platforms.add(p5);



        this.player = this.physics.add.sprite(50,400, 'alfred')
        .setScale(0.4)
        .setBounce(0.1)
        .setCollideWorldBounds(true)
        .setGravityY(10);
        this.physics.add.collider(this.player, this.platforms);

        this.arrow = this.add.image(900, 100, 'arrow')
        .setScale(0.3)
        this.physics.add.existing(this.arrow, true);
        this.arrow.body.immovable = true;

        this.physics.add.collider(this.player, this.arrow, this.goNext, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        //this.input.on('pointerdown', () => this.scene.start('scene2'));
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown & this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    goNext() {
        this.scene.start('scene2')
    }
}


class Scene2 extends Phaser.Scene {
    constructor() {
        super('scene2');
    }

    preload() {
        this.load.image('button', 'images/button.png')
    }

    create() {
        let txt = this.add.text(this.cameras.main.width/2, this.cameras.main.height/5, 'Level Completed!')
        .setOrigin(0.5)
        .setFontSize(100)
        .setFontFamily('Impact');
        txt.alpha = 0

        this.add.tween({
            targets: txt,
            scale: 1.3,
            alpha: 1
        })
        let txt2 = this.add.text(this.cameras.main.width*0, this.cameras.main.height * 0.4, 'Time:')
        .setOrigin(0.5)
        .setFontSize(50)
        .setFontFamily('Impact');
        txt2.alpha = 0

        this.add.tween({
            targets: txt2,
            delay: 2000,
            alpha: 1,
            x: 350
        })
        let txt3 = this.add.text(this.cameras.main.width*0, this.cameras.main.height * 0.5, 'Score:')
        .setOrigin(0.5)
        .setFontSize(50)
        .setFontFamily('Impact');
        txt3.alpha = 0

        this.add.tween({
            targets: txt3,
            delay: 3000,
            alpha: 1,
            x: 350
        })
        let txt4 = this.add.text(this.cameras.main.width*0, this.cameras.main.height * 0.6, 'Items Collected:')
        .setOrigin(0.5)
        .setFontSize(50)
        .setFontFamily('Impact');
        txt4.alpha = 0

        this.add.tween({
            targets: txt4,
            delay: 4000,
            alpha: 1,
            x: 350
        })

        let button = this.add.image(this.cameras.main.width/2, this.cameras.main.height/1.15, 'button')
        .setScale(0.9)
        .setInteractive()
        .on('pointerover', () => {
            this.add.tween ({
            targets: button,
            scale: 1.05,
            duration: 500,
            yoyo: true,
            repeat: 0
        })
        })
        button.alpha = 0
        button.on('pointerdown', () => {
            this.scene.start('scene3')
            this.cameras.main.fadeOut(2000)
        })

        this.add.tween({
            targets: button,
            delay: 5000,
            alpha: 1
        })
        //this.input.on('pointerdown', () => this.scene.start('scene3'));
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

        let tip = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'To run like the wind, tap the left or right key!')
        .setOrigin(0.5)
        .setFontSize(30)
        .setFontFamily('Comic Sans MS');
        tip.setStroke('#000000', 8);

        let tip2 = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Jorge Gonzalez made this tween!')
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
            this.cameras.main.fadeOut(5000);
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

// this scene displays the new weapon achieved screen
// scene 6: complete
class Scene6 extends Phaser.Scene {
    constructor() {
        super('scene6');
    }

    preload() {
        this.load.image('bg4', 'images/background_weapon.png')
        this.load.image('sword', 'images/sword.png')
        this.load.image('button', 'images/button.png')
    }

    create() {

        this.cameras.main.fadeIn(1000);
        this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg4')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.gotoScene('intro')
        })
        let sword = this.add.image(this.cameras.main.width/2, this.cameras.main.height/1.7, 'sword')
        .setOrigin(0.5)
        .setScale(0.7)
        let x = this.add.text(this.cameras.main.width/2, this.cameras.main.height/4.5, 'New Weapon Achieved!')
        .setOrigin(0.5)
        .setFontSize(70)
        .setFontFamily('Impact');
        x.setStroke('#000000', 16);
        x.setInteractive();

        let button = this.add.image(this.cameras.main.width/1.3, this.cameras.main.height/1.1, 'button')
        .setOrigin(0.5)
        .setScale(0.7)
        .setInteractive()
        .on('pointerover', () => {
            this.add.tween ({
            targets: button,
            scale: 0.9,
            duration: 500,
            yoyo: true,
            repeat: -1
        })
        })
        button.alpha = 0
        button.on('pointerdown', () => {
            this.scene.start('outro')
            this.cameras.main.fadeOut(2000)
        })

        this.add.tween({
            targets: button,
            delay: 5000,
            alpha: 1
        })

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
    }
}

// outro scene: complete
class Outro extends Phaser.Scene{
    constructor() {
        super('outro')
    }

    create() {
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Thanks for playing!')
        .setOrigin(0.5)
        .setFontSize(70)
        .setFontFamily('Comic Sans MS');
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/1.5, 'Click anywhere to start again!')
        .setOrigin(0.5)
        .setFontSize(40)
        .setFontFamily('Comic Sans MS');
        this.input.on('pointerdown', () => this.scene.start('intro'));
        }
}

new Phaser.Game({
    width: 980,
    height: 640,
    scene: [Intro, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Outro],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
})