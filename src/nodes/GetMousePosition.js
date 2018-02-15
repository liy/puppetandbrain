import Node from "./Node";
import {toDegree} from '../utils/utils'
import DataType from '../data/DataType';

NodeTemplate.GetMousePosition = {
  className: 'GetMousePosition',
  name: 'Mouse Position',
  inputs:[],
  outputs: [{
    name: 'position',
    descriptor: {
      type: DataType.VEC2
    }
  }],
  elementClass: ['property', 'getter'],
  category: 'Property',
  keywords: ['mouse', 'position']
}

export default class GetMousePosition extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod)

    this.outputs.assignProperty('position', {
      get: () => {
        // There is no need to clone it. As all the vector based arithmetic
        // will not change the operand.
        return Editor.mouse.position;
      }
    });
  }
}
