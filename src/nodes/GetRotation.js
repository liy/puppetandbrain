import Node from "./Node";
import {toDegree} from '../utils/utils'
import DataType from '../data/DataType';

NodeTemplate.GetRotation = {
  name: 'Get Rotation',
  inputs: [{
    name: 'puppet',
    type: DataType.ACTOR, 
  }],
  outputs: [{
    name: 'rotation',
    type: DataType.GENERIC
  }],
  elementClass: ['property', 'getter'],
  category: 'Transformation'
}

export default class GetRotation extends Node
{
  constructor(id) {
    super(id)
    
  }

  init(pod) {
    super.init(pod)

    this.memory.puppet = this.owner.id;
    
    this.outputs.assignProperty('rotation', {
      get: () => {
        return LookUp.get(this.inputs.value('puppet'))['rotation'] * toDegree
      }
    });
  }
}
