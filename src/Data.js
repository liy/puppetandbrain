export class Accessor
{
  constructor(ref, propertyName, id=null) {
    this.id = LookUp.addAccessor(this, id);
    this.ref = ref;
    this.propertyName = propertyName;
  }

  get value() {
    return ref[propertyName];
  }

  set value(v) {
    ref[propertyName] = v;
  }

  pod() {
    return {
      id: this.id,
      ref: this.ref.id,
      propertyName: this.propertyName
    }
  }
}

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
  constructor(name, owner, data) {
    super(name, owner, data)
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

class SlotList
{
  constructor() {
    this.slots = [];
    this.map = Object.create(null);

    this.counter = 0;
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
    return slots
  }
}

export class InputList extends SlotList
{
  constructor() {
    super()
  }

  create(name, value) {
    return this.add(name, new Data(value))
  }

  add(name, data) {
    let slot = new Input(name, this, data);
    this.map[name] = slot;
    this.slots.push(slot)

    return slot;
  }
}

export class OutputList extends SlotList
{
  constructor() {
    super()
  }

  create(name, value) {
    return this.add(name, new Data(value))
  }

  add(name, data) {
    let slot = new Output(name, this, data);
    this.map[name] = slot;
    this.slots.push(slot)

    return slot;
  }
}