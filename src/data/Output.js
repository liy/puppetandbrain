import ArrayMap from "../utils/ArrayMap";
import EventEmitter from "../utils/EventEmitter";
import DataType from "./DataType";

export default class Output extends EventEmitter
{
  constructor(node, data, name, outputDescriptor) {
    super();

    if(!outputDescriptor) {
      throw new Error('output descriptor not set')
    }

    this.descriptor = outputDescriptor;
    this.node = node;
    this.data = data;
    this.name = name;
    this.isValue = true;

    this.links = {};
  }

  assignProperty(name, propertyDescriptor) {
    this.isValue = false;
    Object.defineProperty(this.data, name, propertyDescriptor);
  }

  assignValue(name, value) {
    this.isValue = true;    
    this.data[name] = value;
  }

  connect(input) {
    this.links[input.id] = input;
    this.emit('output.connected', this)
  }

  disconnect(input) {
    delete this.links[input.id];
    this.emit('output.disconnected', this)
  }

  contains(id) {
    return id in this.links;
  }

  get isConnected() {
    return Object.keys(this.links).length != 0;
  }

  getPointer(id) {
    return this.links[id];
  }

  getPointers() {
    return Object.keys(this.links).map(id => {
      return this.links[id];
    })
  }

  pod(detail) {
    let pod = {
      nodeID: this.node.id,
      name: this.name,
      isValue: this.isValue,
      descriptor: this.descriptor,
    }

    // TODO: make links into valid pointer pod?
    //
    // ActivityLoader does not require information who connects to this output.
    // Because it just loops through all inputs, connect them all.
    // On the other hand,  command require links as it does not
    // have access to a simple flat inputs array. It has to replies on the links
    // informatin to reconnect the other block's inputs with deleted outputs.
    if(detail) {
      pod.links = this.getPointers().map(pointer => {
        return {
          id: pointer.id,
          nodeID: pointer.node.id,
          name: pointer.name,
        }
      })
    }
    return pod;
  }
}