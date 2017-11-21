import ArrayMap from "../utils/ArrayMap";

export default class Output
{
  constructor(node) {
    this.node = node;
    this.data = Object.create(null);

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
    this.addName(name)
    Object.defineProperty(this.data, name, descriptor);
  }

  assignValue(name, value) {
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

  /**
   * Output is calucated dynamically at the runtime,
   * so no need to serailzie the value. Just the names will do
   */
  pod() {
    return this.connections.getKeys().concat();
  }
}