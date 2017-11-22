require('./BrainGraph.scss')

import BlockSelection from './BlockSelection';
import ArrayMap from '../utils/ArrayMap';
import NodeMenu from './NodeMenu';
import Stage from '../objects/Stage'

class BrainGraph
{
  constructor() {
    this.container = document.getElementById('graph');
    this.blockContainer = document.getElementById('block-container');
    this.svg = document.getElementById('svg');
    this.dbClicks = 0;
  }

  open(brain) {
    this.brain = brain;
    this.blocks = new ArrayMap();

    this.resize = this.resize.bind(this);
    this.keydown = this.keydown.bind(this)
    this.mousedown = this.mousedown.bind(this);
    this.openNodeMenu = this.openNodeMenu.bind(this)

    this.container.style = "visibility:visible"
    Stage.blurEnabled = true;

    this.container.addEventListener('contextmenu', this.openNodeMenu);
    this.container.addEventListener('mousedown', this.mousedown);
    document.addEventListener('keydown', this.keydown);
    window.addEventListener('resize', this.resize);
    this.resize();

    BlockSelection.toggle();

    for(let node of this.brain.getNodes()) {
      BlockFactory.create(node, this);
    }

    this.draw();
  }

  close() {
    while(this.svg.lastChild) {
      this.svg.removeChild(this.svg.lastChild)
    }
    for(let block of this.blocks.getValues()) {
      block.destroy();
    }

    this.container.style = "visibility:hidden"
   
    this.container.removeEventListener('contextmenu', this.openNodeMenu);
    this.container.removeEventListener('mousedown', this.mousedown);
    document.removeEventListener('keydown', this.keydown);
    window.removeEventListener('resize', this.resize);

    Stage.blurEnabled = false;
    BlockSelection.toggle();
  }


  mousedown(e) {
    if(e.target == this.container) {
      if(++this.dbClicks%2 == 0) {
        Commander.create('CloseGraph', this.brain).process();
        return;
      }
      setTimeout(() => {
        this.dbClicks = 0;
      }, 300)
    }
  }

  keydown(e) {
    // escape
    if(e.keyCode == 27) {
      Commander.create('CloseGraph', this.brain).process();
    }
  }

  draw() {
    // draw exeuctions
    for(let task of this.brain.getTasks()) {
      // refresh in pin, only update the in pin icon status
      let taskBlock = this.getBlock(task.id);
      if(taskBlock.inPin) taskBlock.inPin.refresh();

      for(let name of task.execution.names) {
        // refresh out pins of current node
        taskBlock.outPins.get(name).refresh()
      }
    }

    // draw variable connection
    let pointers = this.brain.getPointers();
    for(let pointer of pointers) {
      let outputBlock = this.getBlock(pointer.outputNode.id);
      let inputBlock = this.getBlock(pointer.inputNode.id);
      let inputPin = inputBlock.inputPins.get(pointer.inputName);
      let outputPin = outputBlock.outputPins.get(pointer.outputName);
      inputPin.refresh();
      outputPin.refresh();
    }
  }

  addBlock(block) {
    this.blocks.set(block.id, block);
    this.blockContainer.appendChild(block.container);
  }

  // remove it visually
  removeBlock(block) {
    this.blocks.remove(block.id);
    this.blockContainer.removeChild(block.container);
  }

  // destroy node and block all together and its connections, also remove it visually
  destroyBlock(block) {
    // disconnect all variable pins
    for(let pin of block.inputPins.getValues()) {
      pin.removeConnections();
    }
    for(let pin of block.outputPins.getValues()) {
      pin.removeConnections();
    }
    // destroy block and remove it from the graph
    block.destroy();
    // destroy the node and remove from the brain
    block.node.destroy();
  }

  getBlock(id) {
    return this.blocks.get(id);
  }

  

  openNodeMenu(e) {
    if(e.target == this.container) e.preventDefault();

    let menu = new NodeMenu(this);
    menu.init()
    menu.x = e.clientX;
    menu.y = e.clientY;
  }

  refresh() {
    while(this.svg.lastChild) {
      this.svg.removeChild(this.svg.lastChild)
    }
    this.draw();
  }

  resize() {
    this.svg.setAttribute('width', window.innerWidth)
    this.svg.setAttribute('height', window.innerHeight)
  }
}

window.BrainGraph = new BrainGraph();