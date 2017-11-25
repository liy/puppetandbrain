import ArrayMap from "../utils/ArrayMap";
import Output from "./Output";

export default class OutputList extends ArrayMap
{
  constructor(node) {
    super();
    this.node = node;
    // One place to holds all temporary output data
    this.data = Object.create(null);
    // A shortcut but not read only, I assume no one will touch it...
    this.names = this.keys;
  }

  destroy() {
    // FIXME: how to destroy? what means of destroy a output list?
    // probably because you are destroy the whole node?
  }

  addOutput(name) {
    let output = this.get(name);
    if(!output) {
      output = new Output(this.node, this.data, name)
      this.set(name, output);
    }
    return output;
  }

  assignProperty(name, descriptor) {
    this.addOutput(name).assignProperty(name, descriptor);
  }

  assignValue(name, value) {
    this.addOutput(name).assignValue(name, value);
  }

  clearValues() {
    // reset value data to be undefined
    for(let name of this.names) {
      let output = this.values[name];
      if(output.isValue) {
        this.data[output.name] = undefined;
      }
    }
  }

  pod(detail) {
    return this.names.map(name => {
      return this.values[name].pod(detail);
    })
  }
}