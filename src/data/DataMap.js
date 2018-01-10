import ArrayMap from "../utils/ArrayMap";
import EventEmitter from "../utils/EventEmitter";

// TODO: to be removed
export default class extends EventEmitter
{
  constructor() {
    super();
    
    this.map = new ArrayMap();
  }
}