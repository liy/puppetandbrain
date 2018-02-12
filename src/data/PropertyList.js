import ArrayMap from "../utils/ArrayMap";

export default class extends ArrayMap
{
  constructor(actor) {
    super();
    this.actor = actor;
  }

  add(property) {
    let propertyName = property.propertyName;
    this.set(propertyName, {
      propertyName: propertyName,
      descriptor: {
        // default user friendly name to be the property text
        friendlyName: propertyName,
        ...property.descriptor,
      }
    });
    // handles initial and default value
    this.actor[propertyName] = property.value;
  }

  getType(propertyName) {
    return this.get(propertyName).type;
  }

  pod() {
    var properties = {};
    this.map((propertyName, property) => {
      // // TODO: I think I only need to serailzie the current value of the property
      // // not everything, since they are all fixed and defined in class
      // descriptor.value = this.actor[propertyName];
      // properties[propertyName] = descriptor;
      properties[propertyName] = this.actor[propertyName];
    })
    return properties;
  }
}