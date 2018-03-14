import {Task, Template as ParentTemplate} from '../Task';
import DataType from '../../data/DataType';

NodeTemplate.set({
  ...ParentTemplate,
  className: 'PushItem',
  name: 'Add Item',
  inputs: [{
    name: 'list',
    descriptor: {
      type: DataType.ARRAY,
    }
  }, {
    name: 'item',
    descriptor: {
      type: DataType.GENERIC,
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
  elementClass: ['array'],
  category: 'List'
})

export default class PushItem extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  run() {
    super.run();

    let arr = this.inputs.value('list');
    let item = this.inputs.value('item');
    let len = arr.push(item);
    this.outputs.assignValue('size', len);

    this.execution.run();
  }
}
