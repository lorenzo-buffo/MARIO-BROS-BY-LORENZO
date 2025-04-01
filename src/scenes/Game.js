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
        this.cesped1 = this.add.tileSprite(40, 660, 1000, 80, "cesped")
        this.cesped2 = this.add.tileSprite(1150, 660, 500, 80, "cesped")

        // Crear grupo estatico de cesped
        this.cespedColision = this.physics.add.staticGroup();
        this.cespedColision.create(40, 660, null).setSize(1000, 80).setVisible(false);
        this.cespedColision.create(1150, 660, null).setSize(500, 80).setVisible(false);

        // Crear el personaje
        this.personaje = this.physics.add.sprite(38, 550, "personaje").setScale(2.5).setGravityY(500)
        this.personaje.setCollideWorldBounds(true);
        this.personaje.isDead = false; // Bandera para controlar si está muerto

        // Colisión entre el personaje y el césped
        this.physics.add.collider(this.personaje, this.cespedColision);

        //LIMITES DEL MUNDO
        this.physics.world.setBounds(0, 0, 5000, 700); // x, y, ancho, alto

        //agregar camara que siga al jugador
        this.cameras.main.setBounds(0, 0, 5000, 700);
        this.cameras.main.startFollow(this.personaje)


        // Crear los cursores
        this.keys = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        // No permitir movimiento si el personaje está muerto
        if (this.personaje.isDead) return;
    
        // Movimiento a la izquierda
        if (this.keys.left.isDown) {
            this.personaje.x -= 7;
            this.personaje.flipX = true;
            this.personaje.anims.play("personaje-camina", true); 
        } 
        // Movimiento a la derecha
        else if (this.keys.right.isDown) {
            this.personaje.x += 7;
            this.personaje.flipX = false;
            this.personaje.anims.play("personaje-camina", true); 
        } 
        else {
            this.personaje.anims.stop(); 
            this.personaje.setTexture("personaje", 0); 
        }
        if (this.keys.up.isDown){
            this.personaje.y -= 2
            this.personaje.anims.play("personaje,salta", true)
        }
    
        // Movimiento de salto
        if (this.keys.up.isDown && this.personaje.body.touching.down) {
            this.personaje.setVelocityY(-600); 
            this.personaje.anims.play("personaje-salta", true); 
        }
                // Detectar muerte por caída
            if (this.personaje.y > 660) { 
                this.personaje.isDead = true; // Marcar como muerto
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