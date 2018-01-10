import Actor from '../objects/Actor';
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

  init(pod) {
    this.brain = LookUp.auto(pod.brain);

    this.type = pod.type;
    this._name = pod.name;

    // Reason behind chosing reference over id for actor data:
    //
    // As other data types(list, color, map, etc.) are using reference.
    // If only actor data uses id, an branch needs to be introduced in the getter and setter.
    // Plus it force me to implement the output and input type right now(10/01/2018).
    //
    // However, if I make everything uses reference, it can simplify code quite a lot.
    // It does not mean I won't implement data type in input and output, it just allow me to
    // delay this feature for future.(It might not be needed) 
    // 
    // Only need to make sure the variables are initialized after actor initialization(during loading stage),
    // and the loading process already has the right loading order. 
    //
    // Therefore, I decided to use reference instead of id for actor data type.

    // if it is an actor, the data will be id.
    // Needs to turn it into an reference.
    if(this.type == DataType.ACTOR) {
      this.set(LookUp.get(pod.data));
    }
    else {
      this.set(pod.data);
    }
  }

  get inUse() {
    return this.getters.length != 0 || this.setters.length != 0;
  }

  /**
   * Set the data and initial data
   * @param {*} data 
   */
  set(data) {
    this.data = data;
    this.initialData = data;
  }

  reset() {
    this.data = this.initialData;
  }

  get data() {
    return this._data;
  }

  /**
   * Update the data only. NOT the initial data
   */
  set data(v) {
    this._data = v;
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