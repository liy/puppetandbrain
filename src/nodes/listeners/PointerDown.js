import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.PointerDown = {
  ...ParentTemplate,
  // I know it is not release and up, but click make sense to non-programmer
  name: 'Click'
}

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

  destroy() {
    super.destroy();
    
    Stage.off('game.prestart', this.prestart)
    Stage.off('game.stop', this.stop)

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