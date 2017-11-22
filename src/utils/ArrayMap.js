export default class ArrayMap
{
  constructor() {
    this.values = Object.create(null);
    this.keys = [];
  }

  set(key, value) {
    if(this.keys.indexOf(key) == -1) {
      this.keys.push(key);
    }
    this.values[key] = value;
  }

  remove(key) {
    delete this.values[key];
    let index = this.keys.indexOf(key);
    if(index != -1) this.keys.splice(index, 1);
  }

  get(key) {
    return this.values[key];
  }

  getAt(index) {
    return this.values[this.keys[index]];
  }

  indexOf(key) {
    return this.keys.indexOf(key);
  }

  getKeys() {
    return this.keys;
  }

  getValues() {
    return this.keys.map(key => {
      return this.values[key];
    })
  }

  contains(key) {
    return key in this;
  }

  get length() {
    return this.keys.length;
  }
}