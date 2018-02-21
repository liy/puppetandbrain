import ArrayMap from "../utils/ArrayMap";

export default class Entity
{
  constructor() {
    this.isOnStage = false;
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
    if(this.isOnStage) component.onStage();
    return component;
  }

  removeComponent(name) {
    let {index, value: component} = this.components.remove(name);
    if(component) {
      component.entity = null;
      component.removed();
      if(this.isOnStage) component.offStage();
    }
    return component;
  }

  onStage() {
    this.isOnStage = true;
    for(let component of this.components) {
      component.onStage();
    }
  }

  offStage() {
    this.isOnStage = false;
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