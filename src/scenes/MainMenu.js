import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // Fondo color rojo granate
        this.add.image(128, 122, 'menuFondo').setOrigin(0.5);

        // Botón Level 1
        const level1 = this.add.text(125, 160, 'Nivel 1', {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        level1.on('pointerdown', () => {
            this.scene.start('Game');
            this.registry.set('vidas', 3);
        });

        // Botón Level 2
        const level2 = this.add.text(125, 200, 'Nivel 2', {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        level2.on('pointerdown', () => {
            this.scene.start('Game2');
            this.registry.set('vidas', 3);
        });

        // Efecto de escala al pasar el puntero
        [level1, level2].forEach(button => {
            button.on('pointerover', () => {
                this.tweens.add({
                    targets: button,
                    scale: 1.2,
                    duration: 150,
                    ease: 'Power2'
                });
            });

            button.on('pointerout', () => {
                this.tweens.add({
                    targets: button,
                    scale: 1,
                    duration: 150,
                    ease: 'Power2'
                });
            });
        });
    }
}