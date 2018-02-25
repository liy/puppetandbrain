import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.PropertyGetter = {
  className: 'PropertyGetter',
  // inputs: [{
  //   name: 'puppet',
  //   descriptor: {
  //     type: DataType.ACTOR, 
  //   }
  // }],
  inputs: [],
  outputs: [],
  elementClass: ['property', 'collapsed'],
  category: 'Property'
}

// Dynamic property getter. Maybe not useful?
export default class PropertyGetter extends Node
{
  constructor(id, lookUp) {
    super(id, lookUp)
  }

  init(pod) {
    super.init(pod);

    // TODO: to be removed???
    // default to owner.
    this.memory.puppet = this.memory.puppet || this.owner.id;

    // property name is authoring time settings.
    this.propertyName = pod.propertyName;

    // dynamic output
    this.outputs.assignProperty(this.propertyName, {
      get: () => {
        return this.lookUp.get(this.inputs.value('puppet'))[this.propertyName]
      }
      // TODO: note that if puppet change, in theory the type should be changed as well
      // I did not handle that yet...
    });
  }
  
  get nodeName() {
    return `${this.propertyName}`;
  }
  
  pod(detail=false) {
    return {
      ...super.pod(detail),
      propertyName: this.propertyName,
    }
  }
}