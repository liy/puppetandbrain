import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Flip = {
  ...ParentTemplate,
  className: 'Flip',
  name: 'Flip',
  inputs: [{
    name: 'direction',
    descriptor: {
      type: DataType.STRING,
    }
  }],
  memory: {
    direction: 'left',
  },
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  category: 'Animation',
}

export default class Flip extends Task
{
  constructor(id) {
    super(id)
    
    Editor.on('game.stop', this.stop, this);
    Editor.on('game.prestart', this.prestart, this)
  }
  
  init(pod) {
    super.init(pod);

    this.list = ['left', 'right', 'up', 'down']
  }

  destroy() {
    super.destroy();
    
    if(this.tween) this.tween.kill()

    Editor.off('game.stop', this.stop, this);
    Editor.off('game.prestart', this.prestart, this);
  }

  prestart() {
    // this.scaleX = this.owner.scale.x;
    // this.scaleY = this.owner.scale.y;
  }

  stop() {
    if(this.tween) this.tween.kill()
  }

  run() {
    super.run();

    let sx = Math.abs(this.owner.scale.x);
    let sy = Math.abs(this.owner.scale.y);

    switch(this.inputs.value('direction')) {
      case 'left':
        sx = -sx
        break;
      case 'down':
        sy = -sy
        break;
    }
    
    this.tween = TweenLite.to(this.owner.scale, 0.15, {x:sx, y:sy, ease:Quad.easeIn, onComplete: () => {
      this.execution.run('completed');
    }})
    this.execution.run();
  }
}