import {Task, Template as ParentTemplate} from './Task'

NodeTemplate.set({
  ...ParentTemplate,
  className: 'Action',
  name: 'Action',
  enter: {
    enabled: false
  },
  elementClass: ['action'],
  category: 'Action',
})

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
  constructor(id, activity) {
    super(id, activity);

    // Keep track of all the perform nodes are calling this actiions
    // If this action is deleted, all of them will be delete
    // undo redo as well
    this.performs = [];
  }

  init(pod) {
    super.init(pod);

    // authoring time thing!
    this.actionName = pod.actionName;
  }

  destroy() {
    delete this.owner.brain.actions[this.actionName];
    super.destroy();
  }

  addPerform(perform) {
    this.performs.push(perform.id);
  }

  removePerform(perform) {
    let index = this.performs.indexOf(perform.id);
    this.performs.splice(index, 1);
  }

  isValidActionName(name) {
    if(String.trim(name) != '' && this.owner.brain.actions[name] == this) return true;

    return !(String.trim(name) == '' || this.owner.brain.actions[name] != null)
  }

  updateActionName(name) {
    name = String.trim(name);
    // validate there are no same function names
    if(!this.isValidActionName(name)) return false;

    delete this.owner.brain.actions[this.actionName];
    this.actionName = name;

    return true
  }

  set actionName(v) {
    // remove old actions
    if(this.owner.brain.actions[this.actionName]) delete this.owner.brain.actions[this.actionName];
    this._actionName = v;
    this.owner.brain.actions[this.actionName] = this;
  }

  get actionName() {
    return this._actionName;
  }

  get nodeName() {
    return 'Action ' + this.actionName;
  }

  run() {
    super.run()

    this.execution.run();
  }

  pod(detail=false) {
    let pod = super.pod(detail);
    pod.actionName = this.actionName || null;
    return pod
  }
}