import Listener from "./Listener";

export default class PointerDown extends Listener
{
  constructor(id) {
    super(id);

    this.down = this.down.bind(this);
    this.prestart = this.prestart.bind(this);
    this.stop = this.stop.bind(this);

    Stage.on('game.prestart', this.prestart)
    Stage.on('game.stop', this.stop)
  }

  get nodeName() {
    return 'Touch Start'
  }

  destroy() {
    super.destroy();
    this.owner.off('pointerdown', this.down)
  }

  prestart() {
    this.owner.on('pointerdown', this.down)
  }

  stop() {
    this.owner.off('pointerdown', this.down)
  }

  down(e) {
    super.run();
    this.execution.run();
  }
}