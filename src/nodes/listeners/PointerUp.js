import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.PointerUp = {
  ...ParentTemplate,
  name: 'Release',
  keywords: [...ParentTemplate.keywords, , 'mouse up']
}

export default class PointerUp extends Listener
{
  constructor(id) {
    super(id);
    this.up = this.up.bind(this);
    this.prestart = this.prestart.bind(this);
    this.stop = this.stop.bind(this);

    Editor.on('game.prestart', this.prestart)
    Editor.on('game.stop', this.stop)
  }

  destroy() {
    super.destroy();

    Editor.off('game.prestart', this.prestart)
    Editor.off('game.stop', this.stop)

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