import EventEmitter from "../utils/EventEmitter";

// TODO: to be removed
export default class extends EventEmitter
{
  constructor() {
    super();
    
    this.arr = [];
  }

  push(v) {
    this.arr.push(v);
    this.omit('list.data.added', v);
  }

  remove(v) {
    this.removeAt(this.arr.indexOf(v));
  }

  removeAt(index) {
    if(index == -1) return null;
    let removed = this.arr.splice(i, 1)[0];

    this.omit('list.data.removed', removed);
    return removed;
  }
  
  [Symbol.iterator]() {
    return this.arr[Symbol.iterator]();
  }

  get length() {
    return this.arr.length;
  }
}