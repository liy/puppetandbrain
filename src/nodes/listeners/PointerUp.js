import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.PointerUp = {
  ...ParentTemplate,
  className: 'PointerUp',
  name: 'Release',
  keywords: [...ParentTemplate.keywords, , 'mouse up']
}

export default class PointerUp extends Listener
{
  constructor(id) {
    super(id);

    Editor.on('game.prestart', this.prestart, this)
    Editor.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();

    Editor.off('game.prestart', this.prestart, this)
    Editor.off('game.stop', this.stop, this)
    this.owner.off('pointerup', this.up, this)
  }

  prestart() {
    this.owner.on('pointerup', this.up, this)
  }

  stop() {
    this.owner.off('pointerup', this.up, this)
  }

  up(e) {
    super.run();
    this.execution.run();
  }
}