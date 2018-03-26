import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.set({
  ...ParentTemplate,
  className: 'Spawn',
  name: 'Spawn',
  inputs: [{
    name: 'puppet',
    descriptor: {
      type: DataType.GENERIC,
    }
  }],
  memory: {
    puppet: null
  },
  category: 'Utilities',
  elementClass: ['utility'],
  keywords: ['create', 'puppet']
})

export default class Spawn extends Task
{
  constructor(id, activity) {
    super(id, activity);
  }

  init(pod) {
    super.init(pod);

    // TODO: how to identify the spawn target?????
  }
} 