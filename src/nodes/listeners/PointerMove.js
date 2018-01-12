import {Listener} from "./Listener";

export default class PointerMove extends Listener
{
  constructor(id) {
    super(id);
    this.move = this.move.bind(this);
    this.prestart = this.prestart.bind(this);
    this.stop = this.stop.bind(this);

    Stage.on('game.prestart', this.prestart)
    Stage.on('game.stop', this.stop)
  }

  get nodeName() {
    return 'Touch Move'
  }

  destroy() {
    super.destroy();
    this.owner.off('pointermove', this.move)
  }

  prestart() {
    this.owner.on('pointermove', this.move)
  }

  stop() {
    this.owner.off('pointermove', this.move)
  }

  move(e) {
    super.run();
    this.execution.run();
  }
}