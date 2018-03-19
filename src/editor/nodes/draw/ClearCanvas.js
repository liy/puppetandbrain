import DataType from "../../data/DataType";
import {Task, Template as ParentTemplate} from '../Task'

NodeTemplate.scope('CanvasActor', {
  ...ParentTemplate,
  className: 'ClearCanvas',
  name: 'Clear Canvas',
  category: 'Draw',
  keywords: ['draw', 'clear']
})

export default class ClearCanvas extends Task
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