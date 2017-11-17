import Output from "../data/Ouput";

export default class Property
{
  constructor(id) {
    this.id = LookUp.addValue(this, id);
    this.outputs = new Output(this);
  }

  init(pod) {
    // Both target and name is authoring time settings.
    this.target = LookUp.auto(pod.target);
    this.name = pod.name;
    this.outputs.add(this.name, this.target[this.name]);

    this.nodeName = "Get Actor" + this.target.id + ' ' + this.name.charAt(0).toUpperCase() + this.name.slice(1);
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
