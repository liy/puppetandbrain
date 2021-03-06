import * as BlockClasses from './blocks';
import Block from './blocks/Block';

window.BlockFactory = {
  create: function(node) {
    let blockClass = BlockClasses[node.className+'Block'];
    let blockClassName = NodeTemplate.get(node.className).blockClassName;
    if(blockClassName) {
      blockClass = BlockClasses[blockClassName];
    }

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
    let blockClass = BlockClasses[template.className+'Block'];
    let blockClassName = NodeTemplate.get(template.className).blockClassName;
    if(blockClassName) {
      blockClass = BlockClasses[blockClassName];
    }

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