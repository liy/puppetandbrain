import {Task, Template as ParentTemplate} from '../Task';
import DataType from '../../data/DataType';

NodeTemplate.SetItem = {
  ...ParentTemplate,
  className: 'SetItem',
  name: 'Set Item',
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
  }, {
    name: 'item',
    descriptor: {
      type: DataType.GENERIC,
    }
  }],
  outputs: [{
    name: 'exist',
    descriptor: {
      type: DataType.BOOLEAN,
    }
  }],
  memory: {
    map: {}
  },
  elementClass: ['map'],
  category: 'Map'
}

export default class SetItem extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  run() {
    super.run();

    let map = this.inputs.value('map');
    let item = this.inputs.value('item');
    let key = this.inputs.value('key');
    let exist = key in map;
    
    map[key] = item;

    this.outputs.assignValue('exist', exist);

    this.execution.run();
  }
}
