import Output from "../data/Output";
import DataNode from "./DataNode";

export default class Property extends DataNode
{
  constructor(id) {
    super(id)

    this.inputs.addName('target')
  }

  init(pod) {
    super.init(pod);
    // name is authoring time settings.
    this.name = pod.name;

    this.variables.target = this.variables.target || this.owner.id;
    this.outputs.assignProperty(this.name, {
      get: () => {
        return LookUp.get(this.variables.target)[this.name]
      }
    });
  }

  get nodeName() {
    return 'Get ' + this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }

  pod() {
    return {
      ...super.pod(),
      name: this.name,
    }
  }
}