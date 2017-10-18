var ID = 0;

window.LookUp = Object.create(null);

export default class Entity
{
  constructor() {
    this.id = ++ID;
    this.components = Object.create(null);

    LookUp[this.id] = this;
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