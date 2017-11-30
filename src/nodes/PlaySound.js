import Task from "./Task";

export default class PlaySound extends Task
{
  constructor(id) {
    super(id);

    this.inputs.addInput('sound name');
    this.variables['sound name'] = 'chicken-walk.mp3';

    this.outputs.addOutput('audio');
    // sound complete execution
    this.execution.set('complete');

    this.stop = this.stop.bind(this)
    Stage.on('game.stop', this.stop)
  }

  destroy() {
    super.destroy();
    if(this.audio) this.audio.stop();
    Stage.off('game.stop', this.stop)
  }

  run() {
    this.audio = new Audio(this.soundName);
    this.audio.addEventListener('ended', () => {
      this.execution.run('complete')
    },{once: true})

    this.audio.play();
    this.outputs.assignValue('audio', this.audio);

    this.execution.run();
  }

  stop() {
    this.audio.pause();
  }

  get nodeName() {
    return 'Play Sound'
  }
  
  // TODO: remove this hack!!!
  get soundName() {
    let name = this.inputs.value('sound name');
    console.warn(name);
    let ext = name.split('.').pop();
    if(ext != 'mp3') {
      name += '.mp3';
    }
    return name;
  }
}