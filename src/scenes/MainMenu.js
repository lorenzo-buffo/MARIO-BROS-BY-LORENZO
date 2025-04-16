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

        // Asegurar que el logo esté sobre el borde
        logo.setDepth(1);
        
        this.add.text(120, 200, 'iniciar juego', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game2');

        });
    }
}