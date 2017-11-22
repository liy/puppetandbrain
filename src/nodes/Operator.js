import DataNode from "./DataNode";

export class Operator extends DataNode
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

export class Add extends Operator
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

export class Multiply extends Operator
{
  constructor(id) {
    super(id);

    this.inputs.addName('A');
    this.inputs.addName('B');
  }

  get value() {
    let v = this.inputs.value('A') * this.inputs.value('B');
    return v;
  }
}

export class Divide extends Operator
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

export class Equal extends Operator
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

export class LessThan extends Operator
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

export class LessEqual extends Operator
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

export class RandomNumber extends Operator
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