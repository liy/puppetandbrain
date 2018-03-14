import Node from '../Node';
import DataType from '../../data/DataType';

NodeTemplate.set({
  className: 'MapSize',
  name: 'Map Size',
  inputs: [{
    name: 'map',
    descriptor: {
      type: DataType.MAP,
    }
  }],
  outputs: [{
    name: 'size',
    descriptor: {
      type: DataType.INTEGER,
    }
  }],
  memory: {
    map: {}
  },
  elementClass: ['map', 'collapsed'],
  category: 'Map'
})

export default class MapSize extends Node
{
  constructor(id, activity) {
    super(id, activity)
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('size', {
      get: () => {
        let map = this.inputs.value('map');
        return Object.keys(map).length;
      }
    });
  }
}
