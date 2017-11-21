import * as BlockClasses from './blocks';
import { Operator } from '../nodes/Operator';
import TaskBlock from './blocks/TaskBlock';
import OperatorBlock from './blocks/OperatorBlock';


window.BlockFactory = {
  create: function(node, graph) {
    let blockClass = BlockClasses[node.className+'Block']
    if(blockClass) {
      return new blockClass(node, graph);
    }
    else {
      return new TaskBlock(node, graph);
    }
  }
}