import DataNode from "./DataNode";

// Dynamic property getter. Maybe not useful?
export default class GetProperty extends DataNode
{
  constructor(id) {
    super(id)

    this.inputs.addInput('target');
  }

  init(pod) {
    super.init(pod);
    // name is authoring time settings.
    this.name = pod.name;
    this.variables.target = this.variables.target || this.owner.id;

    // dynamic output
    this.outputs.addOutput(this.name);
    this.outputs.assignProperty(this.name, {
      get: () => {
        return LookUp.get(this.variables.target)[this.name]
      }
    });
  }

  get nodeName() {
    return 'Get ' + this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }

  pod(detail=false) {
    return {
      ...super.pod(detail),
      name: this.name,
    }
  }
}