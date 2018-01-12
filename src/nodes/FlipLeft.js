import {Task, Template as ParentTemplate} from './Task';

NodeTemplate.FlipLeft = {
  ...ParentTemplate,
  name: 'Flip Left',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }]
}

export default class FlipLeft extends Task
{
  constructor(id) {
    super(id)
    
    this.stop = this.stop.bind(this);
    this.prestart = this.prestart.bind(this);
    Stage.on('game.stop', this.stop);
    Stage.on('game.prestart', this.prestart)
  }

  destroy() {
    super.destroy();
    
    if(this.tween) this.tween.kill()

    Stage.off('game.stop', this.stop);
    Stage.off('game.prestart', this.prestart);
  }

  prestart() {
    this.scaleX = this.owner.scale.x;
  }

  stop() {
    if(this.tween) this.tween.kill()
  }

  run() {
    super.run();
    
    this.tween = TweenLite.to(this.owner.scale, 0.15, {x:-this.scaleX, ease:Quad.easeIn, onComplete: () => {
      this.execution.run('completed');
    }})
    this.execution.run();
  }
}