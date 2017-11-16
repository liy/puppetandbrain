import VariableAccessor from './VariableAccessor'
import Pointer from './Pointer';

export default class Input
{
  constructor(owner) {
    this.owner = owner;
    this.pointers = Object.create(null);
    this.list = [];
  }

  add(name) {
    this.list.push(name);
    this.pointers[name] = new VariableAccessor(this.owner, name);
    return this;
  }

  get(name) {
    return this.pointers[name];
  }

  value(name) {
    return this.pointers[name].value
  }

  connect(name, outputNode, outputName) {
    this.pointers[name] = new Pointer(this.owner, name, outputNode, outputName);
  }

  pod() {
    let data = [];
    for(let name of this.list) {
      data.push({
        [name]: this.pointers[name].id
      })
    }
    return data;
  }
}