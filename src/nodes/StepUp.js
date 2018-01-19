import {Task, Template as ParentTemplate} from './Task';

NodeTemplate.StepUp = {
  ...ParentTemplate,
  name: 'Step Up',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  category: 'Animation'
}

export default class StepUp extends Task
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
      x: this.owner.position.x ,
      y: this.owner.position.y - window.innerHeight/10
    }

    this.tween = TweenLite.to(this.owner, 1, {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
    this.execution.run();
  }
}