
import LookUp from './LookUp';
import EventEmitter from '../utils/EventEmitter'

export default class Entity extends EventEmitter
{
  constructor(id) {
    super();

    this.components = Object.create(null);

    // create an entry in the reference look up
    this.id = LookUp.create(this, id);
  }

  addComponent(component) {
    component.entity = this;
    this.components[component.constructor.name] = component;
    component.added();
  }

  removeComponent(componentClassName) {
    delete this.components[componentClassName];
    component.entity = null;
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