/**
 * For accessing object properties, e.g., actor's position etc. 
 * 
 * User should be able to drag a getter block and link to any inputs
 */
export default class Property
{
  constructor(name, ref) {
    this.name = name;
    this.ref = ref;
  }

  init(data) {
    this.id = LookUp.addStatement(this, data.id)
  }

  get value() {
    return this.ref[this.name];
  }

  set value(v) {
    this.ref[this.name] = v;
  }

  pod() {
    return {
      class: 'Property',
      ref: this.ref.id,
      name: this.name,
    }
  }
}