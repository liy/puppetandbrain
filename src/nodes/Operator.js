import Node from "./Node";
import DataType from "../data/DataType";

const OperatorTemplate = {
  inputs: [{
    name: 'A',
    type: DataType.GENERIC,
  }, {
    name: 'B',
    type: DataType.GENERIC,
  }],
  outputs: [{
    name: 'value',
    type: DataType.GENERIC
  }],
  memory: {
    A: 0,
    B: 0,
  },
  elementClass: ['operator'],
  category: 'Math',
  keywords: ['operator']
}
// FIXME: find a better way to handle type parsing!!
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
    console.log(this.inputs.value('A'), this.inputs.value('B'))
    // I use == so it auto convert string to number if it is possible.
    // e.g., 1 == "1" will return true.
    return this.inputs.value('A') == this.inputs.value('B');
  }
}


NodeTemplate.LessThan = {
  ...OperatorTemplate,
  name: '<',
  keywords: [...OperatorTemplate.keywords, '<', 'less than', 'less']
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


NodeTemplate.LessEqual = {
  ...OperatorTemplate,
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
  name: 'Random Integer',
  inputs: [{
    name: 'min',
    type: DataType.GENERIC,
  }, {
    name: 'max',
    type: DataType.GENERIC,
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