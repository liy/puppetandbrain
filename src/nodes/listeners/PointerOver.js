import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.PointerOver = {
  ...ParentTemplate,
  className: 'PointerOver',
  name: 'Hover',
  keywords: [...ParentTemplate.keywords, 'roll over', 'mouse over']
}

export default class PointerOver extends Listener
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