import ArrayMap from "../utils/ArrayMap";
import EventEmitter from "../utils/EventEmitter";

export default class Output extends EventEmitter
{
  constructor(node, data, name) {
    super();

    this.node = node;
    this.data = data;
    this.name = name;
    this.isValue = true;
    this.connections = Object.create(null);
  }

  assignProperty(name, descriptor) {
    this.isValue = false;
    Object.defineProperty(this.data, name, descriptor);
  }

  assignValue(name, value) {
    this.isValue = true;    
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

  pod(detail) {
    let pod = {
      node: this.node.id,
      name: this.name,
      isValue: this.isValue,
    }
    // ActivityLoader does not require information who connects to this output.
    // Because it just loops through all pointers, connect them all.
    // On the other hand, DeleteBlock command require connections as it does not
    // have access to a simple flat pointers array. It has to replies on the connections
    // informatin to reconnect the other block's inputs with deleted outputs.
    if(detail) {
      pod.connections = this.getPointers().map(pointer => {
        return {
          id: pointer.id,
          inputNode: pointer.inputNode.id,
          inputName: pointer.inputName,
        }
      })
    }
    return pod;
  }
}