import Node from '../Node';
import DataType from '../../data/DataType';

NodeTemplate.ArrayLen = {
  className: 'ArrayLen',
  name: 'List Size',
  inputs: [{
    name: 'list',
    descriptor: {
      type: DataType.ARRAY,
    }
  }],
  outputs: [{
    name: 'size',
    descriptor: {
      type: DataType.INTEGER,
    }
  }],
  memory: {
    list: []
  },
  elementClass: ['array', 'collapsed'],
  category: 'List'
}

export default class ArrayLen extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('size', {
      get: () => {
        let arr = this.inputs.value('list');
        return arr.length;
      }
    });
  }
}
