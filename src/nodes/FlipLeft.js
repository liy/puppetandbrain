import Task from './Task';

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

  run() {
    super.run();
    
    this.tween = TweenLite.to(this.owner.scale, 0.2, {x:-this.scaleX, ease:Quad.easeIn})
    this.execution.run();
  }
}