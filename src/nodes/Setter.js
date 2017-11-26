import Task from "./Task";

export default class Setter extends Task
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

    this.inputs.addInput(this.variableName);

    this.outputs.addOutput(this.variableName)
    this.outputs.assignProperty(this.variableName, {
      get: () => {
        return this.target.variables[this.variableName];
      }
    });
  }

  run() {
    super.run();

    this.target.variables[this.variableName] = this.inputs.value(this.variableName);

    this.execution.run();
  }

  get nodeName() {
    return `Set Variable`;
  }
  
  pod(detail) {
    let pod = super.pod(detail);
    pod.variableName = this.variableName;
    pod.target = this.target.id;
    return pod;
  }
}