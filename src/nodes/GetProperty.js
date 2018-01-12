import Node from "./Node";
import DataType from '../data/DataType';

// NodeTemplate.GetProperty = {
//   name: 'Get Property',
//   input: [{
//     name: 'actor',
//     type: DataType.ACTOR, 
//   }],
//   output: [{
//     name: 'property',
//     type: DataType.GENERIC
//   }],
//   elementClass: ['property', 'getter']
// }


// TODO: to be removed
// Dynamic property getter. Maybe not useful?
export default class GetProperty extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);
    // name is authoring time settings.
    this.property = pod.property;
    this.variables.actor = this.variables.actor || this.owner.id;

    // dynamic output
    this.outputs.addOutput(this.property);
    this.outputs.assignProperty(this.property, {
      get: () => {
        return LookUp.get(this.variables.actor)[this.property]
      }
    });
  }

  get nodeName() {
    return 'Get ' + this.property.charAt(0).toUpperCase() + this.property.slice(1);
  }

  pod(detail=false) {
    return {
      ...super.pod(detail),
      property: this.property,
    }
  }

  get elementClassName() {
    return ['property', 'getter'];
  }
}
