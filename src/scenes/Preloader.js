import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.image('logo', 'logo.png');
        this.load.image("cesped", "cesped.png");
        this.load.image("bloqueNormal", "bloque.png");
        this.load.image("tuboCorto", "tuboCorto.png");
        this.load.image("tuboMediano", "tuboMediano.png");
        this.load.image("tuboLargo", "tuboLargo.png");
        this.load.image("bloqueInmovil", "bloqueInmovil.png")
        this.load.image("castillo", "castillo.png")
        this.load.image("bandera", "bandera.png")
        this.load.spritesheet("personaje", "mario.png" , { frameWidth: 18, frameHeight: 16 });
        this.load.spritesheet("goomba", "enemigo.png" , { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("bloqueMisterioso", "bloque-misterioso.png" , { frameWidth: 16, frameHeight: 16});
    }

    create ()
    {
          // Crear la animación de personaje
          this.anims.create({
            key: 'personaje-camina',
            frames: this.anims.generateFrameNumbers('personaje', { start: 1, end: 3}), 
            frameRate: 12, 
            repeat: -1 
        });

        //animacion saltar
        this.anims.create({
            key: 'personaje-salta',
            frames: [{ key: 'personaje', frame: 5 }], 
            frameRate: 1,  
            repeat: 0
        });

    //animacion morir
    this.anims.create({
        key: 'personaje-muere',
        frames: [{ key: 'personaje', frame: 4}], 
        frameRate: 1,  
        repeat: 0
    });

//animacion de bloque misterioso
          this.anims.create({
            key: 'bloqueMisteriosoAnim',
            frames: this.anims.generateFrameNumbers('bloqueMisterioso', { start: 0, end: 2}), 
            frameRate: 3, 
            repeat: -1 
        });
        //enemigo muerte GOOMBA
        this.anims.create({
            key: 'goomba-muerte',
            frames: [{ key: 'goomba', frame: 2 }], 
            frameRate: 1,  
            repeat: 0
        });
        //animacion caminar goomba
        this.anims.create({
            key: 'goomba-camina',
            frames: this.anims.generateFrameNumbers('goomba', { start: 0, end: 1}), 
            frameRate: 12, 
            repeat: -1 
        });

        this.scene.start('MainMenu');
    }
}
