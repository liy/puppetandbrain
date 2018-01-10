import EventEmitter from "../utils/EventEmitter";
import ArrayMap from "../utils/ArrayMap";
import Variable from './Variable';

export default class VariableList extends EventEmitter
{
  constructor(brain) {
    super()

    this.brain = brain;
    
    this.map = new ArrayMap();
  }

  get values() {
    return this.map.values;
  }

  get names() {
    return this.map.keys;
  }

  update(pod) {
    // FIXME: Use pod to reset the variable list
  }

  // reset all variable back to initial state
  reset() {
    for(let name of this.names) {
      this.values[name].reset();
    }
  }

  add(variable) {
    this.map.set(variable.name, variable);
    return variable;
  }

  rename(name, newName) {
    if(newName === '') return false;
    if(this.contains(newName)) return false;

    let variable = this.get(name);
    this.remove(name);
    variable.name = newName;
    this.set(newName, variable);
    return true;
  }

  create() {
    do {
      var name = 'variable-' + (this.length+1);
    }
    while(this.contains(name))
    let variable = new Variable();
    variable.init({
      name: name,
      brain: this.brain,
      data: null,
    })
    return this.add(variable);
  }

  pod() {
    return this.keys.map(name => {
      return {
        name,
        // TODO: not going to inlcude the actual variable data in the list
        // it is stored in the LookUp store
        variable: this.values[name].id,
      }
    })
  }
}