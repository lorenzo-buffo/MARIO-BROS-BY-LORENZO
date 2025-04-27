import { Scene } from 'phaser';

export class GameOver2 extends Scene
{
    constructor ()
    {
        super('GameOver2');
    }

    create ()
    {
        this.musicaGameOver = this.sound.add('musicaGameOver');
        this.cameras.main.setBackgroundColor(0x800020);
        this.musicaGameOver.play();

        this.add.text(120, 100, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5);

        // Botón Reset
        const resetButton = this.add.image(50, 200, 'restart').setOrigin(0.5).setScale(0.5).setInteractive();

        resetButton.on('pointerdown', () => {
            this.registry.set('vidas', 3); 
            this.scene.start('Game2');  // <- Esto reinicia la escena 'Game'
        });

        // Agrandar al pasar el mouse
        resetButton.on('pointerover', () => {
            resetButton.setScale(0.4); // agrandar un poco
        });

        // Volver al tamaño original al salir
        resetButton.on('pointerout', () => {
            resetButton.setScale(0.5); // volver al tamaño inicial
        });

          // Botón Reset
          const exitButton = this.add.image(200, 200, 'exit').setOrigin(0.5).setScale(0.09).setInteractive();

          exitButton.on('pointerdown', () => {
              this.scene.start('MainMenu');  // <- Esto reinicia la escena 'Game'
          });
  
          // Agrandar al pasar el mouse
          exitButton.on('pointerover', () => {
              exitButton.setScale(0.07); // agrandar un poco
          });
  
          // Volver al tamaño original al salir
          exitButton.on('pointerout', () => {
              exitButton.setScale(0.09); // volver al tamaño inicial
          });
    }
}
