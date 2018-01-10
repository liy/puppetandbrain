import EventEmitter from "../utils/EventEmitter";

export default class extends EventEmitter
{
  constructor() {
    super();
    
    this.arr = [];
  }
}