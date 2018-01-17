import {Task, Template as ParentTemplate} from './Task'
import DataType from "../data/DataType";

NodeTemplate.PlaySound = {
  ...ParentTemplate,
  name: 'Play Sound',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  inputs: [{
    name: 'sound url',
    type: DataType.GENERIC,
  },{
    name: 'loop',
    type: DataType.GENERIC,
  }],
  outputs: [{
    name: 'audio',
    type: DataType.GENERIC
  }],
  memory: {
    loop: true,
    'sound url': '',
  },
  category: 'Audio',
  elementClass: ['audio']
}
export default class PlaySound extends Task
{
  constructor(id) {
    super(id);

    this.stop = this.stop.bind(this);
    this.complete = this.complete.bind(this);

    Editor.on('game.stop', this.stop)
  }

  destroy() {
    super.destroy();
    if(this.audio) {
      this.audio.pause();
      this.audio.removeEventListener('ended', this.complete);
    }
    Editor.off('game.stop', this.stop)
  }

  run() {
    super.run();

    // stop any looping sound...
    if(this.audio && this.audio.loop) {
      this.audio.pause();
    }
    
    this.audio = new Audio(this.inputs.value('sound url'));
    this.audio.loop = Boolean(this.inputs.value('loop'));
    this.audio.addEventListener('ended', this.complete, {once: true})

    this.audio.play();
    this.outputs.assignValue('audio', this.audio);

    this.execution.run();
  }

  complete() {
    this.execution.run('completed')
  }

  stop() {
    if(this.audio) {
      this.audio.pause();
      this.audio.removeEventListener('ended', this.complete);
    }
  }

  get nodeName() {
    return 'Play Sound'
  }
}