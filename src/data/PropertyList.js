import ArrayMap from "../utils/ArrayMap";

export default class extends ArrayMap
{
  constructor(actor) {
    super();
    this.actor = actor;
  }

  add(propertyName, descriptor) {
    this.set(propertyName, {
      // default user friendly name to be the property text
      friendlyName: propertyName,
      ...descriptor
    });
    // handles initial and default value
    this.actor[propertyName] = descriptor.value;
  }

  getType(propertyName) {
    return this.get(propertyName).type;
  }

  pod() {
    const properties = {};
    this.map((propertyName, descriptor) => {
      // TODO: I think I only need to serailzie the current value of the property
      // not everything, since they are all fixed and defined in class
      descriptor.value = this.actor[propertyName];
      properties[propertyName] = descriptor;
    })
    return properties;
  }
}