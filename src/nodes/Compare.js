import Adaptor from "./Adaptor";
import DataType from "../data/DataType";

NodeTemplate.Compare = {
  className: 'Compare',
  blockClassName: 'AdaptorBlock',
  name: '=',
  operationName: 'equal',
  inputs: [{
    name: 'A',
    descriptor: {
      type: DataType.GENERIC,
    }
  }, {
    name: 'B',
    descriptor: {
      type: DataType.GENERIC,
    }
  }],
  outputs: [{
    name: 'value',
    descriptor: {
      type: DataType.BOOLEAN
    }
  }],
  memory: {
    A: 0,
    B: 0,
  },
  operations: [
    {
      description: '= Equal',
      name: '=',
      operationName: 'equal'
    },
    {
      description: '≠ Not equal',
      name: '≠',
      operationName: 'notEqual'
    },
    {
      description: '< Less',
      name: '<',
      operationName: 'less'
    },
    {
      description: '≤ Less or equal',
      name: '≤',
      operationName: 'lessOrEqual'
    },
    {
      description: '> Greater',
      name: '>',
      operationName: 'greater'
    },
    {
      description: '≥ Greater or equal',
      name: '≥',
      operationName: 'greaterOrEqual'
    }
  ],
  elementClass: ['logic'],
  category: 'Logic',
  keywords: ['logic', 
    '=', '==',
    '!=', 
    '<', 
    '<=', 
    '>',
    '>='
  ]
}

export default class Compare extends Adaptor
{
  constructor(id) {
    super(id);
  }

  equal() {
    // I use == so it auto convert string to number if it is possible.
    // e.g., 1 == "1" will return true.
    return this.inputs.value('A') == this.inputs.value('B');
  }

  notEqual() {
    return !this.equal();
  }

  less() {
    return Number(this.inputs.value('A')) < Number(this.inputs.value('B'));
  }

  lessOrEqual() {
    return Number(this.inputs.value('A')) <= Number(this.inputs.value('B'));
  }

  greater() {
    return Number(this.inputs.value('A')) > Number(this.inputs.value('B'));
  }

  greaterOrEqual() {
    return Number(this.inputs.value('A')) >= Number(this.inputs.value('B'));
  }
}