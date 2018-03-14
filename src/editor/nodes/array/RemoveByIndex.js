import {Task, Template as ParentTemplate} from '../Task';
import DataType from '../../data/DataType';

NodeTemplate.set({
  ...ParentTemplate,
  className: 'RemoveByIndex',
  name: 'Remove Item',
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
    name: 'item removed',
    descriptor: {
      type: DataType.GENERIC,
    }
  }],
  memory: {
    list: []
  },
  elementClass: ['array'],
  category: 'List'
})

export default class RemoveByIndex extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  run() {
    super.run();

    let arr = this.inputs.value('list');
    let index = this.inputs.value('index');
    if(index != -1) {
      let item = arr.splice(index, 1)[0];
      this.outputs.assignValue('item removed', item);
    }

    this.execution.run();
  }
}
