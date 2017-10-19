import Command from './Command';

export default class Move extends Command
{
  constructor(dest, duration) {
    super();
    this.dest = dest;
    this.duration = duration;
  }

  process() {
    console.log('run')
    return new Promise(resolve => {
      TweenLite.to(this.target, this.duration/1000, {...this.dest, onComplete: resolve});
    })
  }

  serialize() {
    return JSON.stringify({
      class: Move,
      dest: this.dest,
      duration: this.duration
    })
  }

  static deserialize(data) {
    return new Move(data.dest, data.duration);
  }
}