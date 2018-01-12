import Node from "./Node";

NodeTemplate.Break = {
  name: 'Break',
  in: ['default'],
  out: ['default'],
  input: [{
    name: 'in',
    type: 'object',
  }]
}

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
