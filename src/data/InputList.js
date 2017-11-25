import Pointer from './Pointer';
import ArrayMap from '../utils/ArrayMap';

export default class InputList extends ArrayMap
{
  constructor(node) {
    super();
    this.node = node;

    // Ready only, I could make them getter. I assume no one will touch them.
    // Just make code easier to read.
    this.pointers = this.values;
    this.names = this.keys;
  }

  destroy() {
    for(let name of this.keys) {
      this.pointers[name].destroy();
    }
  }

  addInput(name) {
    let pointer = this.get(name);
    if(!pointer) {
      pointer = new Pointer(this.node, name)
      this.set(name, pointer);
    }
    return pointer;
  }

  value(name) {
    return this.pointers[name].value;
  }

  isConnected(name) {
    return !this.pointers[name].isLocalPointer;
  }

  pod(detail) {
    if(detail) {
      return this.names.map(name => {
        return this.pointers[name].pod()
      })
    }
    else {
      return this.names.map(name => {
        return this.pointers[name].id
      })
    }
  }
}