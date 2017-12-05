import Task from './Task';

export default class FlipRight extends Task
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
    return 'Flip Right'
  }

  run() {
    super.run();
    
    this.tween = TweenLite.to(this.owner.scale, 0.15, {x:this.scaleX, ease:Quad.easeIn})
    this.execution.run();
  }
}