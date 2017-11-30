import Listener from "./Listener";

export default class AnimationEvent extends Listener
{
  constructor(id) {
    super(id);

    this.outputs.addOutput('event name');
  }

  destroy() {
    super.destroy();
  }

  init(pod) {
    super.init(pod);

    let spineComponent = this.owner.getComponent('SpineComponent');
    if(spineComponent) {
      spineComponent.state.addListener({
        event: (i, event) => {
        let eventName = event.stringValue.trim().split('.')[0]
        this.outputs.assignValue('event name', eventName);
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