import ArrayMap from "../utils/ArrayMap";
import DataType from "./DataType";
import Property from "./Property";

export default class extends ArrayMap
{
  constructor(actor) {
    super();
    this.actor = actor;
  }

  add(pod) {
    // let propertyName = property.propertyName;
    // this.set(propertyName, {
    //   propertyName: propertyName,
    //   descriptor: {
    //     // default user friendly name to be the property text
    //     friendlyName: propertyName,
    //     ...property.descriptor,
    //   }
    // });
    // if(property.descriptor.type != DataType.AUDIO || property.descriptor.type != DataType.IMAGE) {
    //   // handles initial and default value
    //   this.actor[propertyName] = property.value;
    // }
    let property = new Property(this.actor, pod);
    this.set(property.propertyName, property);
  }

  getType(propertyName) {
    return this.get(propertyName).type;
  }
  
  
  updateRuntime() {
    for(let property of this.values) {
      property.updateRuntime();
    }
  }

  pod() {
    var properties = {};
    this.map((propertyName, property) => {
      // // TODO: I think I only need to serailzie the current value of the property
      // // not everything, since they are all fixed and defined in class
      // descriptor.value = this.actor[propertyName];
      // properties[propertyName] = descriptor;
      // properties[propertyName] = this.actor[propertyName];
      
      properties[propertyName] = property.value || null;
    })
    return properties;
  }
}