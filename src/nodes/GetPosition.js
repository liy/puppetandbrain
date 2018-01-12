import Node from "./Node";
import DataType from '../data/DataType';

NodeTemplate.GetPosition = {
  name: 'Get Position',
  input: [{
    name: 'actor',
    type: DataType.ACTOR, 
  }],
  output: [{
    name: 'position',
    type: DataType.MAP
  }]
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

  get nodeName() {
    return 'Get Position';
  }

  get elementClassName() {
    return ['property', 'getter'];
  }
}
