import DataType from "../../data/DataType";
import {Task, Template as ParentTemplate} from '../Task'

NodeTemplate.scope('CanvasActor', {
  ...ParentTemplate,
  className: 'LineTo',
  name: 'Line To',
  inputs: [{
    name: 'position',
    descriptor: {
      type: DataType.VEC2,
      gadgetClassName: 'PositionField',
    }
  }],
  memory: {
    radius: 10
  },
  category: 'Draw',
  keywords: ['draw', 'line']
})

export default class LineTo extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  destroy() {
    super.destroy();
  }

  run() {
    super.run();

    this.owner.lineTo(this.inputs.value('position'))

    this.execution.run();
  }
}