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

// scene one: complete
class Scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }

    preload() {
        this.load.image('bg1', 'images/random_street.jpg');
        this.load.image('alfred', 'images/alfred.png');
        this.load.image('arrow', 'images/arrow.png');
        this.load.image('gem', 'images/gem.png');
        this.load.image('restart', 'images/restart.png');
        this.load.audio('ding', 'audio/ding_sound.mp3');
        this.load.audio('main', 'audio/main_theme.mp3');
    }

    create() {
        this.cameras.main.fadeIn(1000);
        let bg1 = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg1')
        .setOrigin(0.5)
        bg1.setScale(2)

        let theme = this.sound.add('main')
        theme.play()

        let ding = this.sound.add('ding')

        let restart = this.add.image(50, 50, 'restart')
        .setScale(0.2)
        .setInteractive()
        restart.on('pointerdown', () => {
            ding.play()
            theme.stop()
            this.scene.start('scene1')
            this.cameras.main.fadeOut(2000)
        })

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

        
        this.gems1 = this.add.image(300, 300, 'gem')
        .setScale(0.5)
        this.physics.add.existing(this.gems1, true);
        this.gems1.body.immovable = true;

        this.gems2 = this.add.image(500, 150, 'gem')
        .setScale(0.5)
        this.physics.add.existing(this.gems2, true);
        this.gems2.body.immovable = true;
    


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

        this.physics.add.collider(this.player, this.gems1, this.collectGem, null, this);
        this.physics.add.collider(this.player, this.gems2, this.collectGem2, null, this);
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

    collectGem() {
        this.gems1.destroy();

    }

    collectGem2() {
        this.gems2.destroy();
    }

    goNext() {
        this.scene.start('scene2')
    }
}

//scene two: complete
class Scene2 extends Phaser.Scene {
    constructor() {
        super('scene2');
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

        let tip = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Gems are shiny!')
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

        this.time.delayedCall(11000, () => this.scene.start('scene3'));
    }
}

// scene three: complete
class Scene3 extends Phaser.Scene {
    constructor() {
        super('scene3');
    }

    preload() {
        this.load.image('bg2', 'images/blurry_street.jpg');
        this.load.image('alfred', 'images/alfred.png');
        this.load.image('arrow', 'images/arrow.png');
        this.load.image('gem', 'images/gem.png');
        this.load.image('restart', 'images/restart.png');
        this.load.audio('ding', 'audio/ding_sound.mp3');
        this.load.audio('main', 'audio/main_theme.mp3');
    }

    create() {
        this.cameras.main.fadeIn(1000);
        let bg2 = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg2')
        .setOrigin(0.5)
        bg2.setScale(3.7)

        let theme = this.sound.add('main')
        theme.play()

        let ding = this.sound.add('ding')

        let restart = this.add.image(50, 50, 'restart')
        .setScale(0.2)
        .setInteractive()
        restart.on('pointerdown', () => {
            ding.play()
            theme.stop()
            this.scene.start('scene3')
            this.cameras.main.fadeOut(2000)
        })

        this.platforms = this.physics.add.staticGroup();
        
        let street = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/1.03, 980, 40, 0x8D948D)
        street.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(street, true);
        street.body.immovable = true;
        this.platforms.add(street);

        let p2 = this.add.rectangle(200, 350, 100, 30, 0xD6AE01)
        p2.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p2, true);
        p2.body.immovable = true;
        this.platforms.add(p2);

        let p3 = this.add.rectangle(100, 470, 100, 30, 0xD6AE01)
        p3.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p3, true);
        p3.body.immovable = true;
        this.platforms.add(p3);

        let p4 = this.add.rectangle(500, 300, 100, 30, 0xD6AE01)
        p4.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p4, true);
        p4.body.immovable = true;
        this.platforms.add(p4);

        let p5 = this.add.rectangle(700, 200, 30, 30, 0xD6AE01)
        p5.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p5, true);
        p5.body.immovable = true;
        this.platforms.add(p5);

        this.gems = this.add.image(500, 150, 'gem')
        .setScale(0.5)
        this.physics.add.existing(this.gems, true);
        this.gems.body.immovable = true;
    


        this.player = this.physics.add.sprite(50,400, 'alfred')
        .setScale(0.3)
        .setBounce(0.1)
        .setCollideWorldBounds(true)
        .setGravityY(6);
        this.physics.add.collider(this.player, this.platforms);

        this.arrow = this.add.image(900, 100, 'arrow')
        .setScale(0.3)
        this.physics.add.existing(this.arrow, true);
        this.arrow.body.immovable = true;

        this.physics.add.collider(this.player, this.gems, this.collectGem, null, this);
        this.physics.add.collider(this.player, this.arrow, this.goNextScene, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
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
            this.player.setVelocityY(-300);
        }
    }

    collectGem() {
        this.gems.destroy();

    }

    goNextScene() {
        this.scene.start('scene4')
    }
}

