import Adaptor from "./Adaptor";
import DataType from "../data/DataType";
import {toRadian} from '@/utils/utils'

NodeTemplate.Trigonometry = {
  className: 'Trigonometry',
  name: 'Sine',
  blockClassName: 'AdaptorBlock',
  operationName: 'sin',
  inputs: [{
    name: 'degree',
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
    degree: 0,
  },
  operations: [
    {
      description: 'Sine',
      name: 'Sine',
      operationName: 'sin'
    },
    {
      description: 'Cosine',
      name: 'Cosine',
      operationName: 'cos'
    },
    {
      description: 'Tangent',
      name: 'Tangent',
      operationName: 'tan'
    }
  ],
  elementClass: ['arithmetic', 'collapsed'],
  category: 'Math',
  keywords: [ 
    'sin', 'sine',
    'cos', 'cosin',
    'tangent', 'tan' 
  ]
}

export default class Trigonometry extends Adaptor
{
  constructor(id, activity) {
    super(id, activity);
  }

  sin() {
    return Math.sin(this.inputs.value('degree')*toRadian);
  }

  cos() {
    return Math.cos(this.inputs.value('degree')*toRadian);
  }

  tan() {
    return Math.tan(this.inputs.value('degree')*toRadian);
  }
}