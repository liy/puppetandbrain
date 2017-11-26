import Task from './Task'

/**
 * User defined action
 */
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
    // this.actionName = pod.actionName;
  }

  rename(name) {
    // validate there are no same function names
    if(this.owner.actions[name]) return false;

    delete this.owner.actions[this.actionName];
    this.actionName = name;
    return true
  }

  set actionName(v) {
    // remove old actions
    if(this.owner.actions[this.actionName]) delete this.owner.actions[this.actionName];
    this._actionName = v;
    this.owner.actions[this.actionName] = this;
  }

  get actionName() {
    return this._actionName;
  }

  get nodeName() {
    return 'Action ' + this.actionName;
  }

  get hasIn() {
    return false;
  }

  run() {
    super.run()

    this.execution.run();
  }

  pod(detail=false) {
    let pod = super.pod(detail);
    pod.actionName = this.actionName;
    return pod
  }
}