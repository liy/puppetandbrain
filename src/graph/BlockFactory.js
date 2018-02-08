import * as BlockClasses from './blocks';
import Block from './blocks/Block';

window.BlockFactory = {
  create: function(node) {
    let blockClass = BlockClasses[node.className+'Block'];
    let block = null;
    if(blockClass) {
      block = new blockClass();
    }
    else {
      block = new Block();
    }
    block.init(node);

    return block;
  },

  createTemplateBlock: function(template) {
    // node and block are 1 to 1 mapping
    let blockClass = BlockClasses[template.className+'Block'];
    let block = null;
    if(blockClass) {
      block = new blockClass();
    }
    else {
      block = new Block();
    }
    
    return block;
  }
}