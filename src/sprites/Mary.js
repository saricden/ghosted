import {GameObjects, Math as pMath} from 'phaser';
const {Sprite} = GameObjects;

class Mary extends Sprite {
  constructor({scene, x, y}) {
    super(scene, x, y, 'mary');

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setOrigin(0.5, 1);
    this.body.setSize(this.width, this.height / 3);
    this.body.setOffset(0, 60);

    scene.input.on('pointerdown', (pointer) => {
      const {worldX, worldY} = pointer;

      this.targetX = worldX;
      this.targetY = worldY;
      scene.physics.moveTo(this, worldX, worldY, 100);
    });

    this.targetX = null;
    this.targetY = null;
    this.blockedV = false;
    this.blockedH = false;
    this.animDir = 'down';
  }

  update() {
    this.setDepth(this.y);

    const {left: lBlock, right: rBlock, up: uBlock, down: dBlock} = this.body.blocked;

    this.blockedH = (lBlock || rBlock);
    this.blockedV = (uBlock || dBlock);

    if (this.targetX && this.targetY) {
      const {x: px, y: py} = this;
      const d2p = pMath.Distance.Between(this.targetX, this.targetY, px, py);
      const xDiff = Math.abs(this.targetX - px);
      const yDiff = Math.abs(this.targetY - py);
      
      if ((xDiff < 4 && this.body.velocity.y === 0) || (yDiff < 4 && this.body.velocity.x === 0) || d2p < 4) {
        this.body.setVelocity(0);
        this.targetX = null;
        this.targetY = null;
      }
      else {
        const {x: vx, y: vy} = this.body.velocity;
        const lrOrUD = (Math.abs(vx) > Math.abs(vy));

        if (this.blockedH) {
          this.body.setVelocityX(0);
        }
        else if (this.blockedV) {
          this.body.setVelocityY(0);
        }

        // Going sideways
        if (lrOrUD) {
          this.play({ key: 'mary-walk-side', frameRate: 14, repeat: -1}, true);
          this.animDir = 'side';

          if (vx < 0) {
            this.setFlipX(false);
          }
          else {
            this.setFlipX(true);
          }
        }
        // Going up/down
        else {
          this.setFlipX(false);

          if (vy < 0) {
            this.play({ key: 'mary-walk-up', frameRate: 14, repeat: 0 }, true);
            this.animDir = 'up';
          }
          else if (vy > 0) {
            this.play({ key: 'mary-walk-down', frameRate: 14, repeat: -1 }, true);
            this.animDir = 'down';
          }
        }
      }
    }
    else {
      this.play({ key: `mary-idle-${this.animDir}`, repeat: 0}, true);
    }
  }
}

export default Mary;