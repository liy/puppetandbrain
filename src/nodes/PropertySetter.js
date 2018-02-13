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
  constructor(id) {
    super(id);
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

    this.owner[this.propertyName] = this.inputs.value(this.propertyName);

    this.execution.run();
  }

  
  getUserFiles() {
    let property = this.owner.properties.get(this.propertyName);
    if(property) {
      // TODO handle image type
      if(property.type == DataType.AUDIO || property.type == DataType.IMAGE) {
        return [property.data]
      }
    }
    return [];
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