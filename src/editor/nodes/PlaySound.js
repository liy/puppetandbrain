import {Task, Template as ParentTemplate} from './Task'
import DataType from "../data/DataType";
import SoundLoader from '../resources/SoundLoader'


NodeTemplate.PlaySound = {
  ...ParentTemplate,
  className: 'PlaySound',
  name: 'Play Sound',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  inputs: [{
    name: 'audio',
    descriptor: {
      type: DataType.AUDIO,
    }
  },{
    name: 'loop',
    descriptor: {
      type: DataType.BOOLEAN,
    }
  }],
  outputs: [{
    name: 'sound',
    descriptor: {
      type: DataType.AUDIO
    }
  }],
  memory: {
    loop: false,
    audio: {
      fileName: null,
      path: null,
      hash: null,
      ext: null
    },
  },
  category: 'Audio',
  elementClass: ['audio']
}
export default class PlaySound extends Task
{
  constructor(id, activity) {
    super(id, activity);

    this.complete = this.complete.bind(this);

    this.activity.on('game.stop', this.stop, this)
  }

  init(pod) {
    super.init(pod);

    this.audio = new Audio();

    let fileData = this.memory['audio'];
    if(fileData) {
      // prefetch the not loaded local memory audio
      this.inputs.get('audio').on('input.disconnected', () => {
        SoundLoader.fetch(fileData);
      });
    }
  }

  destroy() {
    // make sure "input.disconnected" does not fire during destroy process
    this.inputs.get('audio').removeAllListeners();
    
    super.destroy();
    if(this.audio) {
      this.audio.pause();
      this.audio.removeEventListener('ended', this.complete);
    }
    this.activity.off('game.stop', this.stop, this)
  }
  
  
  async run() {
    super.run();

    // stop any looping sound...
    if(this.audio && this.audio.loop) {
      this.audio.pause();
    }

    let input = this.inputs.value('audio');

    // passthrough if not sound avaiable
    if(!input.path) {
      this.execution.run();
      return;
    }

    let blob = ActivityManager.activity.resources.get(input.path);
    if(blob) {
      this.audio.src = URL.createObjectURL(blob);
    }
    else {
      // After loading completed, if user disconnect a originally connected pointer.
      // the local memory audio is not availble because it is not preloaded.
      // therefore we need to await, fetch and put it into the resources for next time use 
      // 
      // I did a prefetch when input is disconnected 
      this.audio.src = URL.createObjectURL(await SoundLoader.fetch(input));
    }
    this.audio.loop = Boolean(this.inputs.value('loop'));
    this.audio.addEventListener('ended', this.complete, {once: true})

    this.audio.play();
    this.outputs.assignValue('sound', this.audio);

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

  getUserFiles() {
    // There is no way you can clear the local audio input
    // It is unwise to load local memory audio file if it is not used
    if(!this.inputs.get('audio').isConnected) {
      let data = this.memory.audio;
      if(data.hash) {
        return [data]
      }
    }
    return null;
  }
}