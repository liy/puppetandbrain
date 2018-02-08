import Node from "./Node";
import DataType from "../data/DataType";

const ArithmeticTemplate = {
  blockClassName: 'ArithmeticBlock',
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
  // operationNames: {
  //   '+ add': 'Addition',
  //   '- substract': 'Substract',
  //   '× multiply': 'Multiply',
  //   '÷ divide': 'Divide',
  //   '^ power': 'Power',
  // },
  operationNames: {
    '+ add': 'Addition',
    '- substract': 'Substract',
    '× multiply': 'Multiply',
    '÷ divide': 'Divide',
    '^ power': 'Power',
  },
  elementClass: ['arithmetic'],
  category: 'Math',
  keywords: ['arithmetic']
}

export class Arithmetic extends Node
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
  ...ArithmeticTemplate,
  className: 'Addition',
  name: '+ Add',
  keywords: [...ArithmeticTemplate.keywords, '+', 'addition']
}
export class Addition extends Arithmetic
{
  constructor(id) {
    super(id);
  }

  get value() {
    return Number(this.inputs.value('A')) + Number(this.inputs.value('B'));
  }
}

NodeTemplate.Substract = {
  ...ArithmeticTemplate,
  className: 'Substract',
  name: '- Substract',
  keywords: [...ArithmeticTemplate.keywords, '-', 'substract', 'minus']
}
export class Substract extends Arithmetic
{
  constructor(id) {
    super(id);
  }

  get value() {
    return Number(this.inputs.value('A')) - Number(this.inputs.value('B'));
  }
}

NodeTemplate.Multiply = {
  ...ArithmeticTemplate,
  className: 'Multiply',
  name: '× Multiply',
  keywords: [...ArithmeticTemplate.keywords, '*', 'multiply']
}
export class Multiply extends Arithmetic
{
  constructor(id) {
    super(id);
  }

  get value() {
    return Number(this.inputs.value('A')) * Number(this.inputs.value('B'));
  }
}

NodeTemplate.Divide = {
  ...ArithmeticTemplate,
  className: 'Divide',
  name: '÷ Divide',
  keywords: [...ArithmeticTemplate.keywords, '/', 'division']
}
export class Divide extends Arithmetic
{
  constructor(id) {
    super(id);
  }

  get value() {
    return Number(this.inputs.value('A')) / Number(this.inputs.value('B'));
  }
}

NodeTemplate.Power = {
  ...ArithmeticTemplate,
  className: 'Power',
  name: '^ Power',
  keywords: [...ArithmeticTemplate.keywords, '^', 'Power']
}
export class Power extends Arithmetic
{
  constructor(id) {
    super(id);
  }

  get value() {
    return Math.pow(Number(this.inputs.value('A')), Number(this.inputs.value('B')));
  }
}