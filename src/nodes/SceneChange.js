import { Task, Template as ParentTemplate } from "./Task";
import DataType from "../data/DataType";

NodeTemplate.SceneChange = {
  ...ParentTemplate,
  className: 'SceneChange',
  name: 'Scene Change',
  inputs: [{
    name: 'creation id',
    descriptor: {
      type: DataType.STRING,
    }
  }],
  elementClass: ['utility'],
  category: 'Utilities'
}

export default class SceneChange extends Task
{
  constructor(id) {
    super(id);
  }

  run() {
    super.run();

    router.navigate(`/creations/${this.inputs.value('creation id')}`);
    // TODO: auto start
  }
}