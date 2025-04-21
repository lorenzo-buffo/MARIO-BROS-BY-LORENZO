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
        this.load.image('LOGO', 'LOGO.png');
        this.load.image("cesped", "cesped.png");
        this.load.image("suelo", "suelo2.png");
        this.load.image("suelo2", "suelo3.png");
        this.load.image("bloqueNormal", "bloque.png");
        this.load.image("tuboCorto", "tuboCorto.png");
        this.load.image("tuboMediano", "tuboMediano.png");
        this.load.image("tuboLargo", "tuboLargo.png");
        this.load.image("bloqueInmovil", "bloqueInmovil.png")
        this.load.image("castillo", "castillo.png")
        this.load.image("bandera", "bandera.png")
        this.load.image("MontañaGrande", "mountain2.png")
        this.load.image("MontañaChica", "mountain1.png")
        this.load.image("ArbustoGrande", "arbusto1.png")
        this.load.image("ArbustoChico", "arbusto2.png")
        this.load.image("ArbustoMediano", "arbusto3.png")
        this.load.image("NubeGrande", "nube3.png")
        this.load.image("NubeChica", "nube2.png")
        this.load.image("NubeMediana", "nube1.png")
        this.load.image("Caparazon", "caparazon.png")
        this.load.image("Hongo", "Hongo.png")
        this.load.image("bloqueVacio", "bloqueVacio.png")
        this.load.image("estrella", "estrella.png")
        this.load.image("flor", "flor.png")
        this.load.image("lava", "lava.png")
        this.load.image("puente", "puente.png")
        this.load.bitmapFont('superMarioFont', "SuperMario.ttf")
        this.load.spritesheet("personaje", "mario.png" , { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("PersonajeGrande", "marioGrande.png" , { frameWidth: 18, frameHeight: 32 });
        this.load.spritesheet("goomba", "enemigo.png" , { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("bloqueMisterioso", "bloque-misterioso.png" , { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("koopa", "koopa.png" , { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("moneda", "moneda.png" , { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("PersonajeFuego", "marioFuego.png" , { frameWidth: 18, frameHeight: 32 });
        this.load.spritesheet("bolaFuego", "bolaFuego.png" , { frameWidth: 16, frameHeight: 8 });
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

        //Crear la animación de personaje grande
          this.anims.create({
            key: 'PersonajeGrande-camina',
            frames: this.anims.generateFrameNumbers('PersonajeGrande', { start: 1, end: 3}), 
            frameRate: 12, 
            repeat: -1 
        });

        //Crear la animación de personaje grande
        this.anims.create({
            key: 'PersonajeFuego-camina',
            frames: this.anims.generateFrameNumbers('PersonajeFuego', { start: 1, end: 3}), 
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

        //animacion saltar
        this.anims.create({
            key: 'PersonajeGrande-salta',
            frames: [{ key: 'PersonajeGrande', frame: 5 }], 
            frameRate: 1,  
            repeat: 0
        });

        //animacion saltar
        this.anims.create({
            key: 'PersonajeFuego-salta',
            frames: [{ key: 'PersonajeFuego', frame: 5 }], 
            frameRate: 1,  
            repeat: 0
        });

        //animacion agachado
        this.anims.create({
            key: 'PersonajeGrande-agachado',
            frames: [{ key: 'PersonajeGrande', frame: 4 }], 
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

        //agregar animacion de koopa
        this.anims.create({
            key: 'koopa-camina',
            frames: this.anims.generateFrameNumbers('koopa', { start: 0, end: 1}), 
            frameRate: 12, 
            repeat: -1 
        });

        //agregar animacion de moneda
        this.anims.create({
            key: 'monedaGira',
            frames: this.anims.generateFrameNumbers('moneda', { start: 0, end: 3}), 
            frameRate: 1, 
            repeat: 0 
        });

        //agregar animacion bola de fuego
        this.anims.create({
            key: 'BolaFuego',
            frames: this.anims.generateFrameNumbers('bolaFuego', { start: 0, end: 1}), 
            frameRate: 12, 
            repeat: -1 
        });

        this.scene.start('MainMenu');
    }
}
