import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);

       this.add.text(512, 384, "hola")

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
