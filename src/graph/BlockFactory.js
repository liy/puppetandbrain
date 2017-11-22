import * as BlockClasses from './blocks';
import { Operator } from '../nodes/Operator';
import TaskBlock from './blocks/TaskBlock';
import OperatorBlock from './blocks/OperatorBlock';


window.BlockFactory = {
  create: function(node) {
    let blockClass = BlockClasses[node.className+'Block']
    if(blockClass) {
      return new blockClass(node);
    }
    else {
      return new TaskBlock(node);
    }
  }
}