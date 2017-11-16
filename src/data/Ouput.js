export default class Output
{
  constructor(node) {
    this.node = node;
    this.names = [];
    this.pointers = [];
    this.data = Object.create(null);
  }

  destroy() {
    this.disconnet();
  }

  /**
   * Delegate real connection job to input and pointer constructor.
   * 
   * @param {String} name Output name
   * @param {Node} inputNode The node owns the input
   * @param {String} inputName input name
   */
  connect(name, inputNode, inputName) {
    inputNode.inputs.connect(inputName, this, name);
  }

  /**
   * Delegate real disconnection job to input and pointer constructor.
   * @param {*} name 
   */
  disconnect(name) {
    for(let pointer of this.pointers) {
      pointer.inputNode.inputs.disconnect(pointer.inputName);
    }
  }

  /**
   * Called from Pointer constructor
   * @param {Pointer} pointer 
   */
  connected(pointer) {
    this.pointers.push(pointer)
  }

  /**
   * Called from pointer destroy function
   * @param {String} name The output name
   */
  disconnected(name) {
    this.pointers.push(pointer)
  }

  add(name, value) {
    if(this.names.indexOf(name) == -1) {
      this.names.push(name);
    }
    this.data[name] = value;
  }

  /**
   * Ouput is calucated dynamically at the runtime,
   * so no need to serailzie the value. Just the names will do
   */
  pod() {
    return this.names.concat();
  }
}