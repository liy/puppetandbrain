import ArrayMap from "../utils/ArrayMap";

export default class Output
{
  constructor(node) {
    this.node = node;
    this.data = Object.create(null);

    // Just keep track of which node is connected to the output
    // not sure whether it is usefull or not.
    this.pointers = new ArrayMap();
  }

  destroy() {
    this.pointers = null;
  }

  addName(name) {
    this.pointers.set(name);
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
    this.pointers.set(pointer.outputName, pointer)
  }

  disconnected(outputName) {
    this.pointers.remove(outputName);
  }

  get names() {
    return this.pointers.getKeys();
  }

  /**
   * Output is calucated dynamically at the runtime,
   * so no need to serailzie the value. Just the names will do
   */
  pod() {
    return this.pointers.getKeys().concat();
  }
}