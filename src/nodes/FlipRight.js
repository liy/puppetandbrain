import {Task, Template as ParentTemplate} from './Task';

NodeTemplate.FlipRight = {
  ...ParentTemplate,
  name: 'Flip Right',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  category: 'Animation',
}

export default class FlipRight extends Task
{
  constructor(id) {
    super(id)
    
    Editor.on('game.stop', this.stop, this);
    Editor.on('game.prestart', this.prestart, this)
  }

  destroy() {
    super.destroy();

    if(this.tween) this.tween.kill();

    Editor.off('game.stop', this.stop, this);
    Editor.off('game.prestart', this.prestart, this);
  }

  prestart() {
    this.scaleX = this.owner.scale.x;
  }

  stop() {
    if(this.tween) this.tween.kill()
  }

  run() {
    super.run();
    
    this.tween = TweenLite.to(this.owner.scale, 0.15, {x:this.scaleX, ease:Quad.easeIn, onComplete: () => {
      this.execution.run('completed');
    }})
    this.execution.run();
  }
}