import Node from "./Node";
import DataType from "../data/DataType";
import Vec2 from "../math/Vec2";

NodeTemplate.MakePosition = {
  className: 'MakePosition',
  name: 'Make Position',
  inputs: [{
    name: 'x',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }, {
    name: 'y',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  outputs: [{
    name: 'position',
    descriptor: {
      type: DataType.VEC2,
    }
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
        return new Vec2(this.inputs.value('x'), this.inputs.value('y'));
      }
    });
  }
}
