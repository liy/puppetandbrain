import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.Break = {
  name: 'Break',
  in: ['default'],
  out: ['default'],
  input: [{
    name: 'in',
    type: DataType.GENERIC,
  }]
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
