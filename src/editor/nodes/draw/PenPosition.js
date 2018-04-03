import DataType from "../../data/DataType";
import {Task, Template as ParentTemplate} from '../Task'

NodeTemplate.set({
  ...ParentTemplate,
  className: 'PenPosition',
  name: 'Pen Position',
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

    Hub.canvasActor.penTo(this.inputs.value('position'))

    this.execution.run();
  }
}