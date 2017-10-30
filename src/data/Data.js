export class Data
{
  constructor(value=null, id=null) {
    this.id = DataLookUp.create(this, id);
    this.value = value;
  }

  pod() {
    return {
      id: this.id,
      value: this.value
    }
  }
}

class Slot
{
  constructor(name) {
    this.data = null;
    this.name = name
    this.owner = null;
  }

  init(owner) {
    this.owner = owner;
  }

  set name(name) {
    if(this.owner.canRename(this, name)) {
      this.name = name;
      return true;
    }
    return false;
  }
}

export class Input extends Slot
{
  constructor() {
    super()
  }

  link(output) {
    if(output instanceof Output) {
      this.from(output);
    }
  }

  from(output) {
    this.data = output.data
  }
}

export class Output extends Slot
{
  constructor() {
    super()
  }

  link(input) {
    if(input instanceof Input) {
      this.from(input);
    }
  }

  to(input) {
    input.data = this.data; 
  }
}

export class DataArray
{
  constructor(type="input") {
    this.type = type;
    this.slots = [];

    this.counter = 0;
  }

  canRename(slot, name) {
    for(let i=0; i<this.slots.length; ++i) {
      if(this.slots[i] == slot) continue;
      if(this.slots[i].name == name) return false;
    }
    return true;
  }

  create(name) {
    name = name || this.type + (++this.counter);
    return (this.type == 'input') ? new Input(name) : new Output(name); 
  }

  find(name) {
    return this.slots.find(slot => {
      return slot.name == name;
    })
  }

  remove(name) {
    let index = this.slots.findIndex(slot => {
      return slot.name == name;
    })
    return this.slots.splice(index, 1);
  }
}