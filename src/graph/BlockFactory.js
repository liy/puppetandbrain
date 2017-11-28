import * as BlockClasses from './blocks';
import { Operator } from '../nodes/Operator';
import TaskBlock from './blocks/TaskBlock';
import OperatorBlock from './blocks/OperatorBlock';

window.BlockClasses = BlockClasses;

window.BlockFactory = {
  create: function(node) {
    // node and block are 1 to 1 mapping
    let blockClass = BlockClasses[node.className+'Block']
    return new blockClass(node);
  }
}