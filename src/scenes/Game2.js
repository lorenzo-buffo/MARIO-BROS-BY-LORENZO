import { Scene } from 'phaser';



export class Game2 extends Scene {
    constructor() {
        super('Game2');
    }

    init(){
        this.puntos = 0;
        this.tiempoRestante = 180;
        // Solo establecer vidas en 3 si no existen aún
    if (this.registry.get('vidas') === undefined) {
        this.registry.set('vidas', 3);
    }
    }

    create() {

        //SONIDOS
        this.sonidoMoneda = this.sound.add('SonidoMoneda')
        this.sonidoSalto = this.sound.add('SonidoSalto')
        this.sonidoRomperBloque = this.sound.add('RomperBloqueSonido')
        this.sonidoDead = this.sound.add('SonidoDead')
        this.sonidoHongo = this.sound.add('SonidoHongo')
        this.sonidoFlor = this.sound.add('SonidoFlor')
        //SONIDOS
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



        //hongo bueno
        this.add.image(2500,200, "hongoBueno")

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

        this.bloqueDestructible = this.physics.add.staticGroup();
        let posicionesX = [2132, 2148, 2164, 2180, 2196, 2212, 2228];
        
        posicionesX.forEach(x => {
            let bloque = this.bloqueDestructible.create(x, 110, "bloqueDestructible");
            bloque.originalY = bloque.y; // Necesario para que suba
        });
        
        this.physics.add.collider(this.personaje, this.bloqueDestructible, (personaje, bloque) => {
            if (
                personaje.body.top <= bloque.y + bloque.height / 2 &&
                personaje.body.bottom > bloque.y - bloque.height / 2 &&
                Math.abs(personaje.x - bloque.x) < bloque.width / 2
            ) {
                this.hacerSaltarBloque(bloque);
            }
        });
       
     


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
        this.physics.add.collider(this.personaje, this.bloqueSueloIndividual);

        this.bloqueMisterioso = this.physics.add.staticGroup();
        let bloque = this.bloqueMisterioso.create(401, 60, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        bloque.originalY = bloque.y;
        
        this.physics.add.collider(this.personaje, this.bloqueMisterioso, (personaje, bloque) => {
            if (
                personaje.body.top <= bloque.y + bloque.height / 2 &&
                personaje.body.bottom > bloque.y - bloque.height / 2 &&
                Math.abs(personaje.x - bloque.x) < bloque.width / 2
            ) {
                this.hacerSaltarBloque(bloque);
            }
        });

        this.bloqueInmovil = this.physics.add.staticGroup();
        this.bloqueInmovil.create(1620, 188 ,"bloqueVacio")
        this.physics.add.collider(this.personaje, this.bloqueInmovil);


        
        //camara
   
        this.cameras.main.setBounds(0, 0, 2580, this.scale.height);
        this.physics.world.setBounds(0, 0, 2580, this.scale.height);

      // Plataformas móviles verticales
        this.plataformasMoviles = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        const plataforma1 = this.plataformasMoviles.create(1270, 130, 'plataformaMovil').refreshBody();
        const plataforma2 = this.plataformasMoviles.create(1350, 130, 'plataformaMovil').refreshBody();

        plataforma1.originalY = plataforma1.y;
        plataforma2.originalY = plataforma2.y;

        this.physics.add.collider(this.personaje, this.plataformasMoviles);

        // Plataforma móvil horizontal
        this.plataformaHorizontal = this.physics.add.image(2290, 110, 'plataformaMovil').refreshBody();
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
        const fuego1 = this.fuegos.create(280, 240, 'Fuego').refreshBody();
        fuego1.originalY = fuego1.y;
        const fuego2 = this.fuegos.create(540, 240, 'Fuego').refreshBody();
        fuego2.originalY = fuego2.y;

        // Colisión con personaje que mata
        this.physics.add.overlap(this.personaje, this.fuegos, () => {
            this.morirPersonaje();
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

        // Crear el grupo de palos (sin colisiones circulares)
this.palos = this.physics.add.group({
    allowGravity: false,
    immovable: true
});

// Función para configurar cada palo con parpadeo y animación
function configurarPalo(x, y, originX, originY, index) {
    // Crear el palo (sin colisión circular)
    const palo = this.palos.create(x - 20, y, 'lineaFuego').setOrigin(originX, originY);

    // Reproducir la animación 'lineaFuegoActiva' en el palo
    palo.anims.play('lineaFuegoActiva', true);  // Reproducir la animación en bucle

    // Crear la variable de Tween para el parpadeo
    let parpadeoTween = null;
    let colisionHabilitada = true;  // Variable para controlar la colisión

    // Alternar el parpadeo visual y la colisión
    this.time.addEvent({
        delay: 3000,  // 3 segundos
        loop: true,
        callback: () => {
            // Alternar colisión
            colisionHabilitada = !colisionHabilitada;

            if (colisionHabilitada) {
                // Restaurar la visibilidad y permitir colisiones
                if (parpadeoTween) {
                    parpadeoTween.stop(); // Detener el parpadeo anterior si existe
                }
                palo.setAlpha(1); // Restaurar visibilidad completa
            } else {
                // Hacer parpadear la imagen del palo (la que está girando)
                if (parpadeoTween) {
                    parpadeoTween.stop(); // Detener el parpadeo anterior si existe
                }

                // Crear nuevo parpadeo para el palo
                parpadeoTween = this.tweens.add({
                    targets: palo,
                    alpha: { from: 0.2, to: 2 }, // Hacerla más tenue (0.2) o más visible (1)
                    duration: 400,
                    yoyo: true,  // Para que regrese a su opacidad original
                    repeat: -1  // Repetir indefinidamente
                });
            }

            // Desactivar colisiones cuando está titilando
            palo.body.enable = colisionHabilitada;
        }
    });

    return palo; // Devolver el palo para mantener acceso a él si es necesario
}

// Crear todos los palos (ahora con animación activa)
this.palo1 = configurarPalo.call(this, 750, 161);
this.palo2 = configurarPalo.call(this, 850, 101);
this.palo2 = configurarPalo.call(this, 1050, 101);
this.palo3 = configurarPalo.call(this, 950, 161);
this.palo4 = configurarPalo.call(this, 1100, 161);
this.palo5 = configurarPalo.call(this, 1200, 101);
this.palo6 = configurarPalo.call(this, 1440, 101);

// Colisión entre el personaje y los palos (llamar a morirPersonaje si colisiona)
this.physics.add.overlap(this.personaje, this.palos, () => {
    // Verificar si la colisión está activada para el palo antes de ejecutar morirPersonaje
    if (this.palos.children.iterate((palo) => palo.body.enable)) {
        this.morirPersonaje();
    }
}, null, this);



        
       
        //MENSAJE FINAL
       this.mensajeFinal = this.add.text(160, 100, '¡GRACIAS MARIO, PERO LA PRINCESA ESTA EN OTRO CASTILLO!', {
        fontSize: '10px',
        color: '#ffffff',
        wordWrap: { width: 200 },
        align: 'center',
        backgroundColor: '#000000',
      
    }).setOrigin(0.5).setScrollFactor(0).setVisible(false);

  // Boss como sprite sin cuerpo físico
this.boss = this.add.sprite(2350, 158, 'Boss')
.setActive(false)
.setVisible(false)
.setOrigin(0.5, 0.5);

// Vida y estado
this.boss.vida = 5;
this.bossActivo = false;
this.bossMuerto = false;

    this.bolasBoss = this.physics.add.group({
        allowGravity: false
    });
    this.time.addEvent({
        delay: 2000, // Cada 2 segundos
        loop: true,
        callback: () => {
            if (this.bossActivo) {
                this.lanzarBolaFuego();
            }
        }
    });
    //this.physics.add.overlap(this.bolasBoss, this.personaje, this.morirPersonaje, null, this);

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
    this.textoVidas.setScrollFactor(0);  // No hacer scroll con la cámar
    
 


        this.keys = this.input.keyboard.createCursorKeys();}
        

        
        

        update() {
           
            if (!this.personaje || !this.personaje.body || this.personaje.isDead) return;
        
            const esFuego = this.personaje.powerUp === "flor";
            
        
            if (this.keys.down.isDown && this.personaje.body.touching.down) {
                if (esFuego) {
                    this.personaje.anims.play("PersonajeFuego-agachado", true);
                } else {
                    this.personaje.anims.play("PersonajeGrande-agachado", true);
                }
                this.personaje.body.setSize(16, 16);
                this.personaje.body.offset.y = 16;
            } else {
                if (this.personaje.body.height !== 32) {
                    this.personaje.body.setSize(16, 32);
                    this.personaje.body.offset.y = 0;
                }
        
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
        
                if (this.personaje.body.touching.down) {
                    if (this.velocidadActual !== 0) {
                        this.personaje.anims.play(esFuego ? "PersonajeFuego-camina" : "PersonajeGrande-camina", true);
                    } else {
                        this.personaje.anims.stop();
                        this.personaje.setTexture(esFuego ? "PersonajeFuego" : "PersonajeGrande", 0);
                    }
                }
        
                if (this.keys.up.isDown && this.personaje.body.touching.down && !this.estaSaltando) {
                    this.personaje.setVelocityY(-350);
                    this.personaje.anims.play(esFuego ? "PersonajeFuego-salta" : "PersonajeGrande-salta", true);
                    this.estaSaltando = true;
                    this.tiempoSalto = 0;
                    this.sonidoSalto.play();
                } else if (this.keys.up.isDown && this.estaSaltando && this.tiempoSalto < 18) {
                    this.personaje.setVelocityY(this.personaje.body.velocity.y - 15);
                    this.personaje.anims.play(esFuego ? "PersonajeFuego-salta" : "PersonajeGrande-salta", true);
                    this.tiempoSalto++;
                }
        
                if (this.keys.up.isUp) {
                    this.estaSaltando = false;
                }
        
                if (!this.personaje.body.touching.down && !this.estaSaltando) {
                    this.personaje.anims.play(esFuego ? "PersonajeFuego-salta" : "PersonajeGrande-salta", true);
                }
            }
        
            if (this.personaje.y > 210) {
                this.morirPersonaje();
            }
        
            const tiempo = this.time.now * 0.001;
            const amplitud = 90;
        
            this.plataformasMoviles.getChildren().forEach((plataforma, index) => {
                const offset = index % 2 === 0 ? 0 : Math.PI;
                const nuevaY = plataforma.originalY + Math.sin(tiempo + offset) * amplitud;
                plataforma.setY(nuevaY);
                plataforma.body.reset(plataforma.x, nuevaY);
            });
        
            const amplitudHorizontal = 40;
            const nuevaX = this.plataformaHorizontal.originalX + Math.sin(tiempo) * amplitudHorizontal;
            this.plataformaHorizontal.setX(nuevaX);
            this.plataformaHorizontal.body.reset(nuevaX, this.plataformaHorizontal.y);
        
            const tiempoFuego = this.time.now * 0.003;
            const amplitudFuego = 110;
        
            this.fuegos.getChildren().forEach((fuego, index) => {
                const offset = index % 2 === 0 ? 0 : Math.PI / 2;
                const nuevaY = fuego.originalY + Math.sin(tiempoFuego + offset) * amplitudFuego;
                fuego.setY(nuevaY);
                fuego.body.reset(fuego.x, nuevaY);
                const velocidad = Math.cos(this.time.now * 0.003 + offset);
                fuego.setFlipY(velocidad < 0);
            });
        
            if (this.personaje.x >= 2500 && !this.finalAlcanzado) {
                this.finalAlcanzado = true;
                this.mostrarMensajeYGameOver();
            }
        
            const cam = this.cameras.main;
            const mitadPantalla = cam.width / 2;
        
            if (this.personaje.body.velocity.x > 0 && this.personaje.x > cam.scrollX + mitadPantalla) {
                cam.scrollX = this.personaje.x - mitadPantalla;
            }
        
            if (this.personaje.x < cam.scrollX) {
                this.personaje.x = cam.scrollX;
                this.personaje.body.velocity.x = 0;
            }
        
            // 💥 Aquí añadimos chequeo para evitar error si this.boss es null
            if (!this.bossActivo && this.boss && this.boss.visible === false) {
                const distancia = Phaser.Math.Distance.Between(
                    this.personaje.x, this.personaje.y,
                    this.boss.x, this.boss.y
                );
        
                if (distancia <= 600) {
                    this.activarBoss();
                }
            }
        
            if (this.bossActivo && this.boss) {
                this.boss.x -= 0.1;
            }
        
            if (this.boss && this.boss.active && this.bossActivo) {
                if (this.proyectiles && this.proyectiles.children) {
                    this.proyectiles.children.iterate((proyectil) => {
                        if (proyectil && this.checkOverlap(proyectil, this.boss)) {
                            proyectil.destroy();
                            this.boss.vida -= 1;
        
                            if (this.boss.vida <= 0) {
                                this.bossMuerto = true;
                            
                                const x = this.boss.x;
                                const y = this.boss.y;
                            
                                this.boss.destroy();
                                this.boss = null;
                            
                                this.puntos += 5000;
                                this.textoPuntos.setText('Puntos: ' + this.puntos);
                            
                                let textoFlotante = this.add.text(x, y, '5000', {
                                    font: '16px Arial',
                                    fill: '#ffffff',
                                    stroke: '#000000',
                                    strokeThickness: 2
                                }).setOrigin(0.5);
                            
                                this.tweens.add({
                                    targets: textoFlotante,
                                    y: y - 50,
                                    alpha: 0,
                                    duration: 1000,
                                    ease: 'Power1',
                                    onComplete: () => textoFlotante.destroy()
                                });
                            }
                        }
                    });
                }
        
                if (!this.bossMuerto) {
                    // Aquí podrías poner lógica de ataque del boss
                }
            }
        }
        
    
    // Función que maneja la recolección de las monedas
    recolectarMoneda = (personaje, moneda) => {
        moneda.disableBody(true, true);  // Desactiva la moneda
        this.contadorMonedas += 1;      // Incrementa el contador
        console.log("Monedas recolectadas: " + this.contadorMonedas);
    
        this.sonidoMoneda.play();       // 🔊 Reproduce el sonido
    };
    

    mostrarMensajeYGameOver() {
        this.mensajeFinal.setVisible(true);

        // Espera 3 segundos y luego cambia a la escena GameOver
        this.time.delayedCall(5000, () => {
            this.scene.start('GameOver');
        });
    }

    activarBoss() {
        if (!this.boss || this.bossMuerto) return; // ahora sí funciona
    
        this.bossActivo = true;
        this.boss.setActive(true);
        this.boss.setVisible(true);
        this.boss.anims.play('BossCamina', true);
    
        console.log('¡El boss ha despertado!');
    }
    
    lanzarBolaFuego() {
        if (!this.boss) return; // Evita errores si el boss fue destruido
    
        const bola = this.bolasBoss.create(this.boss.x - 20, this.boss.y, 'ataqueEnemigo');
        bola.setVelocityX(-150); // Hacia la izquierda
        bola.anims.play('BossAtaca', true);
        console.log("ataques");
    
        bola.setCollideWorldBounds(true);
        bola.body.onWorldBounds = true;
        bola.body.world.on('worldbounds', function(body) {
            if (body.gameObject === bola) {
                bola.destroy();
            }
        });
    }
    
    morirPersonaje() {
        if (this.personaje && !this.personaje.isDead) {
            this.personaje.isDead = true;
            this.personaje.anims.play("personaje-muere", true);
            this.sonidoDead.play()
            this.personaje.setVelocity(0, -400);
    
            // Obtener vidas actuales y restar 1
            let vidas = this.registry.get('vidas') - 1;
            this.registry.set('vidas', vidas);
    
            // Actualizar texto en pantalla
            this.textoVidas.setText('Vidas: ' + vidas);
    
            this.time.delayedCall(2500, () => {
                if (vidas <= 0) {
                    this.scene.start('GameOver'); // Ir a la escena GameOver
                } else {
                    this.scene.restart(); // Reiniciar escena actual
                }
            });
        }
    }
    

hacerSaltarBloque = function(bloque) {
    if (bloque.animando) return;

    bloque.animando = true;

    this.tweens.add({
        targets: bloque,
        y: bloque.originalY - 10,
        duration: 100,
        ease: 'Power1',
        yoyo: true,
        onComplete: () => {
            bloque.animando = false;

            // Solo llamar a generarObjeto si NO es un bloque destructible
            if (bloque.texture.key !== 'bloqueDestructible') {
                this.generarObjeto(bloque.x, bloque.y);

                const nuevoBloque = this.physics.add.sprite(bloque.x, bloque.y, 'bloqueVacio');
                nuevoBloque.setImmovable(true);
                nuevoBloque.body.allowGravity = false;
                nuevoBloque.originalY = bloque.originalY;
                bloque.destroy();
                this.physics.add.collider(this.personaje, nuevoBloque);
            } else {
                // Si es destructible, solo destruirlo después del salto
                bloque.destroy();
                this.sonidoRomperBloque.play()
            }
        }
    });
};

generarObjeto = function(x, y) {
    const flor = this.physics.add.sprite(x, y - 16, 'flor');
    this.sonidoFlor.play()

    flor.body.setAllowGravity(false);
    flor.setImmovable(true);
    flor.setVelocity(0);

    this.tweens.add({
        targets: flor,
        y: flor.y - 10,
        duration: 200,
        ease: 'Power1'
    });

    this.physics.add.overlap(this.personaje, flor, (personaje, flor) => {
        flor.destroy();
        this.sonidoHongo.play();

     
    this.tweens.add({
        targets: personaje,
            scaleX: 1.3,
            scaleY: 1.3,
            yoyo: true,
            repeat: 2,
            duration: 150,
            onComplete: () => {
                personaje.powerUp = "flor";
                personaje.puedeDisparar = true;
        
                personaje.body.setSize(18, 32).setOffset(0, 0);
                personaje.setTexture('PersonajeFuego');
                personaje.anims.play('PersonajeFuego-camina');
        
                personaje.setScale(1);
                personaje.body.enable = true;
        
                console.log("¡Ahora puede lanzar fuego!");
            }
        });
    }, null, this);
    this.proyectiles = this.physics.add.group();

this.input.keyboard.on('keydown-SPACE', () => {
    if (this.personaje.puedeDisparar) {
        this.dispararProyectil();
    }
});
};

dispararProyectil() {
    const offset = this.personaje.flipX ? -10 : 10;
    const x = this.personaje.x + offset;
    const y = this.personaje.y;

    const proyectil = this.proyectiles.create(x, y, 'bolaFuego');
    proyectil.setVelocityX(this.personaje.flipX ? -300 : 300);
    proyectil.setCollideWorldBounds(true);
    proyectil.body.allowGravity = false;

    proyectil.anims.play('BolaFuego', true); // 🌀 Aquí aplicamos la animación

    // Girar si va hacia la izquierda
    proyectil.flipX = this.personaje.flipX;

    // Destruir al salir del mundo
    proyectil.body.onWorldBounds = true;
    proyectil.body.world.on('worldbounds', function(body) {
        if (body.gameObject === proyectil) {
            proyectil.destroy();
        }
    });
}

checkOverlap(spriteA, spriteB) {
    const boundsA = spriteA.getBounds();
    const boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}
}