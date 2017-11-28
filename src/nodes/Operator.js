import DataNode from "./DataNode";

// FIXME: find a better way to handle type parsing!!
export class Operator extends DataNode
{
  constructor(id) {
    super(id);

    this.outputs.addOutput('value')
    this.outputs.assignProperty('value', {
      get: () => {
        return this.value;
      }
    });
  }
}

export class Addition extends Operator
{
  constructor(id) {
    super(id);

    this.inputs.addInput('A');
    this.inputs.addInput('B');
  }

  get value() {
    return Number(this.inputs.value('A')) + Number(this.inputs.value('B'));
  }
}

export class Multiply extends Operator
{
  constructor(id) {
    super(id);
    
    this.inputs.addInput('A');
    this.inputs.addInput('B');
  }

  get value() {
    return Number(this.inputs.value('A')) * Number(this.inputs.value('B'));
  }
}

export class Divide extends Operator
{
  constructor(id) {
    super(id);
    
    this.inputs.addInput('A');
    this.inputs.addInput('B');
  }

  get value() {
    return Number(this.inputs.value('A')) / Number(this.inputs.value('B'));
  }
}

export class Equal extends Operator
{
  constructor(id) {
    super(id);
    
    this.inputs.addInput('A');
    this.inputs.addInput('B');
  }

  get nodeName() {
    return "="
  }

  get value() {
    // I use == so it auto convert string to number if it is possible.
    // e.g., 1 == "1" will return true.
    return this.inputs.value('A') == this.inputs.value('B');
  }
}

export class LessThan extends Operator
{
  constructor(id) {
    super(id);
    
    this.inputs.addInput('A');
    this.inputs.addInput('B');
  }

  get nodeName() {
    return "<"
  }

  get value() {
    return Number(this.inputs.value('A')) < Number(this.inputs.value('B'));
  }
}

export class LessEqual extends Operator
{
  constructor(id) {
    super(id);
    
    this.inputs.addInput('A');
    this.inputs.addInput('B');
  }

  get nodeName() {
    return "<="
  }

  get value() {
    return Number(this.inputs.value('A')) <= Number(this.inputs.value('B'));
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