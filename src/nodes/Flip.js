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
  keywords: ['left', 'right', 'up', 'down', 'top', 'bottom']
}

const LIST = ['left', 'right', 'up', 'down'];

export default class Flip extends Task
{
  constructor(id) {
    super(id)
    
    Editor.on('game.stop', this.stop, this);
  }

  destroy() {
    super.destroy();
    if(this.tween) this.tween.kill()
    Editor.off('game.stop', this.stop, this);
  }

  stop() {
    if(this.tween) this.tween.kill()
  }

  run() {
    super.run();

    this[this.inputs.value('direction')]();
    this.execution.run();
  }

  left() {
    this.tween = TweenLite.to(this.owner.scale, 0.15, {x:-Math.abs(this.owner.scale.x), ease:Quad.easeIn, onComplete: () => {
      this.execution.run('completed');
    }})
  }

  right() {
    this.tween = TweenLite.to(this.owner.scale, 0.15, {x:Math.abs(this.owner.scale.x), ease:Quad.easeIn, onComplete: () => {
      this.execution.run('completed');
    }})
  }

  up() {
    this.tween = TweenLite.to(this.owner.scale, 0.15, {y:Math.abs(this.owner.scale.y), ease:Quad.easeIn, onComplete: () => {
      this.execution.run('completed');
    }})
  }

  down() {
    this.tween = TweenLite.to(this.owner.scale, 0.15, {y:-Math.abs(this.owner.scale.y), ease:Quad.easeIn, onComplete: () => {
      this.execution.run('completed');
    }})
  }

  get list() {
    return LIST;
  }
}