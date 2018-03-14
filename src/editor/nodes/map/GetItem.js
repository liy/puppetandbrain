import Node from '../Node';
import DataType from '../../data/DataType';

NodeTemplate.set({
  className: 'GetItem',
  name: 'Get Item',
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
    name: 'item',
    descriptor: {
      type: DataType.GENERIC,
    }
  }],
  memory: {
    map: {}
  },
  elementClass: ['map', 'center-output'],
  category: 'Map'
})

export default class GetItem extends Node
{
  constructor(id, activity) {
    super(id, activity)
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('item', {
      get: () => {
        let map = this.inputs.value('map');
        let key = this.inputs.value('key');
        return map[key];
      }
    });
  }
}
