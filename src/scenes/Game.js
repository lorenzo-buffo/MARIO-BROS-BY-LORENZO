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
        //crear goombas
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
        this.physics.add.overlap(this.personaje, this.koopa, this.hitKoopa, null, this);
        this.koopaActiva = false;
        
        //HONGOS
        this.hongos = this.physics.add.group({
            allowGravity: true,
        });
        this.physics.add.collider(this.hongos, this.cespedColision);
        this.physics.add.collider(this.hongos, this.bloqueMisterioso);
        this.physics.add.collider(this.hongos, this.bloqueNormal);
        this.physics.add.collider(this.hongos, this.bloquesInmoviles);
        this.physics.add.collider(this.hongos, this.bloquesVacios);
        this.physics.add.collider(this.hongos, this.tubos);

        //bloque vacio
        this.bloquesVacios = this.physics.add.staticGroup();
        this.physics.add.collider(this.personaje, this.bloquesVacios);

        // Crear los cursores
        this.keys = this.input.keyboard.createCursorKeys();

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
                this.personaje.anims.play("personaje-camina", true);
            } else {
                this.personaje.anims.stop();
                this.personaje.setTexture("personaje", 0);
            }
        }

        // Salto
        if (this.keys.up.isDown && this.personaje.body.touching.down && !this.estaSaltando) {
            this.personaje.setVelocityY(-300);
            this.personaje.anims.play("personaje-salta", true);
            this.estaSaltando = true;
            this.tiempoSalto = 0;
        } else if (this.keys.up.isDown && this.estaSaltando && this.tiempoSalto < 18) {
            this.personaje.setVelocityY(this.personaje.body.velocity.y - 15);
            this.tiempoSalto++;
            this.personaje.anims.play("personaje-salta", true);
        }

        // Soltar salto
        if (this.keys.up.isUp) {
            this.estaSaltando = false;
        }

        // Animación en el aire (por caída)
        if (!this.personaje.body.touching.down && !this.estaSaltando) {
            this.personaje.anims.play("personaje-salta", true);
        }

        // Detectar muerte por caída
        if (this.personaje.y > 230) {
            this.personaje.isDead = true;
            this.personaje.anims.play("personaje-muere", true);
            this.personaje.setVelocity(0, -400);

            this.time.delayedCall(2000, () => {
                this.scene.restart();
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
                this.koopa.anims.play("koopa-caminar", true);
                this.koopaActiva = true;
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


        hitKoopa = (personaje, koopa) => {
            if (personaje.body.velocity.y > 0) {
                koopa.destroy();
                personaje.setVelocityY(-350);
        
                // Crear caparazón
                this.caparazon = this.physics.add.sprite(koopa.x, koopa.y, 'Caparazon').setCollideWorldBounds(true);
                this.caparazon.body.setVelocityX(0);
                this.caparazon.moverCaparazon = false;
        
                // Colisiones del caparazón
                this.physics.add.collider(this.caparazon, this.cespedColision);
                this.physics.add.collider(this.caparazon, this.tubos, this.rebotarGoomba, null, this);
                this.physics.add.collider(this.personaje, this.caparazon, this.colisionCaparazon, null, this);
                this.physics.add.collider(this.caparazon, this.muroColision, this.destruirCaparazon, null, this);
                this.physics.add.collider(this.caparazon, this.goombas, this.caparazonMataGoomba, null, this);
        
            } else {
                this.morirPersonaje();
                koopa.setVelocityX(0).disableBody(true, true);
                this.time.delayedCall(1, () => koopa.enableBody(false, 0, 0, true, true));
            }
        }
        
        colisionCaparazon = () => {
            if (!this.caparazon) return;
        
            if (this.caparazon.body.velocity.x === 0 && !this.caparazon.moverCaparazon) {
                this.caparazon.moverCaparazon = true;
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
                    y: bloque.originalY - 16,
                    duration: 300,
                    ease: 'Power1',
                    onComplete: () => {
                        bloque.recolectado = true;
        
                        // Si es de los que deben spawnear hongo
                        if (bloque === this.bloqueMisterioso2 || bloque === this.bloqueMisterioso5 || bloque === this.bloqueMisterioso9) {
                            const hongo = this.hongos.create(bloque.x, bloque.y - 1, "Hongo").setScale(0.5).setBounce(1, 0) ;
                            
                            this.tweens.add({
                                targets: hongo,
                                y: hongo.y - 2,
                                duration: 100,
                                ease: 'Power1',
                                onComplete: () => {
                                    hongo.body.setVelocityX(80); // Hacia la derecha
                                }
                            });
        
                            // Colisión personaje-hongo
                            this.physics.add.collider(this.personaje, hongo, (personaje, objeto) => {
                                objeto.destroy();
                                console.log("¡Hongo recolectado!");
                            });
        
                            // Rebotes hongo con otros objetos
                            this.physics.add.collider(hongo, this.tubos, () => {
                                hongo.body.setVelocityX(-hongo.body.velocity.x); // Cambia dirección
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
        
                        // Vuelve bloque a su posición
                        this.tweens.add({
                            targets: bloque,
                            y: bloque.originalY,
                            duration: 300,
                            ease: 'Power1',
                            onComplete: () => {
                                // Cambiar bloque por bloqueVacio
                                bloque.destroy();
                                const bloqueVacio = this.physics.add.staticSprite(bloque.x, bloque.originalY, 'bloqueVacio');
                                this.physics.add.collider(this.personaje, bloqueVacio);
                            }
                        });
                    }
                });
            }
        };
        
}
