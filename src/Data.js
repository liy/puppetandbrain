export class Data
{
  constructor(value, id) {
    this.id = LookUp.addData(this, id);
    this.value = value;
  }

  pod() {
    return {
      class: 'Data',
      id: this.id,
      value: this.value
    }
  }
}

/**
 * For accessing object properties, e.g., actor's position etc. This is something must not be returned
 * 
 * User should be able to drag a getter block and link to any inputs
 */
export class Getter
{
  constructor(name, target) {
    this.id = LookUp.addGetter(this, id);
    this.name = name;
    this.target = target;
  }

  get value() {
    return this.target[this.name];
  }

  set value(v) {
    this.target[this.name] = v;
  }

  pod() {
    return {
      class: 'Accessor',
      ref: this.target.id,
      name: this.name,
    }
  }
}

export class DataList
{
  constructor() {
    this.map = Object.create(null)
    this.list = [];
  }

  add(name, entry) {
    this.map[name] = entry;
    this.list.push(name);
    return this;
  }

  get(name) {
    return this.map[name];
  }

  set(name, entry) {
    this.map[name] = entry;
  }

  value(name) {
    return this.map[name].value
  }

  update(name, v) {
    this.map[name].value = v;
  }

  pod() {
    let data = [];
    for(let name of this.list) {
      data.push({
        [name]: this.map[name].id
      })
    }
    return data;
  }
}







