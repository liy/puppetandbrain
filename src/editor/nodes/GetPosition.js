import Node from "./Node";
import DataType from '../data/DataType';
import Vec2 from "../math/Vec2";

NodeTemplate.set({
  className: 'GetPosition',
  name: 'Position',
  inputs: [{
    name: 'puppet',
    descriptor: {
      type: DataType.ACTOR, 
    }
  }],
  outputs: [{
    name: 'position',
    descriptor: {
      type: DataType.VEC2
    }
  }],
  elementClass: ['property', 'collapsed'],
  category: 'Property'
})

export default class GetPosition extends Node
{
  constructor(id, activity) {
    super(id, activity)
  }

  init(pod) {
    super.init(pod);

    this.memory.puppet = this.memory.puppet || this.owner.id;

    this.outputs.assignProperty('position', {
      get: () => {
        let actor = this.lookUp.get(this.inputs.value('puppet'));
        if(actor) {
          // Clone the position so that it can be used to set to other variable
          return new Vec2(actor.position)
        }
        return new Vec2();
      }
    });
  }
}
