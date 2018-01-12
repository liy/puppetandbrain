import Node from "./Node";
import DataType from '../data/DataType';

NodeTemplate.GetPosition = {
  name: 'Get Position',
  inputs: [{
    inputName: 'actor',
    type: DataType.ACTOR, 
  }],
  outputs: [{
    name: 'position',
    type: DataType.MAP
  }],
  elementClass: ['property', 'getter']
}

export default class GetPosition extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    this.variables.actor = this.owner.id;
  }

  mold() {
    super.mold();
    
    this.outputs.assignProperty('position', {
      get: () => {
        return LookUp.get(this.inputs.value('actor'))['position']
      }
    });
  }
}
