import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.Break = {
  className: 'Break',
  enter: {
    enabled: false
  },
  execution: [],
  inputs: [],
  outputs: [],
  elementClass: ['utility', 'center-input'],
  category: 'Utilities'
}

// FIXME: rename to extract????
// FIXME: add outputs when input is collected? auto outputs?
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
    
    this.inputName = pod.inputName;

    for(let outputPod of pod.outputs) {
      this.outputs.assignProperty(outputPod.name, {
        get: () => {
          return this.inputs.value(this.inputName)[outputPod.name]
        }
      }, outputPod.type);
    }
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.inputName = this.inputName;
    return pod;
  }
}
