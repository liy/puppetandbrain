import ArrayMap from "../utils/ArrayMap";
import Output from "./Output";
import EventEmitter from "../utils/EventEmitter";
import DataType from "./DataType";

export default class OutputList extends EventEmitter
{
  constructor(node) {
    super();
    this.node = node;
    // contains all the outputs
    this.list = new ArrayMap();
    // One place to holds all temporary output data
    // this.data = Object.create(null);
    this.data = {};
    // A shortcut but not read only, I assume no one will touch it...
    this.names = this.list.keys;

    // when game stops, make all values null
    this.clearValues = this.clearValues.bind(this);
    Editor.on('game.stop', this.clearValues);
  }

  destroy() {
    // FIXME: how to destroy? what means of destroy a output list?
    // probably because you are destroy the whole node?
    Editor.off('game.stop', this.clearValues);
  }

  map(callback) {
    return this.names.map(name => {
      return callback(name, this.list.values[name]);
    })
  }

  get(name) {
    return this.list.get(name);
  }

  remove(name) {
    this.list.remove(name);
  }

  getKeys() {
    return this.list.getKeys;
  }

  getValues() {
    return this.list.getValues();
  }

  
  contains(key) {
    return this.list.contains(key);
  }

  get length() {
    return this.list.length;
  }

  addOutput(name, type) {
    let output = this.list.get(name);
    if(!output) {
      output = new Output(this.node, this.data, name, type)
      this.list.set(name, output);
      this.emit('output.added', name)
    }
    return output;
  }

  assignProperty(name, descriptor, type) {
    this.addOutput(name, type).assignProperty(name, descriptor);
  }

  assignValue(name, value, type) {
    this.addOutput(name, type).assignValue(name, value);
  }

  clearValues() {
    // reset value data to be null
    for(let name of this.names) {
      let output = this.list.values[name];
      if(output.isValue) {
        this.data[output.name] = null;
      }
    }
  }

  pod(detail) {
    return this.names.map(name => {
      return this.list.values[name].pod(detail);
    })
  }
}