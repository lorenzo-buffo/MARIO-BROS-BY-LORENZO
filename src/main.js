import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { Game2 } from './scenes/Game2';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    parent: 'game-container',
    backgroundColor: '#028af8',
    pixelArt: true,  // Asegura que los sprites se vean nítidos al escalar
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: true,
        },
    },
    input: {
        gamepad: true
      },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        Game2,
        GameOver,
    ]
};

export default new Phaser.Game(config);
