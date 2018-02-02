import Node from "./Node";
import DataType from '../data/DataType';

NodeTemplate.GetScale = {
  className: 'GetScale',
  name: 'Get Scale',
  inputs: [{
    name: 'puppet',
    descriptor: {
      type: DataType.ACTOR,
    }
  }],
  outputs: [{
    name: 'scale',
    descriptor: {
      type: DataType.VEC2
    }
  }],
  elementClass: ['property', 'getter'],
  category: 'Property'
}

export default class GetScale extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    this.memory.puppet = this.owner.id;

    this.outputs.assignProperty('scale', {
      get: () => {
        return LookUp.get(this.inputs.value('puppet'))['scale']
      }
    });
  }
}
