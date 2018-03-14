import {toRadian, toDegree, numericVector} from '@/utils/utils';
import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';
import Vec2 from '../math/Vec2';

NodeTemplate.set({
  ...ParentTemplate,
  className: 'Orbit',
  name: 'Orbit',
  inputs: [{
    name: 'degree',
    descriptor: {
      type: DataType.DOUBLE
    }
  }, {
    name: 'radius',
    descriptor: {
      type: DataType.DOUBLE
    }
  }, {
    name: 'point',
    descriptor: {
      type: DataType.VEC2,
      gadgetClassName: 'PositionField'
    }
  }],
  outputs: [{
      name: 'position',
      descriptor: {
        type: DataType.VEC2
      }
  }],
  execution: [{
    name: 'default'
  }],
  memory: {
    degree: 1,
    radius: 100,
    point: {x:0, y:0}
  },
  category: 'Transformation',
  keywords: ['rotate about', 'rotate']
})

export default class Orbit extends Task
{
  constructor(id, activity) {
    super(id, activity);

    this.activity.on('game.start', this.start, this);
  }

  
  destroy() {
    super.destroy();
    this.activity.off('game.start', this.start, this);
  }


  tick({delta, deltaTime:dt}) {
    this.time += dt;

    this.point = new Vec2(this.inputs.value('point'));
  }

  start() {
    let v = Vec2.sub(this.owner.position, numericVector(this.inputs.value('point')));
    this.rotation = Math.atan2(v.y, v.x)
  }

  run() {
    super.run()

    const point = numericVector(this.inputs.value('point'));
    const radius = Number(this.inputs.value('radius'));

    this.rotation += Number(this.inputs.value('degree'))*toRadian;
    this.owner.x = point.x + Math.cos(this.rotation)*radius;
    this.owner.y = point.y + Math.sin(this.rotation)*radius;
    
    this.outputs.assignValue('position', this.owner.position);

    this.execution.run();
  }
}