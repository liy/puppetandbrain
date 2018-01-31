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
    name: 'audio',
    type: DataType.AUDIO,
  },{
    name: 'loop',
    type: DataType.GENERIC,
  }],
  outputs: [{
    name: 'sound',
    type: DataType.GENERIC
  }],
  memory: {
    loop: false,
    audio: {
      fileName: 'boing.mp3',
      path: 'uploads/4e6cc0a9e8ecfb5f1124c74af0126a329893f963.mp3'
    },
  },
  category: 'Audio',
  elementClass: ['audio']
}
export default class PlaySound extends Task
{
  constructor(id) {
    super(id);

    this.complete = this.complete.bind(this);

    Editor.on('game.stop', this.stop, this)
  }

  init(pod) {
    super.init(pod);

    this.path = pod.path || null;
    if(this.path) {
      API.getUrl(this.path).then(url => {
        this.memory['audio'] = new Howl({
          src: [url]
        })
      })
    }
  }

  destroy() {
    super.destroy();
    if(this.audio) {
      this.audio.unload();
    }
    Editor.off('game.stop', this.stop, this)
  }
  

  run() {
    super.run();

    this.sound = this.inputs.value('audio');
    this.sound.loop(Boolean(this.inputs.value('loop')));
    this.sound.once('end', this.complete);

    let id = this.sound.play();
    this.outputs.assignValue('sound', {
      id,
      sound: this.sound,
    })

    this.execution.run();
  }

  complete() {
    this.execution.run('completed')
  }

  stop() {
    if(this.sound) {
      this.sound.stop();
    }
  }

  get nodeName() {
    return 'Play Sound'
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.path = this.path;
    return pod;
  }
}