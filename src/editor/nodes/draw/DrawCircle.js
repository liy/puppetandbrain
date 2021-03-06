import DataType from "../../data/DataType";
import {Task, Template as ParentTemplate} from '../Task'

NodeTemplate.set({
  ...ParentTemplate,
  className: 'DrawCircle',
  name: 'Draw Circle',
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

export default class DrawCircle extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  destroy() {
    super.destroy();
  }

  run() {
    super.run();

    Hub.canvasActor.drawCircle(this.inputs.value('radius'))

    this.execution.run();
  }
}