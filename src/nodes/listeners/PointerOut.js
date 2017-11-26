import Listener from "./Listener";

export default class PointerOut extends Listener
{
  constructor(id) {
    super(id);

    Stage.on('game.prestart', this.prestart, this)
    Stage.on('game.stop', this.stop, this)
  }

  get nodeName() {
    return 'Touch Unhover'
  }

  destroy() {
    super.destroy();
    this.owner.off('pointerout', this.out, this)
  }

  prestart() {
    this.owner.on('pointerout', this.out, this)
  }

  stop() {
    this.owner.off('pointerout', this.out, this)
  }

  out(e) {
    super.run();
    this.execution.run();
  }
}