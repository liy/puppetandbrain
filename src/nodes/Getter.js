import DataNode from "./DataNode";

export default class Getter extends DataNode
{
  constructor(id) {
    super(id);

    this.variableName = null;
    this.targetBrain = null;
  }

  init(pod) {
    super.init(pod);

    this.targetBrain = LookUp.auto(pod.targetBrain);
    this.variableName = pod.variableName;
    this.outputs.addOutput(this.variableName).assignProperty(this.variableName, {
      get: () => {
        return this.targetBrain.variables[this.variableName];
      }
    });
  }

  get nodeName() {
    return `Get Variable`;
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.variableName = this.variableName;
    pod.targetBrain = this.targetBrain.id;
    return pod;
  }
}