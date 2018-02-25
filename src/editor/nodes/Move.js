import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';
import Vec2 from '../math/Vec2';
import { numericVector } from '@/utils/utils';

NodeTemplate.Move = {
  ...ParentTemplate,
  className: 'Move',
  name: 'Move',
  inputs: [{
    name: 'step',
    descriptor: {
      type: DataType.VEC2,
      gadgetClassName: 'Vec2Field'
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
    step: {x: 100, y: 0},
    duration: 1,
  },
  category: 'Animation',
  keywords: ['left', 'right', 'up', 'down', 'top', 'bottom']
}

export default class Move extends Task
{
  constructor(id, lookUp) {
    super(id, lookUp);

    Editor.on('game.stop', this.stop, this)
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

    if(this.time <= this.duration) {
      this.owner.position.add(Vec2.scale(this.velocity, dt));
    }
    else {
      this.owner.position = this.target;
      Editor.off('tick', this.tick, this);
      this.execution.run('completed');
    }
  }

  run() {
    super.run()

    this.time = 0;

    this.duration = this.inputs.value('duration');
    const step = new Vec2(numericVector(this.inputs.value('step')));

    this.velocity = step.clone().scale(1/this.duration);
    this.target = Vec2.add(this.owner.position, step);

    Editor.on('tick', this.tick, this);
    this.execution.run();
  }
}