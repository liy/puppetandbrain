import {Task, Template as ParentTemplate} from './Task'
import DataType from "../data/DataType";
import SoundLoader from '../resources/SoundLoader'

NodeTemplate.set({
  ...ParentTemplate,
  className: 'StopSound',
  name: 'Stop Sound',
  execution: [{
    name: 'default'
  }],
  inputs: [{
    name: 'sound',
    descriptor: {
      type: DataType.AUDIO,
      gadgetDisabled: true,
    }
  }],
  category: 'Audio',
  elementClass: ['audio']
})

export default class StopSound extends Task
{
  constructor(id, activity) {
    super(id, activity);
  }
  
  async run() {
    super.run();

    let sound = this.inputs.value('sound');
    if(sound) sound.pause();

    this.execution.run();
  }

  complete() {
    this.execution.run('completed')
  }
}