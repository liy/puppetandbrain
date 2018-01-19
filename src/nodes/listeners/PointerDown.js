import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.PointerDown = {
  ...ParentTemplate,
  // I know it is not release and up, but click make sense to non-programmer
  name: 'Click',
  keywords: [...ParentTemplate.keywords, 'mouse down']
}

export default class PointerDown extends Listener
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

    this.owner.off('pointerdown', this.down, this)
  }

  prestart() {
    this.owner.on('pointerdown', this.down, this)
  }

  stop() {
    this.owner.off('pointerdown', this.down, this)
  }

  down(e) {
    super.run();
    this.execution.run();
  }
}