import {Listener, Template as ParentTemplate} from "./Listener";
import DataType from "../../data/DataType";

NodeTemplate.AnimationEvent = {
  ...ParentTemplate,
  className: 'AnimationEvent',
  name: 'Animation Event',
  outputs: [{
    name: 'event name',
    descriptor: {
      type: DataType.STRING
    }
  }],
  keyboards: [ParentTemplate.keywords, 'animation'],
}

export default class AnimationEvent extends Listener
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    let spineComponent = this.owner.getComponent('animation');
    spineComponent.state.addListener({
      event: (i, event) => {
        
        this.outputs.assignValue('event name', event.stringValue.trim());
        this.run();
      }
    })
  }

  run() {
    super.run();
    this.execution.run();
  }
}