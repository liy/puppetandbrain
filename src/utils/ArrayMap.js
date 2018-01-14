export default class ArrayMap
{
  constructor(keys=[], values={}) {
    // this.values = Object.create(null);
    this.keys = keys;
    this.values = values;
  }

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if(index < this.keys.length) {
          return {
            value: this.values[this.keys[index++]],
            done: false
          }
        }

        return {done: true}
      }
    }
  }

  map(callback) {
    return this.keys.map(key => {
      return callback(key, this.values[key]);
    })
  }

  set(key, value) {
    if(this.keys.indexOf(key) == -1) {
      this.keys.push(key);
    }
    this.values[key] = value;
  }

  insert(key, value, index) {
    if(this.keys.indexOf(key) == -1) {
      this.keys.splice(index, 0, key);
    }
    this.values[key] = value;
  }

  remove(key) {
    let value = this.values[key];
    delete this.values[key];
    let index = this.keys.indexOf(key);
    if(index != -1) this.keys.splice(index, 1);
    return {
      value,
      index,
    };
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

  clear() {
    this.values = {};
    this.keys = [];
  }

  contains(key) {
    return key in this.values;
  }

  get length() {
    return this.keys.length;
  }
}