// scene four: complete 
class Scene4 extends Phaser.Scene {
    constructor() {
        super('scene4');
    }

    preload() {
        this.load.image('button', 'images/button.png')
        this.load.audio('ding', 'audio/ding_sound.mp3');
    }

    create() {
        let txt = this.add.text(this.cameras.main.width/2, this.cameras.main.height/5, 'Level Completed!')
        .setOrigin(0.5)
        .setFontSize(100)
        .setFontFamily('Impact');
        txt.alpha = 0

        let ding = this.sound.add('ding');

        this.add.tween({
            targets: txt,
            scale: 1.3,
            alpha: 1
        })

        let txt2 = this.add.text(this.cameras.main.width*0, this.cameras.main.height * 0.4, 'Score:')
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

        let txt2_r = this.add.text(this.cameras.main.width/1, this.cameras.main.height * 0.4, '80808')
        .setOrigin(0.5)
        .setFontSize(50)
        .setFontFamily('Impact');
        txt2_r.alpha = 0

        this.add.tween({
            targets: txt2_r,
            delay: 2000,
            alpha: 1,
            x: 600
        })

        let txt3 = this.add.text(this.cameras.main.width*0, this.cameras.main.height * 0.5, 'Gems Collected:')
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

        let txt3_r = this.add.text(this.cameras.main.width/1, this.cameras.main.height * 0.5, '3/3')
        .setOrigin(0.5)
        .setFontSize(50)
        .setFontFamily('Impact');
        txt3_r.alpha = 0

        this.add.tween({
            targets: txt3_r,
            delay: 3000,
            alpha: 1,
            x: 600
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
            ding.play()
            this.scene.start('scene5')
            this.cameras.main.fadeOut(2000)
        })

        this.add.tween({
            targets: button,
            delay: 5000,
            alpha: 1
        })
    }
}

// scene five: complete
class Scene5 extends Phaser.Scene {
    constructor() {
        super('scene5');
    }

    preload() {
        this.load.image('bg3', 'images/random_alley.jpg')
        this.load.image('alfred', 'images/alfred.png');
        this.load.image('sword', 'images/sword.png');
        this.load.image('restart', 'images/restart.png');
        this.load.audio('ding', 'audio/ding_sound.mp3');
        this.load.audio('main', 'audio/main_theme.mp3');
    }

    create() {
        this.cameras.main.fadeIn(1000);
        this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg3')
        .setOrigin(0.5)

        let theme = this.sound.add('main')
        theme.play()

        let ding = this.sound.add('ding')

        let restart = this.add.image(50, 50, 'restart')
        .setScale(0.2)
        .setInteractive()
        restart.on('pointerdown', () => {
            ding.play()
            theme.stop()
            this.scene.start('scene5')
            this.cameras.main.fadeOut(2000)
        })

        this.platforms = this.physics.add.staticGroup();
        
        let street = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/1.03, 980, 40, 0x8D948D)
        street.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(street, true);
        street.body.immovable = true;
        this.platforms.add(street);

        let p1 = this.add.rectangle(200, 350, 100, 30, 0xD6AE01)
        p1.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p1, true);
        p1.body.immovable = true;
        this.platforms.add(p1);

        let p2 = this.add.rectangle(100, 470, 100, 30, 0xD6AE01)
        p2.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p2, true);
        p2.body.immovable = true;
        this.platforms.add(p2);

        let p3 = this.add.rectangle(600, 300, 100, 30, 0xD6AE01)
        p3.setStrokeStyle(6, 0x000000)
        this.physics.add.existing(p3, true);
        p3.body.immovable = true;
        this.platforms.add(p3);


        this.player = this.physics.add.sprite(50,400, 'alfred')
        .setScale(0.3)
        .setBounce(0.1)
        .setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platforms);

        this.sword = this.add.image(900, 100, 'sword')
        .setScale(0.3)
        this.physics.add.existing(this.sword, true);
        this.sword.body.immovable = true;

        this.physics.add.collider(this.player, this.sword, this.goNextScene, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
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
            this.player.setVelocityY(-300);
        }
    }
    goNextScene() {
        this.scene.start('scene6')
    }
}

// scene six: complete
class Scene6 extends Phaser.Scene {
    constructor() {
        super('scene6');
    }

    preload() {
        this.load.image('bg4', 'images/background_weapon.png');
        this.load.image('sword', 'images/sword.png');
        this.load.image('button', 'images/button.png');
        this.load.audio('ding', 'audio/ding_sound.mp3');
    }

    create() {

        this.cameras.main.fadeIn(1000);
        this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bg4')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.gotoScene('intro')
        })

        let ding = this.sound.add('ding')
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
            ding.play()
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