import {Scene, Curves} from 'phaser';
const {Path} = Curves;

// Sprites
import DummyNPC from '../sprites/DummyNPC';
import Mary from '../sprites/Mary';

class GameScene extends Scene {

  constructor() {
    super("scene-game");
  }

  create() {
    this.mary = null;

    this.map = this.add.tilemap('city-map1');
    const tileset = this.map.addTilesetImage('tileset1', 'tileset1-extruded', 32, 32, 1, 2);

    this.fg = this.map.createStaticLayer('fg', tileset);
    this.fgSolid = this.map.createStaticLayer('fg-collides', tileset);
    this.bg = this.map.createStaticLayer('bg', tileset);
    this.bg2 = this.map.createStaticLayer('bg2', tileset);
    this.bgSolid = this.map.createStaticLayer('bg-collides', tileset);

    const characters = this.map.getObjectLayer('characters');

    characters.objects.forEach((obj) => {
      if (obj.name === 'mary') {
        const {x, y} = obj;
        this.mary = new Mary({
          scene: this,
          x,
          y
        });
      }
      // else if (obj.name === 'npc') {
      //   const {x, y} = obj;
      //   this.NPCs.push(new DummyNPC({
      //     scene: this,
      //     x,
      //     y
      //   }));
      // }
    });

    const npcPaths = this.map.getObjectLayer('npc-paths');
    this.NPCs = [];

    npcPaths.objects.forEach((path) => {
      const {x, y, width, height} = path;

      const followPath = new Path(x, y).lineTo(width, y).lineTo(width, height).lineTo(x, height).lineTo(x, y);

      const npc = new DummyNPC({
        scene: this,
        path: followPath,
        x,
        y
      });

      npc.setOrigin(0.5, 1);

      npc.startFollow({
        positionOnPath: true,
        duration: 60000,
        // yoyo: true,
        repeat: -1,
        // rotateToPath: true,
        // verticalAdjust: true
      });

      this.NPCs.push(npc);
    });

    // Collision detection
    this.fgSolid.setCollisionByProperty({ collides: true });
    this.bgSolid.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.mary, this.fgSolid);
    this.physics.add.collider(this.mary, this.bgSolid);

    this.physics.add.collider(this.NPCs, this.fgSolid);
    this.physics.add.collider(this.NPCs, this.bgSolid);


    this.cameras.main.startFollow(this.mary);
    // this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setZoom(0.2);
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
    this.fg.setDepth(this.map.heightInPixels);
    this.fgSolid.setDepth(this.map.heightInPixels);
    this.bg.setDepth(0);
    this.bg2.setDepth(-1);
    this.bgSolid.setDepth(0);
  }

}
export default GameScene;