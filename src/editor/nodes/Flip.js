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
      gadgetClassName: 'DropDown'
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
  constructor(id, activity) {
    super(id, activity)
    
    this.stage.on('game.stop', this.stop, this);
  }

  destroy() {
    super.destroy();
    this.stage.off('game.stop', this.stop, this)
    this.stage.off('tick', this.tick, this);
  }

  stop() {
    this.stage.off('tick', this.tick, this);
  }

  flipX({delta, deltaTime:dt}) {
    this.time += dt;

    if(this.time <= this.duration) {
      this.owner.scale.x += this.dx*dt;
    }
    else {
      this.owner.scale.x = this.targetScaleX;
      this.stage.off('tick', this.flipX, this);
      this.execution.run('completed');
    }
  }

  flipY({delta, deltaTime:dt}) {
    this.time += dt;

    if(this.time <= this.duration) {
      this.owner.scale.y += this.dy*dt;
    }
    else {
      this.owner.scale.y = this.targetScaleY;
      this.stage.off('tick', this.flipY, this);
      this.execution.run('completed');
    }
  }


  run() {
    super.run();

    this.time = 0;

    this.duration = this.inputs.value('duration');
    const direction = this.inputs.value('direction');
    
    this.targetScaleX = Math.abs(this.owner.scale.x);
    this.targetScaleY = Math.abs(this.owner.scale.y);
    if(direction =='left' || direction == 'right') {
      if(direction == 'left') this.targetScaleX = -this.targetScaleX;
      this.dx = (this.targetScaleX - this.owner.scale.x)/this.duration; 
      this.stage.on('tick', this.flipX, this);
    }
    else {
      if(direction == 'down') this.targetScaleY = -this.targetScaleY;
      this.dy = (this.targetScaleY - this.owner.scale.y)/this.duration;
      this.stage.on('tick', this.flipY, this);
    }

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

  getGadgetConstructorData(inputName) {
    if(inputName == 'duration') return super.getGadgetConstructorData(inputName);
    return {
      list: LIST,
      value: this.memory[inputName]
    }
  }
}