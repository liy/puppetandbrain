import DataNode from "./DataNode";

export default class Getter extends DataNode
{
  constructor(id) {
    super(id);

    this.variableName = null;
    this.target = null;
  }

  init(pod) {
    super.init(pod);

    this.target = LookUp.auto(pod.target);
    this.variableName = pod.variableName;
    this.outputs.addOutput(this.variableName).assignProperty(this.variableName, {
      get: () => {
        return this.target.variables[this.variableName];
      }
    });
  }

  get nodeName() {
    return `Get Variable`;
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.variableName = this.variableName;
    pod.target = this.target.id;
    return pod;
  }
}