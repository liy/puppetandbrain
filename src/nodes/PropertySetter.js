import {Task} from "./Task";

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

    this.property = pod.property;

    this.memory[pod.property] = this.owner[this.property];
    
    this.outputs.assignProperty(this.property, {
      get: () => {
        return this.owner[this.property]
      }
    });
  }

  run() {
    super.run();

    this.owner[this.property] = this.inputs.value(this.property);

    this.execution.run();
  }

  get nodeName() {
    return `Set ${this.property}`;
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.property = this.property;
    return pod;
  }
}