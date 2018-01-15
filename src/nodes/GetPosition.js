import Node from "./Node";
import DataType from '../data/DataType';

NodeTemplate.GetPosition = {
  name: 'Get Position',
  inputs: [{
    name: 'puppet',
    type: DataType.ACTOR, 
  }],
  outputs: [{
    name: 'position',
    type: DataType.VEC2
  }],
  elementClass: ['property', 'getter'],
  category: 'Transformation'
}

export default class GetPosition extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    this.memory.actor = this.owner.id;

    this.outputs.assignProperty('position', {
      get: () => {
        return LookUp.get(this.inputs.value('actor'))['position']
      }
    }, DataType.VEC2);
  }
}
