import EventEmitter from '../utils/EventEmitter';

var ID = 0;

export default class Command extends EventEmitter
{
  constructor() {
    super()
    this.id = ++ID;

    this.children = []
  }

  chain(...cmds) {
    this.children.push(cmds[0])
    return cmds.reduce((result, current) => {
      result.children.push(current)
      return current
    })
  }

  async run() {
    await this.start();
    await this.process();
    await this.end();

    let promises = [];
    for(let cmd of this.children) {
      promises.push(cmd.run());
    }
    return Promise.all(promises);
  }


  serialize() {
    let data = Object.assign({
      constructor: this.constructor.name
    }, this);
    return JSON.stringify(data, (k, v) => {
      if(k === 'listenerTypes') return undefined;
      return v;
    });
  }

  tick() {
    for(let cmd of this.children) {
      cmd.tick()
    }
  }
}