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
        this.cameras.main.setBackgroundColor(0x800000);

        // Imagen con borde negro simulando un efecto
        const logo = this.add.image(125, 70, 'LOGO').setScale(0.1);

        // Crear un rectángulo detrás como borde negro
        const border = this.add.rectangle(125, 70, logo.width * 0.1 + 4, logo.height * 0.1 + 4, 0x000000);
        border.setDepth(-1); // enviar al fondo

        logo.setDepth(1); // asegurar que el logo esté sobre el borde

        // Botón Level 1
        const level1 = this.add.text(125, 150, 'Level 1', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        level1.on('pointerdown', () => {
            this.scene.start('Game');
        });

        // Botón Level 2
        const level2 = this.add.text(125, 200, 'Level 2', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        level2.on('pointerdown', () => {
            this.scene.start('Game2');
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