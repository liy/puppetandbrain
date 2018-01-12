import Node from "./Node";
import DataType from "../data/DataType";

const OperatorTemplate = {
  input: [{
    name: 'A',
    type: DataType.GENERIC,
  }, {
    name: 'B',
    type: DataType.GENERIC,
  }],
  output: [{
    name: 'value',
    type: DataType.GENERIC
  }]
}
// FIXME: find a better way to handle type parsing!!
export class Operator extends Node
{
  constructor(id) {
    super(id);
  }

  mold() {
    super.mold();

    this.outputs.assignProperty('value', {
      get: () => {
        return this.value;
      }
    });
  }

  get elementClassName() {
    return ['operator'];
  }
}


NodeTemplate.Addition = {
  ...OperatorTemplate,
  name: 'Add'
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
  name: 'Multiply'
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
  name: 'Divide'
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
  name: '='
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
  name: '<'
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
  name: '<='
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
  input: [],
  name: 'Random Number'
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
  input: [{
    name: 'min',
    type: DataType.GENERIC,
  }, {
    name: 'max',
    type: DataType.GENERIC,
  }],
  name: 'Random Integer'
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