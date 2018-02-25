import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.Extractor = {
  className: 'Extractor',
  name: 'Extractor',
  enter: {
    enabled: false
  },
  execution: [],
  inputs: [{
    name: 'in',
    descriptor: {
      type: DataType.MAP
    }
  }],
  outputs: [],
  elementClass: ['utility', 'center-input'],
  category: 'Utilities',
  keywords: ['break']
}

export default class Extractor extends Node
{
  constructor(id, activity) {
    super(id, activity)
  }

  init(pod) {
    super.init(pod);

    let input = this.inputs.get('in');
    // All the outputs in extract are property 
    if(pod.outputs) {
      for(let outputPod of pod.outputs) {
        this.outputs.assignProperty(outputPod.name, {
          get: () => {
            // note that extractor does not care whether input is a reference
            // or an id... it is better to contains the complexity here without requring
            // other nodes to return certain type...
            return this.lookUp.auto(input.value)[outputPod.name]
          }
        });
      }
    }

    // as we added the listener after parent init, only user newly added output
    // will trigger the listener
    this.outputs.on('output.added', name => {
      this.outputs.assignProperty(name, {
        get: () => {
          return this.lookUp.auto(input.value)[name]
        }
      }, this.outputs.get(name).descriptor);
    });
  }
}
