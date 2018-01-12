import {Task, Template as TaskTemplate} from './Task';

NodeTemplate.FlipLeft = {
  ...TaskTemplate,
  name: 'Flip Left'
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
    Stage.off('game.stop', this.stop);
    Stage.off('game.prestart', this.prestart);
  }

  prestart() {
    this.scaleX = this.owner.scale.x;
  }

  stop() {
    if(this.tween) this.tween.kill()
  }

  get nodeName() {
    return 'Flip Left'
  }

  run() {
    super.run();
    
    this.tween = TweenLite.to(this.owner.scale, 0.15, {x:-this.scaleX, ease:Quad.easeIn})
    this.execution.run();
  }
}