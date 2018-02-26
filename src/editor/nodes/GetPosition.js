import Node from "./Node";
import DataType from '../data/DataType';

NodeTemplate.GetPosition = {
  className: 'GetPosition',
  name: 'Position',
  inputs: [{
    name: 'puppet',
    descriptor: {
      type: DataType.ACTOR, 
    }
  }],
  outputs: [{
    name: 'position',
    descriptor: {
      type: DataType.VEC2
    }
  }],
  elementClass: ['property', 'collapsed'],
  category: 'Property'
}

export default class GetPosition extends Node
{
  constructor(id, activity) {
    super(id, activity)
  }

  init(pod) {
    super.init(pod);

    this.memory.puppet = this.memory.puppet || this.owner.id;

    this.outputs.assignProperty('position', {
      get: () => {
        return this.lookUp.get(this.inputs.value('puppet'))['position']
      }
    });
  }
}
