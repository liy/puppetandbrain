import ArrayMap from "@/utils/ArrayMap";
import Output from "./Output";
import EventEmitter from "@/utils/EventEmitter";
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
    this.node.stage.on('game.stop', this.clearValues, this);
  }

  destroy() {
    this.removeAllListeners();
    // FIXME: how to destroy? what means of destroy a output list?
    // probably because you are destroy the whole node?
    this.node.stage.off('game.stop', this.clearValues, this);
  }

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if(index < this.list.length) {
          return {
            value: this.list.values[this.list.keys[index++]],
            done: false
          }
        }

        return {done: true}
      }
    }
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

  add(name, outputDescriptor) {
    let output = this.list.get(name);
    if(!output) {
      output = new Output(this.node, this.data, name, outputDescriptor)
      this.list.set(name, output);
      // FIXME: send out the descriptor of the output insteand of just one name
      this.emit('output.added', name)
    }
    return output;
  }

  remove(name) {
    let output = this.list.get(name);
    this.list.remove(name);
    this.emit('output.removed', output)
    return output;
  }

  assignProperty(name, propertyDescriptor, outputDescriptor) {
    this.add(name, outputDescriptor).assignProperty(name, propertyDescriptor);
  }

  assignValue(name, value, outputDescriptor) {
    this.add(name, outputDescriptor).assignValue(name, value);
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