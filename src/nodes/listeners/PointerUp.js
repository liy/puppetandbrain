import EventListener from "./EventListener";

export default class PointerUp extends EventListener
{
  constructor(id) {
    super(id);
    this.pointerup = this.pointerup.bind(this)
  }

  get nodeName() {
    return 'Touch Stop'
  }

  destroy() {
    super.destroy();
    this.owner.removeEventListener('pointerup', this.pointerup)
  }

  prestart() {
    super.prestart();
    this.owner.addEventListener('pointerup', this.pointerup)
  }

  terminate() {
    super.terminate()
    this.owner.removeEventListener('pointerup', this.pointerup)
  }

  pointerup(e) {
    super.run();
    this.execution.run();
  }
}