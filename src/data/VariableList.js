import EventEmitter from "../utils/EventEmitter";
import ArrayMap from "../utils/ArrayMap";
import Variable from './Variable';
import DataType from "./DataType";

export default class VariableList extends EventEmitter
{
  constructor(brain) {
    super()

    this.brain = brain;
    
    this.map = new ArrayMap();
  }

  create(variablePod) {
    let variable = new Variable(variablePod.id);
    variable.init(variablePod);
    this.add(variable);
    return variable;
  }

  add(variable) {
    this.map.set(variable.id, variable);
    this.emit('variable.added', variable)
    return variable;
  }

  insert(variable, index) {
    this.map.insert(variable.id, variable, index);
    this.emit('variable.added', variable)
    return variable;
  }

  remove(id) {
    const {
      value: variable,
      index,
    } = this.map.remove(id);
    const removed = {variable, index}
    this.emit('variable.removed', removed);
    return removed;
  }
  
  updateRuntime() {
    for(let variable of this.map) {
      variable.updateRuntime();
    }
  }

  get values() {
    return this.map.values;
  }

  get names() {
    return this.map.keys.map(id => {
      return this.map.get(id).name;
    })
  }

  [Symbol.iterator]() {
    return this.map[Symbol.iterator]();
  }

  pod() {
    return this.map.keys.map(name => {
      return {
        name,
        // TODO: not going to inlcude the actual variable data in the list
        // it is stored in the LookUp store
        variable: this.values[name].id,
      }
    })
  }
}