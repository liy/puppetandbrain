import * as BlockClasses from './blocks';
import Block from './blocks/Block';

window.BlockFactory = {
  create: function(node) {
    // node and block are 1 to 1 mapping
    let blockClass = BlockClasses[node.className+'Block'];
    let block = null;
    if(blockClass) {
      block = new blockClass();
    }
    else {
      block = new Block();
    }
    block.init(node);

    // var block = new Block();
    // block.init(node);
    return block;
  }
}