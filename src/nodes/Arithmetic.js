import DataNode from "./DataNode";

export class ArithmeticNode extends DataNode
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('value', {
      get: () => {
        return this.value;
      }
    });
  }
}

export class Add extends ArithmeticNode
{
  constructor(id) {
    super(id);

    this.inputs.addName('A');
    this.inputs.addName('B');
  }

  get value() {
    return this.inputs.value('A') + this.inputs.value('B');
  }
}

export class Multiply extends ArithmeticNode
{
  constructor(id) {
    super(id);

    this.inputs.addName('A');
    this.inputs.addName('B');
  }

  get value() {
    let v = this.inputs.value('A') * this.inputs.value('B');
    console.warn(v)
    return v;
  }
}

export class Divide extends ArithmeticNode
{
  constructor(id) {
    super(id);

    this.inputs.addName('A');
    this.inputs.addName('B');
  }

  get value() {
    return this.inputs.value('A') / this.inputs.value('B');
  }
}

export class Equal extends ArithmeticNode
{
  constructor(id) {
    super(id);

    this.inputs.addName('A');
    this.inputs.addName('B');
  }

  get nodeName() {
    return "="
  }

  get value() {
    return this.inputs.value('A') === this.inputs.value('B');
  }
}

export class LessThan extends ArithmeticNode
{
  constructor(id) {
    super(id);

    this.inputs.addName('A');
    this.inputs.addName('B');
  }

  get nodeName() {
    return "<"
  }

  get value() {
    return this.inputs.value('A') < this.inputs.value('B');
  }
}

export class LessEqual extends ArithmeticNode
{
  constructor(id) {
    super(id);

    this.inputs.addName('A');
    this.inputs.addName('B');
  }

  get nodeName() {
    return "<="
  }

  get value() {
    return this.inputs.value('A') <= this.inputs.value('B');
  }
}

export class RandomNumber extends ArithmeticNode
{
  constructor(id) {
    super(id);
  }

  get nodeName() {
    return "Random Number"
  }

  get value() {
    return Math.random();
  }
}