import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.Absolute = {
  className: 'Absolute',
  name: 'Absolute',
  inputs: [{
    name: 'number',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  outputs: [{
    name: 'absolute',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  memory: {
    number: -1,
  },
  elementClass: ['arithmetic'],
  category: 'Math',
}

export default class Absolute extends Node
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('absolute', {
      get: () => {
        return Math.abs(this.inputs.value('number'));
      }
    });
  }
}