import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.PointerDown = {
  ...ParentTemplate,
  name: 'Hover',
  keywords: [...ParentTemplate.keywords, 'roll over', 'mouse over']
}

export default class PointerOver extends Listener
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

    this.owner.off('pointerover', this.over, this)
  }

  prestart() {
    this.owner.on('pointerover', this.over, this)
  }

  stop() {
    this.owner.off('pointerover', this.over, this)
  }

  over(e) {
    super.run();
    this.execution.run();
  }
}