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