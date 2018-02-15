import {Task, Template as ParentTemplate} from '../Task';
import DataType from '../../data/DataType';

NodeTemplate.RemoveItem = {
  ...ParentTemplate,
  className: 'RemoveItem',
  name: 'Remove Item',
  inputs: [{
    name: 'map',
    descriptor: {
      type: DataType.MAP,
    }
  }, {
    name: 'key',
    descriptor: {
      type: DataType.GENERIC,
    }
  }],
  outputs: [{
    name: 'item removed',
    descriptor: {
      type: DataType.GENERIC,
    }
  }],
  memory: {
    map: {}
  },
  elementClass: ['map'],
  category: 'Map'
}

export default class RemoveItem extends Task
{
  constructor(id) {
    super(id)
  }

  run() {
    super.run();

    let map = this.inputs.value('map');
    let key = this.inputs.value('key');
    let item = map[key];
    delete map[key];

    this.outputs.assignValue('item removed', item);

    this.execution.run();
  }
}
