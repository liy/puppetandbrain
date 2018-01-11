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