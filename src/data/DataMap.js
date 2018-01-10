import ArrayMap from "../utils/ArrayMap";
import EventEmitter from "../utils/EventEmitter";

export default class extends EventEmitter
{
  constructor() {
    super();
    
    this.map = new ArrayMap();
  }
}