import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.MakePosition = {
  name: 'Make Position',
  inputs: [{
    inputName: 'x',
    type: DataType.GENERIC,
  }, {
    inputName: 'y',
    type: DataType.GENERIC,
  }],
  outputs: [{
    name: 'position',
    type: DataType.VEC2,
  }],
  elementClass: ['getter']
}

export default class MakePosition extends Node
{
  constructor(id) {
    super(id)
  }

  mold() {
    super.mold();

    this.outputs.assignProperty('position', {
      get: () => {
        return {
          x: this.inputs.value('x'),
          y: this.inputs.value('y')
        }
      }
    });
  }
}
