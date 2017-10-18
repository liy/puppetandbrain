import EventEmitter from '../utils/EventEmitter';

var ID = 0;

export default class Command extends EventEmitter
{
  constructor() {
    super()
    this.id = ++ID;
  }

  async run() {
    await this.start();
    await this.process();
    await this.end();
    return Promise.resolve(this.id);
  }

  start() {
    this.emit('start');
    return Promise.resolve();
  }

  process() {

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
}