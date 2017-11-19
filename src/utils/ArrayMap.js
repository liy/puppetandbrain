export default class ArrayMap
{
  constructor() {
    this.valueMap = Object.create(null);
    this.keyList = [];
  }

  set(key, value) {
    this.valueMap[key] = value;
    if(this.keyList.indexOf(key) == -1) {
      this.keyList.push(key);
    }
  }

  get(key) {
    return this.valueMap[key];
  }

  getAt(index) {
    return this.valueMap[this.keyList[index]];
  }

  indexOf(key) {
    return this.keyList.indexOf(key);
  }

  getKeys() {
    return this.keyList;
  }

  getValues() {
    return this.keyList.map(key => {
      return this.valueMap[key];
    })
  }
}