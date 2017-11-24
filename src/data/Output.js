import ArrayMap from "../utils/ArrayMap";
import EventEmitter from "../utils/EventEmitter";

export default class Output extends EventEmitter
{
  constructor(node, data, name) {
    super();

    this.properties = [];

    this.node = node;
    this.data = data;
    this.name = name;
    this.type = undefined;
    this.connections = Object.create(null);
  }

  assignProperty(name, descriptor) {
    this.type = 'property';
    Object.defineProperty(this.data, name, descriptor);
  }

  assignValue(name, value) {
    this.type = 'value';
    this.data[name] = value;
  }

  connect(pointer) {
    this.connections[pointer.id] = pointer;
    this.emit('output.connected', this)
  }

  disconnect(pointer) {
    delete this.connections[pointer.id];
    this.emit('output.disconnected', this)
  }

  contains(id) {
    return id in this.connections;
  }

  get isConnected() {
    return Object.keys(this.connections).length != 0;
  }

  getPointer(id) {
    return this.connections[id];
  }

  getPointers() {
    return Object.keys(this.connections).map(id => {
      return this.connections[id];
    })
  }

  pod() {
    return {
      node: this.node.id,
      name: this.name,
      type: this.type,
      properties: this.properties,
      connections: this.getPointers().map(pointer => {
        return {
          id: pointer.id,
          inputNode: pointer.inputNode.id,
          inputName: pointer.inputName,
        }
      })
    }
  }
}