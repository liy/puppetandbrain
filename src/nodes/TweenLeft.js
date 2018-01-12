import {Task, Template as TaskTemplate} from './Task';

NodeTemplate.TweenLeft = {
  ...TaskTemplate,
  name: 'Move Left',
  out: ['default', 'completed']
}

export default class TweenLeft extends Task
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

  get nodeName() {
    return "Move Left";
  }

  run() {
    super.run()

    let pos = {
      x: this.owner.position.x - window.innerWidth/10,
      y: this.owner.position.y
    }

    this.tween = TweenLite.to(this.owner, 1, {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
    this.execution.run();
  }
}