import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.ClickEvent = {
  ...ParentTemplate,
  className: 'ClickEvent',
  // I know it is not release and up, but click make sense to non-programmer
  name: 'Click Event',
  execution: [{
    name: 'down'
  }, {
    name: 'up'
  }],
  keywords: [...ParentTemplate.keywords, 'mouse down', 'mouse up']
}

export default class ClickEvent extends Listener
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

    this.owner.off('pointerdown', this.down, this)
    this.owner.off('pointerup', this.up, this)
  }

  prestart() {
    this.owner.on('pointerdown', this.down, this)
    this.owner.on('pointerup', this.up, this)
  }

  stop() {
    this.owner.off('pointerdown', this.down, this)
    this.owner.off('pointerup', this.up, this)
  }

  down(e) {
    super.run();
    this.execution.run('down');
  }

  up(e) {
    super.run();
    this.execution.run('up');
  }
}