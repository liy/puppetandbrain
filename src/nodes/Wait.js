import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Wait = {
  ...ParentTemplate,
  inputs: [{
    name: 'seconds',
    type: DataType.GENERIC,
  }],
  elementClass: ['flow-control'],
  category: 'Flow Control',
  iconPath: require('!file-loader!../assets/icons/clock.svg')
}
export default class Wait extends Task
{
  constructor(id) {
    super(id);

    Stage.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    clearTimeout(this.timeoutID);
    Stage.off('game.stop', this.stop)
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