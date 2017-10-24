import Data from './Data';

export default class DataCollection
{
  constructor() {
    this.arr = [];
  }

  create(type) {
    this[]
  }

  add(data) {
    this.arr.push(data);
    this[data.name] = data;
  }

  remove(data) {
    let index = this.arr.indexOf(data);
    this.arr.splice(index, 1);
    delete this[data.name];
  }
}