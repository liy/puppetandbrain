import Node from '../Node';
import DataType from '../../data/DataType';

NodeTemplate.set({
  className: 'GetByIndex',
  name: 'Get Item',
  inputs: [{
    name: 'list',
    descriptor: {
      type: DataType.ARRAY,
    }
  }, {
    name: 'index',
    descriptor: {
      type: DataType.INTEGER,
    }
  }],
  outputs: [{
    name: 'item',
    descriptor: {
      type: DataType.GENERIC,
    }
  }],
  memory: {
    list: []
  },
  elementClass: ['array', 'center-output'],
  category: 'List'
})

export default class GetByIndex extends Node
{
  constructor(id, activity) {
    super(id, activity)
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('item', {
      get: () => {
        let arr = this.inputs.value('list');
        let index = this.inputs.value('index');
        return arr[index];
      }
    });
  }
}
