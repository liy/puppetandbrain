import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.MakePosition = {
  name: 'Make Position',
  inputs: [{
    name: 'x',
    type: DataType.GENERIC,
  }, {
    name: 'y',
    type: DataType.GENERIC,
  }],
  outputs: [{
    name: 'position',
    type: DataType.VEC2,
  }],
  elementClass: ['getter'],
  memory: {
    x: 0,
    y: 0,
  },
  elementClass: ['utility', 'center-output'],
  category: 'Utilities',
  keywords: ['position', 'transformation']
}

export default class MakePosition extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('position', {
      get: () => {
        return {
          x: this.inputs.value('x'),
          y: this.inputs.value('y')
        }
      }
    }, DataType.VEC2);
  }
}
