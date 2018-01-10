import Task from "./Task";

export default class Setter extends Task
{
  constructor(id) {
    super(id);

    this.targetBrain = null;
  }

  init(pod) {
    super.init(pod);

    this.targetBrain = LookUp.auto(pod.targetBrain);
    // use variable id instead of name, as name will be changed by user
    this.variableID = pod.variableID;
    this.variable = LookUp.get(this.variableID);
    this.variable.setters.push(this)

    this.inputs.addInput(this.variableID);

    this.outputs.addOutput(this.variableID)
    // FIXME: update the input and output variable name when variable name is changed?
    // it will be updated on next load. It will not broke the program, but looks strange
    this.outputs.assignProperty(this.variableID, {
      get: () => {
        return this.variable.runtime;
      }
    });
  }
  
  destroy() {
    super.destroy();
    // de-register from variable
    let index = this.variable.setters.indexOf(this)
    if(index != -1) this.variable.setters.splice(index, 1)
  }

  get variableName() {
    return this.variable.name;
  }

  run() {
    super.run();

    this.variable.runtime = this.inputs.value(this.variableID);

    this.execution.run();
  }

  get nodeName() {
    return `Set Variable`;
  }
  
  get elementClassName() {
    return ['property'];
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.targetBrain = this.targetBrain.id;
    pod.variableID = this.variableID;
    return pod;
  }
}