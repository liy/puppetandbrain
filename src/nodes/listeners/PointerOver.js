import Listener from "./Listener";

export default class PointerDown extends Listener
{
  constructor(id) {
    super(id);
    this.pointerover = this.pointerover.bind(this);
  }

  get nodeName() {
    return 'Touch Hover'
  }

  destroy() {
    super.destroy();
    this.owner.removeEventListener('pointerover', this.pointerover)
  }

  prestart() {
    super.prestart();
    this.owner.addEventListener('pointerover', this.pointerover)
  }

  terminate() {
    super.terminate()
    this.owner.removeEventListener('pointerover', this.pointerover)
  }

  pointerover(e) {
    super.run();
    this.execution.run();
  }
}