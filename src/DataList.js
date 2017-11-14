import VariableGetter from './getters/VariableGetter'

export default class DataList
{
  constructor(owner) {
    this.owner = owner;
    this.getters = Object.create(null);
    this.list = [];
  }

  add(name) {
    this.list.push(name);
    this.getters[name] = new VariableGetter(this.owner, name);
    return this;
  }

  get(name) {
    return this.getters[name];
  }

  value(name) {
    return this.getters[name].value
  }

  connect(name, getter) {
    this.getters[name] = getter;
  }

  pod() {
    let data = [];
    for(let name of this.list) {
      data.push({
        [name]: this.getters[name].id
      })
    }
    return data;
  }
}