import { Scene } from 'phaser';
export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // Crear TILES SPRITES  
        this.cesped1 = this.add.tileSprite(0, 244, 2496, 64, "cesped");
        this.cesped2 = this.add.tileSprite(1480, 244, 304, 64, "cesped");
        this.cesped3 = this.add.tileSprite(2295, 244, 1181, 64, "cesped");
        this.cesped4 = this.add.tileSprite(3700, 244, 1500, 64, "cesped");
        this.bloqueLargo = this.add.tileSprite(1600, 80, 152, 16, "bloqueNormal");
        this.bloqueInmovil1 = this.add.tileSprite(2588, 204, 64, 16, "bloqueInmovil");
        this.bloqueInmovil2 = this.add.tileSprite(2596, 188, 48, 16, "bloqueInmovil");
        this.bloqueInmovil3 = this.add.tileSprite(2604, 172, 32, 16, "bloqueInmovil");
        this.bloqueInmovil4 = this.add.tileSprite(2612, 156, 16, 16, "bloqueInmovil");
        this.bloqueInmovil5 = this.add.tileSprite(2700, 204, 64, 16, "bloqueInmovil");
        this.bloqueInmovil6 = this.add.tileSprite(2692, 188, 48, 16, "bloqueInmovil");
        this.bloqueInmovil7 = this.add.tileSprite(2684, 172, 32, 16, "bloqueInmovil");
        this.bloqueInmovil8 = this.add.tileSprite(2676, 156, 16, 16, "bloqueInmovil");
        this.bloqueInmovil9 = this.add.tileSprite(2846, 204, 80, 16, "bloqueInmovil");
        this.bloqueInmovil10 = this.add.tileSprite(2854, 188, 64, 16, "bloqueInmovil");
        this.bloqueInmovil11 = this.add.tileSprite(2862, 172, 48, 16, "bloqueInmovil");
        this.bloqueInmovil12 = this.add.tileSprite(2870, 156, 32, 16, "bloqueInmovil");
        this.bloqueInmovil13 = this.add.tileSprite(2982, 204, 64, 16, "bloqueInmovil");
        this.bloqueInmovil14 = this.add.tileSprite(2974, 188, 48, 16, "bloqueInmovil");
        this.bloqueInmovil14 = this.add.tileSprite(2966, 172, 32, 16, "bloqueInmovil");
        this.bloqueInmovil14 = this.add.tileSprite(2958, 156, 16, 16, "bloqueInmovil");
        
        
        // Crear grupo estático de colisiones
        this.cespedColision = this.physics.add.staticGroup();
        //colision suelo 1
        this.cespedColision.create(0, 244, null).setSize(2496, 64).setVisible(false);
        //colision suelo 2
        this.cespedColision.create(1480, 244, null).setSize(304, 64).setVisible(false);
        //colision suelo 3
        this.cespedColision.create(2295, 244, null).setSize(1181, 64).setVisible(false);
        // COLISION SUELO 4
        this.cespedColision.create(3700, 244, null).setSize(1500, 64).setVisible(false);
        //colision bloque largo
        this.cespedColision.create(1600, 80, null).setSize(152, 16).setVisible(false);
        //colision bloques inmoviles
        this.cespedColision.create(2588, 204, null).setSize(64, 16).setVisible(false);
        this.cespedColision.create(2596, 188, null).setSize(48, 16).setVisible(false);
        this.cespedColision.create(2604, 172, null).setSize(32, 16).setVisible(false);
        this.cespedColision.create(2612, 155, null).setSize(16, 16).setVisible(false);
        this.cespedColision.create(2700, 204, null).setSize(64, 16).setVisible(false);
        this.cespedColision.create(2692, 188, null).setSize(48, 16).setVisible(false);
        this.cespedColision.create(2684, 172, null).setSize(32, 16).setVisible(false);
        this.cespedColision.create(2676, 156, null).setSize(16, 16).setVisible(false);
        this.cespedColision.create(2846, 204, null).setSize(80, 16).setVisible(false);
        this.cespedColision.create(2854, 188, null).setSize(64, 16).setVisible(false);
        this.cespedColision.create(2862, 172, null).setSize(48, 16).setVisible(false);
        this.cespedColision.create(2870, 156, null).setSize(32, 16).setVisible(false);
        this.cespedColision.create(2982, 204, null).setSize(64, 16).setVisible(false);
        this.cespedColision.create(2974, 188, null).setSize(48, 16).setVisible(false);
        this.cespedColision.create(2966, 172, null).setSize(32, 16).setVisible(false);
        this.cespedColision.create(2958, 156, null).setSize(16, 16).setVisible(false);
        
        let anchoBloque = 144; // 9 bloques de 16px = 144
        let posicionX = 3502;
        let posicionY = 204;

        for (let i = 1; anchoBloque >= 16; i++) {
            // Bloque visual centrado
            this[`bloqueInmovil${i}`] = this.add.tileSprite(posicionX, posicionY, anchoBloque, 16, "bloqueInmovil");

            // Crear bloque de colisión con el mismo centro y tamaño
            let bloque = this.cespedColision.create(posicionX, posicionY, null);
            bloque.body.setSize(anchoBloque, 16); // ancho dinámico, alto fijo de 16
            bloque.setVisible(false); // Ocultar visualización si no estás debuggeando

            // Preparar para la siguiente fila
            anchoBloque -= 16;      // Reducir el ancho 1 bloque (16px)
            posicionY -= 16;        // Subir una fila
            posicionX += 8;         // Mover el centro hacia la derecha (la escalera sube)
        }

         //crear castillo
         this.add.image(3800, 137, "castillo");
         //crear bandera
         this.add.image(3678,128, "bandera");

        // Crear el personaje
        this.personaje = this.physics.add.sprite(100, 200, "personaje").setGravityY(1300). setOrigin(0, 1)
        this.personaje.setCollideWorldBounds(true);
        this.personaje.isDead = false;

        // Colisión entre el personaje y el césped
        this.physics.add.collider(this.personaje, this.cespedColision);

        // Límites del mundo
        this.physics.world.setBounds(0, 0, 3900, 244);

        // Cámara que sigue al jugador
        this.cameras.main.setBounds(0, 0, 3900, 244);
        this.cameras.main.startFollow(this.personaje);

        // Crear el bloque misterioso con la animación
        this.bloqueMisterioso = this.physics.add.staticGroup();
        this.bloqueMisterioso.create(330, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        //hongo
        this.bloqueMisterioso.create(416, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(432, 80, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(448, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(1495, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(1800, 80, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(2064, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(2112, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        //hongo
        this.bloqueMisterioso.create(2112, 80, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(2160, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(2472, 80, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(2488, 80, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(3232, 150, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.physics.add.collider(this.personaje, this.bloqueMisterioso);

        //crear bloque noermal
        this.bloqueNormal = this.physics.add.staticGroup();
        this.bloqueNormal.create(400, 150, "bloqueNormal");
        this.bloqueNormal.create(432, 150, "bloqueNormal");
        this.bloqueNormal.create(464, 150, "bloqueNormal");
        this.bloqueNormal.create(1479, 150, "bloqueNormal");
        this.bloqueNormal.create(1511, 150, "bloqueNormal");
        //moneda
        this.bloqueNormal.create(1800, 150, "bloqueNormal");
        this.bloqueNormal.create(1784, 80, "bloqueNormal");
        this.bloqueNormal.create(1768, 80, "bloqueNormal");
        this.bloqueNormal.create(1752, 80, "bloqueNormal");
        this.bloqueNormal.create(1916, 150, "bloqueNormal");
        //de este sale una estrella
        this.bloqueNormal.create(1932, 150, "bloqueNormal");
        this.bloqueNormal.create(2292, 150, "bloqueNormal");
        this.bloqueNormal.create(2340, 80, "bloqueNormal");
        this.bloqueNormal.create(2356, 80, "bloqueNormal");
        this.bloqueNormal.create(2372, 80, "bloqueNormal");
        this.bloqueNormal.create(2456, 80, "bloqueNormal");
        this.bloqueNormal.create(2472, 150, "bloqueNormal");
        this.bloqueNormal.create(2488, 150, "bloqueNormal");
        this.bloqueNormal.create(2504, 80, "bloqueNormal");
        this.bloqueNormal.create(3200, 150, "bloqueNormal");
        this.bloqueNormal.create(3216, 150, "bloqueNormal");
        this.bloqueNormal.create(3248, 150, "bloqueNormal");
        this.physics.add.collider(this.personaje, this.bloqueNormal);

        // Crear un grupo único para todos los tubos
        this.tubos = this.physics.add.staticGroup();
        // Crear tubos cortos
        this.tubos.create(545, 196, "tuboCorto")
        this.tubos.create(3110, 196, "tuboCorto")
        this.tubos.create(3400, 196, "tuboCorto")

        // Crear tubos medianos
        this.tubos.create(730, 188, "tuboMediano")

        // Crear tubos largos
        this.tubos.create(880, 180, "tuboLargo")
        this.tubos.create(1080, 180, "tuboLargo")

        // Colisión entre el personaje y los tubos
        this.physics.add.collider(this.personaje, this.tubos);

        //crear enemigo goomba
        this.goomba = this.physics.add.sprite(500, 200, "goomba").setGravityY(1300)
        this.goomba.anims.play("goomba-camina", true)
        this.physics.add.collider(this.goomba, this.cespedColision);
        this.physics.add.collider(this.goomba, this.tubos);
        this.physics.add.collider(this.personaje, this.goomba, this.colisionEnemigoGoomba, null, this);
        this.goombaActiva = false; 

        // Crear los cursores
        this.keys = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        // No permitir movimiento si el personaje está muerto
        if (this.personaje.isDead) return;

        // Movimiento a la izquierda
        if (this.keys.left.isDown) {
            this.personaje.setVelocityX(-200); 
            this.personaje.flipX = true;
            this.personaje.anims.play("personaje-camina", true);
        }
        // Movimiento a la derecha
        else if (this.keys.right.isDown) {
            this.personaje.setVelocityX(200); 
            this.personaje.flipX = false;
            this.personaje.anims.play("personaje-camina", true);
        }
        else {
            this.personaje.setVelocityX(0); 
            this.personaje.anims.stop();
            this.personaje.setTexture("personaje", 0);
        }

        // Movimiento de salto
        if (this.keys.up.isDown && this.personaje.body.touching.down) {
            this.personaje.setVelocityY(-500);
            this.personaje.anims.play("personaje-salta", true);
        } else if (this.personaje.body.velocity.y !== 0) {
            //mantiene la animación de salto mientras está en el aire
            this.personaje.anims.play("personaje-salta", true);
        }


        // Detectar muerte por caída
        if (this.personaje.y > 230) {
            this.personaje.isDead = true;
            this.personaje.anims.play("personaje-muere", true);
            this.personaje.setVelocity(0, 0);
            this.personaje.setVelocityY(-400);

            // Reiniciar la escena después de 2 segundos
            this.time.delayedCall(2000, () => {
                this.scene.restart();
            });
        }
        if (!this.goombaActiva && Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, this.goomba.x, this.goomba.y) < 500) {
            this.goomba.setVelocityX(-35); // NUEVO: empieza a moverse hacia la izquierda
            this.goombaActiva = true; // NUEVO: ya está activado
        }
    }

    colisionEnemigoGoomba(personaje, goomba) {
        if (personaje.body.touching.down && goomba.body.touching.up) {
            goomba.anims.play("goomba-muerte", true);
            goomba.setVelocityX(0);
    
            setTimeout(() => {
                goomba.destroy();
            }, 300);
    
            // Hacemos que el personaje dé un pequeño salto
            personaje.setVelocityY(-350);
        }
        else{
              this.morirPersonaje(personaje);
              goomba.setVelocityX(0)
        }
    }    

    morirPersonaje(game){
        this.personaje.isDead = true;
            this.personaje.anims.play("personaje-muere", true);
            this.personaje.setVelocity(0, 0);
            this.personaje.setVelocityY(-400);

            // Reiniciar la escena después de 2 segundos
            this.time.delayedCall(2000, () => {
                this.scene.restart();
            });
        }
    }