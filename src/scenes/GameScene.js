import {Scene, Math as pMath} from 'phaser';

// Sprites
import DummyNPC from '../sprites/DummyNPC';
import Mary from '../sprites/Mary';

class GameScene extends Scene {

  constructor() {
    super("scene-game");
  }

  create() {
    this.mary = null;

    const map = this.add.tilemap('city-map1');
    const tileset = map.addTilesetImage('tileset1', 'tileset1-extruded', 32, 32, 1, 2);

    this.fg = map.createStaticLayer('fg', tileset);
    this.fgSolid = map.createStaticLayer('fg-collides', tileset);
    this.bg = map.createStaticLayer('bg', tileset);
    this.bg2 = map.createStaticLayer('bg2', tileset);
    this.bgSolid = map.createStaticLayer('bg-collides', tileset);

    const characters = map.getObjectLayer('characters');
    this.NPCs = [];

    characters.objects.forEach((obj) => {
      if (obj.name === 'mary') {
        const {x, y} = obj;
        this.mary = new Mary({
          scene: this,
          x,
          y
        });
      }
      else if (obj.name === 'npc') {
        const {x, y} = obj;
        this.NPCs.push(new DummyNPC({
          scene: this,
          x,
          y
        }));
      }
    });

    // Collision detection
    this.fgSolid.setCollisionByProperty({ collides: true });
    this.bgSolid.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.mary, this.fgSolid);
    this.physics.add.collider(this.mary, this.bgSolid);

    this.physics.add.collider(this.NPCs, this.fgSolid);
    this.physics.add.collider(this.NPCs, this.bgSolid);


    this.cameras.main.startFollow(this.mary);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setZoom(2);
    this.cameras.main.setBackgroundColor(0x45334D);

    this.scene.launch('ui-game');
  }

  update() {
    // Sprite update functions
    this.mary.update();
    this.NPCs.forEach((npc) => {
      if (typeof npc.update === 'function') {
        npc.update();
      }
    });

    // Dynamic layering
    this.fg.setDepth(this.mary.depth + 1);
    this.fgSolid.setDepth(this.mary.depth + 1);
    this.bg.setDepth(this.mary.depth - 1);
    this.bg2.setDepth(this.mary.depth - 2);
    this.bgSolid.setDepth(this.mary.depth - 1);
  }

}
export default GameScene;