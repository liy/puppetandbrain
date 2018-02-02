import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Perform = {
  ...ParentTemplate,
  className: 'Perform',
  elementClass: ['perform'],
  category: 'Action',
  keywords: ['call', 'message', 'function', 'method']
}

export default class Perform extends Task
{
  /**
   *
   * @param {String} name Function name
   * @memberof Function
   */
  constructor(id) {
    super(id);
  }

  destroy() {
    super.destroy();
    // Just incase the action has already been detroyed
    if(this.action)  {
      this.action.outputs.off('output.added', this.onOutputAdded, this);
      this.action.removePerform(this);
    }
  }

  init(pod) {
    console.log(pod)
    super.init(pod);

    this.actionID = pod.actionID;
    
    // Check action is valid or not, since action might be deleted
    if(this.action) {
      this.action.addPerform(this);
      
      this.action.outputs.on('output.added', this.onOutputAdded, this);
      // Get all the outputs of the target action, and presented as Call inputs
      // When task runs, all the Call input value will be assigned to Function's output
      for(let output of this.action.outputs) {
        this.inputs.add(output.name, output.descriptor);
      }
    }
    else {
      // TODO: notify error!
    }
  }

  onOutputAdded(name) {
    // TODO: better way to get descriptor from the output
    this.inputs.add(name, this.action.outputs.get(name).descriptor);
  }

  get action() {
    return LookUp.get(this.actionID);
  }

  get actionName() {
    return this.action ? this.action.actionName : null;
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
    return this.action.owner.name + ' Perform '  + this.actionName;
  }

  pod(detail=false) {
    let pod = super.pod(detail);
    pod.actionID = this.action ? this.action.id : null;
    return pod;
  }
}