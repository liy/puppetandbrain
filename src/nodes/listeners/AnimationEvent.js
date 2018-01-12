import {Listener, Template as ListenerTemplate} from "./Listener";
import DataType from "../../data/DataType";

NodeTemplate.AnimationEvent = {
  ...ListenerTemplate,
  name: 'Animation Event',
  output: [{
    name: 'event name',
    type: DataType.GENERIC
  }]
}

export default class AnimationEvent extends Listener
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    console.log(this.outputs)
  }

  get nodeName() {
    return 'Animation Event'
  }

  init(pod) {
    super.init(pod);

    let spineComponent = this.owner.getComponent('SpineComponent');
    if(spineComponent) {
      spineComponent.state.addListener({
        event: (i, event) => {
        this.outputs.assignValue('event name', event.stringValue.trim());
        this.run();
        }
      })
    }
  }

  run() {
    super.run();
    this.execution.run();
  }
}