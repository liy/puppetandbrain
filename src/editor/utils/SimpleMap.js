export default class
{
  constructor(data={}) {
    this.data = data;
  }

  [Symbol.iterator]() {
    let index = 0;
    let keys = this.keys();

    return {
      next: () => {
        if(index < this.keys.length) {
          let key = this.keys[index++];
          return {
            value: [key, this.values[key]],
            done: false
          }
        }

        return {done: true}
      }
    }
  }

  clear() {
    this.data = {};
  }
  
  delete(key) {
    delete this.data[key];
  }

  get(key) {
    return this.data[key];
  }

  has(key) {
    return key in this.data;
  }

  keys() {
    return Object.keys(this.data);
  }

  set(key, item) {
    this.data[key] = item;
    return this;
  }

  values() {
    return Object.keys(this.data).map(key => {
      return this.data[key];
    })
  }

  get size() {
    return Object.keys(this.data).length();
  }
}