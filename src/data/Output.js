import ArrayMap from "../utils/ArrayMap";
import EventEmitter from "../utils/EventEmitter";
import DataType from "./DataType";

export default class Output extends EventEmitter
{
  constructor(node, data, name, type=DataType.GENERIC) {
    super();

    this.type = type;
    this.node = node;
    this.data = data;
    this.name = name;
    this.isValue = true;
    // this.connections = Object.create(null);
    this.connections = {};
  }

  assignProperty(name, descriptor) {
    this.isValue = false;
    Object.defineProperty(this.data, name, descriptor);
  }

  assignValue(name, value) {
    this.isValue = true;    
    this.data[name] = value;
  }

  connect(input) {
    this.connections[input.id] = input;
    this.emit('output.connected', this)
  }

  disconnect(input) {
    delete this.connections[input.id];
    this.emit('output.disconnected', this)
  }

  contains(id) {
    return id in this.connections;
  }

  get isConnected() {
    return Object.keys(this.connections).length != 0;
  }

  getInput(id) {
    return this.connections[id];
  }

  getInputs() {
    return Object.keys(this.connections).map(id => {
      return this.connections[id];
    })
  }

  pod(detail) {
    let pod = {
      node: this.node.id,
      name: this.name,
      isValue: this.isValue,
      type: this.type,
    }
    // ActivityLoader does not require information who connects to this output.
    // Because it just loops through all inputs, connect them all.
    // On the other hand, DeleteBlock command require connections as it does not
    // have access to a simple flat inputs array. It has to replies on the connections
    // informatin to reconnect the other block's inputs with deleted outputs.
    if(detail) {
      pod.connections = this.getInputs().map(input => {
        return {
          id: input.id,
          nodeID: input.node.id,
          name: input.name,
        }
      })
    }
    return pod;
  }
}