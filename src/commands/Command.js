import EventEmitter from '../utils/EventEmitter';

var ID = 0;

export default class Command extends EventEmitter
{
  constructor() {
    super()
    this.id = ++ID;
    this.target = null;

    this.children = []
  }

  add(...cmds) {
    for(let cmd of cmds) {
      cmd.target = this.target;
    }
    this.children.push(...cmds);
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

  start() {
    this.emit('start');
    return Promise.resolve();
  }

  process() {
    return Promise.resolve();
  }

  end() {
    this.emit('end');
    return Promise.resolve();
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