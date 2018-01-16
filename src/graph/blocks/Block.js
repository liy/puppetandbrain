import './Block.scss'
import BlockBody from '../support/BlockBody';
import ArrayMap from '../../utils/ArrayMap';
import AOutputPin from '../support/AOutputPin';
import AInputPin from '../support/AInputPin';
import AExecutionInPin from '../support/AExecutionInPin';
import AExecutionOutPin from '../support/AExecutionOutPin';
import BlockSelection from '../BlockSelection';
import EventEmitter from '../../utils/EventEmitter';

export default class Block extends EventEmitter
{
  constructor() {
    super();

    this.element = document.createElement('div');
    this.element.className = 'a-block';

    this.title = document.createElement('div');
    this.title.className = 'a-title';
    this.element.appendChild(this.title);

    this.body = new BlockBody();
    this.element.appendChild(this.body.element);
    
    this.dragstart = this.dragstart.bind(this);
    this.dragstop = this.dragstop.bind(this);
    this.dragmove = this.dragmove.bind(this);
    this.releaseOutside = this.releaseOutside.bind(this)
  }

  init(node) {
    this.node = node;

    this.body.iconPath = node.iconPath; 

    this.body.element.addEventListener('mousedown', this.dragstart);
    this.body.element.addEventListener('touchstart', this.dragstart);
    this.body.element.addEventListener('mouseup', this.dragstop);
    this.body.element.addEventListener('touchend', this.dragstop);
    
    if(node.elementClass) {
      for(let className of node.elementClass) {
        this.element.classList.add(className);
      }
    }

    this.id = this.node.id;
    this.inPin = null;
    this.outPins = new ArrayMap();
    this.inputPins = new ArrayMap();
    this.outputPins = new ArrayMap();

    this.title.textContent = node.nodeName;

    let pin = null;
    if(node.execution) {
      if(node.enter.enabled) {
        this.inPin = new AExecutionInPin();
        this.inPin.init(node);
        this.body.addLeft(this.inPin);
      }

      for(let name of node.execution.names) {
        pin = new AExecutionOutPin(name);
        pin.init(node);
        this.body.addRight(pin);
        this.outPins.set(name, pin)
      }
    }

    for(let name of node.inputs.names) {
      pin = new AInputPin(name);
      pin.init(node);
      this.body.addLeft(pin);
      this.inputPins.set(name, pin);
    }

    for(let name of node.outputs.names) {
      pin = new AOutputPin(name);
      pin.init(node);
      this.body.addRight(pin);
      this.outputPins.set(name, pin);
    }

    this.x = this.node.x;
    this.y = this.node.y;
    BrainGraph.addBlock(this);
  }

  destroy() {
    this.body.element.removeEventListener('mousedown', this.dragstart);
    this.body.element.removeEventListener('touchstart', this.dragstart);
    this.body.element.removeEventListener('mouseup', this.dragstop);
    this.body.element.removeEventListener('touchend', this.dragstop);
    document.removeEventListener('mouseup', this.dragstop);

    BrainGraph.removeBlock(this);
  }

  focus() {
    // override me if you want to have anything auto focused when node is created, or selected
    // Invoked from BlockSelection.select();
  }

  dragstart(e) {
    let sx = e.clientX ? e.clientX : e.touches[0].clientX;
    let sy = e.clientY ? e.clientY : e.touches[0].clientY;
    this._dragOffset = {
      x: (this.element.getBoundingClientRect().left - sx),
      y: (this.element.getBoundingClientRect().top - sy)
    }
    document.addEventListener('mousemove', this.dragmove)
    document.addEventListener('touchmove', this.dragmove)
    // when release on graph container, it is released outside of the block
    BrainGraph.container.addEventListener('mouseup', this.releaseOutside);

    BlockSelection.select(this);

    // bring to front 
    this.element.parentElement.appendChild(this.element);

    this.moveCommand = Commander.create('MoveBlock', this);
  }

  dragstop(e) {
    BrainGraph.container.removeEventListener('mouseup', this.releaseOutside);
    
    document.removeEventListener('mousemove', this.dragmove);
    document.removeEventListener('touchmove', this.dragmove);

    // process and push to history
    if(this.moveCommand) History.push(this.moveCommand.processAndSave());
  }

  releaseOutside(e) {
    BrainGraph.container.removeEventListener('mouseup', this.releaseOutside);
    if(e.target == BrainGraph.container) {
      document.removeEventListener('mousemove', this.dragmove);
      document.removeEventListener('touchmove', this.dragmove);

      // process and push to history
      if(this.moveCommand) History.push(this.moveCommand.processAndSave());
    }
  }

  dragmove(e) {
    let sx = e.clientX ? e.clientX : e.touches[0].clientX;
    let sy = e.clientY ? e.clientY : e.touches[0].clientY;
    // Make sure all of the values are in client coordincate system. Then apply a scale
    this.x = (sx - BrainGraph.blockContainer.getBoundingClientRect().left + this._dragOffset.x)/BrainGraph.scale;
    this.y = (sy - BrainGraph.blockContainer.getBoundingClientRect().top + this._dragOffset.y)/BrainGraph.scale;

    this.drawConnection();
  }

  drawConnection() {
    // executuion pins
    for(let pin of this.outPins.getValues()) {
      pin.drawConnection();
    }
    if(this.inPin) this.inPin.drawConnection();

    // output input pins
    for(let pin of this.inputPins.getValues()) {
      pin.drawConnection();
    }
    for(let pin of this.outputPins.getValues()){
      pin.drawConnection();
    }
  }

  set x(x) {
    this.element.style.left = x +'px'
    this.node.x = x;
  }

  set y(y) {
    this.element.style.top = y +'px'
    this.node.y = y;
  }

  get x() {
    return this.node.x;
  }

  get y() {
    return this.node.y;
  }


  template(pod) {
    this.body.iconPath = pod.iconPath;
    
    if(pod.elementClass) {
      for(let className of pod.elementClass) {
        this.element.classList.add(className);
      }
    }

    this.title.textContent = pod.name;

    let pin = null;
    if(pod.execution) {
      if(pod.enter.enabled) {
        this.inPin = new AExecutionInPin();
        this.body.addLeft(this.inPin);
      }

      for(let execPod of pod.execution) {
        pin = new AExecutionOutPin(execPod.name);
        this.body.addRight(pin);
      }
    }

    for(let inputPod of pod.inputs) {
      pin = new AInputPin(inputPod.name);
      pin.symbol.template(inputPod.type)
      this.body.addLeft(pin);
    }

    for(let outputPod of pod.outputs) {
      pin = new AOutputPin(outputPod.name);
      pin.symbol.template(outputPod.type)
      this.body.addRight(pin);
    }

    this.element.style.position = 'relative'

    this.body.element.addEventListener('mousedown', e => {
      this.emit('block.chosen', pod);
    });
  }
}