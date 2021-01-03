import {Scene} from 'phaser';
import CellphoneOverlay from '../components/CellphoneOverlay';

class GameUI extends Scene {
  constructor() {
    super('ui-game');
  }

  create() {
    // Cellphone button
    this.cellBtn = this.add.image(window.innerWidth - 10, window.innerHeight - 10, 'cellphone-btn');
    this.cellBtn.setOrigin(1, 1);
    this.cellBtn.setScale(2);

    this.cellBtn.setInteractive();

    this.cellBtn.on('pointerup', () => {
      this.cellphone.openOverlay();
    });

    // Cellphone overlay
    this.cellphone = new CellphoneOverlay({
      x: (window.innerWidth / 2),
      y: (window.innerHeight / 2),
      scene: this
    });
  }
}

export default GameUI;