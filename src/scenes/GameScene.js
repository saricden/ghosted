import {Scene, Math as pMath} from 'phaser';

// UI
import GameUI from './GameUI';

class GameScene extends Scene {

  constructor() {
    super("scene-game");
  }

  create() {
    this.mary = null;

    const map = this.add.tilemap('city-map1');
    const tileset = map.addTilesetImage('tileset1');

    this.fg = map.createStaticLayer('fg', tileset);
    this.fgSolid = map.createStaticLayer('fg-collides', tileset);
    this.bg = map.createStaticLayer('bg', tileset);
    this.bgSolid = map.createStaticLayer('bg-collides', tileset);

    const characters = map.getObjectLayer('characters');

    characters.objects.forEach((obj) => {
      if (obj.name === 'mary') {
        const {x, y} = obj;
        this.mary = this.physics.add.sprite(x, y, 'mary');
        this.mary.setOrigin(0.5, 1);
        this.mary.body.setSize(this.mary.width, this.mary.height / 3);
      }
    });

    // Collision detection
    this.fgSolid.setCollisionByProperty({ collides: true });
    this.bgSolid.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.mary, this.fgSolid);
    this.physics.add.collider(this.mary, this.bgSolid);

    this.targetX = null;
    this.targetY = null;

    this.input.on('pointerdown', (pointer) => {
      const {worldX, worldY} = pointer;

      this.targetX = worldX;
      this.targetY = worldY;
      this.physics.moveTo(this.mary, worldX, worldY, 100);
    });

    this.cameras.main.startFollow(this.mary);
    this.cameras.main.setZoom(2);
    this.cameras.main.setBackgroundColor(0x45334D);

    this.scene.launch('ui-game');
  }

  update() {
    // Dynamic layering
    this.mary.setDepth(this.mary.y);
    this.fg.setDepth(this.mary.depth + 1);
    this.fgSolid.setDepth(this.mary.depth + 1);
    this.bg.setDepth(this.mary.depth - 1);
    this.bgSolid.setDepth(this.mary.depth - 1);

    const {left: lBlock, right: rBlock, up: uBlock, down: dBlock} = this.mary.body.blocked;


    if (this.targetX && this.targetY) {
      const {x: px, y: py} = this.mary;
      const d2p = pMath.Distance.Between(this.targetX, this.targetY, px, py);

      if (d2p < 4 || lBlock || rBlock || uBlock || dBlock) {
        this.mary.body.reset(this.mary.x, this.mary.y);
        this.targetX = null;
        this.targetY = null;
      }
      else {
        const {x: vx, y: vy} = this.mary.body.velocity;
        const lrOrUD = (Math.abs(vx) > Math.abs(vy));

        // Going sideways
        if (lrOrUD) {
          this.mary.play({ key: 'mary-idle-side', repeat: 0}, true);

          if (vx < 0) {
            this.mary.setFlipX(false);
          }
          else {
            this.mary.setFlipX(true);
          }
        }
        // Going up/down
        else {
          this.mary.setFlipX(false);

          if (vy < 0) {
            this.mary.play({ key: 'mary-idle-up', repeat: 0 }, true);
          }
          else {
            this.mary.play({ key: 'mary-idle-down', repeat: 0 }, true);
          }
        }
      }
    }
  }

}
export default GameScene;