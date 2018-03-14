import ArrayMap from "@/utils/ArrayMap";
import DataType from "./DataType";
import Property from "./Property";

export default class extends ArrayMap
{
  constructor(actor) {
    super();
    this.actor = actor;
  }

  add(pod) {
    let property = new Property(this.actor, pod);
    this.set(property.propertyName, property);
  }

  getType(propertyName) {
    return this.get(propertyName).type;
  }
  
  
  updateRuntime() {
    for(let property of this) {
      property.updateRuntime();
    }
  }

  pod() {
    let properties = {}
    this.map((propertyName, property) => {
      properties[propertyName] = property.pod();
    })
    return properties;
  }
}