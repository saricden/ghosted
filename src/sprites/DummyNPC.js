import {GameObjects} from 'phaser';
const {PathFollower} = GameObjects;

class DummyNPC extends PathFollower {
  constructor({scene, path, x, y}) {
    super(scene, path, x, y, 'npc-shady');

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setOrigin(0.5, 1);

    this.play({ key: 'npc-shady-idle-down', repeat: 0 }, true);

    this.prevX = x;
    this.prevY = y;
  }

  update() {
    const {x, y, prevX, prevY} = this;
    this.setDepth(this.y);

    if (x > prevX) {
      this.play({ key: 'npc-shady-idle-side', repeat: 0 }, true);
      this.setFlipX(true);
    }
    else if (x < prevX) {
      this.play({ key: 'npc-shady-idle-side', repeat: 0 }, true);
      this.setFlipX(false);
    }
    else if (y > prevY) {
      this.play({ key: 'npc-shady-idle-down', repeat: 0 }, true);
      this.setFlipX(false);
    }
    else if (y < prevY) {
      this.play({ key: 'npc-shady-idle-up', repeat: 0 }, true);
      this.setFlipX(false);
    }

    this.prevX = x;
    this.prevY = y;
  }
}

export default DummyNPC;