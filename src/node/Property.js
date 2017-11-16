import Output from "../data/Ouput";

export default class Property
{
  constructor(target, name, id) {
    this.id = LookUp.addValue(this, id);
    this.target = target;
    this.name = name;

    this.outputs = new Output();
    this.outputs.add(this.name, this.target[this.name]);
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
