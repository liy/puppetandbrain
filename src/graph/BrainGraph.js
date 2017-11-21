require('./BrainGraph.scss')

import ConnectionHelper from './ConnectionHelper'
import ArrayMap from '../utils/ArrayMap';
import NodeMenu from './NodeMenu';
import Stage from '../objects/Stage'


export default class BrainGraph
{
  constructor(actor) {
    this.container = document.getElementById('graph');

    this.actor = actor;
    this.brain = this.actor.brain;
    this.blockContainer = document.getElementById('block-container');
    this.svg = document.getElementById('svg');

    this.blocks = new ArrayMap();

    window.addEventListener('resize', this.resize);
    this.resize();

    this.openNodeMenu = this.openNodeMenu.bind(this)
  }

  init() {
    for(let node of this.brain.getNodes()) {
      let block = BlockFactory.create(node);
      this.addBlock(block)
    }

    ConnectionHelper.init(this);
    this.draw();
  }

  destroy() {
    while(this.svg.lastChild) {
      this.svg.removeChild(this.svg.lastChild)
    }
    while(this.blockContainer.lastChild) {
      this.blockContainer.removeChild(this.blockContainer.lastChild)
    }
    for(let block of this.blocks.getValues()) {
      block.destroy();
    }

    this.container.style = "visibility:hidden"
    this.container.removeEventListener('contextmenu', this.openNodeMenu);
    this.container.removeEventListener('mousedown', this.mousedown)
    document.removeEventListener('keydown', this.keydown)
  }

  open() {
    this.container.style = "visibility:visible"
    Stage.blurEnabled = true;

    this.container.addEventListener('contextmenu', this.openNodeMenu);

    this.dbClicks = 0;
    this.mousedown = this.mousedown.bind(this);
    this.container.addEventListener('mousedown', this.mousedown);

    this.keydown = this.keydown.bind(this)
    document.addEventListener('keydown', this.keydown);
  }

  close() {
    this.destroy();
    Stage.blurEnabled = false;
  }

  mousedown(e) {
    if(e.target == this.container) {
      if(++this.dbClicks%2 == 0) {
        this.close();
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
      this.close();
    }
  }

  draw() {
    // draw exeuctions
    for(let task of this.brain.getTasks()) {
      let block = this.getBlock(task.id);

      for(let name of task.execution.names) {
        let nextNode = task.execution.get(name);
        if(nextNode) {
          let nextBlock = this.getBlock(nextNode.id);
          block.outPins.get(name).connect(nextBlock.inPin);
        }
      }
    }

    // draw variable connection
    let pointers = this.brain.getPointers();
    for(let pointer of pointers) {
      let outputBlock = this.getBlock(pointer.outputNode.id);
      let inputBlock = this.getBlock(pointer.inputNode.id);
      let inputPin = inputBlock.inputPins.get(pointer.inputName);
      let outputPin = outputBlock.outputPins.get(pointer.outputName);
      outputPin.connect(inputPin)
    }
  }

  addBlock(block) {
    this.blocks.set(block.id, block);
    this.blockContainer.appendChild(block.container);
    block.added();
  }

  getBlock(id) {
    return this.blocks.get(id);
  }

  createBlock(pod, x, y) {
    let node = NodeFactory.create(pod.className);
    node.init({
      ...pod,
      owner: this.actor,
      x: x,
      y: y
    })
    let block = BlockFactory.create(node)
    this.addBlock(block);
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