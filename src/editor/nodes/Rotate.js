import {toRadian} from '@/utils/utils';
import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.set({
  ...ParentTemplate,
  className: 'Rotate',
  name: 'Rotate',
  inputs: [{
    name: 'degree',
    descriptor: {
      type: DataType.DOUBLE
    }
  }, {
    name: 'duration',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  memory: {
    degree: 45,
    duration: 1
  },
  category: 'Animation',
  keywords: ['rotate', 'rotation', 'clockwise', 'anti-clockwise', 'anticlockwise']
})

export default class Rotate extends Task
{
  constructor(id, activity) {
    super(id, activity);

    this.activity.on('game.stop', this.stop, this)
  }

  
  destroy() {
    super.destroy();
    this.activity.off('game.stop', this.stop, this)
    this.activity.off('tick', this.tick, this);
  }

  stop() {
    this.activity.off('tick', this.tick, this);
  }

  tick({delta, deltaTime:dt}) {
    this.time += dt;

    if(this.time <= this.duration) {
      this.owner.rotation += this.rotator*dt;
    }
    else {
      this.owner.rotation = this.targetRotation;
      this.activity.off('tick', this.tick, this);
      this.execution.run('completed');
    }
  }

  run() {
    super.run()

    this.time = 0;

    this.duration = this.inputs.value('duration');
    this.rotator = this.inputs.value('degree')*toRadian;
    this.targetRotation = this.owner.rotation + this.rotator;

    this.activity.on('tick', this.tick, this);
    this.execution.run();
  }
}