import Node from "./Node";
import {toDegree} from '@/utils/utils'
import DataType from '../data/DataType';

NodeTemplate.Not = {
  className: 'Not',
  name: 'Not',
  inputs: [{
    name: 'boolean',
    descriptor: {
      type: DataType.BOOLEAN, 
    }
  }],
  outputs: [{
    name: 'boolean',
    descriptor: {
      type: DataType.BOOLEAN
    }
  }],
  memory: {
    boolean: false,
  },
  elementClass: ['logic', 'collapsed'],
  category: 'Logic',
  keywords: ['logic','!','not']
}

export default class Not extends Node
{
  constructor(id, lookUp) {
    super(id, lookUp)
    
  }

  init(pod) {
    super.init(pod)

    this.memory.puppet = this.memory.puppet || this.owner.id;
    
    this.outputs.assignProperty('boolean', {
      get: () => {
        // do some manual casting
        let input = this.inputs.values('boolean');
        if(typeof input !== 'boolean') {
          if(input === 'true') {
            input = true;
          }
          else if(input === 'false') {
            input = false;
          }
          else if(input === 1) {
            input = true;
          }
          else if(input === 0) {
            input = false;
          }
        }

        return !input;
      }
    });
  }
}
