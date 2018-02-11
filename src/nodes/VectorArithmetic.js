import Adaptor from './Adaptor';
import DataType from '../data/DataType';
import Vec2 from '../math/Vec2';

NodeTemplate.VectorArithmetic = {
  className: 'VectorArithmetic',
  blockClassName: 'AdaptorBlock',
  name: 'Vector Add',
  operationName: 'add',
  inputs: [{
    name: 'vector A',
    descriptor: {
      type: DataType.VEC2,
    }
  }, {
    name: 'vector B',
    descriptor: {
      type: DataType.VEC2,
    }
  }],
  outputs: [{
    name: 'vector',
    descriptor: {
      type: DataType.VEC2
    }
  }],
  memory: {
    'vector A': {
      x: 0,
      y: 0,
    },
    'vector B': {
      x: 0,
      y: 0
    }
  },
  operations: [
    {
      description: 'Add Vector',
      name: '+ Vector',
      operationName: 'add'
    },
    {
      description: 'Substract Vector',
      name: '- Vector',
      operationName: 'sub'
    },
  ],
  elementClass: ['arithmetic'],
  category: 'Math',
  keywords: ['arithmetic', 
    'vector add', 'vector addition', '+' , 
    'vector substract', '-'
  ]
}

export default class VectorArithmetic extends Adaptor
{
  constructor(id) {
    super(id);
  }

  add() {
    return Vec2.add(this.inputs.value('vector A'), this.inputs.value('vector B'));
  }

  sub() {
    return Vec2.sub(this.inputs.value('vector A'), this.inputs.value('vector B'));
  }
}