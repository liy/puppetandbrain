import ArrayMap from "../utils/ArrayMap";

export default class extends ArrayMap
{
  constructor(actor) {
    super();
    this.actor = actor;
  }

  add(descriptor) {
    if(typeof descriptor === 'string') {
      this.set(descriptor, {property: descriptor});
    }
    else {
      this.set(descriptor.property, descriptor);
      // handles initial and default value
      this.actor[descriptor.property] = descriptor.value;
    }
  }

  pod() {
    const properties = {};
    this.map((property, descriptor) => {
      descriptor.value = this.actor[property];
      properties[property] = descriptor;
    })
    return properties;
  }
}