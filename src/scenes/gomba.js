//crear enemigo goomba
this.goomba = this.physics.add.sprite(500, 200, "goomba").setGravityY(1300)
this.goomba.anims.play("goomba-camina", true)
this.physics.add.collider(this.goomba, this.cespedColision);
this.physics.add.collider(this.goomba, this.tubos);
this.physics.add.collider(this.personaje, this.goomba, this.colisionEnemigoGoomba, null, this);
this.goombaActiva = false; 


 // Activar Goomba
 if (!this.goombaActiva && Phaser.Math.Distance.Between(this.personaje.x, this.personaje.y, this.goomba.x, this.goomba.y) < 500) {
    this.goomba.setVelocityX(-35);
    this.goombaActiva = true;
}

colisionEnemigoGoomba(personaje, goomba) 
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
