import DataNode from "./DataNode";

export class Add extends DataNode
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');

    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') + this.inputs.value('B');
  }
}

export class Multiply extends DataNode
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');

    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') * this.inputs.value('B');
  }
}

export class Divide extends DataNode
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');
    
    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') / this.inputs.value('B');
  }
}

export class Equal extends DataNode
{
  constructor(id) {
    super(id);
    
    this.nodeName = "="

    this.inputs.add('A');
    this.inputs.add('B');

    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') === this.inputs.value('B');
  }
}

export class LessThan extends DataNode
{
  constructor(id) {
    super(id);

    this.nodeName = "<"

    this.inputs.add('A');
    this.inputs.add('B');

    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') < this.inputs.value('B');
  }
}

export class LessEqual extends DataNode
{
  constructor(id) {
    super(id);

    this.nodeName = "<="

    this.inputs.add('A');
    this.inputs.add('B');
    
    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') <= this.inputs.value('B');
  }
}

export class RandomNumber extends DataNode
{
  constructor(id) {
    super(id);

    this.nodeName = "Random Number"

    this.outputs.add('value', this.value);
  }

  get value() {
    return Math.random();
  }
}