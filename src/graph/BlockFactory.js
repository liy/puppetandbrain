import * as BlockClasses from './blocks';
import { ArithmeticNode } from '../nodes/Arithmetic';
import TaskBlock from './blocks/TaskBlock';
import ArithmeticBlock from './blocks/ArithmeticBlock';


window.BlockFactory = {
  create: function(node, graph) {
    let blockClass = BlockClasses[node.className+'Block']
    if(blockClass) {
      return new blockClass(node, graph);
    }
    else if(node instanceof ArithmeticNode) {
      return new ArithmeticBlock(node, graph)
    }
    else {
      return new TaskBlock(node, graph);
    }
  }
}