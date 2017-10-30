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
  constructor(name, owner) {
    this.data = new Data();
    this.owner = owner;
    this._name = name
  }

  set name(name) {
    if(this.owner.canRename(this, name)) {
      this._name = name;
      return true;
    }
    return false;
  }

  get name() {
    return this._name;
  }

  get value() {
    return this.data.value;
  }

  set value(value) {
    this.data.value = value;
  }
}

export class Input extends Slot
{
  constructor(name, owner) {
    super(name, owner)
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
  constructor(name, owner) {
    super(name, owner)
  }

  link(input) {
    if(input instanceof Input) {
      this.to(input);
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
    this.map = Object.create(null);

    this.counter = 0;
  }

  create(name) {
    name = name || this.type + (++this.counter);
    let slot = (this.type == 'input') ? new Input(name, this) : new Output(name, this);
    this.map[name] = slot;
    this.slots.push(slot)

    return slot;
  }

  canRename(slot, name) {
    for(let i=0; i<this.slots.length; ++i) {
      if(this.slots[i] == slot) continue;
      if(this.slots[i].name == name) return false;
    }
    return true;
  }

  remove(name) {
    let index = this.slots.findIndex(slot => {
      return slot.name == name;
    })
    return this.slots.splice(index, 1);
  }

  slot(name) {
    return this.map[name]
  }

  data(name) {
    return this.map[name] ? this.map[name].data : null;
  }

  value(name) {
    return this.map[name] ? this.map[name].data.value : null;
  }
}