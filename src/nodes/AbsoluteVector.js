import Node from "./Node";
import DataType from "../data/DataType";
import Vec2 from "../math/Vec2";

NodeTemplate.AbsoluteVector = {
  className: 'AbsoluteVector',
  name: 'Absolute Vector',
  inputs: [{
    name: 'vector',
    descriptor: {
      type: DataType.VEC2,
    }
  }],
  outputs: [{
    name: 'absolute',
    descriptor: {
      type: DataType.VEC2
    }
  }],
  memory: {
    vector: {
      x: -1,
      y: -1
    },
  },
  elementClass: ['arithmetic'],
  category: 'Math',
}

export default class AbsoluteVector extends Node
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('absolute', {
      get: () => {
        return new Vec2(this.inputs.value('vector')).abs();
      }
    });
  }
}