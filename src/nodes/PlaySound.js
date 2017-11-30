import Task from "./Task";

export default class PlaySound extends Task
{
  constructor(id) {
    super(id);

    this.inputs.addInput('sound url');
    this.variables['sound url'] = 'chicken-walk.mp3';

    this.outputs.addOutput('audio');
    // sound complete execution
    this.execution.set('complete');

    this.stop = this.stop.bind(this);
    this.complete = this.complete.bind(this);

    Stage.on('game.stop', this.stop)
  }

  destroy() {
    super.destroy();
    if(this.audio) {
      this.audio.pause();
      this.audio.removeEventListener('ended', this.complete);
    }
    Stage.off('game.stop', this.stop)
  }

  run() {
    this.audio = new Audio(this.soundName);
    this.audio.addEventListener('ended', this.complete, {once: true})

    this.audio.play();
    this.outputs.assignValue('audio', this.audio);

    this.execution.run();
  }

  complete() {
    this.execution.run('complete')
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
  
  // TODO: remove this hack!!!
  get soundName() {
    let name = this.inputs.value('sound url');
    console.warn(name);
    let ext = name.split('.').pop();
    if(ext != 'mp3') {
      name += '.mp3';
    }
    return name;
  }
}