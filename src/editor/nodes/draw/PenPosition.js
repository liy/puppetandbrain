import DataType from "../../data/DataType";
import {Task, Template as ParentTemplate} from '../Task'

NodeTemplate.scope('CanvasActor', {
  ...ParentTemplate,
  className: 'PenPosition',
  name: 'PenPosition',
  inputs: [{
    name: 'position',
    descriptor: {
      type: DataType.VEC2,
      gadgetClassName: 'PositionField'
    }
  }],
  memory: {
    position: {x:0, y:0}
  },
  category: 'Draw',
  keywords: ['draw', 'from']
})

export default class PenPosition extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  destroy() {
    super.destroy();
  }

  run() {
    super.run();

    this.owner.penTo(this.inputs.value('position'))

    this.execution.run();
  }
}