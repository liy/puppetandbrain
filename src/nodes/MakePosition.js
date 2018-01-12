import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.MakePosition = {
  name: 'Make Position',
  input: [{
    name: 'x',
    type: DataType.GENERIC,
  }, {
    name: 'y',
    type: DataType.GENERIC,
  }],
  output: [{
    name: 'position',
    type: DataType.VEC2,
  }]
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
