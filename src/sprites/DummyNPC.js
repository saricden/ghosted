import {GameObjects} from 'phaser';
const {Sprite} = GameObjects;

class DummyNPC extends Sprite {
  constructor({scene, x, y}) {
    super(scene, x, y, 'dummy-npc');

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setOrigin(0.5, 1);

    this.moveSpeed = 50;

    this.body.setVelocityX(this.moveSpeed);
  }

  update() {
    const {left, right} = this.body.blocked;
    this.setDepth(this.y);

    if (left) {
      this.body.setVelocityX(this.moveSpeed);
    }
    else if (right) {
      this.body.setVelocityX(-this.moveSpeed);
    }
  }
}

export default DummyNPC;