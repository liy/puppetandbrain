import './Block.scss'
import BlockBody from '../support/BlockBody';
import ArrayMap from '../../utils/ArrayMap';
import OutputPin from '../support/OutputPin';
import InputPin from '../support/InputPin';
import ExecutionInPin from '../support/ExecutionInPin';
import ExecutionOutPin from '../support/ExecutionOutPin';
import GraphSelection from '../GraphSelection';
import EventEmitter from '../../utils/EventEmitter';
import DataType from '../../data/DataType';

export default class Block extends EventEmitter
{
  constructor() {
    super();

    this.element = document.createElement('div');
    this.element.className = 'block';

    this.title = document.createElement('div');
    this.title.className = 'title';
    this.element.appendChild(this.title);

    this.body = new BlockBody();
    this.element.appendChild(this.body.element);
    
    this.dragstart = this.dragstart.bind(this);
    this.dragstop = this.dragstop.bind(this);
    this.dragmove = this.dragmove.bind(this);

    this.selected = false;
  }

  init(node) {
    this.node = node;

    this.body.iconPath = node.iconPath; 
    
    this.body.element.addEventListener('mousedown', this.dragstart);
    this.body.element.addEventListener('touchstart', this.dragstart);

    
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
        this.inPin = new ExecutionInPin();
        this.inPin.init(node);
        this.body.addLeft(this.inPin);
      }

      for(let name of node.execution.names) {
        pin = new ExecutionOutPin(name);
        pin.init(node);
        this.body.addRight(pin);
        this.outPins.set(name, pin)
      }
    }

    for(let name of node.inputs.names) {
      pin = new InputPin(name);
      pin.init(node);
      this.body.addLeft(pin);
      this.inputPins.set(name, pin);
    }

    for(let name of node.outputs.names) {
      pin = new OutputPin(name);
      pin.init(node);
      this.body.addRight(pin);
      this.outputPins.set(name, pin);
    }

    // this.x = this.node.x;
    // this.y = this.node.y;
    this.translate(this.node.x, this.node.y);
    BrainGraph.addBlock(this);
  }

  destroy() {
    this.removeAllListeners();

    this.body.element.removeEventListener('mousedown', this.dragstart);
    this.body.element.removeEventListener('touchstart', this.dragstart);

    document.removeEventListener('mouseup', this.dragstop);
    document.removeEventListener('touchend', this.dragstop);

    BrainGraph.removeBlock(this);
  }

  focus() {
    // override me if you want to have anything auto focused when node is created, or selected
    // Invoked from GraphSelection.select();
  }

  dragstart(e) {
    // bring block to front.
    // note this will stop any child elements click event working.
    // ie, I have separate down and up event handler in input pin to simulate label click event.  
    this.element.parentElement.appendChild(this.element);

    let sx = e.clientX ? e.clientX : e.touches[0].clientX;
    let sy = e.clientY ? e.clientY : e.touches[0].clientY;
    this._dragOffset = {
      x: (this.element.getBoundingClientRect().left - sx),
      y: (this.element.getBoundingClientRect().top - sy)
    }
    GraphSelection.select(this);

    
    document.addEventListener('mousemove', this.dragmove)
    document.addEventListener('touchmove', this.dragmove)

    document.addEventListener('touchend', this.dragstop);
    document.addEventListener('mouseup', this.dragstop);

    this.moveCommand = Commander.create('MoveBlock', this);
  }

  dragstop(e) {
    document.removeEventListener('touchend', this.dragstop);
    document.removeEventListener('mouseup', this.dragstop);
    document.removeEventListener('mouseup', this.dragstop);
    document.removeEventListener('mousemove', this.dragmove);
    document.removeEventListener('touchmove', this.dragmove);

    // check if drag to delete button
    if(e.target == UIController.deleteBtn.element) {
      History.push(Commander.create('DeleteBlock', this.id, this.moveCommand.oldX, this.moveCommand.oldY).processAndSave());
      return;
    }

    // process and push to history
    History.push(this.moveCommand.processAndSave());
  }

  dragmove(e) {
    
    let sx = e.clientX ? e.clientX : e.touches[0].clientX;
    let sy = e.clientY ? e.clientY : e.touches[0].clientY;
    // Make sure all of the values are in client coordincate system. Then apply a scale
    const x = (sx - BrainGraph.blockContainer.getBoundingClientRect().left + this._dragOffset.x)/BrainGraph.scale;
    const y = (sy - BrainGraph.blockContainer.getBoundingClientRect().top + this._dragOffset.y)/BrainGraph.scale;
    this.translate(x, y);

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
    this.node.x = x;
    // this.element.style.left = x +'px'
    this.element.style.transform = `translate(${x}px, ${this.y}px)`
  }

  set y(y) {
    this.node.y = y;
    // this.element.style.top = y +'px'
    this.element.style.transform = `translate(${this.x}px, ${y}px)`
  }

  translate(x, y) {
    this.element.style.transform = `translate(${x}px, ${y}px)`
    this.node.x = x;
    this.node.y = y;
  }

  get x() {
    return this.node.x;
  }

  get y() {
    return this.node.y;
  }

  select() {
    this.selected = true;
    this.body.element.classList.add('block-selected');
    this.focus();
  }

  deselect() {
    this.selected = false;
    this.body.element.classList.remove('block-selected')
  }

  get deletable() {
    return true;
  }

  addInputPin(pin) {
    this.inputPins.set(pin.name, pin);
    this.body.addLeft(pin)
  }

  removeInputPin(pin) {
    this.inputPins.remove(pin.name);
    this.body.removePin(pin);
  }

  addOutputPin(pin) {
    this.outputPins.set(pin.name, pin);
    this.body.addRight(pin)
  }

  removeOutPin(pin) {
    this.outputPins.remove(pin.name);
    this.body.removePin(pin);
  }

  template(pod) {
    this.element.classList.add('template-block');

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
        this.inPin = new ExecutionInPin();
        this.body.addLeft(this.inPin);
      }

      for(let execPod of pod.execution) {
        pin = new ExecutionOutPin(execPod.name);
        this.body.addRight(pin);
      }
    }

    for(let inputPod of pod.inputs) {
      pin = new InputPin(inputPod.name);
      pin.symbol.colorize(inputPod.descriptor.type)
      this.body.addLeft(pin);
    }

    for(let outputPod of pod.outputs) {
      pin = new OutputPin(outputPod.name);
      pin.symbol.colorize(outputPod.descriptor.type)
      this.body.addRight(pin);
    }
  }
}