import { Scene } from 'phaser';

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
    this.posicionCastillo = 3820;
}

    create() {
        // Imágenes de fondo
        this.add.image(2790, 186, "MontañaGrande").setScale(0.7);
        this.add.image(2645, 200, "ArbustoMediano").setScale(0.7);

        // Crear TILES SPRITES  
        const cespedData = [
            { x: 0, y: 244, w: 2496, h: 64 },
            { x: 1480, y: 244, w: 304, h: 64 },
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
            { x: 0, y: 244, w: 2496, h: 64 },
            { x: 1480, y: 244, w: 304, h: 64 },
            { x: 2295, y: 244, w: 1181, h: 64 },
            { x: 3700, y: 244, w: 1500, h: 64 },
            { x: 1600, y: 80, w: 152, h: 16 },
            { x: 2596, y: 188, w: 48, h: 16 },
            { x: 2604, y: 172, w: 32, h: 16 },
            { x: 2612, y: 155, w: 16, h: 16 },
            { x: 2700, y: 204, w: 64, h: 16 },
            { x: 2692, y: 188, w: 48, h: 16 },
            { x: 2684, y: 172, w: 32, h: 16 },
            { x: 2676, y: 156, w: 16, h: 16 },
            { x: 2846, y: 204, w: 80, h: 16 },
            { x: 2854, y: 188, w: 64, h: 16 },
            { x: 2862, y: 172, w: 48, h: 16 },
            { x: 2870, y: 156, w: 32, h: 16 },
            { x: 2982, y: 204, w: 64, h: 16 },
            { x: 2974, y: 188, w: 48, h: 16 },
            { x: 2966, y: 172, w: 32, h: 16 },
            { x: 2958, y: 156, w: 16, h: 16 }
        ];

        // Crear las colisiones desde los datos
        colisionesData.forEach(data => {
            this.cespedColision.create(data.x, data.y, null)
                .setSize(data.w, data.h)
                .setVisible(false);
        });

        // Crear bloque visual centrado
        let anchoBloque = 144; // 9 bloques de 16px = 144
        let posicionX = 3490;
        let posicionY = 204;

        for (let i = 1; anchoBloque >= 16; i++) {
            this[`bloqueInmovil${i}`] = this.add.tileSprite(posicionX, posicionY, anchoBloque, 16, "bloqueInmovil");

            let bloque = this.cespedColision.create(posicionX, posicionY, null);
            bloque.body.setSize(anchoBloque, 16);
            bloque.setVisible(false);

            // Preparar para la siguiente fila
            anchoBloque -= 16;
            posicionY -= 16;
            posicionX += 8;
        }

        // Crear castillo
        this.add.image(3820, 152, "castillo").setScale(0.8);
        
        // Montaña antes de bandera
        this.add.image(3630, 186, "MontañaGrande").setScale(0.7);
        
        // Crear bandera
        this.add.image(3700, 128, "bandera");

        // Montañas grandes
        this.add.image(20, 186, "MontañaGrande").setScale(0.7);
        this.add.image(955, 186, "MontañaGrande").setScale(0.7);
        this.add.image(1870, 186, "MontañaGrande").setScale(0.7);

        // Montaña chica
        this.add.image(360, 196, "MontañaChica").setScale(0.8);
        this.add.image(1200, 196, "MontañaChica").setScale(0.8);
        this.add.image(2200, 196, "MontañaChica").setScale(0.8);
        this.add.image(3060, 196, "MontañaChica").setScale(0.8);

        // Arbusto grande
        this.add.image(270, 200, "ArbustoGrande").setScale(0.7);
        this.add.image(2112, 200, "ArbustoGrande").setScale(0.7);

        // Arbusto chico
        this.add.image(480, 200, "ArbustoChico").setScale(0.7);
        this.add.image(1370, 200, "ArbustoChico").setScale(0.7);
        this.add.image(2340, 200, "ArbustoChico").setScale(0.7);
        this.add.image(3210, 200, "ArbustoChico").setScale(0.7);

        // Arbusto mediano
        this.add.image(800, 200, "ArbustoMediano").setScale(0.7);
        this.add.image(1127, 200, "ArbustoMediano").setScale(0.7);
        this.add.image(1745, 200, "ArbustoMediano").setScale(0.7);

         //nube chica
         this.add.image(130, 50, "NubeChica").setScale(0.2)
         this.add.image(380, 30, "NubeChica").setScale(0.2)
         this.add.image(1060, 50, "NubeChica").setScale(0.2)
         this.add.image(1250, 30, "NubeChica").setScale(0.2)
         this.add.image(2050, 50, "NubeChica").setScale(0.2)
         this.add.image(2260, 30, "NubeChica").setScale(0.2)
         this.add.image(2900, 50, "NubeChica").setScale(0.2)
         this.add.image(3150, 30, "NubeChica").setScale(0.2)
         this.add.image(3750, 50, "NubeChica").setScale(0.2)

         //nube grande
         this.add.image(590, 50, "NubeGrande").setScale(0.8)
         this.add.image(1470, 50, "NubeGrande").setScale(0.8)
         this.add.image(2410, 50, "NubeGrande").setScale(0.8)
         this.add.image(3330, 50, "NubeGrande").setScale(0.8)

         //nube mediana
         this.add.image(740, 30, "NubeMediana").setScale(0.2)
         this.add.image(1650, 30, "NubeMediana").setScale(0.2)
         this.add.image(2570, 30, "NubeMediana").setScale(0.2)
         this.add.image(3480, 30, "NubeMediana").setScale(0.2)
         
        // Crear el personaje
        this.personaje = this.physics.add.sprite(10, 200, "personaje").setGravityY(1300). setOrigin(0, 1)
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
        this.cameras.main.startFollow(this.personaje);

        
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
        this.physics.add.collider(this.personaje, this.bloqueMisterioso, (personaje, bloque) => {
         // Verifica si la parte superior del personaje está tocando la parte superior del bloque
        // Y además, que el personaje esté dentro de un rango en el eje X del bloque para evitar activaciones por los costados
        if (
             personaje.body.top <= bloque.y + bloque.height / 2 && 
            personaje.body.bottom > bloque.y - bloque.height / 2 &&
            Math.abs(personaje.x - bloque.x) < bloque.width / 2 // Verifica que el personaje esté dentro del rango de la anchura del bloque
         ) {
            // Llamar a la función para hacer saltar el bloque solo cuando el personaje toque la parte superior
            this.hacerSaltarBloque(bloque);
            }
        });
        
        

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
            { x: 1932, y: 150 },  // <-- Este tendrá estrella
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
        ];

        posicionesBloques.forEach(pos => {
            const bloque = this.bloqueNormal.create(pos.x, pos.y, "bloqueNormal");
            // Asignar la propiedad originalY a cada bloque
            bloque.originalY = pos.y;
            // Asignar tieneEstrella solo al bloque de la posición 1932,150
            bloque.tieneEstrella = (pos.x === 1932 && pos.y === 150);
        });
        this.physics.add.collider(this.personaje, this.bloqueNormal, (personaje, bloque) => {
            this.hacerSaltarBloqueNormal(bloque);
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

        this.physics.add.collider(this.goombas, this.cespedColision);
        this.physics.add.collider(this.goombas, this.tubos, this.rebotarGoomba, null, this);
        this.physics.add.collider(this.personaje, this.goombas, this.colisionEnemigoGoomba, null, this);
        this.goombaActiva = false; 


        // Crear al Koopa
        this.koopa = this.physics.add.sprite(2150, 208, 'koopa');
        this.koopa.setVelocityX(0);  // Quieto al principio.
        this.koopa.setCollideWorldBounds(true);
        this.physics.add.collider(this.koopa, this.cespedColision);
        this.physics.add.collider(this.personaje, this.koopa, this.hitKoopa, null, this);
        this.koopaActiva = false;

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
        // Crear los cursores

        //crear movimiento con teclas
        this.keys = this.input.keyboard.createCursorKeys();
        
        // texto y puntos
        this.textoPuntos = this.add.text(10, 10, 'Puntos: 0', {
            font: '14px Arial',
            fill: '#ffffff',
            stroke: '#000000',         // Color del borde (negro)
            strokeThickness: 2         // Grosor del borde
        });
        this.textoPuntos.setScrollFactor(0);

        this.textoTemporizador = this.add.text(170, 10, 'Tiempo: 3:00', {
            font: '14px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2         // Grosor del borde
        });
        this.textoTemporizador.setScrollFactor(0);
        this.timerEvento = this.time.addEvent({
            delay: 1000, // cada 1 segundo
            callback: () => {
                this.tiempoRestante--;

                // Formatear minutos y segundos
                let minutos = Math.floor(this.tiempoRestante / 60);
                let segundos = this.tiempoRestante % 60;

                this.textoTemporizador.setText('Tiempo: ' + minutos + ':' + (segundos < 10 ? '0' + segundos : segundos));

                if (this.tiempoRestante <= 0) {
                    this.timerEvento.remove();  // Parar el temporizador
                    this.scene.start('GameOver');  // Cambiar a la escena GameOver
                }
            },
            callbackScope: this,
            loop: true
        });

           // Crear texto de vidas en pantalla, accediendo al valor correcto desde el registro
    this.textoVidas = this.add.text(100, 10, 'Vidas: ' + this.registry.get('vidas'), {
        font: '14px Arial',
        fill: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2
    });
    this.textoVidas.setScrollFactor(0);  // No hacer scroll con la cámara

    }

    update() {
        // No permitir movimiento si está muerto
        if (this.personaje.isDead) return;
    
        // Movimiento horizontal
        if (this.keys.right.isDown) {
            this.velocidadActual = Math.min(this.velocidadActual + this.aceleracion, this.velocidadMaxima);
            this.personaje.setVelocityX(this.velocidadActual);
            this.personaje.flipX = false;
        } else if (this.keys.left.isDown) {
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
    
        // Animación de caminar o quieto (solo si está en el suelo)
        if (this.personaje.body.touching.down) {
            if (this.velocidadActual !== 0) {
                // Si se mové
                if (this.personaje.powerUp === "flor") {
                    this.personaje.anims.play("PersonajeFuego-camina", true);
                } else if (this.personaje.powerUp) {
                    this.personaje.anims.play("PersonajeGrande-camina", true);
                } else {
                    this.personaje.anims.play("personaje-camina", true);
                }
            } else {
                // Cuando el personaje está quieto
                this.personaje.anims.stop();
                if (this.personaje.powerUp === "flor") {
                    // Mostrar solo el primer frame de PersonajeFuego (asegurate de que el frame 0 es el idle)
                    this.personaje.setTexture("PersonajeFuego", 0);
                } else if (this.personaje.powerUp) {
                    this.personaje.setTexture("PersonajeGrande", 0);
                } else {
                    this.personaje.setTexture("personaje", 0);
                }
            }                
        }
    
        // Salto: Inicio y prolongación del salto
        if (this.keys.up.isDown && this.personaje.body.touching.down && !this.estaSaltando) {
            this.personaje.setVelocityY(-350);
            if (this.personaje.powerUp === "flor") {
                this.personaje.anims.play("PersonajeFuego-salta", true);
            } else if (this.personaje.powerUp) {
                this.personaje.anims.play("PersonajeGrande-salta", true);
            } else {
                this.personaje.anims.play("personaje-salta", true);
            }
            this.estaSaltando = true;
            this.tiempoSalto = 0;
        } else if (this.keys.up.isDown && this.estaSaltando && this.tiempoSalto < 18) {
            this.personaje.setVelocityY(this.personaje.body.velocity.y - 15);
            if (this.personaje.powerUp === "flor") {
                this.personaje.anims.play("PersonajeFuego-salta", true);
            } else if (this.personaje.powerUp) {
                this.personaje.anims.play("PersonajeGrande-salta", true);
            } else {
                this.personaje.anims.play("personaje-salta", true);
            }
            this.tiempoSalto++;
        }
    
        // Soltar salto
        if (this.keys.up.isUp) {
            this.estaSaltando = false;
        }
    
        // Animación en el aire (por caída) si no se está saltando activamente
        if (!this.personaje.body.touching.down && !this.estaSaltando) {
            if (this.personaje.powerUp === "flor") {
                this.personaje.anims.play("PersonajeFuego-salta", true);
            } else if (this.personaje.powerUp) {
                this.personaje.anims.play("PersonajeGrande-salta", true);
            } else {
                this.personaje.anims.play("personaje-salta", true);
            }
        }
    
        // Detectar muerte por caída
        if (this.personaje.y > 230) {
            this.personaje.isDead = true;
            this.personaje.anims.play("personaje-muere", true);
            this.personaje.setVelocity(0, -400);
    
            // Restar una vida cuando muere por caída
            this.perderVida();  // Llamar a la función que resta vida
    
            this.time.delayedCall(2000, () => {
                this.scene.restart();  // Reiniciar la escena
            });
        }
    
        // Activar goombas
        this.goombas.children.iterate(goomba => {
            if (!goomba.activado && Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, goomba.x, goomba.y) < 200) {
                if (goomba.anims.getName() !== "goomba-muerte") {
                    goomba.setVelocityX(-35);
                    goomba.anims.play("goomba-camina", true);
                    goomba.activado = true;
                }
            }
        });
    
        // Activar koopa
        if (!this.koopaActiva) {
            const distancia = Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, this.koopa.x, this.koopa.y);
            if (distancia < 200 && this.koopa.anims.getName() !== "koopa-muerte") {
                this.koopa.setVelocityX(-35);
                this.koopa.anims.play("koopa-camina", true);
                this.koopaActiva = true;
            }
        }
        if (this.personaje.x >= this.posicionCastillo) {
            this.scene.start('GameOver');
        }
    }
    
    colisionEnemigoGoomba(personaje, goombas) {
        if (personaje.invencible) {
            // Salen volando y luego se destruyen
            goombas.setVelocityY(-500);
            goombas.setVelocityX(Phaser.Math.Between(-100, 100));  // Aleatorio para más estilo
            goombas.body.checkCollision.none = true;
            this.time.delayedCall(500, () => {
                goombas.destroy();
                this.sumarPuntos(100);
    
                let textoFlotante = this.add.text(goombas.x, goombas.y, '100', {
                    font: '16px Arial',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 2
                });
    
                this.tweens.add({
                    targets: textoFlotante,
                    y: goombas.y - 50,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power1',
                    onComplete: () => textoFlotante.destroy()
                });
            });
        } 
        else if (personaje.body.touching.down && goombas.body.touching.up) {
            goombas.anims.play("goomba-muerte", true);
            goombas.setVelocityX(0);
            setTimeout(() => {
                goombas.destroy();
                this.sumarPuntos(100);
    
                let textoFlotante = this.add.text(goombas.x, goombas.y, '100', {
                    font: '16px Arial',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 2
                });
    
                this.tweens.add({
                    targets: textoFlotante,
                    y: goombas.y - 50,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power1',
                    onComplete: () => textoFlotante.destroy()
                });
            }, 300);
            personaje.setVelocityY(-350);
        } 
        else {
            // Si es invulnerable por daño, no hacer nada
            if (personaje.invulnerable) return;
    
            if (personaje.powerUp) {
                personaje.powerUp = false;
                personaje.invulnerable = true;
    
                // Desactivar colisiones mientras se hace la transformación
                personaje.body.enable = false;
    
                // Animación de transformación
                this.tweens.add({
                    targets: personaje,
                    scaleX: 1.3,
                    scaleY: 1.3,
                    yoyo: true,
                    repeat: 2,
                    duration: 150,
                    onComplete: () => {
                        // Cambio de estado a personaje normal
                        personaje.body.setSize(16, 16).setOffset(0, 0);
                        personaje.anims.play('personaje-camina', true);  // Cambia la animación a caminar
    
                        // Resetear escala
                        personaje.setScale(1);
    
                        // Habilitar las físicas nuevamente
                        personaje.body.enable = true;
    
                        console.log("El personaje perdió el poder del hongo");
                        this.pausarEnemigos();
                    }
                });
    
                // Recuperar estado normal después de 1 segundo
                this.time.delayedCall(1000, () => {
                    personaje.invulnerable = false;
                });
            } else {
                this.morirPersonaje(personaje);
            }
        }
    }
    
    

    hitKoopa = (personaje, koopa) => {
        if (personaje.invencible) {
            koopa.setVelocityY(-500);
            koopa.setVelocityX(Phaser.Math.Between(-100, 100));
            koopa.body.checkCollision.none = true;
            this.time.delayedCall(500, () => {
                koopa.destroy();
                this.sumarPuntos(150);
    
                let textoFlotante = this.add.text(koopa.x, koopa.y, '150', {
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
            });
        } 
        else if (personaje.body.touching.down && koopa.body.touching.up) {
            this.sumarPuntos(150);
    
            let textoFlotante = this.add.text(koopa.x, koopa.y, '150', {
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
    
            personaje.setVelocityY(-350);
    
            this.caparazon = this.physics.add.sprite(koopa.x, koopa.y, 'Caparazon').setCollideWorldBounds(true);
            this.caparazon.body.setVelocityX(0);
            this.caparazon.moverCaparazon = false;
    
            this.physics.add.collider(this.caparazon, this.cespedColision);
            this.physics.add.collider(this.caparazon, this.tubos, this.rebotarGoomba, null, this);
            this.physics.add.collider(this.personaje, this.caparazon, this.colisionCaparazon, null, this);
            this.physics.add.collider(this.caparazon, this.muroColision, this.destruirCaparazon, null, this);
            this.physics.add.collider(this.caparazon, this.goombas, this.caparazonMataGoomba, null, this);
    
            koopa.destroy();
        } 
        else {
            if (personaje.invulnerable) return;
    
            if (personaje.powerUp) {
                personaje.powerUp = false;
                personaje.invulnerable = true;
    
                // Desactivar colisiones mientras se hace la transformación
                personaje.body.enable = false;
    
                // Animación de transformación
                this.tweens.add({
                    targets: personaje,
                    scaleX: 1.3,
                    scaleY: 1.3,
                    yoyo: true,
                    repeat: 2,
                    duration: 150,
                    onComplete: () => {
                        // Cambio de estado a personaje normal
                        personaje.body.setSize(16, 16).setOffset(0, 0);
                        personaje.anims.play('personaje-camina', true);  // Cambia la animación a caminar
    
                        // Resetear escala
                        personaje.setScale(1);
    
                        // Habilitar las físicas nuevamente
                        personaje.body.enable = true;
    
                        console.log("El personaje perdió el poder del hongo");
                        this.pausarEnemigos();
                    }
                });
    
                // Recuperar estado normal después de 1 segundo
                this.time.delayedCall(1000, () => {
                    personaje.invulnerable = false;
                });
            } else {
                this.morirPersonaje(personaje);
            }
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
    

    morirPersonaje(personaje) {
        personaje.isDead = true;
        personaje.anims.play("personaje-muere", true);
    
        // Desactivar las colisiones mientras dura la animación de muerte
        personaje.body.checkCollision.none = true;
        
        // Detener el movimiento del personaje durante la muerte
        personaje.setVelocity(0, -400);
    
        // Restar una vida
        this.perderVida();
    
        // Verificar si es la última vida después de restar la vida
        if (this.registry.get('vidas') <= 0) {
            // Si es la última vida, después de la animación de muerte, se va a Game Over
           
                this.registry.set('vidas', 3); // Restablecer las 3 vidas
                this.scene.start('GameOver'); // Iniciar la escena de Game Over
            
        } else {
            // Si aún quedan vidas, reiniciar la escena
            this.time.delayedCall(2000, () => {
                personaje.body.checkCollision.none = false; // Reactivar las colisiones
                this.scene.restart(); // Reiniciar la escena
            });
        }
    }
    
    

    pausarEnemigos() {
        this.goombas.getChildren().forEach(goomba => {
            goomba.body.oldVelocityX = goomba.body.velocity.x;
            goomba.setVelocityX(0);
            goomba.body.moves = false;  // 👉 Bloquear movimiento físico
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
    
        
        
    colisionCaparazon = () => {
        if (!this.caparazon) return;
        
        if (this.caparazon.body.velocity.x === 0 && !this.caparazon.moverCaparazon) {
            this.caparazon.moverCaparazon = true;
            this.caparazon.body.setVelocityX(200);  // Activa movimiento
        
            this.sumarPuntos(50);  // Sumar 50 puntos
        
            // Crear texto flotante
            let textoFlotante = this.add.text(this.caparazon.x, this.caparazon.y, '50', {
                font: '16px Arial',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2
            });
        
            // Animar el texto flotante para que suba y desaparezca
            this.tweens.add({
                targets: textoFlotante,
                y: this.caparazon.y - 50,
                alpha: 0,
                duration: 1000,
                ease: 'Power1',
                onComplete: () => {
                    textoFlotante.destroy();
                }
            });
        }
        
        if (this.caparazon.moverCaparazon) {
            this.caparazon.body.setVelocityX(200);
        }
    }
        
        
    destruirCaparazon = (caparazon) => {
        caparazon.destroy();
    }
    
    caparazonMataGoomba = (caparazon, goomba) => {
        goomba.body.setVelocityY(-200);
        caparazon.body.setVelocityX(200);
        this.time.delayedCall(200, () => goomba.destroy());
    }
    
    hacerSaltarBloque = function(bloque) {
        if (!bloque.recolectado) {
            this.tweens.add({
                targets: bloque,
                y: bloque.originalY - 10,
                duration: 100,
                ease: 'Power1',
                onComplete: () => {
                    bloque.recolectado = true;
    
                    // Llamar a la función para crear el hongo o la moneda
                    this.generarObjeto(bloque);
    
                    // Vuelve el bloque a su posición original
                    this.tweens.add({
                        targets: bloque,
                        y: bloque.originalY,
                        duration: 100,
                        ease: 'Power1',
                        onComplete: () => {
                            bloque.destroy();
                            const bloqueVacio = this.physics.add.staticSprite(bloque.x, bloque.originalY, 'bloqueVacio');
                            this.physics.add.collider(this.personaje, bloqueVacio);
                        }
                    });
                }
            });
        }
    };
    
    hacerSaltarBloqueNormal = function(bloque) {
        // Verificamos si el personaje está tocando la parte superior del bloque (lado 1)
        if (!bloque.recolectado &&
            this.personaje.body.touching.up && // Verifica si el personaje está tocando la parte superior del bloque
            this.personaje.body.y + this.personaje.body.height >= bloque.y) { // Verifica si la parte superior del personaje toca la parte superior del bloque
            
            // Elevamos el bloque
            this.tweens.add({
                targets: bloque,
                y: bloque.originalY - 10,
                duration: 100,
                ease: 'Power1',
                onComplete: () => {
                    bloque.recolectado = true; // Marcamos como recolectado para evitar que se eleve varias veces simultáneamente
    
                    if (bloque.tieneEstrella) {
                        this.generarObjeto(bloque);
                    }
    
                    // Si el personaje es grande, destruimos el bloque
                    if (this.personaje.powerUp) {
                        bloque.destroy();
                        console.log("¡Bloque destruido!");
                    } else {
                        // Vuelve el bloque a su posición original
                        this.tweens.add({
                            targets: bloque,
                            y: bloque.originalY,
                            duration: 100,
                            ease: 'Power1',
                            onComplete: () => {
                                // Después de que vuelva a su posición original, permitimos que se eleve de nuevo
                                bloque.recolectado = false;
                            }
                        });
                    }
                }
            });
        }
    };
    
    generarObjeto = function(bloque) {
        if (bloque.tieneEstrella) {
    
            bloque.tieneEstrella = false;  // 👈 Esto evita que se genere otra estrella
        
            const estrella = this.physics.add.sprite(bloque.x, bloque.y - 10, "estrella")
                .setScale(0.9)
                .setBounce(0.8, 0.8)
                .setCollideWorldBounds(true)
                .setGravityY(300);
        
            estrella.body.setVelocityX(80);
            estrella.body.setVelocityY(-50);
        
            this.physics.add.overlap(this.personaje, estrella, (personaje, estrella) => {
                estrella.destroy();
                console.log("¡Estrella recolectada!");
                personaje.invencible = true;
        
                personaje.setTint(0x00ff00);
                let intervalId = this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        if (personaje.invencible) {
                            const color = Phaser.Display.Color.RandomRGB().color;
                            personaje.setTint(color);
                        }
                    },
                    loop: true
                });
        
                this.time.delayedCall(10000, () => {
                    personaje.invencible = false;
                    personaje.clearTint();
                    intervalId.remove();
                });
            });
    
            // Rebote con bloques inmóviles (cambia dirección al colisionar)
            this.physics.add.collider(estrella, this.bloquesInmoviles, () => {
                estrella.body.setVelocityX(estrella.body.velocity.x * -1);  // Invertir dirección horizontal
                // Mantener el rebote vertical constante sin perder altura
                if (estrella.body.velocity.y > 0) {  // Si la estrella está cayendo
                    estrella.body.setVelocityY(-50);  // Mantener la velocidad de rebote
                }
            });
    
            // Colisiones con otros objetos (bloques normales, tubos, etc.)
            this.physics.add.collider(estrella, this.tubos, () => {
                estrella.body.setVelocityX(estrella.body.velocity.x * -1);  // Invertir dirección horizontal
                // Mantener el rebote vertical constante
                if (estrella.body.velocity.y > 0) {  // Si la estrella está cayendo
                    estrella.body.setVelocityY(-50);  // Mantener la velocidad de rebote
                }
            });
            this.physics.add.collider(estrella, this.bloqueNormal, () => {
                estrella.body.setVelocityX(estrella.body.velocity.x * -1);  // Invertir dirección horizontal
                // Mantener el rebote vertical constante
                if (estrella.body.velocity.y > 0) {  // Si la estrella está cayendo
                    estrella.body.setVelocityY(-50);  // Mantener la velocidad de rebote
                }
            });
            this.physics.add.collider(estrella, this.bloqueMisterioso, () => {
                estrella.body.setVelocityX(estrella.body.velocity.x * -1);  // Invertir dirección horizontal
                // Mantener el rebote vertical constante
                if (estrella.body.velocity.y > 0) {  // Si la estrella está cayendo
                    estrella.body.setVelocityY(-50);  // Mantener la velocidad de rebote
                }
            });
    
            // Colisión con el suelo (cespedColision), si es necesario
            this.physics.add.collider(estrella, this.cespedColision, () => {
                // La estrella sigue rebotando pero sin perder altura
                if (estrella.body.velocity.y > 0) {  // Si la estrella está cayendo
                    estrella.body.setVelocityY(-50);  // Mantener la velocidad de rebote
                }
                // Limitar el rebote en el eje Y para que nunca suba más de 150 píxeles
                if (estrella.y < 150) {
                    estrella.body.setVelocityY(estrella.body.velocity.y * -1);  // Asegura que no suba demasiado
                }
            });
    
        } else if (bloque === this.bloqueMisterioso2 || bloque === this.bloqueMisterioso5) {
            // Hongo normal
            const hongo = this.hongos.create(bloque.x, bloque.y - 1, "Hongo").setScale(0.8).setBounce(1, 0);
        
            this.tweens.add({
                targets: hongo,
                y: hongo.y - 1,
                duration: 100,
                ease: 'Power1',
                onComplete: () => {
                    hongo.body.setVelocityX(80);
                }
            });
        
            this.physics.add.collider(this.personaje, hongo, (personaje, objeto) => {
                objeto.destroy();
                console.log("¡Hongo recolectado!");
            
                // Desactivar colisiones momentáneamente
                personaje.body.enable = false;
            
                // Tween de "transformación rápida" (agranda y achica 2 veces)
                this.tweens.add({
                    targets: personaje,
                    scaleX: 1.3,
                    scaleY: 1.3,
                    yoyo: true,
                    repeat: 2,
                    duration: 150,
                    onComplete: () => {
                        // Cambiar estado a powerUp
                        personaje.powerUp = true;
            
                        // Ajustar cuerpo y animación
                        personaje.body.setSize(18, 32).setOffset(0, 0);
                        personaje.anims.play('PersonajeGrande-camina');
            
                        // Resetear escala
                        personaje.setScale(1);
            
                        // Volver a habilitar físicas
                        personaje.body.enable = true;
            
                        console.log("¡El personaje se hizo grande!");
                    }
                });
            });
    
            this.physics.add.collider(hongo, this.tubos, () => {
                hongo.body.setVelocityX(-hongo.body.velocity.x);
            });
            this.physics.add.collider(hongo, this.bloquesInmoviles, () => {
                hongo.body.setVelocityX(-hongo.body.velocity.x);
            });
            this.physics.add.collider(hongo, this.bloqueNormal, () => {
                hongo.body.setVelocityX(-hongo.body.velocity.x);
            });
            this.physics.add.collider(hongo, this.bloqueMisterioso, () => {
                hongo.body.setVelocityX(-hongo.body.velocity.x);
            });

        } else if (bloque === this.bloqueMisterioso9) {
            if (this.personaje.powerUp) {
                // FLOR si el personaje es grande
                const flor = this.physics.add.sprite(bloque.x, bloque.y - 16, "flor").setScale(0.9);
                flor.body.setAllowGravity(false);  // Que no caiga
                flor.body.setImmovable(true);      // Que no se mueva
        
                // Colisión con personaje
                this.physics.add.overlap(this.personaje, flor, (personaje, objeto) => {
                    objeto.destroy();
                    console.log("¡Flor recolectada!");
        
                    personaje.body.enable = false;
        
                    // Tween de "poder"
                    this.tweens.add({
                        targets: personaje,
                        scaleX: 1.3,
                        scaleY: 1.3,
                        yoyo: true,
                        repeat: 2,
                        duration: 150,
                        onComplete: () => {
                            personaje.powerUp = "flor";
        
                            personaje.body.setSize(18, 32).setOffset(0, 0);
                            personaje.setTexture('PersonajeFuego');
                            personaje.anims.play('PersonajeFuego-camina');
        
                            personaje.setScale(1);
                            personaje.body.enable = true;
        
                            console.log("¡Ahora puede lanzar fuego!");
                    // Aquí agregas la detección de la tecla:
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
                // HONGO si el personaje es chico
                const hongo = this.hongos.create(bloque.x, bloque.y - 1, "Hongo").setScale(0.8).setBounce(1, 0);
        
                this.tweens.add({
                    targets: hongo,
                    y: hongo.y - 1,
                    duration: 100,
                    ease: 'Power1',
                    onComplete: () => {
                        hongo.body.setVelocityX(80);
                    }
                });
        
                this.physics.add.collider(this.personaje, hongo, (personaje, objeto) => {
                    objeto.destroy();
                    console.log("¡Hongo recolectado!");
        
                    personaje.body.enable = false;
        
                    // Tween de "agrandar"
                    this.tweens.add({
                        targets: personaje,
                        scaleX: 1.3,
                        scaleY: 1.3,
                        yoyo: true,
                        repeat: 2,
                        duration: 150,
                        onComplete: () => {
                            personaje.powerUp = true;
        
                            personaje.body.setSize(18, 32).setOffset(0, 0);
                            personaje.anims.play('personaje-grande-camina');
        
                            personaje.setScale(1);
                            personaje.body.enable = true;
        
                            console.log("¡El personaje se hizo grande!");
                        }
                    });
                });
        
                // colliders para el hongo
                this.physics.add.collider(hongo, this.tubos, () => {
                    hongo.body.setVelocityX(-hongo.body.velocity.x);
                });
                this.physics.add.collider(hongo, this.bloquesInmoviles, () => {
                    hongo.body.setVelocityX(-hongo.body.velocity.x);
                });
                this.physics.add.collider(hongo, this.bloqueNormal, () => {
                    hongo.body.setVelocityX(-hongo.body.velocity.x);
                });
                this.physics.add.collider(hongo, this.bloqueMisterioso, () => {
                    hongo.body.setVelocityX(-hongo.body.velocity.x);
                });
            }
        } else {
            // Generar moneda
            const moneda = this.moneda.create(bloque.x, bloque.y - 1, "Moneda").setScale(0.8);
            moneda.anims.play('monedaGira', true);
    
            this.tweens.add({
                targets: moneda,
                y: moneda.y - 20,
                duration: 600,
                ease: 'Power1',
                onComplete: () => {
                    moneda.destroy();
    
                    this.sumarPuntos(50);  // Sumar 50 puntos por la moneda
                    console.log("¡Moneda recolectada!");
    
                    // Crear texto flotante
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
                        onComplete: () => {
                            textoFlotante.destroy();
                        }
                    });
                }
            });
        } 
    }

    habilitarDisparoFuego = function() {
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.personaje.powerUp === "flor") {
                const bolaFuego = this.physics.add.sprite(this.personaje.x, this.personaje.y - 10, 'BolaFuego')
                    .setVelocityX(this.personaje.flipX ? -200 : 200);
    
                bolaFuego.body.setAllowGravity(false);
                bolaFuego.anims.play('BolaFuego', true);
                bolaFuego.setCollideWorldBounds(true);
                bolaFuego.body.onWorldBounds = true;
    
                this.physics.world.on('worldbounds', function(body) {
                    if (body.gameObject === bolaFuego) {
                        bolaFuego.destroy();
                    }
                });
    
                // Colisiones con Goombas
                this.physics.add.overlap(bolaFuego, this.goombas, (bola, goomba) => {
                    goomba.anims.play("goomba-muerte", true);
                    goomba.setVelocityX(0);
                    bola.destroy();
                    this.time.delayedCall(300, () => {
                        goomba.destroy();
                        this.sumarPuntos(100);
                        let textoFlotante = this.add.text(goomba.x, goomba.y, '100', {
                            font: '16px Arial',
                            fill: '#ffffff',
                            stroke: '#000000',
                            strokeThickness: 2
                        });
                        this.tweens.add({
                            targets: textoFlotante,
                            y: goomba.y - 50,
                            alpha: 0,
                            duration: 1000,
                            ease: 'Power1',
                            onComplete: () => textoFlotante.destroy()
                        });
                    });
                }, null, this);
    
                // Colisiones con Koopa
                this.physics.add.overlap(bolaFuego, this.koopas, (bola, koopa) => {
                    bola.destroy();
                    koopa.destroy();
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
    
                this.physics.add.collider(bolaFuego, this.bloqueMisterioso, () => {
                    bolaFuego.destroy();
                }, null, this);
    
                this.physics.add.collider(bolaFuego, this.bloqueNormal, () => {
                    bolaFuego.destroy();
                }, null, this);
    
                this.physics.add.collider(bolaFuego, this.bloquesInmoviles, () => {
                    bolaFuego.destroy();
                }, null, this);
    
                this.physics.add.collider(bolaFuego, this.bloquesVacios, () => {
                    bolaFuego.destroy();
                }, null, this);
    
                this.physics.add.collider(bolaFuego, this.tubos, () => {
                    bolaFuego.destroy();
                }, null, this);
            }
        });
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