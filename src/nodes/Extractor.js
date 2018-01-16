import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.Extractor = {
  className: 'Extractor',
  enter: {
    enabled: false
  },
  execution: [],
  inputs: [{
    name: 'in',
    type: DataType.MAP
  }],
  outputs: [],
  elementClass: ['utility', 'center-input'],
  category: 'Utilities',
  keywords: ['break']
}

export default class Extractor extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    let pointer = this.inputs.get('in');
    // All the outputs in extract are property 
    if(pod.outputs) {
      for(let outputPod of pod.outputs) {
        this.outputs.assignProperty(outputPod.name, {
          get: () => {
            return pointer.value[outputPod.name]
          }
        });
      }
    }
  }
}
