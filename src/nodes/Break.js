import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.Break = {
  enter: {
    enabled: false
  },
  execution: [],
  inputs: [{
    name: 'in',
    type: DataType.GENERIC,
  }],
  outputs: [],
  elementClass: ['utility'],
  category: 'Utilities'
}

/**
 * Break's output is dynamic
 * 
 * @export
 * @class Break
 * @extends {Node}
 */
export default class Break extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);
    
    for(let outputPod of pod.outputs) {
      this.outputs.assignProperty(outputPod.name, {
        get: () => {
          return this.inputs.value('in')[outputPod.name]
        }
      });
    }
  }
}
