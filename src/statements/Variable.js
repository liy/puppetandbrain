/**
 * For accessing object properties, e.g., actor's position etc. 
 * 
 * User should be able to drag a getter block and link to any inputs
 */
export default class Variable
{
  constructor(name, target) {
    this.name = name;
    this.target = target;
  }

  init(data) {
    this.id = LookUp.addVariable(this, data.id)
  }

  get value() {
    return this.target.variables[this.name];
  }

  set value(v) {
    this.target.variables[this.name] = v;
  }

  pod() {
    return {
      class: 'Variable',
      target: this.target.id,
      name: this.name,
    }
  }
}