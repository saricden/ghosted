import {GameObjects} from 'phaser';
const {DOMElement} = GameObjects;

class CellphoneOverlay extends DOMElement {
  constructor({scene, x, y}) {
    super(scene, x, y, null, '', 'Hola');

    this.createFromCache('cellphone-ui');

    this.setClassName('cellphone');

    this.setScrollFactor(0);
    
    const closeBtn = this.getChildByID('close-btn');
    
    closeBtn.addEventListener('click', this.closeOverlay.bind(this));

    scene.add.existing(this);

    this.closeOverlay();
  }

  closeOverlay() {
    const overlay = document.querySelector('#game > div');
    overlay.style.display = "none";
  }

  openOverlay() {
    const overlay = document.querySelector('#game > div');
    overlay.style.display = "block";
  }
}

export default CellphoneOverlay;