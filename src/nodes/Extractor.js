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
            // note that extractor does not care whether input is a reference
            // or an id... it is better to contains the complexity here without requring
            // other nodes to return certain type...
            return LookUp.auto(pointer.value)[outputPod.name]
          }
        });
      }
    }

    // as we added the listener after parent init, only user newly added output
    // will trigger the listener
    this.outputs.on('output.added', name => {
      this.outputs.assignProperty(name, {
        get: () => {
          return LookUp.auto(pointer.value)[name]
        }
      });
    });
  }
}
