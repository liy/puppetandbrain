import Pointer from './Pointer';
import ArrayMap from '../utils/ArrayMap';

export default class Input extends ArrayMap
{
  constructor(owner) {
    super();
    this.owner = owner;
    // Just make code easier to read.
    this.pointers = this.values;
  }

  destroy() {
    for(let name of this.keys) {
      this.pointers[name].destroy();
    }
  }

  set(name, pointer) {
    // Make sure the pointer is set
    if(!pointer) pointer = new Pointer(this.owner, name);
    // destroy existing pointer
    if(this.pointers[name]) this.pointers[name].destroy();
    super.set(name, pointer);
  }

  get(name) {
    return this.pointers[name];
  }

  value(name) {
    return this.pointers[name].value;
  }

  addName(name) {
    this.set(name)
  }

  connected(pointer) {
    this.set(pointer.inputName, pointer);
  }

  disconnect(name) {
    this.set(name)
  }

  get names() {
    return this.getKeys();
  }

  pod() {
    return this.keys.map(name => {
      return  {
        name,
        id: this.pointers[name].id
      }
    })
  }
}