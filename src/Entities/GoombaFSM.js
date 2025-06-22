export class GoombaFSM {
    constructor(goomba, scene) {
        this.goomba = goomba;
        this.scene = scene;
        this.state = 'idle';
        this.walkSpeed = -35;
    }

    setState(newState) {
        if (this.state === newState) return;
        if (this.state === 'dead' || this.state === 'deadVolador') return;
        this.state = newState;
        this.enterState();
        console.log(`Goomba cambió a estado: ${this.state}`);
    }

    enterState() {
        switch (this.state) {
            case 'idle':
                this.goomba.setVelocityX(0);
                break;

            case 'walk':
                this.goomba.setVelocityX(this.walkSpeed);
                this.goomba.anims.play('goomba-camina', true);
                break;

            case 'dead':
                this.goomba.anims.play('goomba-muerte', true);
                this.goomba.setVelocity(0);
                this.goomba.body.checkCollision.none = true;
                this.scene.time.delayedCall(300, () => {
                    this.goomba.destroy();
                    this.scene.sumarPuntos(100);
                });
                break;

            case 'deadVolador':
                this.goomba.anims.play('goomba-muerte', true);
                this.goomba.setVelocityY(-200);
                this.goomba.setVelocityX(0);
                this.goomba.body.checkCollision.none = true;
                this.scene.time.delayedCall(300, () => {
                    this.goomba.destroy();
                    this.scene.sumarPuntos(100);
                });
                break;
        }
    }

    update() {
        if (this.state === 'idle') {
            const distance = Phaser.Math.Distance.Between(
                this.scene.personaje.x, this.scene.personaje.y,
                this.goomba.x, this.goomba.y
            );
            if (distance < 200) {
                this.setState('walk');
            }
        }

        if (this.state === 'walk') {
            this.scene.rebotarGoomba(this.goomba);
            this.goomba.flipX = this.goomba.body.velocity.x > 0;
        }
    }
}
