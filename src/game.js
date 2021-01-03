import './main.css';
import Phaser, {Game} from 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import GameUI from './scenes/GameUI';

const config = {
  type: Phaser.WEB_GL,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game',
  dom: {
    createContainer: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  pixelArt: true,
  scene: [
    BootScene,
    GameScene,

    GameUI
  ]
};

const game = new Game(config);