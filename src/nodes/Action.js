import Task from './Task'

export default class Action extends Task
{
  /**
   *
   * @param {String} name Action name
   * @memberof Action
   */
  constructor(id) {
    super(id);
  }

  destroy() {
    super.destroy();
    delete this.owner.actions[this.actionName]
  }

  init(pod) {
    super.init(pod);

    // authoring time thing!
    this.actionName = pod.actionName;
    this.owner.actions[this.actionName] = this;
  }

  get nodeName() {
    return this.actionName;
  }

  get hasIn() {
    return false;
  }

  run() {
    super.run()
    this.execution.run();
  }

  pod() {
    let pod = super.pod();
    pod.actionName = this.actionName;
    return pod
  }
}