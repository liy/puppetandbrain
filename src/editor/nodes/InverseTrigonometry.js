import Adaptor from "./Adaptor";
import DataType from "../data/DataType";
import {toDegree} from '@/utils/utils'

NodeTemplate.set({
  className: 'InverseTrigonometry',
  name: 'Arc Tangent',
  operationName: 'atan',
  blockClassName: 'AdaptorBlock',
  inputs: [{
    name: 'value',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  outputs: [{
    name: 'degree',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  memory: {
    degree: 0,
  },
  operations: [
    {
      description: 'Arc Sine',
      name: 'Arc Sine',
      operationName: 'asin',
      inputNames: {
        // value is the name of the input 
        value: 'sine'
      }
    },
    {
      description: 'Arc Cosine',
      name: 'Arc Cosine',
      operationName: 'acos',
      inputNames:  {
        value: 'cosine'
      }
    },
    {
      description: 'Arc Tangent',
      name: 'Arc Tangent',
      operationName: 'atan',
      inputNames: {
        value: 'tangent'
      }
    }
  ],
  elementClass: ['arithmetic', 'collapsed'],
  category: 'Math',
  keywords: [ 
    'asin', 'arc sine',
    'acos', 'arc cosin',
    'atan', 'arc tangent'
  ]
})

export default class InverseTrigonometry extends Adaptor
{
  constructor(id, activity) {
    super(id, activity);
  }

  asin() {
    return Math.asin(this.inputs.value('value'))*toDegree;
  }

  acos() {
    return Math.acos(this.inputs.value('value'))*toDegree;
  }

  atan() {
    return Math.atan(this.inputs.value('value'))*toDegree;
  }
}