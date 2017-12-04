import Task from "./Task";

export default class PlaySound extends Task
{
  constructor(id) {
    super(id);

    this.inputs.addInput('sound url');
    this.inputs.addInput('loop');

    this.outputs.addOutput('audio');
    // sound complete execution
    this.execution.set('completed');

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
    super.run();
    
    this.audio = new Audio(this.inputs.value('sound url'));
    this.audio.loop = Boolean(this.inputs.value('loop'));
    console.log(this.audio.loop)
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