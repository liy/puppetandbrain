import EventEmitter from "@/utils/EventEmitter";
import ArrayMap from "@/utils/ArrayMap";
import Variable from './Variable';
import DataType from "./DataType";

export default class VariableList extends EventEmitter
{
  constructor(brain) {
    super()

    this.brain = brain;
    
    this.variables = new ArrayMap();
  }

  create(variablePod) {
    let variable;
    variable = new Variable(variablePod.id);
    variable.brain = this.brain;
    variable.init(variablePod);
    this.add(variable);
    return variable;
  }

  add(variable) {
    variable.brain = this.brain;
    this.variables.set(variable.id, variable);
    this.emit('variable.added', variable)
    return variable;
  }

  insert(variable, index) {
    variable.brain = this.brain;
    this.variables.insert(variable.id, variable, index);
    this.emit('variable.added', variable)
    return variable;
  }

  remove(id) {
    const {
      value: variable,
      index,
    } = this.variables.remove(id);
    const removed = {variable, index}
    this.emit('variable.removed', removed);
    return removed;
  }
  
  updateRuntime() {
    for(let variable of this.variables) {
      variable.updateRuntime();
    }
  }

  get values() {
    return this.variables.values;
  }

  get names() {
    return this.variables.keys.map(id => {
      return this.variables.get(id).name;
    })
  }

  [Symbol.iterator]() {
    return this.variables[Symbol.iterator]();
  }

  pod(detail) {
    return this.variables.map((id, variable) => {
      if(detail) {
        return variable.pod();
      }
      else {
        return id;
      }
    })
  }
}