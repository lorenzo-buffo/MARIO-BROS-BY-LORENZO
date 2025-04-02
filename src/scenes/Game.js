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
        this.cesped1 = this.add.tileSprite(40, 660, 7400, 80, "cesped");
        this.cesped2 = this.add.tileSprite(4300, 660, 600, 80, "cesped");
        this.cesped3 = this.add.tileSprite(6700, 660, 3600, 80, "cesped");
        this.cesped4 = this.add.tileSprite(10000, 660, 2500, 80, "cesped");
        this.bloqueLargo = this.add.tileSprite(4600, 250, 320, 40, "bloqueNormal");
        this.bloqueInmovil1 = this.add.tileSprite(7600, 600, 160, 40, "bloqueInmovil");
        this.bloqueInmovil2 = this.add.tileSprite(7620, 560, 120, 40, "bloqueInmovil");
        this.bloqueInmovil3 = this.add.tileSprite(7640, 520, 80, 40, "bloqueInmovil");
        this.bloqueInmovil4 = this.add.tileSprite(7900, 600, 160, 40, "bloqueInmovil");
        this.bloqueInmovil5 = this.add.tileSprite(7880, 560, 120, 40, "bloqueInmovil");
        this.bloqueInmovil6 = this.add.tileSprite(7860, 520, 80, 40, "bloqueInmovil");
        this.bloqueInmovil7 = this.add.tileSprite(8400, 600, 200, 40, "bloqueInmovil");
        this.bloqueInmovil8 = this.add.tileSprite(8420, 560, 160, 40, "bloqueInmovil");
        this.bloqueInmovil9 = this.add.tileSprite(8440, 520, 120, 40, "bloqueInmovil");
        this.bloqueInmovil10 = this.add.tileSprite(8460, 480, 80, 40, "bloqueInmovil");
        this.bloqueInmovil11 = this.add.tileSprite(8830, 600, 160, 40, "bloqueInmovil");
        this.bloqueInmovil12 = this.add.tileSprite(8810, 560, 120, 40, "bloqueInmovil");
        this.bloqueInmovil13 = this.add.tileSprite(8810, 560, 120, 40, "bloqueInmovil");
        this.bloqueInmovil12 = this.add.tileSprite(8790, 520, 80, 40, "bloqueInmovil");
        
        
        // Crear grupo estático de colisiones
        this.cespedColision = this.physics.add.staticGroup();
        //colision suelo 1
        this.cespedColision.create(40, 660, null).setSize(7400, 80).setVisible(false);
        //colision suelo 2
        this.cespedColision.create(4300, 660, null).setSize(800, 80).setVisible(false);
        //colision suelo 3
        this.cespedColision.create(6700, 660, null).setSize(3600, 80).setVisible(false);
        // COLISION SUELO 4
        this.cespedColision.create(10000, 660, null).setSize(2500, 80).setVisible(false);
        //colision bloque largo
        this.cespedColision.create(4600, 250, null).setSize(320, 40).setVisible(false);
        //colision bloques inmoviles
        this.cespedColision.create(7600, 600, null).setSize(160, 40).setVisible(false);
        this.cespedColision.create(7620, 560, null).setSize(120, 40).setVisible(false);
        this.cespedColision.create(7640, 520, null).setSize(80, 40).setVisible(false);
        this.cespedColision.create(7900, 600, null).setSize(160, 40).setVisible(false);
        this.cespedColision.create(7880, 560, null).setSize(120, 40).setVisible(false);
        this.cespedColision.create(7860, 520, null).setSize(80, 40).setVisible(false);
        this.cespedColision.create(8400, 600, null).setSize(200, 40).setVisible(false);
        this.cespedColision.create(8420, 560, null).setSize(160, 40).setVisible(false);
        this.cespedColision.create(8440, 520, null).setSize(120, 40).setVisible(false);
        this.cespedColision.create(8460, 480, null).setSize(80, 40).setVisible(false);
        this.cespedColision.create(8830, 600, null).setSize(160, 40).setVisible(false);
        this.cespedColision.create(8810, 560, null).setSize(120, 40).setVisible(false);
        this.cespedColision.create(8790, 520, null).setSize(80, 40).setVisible(false);
       
        //FORMA DE MANEJAR LOS TILES DE MANERA MAS OPTIMA SEGUN EL CHAT
        let anchoBloque = 360;
        let posicionX = 10250;
        let posicionY = 600;

        for (let i = 1; anchoBloque >= 80; i++) {
            this[`bloqueInmovil${i}`] = this.add.tileSprite(posicionX, posicionY, anchoBloque, 40, "bloqueInmovil");
            this.cespedColision.create(posicionX, posicionY, null).setSize(anchoBloque, 40).setVisible(false);
            anchoBloque -= 40;
            posicionY -= 40; // Subir el bloque en el eje Y para que se vea en forma de escalera
            posicionX += 20; // Ajuste en X para un ligero desplazamiento hacia la derecha
        }

         //crear castillo
         this.add.image(10855, 507, "castillo"). setScale(1.5);
         //crear bandera
         this.add.image(10600,403, "bandera");


        // Crear el personaje
        this.personaje = this.physics.add.sprite(40, 550, "personaje").setScale(2.5).setGravityY(1300);
        this.personaje.setCollideWorldBounds(true);
        this.personaje.isDead = false;

        // Colisión entre el personaje y el césped
        this.physics.add.collider(this.personaje, this.cespedColision);

        // Límites del mundo
        this.physics.world.setBounds(0, 0, 11000, 700);

        // Cámara que sigue al jugador
        this.cameras.main.setBounds(0, 0, 11000, 700);
        this.cameras.main.startFollow(this.personaje);

        // Crear el bloque misterioso con la animación
        this.bloqueMisterioso = this.physics.add.staticGroup();
        this.bloqueMisterioso.create(1050, 450, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(1290, 450, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(1330, 250, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(1370, 450, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(4300, 450, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(5150, 250, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(5800, 450, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(5950, 450, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(5950, 250, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(6100, 450, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(7200, 250, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(7240, 250, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.bloqueMisterioso.create(9530, 450, "bloqueMisterioso").play('bloqueMisteriosoAnim');
        this.physics.add.collider(this.personaje, this.bloqueMisterioso);

        //crear bloque noermal
        this.bloqueNormal = this.physics.add.staticGroup();
        this.bloqueNormal.create(1250, 450, "bloqueNormal");
        this.bloqueNormal.create(1330, 450, "bloqueNormal");
        this.bloqueNormal.create(1410, 450, "bloqueNormal");
        this.bloqueNormal.create(4260, 450, "bloqueNormal");
        this.bloqueNormal.create(4340, 450, "bloqueNormal");
        this.bloqueNormal.create(5030, 250, "bloqueNormal");
        this.bloqueNormal.create(5070, 250, "bloqueNormal");
        this.bloqueNormal.create(5110, 250, "bloqueNormal");
        this.bloqueNormal.create(5150, 450, "bloqueNormal");
        this.bloqueNormal.create(5450, 450, "bloqueNormal");
        this.bloqueNormal.create(5490, 450, "bloqueNormal");
        this.bloqueNormal.create(6400, 450, "bloqueNormal");
        this.bloqueNormal.create(6760, 250, "bloqueNormal");
        this.bloqueNormal.create(6800, 250, "bloqueNormal");
        this.bloqueNormal.create(6840, 250, "bloqueNormal");
        this.bloqueNormal.create(6860, 250, "bloqueNormal");
        this.bloqueNormal.create(7200, 450, "bloqueNormal");
        this.bloqueNormal.create(7240, 450, "bloqueNormal");
        this.bloqueNormal.create(7160, 250, "bloqueNormal");
        this.bloqueNormal.create(7280, 250, "bloqueNormal");
        this.bloqueNormal.create(9450, 450, "bloqueNormal");
        this.bloqueNormal.create(9490, 450, "bloqueNormal");
        this.bloqueNormal.create(9570, 450, "bloqueNormal");
        this.physics.add.collider(this.personaje, this.bloqueNormal);

        //bloque inamovible individual
        this.bloqueInmovil = this.physics.add.staticGroup();
        this.bloqueInmovil.create(7660, 480, "bloqueInmovil");
        this.bloqueInmovil.create(7840, 480, "bloqueInmovil");
        this.bloqueInmovil.create(8770, 480, "bloqueInmovil");
        this.bloqueInmovil.create(10600, 600, "bloqueInmovil");
        this.physics.add.collider(this.personaje, this.bloqueInmovil);



        // Crear un grupo único para todos los tubos
        this.tubos = this.physics.add.staticGroup();
        // Crear tubos cortos
        this.tubos.create(1600, 580, "tuboCorto")
        this.tubos.create(9200, 580, "tuboCorto")
        this.tubos.create(10000, 580, "tuboCorto")

        // Crear tubos medianos
        this.tubos.create(2250, 560, "tuboMediano")

        // Crear tubos largos
        this.tubos.create(2700, 540, "tuboLargo")
        this.tubos.create(3300, 540, "tuboLargo")

        // Colisión entre el personaje y los tubos
        this.physics.add.collider(this.personaje, this.tubos);

        // Crear los cursores
        this.keys = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        // No permitir movimiento si el personaje está muerto
        if (this.personaje.isDead) return;

        // Movimiento a la izquierda
        if (this.keys.left.isDown) {
            this.personaje.setVelocityX(-500); 
            this.personaje.flipX = true;
            this.personaje.anims.play("personaje-camina", true);
        }
        // Movimiento a la derecha
        else if (this.keys.right.isDown) {
            this.personaje.setVelocityX(500); 
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
            this.personaje.setVelocityY(-750);
            this.personaje.anims.play("personaje-salta", true);
        } else if (this.personaje.body.velocity.y !== 0) {
            //mantiene la animación de salto mientras está en el aire
            this.personaje.anims.play("personaje-salta", true);
        }


        // Detectar muerte por caída
        if (this.personaje.y > 660) {
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
}