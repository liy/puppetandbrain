import EventEmitter from '../utils/EventEmitter';

// input
export default class Pointer extends EventEmitter
{
  constructor(inputNode, inputName) {
    super();

    this.inputNode = inputNode;
    this.inputName = inputName;
    // by default it is a local variable pointer
    this.output = null;
    this.id = null;
    this.target = this.inputNode.variables;
    this.targetName = this.inputName;
  }

  set(pod) {
    // output pointer, connect to the output
    if(pod.id) {
      // find the output
      let output = LookUp.get(pod.output.node).outputs.get(pod.output.name);
      this.connect(output, pod.id);
    }
  }

  get isOutputPointer() {
    return this.output != null;
  }

  get isConnected() {
    return this.output != null;
  }

  connect(output, id) {
    // remove old output related connection
    let oldOutput = this.disconnect();

    // Only output pointer will have id
    this.id = LookUp.addPointer(this, id);
    this.output = output;
    this.output.connect(this);

    // Make pointer points to the output data and name
    this.target = this.output.data;
    this.targetName = this.output.name;

    this.emit('input.connected', this);

    return oldOutput
  }

  disconnect() {
    let oldOutput = this.output;
    if(this.output) {
      this.output.disconnect(this);
      LookUp.removePointer(this.id);
      this.id = null;
      this.output = null;

      this.target = this.inputNode.variables;
      this.targetName = this.inputName;

      this.emit('input.disconnected', this);
    }
    return oldOutput;
  }
  
  destroy() {
    this.disconnect();
  }

  get value() {
    return this.target[this.targetName];
  }

  pod() {
    return {
      className: this.__proto__.constructor.name,
      inputNode: this.inputNode.id,
      inputName: this.inputName,
      // only record the information below if pointer points to another node
      // undefined field will be removed when serailized
      id: this.id,
      output: this.output ? this.output.pod() : null
    }
  }
}