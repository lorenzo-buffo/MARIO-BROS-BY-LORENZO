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
        this.load.audio("SonidoMoneda", "monedaSound.mp3");
        this.load.audio("SonidoSalto", "saltoSound.mp3");
        this.load.audio("SonidoHongo", "hongoSound.mp3");
        this.load.audio("SonidoGenerarHongo", "GeneraHongoSound.mp3");
        this.load.audio("SonidoHitGoomba", "hitGoombaSound.wav");
        this.load.audio("SonidoHit", "hitSound.mp3");
        this.load.audio("SonidoDead", "deadSound.wav");
        this.load.audio("SonidoFlor", "florSound.wav");
        this.load.audio("SonidoProyectil", "proyectilSound.wav");
        this.load.audio("SonidoAtaqueBoss", "ataqueBossSound.wav");
        this.load.audio("SonidoDeadBoss", "bossMuereSound.wav");
        this.load.audio("MusicaEstrella", "musicaEstrella.mp3");
        this.load.audio("musicaGameOver", "musicaGameOver.wav");
        this.load.audio("MusicaNivel1", "MusicaNivel1.mp3");
        this.load.audio("MusicaNivel2", "MusicaNivel2.mp3");
        this.load.audio("MusicaWin1", "MusicaWin1.wav");
        this.load.audio("MusicaWin2", "MusicaWin2.wav");
        this.load.audio("RomperBloqueSonido", "RomperBloqueSound.wav");
        this.load.image('menuFondo', 'menuFondo.png');
        this.load.image("cesped", "cesped.png");
        this.load.image("suelo", "suelo2.png");
        this.load.image("restart", "restart.png");
        this.load.image("exit", "exit.png");
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
        this.load.image("bloqueDestructible", "bloqueDestuctible.png")
        this.load.image("Fuego", "Fuego.png")
        this.load.image("plataformaMovil", "plataformaMovil.png")
        this.load.image("hongoBueno", "hongoBueno.png")
        this.load.spritesheet('lineaFuego', 'lineaFuego.png', { frameWidth: 16, frameHeight: 48 });
        this.load.spritesheet("personaje", "mario.png" , { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("PersonajeGrande", "marioGrande.png" , { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet("goomba", "enemigo.png" , { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("bloqueMisterioso", "bloque-misterioso.png" , { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("koopa", "koopa.png" , { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("moneda", "moneda.png" , { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("PersonajeFuego", "marioFuego.png" , { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet("bolaFuego", "bolaFuego.png" , { frameWidth: 8, frameHeight: 8 });
        this.load.spritesheet("monedaGrande", "monedaGrande.png" , { frameWidth: 10, frameHeight: 13 });
        this.load.spritesheet("Boss", "boss.png" , { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("ataqueEnemigo", "ataqueEnemigo.png" , { frameWidth: 27, frameHeight: 8 });
        
    }
    

    create () {


        this.anims.create({
            key: 'small-idle',
            frames: [{ key: 'personaje', frame: 0 }], // Usa el frame correcto de caída
            frameRate: 1
          }); 

           this.anims.create({
            key: 'big-idle',
            frames: [{ key: 'PersonajeGrande', frame: 0 }], // Usa el frame correcto de caída
            frameRate: 1
          }); 

           this.anims.create({
            key: 'fire-idle',
            frames: [{ key: 'PersonajeFuego', frame: 0 }], // Usa el frame correcto de caída
            frameRate: 1
          }); 



        this.anims.create({
            key: 'small-fall',
            frames: [{ key: 'personaje', frame: 5 }], // Usa el frame correcto de caída
            frameRate: 1
          });

          this.anims.create({
            key: 'big-fall',
            frames: [{ key: 'PersonajeGrande', frame: 5}],
            frameRate: 1
          });
          
          this.anims.create({
            key: 'fire-fall',
            frames: [{ key: 'PersonajeFuego', frame: 5 }],
            frameRate: 1
          });
          
        // Animaciones del personaje FSM
        this.anims.create({
            key: 'small-walk',
            frames: this.anims.generateFrameNumbers('personaje', { start: 1, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
    
        this.anims.create({
            key: 'big-walk',
            frames: this.anims.generateFrameNumbers('PersonajeGrande', { start: 1, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
    
        this.anims.create({
            key: 'fire-walk',
            frames: this.anims.generateFrameNumbers('PersonajeFuego', { start: 1, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
    
        this.anims.create({
            key: 'small-jump',
            frames: [{ key: 'personaje', frame: 5 }],
            frameRate: 1
        });
    
        this.anims.create({
            key: 'big-jump',
            frames: [{ key: 'PersonajeGrande', frame: 5 }],
            frameRate: 1
        });
    
        this.anims.create({
            key: 'fire-jump',
            frames: [{ key: 'PersonajeFuego', frame: 5 }],
            frameRate: 1
        });
    
        this.anims.create({
            key: 'big-crouch',
            frames: [{ key: 'PersonajeGrande', frame: 4 }],
            frameRate: 1
        });
    
        this.anims.create({
            key: 'fire-crouch',
            frames: [{ key: 'PersonajeFuego', frame: 4 }],
            frameRate: 1
        });
    
        this.anims.create({
            key: 'small-dead',
            frames: [{ key: 'personaje', frame: 4 }],
            frameRate: 1
        });
    
        // Animación de bloque misterioso
        this.anims.create({
            key: 'bloqueMisteriosoAnim',
            frames: this.anims.generateFrameNumbers('bloqueMisterioso', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
        });
    
        // Goomba
        this.anims.create({
            key: 'goomba-muerte',
            frames: [{ key: 'goomba', frame: 2 }],
            frameRate: 1
        });
    
        this.anims.create({
            key: 'goomba-camina',
            frames: this.anims.generateFrameNumbers('goomba', { start: 0, end: 1 }),
            frameRate: 12,
            repeat: -1
        });
    
        // Koopa
        this.anims.create({
            key: 'koopa-camina',
            frames: this.anims.generateFrameNumbers('koopa', { start: 0, end: 1 }),
            frameRate: 12,
            repeat: -1
        });
    
        // Moneda
        this.anims.create({
            key: 'monedaGira',
            frames: this.anims.generateFrameNumbers('moneda', { start: 0, end: 3 }),
            frameRate: 1
        });
    
        // Bola de fuego
        this.anims.create({
            key: 'BolaFuego',
            frames: this.anims.generateFrameNumbers('bolaFuego', { start: 0, end: 1 }),
            frameRate: 12,
            repeat: -1
        });
    
        // Moneda grande
        this.anims.create({
            key: 'monedaGrande',
            frames: this.anims.generateFrameNumbers('monedaGrande', { start: 0, end: 2 }),
            frameRate: 12,
            repeat: -1
        });
    
        // Boss
        this.anims.create({
            key: 'BossCamina',
            frames: this.anims.generateFrameNumbers('Boss', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
    
        this.anims.create({
            key: 'BossAtaca',
            frames: this.anims.generateFrameNumbers('ataqueEnemigo', { start: 0, end: 1 }),
            frameRate: 12,
            repeat: -1
        });
    
        // Línea de fuego
        this.anims.create({
            key: 'lineaFuegoActiva',
            frames: this.anims.generateFrameNumbers('lineaFuego', { start: 0, end: 1 }),
            frameRate: 12,
            repeat: -1
        });
    

        this.scene.start('MainMenu');
    }
}
