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
        this.suelo5 = this.add.tileSprite(909, this.scale.height - 176, 570, 48, 'suelo');
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
        this.sueloColision.create(909, this.scale.height - 176, null).setSize(570, 48).setVisible(false);
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

        // Plataformas móviles
        this.plataformasMoviles = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.plataformasMoviles.create(1270, 120, 'suelo').setScale(2, 0.5).refreshBody();
        this.plataformasMoviles.create(1350, 120, 'suelo').setScale(2, 0.5).refreshBody();
        


        this.physics.add.collider(this.personaje, this.plataformasMoviles);

        this.cameras.main.startFollow(this.personaje);
        this.cameras.main.setBounds(0, 0, 2580, this.scale.height);
        this.physics.world.setBounds(0, 0, 2580, this.scale.height);

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

        this.plataformasMoviles.children.iterate(plataforma => {
            if (!plataforma.originalY) plataforma.originalY = plataforma.y;
            plataforma.y += Math.sin(this.time.now / 500) * 0.5;
            plataforma.body.updateFromGameObject();
        });
    }
          
    
}