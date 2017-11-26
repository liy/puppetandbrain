import Listener from "./Listener";

export default class PointerDown extends Listener
{
  constructor(id) {
    super(id);
    this.down = this.down.bind(this);
  }

  get nodeName() {
    return 'Touch Start'
  }

  destroy() {
    super.destroy();
    this.owner.off('pointerdown', this.down)
  }

  prestart() {
    super.prestart();
    this.owner.on('pointerdown', this.down)
  }

  terminate() {
    super.terminate()
    this.owner.off('pointerdown', this.down)
  }

  down(e) {
    super.run();
    this.execution.run();
  }
}