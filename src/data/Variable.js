import Actor from '../objects/Actor';
import EventEmitter from '../utils/EventEmitter';

export default class Variable extends EventEmitter
{
  constructor(id) {
    super();
    this.id = LookUp.addVariable(this, id);

    // Keep track of getter and setter nodes using this variable. For variable deletion use.
    this.getters = [];
    this.setters = [];
  }

  init(pod) {
    this._name = pod.name;
    this.brain = LookUp.auto(pod.brain);
    // if the type is an actor, the data will be an id
    this.data = pod.data;
    this.initialData = pod.data;
    this.type = pod.type;
  }

  get inUse() {
    return this.getters.length != 0 || this.setters.length != 0;
  }

  set(data) {
    this.data = data;
    this.initialData = data;
  }

  reset() {
    console.warn('reset!!!')
    this.data = this.initialData;
  }

  get data() {
    if(this.type == 'actor') {
      return LookUp.get(this.data)
    }
    else {
      return this._data;
    }
  }

  set data(v) {
    if(v instanceof Actor) {
      this.type = 'actor';
      this._data = v.id;
    }
    else {
      this.type = typeof v;
      this._data = v;
    }
  }
  
  get name() {
    return this._name;
  }

  set name(v) {
    let old = this._name;
    this._name = v;
    this.emit('variable.name.changed', {
      old,
      name: v
    })
  }

  pod() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      // Only record the initial data, not the runtime data...
      data: this.initialData,
      brain: this.brain.id,
    }
  }
}