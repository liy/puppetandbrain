import {Task, Template as ParentTemplate} from './Task';

NodeTemplate.StepUp = {
  ...ParentTemplate,
  name: 'Step Up',
  execution: [{
    executionName: 'default'
  }, {
    executionName: 'completed'
  }]
}

export default class StepUp extends Task
{
  constructor(id) {
    super(id);

    this.stop = this.stop.bind(this);
    Stage.on('game.stop', this.stop)
  }

  destroy() {
    super.destroy();
    Stage.off('game.stop', this.stop)
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