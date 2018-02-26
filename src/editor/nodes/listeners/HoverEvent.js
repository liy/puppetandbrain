import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.HoverEvent = {
  ...ParentTemplate,
  className: 'HoverEvent',
  name: 'Hover Event',
  execution: [{
    name: 'enter'
  }, {
    name: 'leave'
  }],
  keywords: [...ParentTemplate.keywords, 'roll over', 'mouse over', 'roll out', 'mouse out']
}

export default class HoverEvent extends Listener
{
  constructor(id, activity) {
    super(id, activity);

    ActivityManager.stage.on('game.prestart', this.prestart, this)
    ActivityManager.stage.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    
    Editor.off('game.prestart', this.prestart, this)
    Editor.off('game.stop', this.stop, this)

    this.owner.off('pointerover', this.over, this)
    this.owner.off('pointerout', this.out, this)
  }

  prestart() {
    this.owner.on('pointerover', this.over, this)
    this.owner.on('pointerout', this.out, this)
  }

  stop() {
    this.owner.off('pointerover', this.over, this)
    this.owner.off('pointerout', this.out, this)
  }

  over(e) {
    super.run();
    this.execution.run('enter');
  }

  out(e) {
    super.run();
    this.execution.run('leave');
  }
}