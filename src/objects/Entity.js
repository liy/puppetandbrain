import ArrayMap from "../utils/ArrayMap";

export default class Entity
{
  constructor() {
    this.components = new ArrayMap();
  }

  removeComponents() {
    let names = this.components.keys;
    for(let name of names) {
      this.removeComponent(name);
    }
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

  onStage() {
    for(let component of this.components) {
      component.onStage();
    }
  }

  offStage() {
    for(let component of this.components) {
      component.offStage();
    }
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