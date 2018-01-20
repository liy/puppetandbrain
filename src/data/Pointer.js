import EventEmitter from '../utils/EventEmitter';

// input
export default class Pointer extends EventEmitter
{
  constructor(inputNode, name, type) {
    super();

    // assigned in the connect method
    this.id = null;

    this.type = type;
    this.inputNode = inputNode;
    this.name = name;
    // connected to nothing by default
    this.output = null;
    // by default it is a local node memory pointer
    this.target = this.inputNode.memory;
    this.targetName = this.name;
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

      this.target = this.inputNode.memory;
      this.targetName = this.name;

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

  export(data={}) {
    // only need to export output pointer
    if(this.id) {
      data.pointers = data.pointers || [];
      data.pointers.push(this.id);

      data.store = data.store || {};
      data.store[this.id] = this.pod()
    }
    
    return data;
  }

  pod() {
    return {
      className: this.__proto__.constructor.name,
      inputNode: this.inputNode.id,
      name: this.name,
      // only record the information below if pointer points to another node
      // undefined field will be removed when serailized
      id: this.id,
      output: this.output ? this.output.pod() : null,
      type: this.type,
    }
  }
}