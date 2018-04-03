import DataType from "../../data/DataType";
import {Task, Template as ParentTemplate} from '../Task'

NodeTemplate.set({
  ...ParentTemplate,
  className: 'DrawSquare',
  name: 'Draw Square',
  inputs: [{
    name: 'size',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  memory: {
    size: 10
  },
  category: 'Draw',
  keywords: ['draw', 'square']
})

export default class DrawSquare extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  destroy() {
    super.destroy();
  }

  run() {
    super.run();

    Hub.canvasActor.drawSquare(this.inputs.value('size'))

    this.execution.run();
  }
}