import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.PointerDown = {
  ...ParentTemplate,
  name: 'Unhover',
  keywords: [...ParentTemplate.keywords, 'roll out', 'mouse out']
}

export default class PointerOut extends Listener
{
  constructor(id) {
    super(id);

    Stage.on('game.prestart', this.prestart, this)
    Stage.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    
    Stage.off('game.prestart', this.prestart, this)
    Stage.off('game.stop', this.stop, this)
    
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