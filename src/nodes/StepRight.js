import {Task, Template as ParentTemplate} from './Task';

NodeTemplate.StepRight = {
  ...ParentTemplate,
  name: 'Step Right',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  category: 'Animation'
}

export default class StepRight extends Task
{
  constructor(id) {
    super(id);

    Editor.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    Editor.off('game.stop', this.stop, this)
    if(this.tween) this.tween.kill()
  }

  stop() {
    if(this.tween) this.tween.kill()
  }

  run() {
    super.run()

    let pos = {
      x: this.owner.position.x + window.innerWidth/10,
      y: this.owner.position.y
    }

    this.tween = TweenLite.to(this.owner, 1, {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
    this.execution.run();
  }
}