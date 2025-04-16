import { Scene } from 'phaser';

export class Game2 extends Scene {
    constructor() {
        super('Game2');
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a23');

        // Crear dos suelos en diferentes posiciones
        this.suelo1 = this.add.tileSprite(
            0, this.scale.height - 200, this.scale.width, 32, 'suelo'
        ).setOrigin(0, 0);

        this.suelo2 = this.add.tileSprite(
            0, this.scale.height - 80, this.scale.width, 112, 'suelo'
        ).setOrigin(0, 0);

        this.suelo3 = this.add.tileSprite(
            600,                // Posición X
            this.scale.height - 36,  // Posición Y
            56,                // Ancho reducido
            72,                 // Alto
            'suelo'             // Key de la imagen
        );
        
        this.suelo4 = this.add.tileSprite(
            903,                // Posición X
            this.scale.height - 24,  // Posición Y
            550,                // Ancho reducido
            48,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo5 = this.add.tileSprite(
            909,                // Posición X
            this.scale.height - 176,  // Posición Y
            570,                // Ancho reducido
            48,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo6 = this.add.tileSprite(
            900,                // Posición X
            this.scale.height - 100,  // Posición Y
            400,                // Ancho reducido
            16,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo7 = this.add.tileSprite(
            1200,                // Posición X
            this.scale.height - 36,  // Posición Y
            56,                // Ancho reducido
            72,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo8 = this.add.tileSprite(
            1450,                // Posición X
            this.scale.height - 36,  // Posición Y
            120,                // Ancho reducido
            72,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo9 = this.add.tileSprite(
            1603,                // Posición X
            this.scale.height - 16,  // Posición Y
            186,                // Ancho reducido
            32,                 // Alto
            'suelo'             // Key de la imagen
        );

        
        this.suelo10 = this.add.tileSprite(
            1702,                // Posición X
            this.scale.height - 16,  // Posición Y
            16,                // Ancho reducido
            112,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo11 = this.add.tileSprite(
            1780,                // Posición X
            this.scale.height - 16,  // Posición Y
            32,                // Ancho reducido
            112,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo12 = this.add.tileSprite(
            1902,                // Posición X
            this.scale.height - 36,  // Posición Y
            116,                // Ancho reducido
            72,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo13 = this.add.tileSprite(
            2038,                // Posición X
            this.scale.height - 16,  // Posición Y
            164,                // Ancho reducido
            32,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo14 = this.add.tileSprite(
            2022,                // Posición X
            this.scale.height - 52,  // Posición Y
            32,                // Ancho reducido
            40,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo15 = this.add.tileSprite(
            2103,                // Posición X
            this.scale.height - 52,  // Posición Y
            32,                // Ancho reducido
            40,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo16 = this.add.tileSprite(
            1460,                // Posición X
            this.scale.height - 176,  // Posición Y
            100,                // Ancho reducido
            48,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo17 = this.add.tileSprite(
            1983,                // Posición X
            this.scale.height - 166,  // Posición Y
            280,                // Ancho reducido
            48,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo18 = this.add.tileSprite(
            2358,                // Posición X
            this.scale.height - 182,  // Posición Y
            470,                // Ancho reducido
            16,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo19 = this.add.tileSprite(
            2500,                // Posición X
            this.scale.height - 16,  // Posición Y
            186,                // Ancho reducido
            32,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo20 = this.add.tileSprite(
            2379,                // Posición X
            this.scale.height - 36,  // Posición Y
            56,                // Ancho reducido
            72,                 // Alto
            'suelo'             // Key de la imagen
        );

        this.suelo21 = this.add.tileSprite(
            2387,                // Posición X
            this.scale.height - 150,  // Posición Y
            40,                // Ancho reducido
            56,                 // Alto
            'suelo'             // Key de la imagen
        );

        

        


        this.bloqueSueloIndividual = this.physics.add.staticGroup();
        //escalon 3
        this.bloqueSueloIndividual.create(8, 156, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(24, 156, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(40, 156, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(56, 156, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(72, 156, "suelo").refreshBody()
        //escalon 2
        this.bloqueSueloIndividual.create(8, 140, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(24, 140, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(40, 140, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(56, 140, "suelo").refreshBody()
        //escalon 1
        this.bloqueSueloIndividual.create(8, 124, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(24, 124, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(40, 124, "suelo").refreshBody()
        //suelo flotante 1
        this.bloqueSueloIndividual.create(316, 156, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(332, 156, "suelo").refreshBody()
        // suelo flotante 2
        this.bloqueSueloIndividual.create(386, 124, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(402, 124, "suelo").refreshBody()
        this.bloqueSueloIndividual.create(418, 124, "suelo").refreshBody()
          //suelo flotante 3
          this.bloqueSueloIndividual.create(476, 156, "suelo").refreshBody()
          this.bloqueSueloIndividual.create(492, 156, "suelo").refreshBody()

       

        // Crear personaje con física
        this.personaje = this.physics.add.sprite(1900, 200, "PersonajeGrande");
        this.personaje.setCollideWorldBounds(true);  // Que no se salga del mundo

        // Configurar la cámara para que siga al personaje
        this.cameras.main.startFollow(this.personaje);
        this.cameras.main.setBounds(0, 0, 2580, this.scale.height);  // Mundo más ancho que la pantalla
        this.physics.world.setBounds(0, 0, 2580, this.scale.height);

        // Crear controles de cursor
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Movimiento básico
        if (this.cursors.left.isDown) {
            this.personaje.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.personaje.setVelocityX(160);
        } else {
            this.personaje.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.personaje.body.touching.down) {
            this.personaje.setVelocityY(-330);  // Salto
        }
    }
}

