import Output from "../data/Ouput";

export default class Property
{
  constructor(id) {
    this.id = LookUp.addValue(this, id);

    this.outputs = new Output(this);
  }

  init(target, name) {
    this.target = target;
    this.name = name;
    this.outputs.add(this.name, this.target[this.name]);
  }

  fill(pod) {
    this.target = LookUp.get(pod.target);
    this.name = pod.name;
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
