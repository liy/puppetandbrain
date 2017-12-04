import ArrayMap from "../utils/ArrayMap";

export default class Execution extends ArrayMap
{
  constructor() {
    super();

    this.set('default')
  }

  run(name='default') {
    if(this.values[name]) {
      this.values[name].run();
    }
  }

  get names() {
    return this.getKeys();
  }

  pod() {
    return this.keys.map(name => {
      return {
        executionName: name,
        id: this.values[name] ? this.values[name].id : null
      }
    })
  }
}