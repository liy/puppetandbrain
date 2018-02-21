import Node from "./Node";
import {toDegree} from '@/utils/utils'
import DataType from '../data/DataType';

NodeTemplate.GetRotation = {
  className: 'GetRotation',
  name: 'Rotation',
  inputs: [{
    name: 'puppet',
    descriptor: {
      type: DataType.ACTOR, 
    }
  }],
  outputs: [{
    name: 'rotation',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  elementClass: ['property', 'collapsed'],
  category: 'Property'
}

export default class GetRotation extends Node
{
  constructor(id) {
    super(id)
    
  }

  init(pod) {
    super.init(pod)

    this.memory.puppet = this.memory.puppet || this.owner.id;
    
    this.outputs.assignProperty('rotation', {
      get: () => {
        return LookUp.get(this.inputs.value('puppet'))['rotation'] * toDegree
      }
    });
  }
}
