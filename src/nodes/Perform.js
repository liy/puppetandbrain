import {Task} from './Task';

// Perform is dynamic, no template

export default class Perform extends Task
{
  /**
   *
   * @param {String} name Function name
   * @memberof Function
   */
  constructor(id) {
    super(id);

    this.onOutputAdded = this.onOutputAdded.bind(this);
  }

  destroy() {
    super.destroy();
    // Just incase the action has already been detroyed
    if(this.action)  {
      this.action.outputs.off('output.added', this.onOutputAdded);
      this.action.removePerform(this);
    }
  }

  init(pod) {
    super.init(pod);

    // TODO: target is really not needed
    this.target = LookUp.auto(pod.target);
    this.actionID = pod.actionID;
    
    // Check action is valid or not, since action might be deleted
    if(this.action) {
      this.action.addPerform(this);
      
      this.action.outputs.on('output.added', this.onOutputAdded);
      // Get all the outputs of the target action, and presented as Call inputs
      // When task runs, all the Call input value will be assigned to Function's output
      for(let name of this.action.outputs.names) {
        this.inputs.addInput(name);
      }
    }
    else {
      // TODO: notify error!
    }
  }

  onOutputAdded(name) {
    this.inputs.addInput(name);
  }

  get action() {
    return LookUp.get(this.actionID);
  }

  get actionName() {
    return this.action ? this.action.actionName : null;
  }

  get elementClassName() {
    return ['perform']
  }

  run() {
    super.run()

    // check before run!
    let action = this.action;
    if(action) {
      // Pass the input value to the action's outputs
      for(let name of this.inputs.names) {
        action.outputs.assignValue(name, this.inputs.value(name));
      }

      action.run();
    }
    

    this.execution.run();
  }

  get nodeName() {
    return this.target.name + ' Perform '  + this.actionName;
  }

  pod(detail=false) {
    let pod = super.pod(detail);
    pod.target = this.target.id;
    pod.actionID = this.action ? this.action.id : null;
    return pod;
  }
}