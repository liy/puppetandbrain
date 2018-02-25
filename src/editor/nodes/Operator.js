import Node from "./Node";
import DataType from "../data/DataType";

/// TODO: to be removed

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
  constructor(id, activity) {
    super(id, activity);
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



