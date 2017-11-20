import * as ns from './blocks'
import { ArithmeticNode } from '../nodes/Arithmetic';
import TaskBlock from './blocks/TaskBlock';
import ArithmeticBlock from './blocks/ArithmeticBlock';


window.BlockFactory = {
  create: function(node) {
    let blockClass = ns[node.className+'Block']
    if(blockClass) {
      return new blockClass(node);
    }
    else if(node instanceof ArithmeticNode) {
      return new ArithmeticBlock(node)
    }
    else {
      return new TaskBlock(node);
    }
  }
}