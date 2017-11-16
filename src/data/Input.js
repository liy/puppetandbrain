import Variable from './Variable'
import Pointer from './Pointer';

export default class Input
{
  constructor(node) {
    this.node = node;
    this.map = Object.create(null);
    this.list = [];
  }

  destroy() {
    for(let name of this.list) {
      this.map[name].destroy();
    }
  }

  add(name) {
    if(this.list.indexOf(name) == -1) {
      this.list.push(name);
      this.map[name] = new Variable(this.node, name);
    }
    return this;
  }

  get(name) {
    return this.map[name];
  }

  value(name) {
    return this.map[name].value
  }

  connect(name, outputNode, outputName) {
    this.map[name].destroy();
    this.map[name] = new Pointer(this.node, name, outputNode, outputName);
  }

  disconnect(name) {
    // even the element is a variable, it does not matter. 
    // A new one will be created
    this.map[name].destroy();
    this.map[name] = new Variable(this.node, name);
  }

  pod() {
    let data = [];
    for(let name of this.list) {
      data.push({
        name,
        id: this.map[name].id
      })
    }
    return data;
  }
}