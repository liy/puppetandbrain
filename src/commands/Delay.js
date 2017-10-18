import Command from './Command';

export default class Delay extends Command
{
  constructor(seconds) {
    super();
    this.seconds = seconds;
  }

  process() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.seconds * 1000)
    });
  }
}