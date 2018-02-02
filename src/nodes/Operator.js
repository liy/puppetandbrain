import Node from "./Node";
import DataType from "../data/DataType";

const OperatorTemplate = {
  inputs: [{
    name: 'A',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }, {
    name: 'B',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  outputs: [{
    name: 'value',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  memory: {
    A: 0,
    B: 0,
  },
  elementClass: ['operator'],
  category: 'Math',
  keywords: ['operator']
}

export class Operator extends Node
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


NodeTemplate.Addition = {
  ...OperatorTemplate,
  className: 'Addition',
  name: 'Add',
  keywords: [...OperatorTemplate.keywords, '+', 'addition']
}
export class Addition extends Operator
{
  constructor(id) {
    super(id);
  }

  get value() {
    return Number(this.inputs.value('A')) + Number(this.inputs.value('B'));
  }
}

NodeTemplate.Multiply = {
  ...OperatorTemplate,
  className: 'Multiply',
  name: 'Multiply',
  keywords: [...OperatorTemplate.keywords, '*', 'multiply']
}
export class Multiply extends Operator
{
  constructor(id) {
    super(id);
  }

  get value() {
    return Number(this.inputs.value('A')) * Number(this.inputs.value('B'));
  }
}

NodeTemplate.Divide = {
  ...OperatorTemplate,
  className: 'Divide',
  name: 'Divide',
  keywords: [...OperatorTemplate.keywords, '/', 'division']
}
export class Divide extends Operator
{
  constructor(id) {
    super(id);
  }

  get value() {
    return Number(this.inputs.value('A')) / Number(this.inputs.value('B'));
  }
}


NodeTemplate.Equal = {
  ...OperatorTemplate,
  className: 'Equal',
  name: '=',
  keywords: [...OperatorTemplate.keywords, '=', 'equal']
}
export class Equal extends Operator
{
  constructor(id) {
    super(id);
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


NodeTemplate.LessThan = {
  ...OperatorTemplate,
  className: 'LessThan',
  name: '<',
  keywords: [...OperatorTemplate.keywords, '<', 'less than', 'less']
}
export class LessThan extends Operator
{
  constructor(id) {
    super(id);
  }

  get nodeName() {
    return "<"
  }

  get value() {
    return Number(this.inputs.value('A')) < Number(this.inputs.value('B'));
  }
}


NodeTemplate.LessEqual = {
  ...OperatorTemplate,
  className: 'LessEqual',
  name: '<=',
  keywords: [...OperatorTemplate.keywords, '<=', 'less equal']
}
export class LessEqual extends Operator
{
  constructor(id) {
    super(id);
  }

  get nodeName() {
    return "<="
  }

  get value() {
    return Number(this.inputs.value('A')) <= Number(this.inputs.value('B'));
  }
}


NodeTemplate.RandomNumber = {
  ...OperatorTemplate,
  className: 'RandomNumber',
  inputs: [],
  name: 'Random Number',
  keywords: [...OperatorTemplate.keywords, 'random']
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

NodeTemplate.RandomInteger = {
  ...OperatorTemplate,
  className: 'RandomInteger',
  name: 'Random Integer',
  inputs: [{
    name: 'min',
    descriptor: {
      type: DataType.INTEGER,
    }
  }, {
    name: 'max',
    descriptor: {
      type: DataType.INTEGER,
    }
  }],
  outputs: [{
    name: 'value',
    descriptor: {
      type: DataType.INTEGER
    }
  }],
  memory: {
    min: 0,
    max: 1
  },
  keywords: [...OperatorTemplate.keywords, 'random']
}
export class RandomInteger extends Operator
{
  constructor(id) {
    super(id);
  }

  get nodeName() {
    return "Random Integer"
  }

  get value() {
    let min = parseInt(this.inputs.value('min'));
    let max = parseInt(this.inputs.value('max'));
    return  Math.floor(min + Math.random()*(max-min + 1));
  }
}