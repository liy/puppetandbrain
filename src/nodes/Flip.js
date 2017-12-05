import Task from './Task';

export default class Flip extends Task
{
  constructor(id) {
    super(id)
    
    this.stop = this.stop.bind(this);
    Stage.on('game.stop', this.stop)

    this.variables.direction = 'x'
    this.inputs.addInput('direction');
  }

  destroy() {
    super.destroy();
    Stage.off('game.stop', this.stop);
  }

  stop() {
    if(this.tween) this.tween.kill()
  }

  run() {
    super.run();
    
    let dir = this.inputs.value('direction').toLowerCase();
    if(dir == 'y' || dir == 'vertical') {
      // this.owner.scale.y *= -1;
      let s = this.owner.scale.y;
      this.tween = TweenLite.to(this.owner.scale, 0.2, {y:s*-1, ease:Quad.easeIn})
    }
    else {
      // this.owner.scale.x *= -1;
      let s = this.owner.scale.x;
      this.tween = TweenLite.to(this.owner.scale, 0.2, {x:s*-1, ease:Quad.easeIn})
    }
    this.execution.run();
  }
}