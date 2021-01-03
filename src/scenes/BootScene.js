import {Scene} from 'phaser';

class BootScene extends Scene {
  constructor() {
    super("scene-boot");
  }
  
  preload() {
    // UI
    this.load.image('cellphone-btn', 'assets/cellphone-btn.png');

    this.load.atlas('mary', 'assets/mary.png', 'assets/mary.json');

    // Map assets
    this.load.tilemapTiledJSON('city-map1', 'assets/city-map1.json');
    this.load.image('tileset1', 'assets/tileset1.png');

    // Cellphone UI
    this.load.html('cellphone-ui', 'assets/cellphone.html');
  }

  create() {
    this.anims.createFromAseprite('mary');
    
    this.scene.start('scene-game');
  }
}

export default BootScene;