import { Scene } from 'phaser';
import { InputManager } from '../components/InputManager.js';
import { GoombaFSM } from '../Entities/GoombaFSM.js';
import { KoopaFSM } from '../Entities/KoopaFSM.js';
import { PersonajeFSM } from '../Entities/PersonajeFSM.js';
import { BloqueFSM } from '../Entities/BloqueFSM.js';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.puntos = 0;
        this.tiempoRestante = 180;

        // Solo establecer vidas en 3 si no existen aún
        if (this.registry.get('vidas') === undefined) {
            this.registry.set('vidas', 3);
        }

        this.ultimoDisparo = 0;     // Guardará el tiempo del último disparo
        this.cooldownDisparo = 300; // 300 milisegundos de espera entre disparos
    }

    create() {
        this.inputManager = new InputManager(this);
        this.inputManager.setup();

        // SONIDOS
        this.sonidoMoneda        = this.sound.add('SonidoMoneda');
        this.sonidoSalto         = this.sound.add('SonidoSalto');
        this.sonidoHongo         = this.sound.add('SonidoHongo');
        this.sonidoHit           = this.sound.add('SonidoHit');
        this.sonidoHitGoomba     = this.sound.add('SonidoHitGoomba');
        this.sonidoGeneraHongo   = this.sound.add('SonidoGenerarHongo');
        this.sonidoRomperBloque  = this.sound.add('RomperBloqueSonido');
        this.sonidoDead          = this.sound.add('SonidoDead');
        this.sonidoFlor          = this.sound.add('SonidoFlor');
        this.MusicaEstrella      = this.sound.add('MusicaEstrella');
        this.MusicaNivel1        = this.sound.add('MusicaNivel1');
        this.MusicaWin1          = this.sound.add('MusicaWin1');
        this.sonidoProyectil     = this.sound.add('SonidoProyectil');

        this.MusicaNivel1.play({ loop: true });

        // Imágenes de fondo
        this.add.image(2790, 186, "MontañaGrande").setScale(0.7);
        this.add.image(2645, 200, "ArbustoMediano").setScale(0.7);

        // Crear TILES SPRITES  
        const cespedData = [
            { x: 0,    y: 244, w: 2496, h: 64 },
            { x: 1480, y: 244, w: 304,  h: 64 },
            { x: 2295, y: 244, w: 1181, h: 64 },
            { x: 3700, y: 244, w: 1500, h: 64 }
        ];

        this.cespeds = cespedData.map(data =>
            this.add.tileSprite(data.x, data.y, data.w, data.h, "cesped")
        );

        // Bloque largo
        this.bloqueLargo = this.add.tileSprite(1600, 80, 152, 16, "bloqueNormal");

        // Datos de bloques inmóviles
        const bloquesInmovilesData = [
            { x: 2588, y: 204, w: 64 },
            { x: 2596, y: 188, w: 48 },
            { x: 2604, y: 172, w: 32 },
            { x: 2612, y: 156, w: 16 },
            { x: 2700, y: 204, w: 64 },
            { x: 2692, y: 188, w: 48 },
            { x: 2684, y: 172, w: 32 },
            { x: 2676, y: 156, w: 16 },
            { x: 2846, y: 204, w: 80 },
            { x: 2854, y: 188, w: 64 },
            { x: 2862, y: 172, w: 48 },
            { x: 2870, y: 156, w: 32 },
            { x: 2982, y: 204, w: 64 },
            { x: 2974, y: 188, w: 48 },
            { x: 2966, y: 172, w: 32 },
            { x: 2958, y: 156, w: 16 }
        ];

        this.bloquesInmoviles = bloquesInmovilesData.map(data =>
            this.add.tileSprite(data.x, data.y, data.w, 16, "bloqueInmovil")
        );

        // Grupo muro especial
        this.muroColision = this.physics.add.staticGroup();
        this.muroColision.create(2588, 204, null).setSize(64, 16).setVisible(false);

        // Grupo de colisiones de césped y bloques
        this.cespedColision = this.physics.add.staticGroup();

        // Datos de colisiones
        const colisionesData = [
            { x: 0,    y: 244, w: 2496, h: 64 },
            { x: 1480, y: 244, w: 304,  h: 64 },
            { x: 2295, y: 244, w: 1181, h: 64 },
            { x: 3700, y: 244, w: 1500, h: 64 },
            { x: 1600, y: 80,  w: 152,  h: 16 },
            { x: 2596, y: 188, w: 48,   h: 16 },
            { x: 2604, y: 172, w: 32,   h: 16 },
            { x: 2612, y: 155, w: 16,   h: 16 },
            { x: 2700, y: 204, w: 64,   h: 16 },
            { x: 2692, y: 188, w: 48,   h: 16 },
            { x: 2684, y: 172, w: 32,   h: 16 },
            { x: 2676, y: 156, w: 16,   h: 16 },
            { x: 2846, y: 204, w: 80,   h: 16 },
            { x: 2854, y: 188, w: 64,   h: 16 },
            { x: 2862, y: 172, w: 48,   h: 16 },
            { x: 2870, y: 156, w: 32,   h: 16 },
            { x: 2982, y: 204, w: 64,   h: 16 },
            { x: 2974, y: 188, w: 48,   h: 16 },
            { x: 2966, y: 172, w: 32,   h: 16 },
            { x: 2958, y: 156, w: 16,   h: 16 }
        ];

        // Crear las colisiones desde los datos
        colisionesData.forEach(data => {
            this.cespedColision.create(data.x, data.y, null)
                .setSize(data.w, data.h)
                .setVisible(false);
        });

        // Crear bloque visual centrado
        let anchoBloque  = 144; // 9 bloques de 16px = 144
        let posicionX    = 3490;
        let posicionY    = 204;

        for (let i = 1; anchoBloque >= 16; i++) {
            this[`bloqueInmovil${i}`] = this.add.tileSprite(posicionX, posicionY, anchoBloque, 16, "bloqueInmovil");

            let bloque = this.cespedColision.create(posicionX, posicionY, null);
            bloque.body.setSize(anchoBloque, 16);
            bloque.setVisible(false);

            // Preparar para la siguiente fila
            anchoBloque -= 16;
            posicionY   -= 16;
            posicionX   += 8;
        }

        // Crear castillo
        this.add.image(3820, 152, "castillo").setScale(0.8);

        // Montaña antes de bandera
        this.add.image(3630, 186, "MontañaGrande").setScale(0.7);

        // Crear bandera
        this.add.image(3700, 128, "bandera");

        // Montañas grandes
        this.add.image(20,   186, "MontañaGrande").setScale(0.7);
        this.add.image(955,  186, "MontañaGrande").setScale(0.7);
        this.add.image(1870, 186, "MontañaGrande").setScale(0.7);

        // Montaña chica
        this.add.image(360,  196, "MontañaChica").setScale(0.8);
        this.add.image(1200, 196, "MontañaChica").setScale(0.8);
        this.add.image(2200, 196, "MontañaChica").setScale(0.8);
        this.add.image(3060, 196, "MontañaChica").setScale(0.8);

        // Arbusto grande
        this.add.image(270,   200, "ArbustoGrande").setScale(0.7);
        this.add.image(2112,  200, "ArbustoGrande").setScale(0.7);

        // Arbusto chico
        this.add.image(480,   200, "ArbustoChico").setScale(0.7);
        this.add.image(1370,  200, "ArbustoChico").setScale(0.7);
        this.add.image(2340,  200, "ArbustoChico").setScale(0.7);
        this.add.image(3210,  200, "ArbustoChico").setScale(0.7);

        // Arbusto mediano
        this.add.image(800,   200, "ArbustoMediano").setScale(0.7);
        this.add.image(1127,  200, "ArbustoMediano").setScale(0.7);
        this.add.image(1745,  200, "ArbustoMediano").setScale(0.7);

        // Nube chica
        this.add.image(130,   50, "NubeChica").setScale(0.2);
        this.add.image(380,   30, "NubeChica").setScale(0.2);
        this.add.image(1060,  50, "NubeChica").setScale(0.2);
        this.add.image(1250,  30, "NubeChica").setScale(0.2);
        this.add.image(2050,  50, "NubeChica").setScale(0.2);
        this.add.image(2260,  30, "NubeChica").setScale(0.2);
        this.add.image(2900,  50, "NubeChica").setScale(0.2);
        this.add.image(3150,  30, "NubeChica").setScale(0.2);
        this.add.image(3750,  50, "NubeChica").setScale(0.2);

        // Nube grande
        this.add.image(590,   50, "NubeGrande").setScale(0.8);
        this.add.image(1470,  50, "NubeGrande").setScale(0.8);
        this.add.image(2410,  50, "NubeGrande").setScale(0.8);
        this.add.image(3330,  50, "NubeGrande").setScale(0.8);

        // Nube mediana
        this.add.image(740,   30, "NubeMediana").setScale(0.2);
        this.add.image(1650,  30, "NubeMediana").setScale(0.2);
        this.add.image(2570,  30, "NubeMediana").setScale(0.2);
        this.add.image(3480,  30, "NubeMediana").setScale(0.2);
         
        // Crear el personaje
        this.personaje = this.physics.add.sprite(10, 200, "personaje").setGravityY(1300). setOrigin(0, 1)
        this.personaje.fsm = new PersonajeFSM(this.personaje, this);
        this.personaje.setCollideWorldBounds(true);
        this.personaje.isDead = false;
        this.velocidadActual = 0;
        this.velocidadMaxima = 150;
        this.aceleracion = 3;
        this.frenado = 30;
        this.estaSaltando = false;
        this.tiempoSalto = 0;
        this.personaje.invencible = false;

        // Colisión entre el personaje y el césped
        this.physics.add.collider(this.personaje, this.cespedColision);
        this.physics.add.collider(this.personaje, this.muroColision);

        // Límites del mundo
        this.physics.world.setBounds(0, 0, 3900, 244);
        // Cámara que sigue al jugador
        this.cameras.main.setBounds(0, 0, 3900, 244);
      
        // Crear el bloque misterioso con la animación
        this.bloqueMisterioso = this.physics.add.staticGroup();
        this.bloqueMisterioso1 = this.bloqueMisterioso.create(330, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso1.originalY = 150;
        this.bloqueMisterioso2 = this.bloqueMisterioso.create(416, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso2.originalY = 150;
        this.bloqueMisterioso3 = this.bloqueMisterioso.create(432, 80, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso3.originalY = 80;
        this.bloqueMisterioso4 = this.bloqueMisterioso.create(448, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso4.originalY = 150;
        this.bloqueMisterioso5 = this.bloqueMisterioso.create(1495, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso5.originalY = 150;
        this.bloqueMisterioso6 = this.bloqueMisterioso.create(1800, 80, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso6.originalY = 80;
        this.bloqueMisterioso7 = this.bloqueMisterioso.create(2064, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso7.originalY = 150;
        this.bloqueMisterioso8 = this.bloqueMisterioso.create(2112, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso8.originalY = 150;
        this.bloqueMisterioso9 = this.bloqueMisterioso.create(2112, 80, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso9.originalY = 80;
        this.bloqueMisterioso10 = this.bloqueMisterioso.create(2160, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso10.originalY = 150;
        this.bloqueMisterioso11 = this.bloqueMisterioso.create(2472, 80, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso11.originalY = 80;
        this.bloqueMisterioso12 = this.bloqueMisterioso.create(2488, 80, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso12.originalY = 80;
        this.bloqueMisterioso13 = this.bloqueMisterioso.create(3232, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso13.originalY = 150;
        // Asignar FSM a bloques misteriosos
        this.bloqueMisterioso.getChildren().forEach(bloque => {
            bloque.fsm = new BloqueFSM(bloque, this, "misterioso");
        });
       this.physics.add.collider(this.personaje, this.bloqueMisterioso, (personaje, bloque) => {
            if (
                personaje.body.touching.up &&
                bloque.body.touching.down &&
                personaje.body.y + personaje.body.height >= bloque.y
            ) {
                bloque.fsm?.setState('bumped');
            }
        });

        // Textos FSM para bloques misteriosos
        this.textosFSMBloquesMisteriosos = this.bloqueMisterioso.getChildren().map(bloque =>
            this.add.text(bloque.x, bloque.y - 20, '', {
                font: '12px Arial',
                fill: '#FFFF00',         // Amarillo para misteriosos
                stroke: '#000000',
                strokeThickness: 2
            }).setDepth(10)
        );

        // Crear bloque normal
        this.bloqueNormal = this.physics.add.staticGroup();

        const posicionesBloques = [
            { x: 400, y: 150 },
            { x: 432, y: 150 },
            { x: 464, y: 150 },
            { x: 1479, y: 150 },
            { x: 1511, y: 150 },
            { x: 1800, y: 150 },
            { x: 1784, y: 80 },
            { x: 1768, y: 80 },
            { x: 1752, y: 80 },
            { x: 1916, y: 150 },
            { x: 1932, y: 150 },  //Este tendrá estrella
            { x: 2292, y: 150 },
            { x: 2340, y: 80 },
            { x: 2356, y: 80 },
            { x: 2372, y: 80 },
            { x: 2456, y: 80 },
            { x: 2472, y: 150 },
            { x: 2488, y: 150 },
            { x: 2504, y: 80 },
            { x: 3200, y: 150 },
            { x: 3216, y: 150 },
            { x: 3248, y: 150 },
        ]

        posicionesBloques.forEach(pos => {
            const bloque = this.bloqueNormal.create(pos.x, pos.y, "bloqueNormal");
            // Asignar la propiedad originalY a cada bloque
            bloque.originalY = pos.y;
            // Asignar tieneEstrella solo al bloque de la posición 1932,150
            bloque.tieneEstrella = (pos.x === 1932 && pos.y === 150);
        });

        // Asignar FSM a bloques normales
        this.bloqueNormal.getChildren().forEach(bloque => {
            bloque.fsm = new BloqueFSM(bloque, this, "normal");
        });

        // Textos FSM para bloques normales
        this.textosFSMBloquesNormales = this.bloqueNormal.getChildren().map(bloque =>
            this.add.text(bloque.x, bloque.y - 20, '', {
                font: '12px Arial',
                fill: '#FFFFFF', // Blanco para normales
                stroke: '#000000',
                strokeThickness: 2
            }).setDepth(10)
        );
        this.physics.add.collider(this.personaje, this.bloqueNormal, (personaje, bloque) => {
            if (
                personaje.body.touching.up &&
                bloque.body.touching.down &&
                personaje.body.y + personaje.body.height >= bloque.y
            ) {
                bloque.fsm?.setState('bumped');
            }
        });

        // Crear un grupo único para todos los tubos
        this.tubos = this.physics.add.staticGroup();
        this.tubos.create(560, 196, "tuboCorto")
        this.tubos.create(3110, 196, "tuboCorto")
        this.tubos.create(3400, 196, "tuboCorto")

        // Crear tubos medianos
        this.tubos.create(730, 188, "tuboMediano")

        // Crear tubos largos
        this.tubos.create(880, 180, "tuboLargo")
        this.tubos.create(1070, 180, "tuboLargo")

        // Colisión entre el personaje y los tubos
        this.physics.add.collider(this.personaje, this.tubos);

        //crear goombas
        this.goombas = this.physics.add.group();
        this.physics.add.collider(this.goombas, this.bloqueNormal);
        this.physics.add.collider(this.goombas, this.bloqueMisterioso);
      
        this.goombas.create(420, 208, 'goomba');
        this.goombas.create(750, 208, 'goomba');
        this.goombas.create(900, 208, 'goomba');
        this.goombas.create(950, 208, 'goomba');
        this.goombas.create(1900, 208, 'goomba');
        this.goombas.create(1920, 208, 'goomba');
        this.goombas.create(2200, 208, 'goomba');
        this.goombas.create(2220, 208, 'goomba');
        this.goombas.create(2350, 208, 'goomba');
        this.goombas.create(2370, 208, 'goomba');
        this.goombas.create(2450, 208, 'goomba');
        this.goombas.create(2470, 208, 'goomba');
        this.goombas.create(3250, 208, 'goomba');
        this.goombas.create(3300, 208, 'goomba');
        this.goombas.create(1500, 60, 'goomba');
        this.goombas.create(1550, 60, 'goomba');
        this.goombas.getChildren().forEach(goomba => {
            goomba.fsm = new GoombaFSM(goomba, this);
        });

        this.physics.add.collider(this.goombas, this.cespedColision);
        this.physics.add.collider(this.goombas, this.tubos, this.rebotarGoomba, null, this);
        this.physics.add.collider(this.personaje, this.goombas, this.colisionEnemigoGoomba, null, this);
        this.goombaActiva = false; 

        // Crear al Koopa
        this.koopa = this.physics.add.sprite(2150, 208, 'koopa');
        this.koopa.setCollideWorldBounds(true);
        this.physics.add.collider(this.koopa, this.cespedColision);
        this.physics.add.collider(this.personaje, this.koopa, this.hitKoopa, null, this);
        this.physics.add.collider(this.koopa, this.goombas, this.koopaMataGoomba, null, this);

        // FSM del Koopa
        this.koopa.fsm = new KoopaFSM(this.koopa, this);

        //crear hongo
        this.hongos = this.physics.add.group();
        this.physics.add.collider(this.hongos, this.cespedColision);
        this.physics.add.collider(this.hongos, this.bloqueMisterioso);
        this.physics.add.collider(this.hongos, this.bloqueNormal);
        this.physics.add.collider(this.hongos, this.bloquesInmoviles);
        this.physics.add.collider(this.hongos, this.tubos);
        
        //crear estrellas
        this.estrellas = this.physics.add.group({
            allowGravity: true,
        });
        this.physics.add.collider(this.estrellas, this.cespedColision);
        this.physics.add.collider(this.estrellas, this.bloqueMisterioso);
        this.physics.add.collider(this.estrellas, this.bloqueNormal);
        this.physics.add.collider(this.estrellas, this.bloquesInmoviles);
        this.physics.add.collider(this.estrellas, this.bloquesVacios);
        this.physics.add.collider(this.estrellas, this.tubos);

        //bloques vacios
        this.bloquesVacios = this.physics.add.staticGroup();
        this.physics.add.collider(this.personaje, this.bloquesVacios);

        this.moneda = this.physics.add.group()

        //crear movimiento con teclas
        this.keys = this.input.keyboard.createCursorKeys();
        
       
        this.textoPuntos = this.add.text(10, 10, 'Puntos: 0', {
            font: '14px Arial',
            fill: '#ffffff',
            stroke: '#000000',         
            strokeThickness: 2        
        });
        this.textoPuntos.setScrollFactor(0);

        this.textoTemporizador = this.add.text(170, 10, 'Tiempo: 3:00', {
            font: '14px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2         
        });
        this.textoTemporizador.setScrollFactor(0);
        this.timerEvento = this.time.addEvent({
            delay: 1000, 
            callback: () => {
                this.tiempoRestante--;

                // Formatear minutos y segundos
                let minutos = Math.floor(this.tiempoRestante / 60);
                let segundos = this.tiempoRestante % 60;

                this.textoTemporizador.setText('Tiempo: ' + minutos + ':' + (segundos < 10 ? '0' + segundos : segundos));

                if (this.tiempoRestante <= 0) {
                    this.timerEvento.remove();  // Parar el temporizador
                    this.scene.start('GameOver');  
                }
            },
            callbackScope: this,
            loop: true
        });

        // Crear texto de vidas en pantalla
        this.textoVidas = this.add.text(100, 10, 'Vidas: ' + this.registry.get('vidas'), {
            font: '14px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        this.textoVidas.setScrollFactor(0);  
            this.debugTextoFSM = this.add.text(0, 0, '', {
            font: '12px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        this.debugTextoFSM.setScrollFactor(0); // Para que siga la cámara
        this.mensajePowerUp = null;
        this.tiempoPowerUp = 0;

        this.textosFSMGoombas = this.goombas.getChildren().map(goomba => {
            return this.add.text(goomba.x, goomba.y - 20, '', {
                font: '12px Arial',
                fill: '#FFA500',
                stroke: '#000000',
                strokeThickness: 2
            }).setDepth(10); // 
        });

        this.textoFSMKoopa = this.add.text(this.koopa.x, this.koopa.y - 20, '', {
            font: '12px Arial',
            fill: '#00BFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setDepth(10); 
    }
    
       update() {
        if (this.personaje.isDead) return;

        this.inputManager.update();
        const movimiento = this.inputManager.getMovement();

        // Disparo de flor
        if (this.inputManager.pad?.buttons[2]?.pressed && this.personaje.fsm.forma === "fire") {
            const ahora = this.time.now;
            if (ahora - this.ultimoDisparo >= this.cooldownDisparo) {
                this.habilitarDisparoFuego();
                this.ultimoDisparo = ahora;
            }
        }

        // Movimiento horizontal
        if (movimiento.x > 0) {
            this.velocidadActual = Math.min(this.velocidadActual + this.aceleracion, this.velocidadMaxima);
            this.personaje.setVelocityX(this.velocidadActual);
            this.personaje.flipX = false;
        } else if (movimiento.x < 0) {
            this.velocidadActual = Math.max(this.velocidadActual - this.aceleracion, -this.velocidadMaxima);
            this.personaje.setVelocityX(this.velocidadActual);
            this.personaje.flipX = true;
        } else {
            if (this.velocidadActual > 0) {
                this.velocidadActual = Math.max(this.velocidadActual - this.frenado, 0);
            } else if (this.velocidadActual < 0) {
                this.velocidadActual = Math.min(this.velocidadActual + this.frenado, 0);
            }
            this.personaje.setVelocityX(this.velocidadActual);
        }

        // FSM maneja animaciones y estado general
        this.personaje.fsm.update();
        if (this.debugTextoFSM && this.personaje?.fsm) {
            const estado = this.personaje.fsm.state;
            const forma  = this.personaje.fsm.forma;
            const inv    = this.personaje.fsm.invencible ? 'Sí' : 'No';

            let texto = `FSM: ${estado}\nForma: ${forma}\nInvencible: ${inv}`;

            // Si hay un cambio reciente de forma, mostrarlo temporalmente
            if (this.mensajePowerUp && this.time.now - this.tiempoPowerUp < 2000) {
                texto += `\n${this.mensajePowerUp}`;
            }

            this.debugTextoFSM.setText(texto);
            this.debugTextoFSM.setPosition(
                this.personaje.x - this.cameras.main.scrollX,
                this.personaje.y - 100
            );
        }

        // Salto
        if (this.inputManager.pad?.buttons[0]?.pressed && this.personaje.body.touching.down && !this.estaSaltando) {
            this.personaje.setVelocityY(-350);
            this.estaSaltando = true;
            this.tiempoSalto  = 0;
            this.sonidoSalto.play();
            this.personaje.fsm.setState('jump');
        } else if (this.inputManager.pad?.buttons[0]?.pressed && this.estaSaltando && this.tiempoSalto < 18) {
            this.personaje.setVelocityY(this.personaje.body.velocity.y - 15);
            this.tiempoSalto++;
        }

        if (!this.inputManager.pad?.buttons[0]?.pressed) {
            this.estaSaltando = false;
        }

        // Muerte por caída
        if (this.personaje.y > 230) {
            this.personaje.isDead = true;
            this.personaje.fsm.setState('dead');
            this.personaje.setVelocity(0, -400);
            this.sonidoDead.play();
            this.MusicaEstrella.stop();
            this.MusicaNivel1.stop();

            this.perderVida();

            this.time.delayedCall(2000, () => {
                this.scene.restart();
            });
        }

        // FSM de enemigos
        this.goombas.getChildren().forEach(goomba => {
            goomba.fsm?.update();
        });

        this.koopa?.fsm?.update();

        //Cámara sigue al personaje
        const cam            = this.cameras.main;
        const mitadPantalla  = cam.width / 2;

        if (this.personaje.body.velocity.x > 0 && this.personaje.x > cam.scrollX + mitadPantalla) {
            cam.scrollX = this.personaje.x - mitadPantalla;
        }

        if (this.personaje.x < cam.scrollX) {
            this.personaje.x = cam.scrollX;
            this.personaje.body.velocity.x = 0;
        }

        if (this.personaje.x >= 3700 && this.MusicaNivel1.isPlaying) {
            this.MusicaNivel1.stop();
            this.MusicaWin1.play();
            this.MusicaWin1.once('complete', () => {
                this.scene.start('MainMenu');
            });
        }

        //Actualizar textos FSM de Goombas
        this.goombas.getChildren().forEach((goomba, i) => {
            const textoFSM = this.textosFSMGoombas[i];
            if (goomba.fsm) {
                textoFSM.setText(goomba.fsm.state);
                textoFSM.setPosition(goomba.x, goomba.y - 20);
            }
        });

        // Actualizar texto FSM del Koopa
        if (this.koopa?.fsm) {
            this.textoFSMKoopa.setText(this.koopa.fsm.state);
            this.textoFSMKoopa.setPosition(this.koopa.x, this.koopa.y - 20);
        }

        //Textos FSM de bloques misteriosos
        this.bloqueMisterioso.getChildren().forEach((bloque, i) => {
            const texto = this.textosFSMBloquesMisteriosos[i];
            if (bloque.fsm) {
                texto.setText(bloque.fsm.state);
                texto.setPosition(bloque.x, bloque.y - 20);
            }
        });

        //Textos FSM de bloques normales
        this.bloqueNormal.getChildren().forEach((bloque, i) => {
            const texto = this.textosFSMBloquesNormales[i];
            if (bloque.fsm) {
                texto.setText(bloque.fsm.state);
                texto.setPosition(bloque.x, bloque.y - 20);
            }
        });
    }

      colisionEnemigoGoomba(personaje, goombas) {
        if (personaje.fsm?.invencible && goombas.fsm) {
          goombas.fsm.setState('deadVolador');
        } 
        else if (personaje.body.touching.down && goombas.body.touching.up) {
          goombas.fsm.setState('dead');
          personaje.setVelocityY(-350);
        } 
        else {
          if (personaje.invulnerable) return;
      
          if (personaje.fsm?.forma === 'big' || personaje.fsm?.forma === 'fire') {
            // Perdió el power-up → vuelve a forma pequeña
            personaje.fsm.setForma('small');
            personaje.invulnerable = true;
            personaje.body.enable = false;
            this.sonidoHit.play();
      
            this.tweens.add({
              targets: personaje,
              scaleX: 1.3,
              scaleY: 1.3,
              yoyo: true,
              repeat: 2,
              duration: 150,
              onComplete: () => {
                personaje.setScale(1);
                personaje.body.setSize(16, 16).setOffset(0, 0);
                personaje.body.enable = true;
                this.pausarEnemigos();
              }
            });
      
            this.time.delayedCall(1000, () => {
              personaje.invulnerable = false;
            });
          } else {
            this.morirPersonaje(personaje);
          }
        }
      }
      
      hitKoopa = (personaje, koopa) => {
        if (!koopa.fsm) return;
        const fsm = koopa.fsm;
      
        if (personaje.fsm?.invencible) {
          fsm.setState('deadVolador');
          return;
        }
      
        if (personaje.body.touching.down && koopa.body.touching.up) {
          personaje.setVelocityY(-350);
          this.sonidoHitGoomba.play();
      
          if (fsm.state === 'shell') {
            const direccion = personaje.x < koopa.x ? 1 : -1;
            fsm.setDirection(direccion);
            fsm.setState('shell-moving');
          } else if (fsm.state === 'shell-moving') {
            fsm.setState('shell');
          } else {
            fsm.setState('shell');
          }
      
          return;
        }
      
        if (fsm.state === 'shell') return;
      
        if (personaje.invulnerable) return;
      
        if (personaje.fsm?.forma === 'big' || personaje.fsm?.forma === 'fire') {
          personaje.fsm.setForma('small');
          personaje.invulnerable = true;
          personaje.body.enable = false;
          this.sonidoHit.play();
      
          this.tweens.add({
            targets: personaje,
            scaleX: 1.3,
            scaleY: 1.3,
            yoyo: true,
            repeat: 2,
            duration: 150,
            onComplete: () => {
              personaje.setScale(1);
              personaje.body.setSize(16, 16).setOffset(0, 0);
              personaje.body.enable = true;
              this.pausarEnemigos();
            }
          });
      
          this.time.delayedCall(1000, () => {
            personaje.invulnerable = false;
          });
        } else {
          this.morirPersonaje(personaje);
        }
      }
      
    
    rebotarGoomba(goomba, objeto) {
        if (goomba.body.blocked.left || goomba.body.touching.left) {
            goomba.setVelocityX(40); // Cambia a derecha
            goomba.flipX = false;
        } else if (goomba.body.blocked.right || goomba.body.touching.right) {
            goomba.setVelocityX(-40); // Cambia a izquierda
            goomba.flipX = true;
        }
    }

    rebotarKoopa(koopa, objeto) {
        if (koopa.body.blocked.left || koopa.body.touching.left) {
            koopa.setVelocityX(40); // Va a la derecha
            koopa.flipX = false;
        } else if (koopa.body.blocked.right || koopa.body.touching.right) {
            koopa.setVelocityX(-40); // Va a la izquierda
            koopa.flipX = true;
        }
    }
    
    morirPersonaje(personaje) {
        personaje.isDead = true;
        personaje.fsm?.setState('dead');
        this.sonidoDead.play();
        this.MusicaNivel1.stop();
        personaje.body.checkCollision.none = true;
        personaje.setVelocity(0, -400);
        
        // Restar una vida usando el registro
        let vidasActuales = this.registry.get('vidas') || 0;
        vidasActuales--;
        this.registry.set('vidas', vidasActuales);
        console.log("Vidas restantes:", vidasActuales);
        
        this.time.delayedCall(2500, () => {
            console.log("Vidas en delayedCall:", this.registry.get('vidas'));
            if (this.registry.get('vidas') <= 0) {
                console.log("Game Over");
                this.scene.start('GameOver');
            } else {
                this.scene.restart();
            }
        });
    }

    pausarEnemigos() {
        this.goombas.getChildren().forEach(goomba => {
            goomba.body.oldVelocityX = goomba.body.velocity.x;
            goomba.setVelocityX(0);
            goomba.body.moves = false;  //Bloquear movimiento físico
        });
    
        if (this.koopa && this.koopa.body) {
            this.koopa.body.oldVelocityX = this.koopa.body.velocity.x;
            this.koopa.setVelocityX(0);
            this.koopa.body.moves = false;
    
            this.time.delayedCall(2000, () => {
                this.koopa.body.moves = true;
                this.koopa.setVelocityX(this.koopa.body.oldVelocityX);
            });
        }
    
        this.time.delayedCall(2000, () => {
            this.goombas.getChildren().forEach(goomba => {
                goomba.body.moves = true;
                goomba.setVelocityX(goomba.body.oldVelocityX);
            });
        });
    }
    
    koopaMataGoomba = (koopa, goomba) => {
        if (!koopa.fsm || !goomba.fsm) return;
    
        // Solo matar al Goomba si el Koopa está girando
        if (koopa.fsm.state === 'shell-moving') {
            goomba.fsm.setState('deadVolador');
        }
    }

    generarObjeto = function(bloque) {
    if (bloque.tieneEstrella) {
        bloque.tieneEstrella = false;

        const estrella = this.physics.add.sprite(bloque.x, bloque.y - 10, "estrella")
            .setScale(0.9)
            .setBounce(0.8, 0.8)
            .setCollideWorldBounds(true)
            .setGravityY(300);

        this.sonidoGeneraHongo.play();
        estrella.body.setVelocityX(80);
        estrella.body.setVelocityY(-50);

        this.physics.add.overlap(this.personaje, estrella, (personaje, estrella) => {
            this.sonidoHongo.play();
            estrella.destroy();
            console.log("¡Estrella recolectada!");

            personaje.fsm.setInvencible(true);
            this.MusicaEstrella.play();
            this.MusicaNivel1.stop();

            personaje.setTint(0x00ff00);
            let intervalId = this.time.addEvent({
                delay: 500,
                callback: () => {
                    if (personaje.fsm.invencible) {
                        const color = Phaser.Display.Color.RandomRGB().color;
                        personaje.setTint(color);
                    }
                },
                loop: true
            });

            this.time.delayedCall(11000, () => {
                personaje.fsm.setInvencible(false);
                personaje.clearTint();
                intervalId.remove();
                this.MusicaNivel1.play();
            });
        });

        const rebote = (objeto) => {
            objeto.body.setVelocityX(-objeto.body.velocity.x);
            if (objeto.body.velocity.y > 0) objeto.body.setVelocityY(-50);
        };

        this.physics.add.collider(estrella, this.bloquesInmoviles, rebote);
        this.physics.add.collider(estrella, this.tubos, rebote);
        this.physics.add.collider(estrella, this.bloqueNormal, rebote);
        this.physics.add.collider(estrella, this.bloqueMisterioso, rebote);
        this.physics.add.collider(estrella, this.cespedColision, (estrella) => {
            if (estrella.body.velocity.y > 0) estrella.body.setVelocityY(-50);
            if (estrella.y < 150) estrella.body.setVelocityY(estrella.body.velocity.y * -1);
        });

    } else if (bloque === this.bloqueMisterioso2 || bloque === this.bloqueMisterioso5) {
        const hongo = this.hongos.create(bloque.x, bloque.y - 1, "Hongo")
            .setScale(0.8)
            .setBounce(1, 0);
        this.sonidoGeneraHongo.play();

        this.tweens.add({
            targets: hongo,
            y: hongo.y - 1,
            duration: 100,
            ease: 'Power1',
            onComplete: () => hongo.body.setVelocityX(80)
        });

        this.physics.add.collider(this.personaje, hongo, (personaje, objeto) => {
            objeto.destroy();
            this.sonidoHongo.play();
            console.log("¡Hongo recolectado!");

            personaje.body.enable = false;
            this.tweens.add({
                targets: personaje,
                scaleX: 1.3,
                scaleY: 1.3,
                yoyo: true,
                repeat: 2,
                duration: 150,
                onComplete: () => {
                    personaje.fsm.setForma('big');
                    personaje.setScale(1);
                    personaje.body.enable = true;
                    console.log("¡El personaje se hizo grande!");
                }
            });
        });

        const rebote = (objeto) => objeto.body.setVelocityX(-objeto.body.velocity.x);
        this.physics.add.collider(hongo, this.tubos, rebote);
        this.physics.add.collider(hongo, this.bloquesInmoviles, rebote);
        this.physics.add.collider(hongo, this.bloqueNormal, rebote);
        this.physics.add.collider(hongo, this.bloqueMisterioso, rebote);

    } else if (bloque === this.bloqueMisterioso9) {
        if (this.personaje.fsm.forma === 'big' || this.personaje.fsm.forma === 'fire') {
            const flor = this.physics.add.sprite(bloque.x, bloque.y - 16, "flor")
                .setScale(0.9);
            this.sonidoFlor.play();
            flor.body.setAllowGravity(false);
            flor.body.setImmovable(true);

            this.physics.add.overlap(this.personaje, flor, (personaje, objeto) => {
                objeto.destroy();
                this.sonidoHongo.play();
                console.log("¡Flor recolectada!");

                personaje.body.enable = false;
                this.tweens.add({
                    targets: personaje,
                    scaleX: 1.3,
                    scaleY: 1.3,
                    yoyo: true,
                    repeat: 2,
                    duration: 150,
                    onComplete: () => {
                        personaje.fsm.setForma('fire');
                        personaje.setScale(1);
                        personaje.body.enable = true;

                        console.log("¡Ahora puede lanzar fuego!");
                        if (!this.teclaFuego) {
                            this.teclaFuego = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
                            this.teclaFuego.on('down', () => {
                                this.habilitarDisparoFuego();
                            });
                        }
                    }
                });
            });

        } else {
            // Si es chico: dar hongo
            const hongo = this.hongos.create(bloque.x, bloque.y - 1, "Hongo")
                .setScale(0.8)
                .setBounce(1, 0);
            this.sonidoGeneraHongo.play();
            this.tweens.add({
                targets: hongo,
                y: hongo.y - 1,
                duration: 100,
                ease: 'Power1',
                onComplete: () => hongo.body.setVelocityX(80)
            });

            this.physics.add.collider(this.personaje, hongo, (personaje, objeto) => {
                objeto.destroy();
                this.sonidoHongo.play();
                console.log("¡Hongo recolectado!");

                personaje.body.enable = false;
                this.tweens.add({
                    targets: personaje,
                    scaleX: 1.3,
                    scaleY: 1.3,
                    yoyo: true,
                    repeat: 2,
                    duration: 150,
                    onComplete: () => {
                        personaje.fsm.setForma('big');
                        personaje.setScale(1);
                        personaje.body.enable = true;
                        console.log("¡El personaje se hizo grande!");
                    }
                });
            });

            const rebote = (objeto) => objeto.body.setVelocityX(-objeto.body.velocity.x);
            this.physics.add.collider(hongo, this.tubos, rebote);
            this.physics.add.collider(hongo, this.bloquesInmoviles, rebote);
            this.physics.add.collider(hongo, this.bloqueNormal, rebote);
            this.physics.add.collider(hongo, this.bloqueMisterioso, rebote);
        }

    } else {
        // Moneda
        const moneda = this.moneda.create(bloque.x, bloque.y - 1, "Moneda")
            .setScale(0.8);
        moneda.anims.play('monedaGira', true);
        this.sonidoMoneda.play();

        this.tweens.add({
            targets: moneda,
            y: moneda.y - 20,
            duration: 600,
            ease: 'Power1',
            onComplete: () => {
                moneda.destroy();
                this.sumarPuntos(50);
                console.log("¡Moneda recolectada!");

                let textoFlotante = this.add.text(moneda.x, moneda.y, '50', {
                    font: '16px Arial',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 2
                });

                this.tweens.add({
                    targets: textoFlotante,
                    y: moneda.y - 50,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power1',
                    onComplete: () => textoFlotante.destroy()
                });
            }
        });
    }
}

    habilitarDisparoFuego = function() {
    if (this.personaje.fsm?.forma === "fire") {
        const bolaFuego = this.physics.add.sprite(this.personaje.x, this.personaje.y - 10, 'BolaFuego')
            .setVelocityX(this.personaje.flipX ? -200 : 200);

        this.sonidoProyectil.play();

        bolaFuego.body.setAllowGravity(false);
        bolaFuego.anims.play('BolaFuego', true);
        bolaFuego.setCollideWorldBounds(true);
        bolaFuego.body.onWorldBounds = true;

        this.physics.world.on('worldbounds', function(body) {
            if (body.gameObject === bolaFuego) {
                bolaFuego.destroy();
            }
        });

        this.physics.add.overlap(bolaFuego, this.koopa, (bola, koopa) => {
            bola.destroy();
            koopa.fsm?.setState('deadVolador');
            this.sumarPuntos(100);
            let textoFlotante = this.add.text(koopa.x, koopa.y, '100', {
                font: '16px Arial',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2
            });

            this.tweens.add({
                targets: textoFlotante,
                y: koopa.y - 50,
                alpha: 0,
                duration: 1000,
                ease: 'Power1',
                onComplete: () => textoFlotante.destroy()
            });
        }, null, this);

        // Colisiones con elementos del mapa
        const destruirBola = () => bolaFuego.destroy();

        this.physics.add.collider(bolaFuego, this.bloqueMisterioso, destruirBola, null, this);
        this.physics.add.collider(bolaFuego, this.bloqueNormal, destruirBola, null, this);
        this.physics.add.collider(bolaFuego, this.bloquesInmoviles, destruirBola, null, this);
        this.physics.add.collider(bolaFuego, this.bloquesVacios, destruirBola, null, this);
        this.physics.add.collider(bolaFuego, this.tubos, destruirBola, null, this);
        }
    }

  
    sumarPuntos(puntos) {
        this.puntos += puntos;
        // Actualizamos el texto
        this.textoPuntos.setText('Puntos: ' + this.puntos);
    }

    perderVida() {
        let vidas = this.registry.get('vidas');
        vidas--; // Restar una vida
        this.registry.set('vidas', vidas);
        this.textoVidas.setText(`Vidas: ${vidas}`);
        if (vidas <= 0) {
        }
    }
}   