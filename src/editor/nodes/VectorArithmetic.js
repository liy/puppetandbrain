import Adaptor from './Adaptor';
import DataType from '../data/DataType';
import Vec2 from '../math/Vec2';
import { numericVector } from '@/utils/utils';

NodeTemplate.set({
  className: 'VectorArithmetic',
  blockClassName: 'AdaptorBlock',
  name: 'Vector Add',
  operationName: 'add',
  inputs: [{
    name: 'A',
    descriptor: {
      type: DataType.VEC2,
    }
  }, {
    name: 'B',
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
    'A': {
      x: 0,
      y: 0,
    },
    'B': {
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
})

export default class VectorArithmetic extends Adaptor
{
  constructor(id, activity) {
    super(id, activity);
  }

  add() {
    return Vec2.add(numericVector(this.inputs.value('A')), numericVector(this.inputs.value('B')));
  }

  sub() {
    return Vec2.sub(numericVector(this.inputs.value('A')), numericVector(this.inputs.value('B')));
  }
}