export const DataType = {
  TEXT: 'text',
  NUMBER: 'number',
  Boolean: 'boolean'
}

var ID = 0;

class Data
{
  constructor(type=DataType.TEXT, value=null, id=null) {
    this.id = DataLookUp.create(this, id);
    this.type = type;
    this.value = value;
  }
}

export class DataCollection
{
  constructor() {
    this.arr = [];
    this.map = Object.create(null)
    this.ID = 0;
  }

  create() {
    let name = data+''+this.ID;
    this.map[name] = new Data(type);
  }

  rename(name, newName) {
    let data = this.map[name];
    delete this.map[name]
    this.map[newName] = data;
  }

  remove(data) {
    let index = this.arr.indexOf(data);
    this.arr.splice(index, 1);
    delete this[data.name];
  }

  forEach(callback) {
    for(let data of this.arr) {
      callback(data)
    }
  }
}