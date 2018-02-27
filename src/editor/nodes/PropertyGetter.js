import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.PropertyGetter = {
  className: 'PropertyGetter',
  // Since it is dynamic, it won't be safe to
  // ask user supply puppet reference.
  inputs: [],
  outputs: [],
  elementClass: ['property', 'collapsed'],
  category: 'Property'
}

// Dynamic property getter. Maybe not useful?
export default class PropertyGetter extends Node
{
  constructor(id, activity) {
    super(id, activity)
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
        // TODO: directly get value from the actor properties list without go through actor getter?
        return this.owner[this.propertyName];
      }
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