import Adaptor from "./Adaptor";
import DataType from "../data/DataType";

NodeTemplate.set({
  className: 'Logic',
  blockClassName: 'AdaptorBlock',
  name: 'And',
  operationName: 'and',
  inputs: [{
    name: 'A',
    descriptor: {
      type: DataType.BOOLEAN,
    }
  }, {
    name: 'B',
    descriptor: {
      type: DataType.BOOLEAN,
    }
  }],
  outputs: [{
    name: 'value',
    descriptor: {
      type: DataType.BOOLEAN
    }
  }],
  memory: {
    A: true,
    B: true,
  },
  operations: [
    {
      description: 'And',
      name: 'And',
      operationName: 'and'
    },
    {
      description: 'Or',
      name: 'Or',
      operationName: 'or'
    }
  ],
  elementClass: ['logic'],
  category: 'Logic',
  keywords: ['logic', 
    '||', '&&', 'and', 'or',
  ]
})

export default class Logic extends Adaptor
{
  constructor(id, activity) {
    super(id, activity);
  }

  and() {
    return this.inputs.value('A') && this.inputs.value('B');
  }

  or() {
    return this.inputs.value('A') || this.inputs.value('B');
  }
}