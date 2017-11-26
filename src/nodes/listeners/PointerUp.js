import Listener from "./Listener";

export default class PointerUp extends Listener
{
  constructor(id) {
    super(id);
    this.up = this.up.bind(this);
    this.prestart = this.prestart.bind(this);
    this.stop = this.stop.bind(this);

    Stage.on('game.prestart', this.prestart)
    Stage.on('game.stop', this.stop)
  }

  get nodeName() {
    return 'Touch Stop'
  }

  destroy() {
    super.destroy();
    this.owner.off('pointerup', this.up)
  }

  prestart() {
    this.owner.on('pointerup', this.up)
  }

  stop() {
    this.owner.off('pointerup', this.up)
  }

  up(e) {
    super.run();
    this.execution.run();
  }
}