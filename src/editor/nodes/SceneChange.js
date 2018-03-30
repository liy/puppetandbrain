import { Task, Template as ParentTemplate } from "./Task";
import DataType from "../data/DataType";

NodeTemplate.set({
  ...ParentTemplate,
  className: 'SceneChange',
  name: 'Scene Change',
  inputs: [{
    name: 'creation id',
    descriptor: {
      type: DataType.STRING,
    }
  }],
  execution: [],
  elementClass: ['utility'],
  category: 'Utilities'
})

export default class SceneChange extends Task
{
  constructor(id, activity) {
    super(id, activity);
  }

  init(pod) {
    super.init(pod);

    this.activity.on('game.start', this.start, this);
  }

  start() {
    Hub.sceneManager.start();
  }

  run() {
    super.run();

    let creationID = this.inputs.value('creation id');
    Hub.sceneManager.to(this.execution, creationID).catch(error => {
      Hub.runtimeError({
        actorID: this.owner.id,
        nodeID: this.id,
        inputID: 'creation id',
        message: `creation id is not valid: ${creationID}`,
      })
    });
  }
}