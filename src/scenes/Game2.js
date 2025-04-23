import { Scene } from 'phaser';

export class Game2 extends Scene {
    constructor() {
        super('Game2');
    }

    create() {

        this.cameras.main.setBackgroundColor('#0a0a23'); 

        this.lava1 = this.add.tileSprite(400, this.scale.height - 10, 350, 50, 'lava');
        this.lava2 = this.add.tileSprite(1740, this.scale.height - 10, 70, 50, 'lava');
        this.lava3 = this.add.tileSprite(1820, this.scale.height - 10, 70, 50, 'lava');
        this.lava4 = this.add.tileSprite(2240, this.scale.height - 10, 250, 50, 'lava');
        this.puente = this.add.tileSprite(2235, this.scale.height - 64, 231, 16, 'puente');

        // Suelos
        this.suelo1 = this.add.tileSprite(0, this.scale.height - 200, this.scale.width, 32, 'suelo').setOrigin(0, 0);
        this.suelo2 = this.add.tileSprite(0, this.scale.height - 80, this.scale.width, 112, 'suelo').setOrigin(0, 0);
        this.suelo3 = this.add.tileSprite(600, this.scale.height - 36, 56, 72, 'suelo');
        this.suelo4 = this.add.tileSprite(903, this.scale.height - 24, 550, 48, 'suelo');
        this.suelo5 = this.add.tileSprite(909, this.scale.height - 176, 590, 48, 'suelo');
        this.suelo6 = this.add.tileSprite(900, this.scale.height - 100, 400, 16, 'suelo');
        this.suelo7 = this.add.tileSprite(1200, this.scale.height - 36, 56, 72, 'suelo');
        this.suelo8 = this.add.tileSprite(1450, this.scale.height - 36, 120, 72, 'suelo');
        this.suelo9 = this.add.tileSprite(1603, this.scale.height - 16, 186, 32, 'suelo');
        this.suelo10 = this.add.tileSprite(1702, this.scale.height - 16, 16, 112, 'suelo');
        this.suelo11 = this.add.tileSprite(1780, this.scale.height - 16, 32, 112, 'suelo');
        this.suelo12 = this.add.tileSprite(1902, this.scale.height - 36, 116, 72, 'suelo');
        this.suelo13 = this.add.tileSprite(2038, this.scale.height - 16, 164, 32, 'suelo');
        this.suelo14 = this.add.tileSprite(2022, this.scale.height - 52, 32, 40, 'suelo');
        this.suelo15 = this.add.tileSprite(2103, this.scale.height - 52, 32, 40, 'suelo');
        this.suelo16 = this.add.tileSprite(1460, this.scale.height - 176, 100, 48, 'suelo');
        this.suelo17 = this.add.tileSprite(1983, this.scale.height - 166, 280, 48, 'suelo');
        this.suelo18 = this.add.tileSprite(2358, this.scale.height - 182, 470, 16, 'suelo');
        this.suelo19 = this.add.tileSprite(2500, this.scale.height - 16, 186, 32, 'suelo');
        this.suelo20 = this.add.tileSprite(2379, this.scale.height - 36, 56, 72, 'suelo');
        this.suelo21 = this.add.tileSprite(2387, this.scale.height - 150, 40, 56, 'suelo');
        this.sueloDestuctibe = this.add.tileSprite(2182, this.scale.height - 134, 116, 16, 'suelo');
        

        // Colisiones invisibles
        this.sueloColision = this.physics.add.staticGroup();
        this.sueloColision.create(0, this.scale.height - 185, null).setSize(514, 32).setVisible(false);
        this.sueloColision.create(0, this.scale.height - 25, null).setSize(512, 112).setVisible(false);
        this.sueloColision.create(600, this.scale.height - 36, null).setSize(56, 72).setVisible(false);
        this.sueloColision.create(903, this.scale.height - 24, null).setSize(550, 48).setVisible(false);
        this.sueloColision.create(909, this.scale.height - 176, null).setSize(590, 48).setVisible(false);
        this.sueloColision.create(900, this.scale.height - 100, null).setSize(400, 16).setVisible(false);
        this.sueloColision.create(1200, this.scale.height - 36, null).setSize(56, 72).setVisible(false);
        this.sueloColision.create(1450, this.scale.height - 36, null).setSize(120, 72).setVisible(false);
        this.sueloColision.create(1603, this.scale.height - 16, null).setSize(186, 32).setVisible(false);
        this.sueloColision.create(1702, this.scale.height - 16, null).setSize(16, 112).setVisible(false);
        this.sueloColision.create(1780, this.scale.height - 16, null).setSize(32, 112).setVisible(false);
        this.sueloColision.create(1902, this.scale.height - 36, null).setSize(116, 72).setVisible(false);
        this.sueloColision.create(2038, this.scale.height - 16, null).setSize(164, 32).setVisible(false);
        this.sueloColision.create(2022, this.scale.height - 52, null).setSize(32, 40).setVisible(false);
        this.sueloColision.create(2103, this.scale.height - 52, null).setSize(32, 40).setVisible(false);
        this.sueloColision.create(1460, this.scale.height - 176, null).setSize(100, 48).setVisible(false);
        this.sueloColision.create(1983, this.scale.height - 166, null).setSize(280, 48).setVisible(false);
        this.sueloColision.create(2358, this.scale.height - 182, null).setSize(470, 16).setVisible(false);
        this.sueloColision.create(2500, this.scale.height - 16, null).setSize(186, 32).setVisible(false);
        this.sueloColision.create(2379, this.scale.height - 36, null).setSize(56, 72).setVisible(false);
        this.sueloColision.create(2387, this.scale.height - 150, null).setSize(40, 56).setVisible(false);
        this.sueloColision.create(2235, this.scale.height - 64, null).setSize(231, 16).setVisible(false);

        // Bloques individuales
        this.bloqueSueloIndividual = this.physics.add.staticGroup();
        this.bloqueSueloIndividual.create(8, 156, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(24, 156, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(40, 156, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(56, 156, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(72, 156, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(8, 140, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(24, 140, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(40, 140, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(56, 140, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(8, 124, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(24, 124, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(40, 124, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(316, 156, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(332, 156, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(386, 124, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(402, 124, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(418, 124, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(476, 156, "suelo").refreshBody();
        this.bloqueSueloIndividual.create(492, 156, "suelo").refreshBody();

        this.bloqueMisterioso = this.physics.add.staticGroup();
        this.bloqueMisterioso.create(401, 60 ,"bloqueMisterioso").play('bloqueMisteriosoAnim');

        this.bloqueInmovil = this.physics.add.staticGroup();
        this.bloqueInmovil.create(1620, 188 ,"bloqueVacio")


        // Personaje
        this.personaje = this.physics.add.sprite(10, 100, "PersonajeGrande").setGravityY(1300);
        this.personaje.setCollideWorldBounds(true);
        this.personaje.isDead = false;
        this.velocidadActual = 0;
        this.aceleracion = 3;
        this.velocidadMaxima = 150;
        this.frenado = 30;
        this.estaSaltando = false;
        this.tiempoSalto = 0;

        this.physics.add.collider(this.personaje, this.sueloColision);
        this.physics.add.collider(this.personaje, this.bloqueSueloIndividual);
        this.physics.add.collider(this.personaje, this.bloqueMisterioso);
        this.physics.add.collider(this.personaje, this.bloqueInmovil);

        //camara
   
        this.cameras.main.setBounds(0, 0, 2580, this.scale.height);
        this.physics.world.setBounds(0, 0, 2580, this.scale.height);

      // Plataformas móviles verticales
        this.plataformasMoviles = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        const plataforma1 = this.plataformasMoviles.create(1270, 130, 'suelo').setScale(2, 0.5).refreshBody();
        const plataforma2 = this.plataformasMoviles.create(1350, 130, 'suelo').setScale(2, 0.5).refreshBody();

        plataforma1.originalY = plataforma1.y;
        plataforma2.originalY = plataforma2.y;

        this.physics.add.collider(this.personaje, this.plataformasMoviles);

        // Plataforma móvil horizontal
        this.plataformaHorizontal = this.physics.add.image(2290, 110, 'suelo').setScale(2, 0.5).refreshBody();
        this.plataformaHorizontal.setImmovable(true);
        this.plataformaHorizontal.body.allowGravity = false;
        this.plataformaHorizontal.originalX = this.plataformaHorizontal.x;

        this.physics.add.collider(this.personaje, this.plataformaHorizontal);


        // Fuegos que suben y bajan
        this.fuegos = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });


        // Crear fuegos
        const fuego1 = this.fuegos.create(280, 240, 'Fuego').setScale(0.1).refreshBody();
        fuego1.originalY = fuego1.y;
        const fuego2 = this.fuegos.create(540, 240, 'Fuego').setScale(0.1).refreshBody();
        fuego2.originalY = fuego2.y;

        // Colisión con personaje que mata
        this.physics.add.overlap(this.personaje, this.fuegos, () => {
            if (!this.personaje.isDead) {
                this.personaje.isDead = true;
                this.personaje.anims.play("personaje-muere", true);
                this.personaje.setVelocity(0, -400);

                this.time.delayedCall(2000, () => {
                    this.scene.restart();  // Reiniciar escena
                });
            }
        }, null, this);

        // Crear monedas
        this.monedas = this.physics.add.staticGroup();
        this.monedas.create(1600, 150, "monedaGrande").play('monedaGrande');
        this.monedas.create(1620, 150, "monedaGrande").play('monedaGrande');
        this.monedas.create(1640, 150, "monedaGrande").play('monedaGrande');
        this.monedas.create(1600, 205, "monedaGrande").play('monedaGrande');
        this.monedas.create(1620, 205, "monedaGrande").play('monedaGrande');
        this.monedas.create(1640, 205, "monedaGrande").play('monedaGrande');
        // Colisión del personaje con las monedas
        this.physics.add.overlap(this.personaje, this.monedas, this.recolectarMoneda, null, this);
    
       this.palo = this.add.image(750,145, 'lineaFuego');
       this.palo.setOrigin(0, 0); 

       this.palo1 = this.add.image(850,90, 'lineaFuego');
       this.palo1.setOrigin(0, 0); 

       this.palo2 = this.add.image(950,145, 'lineaFuego');
       this.palo2.setOrigin(0, 0); 

       this.palo3 = this.add.image(1100,145, 'lineaFuego');
       this.palo3.setOrigin(0, 0); 

       this.palo4 = this.add.image(1200,90, 'lineaFuego');
       this.palo4.setOrigin(0, 0); 

       
       this.palo5 = this.add.image(1395,175, 'lineaFuego');
       this.palo5.setOrigin(0, 0); 

       
        //MENSAJE FINAL
       this.mensajeFinal = this.add.text(160, 100, '¡GRACIAS MARIO, PERO LA PRINCESA ESTA EN OTRO CASTILLO!', {
        fontSize: '10px',
        color: '#ffffff',
        wordWrap: { width: 200 },
        align: 'center',
        backgroundColor: '#000000',
      
    }).setOrigin(0.5).setScrollFactor(0).setVisible(false);


        this.keys = this.input.keyboard.createCursorKeys();}

    update() {
        if (this.personaje.isDead) return;
    
        // Comprobar si se está agachando
        if (this.keys.down.isDown && this.personaje.body.touching.down) {
            this.personaje.anims.play("PersonajeGrande-agachado", true);
            this.personaje.body.setSize(16, 16);
            this.personaje.body.offset.y = 16;  // Ajusta la posición si es necesario
        } else {
    
            // Si ya no se presiona abajo y la caja sigue chica, restaurar tamaño
            if (this.personaje.body.height !== 32) {
                this.personaje.body.setSize(16, 32);
                this.personaje.body.offset.y = 0;  // Restaurar posición si cambiaste antes
            }
    
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
                    this.personaje.anims.play("PersonajeGrande-camina", true);
                } else {
                    this.personaje.anims.stop();
                    this.personaje.setTexture("PersonajeGrande", 0);
                }                
            }
    
            // Salto: Inicio y prolongación del salto
            if (this.keys.up.isDown && this.personaje.body.touching.down && !this.estaSaltando) {
                this.personaje.setVelocityY(-350);
                this.personaje.anims.play("PersonajeGrande-salta", true);
                this.estaSaltando = true;
                this.tiempoSalto = 0;
            } else if (this.keys.up.isDown && this.estaSaltando && this.tiempoSalto < 18) {
                this.personaje.setVelocityY(this.personaje.body.velocity.y - 15);
                this.personaje.anims.play("PersonajeGrande-salta", true);
                this.tiempoSalto++;
            }
    
            // Soltar salto
            if (this.keys.up.isUp) {
                this.estaSaltando = false;
            }
    
            // Animación en el aire (por caída) si no se está saltando activamente
            if (!this.personaje.body.touching.down && !this.estaSaltando) {
                this.personaje.anims.play("PersonajeGrande-salta", true);
            }
        }
    
        // Detectar muerte por caída
        if (this.personaje.y > 210) {
            this.personaje.isDead = true;
            this.personaje.anims.play("personaje-muere", true);
            this.personaje.setVelocity(0, -400);
    
            this.time.delayedCall(2000, () => {
                this.scene.restart();  // Reiniciar la escena
            });
        }

        const tiempo = this.time.now * 0.001;
        const amplitud = 100;
        
        // Movimiento vertical alternado de plataformas
        this.plataformasMoviles.getChildren().forEach((plataforma, index) => {
            const offset = index % 2 === 0 ? 0 : Math.PI;
            const nuevaY = plataforma.originalY + Math.sin(tiempo + offset) * amplitud;
            plataforma.setY(nuevaY);
            plataforma.body.reset(plataforma.x, nuevaY); // Actualiza el cuerpo físico
        });
        
        // Movimiento horizontal de la plataforma
        const amplitudHorizontal = 40;
        const nuevaX = this.plataformaHorizontal.originalX + Math.sin(tiempo) * amplitudHorizontal;
        this.plataformaHorizontal.setX(nuevaX);
        this.plataformaHorizontal.body.reset(nuevaX, this.plataformaHorizontal.y);

        //fuegos
        const tiempoFuego = this.time.now * 0.003;
        const amplitudFuego = 110;

        this.fuegos.getChildren().forEach((fuego, index) => {
            const offset = index % 2 === 0 ? 0 : Math.PI / 2;  // Puedes variar con más variedad
            const nuevaY = fuego.originalY + Math.sin(tiempoFuego + offset) * amplitudFuego;
            fuego.setY(nuevaY);
            fuego.body.reset(fuego.x, nuevaY);
            // Si va bajando: gira 180 grados, si va subiendo vuelve a normal.
            const velocidad = Math.cos(this.time.now * 0.003 + offset);
            fuego.setFlipY(velocidad < 0);  // Si la velocidad es negativa, está bajando.
        });
        this.palo.rotation += 0.025; 
        this.palo1.rotation += 0.03; 
        this.palo2.rotation += 0.02; 
        this.palo3.rotation += 0.03; 
        this.palo4.rotation += 0.02; 
        this.palo5.rotation += 0.02; 

        if (this.personaje.x >= 2500 && !this.finalAlcanzado) {
            this.finalAlcanzado = true; // Evita que se ejecute varias veces
            this.mostrarMensajeYGameOver();
        }
        const cam = this.cameras.main;
    const mitadPantalla = cam.width / 2;

    // Solo mover la cámara si el personaje se mueve a la derecha y se pasa del centro
    if (this.personaje.body.velocity.x > 0 && this.personaje.x > cam.scrollX + mitadPantalla) {
        cam.scrollX = this.personaje.x - mitadPantalla;
    }

    // 🧱 LIMITE: Evitar que el personaje vaya más atrás que el borde izquierdo de la cámara
    if (this.personaje.x < cam.scrollX) {
        this.personaje.x = cam.scrollX;
        this.personaje.body.velocity.x = 0;
    }
}
    
    // Función que maneja la recolección de las monedas
    recolectarMoneda = (personaje, moneda) => {
        moneda.disableBody(true, true);  // Desactiva la moneda (la hace invisible y no interactiva)
        this.contadorMonedas += 1;      // Incrementa el contador de monedas
        console.log("Monedas recolectadas: " + this.contadorMonedas);  // Muestra en consola el contador
    };

    mostrarMensajeYGameOver() {
        this.mensajeFinal.setVisible(true);

        // Espera 3 segundos y luego cambia a la escena GameOver
        this.time.delayedCall(5000, () => {
            this.scene.start('GameOver');
        });
    }
}