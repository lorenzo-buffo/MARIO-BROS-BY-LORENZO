export class KoopaFSM {
    constructor(koopa, scene) {
        this.koopa = koopa;
        this.scene = scene;
        this.state = 'idle';
        this.walkSpeed = -35;
    }

    setState(newState) {
        if (this.state === newState) return;
        if (this.state === 'deadVolador') return;

        this.state = newState;
        this.enterState();
        console.log(`Koopa cambió a estado: ${this.state}`);
    }

    enterState() {
        switch (this.state) {
            case 'idle':
                this.koopa.setVelocityX(0);
                break;

            case 'walk':
                this.koopa.setVelocityX(this.walkSpeed);
                this.koopa.anims.play('koopa-camina', true);
                break;

            case 'deadVolador':
                this.koopa.setTexture('Caparazon');
                this.koopa.setVelocityY(-200);
                this.koopa.setVelocityX(0);
                this.koopa.body.checkCollision.none = true;
                this.scene.time.delayedCall(300, () => {
                    this.koopa.destroy();
                    this.scene.sumarPuntos(150);
                });
                break;

            case 'shell':
                this.koopa.anims.stop(); 
                this.koopa.setTexture('Caparazon');
                this.koopa.setVelocityX(0);
                this.koopa.body.checkCollision.none = false;
                this.koopa.moverCaparazon = false;
                
                this.scene.sumarPuntos(150);
                break;
                
            case 'shell-moving':
                this.koopa.setTexture('Caparazon');
                this.koopa.setVelocityX(this.shellDirection * 200);
                this.koopa.moverCaparazon = true;
                break;
        }
    }

    update() {
        if (['shell', 'shell-moving', 'deadVolador'].includes(this.state)) return;

        if (this.state === 'idle') {
            const distancia = Phaser.Math.Distance.Between(
                this.scene.personaje.x, this.scene.personaje.y,
                this.koopa.x, this.koopa.y
            );
            if (distancia < 200) {
                this.setState('walk');
            }
        }

        if (this.state === 'walk') {
            this.scene.rebotarKoopa(this.koopa);
            this.koopa.flipX = this.koopa.body.velocity.x > 0;
        }

        if (this.state === 'shell-moving') {
            this.scene.rebotarKoopa(this.koopa);
        }
    }

    setDirection(dir) {
        this.shellDirection = dir;
    }

    isMoving() {
        return this.state === 'shell-moving';
    }
}
