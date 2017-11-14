export default class Getter
{
  constructor(target, name, id) {
    this.id = LookUp.addGetter(this, id);
    this.target = target;
    this.name = name;
  }

  get value() {
    return this.target[this.name];
  }

  set value(v) {
    this.target[this.name] = v;
  }

  pod() {
    return {
      class: this.__proto__.constructor.name,
      id: this.id,
      target: this.target.id,
      name: this.name,
    }
  }
}