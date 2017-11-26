import ArrayMap from '../utils/ArrayMap';
import Pointer from '../data/Pointer';
import Task from './Task';

export default class Brain
{
  constructor(owner, id) {
    this.id = LookUp.addBrain(this, id)
    this.owner = owner;
    this.nodes = new ArrayMap();

    this.variables = Object.create(null);
    // FIXME: for testing purpose!!!
    this.variables['test'] = 'test!'

    Stage.off('game.prestart', this.setInitialState, this);
    Stage.off('game.stop', this.stop, this);
  }

  destroy() {
    LookUp.removeBrain(this.id);
    let nodes = this.nodes.getValues().concat();
    for(let node of nodes) {
      node.destroy();
    }
  }

  setInitialState() {
    // setup initial state
    this.initialState = {
      // deep clone...
      variables: JSON.parse(JSON.stringify(this.variables)),
    }
  }

  stop() {
    this.variables = this.initialState.variables;
  }

  createVariable(name, value) {
    this.variables[name] = value;
  }

  addNode(node) {
    this.nodes.set(node.id, node);
  }

  removeNode(id) {
    this.nodes.remove(id);
  }

  getNode(id) {
    return this.nodes.get(id);
  }

  getNodes() {
    return this.nodes.getValues();
  }

  getPointers() {
    let nodes = this.nodes.getValues();
    let pointers = [];
    for(let node of nodes) {
      for(let name of node.inputs.names) {
        let pointer = node.inputs.get(name);
        if(pointer.isOutputPointer) pointers.push(pointer); 
      }
    }
    return pointers;
  }

  getTasks() {
    return this.getNodes().filter(node => {
      return node instanceof Task;
    })
  }

  pod(detail=false) {
    let pod = {
      className: this.__proto__.constructor.name,
      id: this.id,
      variables: this.variables,
      // Note that the owner is not here.
      // This is because in brain is created in Actor,
      // does not need owner information.
      // Plus, in the future a Brain instance can be populated
      // with different brain pod.
    }

    if(detail) {
      pod.nodes = this.nodes.getValues().map(node => {
        return node.pod(detail)
      })
      pod.pointers = this.getPointers().map(pointer => {
        return pointer.pod();
      })
    }
    else {
      pod.nodes = this.nodes.getKeys().concat()
    }
    return pod;
  }
}