import { Task, Template as ParentTemplate } from "./Task";

NodeTemplate.SceneChange = {
  ...ParentTemplate,
  className: 'SceneChange',
  name: 'Scene Change',
  inputs: [{
    name: 'creation id',
    descriptor: {
      type: DataType.GENERIC,
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

    Activity.clear();
    router.navigate(`/creations/${this.inputs.value('creation id')}`);
    // TODO: auto start
  }
}