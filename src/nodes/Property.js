import Output from "../data/Output";
import DataNode from "./DataNode";

export default class Property extends DataNode
{
  constructor(id) {
    super(id)

    this.inputs.add('target')
  }

  init(pod) {
    super.init(pod);
    // name is authoring time settings.
    this.name = pod.name;

    this.nodeName = 'Get ' + this.name.charAt(0).toUpperCase() + this.name.slice(1);
    
    this.variables.target = this.variables.target || this.owner.id;
    this.outputs.add(this.name, LookUp.get(this.variables.target)[this.name]);
  }

  pod() {
    return {
      ...super.pod(),
      name: this.name,
    }
  }
}
