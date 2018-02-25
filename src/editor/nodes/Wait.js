import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Wait = {
  ...ParentTemplate,
  className: 'Wait',
  name: 'Wait',
  inputs: [{
    name: 'seconds',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  memory: {
    seconds: 1
  },
  elementClass: ['flow-control'],
  category: 'Flow Control',
  iconPath: require('!file-loader!@/assets/icons/clock.svg')
}
export default class Wait extends Task
{
  constructor(id, activity) {
    super(id, activity);

    Editor.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    clearTimeout(this.timeoutID);
    Editor.off('game.stop', this.stop, this)
  }

  stop() {
    clearTimeout(this.timeoutID);
  }

  run() {
    super.run()

    this.timeoutID = setTimeout(() => {
      this.execution.run();
    }, this.inputs.value('seconds')*1000);
  }
}