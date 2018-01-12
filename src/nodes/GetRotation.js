import Node from "./Node";
import utils from '../utils/utils'
import DataType from '../data/DataType';

NodeTemplate.GetRotation = {
  name: 'Get Rotation',
  input: [{
    name: 'actor',
    type: DataType.ACTOR, 
  }],
  output: [{
    name: 'rotation',
    type: DataType.GENERIC
  }],
  elementClass: ['property', 'getter']
}

export default class GetRotation extends Node
{
  constructor(id) {
    super(id)
    
  }

  init(pod) {
    super.init(pod)

    this.variables.actor = this.owner.id;
  }

  mold() {
    super.mold();

    this.outputs.assignProperty('rotation', {
      get: () => {
        return LookUp.get(this.inputs.value('actor'))['rotation'] * utils.toDegree
      }
    });
  }
}
