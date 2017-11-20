import ArrayMap from "../utils/ArrayMap";

export default class Execution extends ArrayMap
{
  constructor(id) {
    super();
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
        name,
        id: this.values[name] ? this.values[name].id : undefined
      }
    })
  }
}