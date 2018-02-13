import EventEmitter from "../utils/EventEmitter";

export default class Component extends EventEmitter
{
  constructor(name) {
    super();
    this.name = name || this.className;
    this.entity = null;
  }

  added() {

  }

  removed() {

  }

  onStage() {

  }

  offStage() {
    
  }

  updateTransform() {
    
  }

  get className() {
    return this.__proto__.constructor.name;
  }

  pod() {
    return {
      name: this.name
    }
  }
}