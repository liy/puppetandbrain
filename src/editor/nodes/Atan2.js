import Node from "./Node";
import DataType from "../data/DataType";
import {toDegree} from '@/utils/utils'

NodeTemplate.set({
  className: 'Atan2',
  name: 'Atan2',
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
    name: 'degree',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  memory: {
    y: 1,
    x: 1,
  },
  elementClass: ['arithmetic', 'collapsed'],
  category: 'Math',
})

export default class Atan2 extends Node
{
  constructor(id, activity) {
    super(id, activity);
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('degree', {
      get: () => {
        return Math.atan2(this.inputs.value('y'), this.inputs.value('x')) * toDegree;
      }
    });
  }
}