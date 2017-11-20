import ConnectionHelper from './ConnectionHelper'
import ArrayMap from '../utils/ArrayMap';


export default class BrainGraph
{
  constructor(actor) {
    this.actor = actor;
    this.brain = this.actor.brain;
    this.container = document.getElementById('block-container');
    this.svg = document.getElementById('svg');

    this.blocks = new ArrayMap();

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  init() {
    // TODO: to be removed!!!
    let w = 225;
    let indent = 50;
    let tx = indent;
    let ty = 400;
    let h = 120;

    for(let node of this.brain.getNodes()) {
      let block = BlockFactory.create(node);
      this.addBlock(block)


      // TODO: to be removed temp postion
      if(block.x == block.y && block.x == 0) {
        // default position
        block.x = tx;
        block.y = ty + this.container.offsetTop + Math.random()*60-30;
      }

      tx += w;
      if(tx+w >= window.innerWidth) {
        tx = indent;
        ty += h;
      }

    }

    this.draw()
  }

  destroy() {
    while(this.svg.lastChild) {
      this.svg.removeChild(this.svg.lastChild)
    }
    while(this.container.lastChild) {
      this.container.removeChild(this.container.lastChild)
    }
    for(let block of this.blocks.getValues()) {
      block.destroy();
    }
  }

  draw() {
    // draw exeuctions
    for(let task of this.brain.getTasks()) {
      let block = this.getBlock(task.id);
      for(let name of task.execution.names) {
        let nextBlock = this.getBlock(task.execution.get(name).id);
        block.outPins.get(name).connect(nextBlock.inPin);
      }
    }

    // draw variable connection
    let pointers = this.brain.getPointers();
    for(let pointer of pointers) {
      let outputBlock = this.getBlock(pointer.outputNode.id);
      let inputBlock = this.getBlock(pointer.inputNode.id);
      console.log(pointer.inputNode)
      let inputPin = inputBlock.inputPins.get(pointer.inputName);
      let outputPin = outputBlock.outputPins.get(pointer.outputName);
      outputPin.connect(inputPin)
    }
  }

  addBlock(block) {
    this.blocks.set(block.id, block);
    this.container.appendChild(block.container);
    block.added();
  }

  getBlock(id) {
    return this.blocks.get(id);
  }

  close() {
    this.destroy();
    Stage.blurEnabled = false;
  }

  resize() {
    this.svg.setAttribute('width', window.innerWidth)
    this.svg.setAttribute('height', window.innerHeight)
  }
}