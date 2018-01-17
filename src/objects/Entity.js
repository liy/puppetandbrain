import ArrayMap from "../utils/ArrayMap";

export default class Entity
{
  constructor() {
    this.components = new ArrayMap();
  }

  addComponent(name, component) {
    component.entity = this;
    this.components.set(name, component);
    component.added();
    return component;
  }

  removeComponent(name) {
    let {index, value: component} = this.components.remove(name);
    if(component) {
      component.entity = null;
      component.removed();
    }
    return component;
  }

  getComponent(name) {
    return this.components.get(name);
  }

  tick() {
    for(let component in this.components) {
      component.tick();
    }
  }
}