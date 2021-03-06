import Node from "./Node";
import {toDegree} from '@/utils/utils'
import DataType from '../data/DataType';

NodeTemplate.set({
  className: 'GetMousePosition',
  name: 'Mouse Position',
  inputs:[],
  outputs: [{
    name: 'position',
    descriptor: {
      type: DataType.VEC2
    }
  }],
  elementClass: ['utility', 'collapsed'],
  category: 'Utilities',
  keywords: ['mouse', 'position']
})

export default class GetMousePosition extends Node
{
  constructor(id, activity) {
    super(id, activity)
  }

  init(pod) {
    super.init(pod)

    this.outputs.assignProperty('position', {
      get: () => {
        // There is no need to clone it. As all the vector based arithmetic
        // will not change the operand.
        return Hub.stage.mouse.position;
      }
    });
  }
}
