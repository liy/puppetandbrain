import EventEmitter from '../utils/EventEmitter';

// input
export default class Input extends EventEmitter
{
  /**
   * Creates an instance of Input, points to its owner node's
   * memory, or another node's output. 
   * @param {any} node Owner of the input
   * @param {any} name name of the input
   * @param {any} type type of the input
   * @memberof Input
   */
  constructor(node, name, type) {
    super();

    // assigned in the connect method
    this.id = null;

    this.type = type;
    this.node = node;
    this.name = name;
    // connected to nothing by default
    this.output = null;
    // by default it uses local node memory
    this.target = this.node.memory;    this.targetName = this.name;
  }

  set(pod) {
    // if the input has an ID, it must be connected to an output, so connect to the output
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

    // Only connected input has id
    this.id = LookUp.addPointer(this, id);
    this.output = output;
    this.output.connect(this);

    // Make input points to the output data and name
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

      this.target = this.node.memory;
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
    // only need to export connected input
    if(this.id) {
      data.inputs = data.inputs || [];
      data.inputs.push(this.id);

      data.store = data.store || {};
      data.store[this.id] = this.pod()
    }
    
    return data;
  }

  pod() {
    return {
      className: this.__proto__.constructor.name,
      // owner of the input
      nodeID: this.node.id,
      name: this.name,
      // if id is null, it means this input uses node's memory
      id: this.id,
      output: this.output ? this.output.pod() : null,
      type: this.type,
    }
  }
}