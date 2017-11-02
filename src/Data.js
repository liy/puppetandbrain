export class ActorPropertyGetter
{
  constructor(actor, propertyName) {
    this.actor = actor;
    this.propertyName = propertyName;
  }

  get value() {
    return this.actor.properties[this.propertyName]
  }

  pod() {
    return {
      class: 'ActorPropertyGetter',
      actor: this.actor.id,
      propertyName: this.propertyName
    }
  }
}

export class TaskOutputGetter
{
  constructor(task, propertyName) {
    this.task = task;
    this.propertyName = propertyName
  }

  get value() {
    return this.task.outputs.value(this.propertyName);
  }

  pod() {
    return {
      class: 'TaskOutputGetter',
      task: this.task.id,
      propertyName: this.propertyName
    }
  }
}

export class InputList
{
  constructor() {
    this.map = Object.create(null)
    this.list = [];
  }

  create(name) {
    if(this.list.indexOf(name) == -1)
      this.list.push(name);
    return this;
  }

  set(name, getter) {
    this.map[name] = getter;
    return this;
  }

  value(name) {
    return this.map[name].value;
  }

}

export class OutputList
{
  constructor() {
    this.map = Object.create(null)
    this.list = [];
  }

  create(name, value) {
    this.map[name] = value;
    this.list.push(name);
    return this
  }

  value(name) {
    return this.map[name];
  }
}