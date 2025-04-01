import { Scene } from 'phaser';
export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
            // Crear el césped 
        this.cesped1 = this.add.tileSprite(40, 660, 7400, 80, "cesped");
        this.cesped2 = this.add.tileSprite(7500, 660, 500, 80, "cesped");
        
        // Crear grupo estático de césped para colisiones
        this.cespedColision = this.physics.add.staticGroup();
        this.cespedColision.create(40, 660, null).setSize(7400, 80).setVisible(false);




        // Crear el personaje
        this.personaje = this.physics.add.sprite(38, 550, "personaje").setScale(2.5).setGravityY(1300);
        this.personaje.setCollideWorldBounds(true);
        this.personaje.isDead = false;

        // Colisión entre el personaje y el césped
        this.physics.add.collider(this.personaje, this.cespedColision);

        // Límites del mundo
        this.physics.world.setBounds(0, 0, 10000, 700);

        // Cámara que sigue al jugador
        this.cameras.main.setBounds(0, 0, 10000, 700);
        this.cameras.main.startFollow(this.personaje);

        // Crear bloque misterioso
        this.bloqueMisterioso = this.physics.add.staticGroup();
        this.bloqueMisterioso.create(1050, 450, "bloqueMisterioso");
        this.bloqueMisterioso.create(1290, 450, "bloqueMisterioso");
        this.bloqueMisterioso.create(1330, 250, "bloqueMisterioso");
        this.bloqueMisterioso.create(1370, 450, "bloqueMisterioso");
        this.physics.add.collider(this.personaje, this.bloqueMisterioso);

        //crear bloque noermal
        this.bloqueNormal = this.physics.add.staticGroup();
        this.bloqueNormal.create(1250, 450, "bloqueNormal");
        this.bloqueNormal.create(1330, 450, "bloqueNormal");
        this.bloqueNormal.create(1410, 450, "bloqueNormal");
        this.physics.add.collider(this.personaje, this.bloqueNormal);

        // Crear un grupo único para todos los tubos
        this.tubos = this.physics.add.staticGroup();
        // Crear tubos cortos
        this.tubos.create(1600, 580, "tuboCorto")

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