import DataList from "../DataList";


class Operation
{
  constructor(id) {
    this.id = LookUp.addArithmetic(this, id)

    this.variables = Object.create(null);

    this.inputs = new DataList(this);
  }

  pod() {
    return {
      class: this.__proto__.constructor.name,
      id: this.id,
      inputs: this.inputs.pod()
    }
  }
}

export class Add extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');
  }

  get value() {
    return this.inputs.value('A') + this.inputs.value('B');
  }
}

export class Multiply extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');
  }

  get value() {
    return this.inputs.value('A') * this.inputs.value('B');
  }
}

export class Divide extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');
  }

  get value() {
    return this.inputs.value('A') / this.inputs.value('B');
  }
}

export class Equal extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');
  }

  get value() {
    return this.inputs.value('A') === this.inputs.value('B');
  }
}

export class LessThan extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');
  }

  get value() {
    return this.inputs.value('A') < this.inputs.value('B');
  }
}

export class LessEqual extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');
  }

  get value() {
    return this.inputs.value('A') <= this.inputs.value('B');
  }
}

export class RandomNumber extends Operation
{
  constructor(id) {
    super(id);
  }

  get value() {
    return Math.random();
  }
}