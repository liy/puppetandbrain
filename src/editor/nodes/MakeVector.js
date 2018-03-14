import Node from "./Node";
import DataType from "../data/DataType";
import Vec2 from "../math/Vec2";

NodeTemplate.set({
  className: 'MakeVector',
  name: 'Make Vector',
  outputName: 'vector',
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
    name: 'vector',
    descriptor: {
      type: DataType.VEC2,
    }
  }],
  memory: {
    x: 0,
    y: 0,
  },
  elementClass: ['utility', 'center-output'],
  category: 'Utilities',
  keywords: ['vector', 'transformation']
})

export default class MakeVector extends Node
{
  constructor(id, activity) {
    super(id, activity)
  }

  init(pod) {
    super.init(pod);

    this.outputName = pod.outputName;

    this.outputs.assignProperty(this.outputName, {
      get: () => {
        return new Vec2(this.inputs.value('x'), this.inputs.value('y'));
      }
    });
  }

  
  pod(detail) {
    let pod = super.pod(detail);
    pod.outputName = this.outputName;
    return pod;
  }
}
