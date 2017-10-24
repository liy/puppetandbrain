export const DataType = {
  TEXT: 'text',
  NUMBER: 'number',
  Boolean: 'boolean'
}

export class Data
{
  constructor(type=DataType.TEXT, value=null) {
    this.id = 
    this.type = type;
    this.value = value;
    this.name = 'name';
  }
}