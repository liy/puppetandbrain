import Task from "./Task";

export default class Setter extends Task
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

    this.inputs.addInput(this.variableName);

    this.outputs.addOutput(this.variableName)
    this.outputs.assignProperty(this.variableName, {
      get: () => {
        return this.targetBrain.variables[this.variableName];
      }
    });
  }

  run() {
    super.run();

    this.targetBrain.variables[this.variableName] = this.inputs.value(this.variableName);

    this.execution.run();
  }

  get nodeName() {
    return `Set Variable`;
  }
  
  pod(detail) {
    let pod = super.pod(detail);
    pod.variableName = this.variableName;
    pod.targetBrain = this.targetBrain.id;
    return pod;
  }
}