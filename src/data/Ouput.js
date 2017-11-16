export default class Output
{
  constructor() {
    this._names = [];
  }

  add(name, value) {
    if(this._names.indexOf(name) == -1) {
      this._names.push(name);
    }
    this[name] = value;
  }

  pod() {
    let data = [];
    for(let name of this._names) {
      data.push({
        [name]: this[name]
      })
    }
    return data;
  }
}