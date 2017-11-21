import ArrayMap from "../utils/ArrayMap";

export default class Output
{
  constructor(node) {
    this.node = node;
    this.data = Object.create(null);
    // keep track of what type of the data is, property or value
    // value type will be reset to undefined when game stop
    this.types = Object.create(null);

    // Just keep track of which node is connected to the output
    // {
    //    [output name]: pointer arrayMap {
    //      id: pointer.id,
    //      pointer: pointer
    //    }
    // }
    this.connections = new ArrayMap();
  }

  destroy() {
    this.connections = null;
  }

  addName(name) {
    this.connections.set(name, new ArrayMap());
  }

  assignProperty(name, descriptor) {
    this.types[name] = 'property';
    this.addName(name)
    Object.defineProperty(this.data, name, descriptor);
  }

  assignValue(name, value) {
    this.types[name] = 'value';
    this.addName(name)
    this.data[name] = value;
  }

  connected(pointer) {
    let pointers = this.connections.get(pointer.outputName);
    pointers.set(pointer.id, pointer);
  }

  disconnected(pointer) {
    this.connections.get(pointer.outputName).remove(pointer.id);
  }

  get names() {
    return this.connections.getKeys();
  }

  clearValues() {
    // reset value to be undefined
    let names = Object.keys(this.types);
    for(let name of names) {
      if(this.types[name] == 'value')
        this.data[name] = undefined;
    }
  }

  /**
   * Output is calucated dynamically at the runtime,
   * so no need to serailzie the value. Just the names will do
   */
  pod() {
    return this.connections.getKeys().concat();
  }
}