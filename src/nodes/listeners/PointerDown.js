import EventListener from "./EventListener";

export default class PointerDown extends EventListener
{
  constructor(id) {
    super(id);
    this.pointerdown = this.pointerdown.bind(this);
  }

  get nodeName() {
    return 'Touch Start'
  }

  destroy() {
    super.destroy();
    this.owner.removeEventListener('pointerdown', this.pointerdown)
  }

  prestart() {
    super.prestart();
    this.owner.addEventListener('pointerdown', this.pointerdown)
  }

  terminate() {
    super.terminate()
    this.owner.removeEventListener('pointerdown', this.pointerdown)
  }

  pointerdown(e) {
    super.run();
    this.execution.run();
  }
}