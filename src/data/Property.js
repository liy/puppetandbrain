import EventEmitter from "../utils/EventEmitter";

export default class extends EventEmitter
{
  super(id) {
    super();
    this.id = LookUp.addVariable(this, id);

    // Keep track of getter and setter nodes using this variable. For variable deletion use.
    this.getters = [];
    this.setters = [];
  }

  destroy() {
    LookUp.removeVariable(this.id);
    // clear listener
    this.clear();
  }

  init(pod) {
    this.actor = LookUp.auto(pod.actorID);

    this.type = pod.type;
    this.name = pod.name;
  }

  get inUse() {
    return this.getters.length != 0 || this.setters.length != 0;
  }

  pod() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      actorID: this.actor.id
    }
  }
}