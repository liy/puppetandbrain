export default class Component
{
  constructor(name=this.className) {
    this.name = name;
    this.entity = null;
  }

  added() {

  }

  removed() {

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