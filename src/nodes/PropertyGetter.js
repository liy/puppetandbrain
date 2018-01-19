import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.PropertyGetter = {
  className: 'PropertyGetter',
  inputs: [{
    name: 'puppet',
    type: DataType.ACTOR, 
  }],
  outputs: [],
  elementClass: ['property', 'getter'],
  category: 'Property'
}

// Dynamic property getter. Maybe not useful?
export default class PropertyGetter extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    // default to self.
    this.memory.puppet = this.owner.id;

    // name is authoring time settings.
    this.property = pod.property;

    // dynamic output
    this.outputs.assignProperty(this.property, {
      get: () => {
        return LookUp.get(this.inputs.value('puppet'))[this.property]
      }
      // TODO: note that if puppet change, in theory the type should be changed as well
      // I did not handle that yet...
    });
  }
  
  get nodeName() {
    return `Get ${this.owner.name} ${this.property}`;
  }
  
  pod(detail=false) {
    return {
      ...super.pod(detail),
      property: this.property,
    }
  }
}