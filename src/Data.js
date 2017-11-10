export class Accessor
{
  constructor(name, target) {
    this.name = name;
    this.target = target;
  }

  get value() {
    return this.target.variables[this.name];
  }

  set value(v) {
    this.target.variables[this.name] = v;
  }

  pod() {
    return {
      class: 'Accessor',
      ref: this.target.id,
      name: this.name,
    }
  }
}

export class AccessorList
{
  constructor() {
    this.map = Object.create(null)
    this.list = [];
  }

  add(name, accessor) {
    this.map[name] = accessor;
    this.list.push(name);
    return this;
  }

  set(name, accessor) {
    this.map[name] = accessor;
  }

  get(name) {
    return this.map[name];
  }

  value(name) {
    return this.map[name].value
  }

  pod() {
    let accessors = [];
    for(let name of this.list) {
      accessors.push({
        name: this.map[name].pod()
      })
    }
    return accessors;
  }
}