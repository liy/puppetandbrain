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
  }, {
    name: 'duration',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  memory: {
    direction: 'left',
    duration: 0.15,
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
    Editor.off('game.stop', this.stop, this)
    Editor.off('tick', this.tick, this);
  }

  stop() {
    Editor.off('tick', this.tick, this);
  }

  tick({delta, deltaTime:dt}) {
    this.time += dt;

    console.log(this.owner.scale.x)

    if(this.time <= this.duration) {
      this.owner.scale.x += this.dx*dt;
      this.owner.scale.y += this.dy*dt;
    }
    else {
      this.owner.scale.x = this.targetScaleX;
      this.owner.scale.y = this.targetScaleY;
      Editor.off('tick', this.tick, this);
      this.execution.run('completed');
    }
  }

  run() {
    super.run();

    this.time = 0;

    this.duration = this.inputs.value('duration');
    const direction = this.inputs.value('direction');
    // this.targetRotation = this.owner.rotation + this.rotator;
    
    this.dx = 0;
    this.dy = 0;
    this.targetScaleX = Math.abs(this.owner.scale.x);
    this.targetScaleY = Math.abs(this.owner.scale.y);
    switch(direction) {
      case 'left':
        this.targetScaleX = -Math.abs(this.owner.scale.x)
        break;
      case 'right':
        this.targetScaleX = Math.abs(this.owner.scale.x)
        break;
      case 'up':
        this.targetScaleY = Math.abs(this.owner.scale.y);
        break;
      case 'down':
        this.targetScaleY = -Math.abs(this.owner.scale.y);
        break;
    }
    this.dx = (this.targetScaleX - this.owner.scale.x)/this.duration; 
    this.dy = (this.targetScaleY - this.owner.scale.y)/this.duration;

    Editor.on('tick', this.tick, this);

    // this[this.inputs.value('direction')]();
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