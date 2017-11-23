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
    this.outputs = this.values;
  }

  destroy() {
    // TODO: how to destroy? what means of destroy a output list?
    // probably because you are destroy the whole node?
    this.outputs = null;
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
    this.get(name).assignProperty(name, descriptor);
  }

  assignValue(name, value) {
    this.get(name).assignValue(name, descriptor);
  }

  clearValues() {
    // reset value data to be undefined
    for(let output of this.values) {
      if(output.type == 'value') {
        this.data[output.name] = undefined;
      }
    }
  }

  pod() {
    return this.names.map(name => {
      return this.outputs[name].pod();
    })
  }
}