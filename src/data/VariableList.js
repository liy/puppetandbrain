import ArrayMap from "../utils/ArrayMap";
import Variable from './Variable';

export default class VariableList extends ArrayMap
{
  constructor(brain) {
    super()
    this.brain = brain;
    this.names = this.keys;
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
    this.set(variable.name, variable);
    return variable;
  }

  rename(name, newName) {
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
      brain: this.brain
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