import {Task, Template as ParentTemplate} from '../Task';
import DataType from '../../data/DataType';

NodeTemplate.Contains = {
  ...ParentTemplate,
  className: 'Contains',
  name: 'Contains',
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

export default class Contains extends Task
{
  constructor(id, lookUp) {
    super(id, lookUp)
  }

  run() {
    super.run();

    let map = this.inputs.value('map');
    let key = this.inputs.value('key');
    let exist = key in map;

    this.outputs.assignValue('exist', exist);

    this.execution.run();
  }
}
