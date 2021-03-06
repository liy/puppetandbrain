import Node from "./Node";
import {toDegree} from '@/utils/utils'
import DataType from '../data/DataType';

NodeTemplate.set({
  className: 'VectorLen',
  name: 'Vector Length',
  inputs: [{
    name: 'vector',
    descriptor: {
      type: DataType.VEC2, 
    }
  }],
  outputs: [{
    name: 'length',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  elementClass: ['arithmetic', 'collapsed'],
  category: 'Math'
})

export default class VectorLen extends Node
{
  constructor(id, activity) {
    super(id, activity)
    
  }

  init(pod) {
    super.init(pod)
    
    this.outputs.assignProperty('length', {
      get: () => {
        return this.inputs.value('vector').len;
      }
    });
  }
}
