export default class Entity
{
  constructor() {
    this.components = Object.create(null);
  }

  addComponent(component) {
    component.owner = this;
    this.components[component.constructor.name] = component;
    component.added();
  }

  removeComponent(componentClassName) {
    delete this.components[componentClassName];
    component.owner = null;
    component.removed();
  }

  getComponent(componentClassName) {
    return this.components[componentClassName];
  }

  tick() {
    for(let key in this.components) {
      this.components[key].tick();
    }
  }
}