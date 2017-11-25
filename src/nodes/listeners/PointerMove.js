import EventListener from "./EventListener";

export default class PointerMove extends EventListener
{
  constructor(id) {
    super(id);
    this.pointermove = this.pointermove.bind(this);
  }

  get nodeName() {
    return 'Touch Move'
  }

  destroy() {
    super.destroy();
    this.owner.removeEventListener('pointermove', this.pointermove)
  }

  prestart() {
    super.prestart();
    this.owner.addEventListener('pointermove', this.pointermove)
  }

  terminate() {
    super.terminate()
    this.owner.removeEventListener('pointermove', this.pointermove)
  }

  pointermove(e) {
    super.run();
    this.execution.run();
  }
}