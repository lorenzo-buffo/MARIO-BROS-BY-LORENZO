import { Scene } from 'phaser';
export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.add.image(2790, 186, "MontañaGrande").setScale(0.7)
        this.add.image(2645, 200, "ArbustoMediano").setScale(0.7)
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
        let posicionX = 3490;
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
         this.add.image(3820, 152, "castillo").setScale(0.8)
         //MONTAÑA ANTES DE BANDERA 
         this.add.image(3630, 186, "MontañaGrande").setScale(0.7)
         
         //crear bandera
         this.add.image(3700,128, "bandera");

         //montañas grandes
         this.add.image(20, 186, "MontañaGrande").setScale(0.7)
         this.add.image(955, 186, "MontañaGrande").setScale(0.7)
         this.add.image(1870, 186, "MontañaGrande").setScale(0.7)
         //montaña chica
         this.add.image(360, 196, "MontañaChica").setScale(0.8)
         this.add.image(1200, 196, "MontañaChica").setScale(0.8)
         this.add.image(2200, 196, "MontañaChica").setScale(0.8)
         this.add.image(3060, 196, "MontañaChica").setScale(0.8)
         
         //ARBUSTO GRANDE
         this.add.image(270, 200, "ArbustoGrande").setScale(0.7)
         this.add.image(2112, 200, "ArbustoGrande").setScale(0.7)
         //arbusto chico
         this.add.image(480, 200, "ArbustoChico").setScale(0.7)
         this.add.image(1370, 200, "ArbustoChico").setScale(0.7)
         this.add.image(2340, 200, "ArbustoChico").setScale(0.7)
         this.add.image(3210, 200, "ArbustoChico").setScale(0.7)
         //arbusto mediano
         this.add.image(800, 200, "ArbustoMediano").setScale(0.7)
         this.add.image(1127, 200, "ArbustoMediano").setScale(0.7)
         this.add.image(1745, 200, "ArbustoMediano").setScale(0.7)

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

        this.goombas = this.physics.add.group();
        this.physics.add.collider(this.goombas, this.bloqueNormal);
        this.physics.add.collider(this.goombas, this.bloqueMisterioso);
        // Crear tubos cortos
        this.goombas.create(420, 208, 'goomba');
        // Goombas adicionales
        this.goombas.create(750, 208, 'goomba');
        this.goombas.create(900, 208, 'goomba');
        this.goombas.create(950, 208, 'goomba');
        this.goombas.create(2180, 208, 'goomba');
        this.goombas.create(2200, 208, 'goomba');
        this.goombas.create(2450, 208, 'goomba');
        this.goombas.create(2500, 208, 'goomba');
        this.goombas.create(2580, 208, 'goomba');
        this.goombas.create(2620, 208, 'goomba');
        this.goombas.create(3250, 208, 'goomba');
        this.goombas.create(3300, 208, 'goomba');
        this.goombas.create(1680, 60, 'goomba');

        this.physics.add.collider(this.goombas, this.cespedColision);
        this.physics.add.collider(this.goombas, this.tubos, this.rebotarGoomba, null, this);
        this.physics.add.collider(this.personaje, this.goombas, this.colisionEnemigoGoomba, null, this);
        this.goombaActiva = false; 

        // Crear los cursores
        this.keys = this.input.keyboard.createCursorKeys();
    }

    update() {

        // No permitir movimiento si el personaje está muerto
        if (this.personaje.isDead) return;
    
        // Aceleración a la derecha
        if (this.keys.right.isDown) {
            this.velocidadActual += this.aceleracion;
            if (this.velocidadActual > this.velocidadMaxima) {
                this.velocidadActual = this.velocidadMaxima;
            }
            this.personaje.setVelocityX(this.velocidadActual);
            this.personaje.flipX = false;
    
            // ANIMACIÓN DE CAMINAR A LA DERECHA
            if (this.personaje.body.touching.down) {
                this.personaje.anims.play("personaje-camina", true);
            }
        }
        // Aceleración a la izquierda
        else if (this.keys.left.isDown) {
            this.velocidadActual -= this.aceleracion;
            if (this.velocidadActual < -this.velocidadMaxima) {
                this.velocidadActual = -this.velocidadMaxima;
            }
            this.personaje.setVelocityX(this.velocidadActual);
            this.personaje.flipX = true;
    
            // ANIMACIÓN DE CAMINAR A LA IZQUIERDA
            if (this.personaje.body.touching.down) {
                this.personaje.anims.play("personaje-camina", true);
            }
        }
        // Cuando no se presiona ninguna tecla
        else {
            if (this.velocidadActual > 0) {
                this.velocidadActual -= this.frenado;
                if (this.velocidadActual < 0) this.velocidadActual = 0;
            } else if (this.velocidadActual < 0) {
                this.velocidadActual += this.frenado;
                if (this.velocidadActual > 0) this.velocidadActual = 0;
            }
    
            this.personaje.setVelocityX(this.velocidadActual);
        // Animación de quieto SOLO si está tocando el suelo
        if (this.personaje.body.touching.down && this.velocidadActual === 0) {
            this.personaje.anims.stop();
            this.personaje.setTexture("personaje", 0); // Frame 0 = personaje quieto
             }
         }
    
         if (this.keys.up.isDown && this.personaje.body.touching.down && !this.estaSaltando) {
            this.personaje.setVelocityY(-300); // impulso inicial
            this.personaje.anims.play("personaje-salta", true);
            this.estaSaltando = true;
            this.tiempoSalto = 0;
        }
        // Mantener el salto más alto mientras se mantiene la tecla
        else if (this.keys.up.isDown && this.estaSaltando && this.tiempoSalto < 18) {
            this.personaje.setVelocityY(this.personaje.body.velocity.y - 15); // impulso extra
            this.tiempoSalto++;
            this.personaje.anims.play("personaje-salta", true);
        }
        // Cuando se suelta la tecla o se supera el tiempo
        if (this.keys.up.isUp) {
            this.estaSaltando = false;
        }
        
        // Si está en el aire y no está saltando (por caída, por ejemplo)
        if (!this.personaje.body.touching.down && !this.estaSaltando) {
            this.personaje.anims.play("personaje-salta", true);
        }
    
        // Detectar muerte por caída
        if (this.personaje.y > 230) {
            this.personaje.isDead = true;
            this.personaje.anims.play("personaje-muere", true);
            this.personaje.setVelocity(0, 0);
            this.personaje.setVelocityY(-400);
    
            this.time.delayedCall(2000, () => {
                this.scene.restart();
            });
        }
    
        if (!this.goombaActiva) {
            const primerGoomba = this.goombas.getFirstAlive();
            if (primerGoomba && Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, primerGoomba.x, primerGoomba.y) < 100) {
                this.goombas.children.iterate(goomba => {
                    if (goomba) {
                        goomba.setVelocityX(-35);
                        goomba.anims.play("goomba-camina", true);
                    }
                });
                this.goombaActiva = true;
            }
        }
    }
    

    colisionEnemigoGoomba(personaje, goombas) {
        if (personaje.body.touching.down && goombas.body.touching.up) {
            goombas.anims.play("goomba-muerte", true);
            goombas.setVelocityX(0);
    
            setTimeout(() => {
                goombas.destroy();
            }, 300);
    
            // Hacemos que el personaje dé un pequeño salto
            personaje.setVelocityY(-350);
        }
        else{
              this.morirPersonaje(personaje);
              goombas.setVelocityX(0)
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