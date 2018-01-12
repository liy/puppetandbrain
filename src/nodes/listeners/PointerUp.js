import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.PointerDown = {
  ...ParentTemplate,
  name: 'Release'
}

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

  destroy() {
    super.destroy();

    Stage.off('game.prestart', this.prestart)
    Stage.off('game.stop', this.stop)

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