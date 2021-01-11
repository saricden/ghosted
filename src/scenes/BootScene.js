import {Scene} from 'phaser';

class BootScene extends Scene {
  constructor() {
    super("scene-boot");
  }
  
  preload() {
    // UI
    this.load.image('cellphone-btn', 'assets/cellphone-btn.png');

    this.load.atlas('mary', 'assets/mary.png', 'assets/mary.json');
    this.load.atlas('dummy-npc', 'assets/dummy-npc.png', 'assets/dummy-npc.json');
    this.load.atlas('npc-shady', 'assets/npc-shady.png', 'assets/npc-shady.json');

    // Map assets
    this.load.tilemapTiledJSON('city-map1', 'assets/city-map1.json');
    this.load.image('tileset1', 'assets/tileset1.png');
    this.load.image('tileset1-extruded', 'assets/tileset1-extruded.png');

    // Cellphone UI
    this.load.html('cellphone-ui', 'assets/cellphone.html');
  }

  create() {
    this.anims.createFromAseprite('mary');
    this.anims.createFromAseprite('dummy-npc');
    this.anims.createFromAseprite('npc-shady');
    
    this.scene.start('scene-game');
  }
}

export default BootScene;