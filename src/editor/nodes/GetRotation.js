import Node from "./Node";
import {toDegree} from '@/utils/utils'
import DataType from '../data/DataType';

NodeTemplate.set({
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
})

export default class GetRotation extends Node
{
  constructor(id, activity) {
    super(id, activity)
    
  }

  init(pod) {
    super.init(pod)

    this.memory.puppet = this.memory.puppet || this.owner.id;
    
    this.outputs.assignProperty('rotation', {
      get: () => {
        let actor = this.lookUp.get(this.inputs.value('puppet'));
        if(actor) {
          return actor.rotation * toDegree
        }
        return 0;
      }
    });
  }
}
