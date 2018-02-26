import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';
import Vec2 from '../math/Vec2';
import { numericVector } from '@/utils/utils';

NodeTemplate.MoveTo = {
  ...ParentTemplate,
  className: 'MoveTo',
  name: 'Move To',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  inputs: [{
    name: 'position',
    descriptor: {
      type: DataType.VEC2,
      gadgetClassName: 'PositionField',
    }
  }, {
    name: 'duration',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  memory: {
    position: {x:0,y:0},
    duration: 1
  },
  category: 'Animation',
}

export default class MoveTo extends Task
{
  constructor(id, activity) {
    super(id, activity);

    this.stage.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    this.stage.off('game.stop', this.stop, this)
    this.stage.off('tick', this.tick, this);
  }

  stop() {
    this.stage.off('tick', this.tick, this);
  }

  tick({delta, deltaTime:dt}) {
    this.time += dt;

    if(this.time <= this.duration) {
      this.owner.position.add(Vec2.scale(this.velocity, dt));
    }
    else {
      this.owner.position = this.target;
      this.stage.off('tick', this.tick, this);
      this.execution.run('completed');
    }
  }

  run() {
    super.run();

    this.time = 0;
    this.duration = Number(this.inputs.value('duration'));
    this.target = new Vec2(numericVector(this.inputs.value('position')));
    this.velocity = Vec2.sub(this.target, this.owner.position).scale(1/this.duration);

    this.stage.on('tick', this.tick, this);
    this.execution.run();
  }
}