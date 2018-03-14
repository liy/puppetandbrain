import DataType from "../../data/DataType";
import {Task, Template as ParentTemplate} from '../Task'

NodeTemplate.scope('CanvasActor', {
  ...ParentTemplate,
  className: 'ClearDraw',
  name: 'Clear Draw',
  inputs: [{
    name: 'radius',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  memory: {
    radius: 10
  },
  category: 'Draw',
  keywords: ['draw', 'circle']
})

export default class ClearDraw extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  destroy() {
    super.destroy();
  }

  run() {
    super.run();

    this.owner.clearDraw();

    this.execution.run();
  }
}