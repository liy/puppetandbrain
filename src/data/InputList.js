import Pointer from './Pointer';
import ArrayMap from '../utils/ArrayMap';

export default class InputList extends ArrayMap
{
  constructor(node) {
    super();
    this.node = node;

    // Ready only, I could make them getter. I assume no one will touch them.
    // Just make code easier to read.
    this.inputs = this.values;
    this.names = this.keys;
  }

  destroy() {
    for(let name of this.keys) {
      this.inputs[name].destroy();
    }
  }

  add(name, type) {
    let input = this.get(name);
    if(!input) {
      input = new Pointer(this.node, name, type)
      this.set(name, input);
    }
    return input;
  }

  value(name) {
    return this.inputs[name].value;
  }

  isConnected(name) {
    return !this.inputs[name].isLocalPointer;
  }

  pod() {
    return this.names.map(name => {
      return this.inputs[name].pod()
    })
  }
}