export class Data
{
  constructor(value=null, id=null) {
    this.id = LookUp.addData(this, id);
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
  constructor(name, owner, data) {
    this.data = data || new Data();
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

  pod() {
    return {
      name: this.name,
      data: this.data.id,
    }
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
  constructor(name, owner, data) {
    super(name, owner, data)
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
  constructor(task, type="input") {
    this.task = task;
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

  pod() {
    let slots = [];
    for(let slot of this.slots) {
      slots.push(slot.pod())
    }
    return {
      type: this.type,
      task: this.task.id,
      slots
    }
  }
}