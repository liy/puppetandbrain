import ArrayMap from '@/utils/ArrayMap';
import Task from './Task';
import VariableList from '../data/VariableList';
import Variable from '../data/Variable';

export default class Brain
{
  constructor(owner, id) {
    this.owner = owner;
    this.lookUp = this.owner.lookUp;
    this.id = this.lookUp.addBrain(this, id)
    this.nodes = new ArrayMap();

    // stores Action
    this.actions = {};

    this.variables = new VariableList(this, this.lookUp);

    this.owner.stage.on('game.prestart', this.prestart, this);
  }

  destroy() {
    this.lookUp.removeBrain(this.id);
    let nodes = this.nodes.getValues().concat();
    for(let node of nodes) {
      node.destroy();
    }
    for(let variable of this.variables) {
      variable.destroy();
    }
    this.owner.stage.off('game.prestart', this.prestart, this);
  }

  prestart() {
    this.variables.updateRuntime();
    this.owner.properties.updateRuntime();
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
        if(pointer.isConnected) pointers.push(pointer); 
      }
    }
    return pointers;
  }

  getTasks() {
    return this.getNodes().filter(node => {
      return node instanceof Task;
    })
  }

  export(data={}) {
    // nodes
    for(let node of this.nodes) {
      node.export(data);
    }

    // variables
    for(let variable of this.variables) {
      variable.export(data);
    }
    
    return data;
  }

  pod(detail=false) {
    let pod = {
      className: this.__proto__.constructor.name,
      id: this.id,
      variables: this.variables.pod(detail),
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