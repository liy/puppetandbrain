import {Task} from "./Task";
import DataType from '../data/DataType';

NodeTemplate.PropertySetter = {
  className: 'PropertySetter',
  enter: {
    name: 'default',
    enabled: true,
  },
  execution: [{
    name: 'default'
  }],
  inputs: [],
  outputs: [],
  elementClass: ['property', 'setter'],
  category: 'Property'
}

export default class PropertySetter extends Task
{
  constructor(id, activity) {
    super(id, activity);
  }

  init(pod) {
    super.init(pod);

    this.propertyName = pod.propertyName;

    this.memory[pod.propertyName] = this.memory[pod.propertyName] || this.owner[this.propertyName];
    
    this.outputs.assignProperty(this.propertyName, {
      get: () => {
        return this.owner[this.propertyName]
      }
    });
  }

  run() {
    super.run();

    // set both property runtime data and actor's setter(visual changes)
    this.owner.properties.get(this.propertyName).runtime = this.owner[this.propertyName] = this.inputs.value(this.propertyName);

    this.execution.run();
  }

  
  getUserFiles() {
    // If the input is connected, ignore the local memory file
    if(!this.inputs.get(this.propertyName).isConnected) {
      let data = this.memory[this.propertyName];
      // make sure the data is a file data
      if(data.hash) {
        return [data]
      }
    }
    return null;
  }

  get nodeName() {
    return `Set ${this.propertyName}`;
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.propertyName = this.propertyName;
    return pod;
  }
}