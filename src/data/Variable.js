import EventEmitter from '../utils/EventEmitter';
import DataType from './DataType';

export default class Variable extends EventEmitter
{
  constructor(id) {
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
    this.brain = LookUp.get(pod.brainID);

    this.type = pod.type;
    this._name = pod.name;
    this.set(pod.data);
  }

  get inUse() {
    return this.getters.length != 0 || this.setters.length != 0;
  }

  /**
   * Set the authoring time data. Should be only used in
   * Variable creation, panel editing and activity loading
   * @param {*} data 
   */
  set(data) {
    // authoring time data
    this.data = data;
  }

  updateRuntime() {
    this.runtime = JSON.parse(JSON.stringify(this.data));
  }

  get data() {
    return this._data;
  }

  /**
   * Update the data only. NOT the initial data
   */
  set data(v) {
    let old = this._data;
    this._data = v;
    this.emit('variable.data.changed', {
      old,
      data: v
    })
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

  export(data={}) {
    data.variables = data.variables || []
    data.variables.push(this.id);

    data.store = data.store || {};
    data.store[this.id] = this.pod();

    return data;
  }

  pod() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      brainID: this.brain.id,
      // Only record the initial data, not the runtime data...
      data: this.data,
    }
  }
}