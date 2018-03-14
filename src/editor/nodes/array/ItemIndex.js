import Node from '../Node';
import DataType from '../../data/DataType';

NodeTemplate.set({
  className: 'ItemIndex',
  name: 'Item Index',
  inputs: [{
    name: 'list',
    descriptor: {
      type: DataType.ARRAY,
    }
  }, {
    name: 'item',
    descriptor: {
      type: DataType.INTEGER,
    }
  }],
  outputs: [{
    name: 'index',
    descriptor: {
      type: DataType.INTEGER,
    }
  }],
  memory: {
    list: []
  },
  elementClass: ['array', 'center-output'],
  category: 'List'
})

export default class ItemIndex extends Node
{
  constructor(id, activity) {
    super(id, activity)
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('index', {
      get: () => {
        let arr = this.inputs.value('list');
        let item = this.inputs.value('item');
        return arr.indexOf(item);
      }
    });
  }
}
