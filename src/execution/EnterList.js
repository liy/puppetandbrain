import ArrayMap from "../utils/ArrayMap";
import Enter from './Enter';

export default class extends ArrayMap
{
  constructor(node) {
    super();
    this.node = node;

    this.names = this.keys;
  }

  add(name) {
    let enter = this.get(name);
    if(!enter) {
      enter = new Enter(this.node, name)
      this.set(name, enter);
    }
    return enter;
  }

  pod() {
    return this.names.map(name => {
      return this.values[name].pod();
    });
  }
}