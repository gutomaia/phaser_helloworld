import * as Phaser from 'phaser';
import { GameScene } from './game';


const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene:  GameScene,
  // scale: {
  //   width: game.context.canvas.,
  //   height: 600,
  // },

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },

  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);
