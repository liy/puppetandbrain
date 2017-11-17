import DataNode from "./DataNode";

class ArithmeticNode extends DataNode
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

    this.inputs.add('A');
    this.inputs.add('B');
  }

  get value() {
    return this.inputs.value('A') + this.inputs.value('B');
  }
}

export class Multiply extends ArithmeticNode
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

export class Divide extends ArithmeticNode
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

export class Equal extends ArithmeticNode
{
  constructor(id) {
    super(id);
    
    this.nodeName = "="

    this.inputs.add('A');
    this.inputs.add('B');
  }

  get value() {
    return this.inputs.value('A') === this.inputs.value('B');
  }
}

export class LessThan extends ArithmeticNode
{
  constructor(id) {
    super(id);

    this.nodeName = "<"

    this.inputs.add('A');
    this.inputs.add('B');
  }

  get value() {
    return this.inputs.value('A') < this.inputs.value('B');
  }
}

export class LessEqual extends ArithmeticNode
{
  constructor(id) {
    super(id);

    this.nodeName = "<="

    this.inputs.add('A');
    this.inputs.add('B');
  }

  get value() {
    return this.inputs.value('A') <= this.inputs.value('B');
  }
}

export class RandomNumber extends ArithmeticNode
{
  constructor(id) {
    super(id);

    this.nodeName = "Random Number"
  }

  get value() {
    return Math.random();
  }
}