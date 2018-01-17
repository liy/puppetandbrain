import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.PointerOut = {
  ...ParentTemplate,
  name: 'Unhover',
  keywords: [...ParentTemplate.keywords, 'roll out', 'mouse out']
}

export default class PointerOut extends Listener
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