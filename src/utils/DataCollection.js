export const DataType = {
  TEXT: 'text',
  NUMBER: 'number',
  BOOL: 'boolean',
  REFERENCE: 'reference',
  ARRAY: 'array'
}

export class Data
{
  constructor(type=DataType.TEXT, value=null, id=null) {
    this.id = DataLookUp.create(this, id);
    this.type = type;
    this.value = value;
  }

  pod() {
    return {
      id: this.id,
      type: this.type,
      value: this.value
    }
  }
}

export class DataCollection
{
  constructor() {
    this.ids = [];
    this.map = Object.create(null)
    this.counter = 0;
  }

  create(type=DataType.TEXT) {
    let data = new Data(type);
    this.map['data ' + (++this.counter)] = data.id;
    this.ids.push(data.id);
    return data;
  }

  add(name, data) {
    this.map[name] = data.id;
    this.ids.push(data.id);
    return data;
  }

  rename(name, newName) {
    if(this.map[newName]) return false;

    let data = this.map[name];
    delete this.map[name]
    this.map[newName] = data;

    return true;
  }

  remove(data) {
    let index = this.ids.indexOf(data.id);
    this.ids.splice(index, 1);
    for(let name in this.map) {
      if(data.id === this.map[name].id) {
        delete this.map[name]
      }
    }
  }

  forEach(callback) {
    for(let id of this.ids) {
      callback(id)
    }
  }

  // link(sourceName, targetData) {
  //   let sourceData = this.map[sourceName];
  //   let index = this.ids.indexOf(sourceData.id);
  //   this.ids[index] = targetData.id

  //   this.map[sourceName].deref();
  //   this.map[sourceName] = targetData.id;
  //   targetData.ref();
  // }

  reference(sourceName, targetData) {
    let sourceID = this.map[sourceName];
    let index = this.ids.indexOf(sourceID);

    this.ids[index] = targetData.id
    this.map[sourceName] = targetData.id
  }

  /**
   * The data returned could be removed from the LookUp table
   * 
   * @param {any} name 
   * @returns 
   * @memberof DataCollection
   */
  get(name) {
    return DataLookUp.get(this.map[name]).value
  }

  set(name, value) {
    DataLookUp.get(this.map[name]).value = value;
    return this;
  }

  getData(name) {
    return DataLookUp.get(this.map[name]);
  }

  pod() {
    return this.ids.concat();
  }
}