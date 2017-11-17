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

  init(pod) {
    super.init(pod);

    // authoring time thing!
    this.actionName = pod.actionName;

    this.actor.actions[this.actionName] = this;
  }

  rename(name) {
    // validate there are no same function names
    if(this.actor.actions[name]) return false;

    delete this.actor.actions[this.actionName];
    this.actionName = name;
    return true
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